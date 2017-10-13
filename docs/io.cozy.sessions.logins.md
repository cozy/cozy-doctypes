[Table of contents](README.md#table-of-contents)

# Session login entry

## `io.cozy.sessions.logins`

This doctype represent an entry in the session history:

- `ip`: {string} the ip used to login
- `city`: {string} the city from where the user has logged in (estimated from IP)
- `country`: {string} the country from where the user has logged in (estimated from IP)
- `user_agent`: {string} the full useragent string used to login
- `os`: {string} the os used to login
- `browser`: {string} the browser used to login
- `created_at`: {string} the login date
