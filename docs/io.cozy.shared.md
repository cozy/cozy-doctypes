- [Cozy shared doctype](#cozy-shared-doctype)
  - [`io.cozy.shared`](#iocozyshared)

# Cozy shared doctype

## `io.cozy.shared`

The `io.cozy.shared` doctype is related to the sharing part of the stack. It
tracks the sharings and its references, its infos & revisions across the stack.

- `revisions` {object}: Tree of revisions of a sharing
- `infos` {map[string]object}: Infos of the sharing
  - `rule` {int}: Index of the rule inside the sharing rules
  - `removed` {bool}: Either the document has been deleted, the file is trashed,
    or the document does no longer match the sharing rule
  - `binary` {bool}: Only true if the sharing is a file and has not been
    trashed
