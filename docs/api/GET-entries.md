## GET: /entries

#### Request: n/a

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
