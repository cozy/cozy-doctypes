const keyBy = require('lodash/keyBy')
const some = require('lodash/some')
const Document = require('./Document')

class BankAccount extends Document {
  static reconciliate(fetchedAccounts, localAccounts) {
    const byAccountNumber = keyBy(localAccounts, 'number')
    return fetchedAccounts.map(fetchedAccount => {
      const matchedSavedAccount = byAccountNumber[fetchedAccount.number]
      return {
        ...fetchedAccount,
        _id: matchedSavedAccount && matchedSavedAccount._id
      }
    })
  }

  static isFromNewKonnector(fetchedAccounts, stackAccounts) {
    const byNumber = keyBy(stackAccounts, 'number')
    const byVendorId = keyBy(stackAccounts, 'vendorId')
    // We are saving from a new linxo account if we have at least one account
    // that has a known account number but an unknown linxoId
    return some(
      fetchedAccounts,
      acc => byNumber[acc.accountNumber] && !byVendorId[acc.id]
    )
  }
}

BankAccount.doctype = 'io.cozy.bank.accounts'
BankAccount.idAttributes = ['_id']
BankAccount.version = 1
BankAccount.checkedAttributes = null

module.exports = BankAccount
