# Doctypes

Doctypes represent different types of data. Their primary use is for permissions: an app or konnector will request permissions
for one or several doctypes and will not be able to access other doctypes.

!!! note
    Example: A banking application requests permissions for banking doctypes (`io.cozy.bank.accounts`, `io.cozy.bank.operations` etc..)
    but cannot access files (`io.cozy.files`).
This ensure the segregation and security of your data.

In this repository, every (known) doctype and the fields that they contain is described. If you feel the need
for another doctype, feel free to open a PR with the description and role of your doctype.

## Cozy doctypes

- [io.cozy.accounts](io.cozy.accounts.md): Konnector accounts
- [io.cozy.ai.chat.conversations](io.cozy.ai.chat.conversations.md): Chat conversations with an assistant (AI)
- [io.cozy.apps](io.cozy.apps.md): Apps installed in the Cozy
  - [io.cozy.apps.suggestions](io.cozy.apps.suggestions.md): Suggestions for apps that the user might find useful
- [io.cozy.bank](io.cozy.bank.md): Banking related data
  - [io.cozy.bank.settings](io.cozy.bank.md#iocozybanksettings): Bank application settings
  - [io.cozy.bank.accounts](io.cozy.bank.md#iocozybankaccounts): Bank accounts
    - [io.cozy.bank.accounts.stats](io.cozy.bank.md#iocozybankaccountsstats): Aggregated data about bank accounts
  - [io.cozy.bank.operations](io.cozy.bank.md#iocozybankoperations): Bank transaction
  - [io.cozy.bank.balancehistories](io.cozy.bank.md#iocozybankbalancehistories): Daily balances
  - [io.cozy.bank.recurrence](io.cozy.bank.md#iocozybankrecurrence): Recurrence group information
  - [io.cozy.bank.groups](io.cozy.bank.md#iocozybankgroups): Group of bank accounts
  - [io.cozy.bank.recipients](io.cozy.bank.md#iocozybankrecipients): Recipients for transfert
- [io.cozy.bills](io.cozy.bills.md): Bills
- [io.cozy.calendar](io.cozy.calendar.md): Calendar
- [io.cozy.coachco2.settings](io.cozy.coachco2.md): CoachCO2 application settings
- [io.cozy.contacts](io.cozy.contacts.md): Contacts
  - [io.cozy.contacts.groups](io.cozy.contacts.md#iocozycontactsgroups): Contacts groups
  - [io.cozy.contacts.accounts](io.cozy.contacts.md#iocozycontactsaccounts): Vendors account
- [io.cozy.files](io.cozy.files.md): Files
  - [Files_metadatas](io.cozy.files_metadata.md): Metadatas about files
  - [io.cozy.files.settings](io.cozy.files.md#iocozyfilessettings): Files settings
  - [io.cozy.files.encryption](io.cozy.files.md#iocozyfilesencryption): Files encryption
- [io.cozy.home.settings](io.cozy.home.settings.md): Home settings
- [io.cozy.konnectors](io.cozy.konnectors.md): Connectors installed in the cozy
- [io.cozy.identities](io.cozy.identities.md): Instance owner identities
- [io.cozy.notes](io.cozy.notes.md): Notes with collaborative edition
  - [io.cozy.notes.steps](io.cozy.notes.md#iocozynotessteps)
  - [io.cozy.notes.events](io.cozy.notes.md#iocozynotesevents)
  - [io.cozy.notes.images](io.cozy.notes.md#iocozynotesimages)
- [io.cozy.notifications](io.cozy.notifications.md): Notifications made by the apps (Email or Push notifications)
- [io.cozy.permissions](io.cozy.permissions.md): Permissions of the instance
- [io.cozy.photos](io.cozy.photos.md): Photos
  - [io.cozy.photos.settings](io.cozy.photos.md#iocozyphotossettings): Photos settings
- [io.cozy.procedures](io.cozy.procedures.md): Administrative procedures
- [io.cozy.docrules](io.cozy.docrules.md): Rules to retrieve documents
- [io.cozy.remote.nextcloud.files](io.cozy.remote.nextcloud.files.md): Files on a remote NextCloud (via WebDAV)
- [io.cozy.sessions.logins](io.cozy.sessions.logins.md): Sessions logins entry
- [io.cozy.settings](io.cozy.settings.md): Instance settings
- [io.cozy.sharings](io.cozy.sharings.md): Documents used for Cozy to Cozy sharings
- [io.cozy.tags](io.cozy.tags.md): Tags
- [io.cozy.timeseries](io.cozy.timeseries.md): Time Series
  - [io.cozy.timeseries.geojson](io.cozy.timeseries.md#iocozytimeseriesgeojson): GeoJSON time series
  - [io.cozy.timeseries.grades](io.cozy.timeseries.md#iocozytimeseriesgrades): Grades time series
- [io.cozy.todos](io.cozy.todos.md): Todos
  - [io.cozy.todos.list](io.cozy.todos.md#iocozytodoslist): Todos list
  - [io.cozy.todos.item](io.cozy.todos.md#iocozytodositem): Todos item
- [io.cozy.drive.settings](io.cozy.drive.settings.md): Drives Settings

## Technical doctypes

- [Accounts Types: io.cozy.account_types
  ](io.cozy.account_types.md): OAuth informations and secrets
    for apps & konnectors
- [cc.cozycloud.autocategorization](cc.cozycloud.autocategorization.md): Auto categorization remote doctype
- [cc.cozycloud.announcements](cc.cozycloud.announcements.md): Announcements remote doctype
- [io.cozy.exports](io.cozy.exports.md): Instances exports
- [io.cozy.jobs](io.cozy.jobs.md): Instance jobs
- [io.cozy.oauth.clients](io.cozy.oauth.clients.md): OAuth clients informations of the stack
- [io.cozy.oauth.access_codes](io.cozy.oauth.access_codes.md): Access codes specific to OAuth flow
- [io.cozy.triggers](io.cozy.triggers.md): Job triggers
  - [io.cozy.triggers.state](io.cozy.triggers.state.md): Job triggers states
- [io.cozy.remote.requests](io.cozy.remote.requests.md): logs of requests via the remote doctypes
- [io.cozy.sessions](io.cozy.sessions.md): cozy-stack sessions
- [io.cozy.shared](io.cozy.shared.md): cozy-stack doctype for sharings
- [io.cozy.terms](io.cozy.terms.md): Contains terms of services the user has signed

## Remote doctypes

This repository is where the declaration of remote doctypes is done. Read more about remote doctypes in the [cozy stack repository](https://github.com/cozy/cozy-stack/blob/51f99a890dba85ff9c4b09124ee3b5bdd3d83300/docs/remote.md#declaring-a-remote-doctype).

## External doctypes

- [com.bitwarden.ciphers](com.bitwarden.ciphers.md): Ciphers for bitwarden clients
- [com.bitwarden.folders](com.bitwarden.folders.md): Folders for bitwarden clients
- [com.unibet.bets](com.unibet.bets.md): Bets from Unibet website

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
      "data": [{ "_id": "hermanmelville", "_type": "io.cozy.contacts" }]
    }
  }
}
```

#### External relationships

Relationships that reference a document that lives outside the couchdb of the user will have a `_type` in a different namespace than `io.cozy.*`, and will have an additional `_protocol` field.

At the moment the only available external relationship is `bitwarden` with the following format:

```json
{
  "_id": "secretsafe",
  "relationships": {
    "vaultCipher": {
      "data": [{ "_id": "123abc", "_type": "com.bitwarden.ciphers", "_protocol": "bitwarden" }]
    }
  }
}
```

#### Relationships with metadata


A relationship can store additional information, in the `metadata` attribute. For instance, see the [contracts](https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.accounts/#contracts-contracts) relationship for the accounts.

```json
"relationships": {
  "contracts": {
    "data": [
      {
        "_id": "77b662b903f1bac7a78cf8cc12806479",
        "_type": "io.cozy.bank.accounts",
        "metadata": {
          "deletedByVendor": false,
          "imported": true,
          "label": "Compte chèque",
          "vendorId": "1337"
        }
      }
    ]
  }
}

```

### Document metadata

We distinguish three levels of attributes:

1. The data (e.g. a list of songs from a playlist)
2. The metadata about the data (e.g. the creation date of the playlist itself)
3. The metadata of the cozy document (e.g. the creation date of the cozy document describing the playlist).

The third level is described by an object named `cozyMetadata` at the root of the document. This object structure is common to all Cozy doctypes. 

The expected `cozyMetadata` attributes are the following:

- `doctypeVersion`: Name or identifier for the version of the schema used by this document (ie: `doctypeVersion: 2` for "This document conforms to io.cozy.contacts in its version 2")
- `metadataVersion`: Version of the `cozyMetadata`
- `createdAt`: Creation date of the cozy document
- `createdByApp`: Slug of the app or connector which created the document
- `createdByAppVersion`: Version identifier of the app
- `updatedAt`: Last modification date of the cozy document
- `updatedByApps`: List of objects representing the applications (slugs and versions) which modified the cozy document in its life and the last update date for each of those apps (one entry per slug, apps should just update the value)
- `sourceAccount`: When the document was imported from a connector, identifier of the account in io.cozy.accounts
- `sourceAccountIdentifier`: When the document was imported from a connector, identifier of the account on targeted web service (the email address most of the time)
- `favorite`: {boolean} whether or not the document is a favorite.

ℹ️ All these attributes are optional and taken care by the apps modifying the document. Unless specified otherwise in the documentation of the doctype, all these attributes may not be present or may have a `null` value.

ℹ️ For doctypes protected by the stack such as `io.cozy.files`, any non-expected attribute in `cozyMetadata` will be refused by the stack. 

```json
{
  "_id": "xxxx",
  "cozyMetadata": {
    "doctypeVersion": 4,
    "metadataVersion": 1,
    "createdAt": "xxxxx",
    "createdByApp": "xxxx",
    "createdByAppVersion": "xxxx",
    "updatedAt": "xxxxx",
    "updatedByApps": [
      {
        "slug": "xxxxx",
        "date": "xxxxx",
        "version": 3
      }
    ],
    "sourceAccount": "xxxxx",
    "sourceAccountIdentifier": "test@mail.fr"
  }
}
```

### Date format

Date should be formatted in [ISO8601](https://fr.wikipedia.org/wiki/ISO_8601) :

- `2017-04-22T01:00:00-05:00` ✅
- `2017-04-22T01:00:00Z` ✅
- `2017-04-22` ✅
- `2017-04-22 01:00` ❌
