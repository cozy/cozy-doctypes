[Table of contents](README.md#table-of-contents)

# Cozy AI chat doctypes

Cozy can store and manipulate the data of a chat with an AI, distributed across
several doctypes.

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
  [`io.cozy.ai.chat.assistants`](#iocozyaichatassistants) document bound
  to the conversation, as `{ "data": { "_id": ..., "_type":
  "io.cozy.ai.chat.assistants" } }`. It is set by the stack when the
  conversation is created with an `assistantID`, and it drives both the
  knowledge base scoping and the LLM configuration of every query of that
  conversation.

A `system` message is not written by the clients: it is added by the stack when
the conversation is created with an assistant that has a prompt, see
[`io.cozy.ai.chat.assistants`](#iocozyaichatassistants). Clients should
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

## `io.cozy.ai.chat.assistants`

The `io.cozy.ai.chat.assistants` doctype is used to keep configuration of an assistant (AI).

- `name`: {string} The name of assistant
- `prompt?`: {string} Define a custom prompt to personalize the assistant. This
  can typically be used to give personality to the LLM, change the tone, the
  level of details, etc. But it cannot add functionality, nor infer or make incorrect
  claims about your data.
- `icon?`: {string} The avatar of assistant, as a base64 encoded string. It can also
  be explicitly `null` when the assistant has no avatar.
- `knowledgeBase?`: {array} A list of `{doctype, dirId?}` entries scoping the
  assistant's retrieval to specific sources. When empty or absent, the
  assistant's retrieval is not scoped. Two kinds of entries exist:
  - `{"doctype": "io.cozy.files", "dirId": "..."}` scopes retrieval to a Drive
    folder. Only a single folder is currently supported: if several are given,
    the stack keeps the first one and ignores (with a warning) any other
    distinct folder.
  - `{"doctype": "com.linagora.email"}` (no `dirId`) scopes retrieval to the
    user's mails. This entry is not interpreted by cozy-stack, only by the
    clients.

### LLM provider

The `relationships.provider.data` object identifies the LLM account (an
`io.cozy.accounts` document) used by the assistant. Note that the assistant
document itself does not carry the model, the base URL, nor the API key: they
all live on that account.

- `_id`: {string} The id of the `io.cozy.accounts` document
- `_type`: {string} `io.cozy.accounts`
- `metadata.providerId`: {string} The provider of the account (`openai`,
  `mistral`, …). It is used by the stack to decide whether to forward a custom
  LLM configuration to OpenRAG instead of the stack's default RAG
  configuration.

When `providerId` is empty or equal to `"openrag"`, the stack's default RAG
configuration is used. For any other value, the stack reads the linked account
and forwards:

- the model: `auth.login`,
- the API key: `auth.password`, which the stack stores encrypted as
  `auth.credentials_encrypted`,
- the base URL: `data.baseUrl`.

If the account cannot be read, or if none of those three fields is set, the
default configuration is used.

### Assistant prompt and conversations

When a conversation is created via the cozy-stack `POST /ai/chat/conversations/:id`
route with an `assistantID`, if the assistant has a non-empty `prompt`, a
`role: "system"` message carrying that prompt is prepended to the conversation's
`messages` (before the user's own message), and consumed as-is by OpenRAG's chat
completion format. It is persisted in the
[`io.cozy.ai.chat.conversations`](#iocozyaichatconversations) document,
and clients should not render `system` messages as regular conversation turns.
The prompt is only injected at creation time: editing an assistant's `prompt`
does not update the conversations already created with it.

If a conversation references an assistant that no longer exists, the stack
answers with an error rather than falling back to unscoped retrieval, which
would silently widen a folder-scoped conversation to the whole instance.

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
  "name": "My assistant",
  "prompt": "This is my assistant",
  "icon": "[encoded base64 string of the content of the icon or svg binary]",
  "knowledgeBase": [
    {
      "doctype": "io.cozy.files",
      "dirId": "b21dce8058b9013d800a18c04daba333"
    }
  ],
  "relationships": {
    "provider": {
      "data": {
        "_type": "io.cozy.accounts",
        "_id": "e21dce8058b9013d800a18c04daba322",
        "metadata": {
          "providerId": "openrag"
        }
      }
    }
  }
}
```

## `io.cozy.ai.chat.rag`

The `io.cozy.ai.chat.rag` doctype is used to keep the RAG indexation status of
a document. Its identifier is the identifier of the document it describes. Only
files are indexed for now, and the relationship always points to an
`io.cozy.files` document.

- `indexed`: {boolean} Whether a version of the document has been indexed. A
  failed indexation does not reset it to `false`, so `indexed` can be `true`
  while `status` is `error`: a previous version is still indexed
- `status`: {string} Can be `success`, `error` or `notsupported`. The
  `notsupported` status is not reported by the indexer, it is the stack that
  decides a document will not be indexed
- `docRev`: {string} The revision of the document this status describes.
  Compare it to the current revision of the document to know whether it is the
  current content that is indexed.
- `lastSuccessDate?`: {date} When the document was last indexed successfully.
  Absent as long as no indexation has succeeded
- `lastErrorDate?`: {date} When the last indexation of the document failed.
  Absent as long as no indexation has failed
- `relationships`: {object}
  - `doc`: {object} The document this status describes

A status is only replaced by one about a revision that is not older than the
recorded `docRev`, so a callback that comes in late cannot bring an outdated
status back. The status document is deleted along with the document it
describes.

### Example


```json
{
  "_id": "e21dce8058b9013d800a18c04daba326",
  "_rev": "1-23456",
  "indexed": true,
  "status": "success",
  "docRev": "3-6a1b0b8a51a4e0e0a3b7f0f1d2c3b4a5",
  "lastSuccessDate": "2026-08-28T13:24:07.576Z",
  "relationships": {
    "doc": {
      "data": {
        "_id": "e21dce8058b9013d800a18c04daba326",
        "_type": "io.cozy.files"
      }
    }
  }
}
```
