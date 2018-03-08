[Table of contents](README.md#table-of-contents)

# Bills doctype


## `io.cozy.bills`

- `type`: {string} - Type of the bill
- `subtype`: {string} - Used for labelling the bill. ie: "Ostéopathie"
- `vendor`: {string} - Vendor which issued the bill
- `date`: {date} - Date the bill was emitted
- `originalDate` - For health bills, represents the date of the health act (presumably the date the account was charged)
- `amount`: {number} - Amount of the bill, __always positive__ even if it is a refund
- `originalAmount`: {number} - Original amount in case of a partial refund
- `groupAmount`: Group amount in case this bill was part of a grouped refund
- `thirdPartyRefund` : {number} - Amount reimbursed to third parties
- `socialSecurityRefund` : {number} - Amount reimbursed to social security
- `isRefund`: {boolean} - Indicate if the bill represents a refund/reimbursement
- `isThirdPartyPayer`: {boolean} - Indicate if the bill has been already covered by a third party payer. This attribute can be useful when Cozy retrieves bills issued by french medical insurances.
When this attribute is in "true" no associated debit is expected to be found in the client bank
statements.
- `invoice`: {string} - The associated file. ex: `io.cozy.files:c43645a93831827c7ec512eac3006e51`
- `content`: {string}
- `debitOperations`: {array[io.cozy.bank.operations._id]} - List of debit operations id
- `creditOperations`: {array[io.cozy.bank.operations._id]} - List of credit operations id


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
