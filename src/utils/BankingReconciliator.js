const keyBy = require('lodash/keyBy')
const fromPairs = require('lodash/fromPairs')
const log = require('../log')

class BankingReconciliator {
  constructor({ BankAccount, BankTransaction }) {
    Object.assign(this, { BankAccount, BankTransaction })
  }

  async save(fetchedAccounts, fetchedTransactions) {
    const { BankAccount, BankTransaction } = this

    // save accounts
    const accountNumbers = new Set(
      fetchedAccounts.map(account => account[BankAccount.vendorIdAttr])
    )
    const stackAccounts = BankAccount.fetchAll().filter(acc =>
      accountNumbers.has(acc[BankAccount.vendorIdAttr])
    )

    const matchedAccounts = BankAccount.reconciliate(
      fetchedAccounts,
      stackAccounts
    )

    log('info', 'BankingReconciliator: Saving accounts...')
    const cozyAccounts = await BankAccount.bulkSave(matchedAccounts)

    const stackTransactions = BankTransaction.getMostRecentForAccounts(
      stackAccounts.map(x => x._id)
    )

    // attach bank accounts to transactions
    const vendorIdToCozyId = fromPairs(
      cozyAccounts.map(acc => [acc[BankAccount.vendorIdAttr], acc._id])
    )
    fetchedTransactions.forEach(tr => {
      tr.account = vendorIdToCozyId[tr[BankTransaction.vendorAccountIdAttr]]
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
    return BankTransaction.bulkSave(transactions)
  }
}

module.exports = BankingReconciliator
