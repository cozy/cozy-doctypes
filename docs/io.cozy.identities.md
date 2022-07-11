[Table of contents](README.md#table-of-contents)

# Identities doctype

## `io.cozy.identities`

### Description

- Represents the differents identities fetched by datasources (connectors most of the time)

### Mandatory attributes

- `identifier`: {string} - login or other identifier unique to the data source
- `contact`: {object} - identity data following the [io.cozy.contacts](./io.cozy.contacts.md) format

Multiple connectors may create an identity for a given identifier. That is why an identity will
unique by identifier **and** cozyMetadata.createdByApp

```
{
  "_id": "62e5d66d6e11d19992b7efce794263f0",
  "identifier": "example@email.com",
  "contact": {
      "addresses": [
        {
          "formattedAddress": "2 rue du moulin, 75000 Paris",
          "street": "2 rue du moulin",
          "postcode": "75000",
          "city": "Paris"
        }
      "emails": [
        {
          "address": "example@email.com",
        }
      ],
      "name": {
        "familyName": "Dupond",
        "givenName": "Jean"
      },
      "phones": [
        {
          "number": "06 06 06 06 06",
          "primary": true,
          "type": "mobile"
        }
      ],
      "maritalStatus": "married",
      "numberOfDependants": 1
  },
  "tax_informations": [
    {
      "year": "2022",
      "RFR": "56789.10",
      "1AJ": "12345.67",
      "1BJ": "23456.78",
      "currency": "EUR",
      "file": "avis_impot_2022.pdf"      
    },
    {
      "year": "2021",
      "RFR": "45678.91",
      "1AJ": "34567.89",
      "1BJ": "23456.78",
      "currency": "EUR",
      "file": "avis_impot_2022.pdf"      
    }
],
  "revenues": [
    {
      "date": "2022-02-24",
      "net_monthly_income": "1234.56",
      "currency": "EUR" #si on l'a
      "file": "fdp_022022.pdf"
    }
  ],
  "cozyMetadata": {
    "doctypeVersion": 1,
    "createdAt": "xxxxx",
    "createdByApp": "orange",
    "createdByAppVersion": "1.0.0",
    "updatedAt": "xxxxx",
    "updatedByApps": [
      {
        "date": "2021-11-23T10:36:49.752Z",
        "slug": "connecteur",
        "version": "1.12.4"
      }
    ]
    "sourceAccount": "XXXXXXXXXXXXX"
    "sourceAccountIdentifier": "1234567891011",
  }
}
```
