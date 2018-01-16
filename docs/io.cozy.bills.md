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
- `isRefund`: {boolean} - Indicate if the bill represents a refund/reimbursement
- `isThirdPartyPayer`: {boolean} - Indicate if the bill is adressed to a third party payer (and then no associated transaction is expected to be found in bank)
- `invoices`: {array[io.cozy.files._id]} - List of files id
- `content`: {string}
- `debitOperations`: {array[io.cozy.bank.operations._id]} - List of debit operations id
- `creditOperations`: {array[io.cozy.bank.operations._id]} - List of credit operations id


## Types

- `health_costs`: Health related bills
- `phone`: Phone related bills
