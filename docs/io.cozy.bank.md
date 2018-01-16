[Table of contents](README.md#table-of-contents)

# Cozy Bank doctypes

Cozy can stores and manipulate bank related datas, distributed across several doctypes.


## `io.cozy.bank.settings`

This doctype store informations about Bank application settings. There is only one document, by default:

```
{
  notifications: {
    amountMax: {
      enable: false,
      value: 30
    }
  }
}
```


## `io.cozy.bank.accounts`

This doctypes stores informations about a Bank account:

- `label`: {string} - The bank account label (e.g. _John Doe Bank Account_)
- `institutionLabel`: {string} - The financial institution name the bank account belongs to
- `balance`: {number} - The current account balance
- `type`: {string} - The account type in the list `['none', 'bank', 'cash', 'asset', 'credit card', 'liability']`
- `number`: {string} - The bank account number in its institution
- `iban`: {string} - The bank account international identifier
- `serviceID`: {number} - In case of external service used to import transactions, this key can stores the service's account ID; can be `undefined` is the account isn't managed by any external service


## `io.cozy.bank.operations`

This doctype stors informations about a bank transaction:

- `label`: {string} - The label describing the transaction
- `type`: {string} - A type in the list : `['none', 'credit card', 'cash', 'check', 'transfer', 'internal transfer', 'debit card', 'deposit', 'financial fee', 'direct debit']`
- `date`: {timestamp} - The date the transaction is emmited
- `dateOperation`: {timestamp} - The date the transaction is registered in the account
- `dateImport`: {timestamp} - The date the transaction is imported (can differ of the date of creation of the document as the import can be done by an external service)
- `amount`: {number} - The amount of the transaction
- `currency`: {string} - A 3 uppercased chars defining the currecny used for the transaction as stated in [ISO4217](https://www.currency-iso.org/en/home/tables/table-a1.html)
- `manualCategoryId`: {string} - A category that apply to the transaction and is manually selected by the user
- `automaticCategoryId`: {string} - A category that apply to the transaction and is automatically calculated
- `account`: {identifier} - The related account id the transaction belongs to
- `bills`: {array[<io.cozy.bills._id>]} - List of bills id.
- `creditOperations`: {array[<io.cozy.bank.operations._id>]} - List of credit operations id
- `debitOperations`: {array[<io.cozy.bank.operations._id>]} - List of debit operations id
- `parent`: {_id} - In case of a split transaction, the one refers the global transaction the split one belongs to
