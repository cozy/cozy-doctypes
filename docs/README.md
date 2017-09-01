# Table of contents

## Cozy doctypes

- [Accounts](io.cozy.accounts.md): accounts used in external services
- [Apps](io.cozy.apps.md): installed apps
- [Bank](io.cozy.bank.md): banking related data
- [Bills](io.cozy.bills.md): bills
- [Contacts](io.cozy.contacts.md): instance owner contacts
- [Files](io.cozy.files.md): files documents
- [Konnectors](io.cozy.konnectors.md): installed Konnectors
- [Notifications](io.cozy.notifications.md): notifications made by the apps
- [Photos Albums](io.cozy.photos.albums.md): photos albums
- [Remote requests](io.cozy.remote.requests.md): logs of requests via the remote doctypes
- [Settings](io.cozy.settings.md): instance settings

## How update this repository

- Add new doctype in `index.js`
- Add documentation in `docs/<doctype>.md` and update `docs/README.md` (It's alphabetic order)
- Upgrade version number in `package.json`
- Create a pull-request
- Merge it on master
- Create a release and wait that travis release automatically on npm 🎉
