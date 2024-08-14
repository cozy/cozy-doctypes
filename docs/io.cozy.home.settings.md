[Table of contents](README.md#table-of-contents)

# Cozy Home Settings Doctype

## `io.cozy.home.settings`

The `io.cozy.home.settings` doctype contains one document that manages settings for the Cozy Home app. This document includes configuration options for UI elements, behavior customization, and user preferences.

### Fields:

- **`default_redirection_snackbar_disabled`**: {boolean} If the default redirection snackbar (a notification suggesting redirection to another app) has been disabled.
  
- **`default_redirection_view_count`**: {number} The view count of the home app if the default redirection app is different from the home app. This tracks how often the user returns to the home app.

- **`shortcutsLayout`**: {array of objects} Defines the layout and grouping of shortcuts for both desktop and mobile views in the Cozy Home app.
  - **`createdByApp`**: {string} Identifier of the app that created the shortcut.
  - **`desktop`**: {object} Layout configuration for desktop view.
    - **`detailedLines`**: {boolean} If `true`, the desktop view will display shortcuts with detailed lines.
    - **`grouped`**: {boolean} If `true`, shortcuts are grouped together on the desktop view.
  - **`id`**: {string} Unique identifier for the shortcut.
  - **`mobile`**: {object} Layout configuration for mobile view.
    - **`detailedLines`**: {boolean} If `true`, the mobile view will display shortcuts with detailed lines.
    - **`grouped`**: {boolean} If `true`, shortcuts are grouped together on the mobile view.
  - **`order`**: {number} If provided, the order in which the shortcut should appear.
  - **`originalName`**: {string} Original name of the shortcut.

### Metadata:

- **`_id`**: {string} Unique identifier for the settings document.
  
- **`_rev`**: {string} Revision identifier for the settings document, tracking changes over time.

- **`cozyMetadata`**: {object} Metadata related to the document's lifecycle in Cozy.
  - **`createdAt`**: {string} Timestamp when the document was created.
  - **`metadataVersion`**: {number} Version number of the metadata format.
  - **`updatedAt`**: {string} Timestamp of the last update.
  - **`updatedByApps`**: {array of objects} Array detailing which apps have updated the document and when.
    - **`date`**: {string} Timestamp of the update by an app.
