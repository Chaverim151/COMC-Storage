// COMC Equipment Manager — Firebase Cloud Messaging Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:            "AIzaSyAYZVEJfe8RFgit-0nwIndTCaGE8drUKz4",
  authDomain:        "comc-storage.firebaseapp.com",
  projectId:         "comc-storage",
  storageBucket:     "comc-storage.firebasestorage.app",
  messagingSenderId: "384295811042",
  appId:             "1:384295811042:web:0bd625958132fac9532bbb"
});

const messaging = firebase.messaging();

// Handle background push notifications
messaging.onBackgroundMessage(payload => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'COMC Equipment', {
    body: body || '',
    icon: icon || 'https://i.ibb.co/WWx03S58/updated-logo.png',
    badge: 'https://i.ibb.co/WWx03S58/updated-logo.png',
    data: payload.data || {},
    actions: [{ action: 'open', title: 'Open App' }]
  });
});

// Click on notification opens the app
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('equipment.chaverimmc.org') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow('https://equipment.chaverimmc.org');
    })
  );
});
