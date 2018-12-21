[Table of contents](README.md#table-of-contents)

# Cozy Terms doctype

## `io.cozy.terms`

The `io.cozy.terms` doctype can be used to store some (application related or not) terms seen by the user inside the Cozy. A terms must be unique if this is the same id and the same version (the url can changed), if the id or the version changes, a new document must be created.

- `accepted`: (Boolean) The fact that the terms has been accepted by the Cozy user or not
- `acceptedAt`: (Date) The date when the Cozy user accepted these terms
- `termsId`: the id of the terms
- `url`: The url of the terms (to redirect the Cozy user to if needed)
- `version`: The version of these terms
