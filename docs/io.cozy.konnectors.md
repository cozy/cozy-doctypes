[Table of contents](README.md#table-of-contents)

# Konnectors doctype

The `io.cozy.konnectors` doctype is used to store installed konnectors.

[Konnectors](https://docs.cozy.io/en/tutorials/konnector/) are autonomous applications ran on the stack to connect to external services or API.

When installing a konnector, the Cozy stack creates a new `io.cozy.konnector` document from the fields in the `manifest.konnector`.

`io.cozy.konnectors` are used by [Cozy-Store](http://github.com/cozy/cozy-store/) to install and uninstall konnectors, and by [Cozy-Collect](http://github.com/cozy/cozy-collect/) to manage [accounts](io.cozy.accounts.md) for konnectors

## Attributes

### Retrieved from `manifest.konnector`

The available attributes in a `io.cozy.konnectors` document are :

Field              | Description
-------------------|---------------------------------------------------------------------------------------------------
`aggregator`       | Object containing aggregator data. Typically `{ accountId: 'aggregator-service' }`.
`categories`       | array of categories for your apps (see authorized categories), it will be `['others']` by default if empty
`data_types`       | _(konnector specific)_ Array of the data type the konnector will manage
`developer`        | `name` and `url` for the developer
`editor`           | the editor's name to display on the cozy-bar (__REQUIRED__)
`features` | (konnector specific) Array of features added in the konnector from the list below.
`fields`           | _(konnector specific)_ JSON object describing the fields need by the konnector (__except folder path__). Used to generate a form. See [below](#konnectors-fields-property)
`folders`          | _(konnector specific)_ A list of folders required by the konnector to store files according to datatype (see the [specific documentation below](#konnectors-folders-handling))
`frequency`        | _(konnector specific)_ A human readable value between `monthly`, `weekly`, `daily`, indicating the interval of time between two runs of the konnector. Default: `weekly`.
`icon`             | path to the icon for the home (path in the build)
`intents`          | _(application specific)_ a list of intents provided by this app (see [cozy-stack intents doc](https://docs.cozy.io/en/cozy-stack/intents/) for more details)
`langs`            | Languages available in your app (can be different from locales)
`language`         | _(konnector specific)_ the konnector development language used (ex: `node`)
`license`          | [the SPDX license identifier](https://spdx.org/licenses/)
`locales`          | an object with language slug as property, each name property is an object of localized informations (see the second part below)
`manifest_version` | The current manifest version used. This is a versioning for the manifest and allow better retrocompatiblity when processing app manifest
`messages`         | _(konnector specific)_ Array of message identifiers, which can be used by application to display information at known areas. See [example below](#konnectors-message-property).
`mobile`           | _(application specific)_ JSON object containing information about app's mobile version (see [cozy-stack routes doc](https://docs.cozy.io/en/cozy-stack/apps/#mobile) for more details)
`name`             | the name to display on the home (__REQUIRED__)
`name_prefix`      | the prefix to display with the name
`oauth`            | _(konnector specific)_ JSON object containing oAuth information, like `scope`. If a manifest provides an `oauth` property, it is considered as an OAuth konnector. Note: scope can be a string or an array. If it is an array, its values will be joined with a space. A `false` or `null` value in scope will remove any scope parameter in the request sent to the oauth provider.
`parameters`       | _(konnector specific)_ Additional parameters which should be passed to the konnector. Used for example for bank konnectors to pass a `bankId` parameter.
`partnership`      | an object to provide informations (to display in the Store for example) about a partnership related to the application (`icon` `description`, `name` and `domain`). It can also be used to trigger alternative konnector connection policies for some vendors (see the [budget-insight konnector policy in cozy-harvest](https://github.com/cozy/cozy-libs/blob/065f7e2f3e89efa3b6b49e4ba7f9e20f92825560/packages/cozy-harvest-lib/src/services/budget-insight.js#L123)).
`permissions`      | a map of permissions needed by the app (see [see cozy-stack permissions doc ](https://docs.cozy.io/en/cozy-stack/permissions/) for more details)
`platforms`        | _(application specific)_ List of objects for platform native applications. For now there are only two properties: `type` (i.e. `'ios'` or `'linux'`) and the optional `url` to reach this application page.
`qualification_labels` | (konnector specific) Array of one or more labels from the [Cozy Client’s qualifications list](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/assets/qualifications.json) to associate with the files the konnector will receive from the website.
`routes`           | _(application specific)_ a map of routes for the app (see [cozy-stack routes doc](https://docs.cozy.io/en/cozy-stack/apps/#routes) for more details) (__REQUIRED__)
`screenshots`      | an array of paths to the screenshots of the application (paths in the build)
`services`         | _(application specific)_ a map of the services associated with the app (see [cozy-stack services doc](https://docs.cozy.io/en/cozy-stack/apps/#services) for more details)
`slug`             | the default slug that should never change (alpha-numeric lowercase) (__REQUIRED__)
`source`           | where the files of the app can be downloaded (by default it will look for the branch `build`)
`terms`            | an object defining  properties for terms that need to be displayed/accepted by the user when installing the application ([more-info-below](#application-terms))
`time_interval`    | _(konnector specific)_ By defaults, konnector triggers are scheduled randomly between 00:00 AM and 05:00 AM. Those two values can be overwritten thanks to this property, by passing an array containing two values: first is the interval start hour, second is the interval end hour. Example: `[15, 21]` will randomly schedule the konnector trigger between 15:00 (03:00 PM) and 21:00 (09:00 PM). The time zone used is GMT.
`type`             | type of application (`konnector` or `webapp`) (__REQUIRED__)
`version`          | the current version number (__REQUIRED__)
`vendor_link`      | _(konnector specific)_ URL to editor or service website

#### Translated manifest fields

Here are the properties that you can override using `locales` (we recommand to automatically build these properties according to your locales files if you're using a translating tool like `transifex`):

- `name`, the app's name
- `short_description`, short description of what the app do
- `long_description`, longer and more complete description of the app behaviour
- `changes`, description of your new version of the konnector or all changes since the last version
- `fields`, An object containing translations for fields.
- `screenshots`
- `folders`


```json
{
  "fields": {
    "email": {
      "type": "email"
    }
  },
  "locales": {
    "en": {
      "short_description": "Collect your Orange's bills",
      "fields": {
        "email": {
          "label": "Identifier (your email)"
        }
      }
    },
    "fr": {
      "short_description": "Récupère vos factures Orange",
      "fields": {
        "email": {
          "label": "Identifiant (votre adresse mail)"
        }
      }
    }
  }
}
```

#### Available manifest’s features list :

 - **2FA**

    Two Factors identification.

- **BILLS**

    Import bills documents, doctype “io.cozy.bills”.

 - **FILES**

    Import files documents, doctype “io.cozy.files”.

 - **CAPTCHA_RESOLUTION**

    The konnector using a captcha resolution process.

 - **CARBON_COPY**

    The konnector import legally true copy of the original files.

 - **DOC_QUALIFICATION**

    The konnector uses the first version of files qualifications, you may stumble upon on some konnectors wich hasn’t been treated.

 - **DOC_QUALIFICATION_V2**

    The konnector uses new version (last one for now) of files qualifications.

 - **ELECTRONIC_SAFE**

    Files comes from a known electronic safe.

 - **HEALTH**

    The konnector treat health documents

 - **HTML_TO_PDF**

    The konnector needs to convert HTML page(s) to make pdf files.

 - **IDENTITY**

    The konnector create identity(ies) for doctype “io.cozy.identities”

 - **LOGIN_OK**

    The konnector deactivate the auto-notification

 - **METADATA_DEDUP**

    The konnector uses a fileIdAttribute as detection to avoid deduplication.

 - **VENDOR_REF**

    The konnector uses.

 - **SENTRY_V2**

    The konnector had been migrated (or packaged) to sentry V2 (errors.cozycloud.cc)


### Other Attributes

| Attribute | Role                                                                                                                                     |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `state`   | Store the installation state of the konnector. Value can be `AVAILABLE`, `INSTALLING`, `UPGRADING`, `UNINSTALLING`, `INSTALLED`, `READY` |

## Example

```json
{
  "version": "1.0.0",
  "name": "debug",
  "type": "konnector",
  "language": "node",
  "icon": "icon.svg",
  "slug": "debug",
  "source": "git@github.com:konnectors/debug.git",
  "editor": "Cozy",
  "vendor_link": "",
  "categories": [""],
  "fields": {
    "login": {
      "type": "text"
    },
    "password": {
      "type": "password"
    }
  },
  "folders": [{"defaultDir": "$administrative/$konnector/$account"}],
  "data_types": [
    "bill"
  ],
  "screenshots": [],
  "permissions": {
    "carbon_copy": {
      "type": "io.cozy.certified.carbon_copy"
    },
    "bank operations": {
      "type": "io.cozy.bank.operations"
    },
    "bills": {
      "type": "io.cozy.bills"
    },
    "files": {
      "type": "io.cozy.files"
    },
    "accounts": {
      "type": "io.cozy.accounts"
    }
  },
  "developer": {
    "name": "Cozy Cloud",
    "url": "https://cozy.io"
  },
  "langs": ["fr", "en"],
  "locales": {
    "fr": {
      "short_description": "",
      "long_description": "",
      "permissions": {
        "carboncopy": {
          "description": "Utilisé pour certifier que vos fichiers sont copie conforme avec les documents d'origine"
        },
        "bank operations": {
          "description": "Utilisé pour relier les factures à des operations bancaires"
        },
        "bills": {
          "description": "Utilisé pour sauver les données des factures"
        },
        "files": {
          "description": "Utilisé pour sauvegarder les factures"
        },
        "accounts": {
          "description": "Utilisé pour obtenir les données du compte"
        }
      }
    },
    "en": {
      "short_description": "Fetch your personnal documents.",
      "long_description": "Fetch the list of bills and personnal documents from your Luko account.",
      "permissions": {
        "carboncopy": {
          "description": "Use to certify your files are the exact copy of the originals"
        },
        "bank operations": {
          "description": "Required to link bank operations to bills"
        },
        "bills": {
          "description": "Required to save the bills data"
        },
        "files": {
          "description": "Required to save the bills"
        },
        "accounts": {
          "description": "Required to get the account's data"
        }
      }
    }
  },
  "qualification_labels": [
    ""
  ],
  "features": [
    "LOGIN_OK",
    "METADATA_DEDUP",
    "CARBON_COPY",
    "DOC_QUALIFICATION_V2",
    "SENTRY_V2"
  ],
  "banksTransactionRegExp": "\\bdebug\\b",
  "manifest_version": "2"
}

```
