[Table of contents](README.md#table-of-contents)

# Chat assistants with an AI

Cf [the stack documentation for AI](https://docs.cozy.io/en/cozy-stack/ai/).

## `io.cozy.ai.chat.assistants`

The `io.cozy.ai.chat.assistants` doctype is used to keep configuration of an assistant (AI).

- `name`: {string} The name of assistant
- `prompt?`: {string} What does this assistant do? How should it behave? What should it avoid doing?
- `isCustomModel`: {boolean} Is the selected model custom or not?
- `icon?`: {string} The avatar of assistant
- `knowledgeBase?`: {array} A list of `{doctype, dirId}` entries scoping the assistant's
  retrieval to specific Drive folders. Only `io.cozy.files` entries are taken into
  account, and only a single folder is currently supported: if several are given,
  the stack keeps the first one and ignores (with a warning) any other distinct
  folder. When empty or absent, the assistant's retrieval is not scoped to a
  particular folder.

The `relationships.provider.data` object identifies the LLM account (an
`io.cozy.accounts` document) used by the assistant, plus a `metadata.providerId`
used by the stack to decide whether to forward a custom LLM configuration
(model, API key, base URL) from that account to OpenRAG instead of the stack's
default RAG configuration: `providerId` empty or equal to `"openrag"` means the
default configuration is used.

When a conversation is created via the cozy-stack `POST /ai/chat/conversations/:id`
route with an `assistantID`, if the assistant has a non-empty `prompt`, a
`role: "system"` message carrying that prompt is prepended to the conversation's
`messages` (before the user's own message), and consumed as-is by OpenRAG's chat
completion format. Clients should not render `system` messages as regular
conversation turns.

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
  "isCustomModel": false,
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
