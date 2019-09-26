[Table of contents](README.md#table-of-contents)

# Bitwarden ciphers

The `com.bitwarden.ciphers` doctype is used to store secret things for the
[bitwarden clients](https://bitwarden.com/). There are 4 types of ciphers:

1. Login
2. Secure note
3. Card
4. Identity

## Attributes

* `type`: {int} - from 1 for login to 4 for identity (see the list above)
* `shared_with_cozy`: {bool} - true if the cipher is in the cozy organization
* `favorite`: {bool} - true if the cipher has been marked as a favorite in a client
* `name`: {string} - the name of the cipher, encrypted as a cipherString with AES
* `notes`: {string} - some notes about the cipher, encrypted
* `folder_id`: {string} - the identifier of a [bitwarden folder](./com.bitwarden.folders.md)
* `login`: {object} - an object only used when type is 1 (see below)
* `data`: {object} - a map of encrypted properties on the cipher
* `fields`: {array} - a list of objects, with `type`, `name`, and `value` (encrypted)
* `cozyMetadata`: {object} - the [cozyMetadata](README.md#document-metadata)

### Logins

When the cipher has type 1 (login), the `login` is an object with these fields:

- `uris`: {array} - an array of `uri` (an encrypted string) and `match` (`null` or a number)
- `username`: {string} - the encrypted username/login/identifier
- `password`: {string} - the encrypted password
- `passwordRevisionDate`: {date} - the last time the password was changed
- `totp`: {string} - the encrypted information about the second factor (2FA)

## Example

```json
{
  "_id": "44907c0262681483ab53e944fa077496",
  "_rev": "1-ded69b8f2b34ba6095f7637868453138",
  "type": 1,
  "shared_with_cozy": false,
  "name": "2.ygPX4ld50/Z2kEjdEWvhHg==|1nxqZVBUcnMk9bxzQDJyqQ==|HRjAlp45dJ2RBRBGY6yvDvZseOD49oimuUU5y12MuHk=",
  "login": {
    "uris": [
      {
        "uri": "2.DNrdKV2iNY+RtJbqFnPu7Q==|vhIZA5pXFngJRCnZlYjTmQV0ybQdJ6lNzt1CoTauwVI=|PiDEUFpvEaJtrKADSnyuqALajPHnDmfQsiDLEqF+3YY="
      }
    ],
    "username": "2.+uazyy7smAtIToJfqcS8yw==|IhmkZ0OHV+kX7txsPsSztA==|tDc1Zgknyl/JMn/O44hWZBaywSsHGeRGvK7ffEr5SdM=",
    "password": "2.L+41A7ch4GypwrIFXG5vkA==|S3eFnoNtk1IpsT4gcfcNrw==|lqdBTpSHKqTJtgBBXBXqm2K249AF1gZMec4cFf5gqR0="
  },
  "fields": null,
  "cozyMetadata": {
    "doctypeVersion": "1",
    "metadataVersion": 1,
    "createdAt": "2019-09-24T15:48:19.55593719+02:00",
    "updatedAt": "2019-09-24T15:48:19.55593719+02:00"
  }
}
```
