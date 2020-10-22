[Table of contents](README.md#table-of-contents)

# Cozy Todos doctypes

## `io.cozy.todos.list`

This doctype represents a todo list:

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
- `description`: {string} - A description of the item.
- `done`: {bool} - Whether the item is done or not.
- `limitDate`: {date} - The limit date to complete this item.
- `completionDate`: {date} - The actual completion date of the item.

### Relationships

- `files`: {object} - Files linked to the todo item.
- `contacts`: {object} - Contacts linked to the todo item.
- `docrules`: {object} - The rules used to match documents from other relationships, e.g. a rule used to match specific files, such as payslips. See below or in the `docrules` [doctype](https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.docrules) for more details.

#### DocRules

When a document has been linked to a todo through the use of a rule, the rule that was used to find the document is saved in the `metadata` of the relationship.

- `metadata`: {object}
  - `docrules`: {object}
    - `matchedBy`: {string} : The rule ID
    - `{...}`: additional fields used as rule parameters, e.g. `limit`, `date`, etc.

In the example below, a docrule is targeting the last 3 files payslips from a given date. 

### Example

```json
{
  "_id": "8bffbc24e67716b63e08c71bd0059fea",
  "label": "Get the last 3 payslips",
  "description": "This is required to prove the income",
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
            "docrules": {
              "matchedBy": "io.cozy.docrules/payslip",
              "date": "2020-01-01T23:59:59Z",
              "limit": 3
            }
          }
        },
        {
          "_id": "8bffbc24e67716b63e08c71bd0068f52",
          "_type": "io.cozy.files",
          "metadata": {
            "docrules": {
              "matchedBy": "io.cozy.docrules/payslip",
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
    "docrules": {
      "data": [
        {
          "_id": "io.cozy.docrules/payslips",
          "_type": "io.cozy.docrules"
        }
      ]
    }
  }
}
```
