[Table of contents](README.md#table-of-contents)

# Konnectors doctype

The `io.cozy.konnectors` doctype is used to store installed connectors.

[Connectors](https://docs.cozy.io/en/tutorials/konnector/) are autonomous applications ran on the stack to connect to external services or API.

When installing a konnector, the Cozy stack creates a new `io.cozy.konnector` document from the fields in the `manifest.konnector`. See the [reference](https://github.com/cozy/cozy-collect/blob/master/docs/konnector-manifest.md) for more information on each attributes.

`io.cozy.konnectors` are used by [Cozy-Store](http://github.com/cozy/cozy-store/) to install and uninstall connectors, and by [Cozy-Collect](http://github.com/cozy/cozy-collect/) to manage [accounts](io.cozy.accounts) for connectors

## Attributes
### Retrieved from `manifest.konnector`

The available attributes in a `io.cozy.konnectors` document are :

* `categories`
* `data_types`
* `developer`
* `doctypes`
* `editor`
* `fields`
* `frequency` - Value can be: `['hourly', 'daily', 'weekly', 'monthly']`
* `icon`
* `langs`
* `language`
* `license`
* `locales`
* `messages`
* `name`
* `name_prefix`
* `notifications`
* `oauth`
* `parameters`
* `permissions`
* `platforms`
* `screenshots`
* `slug`
* `source`
* `state`
* `tags`
* `time_interval`
* `type`
* `vendor_link`
* `version`

### Other Attributes

| Attribute | Role |
|-----------|------|
| `state`   | Store the installation state of the konnector. Value can be `AVAILABLE`, `INSTALLING`, `UPGRADING`, `UNINSTALLING`, `INSTALLED`, `READY` |

## Example

```json
{
  "name": "Debug",
  "editor": "",
  "slug": "debug",
  "developer": {
    "name": "cozy",
    "url": "cozy.io"
  },
  "long_description": "",
  "short_description": "",
  "categories": ["other"],
  "locales": null,
  "langs": null,
  "tags": null,
  "icon": "",
  "license": "",
  "state": "ready",
  "source": "git://github.com/cozy/cozy-konnector-debug.git#build",
  "parameters": null,
  "version": "1.0.0-edf48da7b2d959517aea59767c3d8d45b2ce7fa2",
  "permissions": {
    "accounts": {
      "type": "io.cozy.accounts",
      "description": "Required to get the account's data",
      "verbs": [
        "GET"
      ]
    }
  }
}
```
