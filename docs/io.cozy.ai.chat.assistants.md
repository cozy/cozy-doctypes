[Table of contents](README.md#table-of-contents)

# Chat assistants with an AI

Cf [the stack documentation for AI](https://docs.cozy.io/en/cozy-stack/ai/).

## `io.cozy.ai.chat.assistants`

The `io.cozy.ai.chat.assistants` doctype is used to keep configuration of an assistant (AI).

- `name`: {array} The name of assistant
- `prompt`: {string?} What does this assistant do? How should it behave? What should it avoid doing?
- `isCustomModel`: {boolean} Is the selected model custom or not?
- `icon`: {string?} The avatar of assistant

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
  "relationships": {
    "provider": {
      "data": {
        "_type": "io.cozy.accounts",
        "_id": "e21dce8058b9013d800a18c04daba322"
      }
    }
  }
}
```
