# Microservices: Blog
Switch between branches to see the other projects.
## Services
### Posts
|Path|Method|Request Body|Feature|Result
|--|--|--|--|--|
|/posts|POST|{ title: string}|Create a new post|201, created post object
|/posts|GET|-|Get all posts|

### Comment
|Path|Method|Body|Feature|
|--|--|--|--|
|/comments|POST|{ post: id, content: string }|Create a new comment|
|/comments|GET|-|Get all comments|


## Archictecture/Implementation
- Front end: React app
- Services: Express apps (router + feature logic). No data persistence/DB. Data stored in server's memory.


# Resources
[Stephen Grider](https://github.com/StephenGrider) udemy's course on [Microservices with Node JS and React](https://www.udemy.com/course/microservices-with-node-js-and-react/)