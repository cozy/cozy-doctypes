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
https://docs.cozy.io/en/cozy-apps-registry/README/#properties-meaning-reference

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
