# Getting Started with Magnum Opus Live Chat

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) in client.
Also [Node.js](https://nodejs.org/en/) with [Express.js](https://expressjs.com/) in server.

## Available Scripts

In the project directory, you can run:
```
$ cd client && yarn install
```
```
$ cd server && yarn install
```

In the project directory, you can run:

### `docker-compose up -d --build`

This will build your docker images an runs the app containers in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `docker-compose down`

This will stop the running containers in docker and disconnenct the application network in docker.



## Learn More

You can register and authenticate users with [Auth0](https://auth0.com/).

Live event are controlled with [Socket.io](https://socket.io/).

### Issues

This app works well with chrome browser and chrome chromium browsers.\
Even wiht these browsers you will still face issue with icognito mode.\
This is due to [Auth0](https://auth0.com/) silent auth issue.\
You can find the refrence here: [https://github.com/auth0/auth0-spa-js/issues/345](https://github.com/auth0/auth0-spa-js/issues/345)


