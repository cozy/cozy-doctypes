[Table of contents](README.md#table-of-contents)

# Auto categorization remote doctype

The `cc.cozycloud.autocategorization` remote doctype is used to anonymously and securely
send the user's bank transactions to an API when he/she enabled the corresponding setting
in the Banks app.

`cc.cozycloud.autocategorization` sends an array of
[`io.cozy.bank.operations`](io.cozy.bank.md#iocozybankoperations), but removes some
properties to anonymize the data. The following properties are kept:

- `amount`
- `date`
- `label`
- `automaticCategoryId`
- `manualCategoryId`
- `cozyCategoryId`
- `cozyCategoryProba`
- `localCategoryId`
- `localCategoryProba`
