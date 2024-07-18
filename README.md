# Real Time Chat Application for VideoVerse

This is a assignment project built for VideoVerse. I have made use of Firebase Realtime database to process messages and firebase authentication for user authentication using a phone number.


## Setup Guide

To setup and run the app execure the following command

1. Clone the project locally using `git clone https://github.com/skushagra/RealChatApp.git`
2. Create a app on firebase and copy in `firebaseConfig` into `client/src/api/FirebaseConfig.ts` and `server/src/FirebaseConfig/FirebaseConfig.ts` only copy the `firebaseConfig` and not the complete file to make sure the app works correctly.
3. Create a realtime database(make sure it has correct permissions) and auth using email and password service, and create two dummy emails and passwords.
4. The `firebaseConfig` should look something like , the database url is the url of the realtime database which needs to be added mannually.
```JavaScript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "...",
  databaseURL: "...",
};
```
5. Execute the given commands from the project root directory
```BASH
cd client
npm install
cd ..
cd server
npm install
```
6. Run the client and server independently usign command `npm start` in `client` and `server` folders simultaneously.

# Live App URL

### The backend is hosted on render and can take some time to get started, it can delay requests by a few minutes.

```
https://shark-app-9567j.ondigitalocean.app/

```
Use the following login credentials for accessing the apps

User 1

```
email: kushagra.rigel@gmail.com
password: abc123
```

User 2

```
email: rudra@abc.com
password: abc123
```

Note
```
For a live backend
GET https://chatappvideoverse.onrender.com/auth/login will return *Hello World*
```
