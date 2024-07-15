"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAM33_ElrlXOR3h3TfgKOUl8apoc29Aa8c",
    authDomain: "real-time-chat-app-52988.firebaseapp.com",
    projectId: "real-time-chat-app-52988",
    storageBucket: "real-time-chat-app-52988.appspot.com",
    messagingSenderId: "1067159801973",
    appId: "1:1067159801973:web:7e9fb49c272fc3460e283c",
    measurementId: "G-WEREWZKTL7"
};
// Initialize Firebase
const intializeFirebase = () => {
    const app = (0, app_1.initializeApp)(firebaseConfig);
    return app;
};
exports.default = intializeFirebase;
