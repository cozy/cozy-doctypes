[Table of contents](README.md#table-of-contents)

# Cozy Bank doctypes

Cozy can stores and manipulate bank related datas, distributed across several doctypes.

## `io.cozy.bank.accounts`

This doctypes stores informations about a Bank account:

- `label`: {string} the bank account label (e.g. _John Doe Bank Account_)
- `institutionLabel`: {string} the financial institution name the bank account belongs to
- `balance`: {number} the current account balance
- `type`: {string} the account type in the list `['none', 'bank', 'cash', 'asset', 'credit card', 'liability']`
- `number`: {string} the bank account number in its institution
- `iban`: {string} the bank account international identifier
- `serviceID`: {number} in case of external service used to import transactions, this key can stores the service's account ID; can be `undefined` is the account isn't managed by any external service

## `io.cozy.bank.operations`

This doctype stors informations about a bank transaction:

- `label`: {string} the label describing the transaction
- `type`: {string} a type in the list : `['none', 'credit card', 'cash', 'check', 'transfer', 'internal transfer', 'debit card', 'deposit', 'financial fee', 'direct debit']`
- `date`: {timestamp} the date the transaction is emmited
- `dateOperation`: {timestamp} the date the transaction is registered in the account
- `dateImport`: {timestamp} the date the transaction is imported (can differ of the date of creation of the document as the import can be done by an external service)
- `amount`: {number} the amount of the transaction
- `currency`: {string} a 3 uppercased chars defining the currecny used for the transaction as stated in [ISO4217](https://www.currency-iso.org/en/home/tables/table-a1.html)
- `category`: {string} a category that apply to the transaction
-  `account`: {identifier} the related account the transaction belongs to, in the form of `{doctype}:{_id}` (e.g. `io.cozy.bank.account:{_id}`)
- `bill`: {identifier} an external doctype identifier to an element the trasbaction can be associated to (e.g. `io.cozy.files:{_id}`, `io.cozy.bills:{_id}`)
- `parent`: {_id} in case of a split transaction, the one refers the global transaction the split one belongs to
