importScripts(
  "https://www.gstatic.com/firebasejs/9.7.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.7.0/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyCo8GYzQnRxYqgw0ewXohAdTjfw9uxw7uY",
  authDomain: "ionstarter-3253a.firebaseapp.com",
  projectId: "ionstarter-3253a",
  storageBucket: "ionstarter-3253a.appspot.com",
  messagingSenderId: "834137392641",
  appId: "1:834137392641:web:c7b26e666c80d8d1ea2200",
});
const messaging = firebase.messaging();
