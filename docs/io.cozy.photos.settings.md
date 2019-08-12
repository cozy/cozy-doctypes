[Table of contents](README.md#table-of-contents)

# Photos Settings doctype

## `io.cozy.photos.settings`

This doctype is used to store settings for photos, e.g. the computed parameters
to automatically group photos in the timeline.

- `type`: {string} the type of settings, e.g. clustering.

### Clustering settings

- `parameters`: {array} a list of parameters for the clustering with the following attributes:
  - `period`: {string} the temporal period considered for this set of parameters.
    - `name`: {string} period name, e.g. 'all', '2018', etc.
    - `start`: {timestamp} the start of the period
    - `end`: {timestamp} the end of the period
  - `modes`: {array} a list of granularity modes parameters, with the following attributes:
    - `name`: {string} the name of the mode, e.g. 'default' or 'macro'
    - `eps`: {number} the epsilon parameter for the clustering.
    - `eps_spatial`: {number} the spatial epsilon parameter for the clustering.
    - `eps_temporal`: {number} the temporal epsilon parameter for the clustering.
    - `gradient_angle`: {number} the angle parameter for the gradient.
- `lastSeq`: {string} the last recorded sequence number.
- `evaluation`: {object} used to update the parameters.
  - `currentCount`: {number} number of new objects since the last param evaluation
  - `threshold`: {number} new objects' threshold to re-evaluate the parameters
