## PUT: /entries/{id}

#### Request:

```json
{
  "mood": "29",
  "freewrite": "xyz"
}
```

#### Response:

200 -- Everything ok
400 -- bad Request

```json
{}
```

404 -- not found, if ID does not exist
//403 -- forbidden, if user wants to change entry ID or something
