[Table of contents](README.md#table-of-contents)

# Bills doctype

## `io.cozy.bills`

- `type`: {string} - Type of the bill
- `subtype`: {string} - Used for labelling the bill. ie: "Ostéopathie"
- `date`: {date} - Date the bill was emitted
- `originalDate` - For health bills, represents the date of the health act (presumably the date the account was charged)
- `vendor`: {string} - Vendor which issued the bill
- `amount`: {number} - Amount of the bill, __always positive__ even if it is a refund
- `isRefund`: {boolean} - Indicate if the bill represents a refund/reimbursement
- `isThirdPartyPayer`: {boolean} - Indicate if the bill is adressed to a third party payer (and then no associated transaction is expected to be found in bank)
- `originalAmount`: {number} - Original amount in case of a partial refund
- `invoice`: {string} - The associated file. ex: `io.cozy.files:c43645a93831827c7ec512eac3006e51`
- `content`: {string}

## Types

- `health_costs`: Health related bills
- `phone`: Phone related bills
