- [Cozy account types doctype](#cozy-account-types-doctype)
  - [`io.cozy.account_types`](#iocozyaccounttypes)

# Cozy account types doctype

## `io.cozy.account_types`

The `io.cozy.account_types` can be used for two main purposes:

- It can contain secret configuration parameters needed by the webapp/konnectors
  (API Tokens, API URLS, ...). Every time a konnector job is executed, the stack
  can give some of these secret parameters to the konnector

- It can contain an OAuth configuration for a service. It simplifies the
  development of konnectors for OAuth providers, and avoids race conditions when
  the same account is used by several konnectors.


- `grant_mode` {string}: Grant mode, part of the OAuth standard
- `client_id` {string}: Client ID, part of the OAuth standard
- `client_secret` {string}: Client secret, part of the OAuth standard
- `auth_endpoint` {string}: The endpoint of the external service authentication
- `token_endpoint` {bool}: The endpoint of the external service token exchange
- `token_mode` {string}: Mode of token auth retreiving(`form`/`basic`/`get`)
- `redirect_uri` {[]string}: List of redirect URIs given by the client. Part of
  the OAuth standard
- `extras` {map[string]string}: Extra auth query parameters
- `slug` {string}: Slug of the webapp/konnector
- `secret` {object}: JSON object given as an environment variable to the
  konnector
