[Table of contents](README.md#table-of-contents)

# Apps suggestions doctype

The `io.cozy.apps.suggestions` doctype is used to store apps that are not yet installed, but might be useful for the user.

`io.cozy.apps.suggestions` are used by [Cozy-Banks](http://github.com/cozy/cozy-banks/) to extract which connectors can be suggested to the user based on his / her banking operations.

## Attributes

The available attributes in a `io.cozy.apps.suggestions` document are :

* `slug`: {string} - The suggested app's slug
* `silenced`: {boolean} - Whether the user asked to silence the suggestion or not
* `reason`: {Object} - An object describing why the suggestion is made
* `reason.code`: {string} - A code describing the reason of the suggestion. See below for existing codes

## Relationships

`io.cozy.apps.suggestions` can have the following relationships:

* `transactions`: an array of relationships pointing to `io.cozy.bank.operations` documents that match with the app

## Example

```json
{ 
  "slug": "deezer",
  "silenced": false,
  "reason": {
    "code": "FOUND_TRANSACTION"
  },
  "relationships": {
    "transactions": {
      "data": [
        { "_id": "12345abcdef", "_type": "io.cozy.bank.operations" }
      ]
    }
  },
  "cozyMetadata": {
    "createdAt": "2019-04-01T11:41:32",
    "createdByApp": "banks"
  }
}
```

See [`cozyMetadata` documentation](README.md#document-metadata) for more informations about it.

## Reason codes

* `FOUND_TRANSACTION`: a banking transaction matching this app was found
