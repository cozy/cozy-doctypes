# Table of contents

## Cozy doctypes

- [Accounts](io.cozy.accounts.md): Konnector accounts
- [Autocategorization](cc.cozycloud.autocategorization.md): Auto categorization remote doctype
- [Bank](io.cozy.bank.md): banking related data
- [Bills](io.cozy.bills.md): bills
- [Contacts](io.cozy.contacts.md): instance owner contacts
- [Files](io.cozy.files.md): files documents
- [Konnectors](io.cozy.konnectors): Connectors
- [Notifications](io.cozy.notifications.md): notifications made by the apps
- [Photos Albums](io.cozy.photos.albums.md): photos albums
- [Remote requests](io.cozy.remote.requests.md): logs of requests via the remote doctypes
- [Sessions Logins](io.cozy.sessions.logins.md): sessions logins entry
- [Sharings](io.cozy.sharings.md): documents used for Cozy to Cozy sharings
- [Triggers](io.cozy.triggers.md): Job triggers

## Remote doctypes

This repository is where the declaration of remote doctypes is done. Read more about remote doctypes in the [cozy stack repository](https://github.com/cozy/cozy-stack/blob/51f99a890dba85ff9c4b09124ee3b5bdd3d83300/docs/remote.md#declaring-a-remote-doctype).

## External doctypes

- [Bets Unibet](com.unibet.bets): Bets from Unibet website

## Generic model

### Relationships

Relations between documents are under a `relationships` object at the root of the document. Relations are referenced by their names.

Each relation is an object with a `data` property containing either `null`, one reference or an array of references.

A reference is an object containing at least a `_type` with the name of the referenced doctype and an `_id` with the id of the referenced document inside its doctype.

```json

{
  "_id": "mobydick",
  "relationships": {
    "authors": {
      "data": [
        { "_id": "hermanmelville", "_type": "io.cozy.contacts" }
      ]
    }
  }
}
```

### Document metadata

We distinguish three levels : the data (a list of songs from a playlist), the metadata about the data (the creation date of the playlist itself), the metadata of the cozy document (the creation date of the cozy document describing the playlist).

The third level (metadata of the wrapping document) is described by an object named `cozyMetadata` at the root of the document.

The following keys are reserved and have special meanings: 

- `doctypeVersion`: Name or identifier for the version of the schema used by this document (ie: `doctypeVersion: 2` for "This document conforms to io.cozy.contacts in it's version 2")
- `createdAt`: Creation date of the cozy document
- `createdByApp`: Slug of the app or connector which created the document
- `createdByAppVersion`: Version identifier of the app 
- `updatedAt`: Last modification date of the cozy document
- `updatedByApps`: List of applications (slugs) which modified the cozy document in its life
- `importedAt`: If the document originated from elsewhere, date from when it was first imported
- `importedFrom`: Where it was imported from (free text)
- `sourceAccount`: When the document was imported from a connector, identifier of the account in io.cozy.accounts

By convention, the first app (slug) listed in `updatedByApps` is the one which did the last update.

Note: All these attributes are optionnal and taken care by the apps modifying the document. Unless specified otherwise in the documentation of the doctype, all these attributes may not be present or may have a `null` value.

```json
{
  "_id": "xxxx",
  "cozyMetadata": { 
    "doctypeVersion": 4,
    "createdAt": "xxxxx",
    "createdByApp": "xxxx",
    "createdByAppVersion": "xxxx",
    "updatedAt": "xxxxx",
    "updatedByApps": [ "…" ],
    "importedAt": "xxxxx",
    "sourceAccount": "xxxxx",
    "importedFrom": "xxxxx",
  },
} 
```

### Date format

Date should be formatted in [ISO8601](https://fr.wikipedia.org/wiki/ISO_8601) :

- `2017-04-22T01:00:00-05:00` ✅
- `2017-04-22T01:00:00Z` ✅
- `2017-04-22 01:00` ❌
