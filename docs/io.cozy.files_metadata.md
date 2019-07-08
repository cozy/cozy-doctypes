
# Metadata on `io.cozy.files` documents

## Pictures

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


## Administrative documents

Mostly imported by the connectors, cozy stores many different types of administrative documents, like invoices, contracts or certificates.

### Data structure

#### Common attributes
There attributes are share by all the documents types covered by the specification.


- `classification`: {string} Document types
- `datetime` : {timestamp} Functional date of the document, most of the time the document issue date
- `datetimeLabel`: {string} Functional meaning of datetime
- `contentAuthor`: {string} Author of the content of the document, can be different of the source connector

#### Other Attributes
These attributes depend on the `classification`.


-  `subClassification`: {string} Subtype of the document (ex: invoice, payment_statement, payment_schedules)
-  `categories`: {array of strings} List of tags referring to the field of activity, can be deduced from the categories of connectors
-  `subjects` : {array of strings} List of tags referring to the subject of the document
  ...


### Description of different document types

#### Invoices and documents related to payments

- `classification` : {string} `'invoicing'`
- `datetime` : {timestamp} Equals to `issueDate`
- `datetimeLabel` : {string} `'issueDate'`
- `contentAuthor` : {string}
- `subClassification` : {string} `['invoice'`, `'payment_statement'`, `'payment_schedule'`]
- `categories` : {array of strings} [`'phone'`, `'isp'`, `'energy'`, `'public_service'`, `'health'`, …]
- `issueDate` : {timestamp} Issue date of the document
- `invoiceNumber` : {string} Invoice number
- `contractReference` : {string} Reference of the related contract, if any
- `isSubscription` : {bool} True if the invoice is related to a subscription plan

#### Payslips

- `classification` : {string} `'payslip'`
- `datetime` : {timestamp} Equals to `startDate`
- `datetimeLabel` : {string} `'startDate'`
- `contentAuthor` : {string} Employer on the payslip
- `startDate` : {timestamp} First day of the worked period
- `endDate` : {timestamp} Last day of the worked period
- `issueDate` : {timestamp} Issue date of the document

#### Tax Notices

- `classification` : {string} `'tax_notice'`
- `datetime` : {timestamp} Equals to `issueDate`
- `datetimeLabel` : {string} `'issueDate'`
- `contentAuthor` : {string} 
- `subjects` : {string} [`'income'`, `'property'`, `'residence'`, `'corporate'`]
- `issueDate` : {timestamp} Issue date of the document

#### Tax Returns

- `classification` : {string} `'tax_return'`
- `datetime` : {timestamp} Equals to `issueDate`
- `datetimeLabel` : {string} `'issueDate'`
- `contentAuthor` : {string} 
- `subjects` : {array of strings} [`'income'`, `'property'`, `'residence'`, `'corporate'`]
- `issueDate` : {timestamp} Issue date of the document
- `formReference` : {string} Reference of the form (ex: '2042RICI')

#### Contracts

 - `classification` : {string} `'contract'`
 - `datetime` : {timestamp} Equals to `startDate`
 - `datetimeLabel` : {string} `'startDate'`
 - `contentAuthor` : {string} 
 - `categories` : {array of strings} [`'insurance'`, `'employment'`, `'health'`, `'energy'`, `'phone'`, `'isp'`, `'real_estate'`]
 - `subjects` : {array of strings} [`'house'`, `'car'`, `'health'`, `'life'`, `'rent'`]
 - `contractReference` : {string} Reference of the contract
 - `issueDate` : {timestamp} Issue date of the document
 - `startDate` : {timestamp} First day of the validity period
 - `endDate` : {timestamp} Last day of the validity period

#### Certificates

- `classification` : {string} `'certificate'`
- `datetime` : {timestamp} Equals to `issueDate`
- `datetimeLabel` : {string} `'issueDate'`
- `contentAuthor` : {string} 
- `categories` : {array of strings} [`'insurance'`, `'employment'`, `'health'`, `'energy'`, `'phone'`, `'isp'`, `'real_estate'`, `'public_service'`, `'tax'`]
- `subjects` : {array of strings} [`'house'`, `'car'`, `'health'`, `'life'`, `'property'`, `'subscription'`]
- `issueDate` : {timestamp} Issue date of the document
- `startDate` : {timestamp} First day of the validity period
- `endDate` : {timestamp} Last day of the validity period

#### Diplomas and Driving licenses

- `classification` : {string} `'diploma'`
- `datetime` : {timestamp} Equals to `startDate`
- `datetimeLabel` : {string} `'startDate'`
- `contentAuthor` : {string} 
- `subClassification` : {string} [`'school'`, `'driving'`, `'flying'`, `'sport'`]
- `startDate` : First day of the validity period
- `label` : {string} Short description of the diploma
- `school` : {string} School name
- `country` : {string} Country name

#### Identity documents

- `classification` : {string} `'identity_document'`
- `datetime` : {timestamp} Equals to `startDate`
- `datetimeLabel` : {string} `'startDate'`
- `contentAuthor` : {string} 
- `subClassification` : {string} [`'national_id_card'`, `'passport'`, `'family_record_book'`]
- `issueDate` : {timestamp} Issue date of the document
- `expirationDate` : {timestamp} Last day of validity
- `number` : {string} Document number
- `school` : {string} School name
- `country` : {string} Country name

#### Bank Statements

- `classification` : {string} `'bank_statement'`
- `datetime` : {timestamp} Equals to `startDate`
- `datetimeLabel` : {string} `'startDate'`
- `contentAuthor` : {string} 
- `startDate` : {timestamp} First day of the statement period
- `endDate` : {timestamp} Last day of the statement period
- `accountNumber` : {string} Number of the related account
- `bankName` : {string} Name of the related bank

#### Bank Details (IBAN)

- `classification` : {string} `'bank_details'`
- `datetime` : {timestamp} Equals to `issueDate`
- `datetimeLabel` : {string} `'issueDate'`
- `contentAuthor` : {string} 
- `issueDate` : {timestamp} Issue date of the document
- `accountNumber` : {string} Number of the related account
- `bankName` : {string} Name of the related bank

#### Mail

- `classification` : {string} `'mail'`
- `datetime` : {timestamp} Equals to `issueDate`
- `datetimeLabel` : {string} `'issueDate'`
- `contentAuthor` : {string}
- `categories` : {array of strings} [`'insurance'`, `'employment'`, `'health'`, `'energy'`, `'phone'`, `'isp'`, `'real_estate'`, `'tax'`]

#### Report

- `classification` : {string} `'mail'`
- `datetime` : {timestamp} Equals to `issueDate`
- `datetimeLabel` : {string} `'issueDate'`
- `contentAuthor` : {string} 
- `subjects` : {array of strings} [`'theft'`, `'loss'`, `'damage'`, `accident`]

#### Office

- `classification` : {string} `'office'`
- `subClassification` : {string} [`'textpad'`, `'spreadsheet'`, `'slides'`]


### Examples

#### Invoices, payment statements, payment schedules

    // invoice - bouygues telecom
    {
      '_id': '62e5d66d6e11d19992b7efce794263f0',
      'type': 'file',
      'class': 'pdf',
      'metadata': {
        'classification': 'invoicing',
        'datetime': '2019-05-10T23:00:00.000Z',
        'datetimeLabel': 'issueDate',
        'contentAuthor': 'bouyguestelecom',
        'categories': ['phone','isp','telecom'],
        'subClassification': 'invoice',
        'issueDate': '2019-05-10T23:00:00.000Z',
        'contractReference': '0645874398',
        'invoiceNumber': 'KJF949875',
        'isSubscription': true,
        }
      'cozyMetadata': {
        ...
      }
    }

    // payment statement - ameli
    {
      '_id': '62e5d66d6e11d19992b7efce794263f0',
      'type': 'file',
      'class': 'pdf',
      'metadata': {
        'classification': 'invoicing',
        'datetime': '2019-05-10T23:00:00.000Z',
        'datetimeLabel': 'issueDate',
        'contentAuthor': 'ameli',
        'categories': ['insurance', 'health'],
        'subClassification': 'payment_statement',
        'issueDate': '2019-05-10T23:00:00.000Z',
        }
      'cozyMetadata': {
        ...
      }
    }

    // payment schedule - EDF
    {
      '_id': '62e5d66d6e11d19992b7efce794263f0',
      'type': 'file',
      'class': 'pdf',
      'metadata': {
        'classification': 'invoicing',
        'datetime': '2019-05-10T23:00:00.000Z',
        'datetimeLabel': 'issueDate',
        'contentAuthor': 'edf',
        'categories': ['energy'],
        'subClassification': 'paiement_schedule',
        'iSubscription': true,
        'issueDate': '2019-05-10T23:00:00.000Z',
        }
      'cozyMetadata': {
        ...
      }
    }


#### Taxe notices


    // taxe notice on income
    {
      '_id': '62e5d66d6e11d19992b7efce794263f0',
      'type': 'file',
      'class': 'pdf',
      'metadata': {
        'classification': 'tax_notice',
        'datetime': '2019-05-10T23:00:00.000Z',
        'datetimeLabel': 'issueDate',
        'contentAuthor': 'impots.gouv',
        'subjects': ['income'],
        'issueDate': '2019-05-10T23:00:00.000Z',
        }
      'cozyMetadata': {
        ...
      }
    }

    // tax return on income
    {
      '_id': '62e5d66d6e11d19992b7efce794263f0',
      'type': 'file',
      'class': 'pdf',
      'metadata': {
        'classification': 'tax_report',
        'datetime': '2019-05-10T23:00:00.000Z',
        'datetimeLabel': 'issueDate',
        'contentAuthor': 'impots.gouv',
        'subjects': ['income'],
        'formReference': '2042RICI',
        'issueDate': '2019-05-10T23:00:00.000Z',
        }
      'cozyMetadata': {
        ...
      }
    }


#### Payslips


    // payslip - cozycloud
    {
      '_id': '62e5d66d6e11d19992b7efce794263f0',
      'type': 'file',
      'class': 'pdf',
      'metadata': {
        'classification': 'payslip',
        'datetime': '2019-05-01T23:00:00.000Z',
        'datetimeLabel': 'startDate',
        'contentAuthor': 'cozycloud',
        'startDate': '2019-05-01T23:00:00.000Z',
        'endDate': '2019-05-31T23:00:00.000Z',
        }
      'cozyMetadata': {
        ...
      }
    }


#### Certificates



    // contrat certificate - EDF
    {
      '_id': '62e5d66d6e11d19992b7efce794263f0',
      'type': 'file',
      'class': 'pdf',
      'metadata': {
        'classification': 'certificate',
        'datetime': '2019-05-10T23:00:00.000Z',
        'datetimeLabel': 'startDate',
        'contentAuthor': 'edf',
        'categories': ['energy'],
        'subjects': ['subscription'],
        'startDate': '2019-05-10T23:00:00.000Z',
        'issueDate': '2019-05-10T23:00:00.000Z',
        }
      'cozyMetadata': {
        ...
      }
    }

    // health insurance certificate - ameli
    {
      '_id': '62e5d66d6e11d19992b7efce794263f0',
      'type': 'file',
      'class': 'pdf',
      'metadata': {
        'classification': 'certificate',
        'datetime': '2019-05-10T23:00:00.000Z',
        'datetimeLabel': 'startDate',
        'contentAuthor': 'ameli',
        'categories': ['insurance'],
        'subCategories' : ['health'],
        'startDate': '2019-01-01T23:00:00.000Z',
        'endDate': '2019-12-31T23:00:00.000Z',
        'issueDate': '2019-05-10T23:00:00.000Z',
        }
      'cozyMetadata': {
        ...
      }
    }

    // car insurance certificate - maif
    {
      '_id': '62e5d66d6e11d19992b7efce794263f0',
      'type': 'file',
      'class': 'pdf',
      'metadata': {
        'classification': 'certificate',
        'datetime': '2019-05-10T23:00:00.000Z',
        'datetimeLabel': 'startDate',
        'contentAuthor': 'macif',
        'categories': ['insurance'],
        'subCategories' : ['car'],
        'startDate': '2019-01-01T23:00:00.000Z',
        'endDate': '2019-12-31T23:00:00.000Z',
        'issueDate': '2019-05-10T23:00:00.000Z',
        }
      'cozyMetadata': {
        ...
      }
    }

    // tax certificate - CAF
    {
      '_id': '62e5d66d6e11d19992b7efce794263f0',
      'type': 'file',
      'class': 'pdf',
      'metadata': {
        'classification': 'certificate',
        'datetime': '2019-05-10T23:00:00.000Z',
        'datetimeLabel': 'startDate',
        'contentAuthor': 'caf',
        'categories': ['public_service', 'tax'],
        'startDate': '2019-01-05T23:00:00.000Z',
        'endDate': '2019-05-31T23:00:00.000Z',
        'issueDate': '2019-05-10T23:00:00.000Z',
        }
      'cozyMetadata': {
        ...
      }
    }



#### Identity documents



    // id card
    {
      '_id': '62e5d66d6e11d19992b7efce794263f0',
      'type': 'file',
      'class': 'pdf',
      'metadata': {
        'classification': 'identity_document',
        'datetime': '2019-05-10T23:00:00.000Z',
        'datetimeLabel': 'issueDate',
        'contentAuthor': 'france',
        'subClassification': 'national_id_card',
        'issueDate': '2014-05-10T23:00:00.000Z',
        'expirationDate': '2029-05-10T23:00:00.000Z',
        'number': 'ABC123456',
        'country': 'france',
        'relationships': {
          'contacts': {
            'data': {
              '_id': 'ce61088e116994e265d7f0e6091d0755',
              '_type': 'io.cozy.contacts'
            }
          }
        },
      }
      'cozyMetadata': {
        ...
      }
    }
