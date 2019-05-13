- [Cozy permissions doctype](#cozy-permissions-doctype)
  - [`io.cozy.permissions`](#iocozypermissions)

# Cozy permissions doctype

## `io.cozy.permissions`

The `io.cozy.permissions` doctype is used for a owner of the cozy instance to
control the access of his data.

- `type` {string}: Permission type
  - `register`: temporary permissions allowed by registerToken
  - `app`: permissions for an application
  - `konnector`: permissions for a konnector
  - `oauth`: permissions for an oauth
  - `cli`: permissions for commandline
  - `share`: permissions for a share by link
  - `share-preview` permissions for a preview in cozy-to-cozy sharing
- `source_id` {string}: Source of the permission. Can be used to reference a
  parent permissions
- `permissions` {object}: Set of rules to allow/disallow actions on data [see
  here](https://docs.cozy.io/en/cozy-stack/permissions/#what-is-a-permission)
- `expires_at` {timestamp}: When the permission expires
- `codes` {map[string]string}: Contains a list of the members (email or instance
  name) of a permission
- `shortcodes` {map[string]string}: Like codes, but contains a shorter code (12
  chars) instead of a token

See also the [official
documentation](https://docs.cozy.io/en/cozy-stack/permissions/) for additional
informations
