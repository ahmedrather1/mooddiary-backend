# MoodDiary
### Help yourself feel better

## Prerequisites and setup
This project requires Azure TableStorage. To use TableStorage, you must install azure-storage using npm. In addition, you must create a table called DiaryEntries before doing any operations. To access this table, you must configure your local.settings.json to match the format of the included local.settings.EXAMPLE.json file. This will ensure a proper connection. 

# API Documentation 

## POST: /entries 

#### Request:
```json
{
    "mood": "29"
    "date": "01/12/2000"
}
```


#### Response:
200 -- everything ok

400 -- bad request
```json
{
    "errors": [
        {"FIELD","error"},
    ]
}
```


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
            "date": "2021-05-19T00:00:00Z"
            "mood": "29"
        }, 
        {
            "id":"223",
            "date": "2021-05-21T23:59:59Z"
            "mood": "31"
        }]

    "fromDate" : "2021-05-18T00:00:00Z",
    "toDate":"2021-05-23T23:59:59Z",
    “limit”:"3"
}
```

## GET: /entries/{id}
#### Request: n/a

#### Response:
200 -- everything ok 
```json
{
    "id":"222",
    "mood": "29"
    "freewrite: 'blahblahblah"
}
```


## PUT: /entries/{id}
#### Request:
```json
{
    "mood": "29",
    "freewrite":"xyz"
}
```


#### Response:

200 -- Everything ok
400 -- bad Request
```json
{

}
```
404 -- not found, if ID does not exist
//403 -- forbidden, if user wants to change entry ID or something 

