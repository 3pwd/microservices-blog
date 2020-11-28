# Microservices: Blog
Switch between branches to see the other projects.
## Quick start
### Requirements: [minikube](https://minikube.sigs.k8s.io/docs/start/) (local Kubernetes)

1. Clone this repository
2. Start local kubernetes cluster: `minikube start`
3. Apply configuration files:
    ```
    cd infra/k8s
    kubectl apply -f .
    ```
4. Point your ingress hostname towards your minikube IP in hosts file: `echo "$(echo | minikube ip)" "$(echo "blog.io")" >> /etc/hosts`
4. Access to app @ [http://blog.io](http://blog.io)

## [Services](./services)
See [config.js](./services/config.js).
|Service|Port|
|--|--|
|posts|4000|
|comments|4001|
|query|4002|
|moderation|4003|
|even-bus|4005|

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

### [Moderation](./services/moderation)
Updates status (`approved` or `denied`) of created comments depending on wether they include the [`FORBIDDEN`](https://github.com/r1oga/microservices/blob/949c5803ecadcb6ddbf502882e39f857f5c01cab/services/config.js#L16) word. 

|Path|Method|Request Body|Feature|Result|
|--|--|--|--|--|
|/events|POST|`COMMENT_CREATED` event object|Updates status of comment and emits `COMMENT_UTPDATED` event|204

## Architecture/Implementation
- Front end: React based
- Services: Express based (router + feature logic). No data persistence/DB. Data stored in servers' memory.
- Deployment: kubernetes


# Resources
[Stephen Grider](https://github.com/StephenGrider) udemy's course on [Microservices with Node JS and React](https://www.udemy.com/course/microservices-with-node-js-and-react/)
