# Microservices: Blog
Switch between branches to see the other projects.
## Services
### Posts
|Path|Method|Request Body|Feature|Result
|--|--|--|--|--|
|/posts|POST|{ title: string}|Create a new post|201, created post object
|/posts|GET|-|Get all posts|200, list of posts

### Comments
|Path|Method|Request Body|Feature|Result|
|--|--|--|--|--|
|/posts/:id/comments|POST|{ content: string }|Create a new comment|201, comment object created
|/posts/:id/comments|GET|-|Get all comments|200, list of comments

### Event bus

|Path|Method|Request Body|Feature|Result|
|--|--|--|--|--|
|/events|POST|event = {type, data}|Echo event to other services|200

### Query
Aggregates posts and comments to be able to reduce to 1 the number of requests necessary to fetch all posts & requests.

|Path|Method|Request Body|Feature|Result|
|--|--|--|--|--|
|/events|POST|{ content: string }|Create a new comment|201, comment object created
|/posts|GET|-|Get all posts & comments|200, list of posts & comments

## Archictecture/Implementation
- Front end: React based
- Services: Express based (router + feature logic). No data persistence/DB. Data stored in servers' memory.


# Resources
[Stephen Grider](https://github.com/StephenGrider) udemy's course on [Microservices with Node JS and React](https://www.udemy.com/course/microservices-with-node-js-and-react/)