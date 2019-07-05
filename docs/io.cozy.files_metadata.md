
# Metadata on `io.cozy.files` documents

## Data structure

**Common attributes**
There attributes are share by all the documents types covered by the specification.


    `classification`: (string) Document types
    `datetime` : (timestamp) Functionnal date of the document, most of the time the document issue date
    `datetimeLabel`: (string) Functionnal meaning of datetime
    `contentAuthor`: (string) Author of the content of the document, can be different of the source connector

**Other Attributes**
These attributes depend on the `classification`.


    `subClassification`: (string) subType of the document (ex: invoice, payment_statement, payment_schedules)
    `categories`: (array of string) list of tags referring to the field of activity, can be deduced from the categories of connectors
    `subjects` : (array of string) list of tags referring to the subject of the document
    ... 


## Description of different document types

**Invoices and documents related to payments**


    `classification` : "invoicing"
    `datetime` : equal to issueDate
    `datetimeLabel` : "issueDate"
    `contentAuthor` :
    `categories` : [phone, isp, energy, public_service, health…] (array)
    `subClassification` : (invoice, payment_statement, payment_schedule)
    `issueDate` : issue date of the document
    `invoiceNumber` : 
    `contractReference` : 
    `isSubscription` : (bool) true if the invoice is related to a subscription plan

**Payslips**

    `classification` : "payslip"
    `datetime` : equal to startDate
    `datetimeLabel` : "startDate"
    `contentAuthor` : employer
    `startDate` : first day of the worked period
    `endDate` : last day of the worked period
    `issueDate` : issue date of the document

**Tax Notices**

    `classification` : "tax_notice"
    `datetime` : equal to issueDate
    `datetimeLabel` : "issueDate"
    `contentAuthor` :
    `subjects` : [income, property, residence, corporate] (array)
    `issueDate` : issue date of the document

**Tax Returns**

    `classification` : "tax_return"
    `datetime` : equal to issueDate
    datetimeLabel` : "issueDate"
    `contentAuthor` :
    `subjects` : [income, property, residence, corporate] (array)
    `issueDate` : issue date of the document
    `formReference` : reference of the form (ex: "2042RICI")

**Contracts**

	   `classification` : "contract"
	   `datetime` : equal to startDate
	   `datetimeLabel` : "startDate"
	   `contentAuthor` :
	   `categories` : [insurance, employment, health, energy, phone, isp, real-estate] (array)
	   `subjects` : [house, car, health, life, rent] (array)
	   `contractReference` : reference of the contract
	   `issueDate` : issue date of the document
	   `startDate` : first day of the validity period
	   `endDate` : last day of the validity period

**Certificates**

    `classification` : "certificate"
    `datetime` : equal to issueDate
    `datetimeLabel` : "issueDate"
    `contentAuthor` :
    `categories` : [insurance, employment, health, energy, phone, isp, real-estate, public_service, tax] (array)
    `subjects` : [house, car, health, life, property, subscription] (array)
    `issueDate` : issue date of the document
    `startDate` : first day of the validity period
    `endDate` : last day of the validity period

**Diplomas and Driving licenses**

    `classification` : "diploma"
    `datetime` : equal to startDate
    `datetimeLabel` : "startDate"
    `contentAuthor` :
    `subClassification` : (school, driving, flying, sport)
    `startDate` : first day of the validity period
    `label` : short description of the diploma
    `school` : school name
    `country` : country name

**Identity documents**

    `classification` : "identity_document"
    `datetime` : equal to startDate
    `datetimeLabel` : "startDate"
    `contentAuthor` :
    `subClassification` : (national_id_card, passport, family_record_book)
    `issueDate` : issue date of the document
    `expirationDate` : last day of validity
    `number` : document number
    `school` : school name
    `country` : country name

**Bank Statements**

    `classification` : "bank_statement"
    `datetime` : equal to startDate
    `datetimeLabel` : "startDate"
    `contentAuthor` :
    `startDate` : first day of the statement period
    `endDate` : last day of the statement period
    `accountNumber` : number of the related account
    `bankName` : name of the related bank

**Bank Details (IBAN)**

    `classification` : "bank_details"
    `datetime` : equal to issueDate
    `datetimeLabel` : "issueDate"
    `contentAuthor` :
    `issueDate` : issue date of the document
    `accountNumber` : number of the related account
    `bankName` : name of the related bank

**Mail**

    `classification` : "mail"
    `datetime` : equal to issueDate
    `datetimeLabel` : "issueDate"
    `contentAuthor` :
    `categories` : [insurance, employment, health, energy, phone, isp, real-estate, tax]

**Report**

    `classification` : "mail"
    `datetime` : equal to issueDate
    `datetimeLabel` : "issueDate"
    `contentAuthor` :
    `subjects` : [theft, loss, damage, accident] (array)

**Office**

    `classification` : "office"
    `subClassification` : (textpad, spreadsheet, slides)


## Examples

**Invoices, payment statements, payment schedules**
    
    // invoice - bouygues telecom
    {
      "_id": "62e5d66d6e11d19992b7efce794263f0",
      "type": "file",
      "class": "pdf",
      "metadata": {
        "classification": "invoicing",
        "datetime": "2019-05-10T23:00:00.000Z",
        "datetimeLabel": "issueDate",
        "contentAuthor": "bouyguestelecom",
        "categories": ["phone","isp","telecom"],
        "subClassification": "invoice",
        "issueDate": "2019-05-10T23:00:00.000Z",
        "contractReference": "0645874398",
        "invoiceNumber": "KJF949875",
        "isSubscription": true,
        }
      "cozyMetadata": {
        ...
      }
    }
    
    // payment statement - ameli
    {
      "_id": "62e5d66d6e11d19992b7efce794263f0",
      "type": "file",
      "class": "pdf",
      "metadata": {
        "classification": "invoicing",
        "datetime": "2019-05-10T23:00:00.000Z",
        "datetimeLabel": "issueDate",
        "contentAuthor": "ameli",
        "categories": ["insurance", "health"],
        "subClassification": "payment_statement",
        "issueDate": "2019-05-10T23:00:00.000Z",
        }
      "cozyMetadata": {
        ...
      }
    }
    
    // payment schedule - EDF
    {
      "_id": "62e5d66d6e11d19992b7efce794263f0",
      "type": "file",
      "class": "pdf",
      "metadata": {
        "classification": "invoicing",
        "datetime": "2019-05-10T23:00:00.000Z",
        "datetimeLabel": "issueDate",
        "contentAuthor": "edf",
        "categories": ["energy"],
        "subClassification": "paiement_schedule",
        "iSubscription": true,
        "issueDate": "2019-05-10T23:00:00.000Z",
        }
      "cozyMetadata": {
        ...
      }
    }


**Taxe notices**


    // taxe notice on income
    {
      "_id": "62e5d66d6e11d19992b7efce794263f0",
      "type": "file",
      "class": "pdf",
      "metadata": {
        "classification": "tax_notice",
        "datetime": "2019-05-10T23:00:00.000Z",
        "datetimeLabel": "issueDate",
        "contentAuthor": "impots.gouv",
        "subjects": ["income"],
        "issueDate": "2019-05-10T23:00:00.000Z",
        }
      "cozyMetadata": {
        ...
      }
    }
    
    // tax return on income
    {
      "_id": "62e5d66d6e11d19992b7efce794263f0",
      "type": "file",
      "class": "pdf",
      "metadata": {
        "classification": "tax_report",
        "datetime": "2019-05-10T23:00:00.000Z",
        "datetimeLabel": "issueDate",
        "contentAuthor": "impots.gouv",
        "subjects": ["income"],
        "formReference": "2042RICI",
        "issueDate": "2019-05-10T23:00:00.000Z",
        }
      "cozyMetadata": {
        ...
      }
    }


**Payslips**


    
    // payslip - cozycloud
    {
      "_id": "62e5d66d6e11d19992b7efce794263f0",
      "type": "file",
      "class": "pdf",
      "metadata": {
        "classification": "payslip",
        "datetime": "2019-05-01T23:00:00.000Z",
        "datetimeLabel": "startDate",
        "contentAuthor": "cozycloud",
        "startDate": "2019-05-01T23:00:00.000Z",
        "endDate": "2019-05-31T23:00:00.000Z",
        }
      "cozyMetadata": {
        ...
      }
    }


**Attestations**


    
    // contrat certificate - EDF
    {
      "_id": "62e5d66d6e11d19992b7efce794263f0",
      "type": "file",
      "class": "pdf",
      "metadata": {
        "classification": "certificate",
        "datetime": "2019-05-10T23:00:00.000Z",
        "datetimeLabel": "startDate",
        "contentAuthor": "edf",
        "categories": ["energy"],
        "subjects": ["subscription"],
        "startDate": "2019-05-10T23:00:00.000Z",
        "issueDate": "2019-05-10T23:00:00.000Z",
        }
      "cozyMetadata": {
        ...
      }
    }
    
    // health insurance certificate - ameli
    {
      "_id": "62e5d66d6e11d19992b7efce794263f0",
      "type": "file",
      "class": "pdf",
      "metadata": {
        "classification": "certificate",
        "datetime": "2019-05-10T23:00:00.000Z",
        "datetimeLabel": "startDate",
        "contentAuthor": "ameli",
        "categories": ["insurance"],
        "subCategories" : ["health"],
        "startDate": "2019-01-01T23:00:00.000Z",
        "endDate": "2019-12-31T23:00:00.000Z",
        "issueDate": "2019-05-10T23:00:00.000Z",
        }
      "cozyMetadata": {
        ...
      }
    }
    
    // car insurance certificate - maif
    {
      "_id": "62e5d66d6e11d19992b7efce794263f0",
      "type": "file",
      "class": "pdf",
      "metadata": {
        "classification": "certificate",
        "datetime": "2019-05-10T23:00:00.000Z",
        "datetimeLabel": "startDate",
        "contentAuthor": "macif",
        "categories": ["insurance"],
        "subCategories" : ["car"],
        "startDate": "2019-01-01T23:00:00.000Z",
        "endDate": "2019-12-31T23:00:00.000Z",
        "issueDate": "2019-05-10T23:00:00.000Z",
        }
      "cozyMetadata": {
        ...
      }
    }
    
    // tax certificate - CAF
    {
      "_id": "62e5d66d6e11d19992b7efce794263f0",
      "type": "file",
      "class": "pdf",
      "metadata": {
        "classification": "certificate",
        "datetime": "2019-05-10T23:00:00.000Z",
        "datetimeLabel": "startDate",
        "contentAuthor": "caf",
        "categories": ["public_service", "tax"],
        "startDate": "2019-01-05T23:00:00.000Z",
        "endDate": "2019-05-31T23:00:00.000Z",
        "issueDate": "2019-05-10T23:00:00.000Z",
        }
      "cozyMetadata": {
        ...
      }
    }
    


**Pièces d’identité**


    
    // id card
    {
      "_id": "62e5d66d6e11d19992b7efce794263f0",
      "type": "file",
      "class": "pdf",
      "metadata": {
        "classification": "identity_document",
        "datetime": "2019-05-10T23:00:00.000Z",
        "datetimeLabel": "issueDate",
        "contentAuthor": "france",
        "subClassification": "national_id_card",
        "issueDate": "2014-05-10T23:00:00.000Z",
        "expirationDate": "2029-05-10T23:00:00.000Z",
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
    }

