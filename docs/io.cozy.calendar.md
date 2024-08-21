[Table of contents](README.md#table-of-contents)
    
# Cozy Calendar doctype

## `io.cozy.calendar`

The `io.cozy.calendar` doctype is loosely based on the [iCalendar RFC](https://datatracker.ietf.org/doc/html/rfc5545), in that some of the attributes have been renamed for clarity. The attributes with a `?` are optional.

- `start?` : {date} [Start of event](https://www.kanzaki.com/docs/ical/dtstart.html)
- `end?` : {date} [End of event](https://www.kanzaki.com/docs/ical/dtend.html)
- `timezone?` : {sting} [TZID identifier](https://www.kanzaki.com/docs/ical/tzid.html) for a specific time zone
- `frequency?` : {number} [Frequency of recurrence](https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html)
- `until?` : {date} Date of [end of reccurence](https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html) specified with frequency
- `label?` : {string} [Event description](https://www.kanzaki.com/docs/ical/description.html)
- `description?` : {string} [Event comment](https://www.kanzaki.com/docs/ical/comment.html)
- `location?` : {string} [Event location](https://www.kanzaki.com/docs/ical/location.html)
- `organizer?` : {string} [Event organizer](https://www.kanzaki.com/docs/ical/organizer.html)
- `status?` : {string} `CONFIRMED|CANCELLED` [Event status](https://www.kanzaki.com/docs/ical/status.html)
- `attendee?` : {array} [Array of string with event attendees](https://www.kanzaki.com/docs/ical/attendee.html)

### Example
```json
{
  "_id": "62e5d66d6e11d19992b7efce794263f0",
  "start": "2018-01-02T20:38:04Z",
  "end": "2018-01-02T20:38:04Z",
  "timezone": "Europe/Paris",
  "frequency": "weekly",
  "until": "2018-01-02T20:38:04Z",
  "label": "history-geography"
  "location": "B209 BIS",
  "organizer": "Mme. Dubois",
  "status": "CONFIRMED",
  "attendee": ["TG3", "1G4"],
  "description": "Apportez vos manuels !"
}
```

## `io.cozy.calendar.events`
Used to save calendar event data, to be shown in a timetable or to save past time related activities.

- `start` : {date} [Start of event](https://www.kanzaki.com/docs/ical/dtstart.html)
- `end` : {date} [End of event](https://www.kanzaki.com/docs/ical/dtend.html)
- `label` : {string} [Event description](https://www.kanzaki.com/docs/ical/description.html)

## `io.cozy.calendar.todos`
Used to save and retrieve to-do items

- `dueDate` : {date} [Todo due date](https://www.kanzaki.com/docs/ical/due.html)
- `summary` : {string} [Todo summary](https://www.kanzaki.com/docs/ical/summary.html)
- `completed` : {boolean} [Completion status](https://www.kanzaki.com/docs/ical/completed.html)

## `io.cozy.calendar.presence`
Used to  track attendance and presence related events

- `start` : {date} [Start of event](https://www.kanzaki.com/docs/ical/dtstart.html)
- `end` : {date} [End of event](https://www.kanzaki.com/docs/ical/dtend.html)
- `label` : {string} [Event description](https://www.kanzaki.com/docs/ical/description.html)
- `justified?` : {boolean}
- `type` : {string} `delay | absence | observation`
