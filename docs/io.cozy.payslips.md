[Table of contents](README.md#table-of-contents)

# Payslips doctype

## `io.cozy.payslips`

- `vendor`: {string} - Vendor which issued the payslip
- `date`: {date} - Date the payslip was emitted
- `amount`: {number} - Amount of the payslip, __always positive__ even if it is the payslip of an employee. This amount should always be the amount which will be found in the bank operations.


### Relationships

The eventual related documents
- `document`: {object} - The associated file. ex:
```
{
  data: {
    _id: "c43645a93831827c7ec512eac3006e51",
    _type: "io.cozy.files"
  }
}
```

### Some more attributes for employee's payslip

The are some more possible attributes for employee payslips.

- `isEmployee`: {boolean} - Indicate if this payslip is paid to an employee of the owner of the cozy. If false, this is a payslip received by the owner.
- `beneficiary`: {string} - Indicate the name of the employee

### Example

```
{
  "_id": "62e5d80d6e11d19992b7efce794263f0",
  "amount": 2000,
  "date": "2018-02-07T23:00:00.000Z",
  "vendor": "Payfit",
  "metadata": {
    "version": 1
  },
  $relationships: {
    document: { data: { _id: "c43645a93831827c7ec512eac3006e51", _type: "io.cozy.files" } }
  }
}
```

```
{
  "_id": "62e5d83d6e11d19992b7efce794263f0",
  "amount": 100,
  "date": "2018-04-07T03:00:00.000Z",
  "vendor": "CESU",
  "isEmployee": true,
  "beneficiary": "Pierre Richard",
  "metadata": {
    "version": 1
  },
  $relationships: {
    payslip: { data: { _id: "c43645a93831827c7ec512eac3006e51", _type: "io.cozy.files" } }
  }
}
```
