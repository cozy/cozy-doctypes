- [Cozy jobs doctype](#cozy-jobs-doctype)
  - [`io.cozy.jobs`](#iocozyjobs)

# Cozy jobs doctype

## `io.cozy.jobs`

The `io.cozy.jobs` doctype holds the informations about the instance jobs. Jobs are created by triggers to handle specific background tasks.

- `domain` {string}: The instance domain of the job
- `worker` {string}: Worker type
  - `service`: Handle services (bank operations matching for example)
  - `konnector`: Handle konnectors executions
  - `thumbnail`: Handle image thumbnails computation
  - `sendmail`: Manages all the mail-related work (sharings, 2FA, passphrase
    reset, ...)
  - `migrations`: Used to handle Swift layout migrations
  - `move`: Move worker role is to export an instance data
  - `push`: This worker is responsible of mobile notifications
  - `share-*`: `share-track`, `share-replicate` & `share-upload` manage all the
    share-related data between the instances.
  - `unzip`: Unzip files
  - `updates`: Handle app/konnectors updates
- `message` {object}: Contains all the specific-worker data (slug, script name,
  ...)
- `manual_execution` {bool}: Tells if the job had beed manually excuted
- `event` {object}: Holds the informations for realtime
- `options` {object}: Custom overriden options for the job (`max_exec_count`, `max_exec_time`, `timeout`)
- `state` {string}: State of the job. Can be `queued`, `running`, `errored` or `done`
- `queued_at` {timestamp}: When the job has been queued
- `started_at` {timestamp}: When the job has been started
- `finished_at` {timestamp}: When the job has been finished
- `error` {string}: Contains the error message if the job failed


You can get more informations on the [official documentation](https://docs.cozy.io/en/cozy-stack/jobs/)
