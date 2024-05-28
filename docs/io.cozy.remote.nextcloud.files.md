[Table of contents](README.md#table-of-contents)

# NextCloud files doctype

## `io.cozy.remote.nextcloud.files`

### Description

The nextcloud konnector can be used to create an `io.cozy.account` for a
NextCloud. Then, the stack can be used as a client for this NextCloud account.
It supports files operations via WebDAV, with the
`io.cozy.remote.nextcloud.files` doctype.

### Attributes

- `type` {string} - `file` or `directory`
- `name` {string} - The name of this file or directory
- `size` {number} - The size of the file in bytes
- `mime` {string} - The mime-type of the file
- `class` {string} - A class in the list: `['image', 'document', 'audio', 'video', 'text', 'binary', 'pdf', 'files', 'code', 'slide', 'spreadsheet', 'text', 'zip', 'shortcut']`
- `updated_at` {date} - The date of the last update of this file
- `etag` {string} - An ETag which can be used to know when the content change (given by NextCloud)

### Example (JSON-API format)

```json
{
  "type": "io.cozy.remote.nextcloud.files",
  "id": "208937",
  "attributes": {
    "type": "file",
    "name": "BugBounty.pdf",
    "size": 2947,
    "mime": "application/pdf",
    "class": "pdf",
    "updated_at": "Mon, 14 Jan 2019 08:22:21 GMT",
    "etag": "\"dd1a602431671325b7c1538f829248d9\""
  },
  "meta": {},
  "links": {
    "self": "https://nextcloud.example.net/apps/files/files/208937?dir=/Documents"
  }
}
```
