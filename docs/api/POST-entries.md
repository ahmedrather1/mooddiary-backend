## POST: /entries

#### Request:

```json
{
  "mood": "29",
  "date": "01/12/2000"
}
```

#### Response:

200 -- everything ok:

```json
{
  "ID": "824e8dda-717b-4eb9-8950-8a5b7ca61055",
  "date": "2000-01-12T05:00:00.000Z",
  "mood": "29"
}
```

400 -- bad request:

```json
{
  "errors": [{ "FIELD": "error" }]
}
```
