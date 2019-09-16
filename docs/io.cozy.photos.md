[Table of contents](README.md#table-of-contents)

# Cozy Photos doctype

## `io.cozy.photos.albums`

This doctype is used both for manual albums and for clusters.

- `name`: {string} the name of the album. It is the date of the oldest photo for a cluster.
- `auto`: {bool} `true` if the album was automatically computed, and is therefore a cluster.
- `period`: {object} if cluster, the temporal period of the album.
  - `start`: {date} the date of the oldest photo.
  - `end`: {date} the date of the newest photo.

The photos in an album are files (with the class `image`) that are [referenced](https://cozy.github.io/cozy-stack/references-docs-in-vfs.html) by the album document.

## `io.cozy.photos.settings`

This doctype is used to store settings for photos, useful for the clustering.

- `type`: {string} the type of settings, e.g. `clustering`.

### Clustering settings

- `lastDate`: {date} the date of the last clustered photo (based on `created_at`).
- `jobStatus`: {string} the execution status, can be `running` if the service is running, `postponed` if an execution is planned later, or empty.
- `lastExecution`: {timestamp} the last service execution timestamp. Useful when `jobStatus` is `postponed`, to know if the service should be run or not.
- `evaluationCount`: {number} indicates the number of photos clustered since the last parameters evaluation. Set to 0 if a new evaluation is performed.
- `runs`: {number} number of clustering runs.
- `parameters`: {array} a list of parameters for the clustering with the following attributes:
  - `period`: {object} the temporal period of the clustered photos for this set of parameters.
    - `start`: {date} the start of the period.
    - `end`: {date} the end of the period.
  - `modes`: {array} a list of granularity modes parameters, with the following attributes:
    - `name`: {string} the name of the mode, e.g. `default` or `macro`.
    - `eps_temporal`: {number} the temporal epsilon parameter.
    - `eps_spatial`: {number} the spatial epsilon parameter.
  - `evaluation`: {object} the evaluation period on which the parameters have been computed.
    - `start`: {date} the start of the period.
    - `end`: {date} the end of the period.
  - `defaultEvaluation`: {bool} if the current evaluation use default parameters because there was not enough photos.
