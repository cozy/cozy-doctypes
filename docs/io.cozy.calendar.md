[Table of contents](README.md#table-of-contents)
    
# Cozy Calendar doctype

## `io.cozy.calendar`

The `io.cozy.calendar` doctype is loosely based on the [iCalendar RFC](https://datatracker.ietf.org/doc/html/rfc5545), in that some of the attributes have been renamed for clarity. The attributes with a `?` are optional.

- `start?` : {date} (example: `"1959-05-15"`)
- `end?` : {date} (example: `"1959-05-15"`)
- `label?` : {string}
- `description?` : {string}
- `location?` : {string}
- `organiser?` : {string}
- `status?` : {string} `CONFIRMED|CANCELLED`
- `attendee?` : {object} Array of string with event attendees

### Example
```json
{
  "_id": "62e5d66d6e11d19992b7efce794263f0",
  "start": "20170422T010000",
  "end": "20170422T010000",
  "label": "history-geography"
  "location": "B209 BIS",
  "organizer": "Mme. Dubois",
  "status": "CONFIRMED",
  "attendee": ["TG3", "1G4"],
  "description": "Apportez vos manuels !"
}
```

## `io.cozy.calendar.event`
Used to save calendar event data, to be shown in a timetable or to save past time related activities.

- `start` : {date} (example: `"1959-05-15"`)
- `end` : {date} (example: `"1959-05-15"`)
- `label` : {string}

## `io.cozy.calendar.todos`
Used to save and retrieve to-do items

- `dueDate` : {date} (example: `"1959-05-15"`)
- `summary` : {string}
- `completed` : {boolean}

## `io.cozy.calendar.presence`
Used to  track attendance and presence related events

- `start` : {date} (example: `"1959-05-15"`)
- `end` : {date} (example: `"1959-05-15"`)
- `label?` : {string}
- `justified?` : {boolean}
- `type` : {string} `delay | absence | observation`
