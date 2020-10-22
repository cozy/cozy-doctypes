[Table of contents](README.md#table-of-contents)

# Bitwarden folders

The `com.bitwarden.folders` doctype is used to organize
[ciphers](./com.bitwarden.ciphers.md).

## Attributes

- `name`: {string} - the name of the folder, encrypted as a cipherString with AES
- `cozyMetadata`: {object} - the [cozyMetadata](README.md#document-metadata)

## Example

```json
{
  "_id": "44907c0262681483ab53e944fa0782e1",
  "_rev": "1-63242020f047a03e828514af2546c914",
  "name": "2.wqUYK+tfBUcUospPv28uhw==|FCcImzd1G6Xq8sO1mF9+Xw==|am84ofcVS+NM0fWhm4WIECC+iBQ9fldOtVy1JrfTmyg=",
  "cozyMetadata": {
    "doctypeVersion": "1",
    "metadataVersion": 1,
    "createdAt": "2019-09-24T15:51:29.320878421+02:00",
    "updatedAt": "2019-09-24T15:51:29.320878421+02:00"
  }
}
```
