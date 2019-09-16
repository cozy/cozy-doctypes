[Table of contents](README.md#table-of-contents)

# Photos Albums doctype

## `io.cozy.photos.albums`

This doctype is used both for manual albums and for clusters.

- `name`: {string} the name of the album. It is the date of the oldest photo for a cluster.
- `auto`: {bool} `true` if the album was automatically computed, and is therefore a cluster.
- `period`: {object} if cluster, the temporal period of the album
  - `start`: {date} the date of the oldest photo
  - `end`: {date} the date of the newest photo

The photos in an album are files (with the class `image`) that are [referenced](https://cozy.github.io/cozy-stack/references-docs-in-vfs.html) by the album document.
