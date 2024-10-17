[Table of contents](README.md#table-of-contents)

# Cozy Time Series doctype

## `io.cozy.timeseries.*`

The `io.cozy.timeseries.*` doctype is used to represent time series. The type of the time series is specified in the last part of the doctype, e.g. `io.cozy.timeseries.geojson`.

Any type of time series must follow the same common structure:

- `startDate`: {date} the starting date of the time series.
- `endDate`: {date} the ending date of the time series.
- `title`: {string} the title of the time serie.
- `source`: {string} the data source, e.g. "strava.com".
- `theme`: {string} a theme is used to group several types of time series into a common theme, e.g. "activity".
- `series`: {Array} the actual time series. The array contains objects and the format of each object depends on the data type of the time series.

## `io.cozy.timeseries.geojson`

These time series follow the [GeoJSON](https://geojson.org/) format. See [here](https://github.com/cozy/coachCO2#timeseries-models-and-nomenclature) for a complete example of this doctype.

###  Example

```json
{
  "startDate": "2021-02-17T17:37:17",
  "endDate": "2021-02-17T17:54:50",
  "source": "my-trips.com",
  "theme": "timeline",
  "series": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [48.85, 2.29]
      },
      "properties": {
        "name": "Eiffel Tower"
      }
    }
  ]
}

```

## `io.cozy.timeseries.grades`
This time series is used to represent a collection of grades in a given subject over a school period.

It uses additional attributes :
- `subject`: {string} The school subject these grades are referring to 
- `title`: {string} The period (trimester or semester) name
- `aggregation`: {Array} Grades averages over this period
	- `avgGrades`: {number} Overall average of student grades over this period
	- `avgClass`: {number} Overall average of class grades over this period
	- `maxClass`: {number} Highest student overall average in the class
	- `minClass`: {number} Lowest student overall average in the class
- `series`: {Array} Contains the grades
	- `id`: {string} Unique identifier for the grade
	- `label`: {string} Grade label
	- `date`: {date} Date of the grade
	- `value`: {Array}
		- `student`: {number} Student grade
		- `outOf`: {number} Grade notation highest limit
		- `coef`: {number} Coefficient of this grade
		- `classAverage`: {number} Class average for this grade
		- `classMax`: {number} Highest grading value in the class
		- `classMin`: {number} Lowest grading value in the class
- `status`: {Array}
	- `isBonus`: {boolean} Is the grade counted only if it enhances the student’s average ?
	- `isOptional`: {boolean} Is the grade an optional subject ?

### Example
```json

{
  "_id": "62e5d66d6e11d19992b7efce794263f0",
  "subject": "hisgeo",
  "title": "Semestre 2",
  "startDate": "2017-04-22T01:00:00-05:00",
  "endDate": "2017-07-01T01:00:00-05:00",
  "aggregation": {
    "avgGrades": ...,
    "avgClass": ...,
    "maxClass": ...,
    "minClass": ...,
  },
  "series": [
    {
      "id": "1d16d6e192b7efce762e5d64263f0999",
      "label": ...,
      "date": "2017-04-22T01:00:00-05:00",
      "value": {
        "student": 16.00,
        "outOf": 20.00,
        "coef": 1.00,
        "classAverage": 14.00,
        "classMax": 19.00,
        "classMin": 5.00,
      },
      "status": {
        "isBonus": false,
        "isOptional": false,
      }
    }
  ],
}
```
