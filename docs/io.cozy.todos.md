[Table of contents](README.md#table-of-contents)

# Cozy Todos doctype

## `io.cozy.todos.list`

This doctype represents a list of todos:

- `title`: {string} - The list title
- `description`: {string} - The list description
- `limitDate`: {date} - The limit date to complete all the items.

### Relationships

- `items`: {object} - The list items


### Example

```json
{
  "_id": "2165d9a310deadbeeffc08d54c45102",
  "title": "Create a loan file",
  "description": "Loan money to buy a house.",
  "limitDate": "2020-02-01T23:59:59Z",
  "relationships": {
    "items": {
      "data": [
        {
          "_id": "8bffbc24e67716b63e08c71bd0059fea",
          "_type": "io.cozy.todos.item"
        },
        {
          "_id": "68a74e03722f02b1a6fc6a4508015de0",
          "_type": "io.cozy.todos.item"
        }
      ]
    }
  }
}
```


## `io.cozy.todos.item`

This doctype represents a todo item:

- `label`: {string} - The label of the todo item, e.g. "Do stuff".
- `done`: {bool} - Whether the item is done or not.
- `limitDate`: {date} - The limit date to complete this item.
- `completionDate`: {date} - The actual completion date of the item.

### Relationships

- `files`: {object} - Files linked to the todo item.
- `contacts`: {object} - Contacts linked to the todo item.
- `rules`: {object} - The rules used to match others relationships. See below or in the `rules` [doctype](https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.rules) for more details.


#### Rules

A file or contact relationship may be associated to a rule, used to matched the documents, e.g. a rule targeting the last 3 files payslips. In which case, the associated rule is specified in a `data.metadata` object in the relationship:

- `metadata`: {object}
  - `rules`: {object}
    - `matchedBy`: {string} : The rule ID
    - `{...}`: additional fields used as rule parameters, e.g. `limit`, `date`, etc.

### Example

```json
{
  "_id": "8bffbc24e67716b63e08c71bd0059fea",
  "label": "Get last 3 payslips",
  "done": false,
  "limitDate": "2020-01-31T23:59:59Z",
  "completionDate": null,
  "relationships": {
    "files": {
      "data": [
        {
          "_id": "8bffbc24e67716b63e08c71bd0059fea",
          "_type": "io.cozy.files",
          "metadata": {
            "rules": {
              "matchedBy": "io.cozy.rules/payslip",
              "date": "2020-01-01T23:59:59Z",
              "limit": 3
            }
          }
        },
        {
          "_id": "8bffbc24e67716b63e08c71bd0068f52",
          "_type": "io.cozy.files",
          "metadata": {
            "rules": {
              "matchedBy": "io.cozy.rules/payslip",
              "date": "2020-01-01T23:59:59Z",
              "limit": 3
            }
          }
        }
      ]
    },
    "contacts": {
      "data": [
        {
          "_id": "d5fb210882d78ab30dd991fb021ae450",
          "_type": "io.cozy.contacts"
        }
      ]
    },
    "rules": {
      "data": [
        {
          "_id": "io.cozy.rules/payslips",
          "_type": "io.cozy.rules"
        }
      ]
    }
  }
}
```