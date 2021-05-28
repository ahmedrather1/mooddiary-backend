# MoodDiary
### Help yourself feel better

## API Documentation 

#### POST: /entries 

Request:
{
    "mood": '29'
    "date": '01/12/2000'
}

Response:
200 -- everything ok
400 -- bad request
{
    "errors": [
        {"FIELD","error"},...
    ]
}

#### GET: /entries
Request: n/a

Response:
200 -- everything ok 
{
    'entries': 
        [
        {
            'id','222',
            'mood': '29'
            'freewrite: 'blahblahblah'
        }, 
        {
            'id','223',
            'mood': '29'
            'freewrite: 'blahblahblah'

        }]

    “noOfRows” : 200,
    “Offset”:0,
    “Limit”:20
}


#### GET: /entries/{id}
Request: n/a

Response:
200 -- everything ok 

{
    'id','222',
    'mood': '29'
    'freewrite: 'blahblahblah'
}

#### PUT: /entries/{id}
Request:
{
    "mood": '29',
    "freewrite":"xyz"
}

Response:
200 -- Everything ok
400 -- bad Request
{

}
404 -- not found, if ID does not exist
//403 -- forbidden, if user wants to change entry ID or something 
