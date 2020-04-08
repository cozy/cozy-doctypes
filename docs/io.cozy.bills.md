[Table of contents](README.md#table-of-contents)

# Bills doctype

## `io.cozy.bills`

### Description
- Represents a bill (invoice) or a refund from a vendor.

### Mandatory attributes

- `vendor`: {string} - Vendor which issued the bill
- `date`: {date} - Date the bill was emitted, a string ISO8601 formated  (in JS you can have that with `(new Date()).toJSON()`)
- `amount`: {number} - Amount of the bill, __always positive__ even if it is a refund
- `currency` : the currency, must respects ISO standard : https://en.wikipedia.org/wiki/ISO_4217

### Optional attributes (but some are important depending the context)

- `recurrence`: {String} : this means that the bills is a recurring one and the value of this
  attribute gives the frequency. Here is a list of possible values.
    - `weekly`
    - `monthly`
    - `bi-monthly`
    - `yearly`
- `matchingCriterias`: {object} some criterias which can be used to match bills with bank
  operations
    - `labelRegex`: {string} (example: `"\\bcpam\\b"`) : regexp used to match operation label
    - `amountLowerDelta`: (float): default 0.001 : positive value. Authorized lower difference between bill amount and
      bank operation value
    - `amountUpperDelta`: (float): default 0.001 : positive value. Authorized upper difference between bill amount and
      bank operation value
    - `dateLowerDelta`: (int): default 15 : (positive value). Authorized lower difference in days between the
      bill date and the bank operation date
    - `dateUpperDelta`: (int): default 29 : (positive value). Authorized upper difference in days between the
      bill date and the bank operation date
- `type`: {string} - Type of the bill (see below for existing types)
- `isRefund`: {boolean} - Indicate if the bill represents a refund/reimbursement
- `subtype`: {string} - Used for labelling the bill. ie: "Ostéopathie"
- `originalDate` - For health bills, represents the date of the health act (presumably the date the account was charged)
- `originalAmount`: {number} - Original amount in case of a partial refund
- `groupAmount`: Group amount in case this bill was part of a grouped refund
- `thirdPartyRefund` : {number} - Amount reimbursed to third parties
- `socialSecurityRefund` : {number} - Amount reimbursed to social security
- `isThirdPartyPayer`: {boolean} - Indicate if the bill has been already covered by a third party payer. This attribute can be useful when Cozy retrieves bills issued by french medical insurances.
When this attribute is in "true" no associated debit is expected to be found in the client bank
statements.
- `document relationship`: {object} - The associated file. ex:
```js
"relationships": {
  "document": {
    "data": { "_id": "c43645a93831827c7ec512eac3006e51", "_type": "io.cozy.files" }
  }
}
```

`io.cozy.files:c43645a93831827c7ec512eac3006e51`
- `invoice`: {string} - (legacy) The associated file. ex: `io.cozy.files:c43645a93831827c7ec512eac3006e51`
- `fileUrl`: {string} - The url used to download the pdf from vendor.
- `debitOperations`: {array[io.cozy.bank.operations._id]} - List of debit operations id
- `creditOperations`: {array[io.cozy.bank.operations._id]} - List of credit operations id
- `vendorRef` : {string} - Vendor reference for this bill. Ex : `'INV-2018-09-12534'`


### Types

- `health_costs`: Health related bills
- `phone`: Phone related bills
- `income`: Salary income or allowances related bills

### Some more attributes for reimbursement bills

The are some more possible attributes for reimbursement bills. The `original*` attributes
are there to help the connector to link this bills to their original debit operation.

- `isRefund`: {boolean} - Indicate if the bill represents a refund/reimbursement (defaults to false)
- `subtype`: {string} - Used for labelling the bill. ie: "Ostéopathie" (optionnal)
- `originalAmount`: {number} - Original amount in case of a partial refund
- `originalDate` - Represents the date of the associated spent (presumably the date the account was charged)

### Example

```
{
  "_id": "62e5d80d6e11d19992b7efce794263f0",
  "amount": 700,
  "beneficiary": "PIERRE RICHARD",
  "date": "2018-02-07T23:00:00.000Z",
  "groupAmount": 7.5,
  "isRefund": true,
  "metadata": {
    "version": 1
  },
  "originalAmount": 25,
  "originalDate": "2018-03-11T23:00:00.000Z",
  "socialSecurityRefund": 17.5,
  "subtype": "Consultation spécialiste",
  "type": "health_costs",
  "vendor": "Harmonie"
}
```

### Attributes for pay type

- `date`: {date} - The payment date
- `periodStart`: {date} - The start of the payment period
- `periodEnd`: {date} - The end of the payment period
- `isRefund`: {boolean} - Indicates that the pay represents a positive operation
- `employer`: {boolean} - The employer name

### Example

```
{
  "_id": "62e5d80d6e11d19992b7efce794263f0",
  "vendor": "Payfit",
  "type": "pay",
  "amount": 1500,
  "date": "2018-10-31T00:00:00.000Z",
  "periodStart": "2018-10-01T00:00:00.000Z",
  "periodEnd": "2018-10-31T00:00:00.000Z",
  "employer": "COZY CLOUD",
  "isRefund": true,
  "metadata": {
    "version": 1
  }
  "relationships": {
    "document": {
      "data": { "_id": "c43645a93831827c7ec512eac3006e51", "_type": "io.cozy.files" }
    }
  }
}
```
