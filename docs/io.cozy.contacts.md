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
- `email`: {array} An array of email addresses objects with the following attributes:
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
