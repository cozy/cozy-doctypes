[Table of contents](README.md#table-of-contents)

# Cozy Banners Doctype

## `io.cozy.banners`

The `io.cozy.banners` doctype holds the platform messages to display to the user, one document per banner: storage nearly full, subscription or trial state, an action required on the account, a maintenance announcement.

Documents are written by the stack when the state that drives them changes, so the applications never evaluate anything: they read the documents, sort them by priority, drop the ones outside their validity window or already dismissed, and render what is left. The text is stored already localized, so a client displays it as it is.

The only field a client writes is `dismissedAt`. Because the documents live in the user's own database, a banner dismissed in one application is dismissed in all of them.

A banner describes the instance owner's own state, so clients do not read or render one in a context where the reader is not the owner, such as a share by link or a preview.

### Fields

- **`bannerId`**: {string} Identifier of this banner. Set by the stack. Minted per occurrence of the condition and stable while the message stays the same, so a dismissal keeps applying to it. A new occurrence of the same condition gets a new identifier, and so does an escalation the user has to see again after dismissing the earlier wording, which means the format has to distinguish two of them on the same day. It is deliberately not called `id`: cozy-client derives an `id` attribute from `_id` on every document it reads, and a stored `id` would shadow it, so the store would key the banner on the wrong value and a deletion would never evict it.
- **`category`**: {string} What the banner is about: `quota`, `billing`, `trial`, `account` or `system`. Set by the stack. A client that does not know a category ignores the category and still renders the banner.
- **`severity`**: {string} `info`, `warning` or `error`. Set by the stack. Clients map it to their own alert styles, and treat a severity they do not know as `warning`.
- **`surface`**: {string} Where the banner is meant to be displayed: `banner` for a full-width message at the top of the application, `modal` for a blocking dialog. Set by the stack. A client that does not know a surface, or that has no host for it, renders the banner as `banner` rather than dropping it. Adding a surface keeps the version, so a value is only introduced once a client renders it.
- **`title`**: {string} Optional heading, `null` or absent when there is none. Set by the stack. Meaningful on the `modal` surface, where a message needs a heading above its body; a plain banner carries none. Plain text, localized as `text` is.
- **`text`**: {string} The message, in the language given by `lang`. Set by the stack. It is plain text: clients escape it and never interpret markup in it.
- **`lang`**: {string} BCP 47 tag of the language `text`, `cta.label` and `secondaryCta.label` are written in, the instance language at materialization time. Set by the stack, which re-materializes the live banners of an instance when that language changes.
- **`cta`**: {object} Optional call to action, `null` or absent when there is none. Set by the stack.
  - **`label`**: {string} The label, plain text, localized as `text` is.
  - **`url`**: {string} Absolute `https://` URL the label points to. The stack restricts the hosts it writes here.
- **`secondaryCta`**: {object} Optional second call to action, of the same shape as `cta`, `null` or absent when there is none. Set by the stack. It is the lesser action, so a client renders it less prominently than `cta` and never on its own: a document carrying a `secondaryCta` and no `cta` is malformed, and a client ignores the secondary one rather than promoting it.
  - **`label`**: {string} The label, plain text, localized as `text` is.
  - **`url`**: {string} Absolute `https://` URL the label points to. The stack restricts the hosts it writes here.
- **`dismissible`**: {boolean} Whether the client offers a control to dismiss the banner. It is a rendering instruction, not an access control: anything that must actually block the user is enforced elsewhere. A non dismissible banner on the `modal` surface carries a `cta`, so the user is never left without a way out. When a document carries `dismissible: false` and a `dismissedAt` recorded while it was still dismissible, the dismissal wins and the banner stays hidden.
- **`dismissedAt`**: {date} When the user dismissed this banner, `null` while it is active. The only field written by a client. The stack preserves it when it re-materializes the same `bannerId`; only a new `bannerId` clears it.
- **`priority`**: {number} Sort order, highest first, when several banners apply at once. An integer. Equal priorities break on `bannerId` ascending, compared code unit by code unit rather than with a locale aware collation, so every client orders identically whatever its runtime locale.
- **`startsAt`**: {date} Start of the validity window, inclusive.
- **`endsAt`**: {date} End of the validity window, exclusive, `null` when it is open ended.
- **`source`**: {object} What produced the document, so a displayed banner can be explained after the fact. Set by the stack.
  - **`trigger`**: {string} The input that caused the last materialization.
  - **`at`**: {date} When it was materialized.

`title`, `cta`, `secondaryCta`, `dismissedAt` and `endsAt` are the only fields that may be missing, and for them a `null` value and an absent key mean the same thing. A client checks for both, including before reading `cta.label` or `cta.url`. Every other field is always present.

### Dates

`startsAt`, `endsAt`, `dismissedAt` and `source.at` are ISO 8601 timestamps with an explicit UTC offset and at least second precision, as in `2026-07-22T09:14:02Z`. The date only form that the [generic model](README.md#date-format) also allows is not used here, since these values are compared against a clock rather than displayed. The validity window is evaluated against the client's clock.

A client null checks a date before building one from it, because `new Date(null)` is the Unix epoch rather than "no date", which would mark every open ended banner expired and every active banner dismissed.

### Lifecycle

- The stack writes a document when the condition starts to apply, rewrites it under the same `bannerId` while the occurrence lasts, and deletes it when the condition clears. Clients never delete a banner, and the collection stays small enough to be read in full.
- A client writes `dismissedAt` and nothing else. On a `409` conflict it refetches the document and writes again: the field is idempotent, so a retry is always safe.
- Reads happen on load, on foreground and on a slow poll. A banner written between two reads is displayed on the next one.
- A read that fails or is slow never blocks the UI, and the slot collapses instead of reserving whitespace.
- Where a shell and the application it embeds both implement this contract, only the shell renders, so a document is never painted twice and only one writer touches `dismissedAt`.

### Versioning

The shape of the document is versioned with `cozyMetadata.doctypeVersion`, like every other doctype in the [generic model](README.md#document-metadata). It is a string, as it is for every doctype the stack writes.

Adding a field, a category, a severity or a surface keeps the version: a client renders a value it does not know rather than dropping the banner, so a new one needs no client release. Renaming or removing a field bumps it.

### Contract vectors

[`fixtures/io.cozy.banners.json`](../fixtures/io.cozy.banners.json) holds the cases every client is expected to reproduce: ordering and its tie-break, the validity window bounds, dismissal, the fallbacks for an unknown severity or surface, the call to action scheme check, a secondary call to action, and the version filter. Each case gives `input` documents and the `expected` list a client displays, so two implementations can be checked against the same data rather than against each other.

### Example

```json
{
  "_id": "e21dce8058b9013d800a18c04daba326",
  "_rev": "2-a1b2c3",
  "cozyMetadata": {
    "createdAt": "2026-07-22T09:14:02Z",
    "createdByApp": "stack",
    "doctypeVersion": "1",
    "metadataVersion": 1,
    "updatedAt": "2026-07-22T09:14:02Z"
  },
  "bannerId": "quota.exceeded:2026-07-22T09:14:02Z",
  "title": null,
  "category": "quota",
  "severity": "error",
  "surface": "banner",
  "text": "You have reached your storage limit.",
  "lang": "en",
  "cta": {
    "label": "Upgrade",
    "url": "https://jdoe-settings.example.org/#/subscription"
  },
  "dismissible": false,
  "dismissedAt": null,
  "priority": 100,
  "startsAt": "2026-07-22T00:00:00Z",
  "endsAt": null,
  "source": {
    "trigger": "usage.threshold.crossed",
    "at": "2026-07-22T09:14:02Z"
  }
}
```

### Metadata

See the [`cozyMetadata` documentation](README.md#document-metadata) for the attributes common to every doctype. The ones a banner always carries are:

- **`_id`**: {string} Unique identifier of the document, minted by CouchDB. `bannerId` carries the identity of the banner itself.
- **`_rev`**: {string} Revision identifier of the document.
- **`cozyMetadata`**: {object} Metadata related to the document's lifecycle in Cozy.
  - **`createdAt`**: {date} When the document was created.
  - **`createdByApp`**: {string} What wrote the document, always the stack.
  - **`doctypeVersion`**: {string} Version of the document shape, see [Versioning](#versioning).
  - **`metadataVersion`**: {number} Version number of the metadata format.
  - **`updatedAt`**: {date} When the document was last updated, by the stack or by a client recording a dismissal.
