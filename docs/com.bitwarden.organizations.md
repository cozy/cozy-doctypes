[Table of contents](README.md#table-of-contents)

# Bitwarden organization

The `com.bitwarden.organization` doctype is used to group
[ciphers](./com.bitwarden.ciphers.md) in a single unit and/or to share them with
other [bitwarden contacts](./com.bitwarden.contacts.md).

## Attributes

- `name`: {string} - the name of the organization
- `members`: {object} - the members of the organization (see below)
- `defaultCollection`: {object} - the collection of the organization (see below)
- `cozyMetadata`: {object} - the [cozyMetadata](README.md#document-metadata)

## Members

An organization can be shared with a list of members.

- `email`: {string} - the email of the member from [bitwarden contacts](./com.bitwarden.contacts.md)
- `key`: {string} - the organization's key encrypted with the public key of the member from [bitwarden contacts](./com.bitwarden.contacts.md)
- `name`: {string} - the name of the member
- `owner`: {bool} - true if the member owns the organization
- `status`: {int} - the status of the member (`0` = `invited`, `1` = `accepted`, `2` = `confirmed`)
- `user_id`: {string} - the id of the member from [bitwarden contacts](./com.bitwarden.contacts.md)

Note that the `name` and `key` attributes may be missing if the member status is still `invited` as those data are sent only when he accepts the first [Cozy sharing](./io.cozy.sharings.md) from organization's owner.

## Collection

A collection is a virtual container for [ciphers](./com.bitwarden.ciphers.md).

A [ciphers](./com.bitwarden.ciphers.md) can live alone or included in a collection. Any collection is linked to an organization.

By construction the Bitwarden protocol allows an organization to contain one or more collections.

But at Cozy we defined that an organization must contain exactly one collection. So there is no need seperate those entities, and so there is no dedicated doctype for a collection.

The collection entity exists to comply with the Bitwarden protocol.

- `_id`: {string} - the id of the collection
- `name`: {string} - the name of the collection, encrypted as a cipherString with AES

## Example

```json
{
  "_id": "8869e3ee461551cc2bc4d5d9a107dbf9",
  "_rev": "2-1926d7ef135d622721fc2e44519399cf",
  "name": "test",
  "members": {
    "alice.cozy.localhost:8080": {
      "email": "me@alice.cozy.localhost",
      "key": "4.Xzx...+w3Q==",
      "name": "Alice",
      "owner": true,
      "status": 2,
      "user_id": "49a6e10fc3718829c4dac13a9e0036b0"
    },
    "bob.cozy.localhost:8080": {
      "email": "me@bob.cozy.localhost",
      "key": "4.MbW...QVdA==",
      "name": "Bob",
      "status": 2,
      "user_id": "49a6e10fc3718829c4dac13a9e015597"
    }
  },
  "defaultCollection": {
    "_id": "8869e3ee461551cc2bc4d5d9a107d0c1",
    "name": "2.zedwpSJJACs2y+QSzxwqNA==|VB6iWyyRM++AFH7QjsJ/iw==|INFs55T//Ge1CIpyHh1tritNhaxfXGHDgb5yLyzqjjk="
  },
  "cozyMetadata": {
    "doctypeVersion": "1",
    "metadataVersion": 1,
    "createdAt": "2021-08-30T17:29:31.431874+02:00",
    "updatedAt": "2021-08-30T17:29:31.431874+02:00"
  }
}
```
