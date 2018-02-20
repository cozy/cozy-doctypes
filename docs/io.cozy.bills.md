[Table of contents](README.md#table-of-contents)

# Bills doctype

## `io.cozy.bills`

- `type`: {string} - Type of the bill
- `subtype`: {string}
- `date`: {date}
- `vendor`: {string} - Vendor which issued the bill
- `amount`: {number}
- `originalAmount`: Original amount in case of a partial refund
- `groupAmount`: Group amount in case this bill was part of a grouped refund
- `plan`: {string}
- `pdfurl`: {string} - The associated file
- `binaryId`: {string}
- `fileId`: {string}
- `content`: {string}
- `isRefund`: {boolean}

## Types

- `health_costs`: Health related bills
- `phone`: Phone related bills
