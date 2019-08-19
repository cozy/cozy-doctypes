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
      "address": [
        {
          "formattedAddress": "2 rue du moulin, 75000 Paris",
          "street": "2 rue du moulin",
          "postcode": "75000",
          "city": "Paris"
        }
      "email": [
        {
          "address": "example@email.com",
        }
      ],
      "name": {
        "familyName": "Dupond",
        "givenName": "Jean"
      },
      "phone": [
        {
          "number": "06 06 06 06 06",
          "primary": true,
          "type": "mobile"
        }
      ]
  },
  "cozyMetadata": {
    "doctypeVersion": 1,
    "createdAt": "xxxxx",
    "createdByApp": "orange",
    "createdByAppVersion": "1.0.0",
    "updatedAt": "xxxxx",
    "updatedByApps": [ "orange" ],
    "sourceAccount": "94263f062e5d66d6e11d19992b7efce7"
  }
}
```
