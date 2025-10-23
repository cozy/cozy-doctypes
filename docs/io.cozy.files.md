[Table of contents](README.md#table-of-contents)

# Cozy Files doctype

## `io.cozy.files`

The `io.cozy.files` doctype is used for both the files and directories.

### Folder

For a folder, its attributes are:

- `type`: {string} always `directory`
- `name`: {string} the directory name
- `path`: {string} the path to this directory, which is the path of its parent, then `/`, then its name
- `restore_path`: {string} the restore path of the directory, if is in the trash
- `created_at`: {timestamp} the date of the creation of this directory given by the client
- `updated_at`: {timestamp} the date of the last update of this directory given by the client
- `tags`: {array of strings} a list of tags
- `metadata`: {object} an optional map of metadata ([Full metadata description](io.cozy.files_metadata.md)), with for example:
    - `decorations`: {object} information on folder presentation
        - `color`: {string} hexadecimal color code
        - `icon`: {string} name of the icon in the list of cozy-ui icons
        - `emoji`: {string} unicode character of the emoji

It also has a relationship with its `parent` in the JSON-API representation, and another called `data` with the files and directory inside it.

### Files

The attributes of a file are:

- `type`: {string} always `file`
- `name`: {string} the file name
- `trashed`: {bool} true if the file is in the trash
- `restore_path`: {string} the restore path of the file, if is in the trash
- `md5sum`: {string} the checksum of its content, computed with the MD5 algorithm
- `created_at`: {date} the date of the creation of this file given by the client
- `updated_at`: {date} the date of the last update of this file given by the client
- `tags`: {array of strings} a list of tags. It is currently used to know if a file was uploaded through the mobile photo sync, with the value `library`.
- `size`: {number} the size of its content, in bytes
- `executable`: {bool} true is the file has the executable bit on UNIX (`chmod +x`)
- `class`: {string} a class in the list: `['image', 'document', 'audio', 'video', 'text', 'binary', 'pdf', 'files', 'code', 'slide', 'spreadsheet', 'text', 'zip', 'shortcut']`
- `mime`: {string} the full mime-type
- `metadata`: {object} an optional map of metadata ([Full metadata description](io.cozy.files_metadata.md)), with for example:
    - `width`: {number}
    - `height`: {number}
    - `description`: {string}
    - `datetime`: {date} : date in original image file metadata
    - `gps`: {object} : localization metadata with the following attributes
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
    - `icon`: {string} : A small SVG file to use as icon for this file (optional)
    - `carbonCopy`: {boolean} : if the document is the original document imported by the connector
    - `electronicSafe`: {boolean} : if the document is secured in a secure storage

⚠ `carbonCopy` and `electronicSafe` both
[need specific permission](https://docs.cozy.io/en/cozy-stack/files/#post-filesuploadmetadata)
to be added to a document.

It also has a relationship with its `parent` in the JSON-API representation.

For an `image`, there are 3 links to thumbnails: `small`, `medium`, and `large`.
These thumbnail links are valid for 10 minutes. After that, links will return a 400 Bad Request response code.

### Trash

When a file or a directory is put in the trash bin, some attributes are updated:
- `trashed` is set to true, but only for files: directories never have this attribute.
- The `restore_path` is set, for both files and directories.
  - ⚠️ The `restore_path` is not set on children. For instance, if a directory `foo` is trashed, it will have a `restore_path` but not the children.
- The `path` is updated only for directories, starting with `.cozy_trash`

Here is how one could query files and directories **not** in the trash, through a mango query:
```
_id: { $ne: 'io.cozy.files.trash-dir' },
path: { $or: [{ $exists: false }, { $regex: '^(?!/.cozy_trash)' }] },
trashed: { $or: [{ $exists: false }, { $eq: false }] }
```

### References

It's possible to link a file or a folder to another document.
It's called [a reference](https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/).
It appears in the JSON-API representation as a `refererenced_by` relationship.

### CozyMetadata

The `io.cozy.files` doctype has [the standard `cozyMetadata`](https://docs.cozy.io/en/cozy-doctypes/docs/#document-metadata), but with some more fields:

- `createdOn`: {string} the instance URL on which the file has created (useful if the file is shared between several cozy instances)
- `uploadedAt`: {date} the server date/time of the last upload (when the content was changed)
- `uploadedOn`: {string} the instance URL on which the file content was changed the last time
- `uploadedBy`: {object} information on which app has made the last upload
    - `slug`: {string} the slug of the application that has made the upload
    - `version`: {string} the version number of this application
    - `oauthClient`: {object} if the upload was made by an OAuth Client, information about it (`id`, `name`, and `kind`)

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
        "width": 1920,
        "icon": "<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><g fill='none' fill-rule='evenodd' transform='translate(0 2)'><rect width='32' height='26' y='2' fill='#B2D3FF' rx='2'/><path fill='#197BFF' d='M0 1a1 1 0 011-1h12c.55 0 1.31.31 1.71.71l.58.58c.4.4 1.15.71 1.71.71h13a2 2 0 012 2H17c-.55 0-1.31.31-1.71.71l-.58.58c-.4.4-1.16.71-1.72.71H1.01A1 1 0 010 5V1z'/></g></svg>"
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

### Shortcuts

Shortcuts (or hyperlinks) are a special type of files. They are served with the
`application/internet-shortcut` mime-type, they have a `.url` extension, and
respect the [URL file
format](http://www.lyberty.com/encyc/articles/tech/dot_url_format_-_an_unofficial_guide.html).

They can have `metadata`:

- `sharing.status` will be set if the link can be used to open a sharing. 2
  values are possible: `new` and `seen`, depending on whether the link
  has been opened.

- `icon` {string?} contains the base64 encoded image or svg binary if mimetype is not present.
- `iconMimeType` {string?} contains the mime-type of the icon.
- `description`: {string} the description of the shortcut (optional)

An object `target`
- `target.cozyMetadata.instance` is set to the cozy instance when relevant
  (mostly sharing and internal links)
- `target._type` is the doctype of the destination of the link (when the link
  goes to a sharing or document inside a cozy)
- `target.mime` is the mime-type of the destination of the link (when it is a
  file)
- `target.app` is the slug of the destination app (internal links only).
- `target.title`: {string} the title of the application where the shortcut redirects (optional)
- `target.category`: {string} the category of the application where the shortcut redirects (optional)

#### Example (JSON format)

```json
{
  "_id": "629fb233be550a21174ac8e19f0043af",
  "_rev": "1-61c7804bdb4f9f8dae5a363cb9a30dd8",
  "type": "file",
  "name": "sunset.jpg.url",
  "dir_id": "629fb233be550a21174ac8e19f003e4a",
  "trashed": false,
  "md5sum": "vfEMDpJShs8QeIlsDmw9VA==",
  "created_at": "2020-02-10T20:38:04Z",
  "updated_at": "2020-02-10T20:38:04Z",
  "tags": [],
  "metadata": {
    "sharing": {
      "status": "new"
    },
    "target": {
      "cozyMetadata": {
        "instance": "https://alice.cozy.example/"
      },
      "_type": "io.cozy.files",
      "mime": "image/jpg"
    },
    "icon": "[encoded base64 string of the content of the icon or svg binary]",
    "iconMimeType":"image/svg+xml"
  },
  "size": 62,
  "executable": false,
  "class": "shortcut",
  "mime": "application/shortcut",
  "cozyMetadata": {
    "doctypeVersion": 1,
    "metadataVersion": 1,
    "createdAt": "2020-02-10T20:38:04Z",
    "createdOn": "https://bob.cozy.example/",
    "updatedAt": "2020-02-10T20:38:04Z",
    "uploadedAt": "2020-02-10T20:38:04Z",
    "uploadedOn": "https://bob.cozy.example/"
  }
}
```

### Toutatice shortcuts

The [Toutatice konnector](https://github.com/konnectors/toutatice) creates specific shortcuts for applications on the Toutatice store. This metadata is used to organize the display in the Home and Store applications.

Generic data is stored in the `target` object with the following attributes:
- `title`: {string} The title of the application to which the shortcut redirects
- `description`: {string} A brief description of the application
- `category`: {string} The category of the application (e.g., lien, info, triskell, perso). Each category corresponds to a sub-folder in the Home settings folder where the associated shortcuts are located.

Additional information is stored in the `externalDataSource` object to maintain the link with the Toutatice object:
- `source`: {string} The space to which the application belongs
- `networkAccess`: {string} The access rights granted to the application
- `hubMetadata`: {object} Contains various metadata fields:
  - `derniereSynchronisation`: {string} Date of the last synchronization
  - `etat`: {string} Current status of the application
  - `favori`: {boolean} Indicates if the application is marked as a favorite
  - `idInterne`: {string} Internal ID of the application
  - `premiereSynchronisation`: {string} Date of the first synchronization

#### Example (JSON format)

```json
{
  "_id": "629fb233be550a21174ac8e19f0043af",
  "_rev": "1-61c7804bdb4f9f8dae5a363cb9a30dd8",
  "type": "file",
  "name": "École Directe.url",
  "dir_id": "90c6120de7cf25f9f87424e09fea4e13",
  "created_at": "2024-08-16T00:09:13.655513926Z",
  "updated_at": "2024-08-16T00:09:13.655513926Z",
  "md5sum": "BZcKfVhs0FWFJ9r7vxhJRg==",
  "mime": "application/internet-shortcut",
  "class": "shortcut",
  "trashed": false,
  "metadata": {
    "target": {
      "title": "École Directe",
      "description": "Application de vie scolaire",
      "category": "lien"
    },
    "externalDataSource": {
      "networkAccess": "ALL",
      "source": "Arena",
      "hubMetadata": {
        "derniereSynchronisation": "2022-10-21T14:27:37.794654Z",
        "etat": "AFFECTEE",
        "favori": false,
        "idInterne": "4ebec71e-814e-4638-8b7e-7c5117599851",
        "premiereSynchronisation": "2022-10-21T07:27:21.375402Z"
      }
    }
  },
  "cozyMetadata": {
    "doctypeVersion": 1,
    "metadataVersion": 1,
    "createdAt": "2020-02-10T20:38:04Z",
    "createdByApp": "toutatice",
    "createdOn": "https://bob.cozy.example/",
    "updatedAt": "2020-02-10T20:38:04Z",
    "updatedByApps": [
      {
        "slug": "toutatice",
        "date": "2020-02-10T20:38:04Z",
        "instance": "https://bob.cozy.example/"
      }
    ],
    "uploadedAt": "2020-02-10T20:38:04Z",
    "uploadedBy": {
      "slug": "toutatice"
    },
    "uploadedOn": "https://bob.cozy.example/"
  }
}
```

## `io.cozy.files.versions`

The `io.cozy.files.versions` is used to track old versions of a file content,
when files versioning is enabled. The attributes of a version are:

- `size`: {number} the size of its content, in bytes
- `md5sum`: {string} the checksum of its content, computed with the MD5 algorithm
- `updated_at`: {date} the date of the last update of this file given by the client
- `tags`: {array of strings} a list of tags
- `metadata`: {object} an optional map of metadata.

It also has the same `cozyMetadata` that a file (including the `uploaded*`
fields), and a relationship to the versioned file.

### Example (CouchDB format)

```json
{
  "_id": "9152d568-7e7c-11e6-a377-37cbfb190b4b/3-0e6d5b72",
  "_rev": "1-782839bf19cf4edbc29b82f77b28482f",
  "updated_at": "2019-06-12T12:38:04Z",
  "size": "12",
  "md5sum": "ODZmYjI2OWQxOTBkMmM4NQo=",
  "tags": [],
  "metadata": {
    "datetime": "2018-01-02T20:38:04Z",
    "height": 1080,
    "width": 1920
  },
  "cozyMetadata": {
    "doctypeVersion": "1",
    "metadataVersion": 1,
    "createdAt": "2019-06-11T20:34:56Z",
    "createdOn": "https://alice.cozy.example",
    "updatedAt": "2019-06-11T20:34:56Z",
    "uploadedAt": "2019-06-11T20:34:56Z",
    "uploadedBy": {
      "slug": "drive"
    },
    "uploadedOn": "https://alice.cozy.example"
  },
  "relationships": {
    "file": {
      "data": {
        "_id": "9152d568-7e7c-11e6-a377-37cbfb190b4b",
        "_type": "io.cozy.files"
      }
    }
  }
}
```

## `io.cozy.files.settings`

This doctype is used to store settings for files. It is currenly only used for the qualification migration service.

- lastProcessedFileDate: {string} the `cozyMetadata.updatedAt` date of the last processed file. It is used to know from where the query should be starting on an index sorted by date.
- hideOOEditTooltip: {boolean} Is used to determine whether the tooltip of an Open Office file's edit button should be displayed.

## `io.cozy.files.encryption`

This doctype is used to store encryption keys for directories.
The encryption keys are stored encrypted in the same way than bitwarden's [ciphers](https://docs.cozy.io/cozy-doctypes/com.bitwarden.ciphers.html), and are used to encrypt/decrypt files' binary inside the directory.


- `_id`: {string} refers to its directory id: `io.cozy.files/<dirID>`
- `key`: {string} the encrypted key, used to encrypt/decrypt files inside the directory.
