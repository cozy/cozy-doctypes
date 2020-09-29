- [Cozy exports doctype](#cozy-exports-doctype)
  - [`io.cozy.exports`](#iocozyexports)

# Cozy exports doctype

## `io.cozy.exports`

The `io.cozy.exports` doctype holds the informations about the instance exports.
An export is divided into several parts of equal size.

- `domain` {string}: The instance domain of the export
- `parts_size` {int}: Size of each export part
- `parts_cursors` {\[]string}: List of cursors parts
- `with_doctypes` {\[]string}: List of exported doctypes
- `without_files` {bool}: Either the files are exported or not
- `state`: {string}: State of the export (exporting/done/error)
- `created_at` {timestamp}: Date of creation
- `expires_at` {timestamp}: Date of expiration
- `total_size`{int}: Total size of the export, with all the parts
- `creation_duration` {duration}: Total elapsed time for the export generation
