## GET: /entries

#### Request:

query parameters:

createdFrom=2021-07-27T00:00:00Z
createdTo=2021-07-27T23:59:59Z
limit=1

Any number, including none, of these query parameters can be used.

If createdFrom is not provided, the default createdFrom value is Jan 1, 2020
If createdTo is not provided, the default createdTo value is one day after the call is made
If limit is not provided, the default limit value is the DEFAULT_GETENTRIES_LIMIT in the local.settings file.

#### Response:

200 -- everything ok

```json
{
    "entries":
        [
        {
            "id": "222",
            "date": "2021-05-19T00:00:00Z",
            "mood": "29"
        },
        {
            "id":"223",
            "date": "2021-05-21T23:59:59Z",
            "mood": "31"
        }],

    "fromDate" : "2021-05-18T00:00:00Z",
    "toDate": "2021-05-23T23:59:59Z",
    “limit”:"3"
}
```
