# Table of contents

- [Table of contents](#table-of-contents)
- [Apps doctype](#apps-doctype)
  - [Attributes](#attributes)
  - [Example](#example)

# Apps doctype

The `io.cozy.apps` doctype is used to store installed apps.

[Apps](https://docs.cozy.io/en/tutorials/app/) (or Webapps) are core
applications used to interact with the instance data.

For example, the `drive` app can handle files, `photos` will manage photos &
albums and `banks` the financial data.

When an app is installed, the Cozy stack creates a new `io.cozy.apps` document in the instance `io.cozy.apps` database. You can get more informations on the [official docs](https://docs.cozy.io/en/tutorials/app/).

## Attributes

The available attributes in a `io.cozy.apps` document are available in the official docs:
<https://docs.cozy.io/en/cozy-apps-registry/#properties-meaning-reference>

## Example

This is the truncated version of the official Cozy `drive` app.

```json
{
  "name": "Drive",
  "name_prefix": "Cozy",
  "slug": "drive",
  "version": "1.18.3",
  "type": "webapp",
  "licence": "AGPL-3.0",
  "icon": "public/app-icon.svg",
  "categories": ["cozy"],
  "source": "https://github.com/cozy/cozy-drive",
  "editor": "Cozy",
  "developer": {
    "name": "Cozy Cloud",
    "url": "https://cozy.io"
  },
  "routes": {
    "/": {
      "folder": "/",
      "index": "index.html",
      "public": false
    },
    "/intents": {
      "folder": "/intents",
      "index": "index.html",
      "public": false
    }
  },
  "intents": [
    {
      "action": "OPEN",
      "type": ["io.cozy.files"],
      "href": "/intents"
    }
  ],
  "permissions": {
    "files": {
      "description": "Required to access the files",
      "type": "io.cozy.files",
      "verbs": ["ALL"]
    },
    "apps": {
      "description": "Required by the cozy-bar to display the icons of the apps",
      "type": "io.cozy.apps",
      "verbs": ["GET"]
    }
  }
}
```

# Special `io.cozy.apps` doctypes

Some folders are remarkable, like the 'Administrative' and the 'Photos' folders. You shouldn't address them by their path as it may vary depending on the user language and the user may have renamed them anyways.
To identify them, you can ask for a special [`referenced_by` attribute](https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/#post-filesfile-idrelationshipsreferenced_by).
For example, a request for all io.cozy.files referended by the doctype `io.cozy.apps` and the document id `administrative` will return you the io.cozy.files document of the folder 'Administrative' whatever its name or path.

Here is the list:

```
ADMINISTRATIVE FOLDER: io.cozy.apps/administrative
PHOTOS FOLDER: io.cozy.apps/photos Root Folder of Photos. Used to create PHOTOS_BACKUP FOLDER & PHOTOS_UPLOAD FOLDER
PHOTOS_BACKUP FOLDER: io.cozy.apps/photos/mobile Folder used to put photos synched by the native app
PHOTOS_UPLOAD FOLDER: io.cozy.apps/photos/upload Folder used to put photos uploaded by the Photo web app.
```
