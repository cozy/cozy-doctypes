[Table of contents](README.md#table-of-contents)

# Photos Albums doctype

## `io.cozy.photos.albums`

This doctype is really simple. It just has one attribute:

- `name`: {string} the name of the album

The photos in an album are files (with the class `image`) that are [referenced](https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/) by the album document.
