- [Cozy sessions doctype](#cozy-sessions-doctype)
  - [`io.cozy.sessions`](#iocozysessions)

# Cozy sessions doctype

## `io.cozy.sessions`

The `io.cozy.sessions` doctype holds the web sessions informations.

- `instance` {object}: The instance of the sessions
- `created_at` {timestamp}: When the session has been created
- `last_seen` {timestamp}: When the user has been seen for the last time
- `long_run` {bool}: Either the session is a long run one or not (used for
  cookies)
