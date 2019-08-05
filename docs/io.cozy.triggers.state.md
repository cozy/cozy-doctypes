- [Cozy triggers state doctype](#cozy-triggers-state-doctype)
  - [`io.cozy.triggers.state`](#iocozytriggersstate)

# Cozy triggers state doctype

> Note: This doctype is only virtual. It is computed each time by agggregating
> informations about a trigger based on its jobs


## `io.cozy.triggers.state`

The `io.cozy.triggers.state` doctype gather the data of a trigger from its jobs

- `status` {string}: Global status of the trigger (`queued`, `running`, `done`, `errored`)
- `last_success` {timestamp}: Date of the last job in success
- `last_successful_job_id` {string}: ID of the last job in success
- `last_execution` {timestamp}: Date of the last executed job
- `last_executed_job_id` {string}: ID of the last executed job
- `last_failure` {timestamp}: Date of the last job in failure
- `last_failed_job_id` {string}: ID of the last job in failure
- `last_manual_execution` {timestamp}: Date of the last job manually executed
- `last_manual_job_id` {string}: ID of the last job manually executed
- `last_error` {string}: Content of the last error
