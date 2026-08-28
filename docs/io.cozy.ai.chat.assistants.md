[Table of contents](README.md#table-of-contents)

# Chat assistants with an AI

Cf [the stack documentation for AI](https://docs.cozy.io/en/cozy-stack/ai/).

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
[`io.cozy.ai.chat.conversations`](io.cozy.ai.chat.conversations.md) document,
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
