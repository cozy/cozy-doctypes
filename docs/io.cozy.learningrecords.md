# Table of contents

- [Table of contents](README.md#table-of-contents)
- [Cozy Learning Records doctype](#cozy-learning-records-doctype)
  - [Statement Properties](#statement-properties)
    - [Actor](#actor)
    - [Verb](#verb)
    - [Object](#object)
    - [Result](#result)
    - [Context](#context)
    - [Authority](#authority)
    - [Attachments](#attachments)
  - [Special Data Types and Rules](#special-data-types-and-rules)
    - [Extensions](#extensions)
    - [Language Maps](#language-maps)
    - [IRIs](#iris)


# Cozy Learning Records doctype

The `io.cozy.learningrecords` doctype stores Statements which are information about a tracked learning experience.

## Statement Properties

The details of each property of a Statement are described in the table below.

| Property                    | Type                                | Required    | Description                                                                                                                                                                                                                              |
| --------------------------- | ----------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                          | UUID                                | Recommended | UUID assigned by LRS if not set by the Learning Record Provider.                                                                                                                                                                         |
| [actor](#actor)             | Object                              | Required    | Whom the Statement is about, as an  [Agent](#when-the-actor-objecttype-is-agent) or [Group](#when-the-actor-objecttype-is-group) Object.                                                                                                 |
| [verb](#verb)               | Object                              | Required    | Action taken by the Actor.                                                                                                                                                                                                               |
| [object](#object)           | Object                              | Required    | [Activity](#when-the-objecttype-is-activity), [Agent](#when-the-object-is-an-agent-or-a-group), or another [Statement](#when-the-object-is-a-statement) that is the Object of the Statement.                                             |
| [result](#result)           | Object                              | Optional    | Result Object, further details representing a measured outcome.                                                                                                                                                                          |
| [context](#context)         | Object                              | Optional    | Context that gives the Statement more meaning. Examples: a team the Actor is working with, altitude at which a scenario was attempted in a flight simulator.                                                                             |
| timestamp                   | ISO 8601 Timestamp                  | Optional    | Timestamp of when the events described within this Statement occurred. Set by the LRS if not provided.                                                                                                                                   |
| stored                      | ISO 8601 Timestamp                  | Set by LRS  | Timestamp of when this Statement was recorded. Set by LRS.                                                                                                                                                                               |
| [authority](#authority)     | Object                              | Optional    | Agent or Group who is asserting this Statement is true. Verified by the LRS based on authentication. Set by LRS if not provided or if a strong trust relationship between the Learning Record Provider and LRS has not been established. |
| [attachments](#attachments) | Ordered array of Attachment Objects | Optional    | Headers for Attachments to the Statement                                                                                                                                                                                                 |

**Example**

```json
{
    "id": "12345678-1234-5678-1234-567812345678",
    "actor":{
        "mbox":"mailto:xapi@adlnet.gov"
    },
    "verb":{
        "id":"http://adlnet.gov/expapi/verbs/created",
        "display":{
            "en-US":"created"
        }
    },
    "object":{
        "id":"http://example.adlnet.gov/xapi/example/activity"
    }
}
```

### Actor

The Actor defines who performed the action. The Actor of a Statement can be an Agent or a Group.

#### When the Actor objectType is Agent

An Agent (an individual) is a persona or system.

The table below lists the properties of Agent Objects.

| Property                                                        | Type   | Required | Description                                                                               |
| --------------------------------------------------------------- | ------ | -------- | ----------------------------------------------------------------------------------------- |
| objectType                                                      | string | Optional | `Agent`. This property is optional except when the Agent is used as a Statement's object. |
| name                                                            | String | Optional | Full name of the Agent.                                                                   |
| [Inverse Functional Identifier](#inverse-functional-identifier) |        | Required | An Inverse Functional Identifier unique to the Agent.                                     |

#### When the Actor ObjectType is Group

A Group represents a collection of Agents and can be used in most of the same situations an Agent can be used. There are two types of Groups: Anonymous Groups and Identified Groups.

##### Anonymous Group

The table below lists all properties of an Anonymous Group.

| Property   | Type                                                          | Required | Description                                           |                    |
| ---------- | ------------------------------------------------------------- | -------- | ----------------------------------------------------- | ------------------ |
| objectType |                                                               | Stri     | Required                                              | `Group`.           |
| name       |                                                               | Str      | Optional                                              | Name of the Group. |
| member     | Array of [Agent Objects](#when-the-actor-objecttype-is-agent) | Required | The members of this Group. This is an unordered list. |                    |

##### Identified Group

The table below lists all properties of an Identified Group.

| Property                                                        | Type                                                          | Description                                           | Required |
| --------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------- | -------- |
| objectType                                                      | String                                                        | `Group`.                                              | Required |
| name                                                            | String                                                        | Name of the Group.                                    | Optional |
| member                                                          | Array of [Agent Objects](#when-the-actor-objecttype-is-agent) | The members of this Group. This is an unordered list. | Optional |
| [Inverse Functional Identifier](#inverse-functional-identifier) |                                                               | An Inverse Functional Identifier unique to the Group. | Required |

#### Inverse Functional Identifier

An Inverse Functional Identifier (IFI) is a value of an Agent or Identified Group that is guaranteed to only ever refer to that Agent or Identified Group.

The table below lists all possible Inverse Functional Identifier properties.

| Property     | Type                              | Description                                                                                                                                                                                                  |
| ------------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| mbox         | mailto IRI                        | The required format is "mailto:email address".  <br>Only email addresses that have only ever been and will ever be assigned to this Agent, but no others, SHOULD be used for this property and mbox_sha1sum. |
| mbox_sha1sum | String                            | The hex-encoded SHA1 hash of a mailto IRI (i.e. the value of an mbox property). An LRS MAY include Agents with a matching hash when a request is based on an mbox.                                           |
| openid       | URI                               | An openID that uniquely identifies the Agent.                                                                                                                                                                |
| account      | [Account object](#account-object) | A user account on an existing system e.g. an LMS or intranet.                                                                                                                                                |

#### Account object

A user account on an existing system, such as a private system (LMS or intranet) or a public system (social networking site).

The table below lists all properties of Account Objects.

| Property | Type   | Required | Description                                                                                               |
| -------- | ------ | -------- | --------------------------------------------------------------------------------------------------------- |
| homePage | IRL    | Required | The canonical home page for the system the account is on. This is based on FOAF's accountServiceHomePage. |
| name     | String | Required | The unique id or name used to log in to this account. This is based on FOAF's accountName.                |

### Verb 

The Verb defines the action between an Actor and an Activity.

The table below lists all properties of the Verb Object.

| Property | Type                           | Description                                                                                                                                                                                                                              | Required    |
| -------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| id       | [IRI](#iris)                   | Corresponds to a Verb definition. Each Verb definition corresponds to the meaning of a Verb, not the word.                                                                                                                               | Required    |
| display  | [Language Map](#language-maps) | The human readable representation of the Verb in one or more languages. This does not have any impact on the meaning of the Statement, but serves to give a human-readable display of the meaning already determined by the chosen Verb. | Recommended |

### Object

The Object defines the thing that was acted on. The Object of a Statement can be an Activity, Agent/Group, SubStatement, or Statement Reference.

Some examples:
- The Object is an Activity: "Jeff wrote an essay about hiking."
- The Object is an Agent: "Nellie interviewed Jeff."
- The Object is a SubStatement or Statement Reference (different implementations, but similar when human-read): "Nellie commented on 'Jeff wrote an essay about hiking.'"

#### When the ObjectType is Activity

The following table lists the properties of Activity Object.

| Property   | Type         | Required | Description                                |
| ---------- | ------------ | -------- | ------------------------------------------ |
| objectType | String       | Optional | MUST be `Activity` when present            |
| id         | [IRI](#iris) | Required | An identifier for a single unique Activity |
| definition | Object       | Optional | Metadata.                                  |

##### Activity Definition

| Property    | Type                           | Required    | Description                                                                                                                  |
| ----------- | ------------------------------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| name        | [Language Map](#language-maps) | Recommended | The human readable/visual name of the Activity                                                                               |
| description | [Language Map](#language-maps) | Recommended | A description of the Activity                                                                                                |
| type        | [IRI](#iris)                   | Recommended | The type of Activity.                                                                                                        |
| moreInfo    | IRL                            | Optional    | Resolves to a document with human-readable information about the Activity, which could include a way to launch the activity. |
| extensions  | Object                         | Optional    | A map of other properties as needed. [See Extensions](#extensions)                                                           |

Activity can be extended through the use of Interaction Activity definition. These definitions are intended to provide a simple and familiar utility for recording interaction data.  [See Interaction Activities](https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#interaction-activities)

#### When the Object is an Agent or a Group

See [Actor](#actor).

####  When the Object is a Statement

##### Statement reference

A Statement Reference is a pointer to another pre-existing Statement.

The table below lists all properties of a Statement Reference Object:

| Property   | Type   | Required | Description                           |
| ---------- | ------ | -------- | ------------------------------------- |
| objectType | String | Required | In this case, MUST be `StatementRef`. |
| id         | UUID   | Required | The UUID of a Statement.              |

##### SubStatements

A SubStatement is like a StatementRef in that it is included as part of a containing Statement, but unlike a StatementRef, it does not represent an event that has occurred.

- A SubStatement MUST specify an "objectType" property with the value `SubStatement`.
- A SubStatement MUST be validated as a Statement in addition to other SubStatement requirements.
- A SubStatement MUST NOT have the "id", "stored", "version" or "authority" properties.
- A SubStatement MUST NOT contain a SubStatement of its own, i.e., cannot be nested.

### Result

An optional property that represents a measured outcome related to the Statement in which it is included.

The following table contains the properties of the Result Object.

| Property   | Type               | Required | Description                                                                                         |
| ---------- | ------------------ | -------- | --------------------------------------------------------------------------------------------------- |
| score      | Object             | Optional | The score of the Agent in relation to the success or quality of the experience. [See Score](#score) |
| success    | Boolean            | Optional | Indicates whether or not the attempt on the Activity was successful.                                |
| completion | Boolean            | Optional | Indicates whether or not the Activity was completed.                                                |
| response   | String             | Optional | A response appropriately formatted for the given Activity.                                          |
| duration   | ISO 8601 Durations | Optional | Period of time over which the Statement occurred.                                                   |
| extensions | Object             | Optional | A map of other properties as needed. [See Extensions](#extensions)                                  |

#### Score

An optional property that represents the outcome of a graded Activity achieved by an Agent.

The table below defines the Score Object.

| Property | Type                                                                               | Required    | Description                                                                                                                         |
| -------- | ---------------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| scaled   | Decimal number between -1 and 1, inclusive                                         | Recommended | The score related to the experience as modified by scaling and/or normalization.                                                    |
| raw      | Decimal number between min and max (if present, otherwise unrestricted), inclusive | Optional    | The score achieved by the Actor in the experience described by the Statement. This is not modified by any scaling or normalization. |
| min      | Decimal number less than max (if present)                                          | Optional    | The lowest possible score for the experience described by the Statement.                                                            |
| max      | Decimal number greater than min (if present)                                       | Optional    | The highest possible score for the experience described by the Statement.                                                           |

### Context

An optional property that provides a place to add contextual information to a Statement.

The following table contains the properties of the Context Object.

| Property          | Type                                                                  | Required | Description                                                                                                                                                                                                        |
| ----------------- | --------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| registration      | UUID                                                                  | Optional | The registration that the Statement is associated with.                                                                                                                                                            |
| instructor        | Agent (MAY be a Group)                                                | Optional | Instructor that the Statement relates to, if not included as the Actor of the Statement.                                                                                                                           |
| team              | Group                                                                 | Optional | Team that this Statement relates to, if not included as the Actor of the Statement.                                                                                                                                |
| contextActivities | contextActivities Object                                              | Optional | A map of the types of learning activity context that this Statement is related to. Valid context types are: `parent`, `"grouping"`, `"category"` and `"other"`.                                                    |
| revision          | String                                                                | Optional | Revision of the learning activity associated with this Statement. Format is free.                                                                                                                                  |
| platform          | String                                                                | Optional | Platform used in the experience of this learning activity.                                                                                                                                                         |
| language          | String (as defined in [RFC 5646](http://tools.ietf.org/html/rfc5646)) | Optional | Code representing the language in which the experience being recorded in this Statement (mainly) occurred in, if applicable and known.                                                                             |
| statement         | [Statement reference](#statement-reference)                           | Optional | Another Statement to be considered as context for this Statement.                                                                                                                                                  |
| extensions        | Object                                                                | Optional | A map of any other domain-specific context relevant to this Statement. For example, in a flight simulator altitude, airspeed, wind, attitude, GPS coordinates might all be relevant. [See Extensions](#extensions) |

### Authority

The authority property provides information about whom or what has asserted that this Statement is true.

See [Actor](#actor).

### Attachments

The table below lists all properties of the Attachment Object.

| Property    | Type                                                                    | Required | Description                                                                                                                                                                                                                                |
| ----------- | ----------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| usageType   | [IRI](#iris)                                                            | Required | Identifies the usage of this Attachment. For example: one expected use case for Attachments is to include a "completion certificate". An IRI corresponding to this usage MUST be coined, and used with completion certificate attachments. |
| display     | [Language Map](#language-maps)                                          | Required | Display name (title) of this Attachment.                                                                                                                                                                                                   |
| description | [Language Map](#language-maps)                                          | Optional | A description of the Attachment                                                                                                                                                                                                            |
| contentType | [Internet Media Type](https://www.ietf.org/rfc/rfc2046.txt?number=2046) | Required | The content type of the Attachment.                                                                                                                                                                                                        |
| length      | Integer                                                                 | Required | The length of the Attachment data in octets.                                                                                                                                                                                               |
| sha2        | String                                                                  | Required | The SHA-2 hash of the Attachment data.  <br>This property is always required, even if fileURL is also specified.                                                                                                                           |
| fileUrl     | IRL                                                                     | Optional | An IRL at which the Attachment data can be retrieved, or from which it used to be retrievable.                                                                                                                                             |

## Special Data Types and Rules

### Extensions

Extensions are available as part of Activity Definitions, as part of a Statement's "context" property, or as part of a Statement's "result" property. In each case, extensions are intended to provide a natural way to extend those properties for some specialized use. The contents of these extensions might be something valuable to just one application, or it might be a convention used by an entire Community of Practice.

### Language Maps

A language map is a dictionary where the key is a [RFC 5646 Language Tag](http://tools.ietf.org/html/rfc5646), and the value is a string in the language specified in the tag. This map SHOULD be populated as fully as possible based on the knowledge of the string in question in different languages.

### IRIs

Internationalized Resource Identifiers, or IRIs, are unique identifiers which could also be resolvable. Because resolving is not a requirement, IRIs/URIs are used instead of IRLs/URLs.