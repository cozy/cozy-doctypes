[Table of contents](README.md#table-of-contents)

# Cozy Contacts doctype

## `io.cozy.contacts`

The `io.cozy.contacts` doctype is loosely based on the [vCard RFC](https://tools.ietf.org/html/rfc6350), in that some of the attributes have been renamed for clarity. The attributes with a `?` are optional.

- `indexes` : {object} Used to sort contacts in different ways
  - `byFamilyNameGivenNameEmailCozyUrl`: {string}
- `displayName` : {string} Displayed name in cozy applications
- `fullname?`: {string} Unstructured representation of the name (example: `"Dr. Gregory House, M.D."`)
- `name?`: {object} Optional structured representation of the name, with the following possible attributes:
  - `familyName?`: {string} (example: `"House"`)
  - `givenName?`: {string} (example: `"Gregory"`)
  - `additionalName?`: {string} (example: `"J."`)
  - `namePrefix?`: {string} (example: `"Dr."`)
  - `nameSuffix?`: {string} (example: `"III"`)
- `birthday?`: {date} (example: `"1959-05-15"`)
- `note?`: {string}
- `email?`: {array} An array of email addresses objects with the following attributes:
  - `address`: {string} Email address
  - `type?`: {string} A user-provided localized type (example: `"Personnal"`, `"Profressional"`, `"Other"`)
  - `label?`: {string} A keyword to identify the type, must be `work|home`
  - `primary?`: {boolean} Indicates a preferred-use address
- `address?`: {array} An array of postal addresses objects with the following attributes:
  - `id?`: {string} id of the address
  - `street?`: {string} Street name
  - `pobox?`: {string} P.O Box number
  - `city?`: {string} City name
  - `region?`: {string} Region name
  - `number?`: {string} Lane number
  - `code?`: {string} Postal code
  - `country?`: {string} Country name
  - `type?`: {string} A user-provided localized type (example: `"Personnal"`, `"Profressional"`, `"Other"`)
  - `label?`: {string} A keyword to identify the type, must be `work|home`
  - `primary?`: {boolean} Indicates a preferred-use address
  - `extendedAddress?`: {object}
    - `locality?`: {string} Locality name
    - `building?`: {string} Building number
    - `stairs?`: {string} Stairs number
    - `floor?`: {string} Apartment floor
    - `apartment?`: {string} Apartment number
    - `entrycode?`: {string} Entry code
  - `formattedAddress?`: {string} Unstructured version of the address
  - `geo?`: {object}
    - `geo?`: {array} Coordinates of the address, must be `[long, lat]`
    - `cozyCategory?`: {"home|work"} The category of the address type
- `phone?`: {array} An array of phone number objects with the following attributes:
  - `number`: {string}
  - `type?`: {string} A user-provided localized type (example: `"Personnal"`, `"Profressional"`, `"Other"`), could be provided by Contacts app too as `voice|fax|cell`
  - `label?`: {string} A keyword to identify the type, must be `work|home`
  - `primary?`: {boolean} Indicates a preferred-use number
- `cozy?`: {array} An array of cozy instances with the following attributes:
  - `url`: {string}
  - `type?`: {string} A user-provided localized type (example: `"Personnal"`, `"Profressional"`, `"Other"`)
  - `label?`: {string} A keyword to identify the type, must be `work|home`
  - `primary?`: {boolean} Indicates a preferred-use instance
- `url?`: {string} Deprecated. Cozy instance url. Use `cozy?` array of cozy instances instead.
- `company`: {string} Company
- `jobTitle`: {string} Job title
- `relationships`: {object} links between documents
  - `groups`: {object} groups the contact belongs to
    - `data`: {array} list of groups
      - `_id`: {string} id of the io.cozy.contacts.groups document
      - `_type`: {string} doctype "io.cozy.contacts.groups"
  - `accounts`: {object}
    - `data`: {array} list of accounts
      - `_id`: {string} id of the io.cozy.contacts.accounts document
      - `_type`: {string} doctype "io.cozy.contacts.accounts"
- `trashed?`: {boolean} is `true` if the contact is marked for removal and will be deleted soon (e.g. after remote deletion is confirmed)
- `me`: {boolean} whether the contact matches the cozy owner (defaults to `false`)
- `nationalities?`: {array} 2-letter iso3166 country codes (can be set in io.cozy.identities for legal reasons in Banks)
- `birthcity?`: {string} City of birth of a contact (can be set in io.cozy.identities for legal reasons in Banks)
- `birthcountry?`: {string} Country of birth of a contact (can be set in io.cozy.identities for legal reasons in Banks)
- `metadata`: {object} previous metadata information.
  - `cozy`: {boolean} whether the contact has been created by cozy
  - `google`: {object} Google metadata
  - `version`: {integer} used for migrations. Current version is **1**
- `cozyMetaData`: {object}
  - ...`cozyMetadata`: [Document metadata](./README.md#document-metadata)
  - `sync`: {object}
    - `ded4265b38c54b0683408c76d9ebd`: {object} id of the sourceContactsAccount
      - `konnector`: {string} example : `"google"`
      - `lastSync`: {date} (example: `"2018-10-19T10:58:37.025688+02:00"`) Last time a sync task updated this contact
      - `contactsAccountsId`: {string} id of the io.cozy.contacts.accounts object
      - `id`: {string} id of the remote object
      - `remoteRev`: {string} latest rev of the remote object

## `io.cozy.contacts.groups`

Used to group contacts together. A group can obviously have multiple contacts, but contacts can also be part of multiple groups.

- `name`: {string} is the group's public name
- `trashed?`: {boolean} is `true` if the group is marked for removal and will be deleted soon
- `metadata`: {object}
- `version`: {integer} Used for migrations. Current version is **1**
- `relationships`: {object} links between documents

  - `accounts`: {object}
    - `data`: {array} list of accounts
      - `_id`: {string} id of the io.cozy.contacts.accounts document
      - `_type`: {string} doctype "io.cozy.contacts.accounts"
- `cozyMetaData`: {object}

  - ...`cozyMetadata`: [Document metadata](./README.md#document-metadata)
  - `sync`: {object}

    - `ded4265b38c54b0683408c76d9ebd`: {object} id of the io.cozy.contacts.accounts object

      - `konnector`: {string} example : `"google"`
      - `lastSync`: {date} (example: `"2018-10-19T10:58:37.025688+02:00"`)
      - `contactsAccountsId`: {string} id of the io.cozy.contacts.accounts object
      - `id`: {string} id of the remote object
      - `remoteRev`: {string} latest rev of the remote object

## `io.cozy.contacts.accounts`

Used to know which accounts (Google, Apple, etc) a contact is related to.

- `id`: {id} id of the io.cozy.contacts.account object
- `name`: {string} name of the account (example: `"toto@gmail.com"`)
- `type`: {string} konnector type (example: `"konnector-google"`)
- `canLinkContacts`: {boolean} whether contacts can be linked or unlinked to this source
- `shouldSyncOrphan`: {boolean} whether we should sync orphans with this account or not
- `sourceAccount`: {string} id of the related io.cozy.accounts
- `lastSync`: {date} last remote sync (example: `"2018-10-19T10:58:37.025688+02:00"`)
- `lastLocalSync`: {date} last local sync (example: `"2018-10-19T10:58:37.025688+02:00"`)
- `syncToken`: {string} used to only retrieve what have been edited since last sync (See [request sync token](https://apis-nodejs.firebaseapp.com/people/interfaces/Params$Resource$People$Connections$List.html#requestSyncToken))
- `version`: {integer}
