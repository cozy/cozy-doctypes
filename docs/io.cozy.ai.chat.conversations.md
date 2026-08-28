[Table of contents](README.md#table-of-contents)

# Chat conversations with an AI

Cf [the stack documentation for AI](https://docs.cozy.io/en/cozy-stack/ai/).

## `io.cozy.ai.chat.conversations`

The `io.cozy.ai.chat.conversations` doctype is used to keep history of chat
conversations with an assistant (AI).

- `messages`: {array} An array of the messages of a conversation
  - `id`: {string} Identifier of the message
  - `role`: {string} Can be `user`, `assistant` or `system`
  - `content`: {string} What was said by the user or the assistant
  - `createdAt`: {date} When the message was published
  - `attachmentIDs?`: {array} Identifiers of the `io.cozy.files` attached to a
    user message
  - `sources?`: {array} On an `assistant` message, the documents and web pages
    used to build the answer. Each entry is an object:
    - `sourceType`: {string} Can be `document` or `web`
    - On a `document` source:
      - `id`: {string} Identifier of the source document
      - `doctype`: {string} Doctype of the source document, like `io.cozy.files`
        or `com.linagora.email`
      - `filename?`: {string} Name of the file
      - `page?`: {int} Page of the file the extract comes from
      - `fileUrl?`: {string} URL of the source file
      - `chunkUrl?`: {string} URL of the extract of the file used for the answer
      - `datetime?`: {date} Date of the source document
      - `email.subject?`: {string} Subject of the mail
      - `email.preview?`: {string} Preview of the content of the mail
      - `parent_id?`: {string} Identifier of the parent of the source document
      - `relationship_id?`: {string} Identifier of the relationship of the
        source document
    - On a `web` source:
      - `doctype`: {string} Always `io.cozy.urls`
      - `url`: {string} URL of the web page
      - `title`: {string} Title of the web page
      - `snippet`: {string} Extract of the web page used for the answer
- `relationships.assistant?`: {object} The
  [`io.cozy.ai.chat.assistants`](io.cozy.ai.chat.assistants.md) document bound
  to the conversation, as `{ "data": { "_id": ..., "_type":
  "io.cozy.ai.chat.assistants" } }`. It is set by the stack when the
  conversation is created with an `assistantID`, and it drives both the
  knowledge base scoping and the LLM configuration of every query of that
  conversation.

A `system` message is not written by the clients: it is added by the stack when
the conversation is created with an assistant that has a prompt, see
[`io.cozy.ai.chat.assistants`](io.cozy.ai.chat.assistants.md). Clients should
not render it as a regular conversation turn.

### Example


```json
{
  "_id": "e21dce8058b9013d800a18c04daba326",
  "_rev": "1-23456",
  "cozyMetadata": {
    "createdAt": "2024-09-24T13:24:07.576Z",
    "createdOn": "http://cozy.localhost:8080/",
    "doctypeVersion": "1",
    "metadataVersion": 1,
    "updatedAt": "2024-09-24T13:24:07.576Z"
  },
  "messages": [
    {
      "id": "eb17c3205bf1013ddea018c04daba326",
      "role": "user",
      "content": "Why the sky is blue?",
      "createdAt": "2024-09-24T13:24:07.576Z"
    },
    {
      "id": "0192756f2428758abe0aec7ecefc0c60",
      "content": "The sky appears blue because of a phenomenon called Rayleigh scattering.",
      "createdAt": "2024-09-24T13:24:08.987Z",
      "role": "assistant",
      "sources": [
        {
          "sourceType": "document",
          "doctype": "io.cozy.files",
          "id": "3fa17b7c5d1e013e9c2a18c04daba326",
          "filename": "why-is-the-sky-blue.pdf",
          "page": 2,
          "fileUrl": "http://cozy.localhost:8080/files/3fa17b7c5d1e013e9c2a18c04daba326",
          "chunkUrl": "http://cozy.localhost:8080/files/3fa17b7c5d1e013e9c2a18c04daba326#page=2"
        },
        {
          "sourceType": "document",
          "doctype": "com.linagora.email",
          "id": "d90a1f4e2b73013e9c2a18c04daba327",
          "email.subject": "Physics newsletter",
          "email.preview": "This month, we look at why the sky is blue…",
          "datetime": "2024-09-20T08:12:00.000Z"
        },
        {
          "sourceType": "web",
          "doctype": "io.cozy.urls",
          "url": "https://en.wikipedia.org/wiki/Rayleigh_scattering",
          "title": "Rayleigh scattering",
          "snippet": "Rayleigh scattering is the scattering of light by particles much smaller than the wavelength."
        }
      ]
    }
  ],
  "relationships": {
    "assistant": {
      "data": {
        "_id": "e21dce8058b9013d800a18c04daba326",
        "_type": "io.cozy.ai.chat.assistants"
      }
    }
  }
}
```

### `io.cozy.ai.chat.events`

This doctype is not persisted, it is only used on the realtime websockets to
allow the application to display the tokens of the response step by step.

- `id`: {string} the identifier of the message of the user (the question)
- `object`: {string} can be `delta` for a token or `done` when it's finished
- `content`: {string} the content of the token
- `position`: {int} the index of the token in the stream (as the events can be received in the wrong order)
