[Table of contents](README.md#table-of-contents)

# Cozy Notifications doctype

## `io.cozy.notifications`

Applications can notify the cozy owner. They will appear in the cozy-bar, the
mobile app, and a summary can be sent by email.

- `source`: {id} the id of the application/konnector that has made the notification
- `reference`: {string} a reference for the application (it can be used to hide other notifications like this one, or to update a count in a notification)
- `title`: {string} a title to explain the notification
- `content`: {string} more context about the notification
- `icon`: {image} an icon to display with the notification
- `actions`: [{text, intent}] an array of objects with a text and an intent.
  Each action can be seen as a link, the text being what is shown and the
  intent what happens when clicking on the link.

See also [the notification documentation](https://github.com/cozy/cozy-stack/blob/master/docs/notifications.md)
for more informations.
