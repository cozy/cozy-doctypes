[Table of contents](README.md#table-of-contents)

# Cozy notes doctypes

## `io.cozy.notes.documents`

This doctype is not persisted in CouchDB, it is only used to create a note, and
this note will be persisted as an `io.cozy.files`. Its attributes are:

- `title`: {string} the initial title of the note (that will also be used for the file name)
- `dir_id`: {string} the id of the directory where the file will be created (optional)
- `schema`: {object} the schema used by prosemirror (with `notes` and `marks` serialized as arrays to preserve the order).

### Example (JSON-API format)

```json
{
  "data": {
    "type": "io.cozy.notes.documents",
    "attributes": {
      "title": "My new note",
      "dir_id": "f48d9370-e1ec-0137-8547-543d7eb8149c",
      "schema": {
        "nodes": [
          ["doc", { "content": "block+" }],
          ["paragraph", { "content": "inline*", "group": "block" }],
          ["blockquote", { "content": "block+", "group": "block" }],
          ["horizontal_rule", { "group": "block" }],
          [
            "heading",
            {
              "content": "inline*",
              "group": "block",
              "attrs": { "level": { "default": 1 } }
            }
          ],
          ["code_block", { "content": "text*", "marks": "", "group": "block" }],
          ["text", { "group": "inline" }],
          [
            "image",
            {
              "group": "inline",
              "inline": true,
              "attrs": { "alt": {}, "src": {}, "title": {} }
            }
          ],
          ["hard_break", { "group": "inline", "inline": true }],
          [
            "ordered_list",
            {
              "content": "list_item+",
              "group": "block",
              "attrs": { "order": { "default": 1 } }
            }
          ],
          ["bullet_list", { "content": "list_item+", "group": "block" }],
          ["list_item", { "content": "paragraph block*" }]
        ],
        "marks": [
          ["link", { "attrs": { "href": {}, "title": {} }, "inclusive": false }],
          ["em", {}],
          ["strong", {}],
          ["code", {}]
        ],
        "topNode": "doc"
      }
    }
  }
}
```

## `io.cozy.notes.steps`

This doctype is used for prosemirror steps. You can see them as a kind of patch
on a note. It describes a small transformation on the note. Its attributes are:

- `timestamp`: {int} a timestamp of the date when the server accepted the step (it should only be used by the server)
- `sessionID`: {string} a random string used to identify the user that made the change
- `version`: {int} the version of the note before the change (the step can only be applied to the note if the version matches, else it has to rebased by the client)
- `stepType`: {string} the type of the step, as defined by prosemirror
- `from`, `to`, `slice`: data that can be interpreted by prosemirror in function of the step type.

### Example (JSON in CouchDB)

```json
{
  "_id": "d9fc3726f254a0ccfb2ca30d9e00142a/00000001",
  "_rev": "1-894d54b267404abad9a1cf08f1a8a663",
  "from": 1,
  "sessionID": "cozy.tools75:1576503622324.324.0.9928191162716804",
  "slice": {
    "content": [
      {
        "text": "H",
        "type": "text"
      }
    ]
  },
  "stepType": "replace",
  "timestamp": 1576503628,
  "to": 1,
  "version": 1
}
```

## `io.cozy.notes.telepointers`

This doctype is not persisted, it is sent by the clients to the stack, and the
stack send them to the other clients via the realtime websockets. Its
attributes are:

- `sessionID`: {string} a random string used to identify the user that made the change
- `type`: {string} the type of the telepointer, as defined by prosemirror
- `anchor`, `head`: data that can be interpreted by prosemirror.

### Example (JSON-API format)

```json
{
  "data": {
    "type": "io.cozy.notes.telepointers",
    "id": "f48d9370-e1ec-0137-8547-543d7eb8149c",
    "attributes": {
      "sessionID": "543781490137",
      "anchor": 7,
      "head": 12,
      "type": "textSelection"
    }
  }
}
```

## `io.cozy.notes.events`

This doctype is only used for sending the events related to a note in the
realtime websockets. The client subscribes to a note, and the server send
events on this note, that can be a change on the note title, its content,
or a telepointer update.

### Example

```
client > {"method": "SUBSCRIBE",
          "payload": {"type": "io.cozy.notes.events",
                      "id": "f48d9370-e1ec-0137-8547-543d7eb8149c"}}
server > {"event": "UPDATED",
          "payload": {"id": "f48d9370-e1ec-0137-8547-543d7eb8149c",
                      "type": "io.cozy.notes.events",
                      "doc": {"doctype": "io.cozy.notes.documents",
                              "sessionID": "543781490137",
                              "title": "this is the new title of this note"}}}
server > {"event": "CREATED",
          "payload": {"id": "f48d9370-e1ec-0137-8547-543d7eb8149c",
                      "type": "io.cozy.notes.events",
                      "doc": {"doctype": "io.cozy.notes.steps",
                              "sessionID": "543781490137",
                              "version": 6,
                              "stepType": "replace",
                              "from": 1,
                              "to": 1,
                              "slice": {"content": [{"type": "text", "text": "H"}]}}}}
server > {"event": "UPDATED",
          "payload": {"id": "f48d9370-e1ec-0137-8547-543d7eb8149c",
                      "type": "io.cozy.notes.events",
                      "doc": {"doctype": "io.cozy.notes.telepointers", "sessionID": "543781490137", "anchor": 7, "head": 12, "type": "textSelection"}}}
```

## `io.cozy.notes.images`

This doctype is used to keep track of images added to a note. Its attributes are:

- `name`: {string} The image name
- `mime`: {string} The image mime-type
- `width`: {number} The image width
- `height`: {number} The image height
- `willBeResized`: {boolean} Set by the stack to determine if the image is too large to be contained in the note and a thumbnail needs to be computed.
- `willBeRemoved`: {boolean} Set by the stack to indicate the image needs to be later removed. This is used to give some time to the user to cancel the deletion of an image. 


### Example (JSON in CouchDB)

```json
{
  "_id": "7690fa7c64f9fa512531319e3df9f472/dd1776a3-6abe-47dc-b0d9-6c0e345b2679",
  "name": "clisk.png",
  "mime": "image/svg+xml",
  "width": 341,
  "height": 512
}
```
