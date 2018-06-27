const keyBy = require('lodash/keyBy')
const fromPairs = require('lodash/fromPairs')
const log = require('../log')

class BankingReconciliator {
  constructor(options) {
    this.options = options
  }

  async save(fetchedAccounts, fetchedTransactions, options = {}) {
    const { BankAccount, BankTransaction } = this.options

    // save accounts
    const accountNumbers = new Set(
      fetchedAccounts.map(account => account[BankAccount.numberAttr])
    )
    const stackAccounts = (await BankAccount.fetchAll()).filter(acc =>
      accountNumbers.has(acc[BankAccount.numberAttr])
    )

    const matchedAccounts = BankAccount.reconciliate(
      fetchedAccounts,
      stackAccounts
    )

    log('info', 'BankingReconciliator: Saving accounts...')
    const savedAccounts = await BankAccount.bulkSave(matchedAccounts)
    if (options.onAccountsSaved) {
      options.onAccountsSaved(savedAccounts)
    }

    const stackTransactions = await BankTransaction.getMostRecentForAccounts(
      stackAccounts.map(x => x._id)
    )

    // attach bank accounts to transactions
    const vendorIdToCozyId = fromPairs(
      savedAccounts.map(acc => [acc[BankAccount.vendorIdAttr], acc._id])
    )

    log('info', vendorIdToCozyId, 'Saved accounts...')
    fetchedTransactions.forEach(tr => {
      tr.account = vendorIdToCozyId[tr[BankTransaction.vendorAccountIdAttr]]
      if (tr.account === undefined) {
        log('warn', `Transaction without account`)
        log('warn', `Vendor id attribute: ${BankTransaction.vendorAccountIdAttr}`)
        log('warn', 'transaction: ' + JSON.stringify(tr))
        throw new Error('Transaction without account.')
      }
    })

    const stackTransactionsByVendorId = keyBy(
      stackTransactions,
      BankTransaction.vendorIdAttr
    )
    const fromNewKonnectorAccount = BankAccount.isFromNewKonnector(
      fetchedAccounts,
      stackAccounts
    )
    const transactions = BankTransaction.reconciliate(
      fetchedTransactions,
      stackTransactions,
      {
        isNew: transaction =>
          !stackTransactionsByVendorId[
            transaction[BankTransaction.vendorIdAttr]
          ],
        onlyMostRecent: fromNewKonnectorAccount
      }
    )
    log('info', 'BankingReconciliator: Saving transactions...')
    const savedTransactions = await BankTransaction.bulkSave(transactions)
    return {
      accounts: savedAccounts,
      transactions: savedTransactions
    }
  }
}

module.exports = BankingReconciliator
