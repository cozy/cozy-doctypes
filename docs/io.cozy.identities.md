[Table of contents](README.md#table-of-contents)

# Identities doctype

## `io.cozy.identities`

### Description

This doctype represents the differents identities (or profile) of the user, fetched by datasources (connectors most of the time).

In an identity, data is grouped by category : contact, tax_information, housing, incomes…

There are three sources of identity, considering the source of the data:

- source = `connector`:
  - gathers the data held by the online service
  - is the “user profile” known by each different service
- source = `manual` : attributes manually modified byt the user are stored apart in a “manual” identity document. There is only one `manual` identity.
- source = `factorized` : data from `manual` and `connector` identities are automatically factorized in a single identity of type “factorized”. There is only one `factorized` identity.

ℹ️ Whatever the source of the data, all identities must follow the same format, described below.

#### Account

There is one identity per couple `identifier` (unique identifier of the user account)  and `slug` (brand), as well as one associated `io.cozy.accounts`.

The id of the corresponding account and the identifier of the account are in the .cozyMetadata:

- `sourceAccount`: id of the `io.cozy.accounts` document
- `sourceAccountIdentifier`: identifier of this account, for instance “jo32@gmail.com”
  - ℹ️ The identifier is also stored in the `identifier` attribute (data is duplicated)

ℹ️ When an account is disconnected in a connector, then the associated CouchDB document is deleted, but not its corresponding identity. If the same “user account” is connected again, then a new account is created but the corresponding identity is reused.

ℹ️ Multiple connectors may create an identity for a given identifier. That is why an identity will be unique by identifier **and** slug.


#### Manual identity

Data might be modified manually by the user, for instance when modifiying his own contact (i.e. myself contact). Data modified by the user is stored in the "manual identity".

- The identity factorization service will then be able to choose which data should be put into the factorized identity.

#### Factorized identity

Data from different identities is factored into a single identity called the “factorized identity”. It is an identity where source = `factorized`.

For instance, if a user has different email addresses in different online services, only one of these will be chosen to be factorized in the “factorized identity”. 
And if the user modifies his email address, then this one will be stored in the “manual identity” and will be prioritized into the “factorized identity” to be chosen as default.

A service (WIP) is in charge of updating this factorized identity each time a modification occurs in an identity. The service has the knowledge to choose the better information for the factorized identity.

ℹ️ The "factorized identity" might update the mySelf contact document.


### Mandatory attributes

- `identifier`: {string} Login or other identifier unique to the data source
- `source`: {string} A value among `[connector | manual | factorized]`


### Contextual attributes

Depending on the data retrieved by the source, the identity might include those attibutes:

- `contact`: {object} - identity data following the [io.cozy.contacts](./io.cozy.contacts.md) format
- `tax_information`: {array} - there is one element per year
    - `year`: {number} year of the last tax_information
    - `rfr`: {number} “revenu fiscal de référence”, scrapped from “Avis d’imposition” file
    - `1AJ`: {number} scrapped from “Avis d’imposition” file
    - `1BJ`: {number} scrapped from “Avis d’imposition” file
    - `net_monthly_income`: {number}  (1AJ+1BJ) /12 or RFR/12
    - `currency`: {string} https://en.wikipedia.org/wiki/ISO_4217
- `housing` {array} : WIP
- `incomes` {array} : WIP


### Example


```

{
  "_id": "62e5d66d6e11d19992b7efce794263f0",
  "source": "connector",
  "identifier": "example@email.com",
  "contact": {
    "address": [
      {
        "formattedAddress": "2 rue du moulin, 75000 Paris",
        "street": "2 rue du moulin",
        "postcode": "75000",
        "city": "Paris"
      }
    ],
    "email": [
      {
        "address": "example@email.com"
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
    ],
    "maritalStatus": "married",
    "numberOfDependants": 1
  },
  "tax_information": [
    {
      "year": 2022,
      "RFR": 56789.10,
      "1AJ": 12345.67,
      "1BJ": 23456.78,
      "net_monthly_income": 1234.56, # RFR/12
      "currency": "EUR",
      "file": "avis_impot_2022.pdf"      
    },
    {
      "year": 2021,
      "RFR": 45678.91,
      "1AJ": 34567.89,
      "1BJ": 23456.78,
      "net_monthly_income": 3806.5, # RFR/12
      "currency": "EUR",
      "file": "avis_impot_revenu_2022.pdf"      
    }
  ],
  "housing": [
    {
      "address": {
        "formattedAddress": "2 rue du moulin, 75000 Paris",
        "street": "2 rue du moulin",
        "postcode": "75000",
        "city": "Paris"
      },
      "construction_year": 2013,
      "residence_type": "primary",
      "housing_type": "appartment",
      "residents_number": 1,
      "living_space_m2": 30,
      "heating_system": "collective",
      "water_heating_system": "collective",
      "baking_types": [{
        "type": "electric hob",
        "number": 1
      }],
      "energy_providers": [
        // one record per energy_type. It means that if the vendor is the same for gas
        // and electricity, then there are still two records, one for gas and one for 
        // electricity
        {
          "vendor": "edf",
          "energy_type": "electricity",
          "contract_number": "004037770580",
          "pdl_number": "05548480447301",
          "contract_type": "TARIF_BLEU_V2",
          "powerkVA": 6,
          "charging_type": "monthly",
          "electric_consumption": [
            {
              "year": 2022,
              "consumptionkWh": 210,
              "months": [
                {
                  "month": 1,
                  "consumptionkWh": 65
                },
                {
                  "month": 2,
                  "consumptionkWh": 75
                },
                {
                  "month": 3,
                  "consumptionkWh": 70
                }
              ]
            },
            {
              "year": 2021,
              "consumptionkWh": 210,
              "months": [
                {
                  "month": 10,
                  "consumptionkWh": 65
                },
                {
                  "month": 11,
                  "consumptionkWh": 75
                },
                {
                  "month": 12,
                  "consumptionkWh": 70
                }
              ]
            }
          ]
        },
        {
          "vendor": "edf",
          "energy_type": "gas",
          "contract_number": "004037770545",
          "pce_number": "055484804495",
          "contract_type": "MCGN_PG",
          "charging_type": "monthly",
          "gas_consumption": [
            {
              "year": 2022,
              "consumptionkWh": 145,
              "months": [
                {
                  "month": 1,
                  "consumptionkWh": 30
                },
                {
                  "month": 2,
                  "consumptionkWh": 65
                },
                {
                  "month": 3,
                  "consumptionkWh": 50
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "cozyMetadata": {
    "doctypeVersion": 1,
    "createdAt": "2020-11-23T10:36:49.752Z",
    "createdByApp": "edfclientside",
    "createdByAppVersion": "1.0.0",
    "updatedAt": "2021-11-23T10:36:49.752Z",
    "updatedByApps": [
      {
        "date": "2021-11-23T10:36:49.752Z",
        "slug": "edfclientside",
        "version": "1.0.0"
      }
    ],
    "sourceAccount": "94263f062e5d66d6e11d19992b7efce7",
    "sourceAccountIdentifier": "example@email.com"
  }
}


```


