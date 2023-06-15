# Metadata on `io.cozy.files` documents

## Generic metadata

For generic metadata like `createdAt` or `updatedAt`, please follow the [cozy-doctypes doc](./#generic-model) about generic model

## Image files

For pictures files, like `jpg`, `png`, `gif`...

- `width`: {number}
- `height`: {number}
- `datetime`: {date} : date in original image file metadata
- `gps`: {map} : localization metadata with the following attributes
  - `lat`: {float}: latitude
  - `long`: {float}: longitude
  - `city`: {string}: nearest city (optional)
  - `zip`: {string}: postal code of the nearest city (optional)
  - `country`: {string}: name of the associated country if any (optional)
- `persons`: {array}: the maps can have the following attributes (optional)
  - `name`: {string}: then name of the tagged person on the photo
  - `created_at`: {date}: date of creation of the tag
  - `x`: {float}: x coordinate in the photo where the person is
  - `y`: {float}: y coordinate in the photo where the person is


## Cozy Note files

For a Cozy Note, here is the list:

- `content`: {object} - The Note's content. See https://prosemirror.net/docs/ref/#model for more informations
- `schema`: {object} - The Note's schema. See https://prosemirror.net/docs/guide/#schema for more informations
- `title`: {string} - The Note's title
- `version`: {int} - The Note's version

## Document qualification

It is possible to add semantics to documents in order to qualify them.

A qualification model is available
[here](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/assets/qualifications.json)
that describes the qualification attributes for a set of documents. A
qualification consists of a label bound to some fixed attributes, i.e.`purpose`,
`sourceCategory`, `sourceSubCategory` and `subjects`, all explained in the next
section. Note that for a given label, it is possible to customize the model
attributes values, by following these rules:

  - If a value is defined for the attributes `purpose`,
    `sourceCategory`,`sourceSubCategory`, it  is not possible to customize it.
  - If a value is not defined for one of these attributes, a custom value can be
    defined, if it exists in their respective known values list in the model,
    e.g. `knownSourceCategory`.
  - If some `subjects` values are set, they must be included in the given
    qualification.
  - Extra `subjects` values can be set, but they should exist in the
    `subjectsKnownValues` model list.


A document qualification is typically set by
[konnectors](https://github.com/konnectors/) or by applications such as Cozy
Drive through the
[cozy-scanner](https://github.com/cozy/cozy-libs/tree/master/packages/cozy-scanner/)
library.


### Data structure

### Example

Here is a qualification example:
```
{
  "qualification": {
    "label": "driver_license",
    "purpose": "attestation",
    "sourceCategory": "gov",
    "sourceSubCategory": "transport",
    "subjects": ["permit", "driving"] }
}
```

### Qualification attributes

A qualification can be composed of the following attributes:

- `label`: {string} the document label, which precisely specify what is the
  document. It is the only mandatory attribute in the qualification.
  - Examples: `driver_license`, `car_insurance`, `bank_statement`, etc.
- `purpose`: {string} the goal of the document: for instance, an identity
  document has an `attestation` goal, to attest an identity. In the same manner,
  the purpose of a bill is to `invoice` something.
  - Examples: `attestation`, `invoice`, `contract`, `report`, etc.
- `sourceCategory`: {string} the activity field of the source that produced the
  document.
  - Examples: `gov`, `bank`, `health`, `transport`, etc.
- `sourceSubCategory`: {string} a precision of the activity field of the source
  that produced the document. In some cases, it is necessary when the primary
  field is too broad. Typically, for the `driver_license` label, `gov` is the
  `sourceCategory` and `transport` the `sourceSubCategory`.
  - Examples: `transport`, `health`, `civil_registration`, `health`, etc.
- `subjects`: {array of strings} list what the document is about. For instance,
  a `driver_license` has two subjects: `permit` and `driving`, because this
  document is about the permit to drive a vehicle. Another example is the
  `car_insurance`: the subjects are `insurance` and `car`.
  - Examples: `permit`, `insurance`, `house`, `car`, etc.


For a complete list of the possible values for each attributes, see the
[qualification
model](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/assets/qualifications.json).

If you need to add new values, please consider opening an
[issue](https://github.com/cozy/cozy-client/issues) or making a [pull
request](https://github.com/cozy/cozy-client/pulls) to the cozy-client
repository.

## Additional metadata attributes

Additional metadata attributes might be set to further describe the document.
Most of these attributes heavily depends on the document context and are not
expected in every cases.

- `contentAuthor` : {string} the author of the document, e.g. `impots.gouv`,
  `amazon.com`, etc.
- `datetime` : {date} Equals to the date attribute specified by `datetimeLabel`.
- `datetimeLabel` : {string} specify which attribute is used as `datetime`, e.g.
  `issueDate` or `startDate`.
- `issueDate` : {date} issue date of the document emitted by the vendor.
- `startDate` : {date} first day of a period, e.g. for a contract.
- `endDate` : {date} last day of a period, e.g. for a contract.
- `expirationDate` : {date} last day of validity, e.g. for an identity document.
- `[A|B|C|D]ObtentionDate` : {date} date of obtaining the driving license [A|B|C|D].
- `noticePeriod` : {string} number of days before expiration alert.
- `contractType` : {string} type of employment contract.
- `refTaxIncome` : {string} reference tax income.
- `invoiceNumber` : {string} invoice number.
- `contractReference` : {string} reference of the related contract.
- `isSubscription` : {bool} true if the invoice is related to a subscription
  plan.
- `formReference` : {string} reference of the form (ex: '2042RICI').
- `school` : {string} school name.
- `country` : {string} country name.
- `accountNumber` : {string} number of the related account.
- `bankName` : {string} name of the related bank.
- `carbonCopy`: {boolean} : if the document is the original document imported by the connector
- `electronicSafe`: {boolean} : if the document is secured in a secure storage
- `backupDeviceIds`: {string[]} : id of the devices owning the backup. Only for backup directories.
 
⚠ `carbonCopy` and `electronicSafe` both
[need specific permission](https://docs.cozy.io/en/cozy-stack/files/#post-filesuploadmetadata)
to be added to a document.

### Examples

#### Invoices and documents related to payments

- `datetime` : {date} Equals to `issueDate`
- `datetimeLabel` : {string} `'issueDate'`
- `contentAuthor` : {string}
- `invoiceNumber` : {string} Invoice number
- `contractReference` : {string} Reference of the related contract, if any
- `isSubscription` : {bool} True if the invoice is related to a subscription
  plan

#### Payslips

- `datetime` : {date} Equals to `startDate`
- `datetimeLabel` : {string} `'startDate'`
- `contentAuthor` : {string} Employer on the payslip
- `startDate` : {date} First day of the worked period
- `endDate` : {date} Last day of the worked period
- `issueDate` : {date} Issue date of the document

#### Tax Notices

- `datetime` : {date} Equals to `issueDate`
- `datetimeLabel` : {string} `'issueDate'`
- `contentAuthor` : {string}
- `issueDate` : {date} Issue date of the document
- `refTaxIncom` : {string} reference tax income.

#### Tax Returns

- `datetime` : {date} Equals to `issueDate`
- `datetimeLabel` : {string} `'issueDate'`
- `contentAuthor` : {string}
- `issueDate` : {date} Issue date of the document
- `formReference` : {string} Reference of the form (ex: '2042RICI')

#### Contracts

 - `datetime` : {date} Equals to `startDate`
 - `datetimeLabel` : {string} `'startDate'`
 - `contentAuthor` : {string}
 - `contractReference` : {string} Reference of the contract
 - `contractType` : {string} type of employment contract.
 - `issueDate` : {date} Issue date of the document
 - `startDate` : {date} First day of the validity period
 - `endDate` : {date} Last day of the validity period

#### Certificates

- `datetime` : {date} Equals to `issueDate`
- `datetimeLabel` : {string} `'issueDate'`
- `contentAuthor` : {string}
- `issueDate` : {date} Issue date of the document
- `startDate` : {date} First day of the validity period
- `endDate` : {date} Last day of the validity period

#### Diplomas

- `datetime` : {date} Equals to `startDate`
- `datetimeLabel` : {string} `'startDate'`
- `contentAuthor` : {string}
- `startDate` : First day of the validity period
- `label` : {string} Short description of the diploma
- `school` : {string} School name
- `country` : {string} Country name

#### Driving licenses
- `datetime` : {date} Equals to `startDate`
- `datetimeLabel` : {string} `'startDate'`
- `number` : {string} Document number
- `country` : {string} Country name
- `[A|B|C|D]ObtentionDate` : {date} date of obtaining the driving license [A|B|C|D].

#### Identity documents

- `datetime` : {date} Equals to `startDate`
- `datetimeLabel` : {string} `'startDate'`
- `contentAuthor` : {string}
- `issueDate` : {date} Issue date of the document
- `expirationDate` : {date} Last day of validity
- `number` : {string} Document number
- `school` : {string} School name
- `country` : {string} Country name
- `noticePeriod` : {string} number of days before expiration alert.

#### Bank Statements

- `datetime` : {date} Equals to `startDate`
- `datetimeLabel` : {string} `'startDate'`
- `contentAuthor` : {string}
- `startDate` : {date} First day of the statement period
- `endDate` : {date} Last day of the statement period
- `accountNumber` : {string} Number of the related account
- `bankName` : {string} Name of the related bank

#### Bank Details (IBAN)

- `datetime` : {date} Equals to `issueDate`
- `datetimeLabel` : {string} `'issueDate'`
- `contentAuthor` : {string}
- `issueDate` : {date} Issue date of the document
- `accountNumber` : {string} Number of the related account
- `bankName` : {string} Name of the related bank

#### Mail

- `datetime` : {date} Equals to `issueDate`
- `datetimeLabel` : {string} `'issueDate'`
- `contentAuthor` : {string}

#### Report

- `datetime` : {date} Equals to `issueDate`
- `datetimeLabel` : {string} `'issueDate'`
- `contentAuthor` : {string}


## Files metadata examples

#### Invoices, payment statements, payment schedules

```js
// invoice - bouygues telecom
"metadata": {
  "qualification": {
    "label": "telecom_invoice",
    "purpose": "invoice",
    "sourceCategory": "telecom",
  },
  "datetime": "2019-05-10",
  "datetimeLabel": "issueDate",
  "contentAuthor": "bouyguestelecom",
  "issueDate": "2019-05-10",
  "contractReference": "0645874398",
  "invoiceNumber": "KJF949875",
  "isSubscription": true
},
"cozyMetadata": {
  ...
}
```

```js
// payment statement - ameli
"metadata": {
  "qualification": {
    "label": "health_invoice",
    "purpose": "invoice",
    "sourceCategory": "health"
  },
  "datetime": "2019-05-10",
  "datetimeLabel": "issueDate",
  "contentAuthor": "ameli",
  "issueDate": "2019-05-10"
},
"cozyMetadata": {
  ...
}
```

```js
// payment schedule - EDF
"metadata": {
    "qualification": {
      "label": "energy_invoice",
      "purpose": "invoice",
      "sourceCategory": "energy"
  },
  "datetime": "2019-05-10",
  "datetimeLabel": "issueDate",
  "contentAuthor": "edf",
  "iSubscription": true,
  "issueDate": "2019-05-10"
},
"cozyMetadata": {
  ...
}
```

#### Taxe notices

```js
// taxe notice on income
"metadata": {
  "qualification": {
    "label": "tax_notice",
    "purpose": "invoice",
    "sourceCategory": "gov",
    "sourceSubCategory": "tax",
    "subjects": ["tax"]
  },
  "datetime": "2019-05-10",
  "datetimeLabel": "issueDate",
  "contentAuthor": "impots.gouv",
  "issueDate": "2019-05-10"
},
"cozyMetadata": {
  ...
}
```

```js
// tax return on income
"metadata": {
  "qualification": {
    "label": "tax_return",
    "purpose": "report",
    "sourceCategory": "gov",
    "sourceSubCategory": "tax",
    "subjects": ["tax"]
  },
  "datetime": "2019-05-10",
  "datetimeLabel": "issueDate",
  "contentAuthor": "impots.gouv",
  "formReference": "2042RICI",
  "issueDate": "2019-05-10"
},
"cozyMetadata": {
  ...
}
```

#### Payslips

```js
// payslip - cozycloud
"metadata": {
  "qualification": {
    "label": "pay_sheet",
    "purpose": "attestation",
    "sourceCategory": "employer",
    "subjects": ["work", "revenues"]
  },
  "datetime": "2019-05-01",
  "datetimeLabel": "startDate",
  "contentAuthor": "cozycloud",
  "startDate": "2019-05-01",
  "endDate": "2019-05-31"
},
"cozyMetadata": {
  ...
}
```

#### Certificates

```js
// health insurance attestation - ameli
"metadata": {
  "qualification": {
    "label": "national_insurance_card",
    "purpose": "attestation",
    "sourceCategory": "gov",
    "sourceSubCategory": "health",
    "subjects": ["insurance"]
  },
  "datetime": "2019-05-10",
  "datetimeLabel": "issueDate",
  "contentAuthor": "ameli",
  "issueDate": "2019-05-10",
  "startDate": "2019-01-01",
  "endDate": "2019-12-31"
},
"cozyMetadata": {
  ...
}
```

```js
// car insurance certificate - maif
"metadata": {
  "qualification": {
    "label": "car_insurance",
    "purpose": "attestation",
    "sourceCategory": "insurance",
    "sourceSubCategory": "transport",
    "subjects": ["insurance", "car"]
  },
  "datetime": "2019-05-10",
  "datetimeLabel": "issueDate",
  "contentAuthor": "macif",
  "issueDate": "2019-05-10",
  "startDate": "2019-01-01",
  "endDate": "2019-12-31"
},
"cozyMetadata": {
  ...
}
```

```js
// right certificate - CAF
"metadata": {
  "qualification": {
    "label": "caf",
    "purpose": "attestation",
    "sourceCategory": "gov",
    "sourceSubCategory": "family",
    "subjects": ["right"]
  },
  "datetime": "2019-05-10",
  "datetimeLabel": "issueDate",
  "contentAuthor": "caf",
  "issueDate": "2019-05-10",
  "startDate": "2019-05-01",
  "endDate": "2019-05-31"
},
"cozyMetadata": {
  ...
}
```

#### Identity documents

```js
// id card
"metadata": {
  "qualification": {
    "label": "national_id_card",
    "purpose": "attestation",
    "sourceCategory": "gov",
    "sourceSubCategory": "civil_registration",
    "subjects": ["identity"]
  },
  "datetime": "2019-05-10",
  "datetimeLabel": "issueDate",
  "contentAuthor": "france",
  "issueDate": "2014-05-10",
  "expirationDate": "2029-05-10",
  "number": "ABC123456",
  "country": "france",
  "relationships": {
    "contacts": {
      "data": {
        "_id": "ce61088e116994e265d7f0e6091d0755",
        "_type": "io.cozy.contacts"
      }
    }
  },
}
"cozyMetadata": {
  ...
}
```
