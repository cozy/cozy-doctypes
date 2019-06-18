[Table of contents](README.md#table-of-contents)

# Cozy Administrative Procedures doctype

## `io.cozy.procedures.administratives`

The `io.cozy.procedures.administratives` doctype represents the administrative procedures. An administrative procedure is composed by the informations about the procedure, the personal information of the person that origins the procedure and the relations to the documents required for the procedure.
The template referred to describes the data we need for this type of procedure (_e.g_ the documents, personal informations, etc). Those templates are not CouchDB documents for now.

- `procedureData`: {object} the data about the procedure (_e.g_ amount, duration, _etc_).
- `personalData`: {object} the personal data associated to the procedure (_e.g_ email, phone number, _etc_).
- `templateId`: {string} the template's identifier
- `templateVersion`: {number} the template's version
- `relationships`: {object} links between documents
  - `files`: {object} attachments
    - `data`: {array} list of files
      - `_id`: {string} id of the io.cozy.files document
      - `_type`: {string} doctype "io.cozy.files"
      - `templateDocumentId`: {string} the id of the document in the template
