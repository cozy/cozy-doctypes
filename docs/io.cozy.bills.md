[Table of contents](README.md#table-of-contents)

# Bills doctype

## `io.cozy.bills`

- `type`: {string} - Type of the bill
- `date`: {date} - Date the bill was emitted
- `vendor`: {string} - Vendor which issued the bill
- `amount`: {number} - Amount of the bill, __always positive__ even if it is a refund
- `groupAmount`: Group amount in case this bill was part of a grouped refund
- `isThirdPartyPayer`: {boolean} - Indicate if the bill is adressed to a third party payer (and then no associated transaction is expected to be found in bank)
- `invoice`: {string} - The associated file. ex: `io.cozy.files:c43645a93831827c7ec512eac3006e51`
- `content`: {string}

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
