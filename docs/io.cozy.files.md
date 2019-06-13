[Table of contents](README.md#table-of-contents)

# Cozy Files doctype

## `io.cozy.files`

The `io.cozy.files` doctype is used for both the files and directories.

### Folder

For a folder, its attributes are:

- `type`: {string} always `directory`
- `name`: {string} the directory name
- `path`: {string} the path to this directory, which is the path of its parent, then `/`, then its name
- `created_at`: {timestamp} the date of the creation of this directory given by the client
- `updated_at`: {timestamp} the date of the last update of this directory given by the client
- `tags`: {array of strings} a list of tags

It also has a relationship with its `parent` in the JSON-API representation, and another called `data` with the files and directory inside it.

### Files

The attributes of a file are:

- `type`: {string} always `file`
- `name`: {string} the file name
- `trashed`: {bool} true if the file is in the trash
- `md5sum`: {string} the checksum of its content, computed with the MD5 algorithm
- `created_at`: {date} the date of the creation of this file given by the client
- `updated_at`: {date} the date of the last update of this file given by the client
- `tags`: {array of strings} a list of tags
- `size`: {number} the size of its content, in bytes
- `executable`: {bool} true is the file has the executable bit on UNIX (`chmod +x`)
- `class`: {string} a class in the list: `['image', 'document', 'audio', 'video', 'text', 'binary']`
- `mime`: {string} the full mime-type
- `metadata`: {map} an optional map of metadata (for example `width`, `height`, and `datetime` for an image), with for example:
  - `width`: {number}
  - `height`: {number}
  - `datetime`: {date} : date in original image file metadata
  - `gps`: {map} : localization metadata with the following attributes
    - `lat`: {float}: latitude
    - `long`: {float}: longitude
    - `city`: {string}: nearest city (optional)
    - `zip`: {string}: postal code of the nearest city (optional)
    - `country`: {string}: name of the associated country if any (optional)
  - `persons`: {array}: the maps can have the following attributes (optional)
    - `name`: {string}: then name of the tagged person on the photo
    - `created_at`: {date}: date of creation of the tag
    - `x`: {float}: x coordinate in the photo where the person is
    - `y`: {float}: y coordinate in the photo where the person is

It also has a relationship with its `parent` in the JSON-API representation.

For an `image`, there are 3 links to thumbnails: `small`, `medium`, and `large`.

### References

It's possible to link a file or a folder to another document.
It's called [a reference](https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/).
It appears in the JSON-API representation as a `refererenced_by` relationship.

### CozyMetadata

The `io.cozy.files` doctype has [the standard `cozyMetadata`](https://docs.cozy.io/en/cozy-doctypes/docs/README/#document-metadata), but with some more fields:

- `createdOn`: {string} the instance URL on which the file has created (useful if the file is shared between several cozy instances)
- `uploadedAt`: {date} the server date/time of the last upload (when the content was changed)
- `uploadedOn`: {string} the instance URL on which the file content was changed the last time
- `uploadedBy`: {map} information on which app has made the last upload
  - `slug`: {string} the slug of the application that has made the upload
  - `version`: {string} the version number of this application
  - `oauthClient`: {map} if the upload was made by an OAuth Client, information about it (`id`, `name`, and `kind`)

### Example (JSON-API format)

```json
{
  "data": {
    "type": "io.cozy.files",
    "id": "9152d568-7e7c-11e6-a377-37cbfb190b4b",
    "meta": {
      "rev": "3-0e6d5b72"
    },
    "attributes": {
      "type": "file",
      "name": "sunset.jpg",
      "trashed": false,
      "md5sum": "ODZmYjI2OWQxOTBkMmM4NQo=",
      "created_at": "2018-01-02T20:38:04Z",
      "updated_at": "2019-06-12T12:38:04Z",
      "tags": [],
      "metadata": {
        "datetime": "2018-01-02T20:38:04Z",
        "height": 1080,
        "width": 1920
      },
      "size": 12,
      "executable": false,
      "class": "image",
      "mime": "image/jpg",
      "cozyMetadata": {
        "doctypeVersion": 1,
        "metadataVersion": 1,
        "createdAt": "2019-06-11T01:02:03Z",
        "createdByApp": "flickr",
        "createdByAppVersion": "1.2.3",
        "createdOn": "https://alice.cozy.example",
        "updatedAt": "2019-06-12T12:40:06Z",
        "updatedByApps": [
          {
            "slug": "flickr",
            "date": "2019-06-11T01:02:03Z",
            "version": "1.2.3",
            "instance": "https://alice.cozy.example"
          },
          {
            "slug": "cozy-desktop",
            "date": "2019-06-12T12:40:06Z",
            "version": "3.13.2",
            "instance": "https://alice.cozy.example"
          }
        ],
        "uploadedAt": "2019-06-11T20:34:56Z",
        "uploadedOn": "https://alice.cozy.example",
        "uploadedBy": {
          "slug": "cozy-desktop",
          "version": "3.13.2",
          "oauthClient": {
            "id": "9aaa6886-8b69-11e9-8412-b7855fb3838f",
            "kind": "desktop",
            "name": "Cozy Drive - mac book pro d'Alice"
          }
        },
        "sourceAccount": "07b49550-8b60-11e9-bb7e-87717e829039",
        "sourceAccountIdentifier": "157ae784"
      }
    },
    "relationships": {
      "parent": {
        "links": {
          "related": "/files/fce1a6c0-dfc5-11e5-8d1a-1f854d4aaf81"
        },
        "data": {
          "type": "io.cozy.files",
          "id": "fce1a6c0-dfc5-11e5-8d1a-1f854d4aaf81"
        }
      },
      "referenced_by": {
        "links": {
          "self": "/files/fce1a6c0-dfc5-11e5-8d1a-1f854d4aaf81/relationships/references"
        },
        "data": [
          {
            "type": "io.cozy.albums",
            "id": "94375086-e2e2-11e6-81b9-5bc0b9dd4aa4"
          }
        ]
      }
    },
    "links": {
      "self": "/files/9152d568-7e7c-11e6-a377-37cbfb190b4b",
      "small": "/files/9152d568-7e7c-11e6-a377-37cbfb190b4b/thumbnails/0f9cda56674282ac/small",
      "medium": "/files/9152d568-7e7c-11e6-a377-37cbfb190b4b/thumbnails/0f9cda56674282ac/medium",
      "large": "/files/9152d568-7e7c-11e6-a377-37cbfb190b4b/thumbnails/0f9cda56674282ac/large"
    }
  }
}
```
