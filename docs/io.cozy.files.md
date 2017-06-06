[Table of contents](README.md#table-of-contents)

# Cozy Files doctype

## `io.cozy.files`

The `io.cozy.files` doctype is used for both the files and directories.

### Folder

For a folder, its attributes are:

- `type`: {string} always `directory`
- `name`: {string} the directory name
- `path`: {string} the path to this directory, which is the path of its parent, then `/`, then its name
- `created_at`: {timestamp} the date of the creation of this directory
- `updated_at`: {timestamp} the date of the last update of this directory
- `tags`: {array of strings} a list of tags

It also has a relationship with its `parent` in the JSON-API representation, and another called `data` with the files and directory inside it.

### Files

The attributes of a file are:

- `type`: {string} always `file`
- `name`: {string} the file name
- `trashed`: {bool} true if the file is in the trash
- `md5sum`: {string} the checksum of its content, computed with the MD5 algorithm
- `created_at`: {timestamp} the date of the creation of this directory
- `updated_at`: {timestamp} the date of the last update of this directory
- `tags`: {array of strings} a list of tags
- `size`: {number} the size of its content, in bytes
- `executable`: {bool} true is the file has the executable bit on UNIX (`chmod +x`)
- `class`: {string} a class in the list: `['image', 'document', 'audio', 'video', 'text', 'binary']`
- `mime`: {string} the full mime-type
- `metadata`: {map} an optional map of metadata (for example `width`, `height`, and `datetime` for an image)

It also has a relationship with its `parent` in the JSON-API representation.

For an `image`, there are 3 links to thumbnails: `small`, `medium`, and `large`.

### References

It's possible to link a file or a folder to another document.
It's called [a reference](https://cozy.github.io/cozy-stack/references-docs-in-vfs.html).
It appears in the JSON-API representation as a `refererenced_by` relationship.
