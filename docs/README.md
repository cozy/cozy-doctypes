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

- [Accounts: io.cozy.accounts](io.cozy.accounts.md): Konnector accounts
- [Apps: io.cozy.apps](io.cozy.apps.md): Apps installed in the Cozy
  - [App suggestions: io.cozy.apps.suggestions](io.cozy.apps.suggestions.md): Suggestions for apps that the user might find useful
- [Bank: io.cozy.bank](io.cozy.bank.md): Banking related data
  - [Bank setting: io.cozy.bank.settings](io.cozy.bank.md#iocozybanksettings): Bank application settings
  - [Bank account: io.cozy.bank.accounts](io.cozy.bank.md#iocozybankaccounts): Bank accounts
    - [Bank account stats: io.cozy.bank.accounts.stats](io.cozy.bank.md#iocozybankaccountsstats): Aggregated data about bank accounts
  - [Bank operation: io.cozy.bank.operations](io.cozy.bank.md#iocozybankoperations): Bank transaction
  - [Bank Balance History: io.cozy.bank.balancehistories](io.cozy.bank.md#iocozybankbalancehistories): Daily balances
  - [Bank Reccurence: io.cozy.bank.recurrence](io.cozy.bank.md#iocozybankrecurrence): Recurrence group information
- [Bills: io.cozy.bills](io.cozy.bills.md): Bills
- [Contacts: io.cozy.contacts](io.cozy.contacts.md): Contacts
  - [Groups: io.cozy.contacts.groups](io.cozy.contacts.md#iocozycontactsgroups): Contacts groups
  - [Accounts: io.cozy.contacts.accounts](io.cozy.contacts.md#iocozycontactsaccounts): Vendors account
- [Files: io.cozy.files](io.cozy.files.md): Files
  - [Files_metadatas](io.cozy.files_metadata.md): Metadatas about files
- [Connectors: io.cozy.konnectors](io.cozy.konnectors.md): Connectors installed in the cozy
- [Identities: io.cozy.identities](io.cozy.identities.md): Instance owner identities
- [Notes: io.cozy.notes](io.cozy.notes.md): Notes with collaborative edition
- [Notifications: io.cozy.notifications](io.cozy.notifications.md): Notifications made by the apps (Email or Push notifications)
- [Permissions: io.cozy.permissions](io.cozy.permissions.md): Permissions of the instance
- [Photos: io.cozy.photos](io.cozy.photos.md): Photos
- [Procedures: io.cozy.procedures](io.cozy.procedures.md): Administrative procedures
- [Sessions Logins: io.cozy.sessions.logins](io.cozy.sessions.logins.md): Sessions logins entry
- [Settings: io.cozy.settings](io.cozy.settings.md): Instance settings
- [Sharings: io.cozy.sharings](io.cozy.sharings.md): Documents used for Cozy to Cozy sharings

## Technical doctypes

- [Accounts Types: io.cozy.account_types
](io.cozy.account_types.md): OAuth informations and secrets
  for apps & konnectors
- [Autocategorization: cc.cozycloud.autocategorization](cc.cozycloud.autocategorization.md): Auto categorization remote doctype
- [Exports: io.cozy.exports](io.cozy.exports.md): Instances exports
- [Jobs: io.cozy/jobs](io.cozy.jobs.md): Instance jobs
- [OAuth Clients: io.cozy.oauth.clients](io.cozy.oauth.clients.md): OAuth clients informations of the stack
- [OAuth Access Codes: io.cozy.oauth.access_codes](io.cozy.oauth.access_codes.md): Access codes specific to OAuth flow
- [Triggers: io.cozy.triggers](io.cozy.triggers.md): Job triggers
  - [Triggers state: io.cozy.triggers.state](io.cozy.triggers.state.md): Job triggers states
- [Remote requests: io.cozy.remote.requests](io.cozy.remote.requests.md): logs of requests via the remote doctypes
- [Sessions: io.cozy.sessions](io.cozy.sessions.md): cozy-stack sessions
- [Shared: io.cozy.shared](io.cozy.shared.md): cozy-stack doctype for sharings
- [Terms: io.cozy.terms](io.cozy.terms.md): Contains terms of services the user has signed

## Remote doctypes

This repository is where the declaration of remote doctypes is done. Read more about remote doctypes in the [cozy stack repository](https://github.com/cozy/cozy-stack/blob/51f99a890dba85ff9c4b09124ee3b5bdd3d83300/docs/remote.md#declaring-a-remote-doctype).

## External doctypes

- [bitwarden ciphers](com.bitwarden.ciphers.md): Ciphers for bitwarden clients
- [bitwarden folders](com.bitwarden.folders.md): Folders for bitwarden clients
- [Bets Unibet](com.unibet.bets.md): Bets from Unibet website

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

### Document metadata

We distinguish three levels : the data (a list of songs from a playlist), the metadata about the data (the creation date of the playlist itself), the metadata of the cozy document (the creation date of the cozy document describing the playlist).

The third level (metadata of the wrapping document) is described by an object named `cozyMetadata` at the root of the document.

The following keys are reserved and have special meanings:

- `doctypeVersion`: Name or identifier for the version of the schema used by this document (ie: `doctypeVersion: 2` for "This document conforms to io.cozy.contacts in its version 2")
- `metadataVersion`: Version of the `cozyMetadata`
- `createdAt`: Creation date of the cozy document
- `createdByApp`: Slug of the app or connector which created the document
- `createdByAppVersion`: Version identifier of the app
- `updatedAt`: Last modification date of the cozy document
- `updatedByApps`: List of objects representing the applications (slugs and versions) which modified the cozy document in its life and the last update date for each of those apps (one entry per slug, apps should just update the value)
- `sourceAccount`: When the document was imported from a connector, identifier of the account in io.cozy.accounts
- `sourceAccountIdentifier`: When the document was imported from a connector, identifier of the account on targeted web service (the email address most of the time)

Note: All these attributes are optional and taken care by the apps modifying the document. Unless specified otherwise in the documentation of the doctype, all these attributes may not be present or may have a `null` value.

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
