[Table of contents](README.md#table-of-contents)

# Cozy Rules doctype

## `io.cozy.rules`

This doctype represents rules, used to retrieve documents in the Cozy.

- `_id`: {string} - The fixed rule ID, that should respect this nomenclature: `<editor-reverse-domain-name>.rules/<rule-name>`. For instance: `io.cozy.rules/payslips`.
- `description`: {string} - The rule description.
- `doctype`: {string} - The doctype of the documents targeted by the rule.
- `rule`: {object}
  - `limit`: {number} - The maximum number of documents to retrieve with this rule.
  - `selector`: {object} - The selector to target documents, following the [Mango syntax](https://docs.couchdb.org/en/stable/api/database/find.html#find-selectors)

Note the rule attributes, i.e. `limit` and `selector` can be parametrised by using a `{var-name}` notation. In the example below, `{date}` is a rule parameter used to find payslips before this date, while `{limit}` restricts the number of documents retrieved.


### Example

```json
{
  "_id": "io.cozy.rules/payslips",
  "description": "Get payslips from the given date",
  "doctype": "io.cozy.files",
  "rule": {
    "limit": "{limit}",
    "selector": {
      "cozyMetadata.classification": "payslip",
      "cozyMetadata.createdAt": {
        "$lt": "{date}"
      }
    }
  }
}

```
