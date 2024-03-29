[Table of contents](README.md#table-of-contents)

# Cozy Accounts doctype

The `io.cozy.accounts` doctype stores authentification informations used by [konnectors](https://github.com/konnectors) to connect to external services or API.

Accounts can be managed in [Cozy-Home](http://github.com/cozy/cozy-home/) (via [Harvest](https://github.com/cozy/cozy-libs/tree/master/packages/cozy-harvest-lib)). They are generally associated to a [`io.cozy.triggers`](io.cozy.triggers.md) document.

`io.cozy.accounts` attributes are:

- `account_type`: {string} Slug of the konnector the account is related to. Note this could be a [relationship](https://github.com/cozy/cozy-doctypes/#relationships) to the konnector manifest, but we keep this field for historical reasons.
- `auth`: {object} (Optional) Contains authentification data, typically a couple with `login`/`password`. This field should not be used when `oauth` is present.
  - `login`: {string} (Optional) Main credentials field to use, displayed as default account name by harvest. Some konnectors do not use a `login` parameter, but `identifier` or `email`. In this case the attribute `role: 'identifier'` should be added to the parameter object in the konnector's manifest.
  - `accountName`: {string} (Optional) If defined, will be used preferentially over `login` or `email` or the first konnerctor parameter with `role: 'identifier'` as the account name. (Used when the account has no identifiable name, commonly when using an aggregator account)
  - `credentials_encrypted`: {string} Stores the encrypted auth fields using `type: password` in the konnector's manifest, typically the `password` field.
  - `token`: {string} (Optional) Token stored for OAuth konnectors
  - `new_identifier`: {string} (Deprecated)
  - `identifier`: {string} (Depracted)
- `oauth`: {object} (Optional) Credentials field used for OAuth konnectors such as banking konnectors. This field should not be used when `auth` is present.
  - `access_token` {string} (Optional)
  - `token_type` {string} (Optional)
  - `expires_at` {string} (Optional)
  - `refresh_token` {string} (Optional)
  - `client_id` {string} (Optional)
  - `client_secret` {string} (Optional)
  - `query` {object} (Optional) Map of keys and values (array of strings).
- `oauth_callback_results` {object} (Optional)
- `data`: {object} (Optional) Additional custom data. This is useful to store arbitrary data related to the account. For instance, this can be used to store an account status, the date of the last retrieved document, etc.
- `defaultFolderPath`: {string} Default destination folder used by cozy-stack for folder re-creation when the destination folder has been removed. If not provided, it will be generated by cozy-stack using the attribte of the `auth` object pointed by `identifier` and the konnector's name.
- `identifier` {string} (Optional) Name of the attribute in the `auth` object that can be used to name the account.
- `state`: {string} (Optional) The account state is used to communicate between the konnector and [Harvest](https://github.com/cozy/cozy-libs/tree/master/packages/cozy-harvest-lib) to ask for a needed 2FA Code or to tell to reset the konnector session for example. Here are the used values for now:
  - `TWOFA_NEEDED`: The service is asking for a Two Factor connexion and the related code (sent by the service) must be provided by the user. This status can be further precised with its type. This allows the UI presented to the user to have custom messages, depending on the type of two factor authentication required by the vendor.
    - `TWOFA_NEEDED.EMAIL`: If the two factor authentication is done by email
    - `TWOFA_NEEDED.SMS`: If the two factor authentication is done by SMS
  - `TWOFA_NEEDED_RETRY`: The 2FA code provided by the user is wrong, the user can retry by providing a new one. `TWO_FA_NEEDED_RETRY.EMAIL` and `TWO_FA_NEEDED_RETRY.SMS` can also be used.
  - `RESET_SESSION`: By finding this state, the konnector should reset the login session if there is one stored and reset the state.
- `twoFACode`: When a 2FA code is asked by the service, [Harvest](https://github.com/cozy/cozy-libs/tree/master/packages/cozy-harvest-lib) will ask the user for it from and send it to the konnector via this attribute.
- `mutedErrors`: {array} (Optional) A list of errors that have been discarded by the user and will no longer be shown in the UI. See below for more information.
- `token`: {string} (Optional) User token for banking aggregator used only in `bi-aggregator` account
- `userId`: {string} (Optional) User id for banking aggregator used only in `bi-aggregator-user` account


## About the name of the account

We need a name for the account displayed to the user in harvest and for cozy-stack to create the associated folder if needed.
If missing, harvest will determine the value of the `identifier` attribute based on the following rules:
1. a konnector's manifest field name if it has the `role: "identifier"` attribute
2. `login` if `auth.login` is defined
3. `identifier` if `auth.identifier` is defined
4. `new_identifier` if `auth.new_identifier` is defined
5. `email` if `auth.email` is defined

If the `identifier` attribute is defined, the account name will be chosen based on these rules:
1. `auth[identifer]` if defined (we use the value of the `identifier` attibute here)
2. `_id`

For banking connectors, the `identifier` attribute contains the string `identifier` so, the name of the account is the value of `auth.identifier`.

## Attributes

### `mutedErrors`

This field is used to keep track of konnector errors that have been muted by the user and shouldn't be featured in the UI anymore.

```json
{
  "account_type": "example-konnector",
  "auth": {
    "identifier": "0000000000"
  },
  "mutedErrors": [
    {
      "type": "LOGIN_FAILED",
      "mutedAt": "2019-12-01T00:48:01.404911778Z"
    }
  ]
}
```

## Relationships

### `parent`

An account may have a `parent` relationship. It is used to indicate that this accounts depends on another one.
Generally, the konnector should be able to handle by itself this kind of relationshiop, like querying the database to get the information it needs. A `parent` relationship is aimed to be an account overriden by the account it is linked to, but it can also be use as an _aggregator_ account. See [Cozy-stack documentation about aggregator accounts](https://docs.cozy.io/en/cozy-stack/konnectors-workflow/#aggregator-accounts).

```json
{
  "relationships": {
    "parent": {
      "data": {
        "_id": "aggregator-service-account",
        "_type": "io.cozy.accounts"
      }
    }
  }
}
```

### Vault Cipher `vaultCipher`

An account can be synced in a password manager. In that case, the `vaultCipher` relationship can be used to store data used to synchronize the document with the remote endpoint.

```json
{
  "relationships": {
    "vaultCipher": {
      "data": {
        "_id": "123abc",
        "_type": "com.bitwarden.ciphers",
        "_protocol": "bitwarden"
      }
    }
  }
}
```

### Contracts `contracts`

When the connector brings contracts (in the case of banking connectors, contracts means individual banking accounts), the
connector stores information on the contracts in the `contracts` relationship. Relationship items store extra information
in the `metadata` key of the relationship item.

- `vendorId`: the id of the contract on the vendor side
- `deletedByVendor`: whether it was deleted on the vendor side
- `imported`: whether it should be imported on the vendor side
- `label`: Label of the contract

```json
{
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
        },
        {
          "_id": "07c731e303e0d50a5407b7eca9389890",
          "_type": "io.cozy.bank.accounts",
          "metadata": {
            "deletedByVendor": false,
            "imported": false,
            "label": "Assurance Vie",
            "vendorId": "1338"
          }
        }
      ]
    }
  }
}
```

## Examples

### Freemobile (regular connector, with current deprecation)



```json
{
  "_id": "c8ae8c7e5554f223816c71a066f1a621",
  "id": "c8ae8c7e5554f223816c71a066f1a621",
  "account_type": "freemobile",
  "auth": {
    "credentials_encrypted": "aaDtwWSWsdpbbbbbbbbbbbbbbOzp...n4Y8c=",
    "login": "0612345678"
  },
  "defaultFolderPath": "/Administratif/Free Mobile/0612345678",
  "identifier": "login",
  "state": "LOGIN_SUCCESS",
  "cozyMetadata": {
    "createdAt": "2022-11-15T16:12:10.736Z",
    "metadataVersion": 1,
    "updatedAt": "2022-11-15T16:32:58.617Z",
    "updatedByApps": [
      {
        "date": "2022-11-15T16:32:58.617Z"
      }
    ]
  }
}
```


### Caisse d'Épargne (Budget Insights connector)

The connectors based on Budget Insight API are storing specific informations into `data` attribute.

```json
{
  "account_type": "caissedepargne1",
  "auth": {
    "bankIds": ["1"]
  },
  "data": {
    "auth": {
      "bi": {
        "connId": 1556
      }
    }
  }
}
```
