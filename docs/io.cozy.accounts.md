[Table of contents](README.md#table-of-contents)

# Cozy Accounts doctype

The `io.cozy.accounts` doctype stores authentification informations used by [konnectors](https://github.com/konnectors) to connect to external services or API.

Accounts can be managed in [Cozy-Home](http://github.com/cozy/cozy-home/) (via [Harvest](https://github.com/cozy/cozy-libs/tree/master/packages/cozy-harvest-lib)). They are generally associated to a [`io.cozy.triggers`](io.cozy.triggers.md) document.

`io.cozy.accounts` attributes are:

- `account_type` (_deprecated_) : {string} Slug of the konnector the account is related to.
- `auth`: {object} Contains authentification data, typically a couple with `login`/`password`. It could also contain an attribute `token` for OAuth konnectors.
- `data`: {object} Additional custom data.
- `label`: {string} Label given by user.
- `state`: {string} The account state is used to communicate between the konnector and [Harvest](https://github.com/cozy/cozy-libs/tree/master/packages/cozy-harvest-lib) to ask for a needed 2FA Code or to tell to reset the konnector session for example. Here are the used values for now:
    - `TWOFA_NEEDED`: The service is asking for a Two Factor connexion and the related code (sent by the service) must be provided by the user. This status can be further precised with its type. This allows the UI presented to the user to have custom messages, depending on the type of two factor authentication required by the vendor.
        - `TWOFA_NEEDED.EMAIL`: If the two factor authentication is done by email
        - `TWOFA_NEEDED.SMS`: If the two factor authentication is done by SMS 
    - `TWOFA_NEEDED_RETRY`: The 2FA code provided by the user is wrong, the user can retry by providing a new one. `TWO_FA_NEEDED_RETRY.EMAIL` and `TWO_FA_NEEDED_RETRY.SMS` can also be used.
    - `RESET_SESSION`: By finding this state, the konnector should reset the login session if there is one stored and reset the state.
- `twoFACode`: When a 2FA code is asked by the service, [Harvest](https://github.com/cozy/cozy-libs/tree/master/packages/cozy-harvest-lib) will ask the user for it from and send it to the konnector via this attribute.

### `auth`

The `auth` attribute may also contain other data, like  `accountName`, `folderPath` or `frequency`. As `auth` should only be used for authentication mechanisms, those two values should disappear soon.

* `folderPath` should purely and simply disappear, the folder information is stored in `io.cozy.trigger`.
* `accountName` is in reality the `label`, change should be made soon to fix this mistake.
* `frequency` should move at the root of the account.
* `namePath`: The name of the last folder. Usually saved along with `folderPath`.

The `auth` attributes also contain all values for the fields attribute specified in the `manifest.konnector` file.

## Relationships

### `parent`

An account may have a `parent` relationship. It is used to indicate that this accounts depends on another one.
Generally, the konnector should be able to handle by itself this kind of relationshiop, like querying the database to get the information it needs. A `parent` relationship is aimed to be an account overriden by the account it is linked to, but it can also be use as an _aggregator_ account. See [Cozy-stack documentation about aggregator accounts](https://docs.cozy.io/en/cozy-stack/konnectors-workflow/#aggregator-accounts).

#### Example
```json
{
  "relationships": {
    "parent": {
      "_id": "aggregator-service-account",
      "_doctype": "io.cozy.accounts"
    }
  }
}
```

### About `login`

Some konnectors does not use a `login` parameter, but `identifier` or `email`. The usage of anything except `login` is deprecated and should not be done.

### Examples

#### Freemobile (regular connector, with current deprecation)

```json
{
  "auth": {
    "accountName": "freemobile",
    "credentials_encrypted": "aaDtwWSWsdpbbbbbbbbbbbbbbOzp2pBEbXlZLWjiTzOGumGRomrF2LwlRn4Y8c=",
    "folderPath": "/Administratif/Free Mobile",
    "login": "000000000",
    "namePath": "Free Mobile",
    "password": "*******"
  }
}
```

What we aim:

```json
{
  "auth": {
    "credentials_encrypted": "aaDtwWSWsdpbbbbbbbbbbbbbbOzp2pBEbXlZLWjiTzOGumGRomrF2LwlRn4Y8c=",
    "login": "000000000",
    "password": "**********"
  },
  "folderPath": "/Administratif/Free Mobile",
  "label": "freemobile",
  "namePath": "Free Mobile"
}
```

#### Caisse d'Épargne (Linxo connector)

The connectors based on Linxo API are storing specific informations into `data` attribute.

```json
{
  "account_type": "linxo",
  "auth": {
    "folderPath": null,
    "frequency": "week",
    "identifier": "0000000000",
    "secret": "*********"
  },
  "data": {
    "auth": {
      "login": "00000.00000000@cozyclaudy.red.cloud",
      "password": "********************************"
    },
    "status": "connected",
    "token": "f415e",
    "uuid": "deadbeef-912e-4ba8-9378-067c5c3e4f54"

  }
}
```
