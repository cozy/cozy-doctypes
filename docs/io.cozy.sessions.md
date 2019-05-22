- [Cozy sessions doctype](#cozy-sessions-doctype)
  - [`io.cozy.sessions`](#iocozysessions)
  - [Example](#example)

# Cozy sessions doctype

## `io.cozy.sessions`

The `io.cozy.sessions` doctype holds the web sessions informations.

- `created_at` {timestamp}: When the session has been created
- `last_seen` {timestamp}: When the user has been seen for the last time
- `long_run` {bool}: Either the session is a long run one or not (used for
  cookies)

## Example

```json
{
  "_id": "add3ca2ca5532c0323df0ec7fc04ea6f",
  "_rev": "3-a01838aee2211b84df392381461362ed",
  "created_at": "2019-05-10T17:01:12.150074836+02:00",
  "last_seen": "2019-05-14T10:21:47.961429238+02:00",
  "long_run": false
}
```
