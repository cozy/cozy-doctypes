[Table of contents](README.md#table-of-contents)

# Cozy Time Series doctype

## `io.cozy.timeseries.*`

The `io.cozy.timeseries.*` doctype is used to represent time series. The type of the time series is specified in the last part of the doctype, e.g. `io.cozy.timeseries.geojson`.

Any type of time series must follow the same common structure:

- `startDate`: {date} the starting date of the time series.
- `endDate`: {date} the ending date of the time series.
- `source`: {string} the data source, e.g. "strava.com".
- `theme`: {string} a theme is used to group several types of time series into a common theme, e.g. "activity".
- `series`: {Array} the actual time series. The array contains objects and the format of each object depends on the data type of the time series.

## `io.cozy.timeseries.geojson`

These time series follow the [GeoJSON](https://geojson.org/) format. 

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