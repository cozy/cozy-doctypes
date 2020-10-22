[Table of contents](README.md#table-of-contents)

# `io.cozy.sharings`

This doctype describes a sharing, ie an action made by some user to share some
documents and files from her cozy instance to other people.

* An identifier (the same for all members of the sharing)
* A list of `members`. The first one is the owner. For each member,
  we have the URL of the cozy, a public name, an email, a status and some
  credentials to authorize the transfer of data between the owner and the
  recipients
* A `description` (one sentence that will help people understand what is shared
  and why)
* a flag `active` that says if the sharing is currently active for at least
  one member
* a flag `owner`, true for the document on the cozy of the sharer, and absent
  on the other cozy instance
* a flag `open_sharing`:
    - `true` if any member of the sharing can add a new recipient
    - `false` if only the owner can add a new recipient
* Some technical data (`created_at`, `updated_at`, `app_slug`, `preview_path`,
  `triggers`, `credentials`)
* A list of sharing `rules`, each rule being composed of:
    - a `title`, that will be displayed to the recipients before they accept the
      sharing
    - the `doctype`
    - a `selector` (by default, it’s the `id`) and `values` (one identifier, a
      list of identifiers, files and folders inside a folder, files that are
      referenced by the same document, documents bound to a previous sharing rule)
    - `local`: by default `false`, but it can false `true` for documents that are
      useful for the preview page but doesn’t need to be send to the recipients
      (e.g. a setting document of the application)
    - `add`: What to do when a new document matches this rule (the document is
      created, or it was a document that didn’t match the rule and is modified and
      the new version matches the rule). Can be:
        * `none`: the updates are never propagated (the default)
        * `push`: the updates made on the owner are sent to the recipients
        * `sync`: the updates on any member are propagated to the other members
    - `update`: What to do when a document matched by this rule is modified. Can be:
        * `none`: the updates are never propagated (the default)
        * `push`: the updates made on the owner are sent to the recipients
        * `sync`: the updates on any member are propagated to the other members
    - `remove`: What to do when a document no longer matches this rule (the
      document is deleted, or it was a document that matched the rule, and is
      modified and the new version doesn’t match the rule):
        * `none`: the updates are never propagated (the default)
        * `push`: the updates made on the owner are sent to the recipients
        * `sync`: the updates on any member are propagated to the other members
        * `revoke`: the sharing is revoked.

## Example

```json
{
  "_id": "fffe04ebbec335405161f19133a0cd5c",
  "_rev": "7-bb721ae29e74ff2d776d8cbabf1a0bf5",
  "triggers": {
    "track_id": "fffe04ebbec335405161f19133a0fab5",
    "replicate_id": "fffe04ebbec335405161f19133a1172a",
    "upload_id": "fffe04ebbec335405161f19133a133bd"
  },
  "active": true,
  "owner": true,
  "description": "Let's work together!",
  "app_slug": "",
  "created_at": "2018-06-01T16:54:32.677789079+02:00",
  "updated_at": "2018-06-01T16:54:32.677789079+02:00",
  "rules": [
    {
      "title": "labore_adipisci",
      "doctype": "io.cozy.files",
      "values": [
        "fffe04ebbec335405161f19133a0b7b1"
      ],
      "add": "sync",
      "update": "sync",
      "remove": "sync"
    }
  ],
  "members": [
    {
      "status": "owner",
      "name": "Alice",
      "email": "alice+test@cozy.tools",
      "instance": "http://alice.test.cozy.tools:8081"
    },
    {
      "status": "ready",
      "name": "Benjamin Denis",
      "email": "denis@borer.org",
      "instance": "http://bob.test.cozy.tools:8082"
    }
  ],
  "credentials": [
    {
      "state": "OyPayIajZQUUX_KsZY2yaQ",
      "client": {
        "client_id": "fffe04ebbec335405161f19133a0e286",
        "client_secret": "JeOuBosC329bnz1rFK3Yenw8_8TleOa2",
        "client_secret_expires_at": 0,
        "registration_access_token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJyZWdpc3RyYXRpb24iLCJpYXQiOjE1Mjc4NjQ4ODQsImlzcyI6ImJvYi50ZXN0LmNvenkudG9vbHM6ODA4MiIsInN1YiI6ImZmZmUwNGViYmVjMzM1NDA1MTYxZjE5MTMzYTBlMjg2In0.WsNnnFnnf_vgf2OQyGSaj9XyK2elkaGHyl2vFpjzlCxEfj7ZoE7B2b6_GtRIdmhh42VSawoyGLAXsPh-ml10GQ",
        "redirect_uris": [
          "http://alice.test.cozy.tools:8081/sharings/answer"
        ],
        "client_name": "Sharing Alice",
        "client_kind": "sharing",
        "client_uri": "http://alice.test.cozy.tools:8081/",
        "software_id": "github.com/cozy/cozy-stack"
      },
      "access_token": {
        "token_type": "bearer",
        "access_token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhY2Nlc3MiLCJpYXQiOjE1Mjc4NjQ4ODQsImlzcyI6ImJvYi50ZXN0LmNvenkudG9vbHM6ODA4MiIsInN1YiI6ImZmZmUwNGViYmVjMzM1NDA1MTYxZjE5MTMzYTBlMjg2Iiwic2NvcGUiOiJpby5jb3p5LnNoYXJpbmdzOkFMTDpmZmZlMDRlYmJlYzMzNTQwNTE2MWYxOTEzM2EwY2Q1YyJ9.ZS0r9KpjrctckigRIELJQryzHrFGo-1dQvRplSNj8N0jyJE1LPgnYuiDedQ8EQN5-1ffeLUf3h_Rygz2ozQvPA",
        "refresh_token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJyZWZyZXNoIiwiaWF0IjoxNTI3ODY0ODg0LCJpc3MiOiJib2IudGVzdC5jb3p5LnRvb2xzOjgwODIiLCJzdWIiOiJmZmZlMDRlYmJlYzMzNTQwNTE2MWYxOTEzM2EwZTI4NiIsInNjb3BlIjoiaW8uY296eS5zaGFyaW5nczpBTEw6ZmZmZTA0ZWJiZWMzMzU0MDUxNjFmMTkxMzNhMGNkNWMifQ.cnH-COVwBIY8zOK51BBkLhb8vRbA96mRJ_W-i3Gg_qZoAISUjmzM3IH69DPQzD99OFnyeGWPhuIkCyWZX7ULQA",
        "scope": "io.cozy.sharings:ALL:fffe04ebbec335405161f19133a0cd5c"
      },
      "xor_key": "CAMHBgkAAgEMCAkMAgsIAw==",
      "inbound_client_id": "fffe04ebbec335405161f19133a0ecc2"
    }
  ]
}
```

# `io.cozy.shared`

This doctype is an internal one for the stack. It is used to track what
documents are shared, and to replicate changes from one Cozy to the others.

* `_id`: its identifier is the doctype and id of the referenced objet, separated by
  a `/` (e.g. `io.cozy.contacts/c1f5dae4-0d87-11e8-b91b-1f41c005768b`)
* `_rev`: the CouchDB default revision for this document (not very meaningful,
  it’s here to avoid concurrency issues)
* `revisions`: a tree with the last known `_rev`s of the referenced object
* `infos`, a map of sharing ids → `{rule, removed, binary}`
    * `rule` says which rule from the sharing must be applied for this document
    * `removed` will be true for a deleted document, a trashed file, or if the
      document does no longer match the sharing rule
    * `binary` is a boolean flag that is true only for files (and not even
      folders) with `removed: false`

## Example

```json
{
  "_id": "io.cozy.files/becbd072f742f5444f5d7837b2f4e323",
  "_rev": "1-af3192a67f2bf69e011aa1bda39e6c72",
  "revisions": {
    "rev": "4-4135d4994981c0041e3c89a681542307"
  },
  "infos": {
    "fffe04ebbec335405161f19133a0cd5c": {
      "rule": 0,
      "binary": true
    }
  }
}
```
