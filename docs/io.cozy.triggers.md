[Table of contents](README.md#table-of-contents)

# Triggers doctype

`io.cozy.triggers` documents are used by the stack to configure [how and when a job should be runned](https://docs.cozy.io/en/cozy-stack/jobs/).

This is a special doctype which can only be created from an app. We are using it in [Cozy-Collect](http://github.com/cozy/cozy-collect/) to manage konnectors scheduling.

## Attributes

| Attribute   | Role                                                                                                                                                                  |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `arguments` | Arguments related to the `type` attribute. For example it's a cron configuration when the `type` is set to `@cron`.                                                   |
| `debounce`  | Amount of time until the job cannot be run again. This attribute is used to limite the amount of jobs in a burst.                                                     |
| `message`   | Parameters to pass to the the worker. For example, when the `worker` is set to `konnector`, `message` contains the related konnector and the related account.         |
| `options`   | Parameters related to the job.                                                                                                                                        |
| `type`      | Type of trigger. Can be `@at`, `@cron`, `@event`, `@every`, `@in` and `@webhook`. See the [stack documentation](https://docs.cozy.io/en/cozy-stack/jobs/) for more informations. |
| `worker`    | Type of worker. Can be `konnector` or `sendmail`.                                                                                                                     |

## Example

Trigger configured to run the konnector [Debug](http://github.com/cozy/cozy-konnector-debug/) with the [`io.cozy.accounts`](io.cozy.accounts.md) document having the id `53fe4d0e4f6d3be99ba7a5d2580081a8`.

```json
{
  "type": "@cron",
  "worker": "konnector",
  "arguments": "0 45 4 * * 3",
  "debounce": "",
  "options": null,
  "message": {
    "konnector": "debug",
    "account": "53fe4d0e4f6d3be99ba7a5d2580081a8"
  }
}
```
