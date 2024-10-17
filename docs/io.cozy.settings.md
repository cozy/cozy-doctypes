- [Cozy settings doctype](#cozy-settings-doctype)
  - [`io.cozy.settings`](#iocozysettings)

# Cozy settings doctype

## `io.cozy.settings`

The `io.cozy.settings` doctype contains some documents. The most important one
is the stack instance-related settings.

### Instance settings document

- `_id`: `io.cozy.settings.instance`
- `tz`: {string} Timezone of the instance (ex: `Europe/Paris`)
- `email`: {string} Email of the instance
- `public_name`: {string} Public displayed name of the instance
- `default_redirection`: {string} Redirect to an app after login (ex: `drive/#/folder`)
- `colorScheme`: {'light'|'dark'|'auto} Used to manage the appearance of an app

### Bitwarden settings document

There is also a document with the stuff related to authentication and Bitwarden:

- `_id`: `io.cozy.settings.bitwarden`
- `passphrase_kdf`: {int} the type of KDF (0 for PBKDF2 with SHA256)
- `passphrase_kdf_iterations`: {int} the number of iterations to derive the master key from the password
- `passphrase_hint`: {string} a message displayed in bitwarden clients to help the user finding again their password
- `security_stamp`: {string} a value changed when the password is modified, to ensure that bitwarden clients don't send ciphers encrypted with the old password
- `key`: {string} the key used to encrypt ciphers, itself encrypted with the master key
- `public_key`: {string} the public key of the user for the cozy organization
- `private_key`: {string} the private key of the user for the cozy organization (encrypted)
- `encrypted_organization_key`: {string} the key to encrypt/decrypt the ciphers in the Cozy organization (encrypted)
- `organization_id`: {string} the identifier of the Cozy organization
- `collection_id`: {string} the identifier of the collection for the Cozy organization
- `equivalent_domains`: {array} an array with lists of equivalent domains
- `global_equivalent_domains`: {array} an array of integers used by bitwarden clients

### Display settings document

:warning: Deprecated because there is no direct stack route to use it.

- `_id`: `io.cozy.settings.display`
- `pushBanners`: {object} Relative attributes to push banners
  - `hideFlagshipApp`: {bool} Hide the push banner for Flagship App
  - `hidePassMobile`: {bool} Hide the push banner for Pass Mobile App
