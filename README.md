# Microservices: Blog
Switch between branches to see the other projects.
## [Services](./services)
### [Posts](./services/posts)
|Path|Method|Request Body|Feature|Result
|--|--|--|--|--|
|/posts|POST|{ title: string}|Create a new post|201, created post object
|/posts|GET|-|Get all posts|200, list of posts
|/events|POST|event object|Does nothing|204

### [Comments](./services/comments)
|Path|Method|Request Body|Feature|Result|
|--|--|--|--|--|
|/posts/:id/comments|POST|{ content: string }|Create a new comment|201, comment object created
|/posts/:id/comments|GET|-|Get all comments|200, list of comments
|/events|POST|event object|Does nothing|204

### [Event bus](./services/event-bus)

|Path|Method|Request Body|Feature|Result|
|--|--|--|--|--|
|/events|POST|event = {type, data}|Echo event to other services|200

### [Query](./services/query)
Aggregates posts and comments to be able to reduce to 1 the number of requests necessary to fetch all posts & requests.

|Path|Method|Request Body|Feature|Result|
|--|--|--|--|--|
|/events|POST|event object|Add post or comment to its local memory|200, post/comment object created
|/posts|GET|-|Get all posts & comments|200, list of posts & comments

### Moderation(./services/moderation)
Updates status (`approved` or `denied`) of created comments depending on their content. 

|Path|Method|Request Body|Feature|Result|
|--|--|--|--|--|
|/events|POST|`COMMENT_CREATED` event object|Updates status of comment and emits `COMMENT_UTPDATED` event|204

## Architecture/Implementation
- Front end: React based
- Services: Express based (router + feature logic). No data persistence/DB. Data stored in servers' memory.


# Resources
[Stephen Grider](https://github.com/StephenGrider) udemy's course on [Microservices with Node JS and React](https://www.udemy.com/course/microservices-with-node-js-and-react/)