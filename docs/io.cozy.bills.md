[Table of contents](README.md#table-of-contents)

# Bills doctype

## `io.cozy.bills`

### Description
- Represents the a bill (invoice) or refund from a vendor.

### Mandatory attributes

- `type`: {string} - Type of the bill
- `vendor`: {string} - Vendor which issued the bill
- `date`: {date} - Date the bill was emitted, a string formated  (what you get with a `new Date().toString()`)
- `amount`: {number} - Amount of the bill, __always positive__ even if it is a refund
- `currency` : the currency, must respects ISO standard : https://en.wikipedia.org/wiki/ISO_4217

### Optionnal attributes (but some are important depending the context)

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
- `invoice`: {string} - The associated file. ex: `io.cozy.files:c43645a93831827c7ec512eac3006e51`
- `fileUrl`: {string} - The url used to download the pdf from vendor.
- `debitOperations`: {array[io.cozy.bank.operations._id]} - List of debit operations id
- `creditOperations`: {array[io.cozy.bank.operations._id]} - List of credit operations id
- `vendorRef` : {string} - Vendor reference for this bill. Ex : `'INV-2018-09-12534'k`


### Types

- `health_costs`: Health related bills
- `phone`: Phone related bills

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
