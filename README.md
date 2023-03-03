# Express-API
GET, PUT, POST HTTP request methods

```js
// PORT : 3000

//Example request for GET posts between 2 dates : 
http://localhost:3000/posts?startDate=2019-01-01T00:00:00.000Z&endDate=2019-01-04T00:00:00.000Z

//Example PUT request to create a post :
http://localhost:3000/posts
//JSON body : 
{
  "title": "New Post Title",
  "body": "New Post Body",
  "user_id": 2
}

```
