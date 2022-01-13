# docker-server-example

A docker example that implements a simple node socket server.

This example image is available on dockerhub: https://hub.docker.com/repository/docker/wwlib/docker-examples

## the server & test client

### server
The server (server.ts) implements a WebSocket server that echoes any text that it receives.

```
yarn
yarn launch
```

### test client
The test client (client.ts) implements a simple cli for sending messages to the socket server.
Ctrl-C to exit.
```
yarn launch:client
```

## docker

The Dockerfile defines an image based on `node:14` from dockerhub (https://hub.docker.com/_/node)

### build the image
To build the example Dockerfile locally:
```
docker build -f Dockerfile -t wwlib/docker-examples:server "."
```

### run the image as a container
```
docker run -p 5005:5005 -it wwlib/docker-examples:server
```

This will start a node socket server on port 5005 that can be accessed using this socket address:
- ws://localhost:5005/test

The server will echo any text that is sent to it.


Test the server like:
```
$ yarn launch:client
yarn run v1.22.4
$ env-cmd ts-node client.ts
URL: ws://localhost:5005/test
client connected
> hello
ECHO: hello
> 
```

User Ctrl-C to close the test client and to close the running docker container.
