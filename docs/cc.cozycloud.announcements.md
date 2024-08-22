[Table of contents](README.md#table-of-contents)

# Announcements remote doctype

This `cc.cozycloud.announcements` remote doctypes are used to get announcement to display in consuming app. The API is a project based on [Strapi](https://strapi.io/).

Home needs access to two routes:
- public-announcements : to get a list of announcements for a language and certain channels
- uploads : to get images contained in each announcement

The channels parameter is string that can contain several channels joined by a comma.
