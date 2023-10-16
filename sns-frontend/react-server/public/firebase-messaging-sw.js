// eslint-disable-next-line no-restricted-globals
import SpringClient from "../src/lib/api/springClient";

self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  // eslint-disable-next-line no-restricted-globals
  self.skipWaiting();
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("push", function (e) {
  console.log("push: ", e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  };
  console.log("push: ", { resultData, notificationTitle, notificationOptions });

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("notificationclick", function (event) {
  console.log("notification click");
  const url = "/";
  event.notification.close();
  event.waitUntil(SpringClient.openWindow(url));
});