- [Cozy OAuth access codes doctype](#cozy-oauth-access-codes-doctype)
  - [`io.cozy.oauth.access_codes`](#iocozyoauthaccesscodes)

# Cozy OAuth access codes doctype

## `io.cozy.oauth.access_codes`

The `io.cozy.oauth.access_codes` doctype contain the OAuth access codes used in
the OAuth2 flow.

- `code` {string}: The access code
- `issued_at` {timestamp}: When the access code has been issued
- `scope` {string}: Scope allowed for this access code ([see here](https://docs.cozy.io/en/cozy-stack/permissions/#inline))

More informations are available on the [official documentation](https://docs.cozy.io/en/cozy-stack/auth/)
