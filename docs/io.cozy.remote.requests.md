[Table of contents](README.md#table-of-contents)

# Logs of the requests via the remote doctypes

## `io.cozy.remote.requests`

- `doctype`: the remote doctype used in the request (example: `org.wikidata.entity`)
- `verb`: the HTTP verb used for the request (`GET` or `POST`)
- `url`: the URL of the remote website, with variables injected in it
- `response_code`: the HTTP response code, (often `200`)
- `content_type`: the content-type of the response (example: `application/json`)
- `variables`: the key->value map of the variables sent to the stack,
  including the "comments" (variables that are not sent to the remote website,
  but can be useful for the people reading the logs).
- `created_at`: the date/time of the request
