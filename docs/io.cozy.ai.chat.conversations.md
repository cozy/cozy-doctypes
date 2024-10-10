[Table of contents](README.md#table-of-contents)

# Chat conversations with an AI

Cf [the stack documentation for AI](https://docs.cozy.io/en/cozy-stack/ai/).

## `io.cozy.ai.chat.conversations`

The `io.cozy.ai.chat.conversations` doctype is used to keep history of chat
conversations with an assistant (AI).

- `messages`: {array} An array of the messages of a conversation
  - `id`: {string} Identifier of the message
  - `role`: {string} Can be `user` or `assistant`
  - `content`: {string} What was said by the user or the assistant
  - `createdAt`: {date} When the message was published

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
      "role": "assistant"
    }
  ]
}
```

### `io.cozy.ai.chat.events`

This doctype is not persisted, it is only used on the realtime websockets to
allow the application to display the tokens of the response step by step.

- `id`: {string} the identifier of the message of the user (the question)
- `object`: {string} can be `delta` for a token or `done` when it's finished
- `content`: {string} the content of the token
- `position`: {int} the index of the token in the stream (as the events can be received in the wrong order)
