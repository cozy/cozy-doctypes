[Table of contents](README.md#table-of-contents)

# Cozy Contacts doctype

## `io.cozy.contacts`

The `io.cozy.contacts` doctype is loosely based on the [vCard RFC](https://tools.ietf.org/html/rfc6350), in that some of the attributes have been renamed for clarity. The attributes with a `?` are optional.

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
  - `address`: {string} Email adress
  - `type?`: {string} Programmatic type of email (`"work"`, `"home"`, `"other"`)
  - `label?`: {string} A user-provided localized type of email (example: `"Work"`)
  - `primary?`: {boolean} Indicates a preferred-use address
- `address?`: {array} An array of postal addresses objects with the following attributes:
  - `street?`: {string}
  - `pobox?`: {string}
  - `city?`: {string}
  - `region?`: {string}
  - `postcode?`: {string}
  - `country?`: {string}
  - `type?`: {string} Programmatic type of email (`"work"`, `"home"`, `"other"`)
  - `primary?`: {boolean} Indicates a preferred-use address
  - `label?`: {string}
  - `formattedAddress?`: {string} Unstructured version of the address
- `phone?`: {array} An array of phone number objects with the following attributes:
  - `number`: {string}
  - `type?`: {string} Programmatic type of phone number (`"work"`, `"home"`, `"mobile"`, `"fax"`, `"other"`)
  - `label?`: {string} A user-provided localized type of phone number (example: `"Work"`)
  - `primary?`: {boolean} Indicates a preferred-use number
- `cozy?`: {array} An array of cozy instances with the following attributes:
  - `url`: {string}
  - `label?`: {string} A user-provided localized type of instance
  - `primary?`: {boolean} Indicates a preferred-use instance
- `relationships`: {object} links between documents

  - `groups`: {object} groups the contact belongs to
    - `data`: {array} list of groups
      - `_id`: {string} id of the io.cozy.contacts.groups document
      - `_type`: {string} doctype "io.cozy.contacts.groups"
  - `accounts`: {object}
    - `data`: {array} list of accounts
      - `_id`: {string} id of the io.cozy.contacts.accounts document
      - `_type`: {string} doctype "io.cozy.contacts.accounts"

- `cozyMetaData`: {object}

  - ...`cozyMetadata`: [Document metadata](./README.md#document-metadata)
  - `sync`: {object}

    - `ded4265b38c54b0683408c76d9ebd`: {object} id of the sourceContactsAccount

      - `konnector`: {string} example : `"google"`
      - `lastSync`: {date} (example: `"2018-10-19T10:58:37.025688+02:00"`)
      - `contactsAccountsId`: {string} id of the io.cozy.contacts.accounts object
      - `id`: {string} id of the remote object
      - `remoteRev`: {string} latest rev of the remote object

## `io.cozy.contacts.groups`

Used to group contacts together. A group can obviously have multiple contacts, but contacts can also be part of multiple groups.

- `name`: {string} is the group's public name
- `trashed`: {boolean} is `true` if the group is marked for removal and will be deleted soon
- `metadata`: {object}
  - `version`: {integer} Used for migrations. Current version is **1**
