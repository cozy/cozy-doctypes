[Table of contents](README.md#table-of-contents)

# Bitwarden contacts

The `com.bitwarden.contacts` doctype is used to share
[organizations](./com.bitwarden.organizations.md) with other users.

A `com.bitwarden.contacts` may be linked to a [Cozy contacts](./io.cozy.contacts.md)
by using the `email` attribute.

## Attributes

- `email`: {string} - the email of the contact
- `public_key`: {string} - the public key of the contact
- `confirmed`: {bool} - true if the contact's fingerprint phrase has been verified and confirmed by the user
- `cozyMetadata`: {object} - the [cozyMetadata](README.md#document-metadata)

## Example

```json
{
  "_id": "49a6e10fc3718829c4dac13a9e015597",
  "_rev": "1-49847ab10b103b2e084b0231e339ddce",
  "email": "me@bob.cozy.localhost",
  "public_key": "4.MbW...QVdA==",
  "confirmed": true,
  "cozyMetadata": {
    "doctypeVersion": "1",
    "metadataVersion": 1,
    "createdAt": "2021-08-30T17:41:49.991184+02:00",
    "updatedAt": "2021-08-30T17:41:49.991184+02:00"
  }
}
```
