# Progressive Web Apps - Complete Guide

This source code is part of Maximilian Schwarzmüller's "Progressive Web Apps - Complete Guide" course on udemy.com.

# How to Use

You need [Node.js](https://nodejs.org) installed on your machine. Simply download the installer from [nodejs.org](https://nodejs.org) and go through the installation steps.

Once Node.js is installed, open your command prompt or terminal and **navigate into this project folder**. There, run `npm install` to install all required dependencies.

Finally, run `npm start` to start the development server and visit [localhost:8080](http://localhost:8080) to see the running application.

### Connect remote Android device to macOS desktop

1. follow this article: https://developer.chrome.com/docs/devtools/remote-debugging/ ( or another one : https://www.browserstack.com/guide/chrome-mobile-debugging)

2. map the ports as per screenshots below:

![connect remote android device to desktop 1](./connect_remote_android_to_macos_1.png)
![connect remote android device to desktop 2](./connect_remote_android_to_macos_2.png)

### Service Worker registering

create a `sw.js` file in the directory the scope of which you need it to cover

example

```js
self.addEventListener("install", (event) => {
  console.log("[Service Worker]: Service worker installing...", event);
});

self.addEventListener("activate", (event) => {
  console.log("[Service Worker]: Service worker activating...", event);
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  console.log("[Service Worker]: Service worker fetching...", event);
});
```

then in your main js file for example `app.js`, register the `sw.js` as a service worker

your main `app.js` file:

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => {
      console.log("Service worker is registered.");
    })
    .catch((err) => {
      console.error(err);
    });
}
```

### Custom "Add to homescreen application" banner triggering

follow this article: https://web.dev/customize-install/

example in your `app.js` file:

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => {
      console.log("Service worker is registered.");
    })
    .catch((err) => {
      console.error(err);
    });
}

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = event;
  console.log(`'beforeinstallprompt' event was fired.`, event);
});

function handleClickButtonInstall() {
  if (deferredPrompt && deferredPrompt.prompt) {
    // verify if exists
    deferredPrompt.prompt(); // call banner prompt to display: "Do you want to add this app to homescreen?" yes/no

    // user interaction will be saved in the `deferredPrompt.userChoice`
    deferredPrompt.userChoice.then((result) => {
      console.log("user choice: ", result.outcome);

      if (result.outcome === "dismissed") {
        console.log("user cancelled installation");
      } else {
        console.log("user added app to homescreen");
      }
    });

    // whatever the outcome - we shall nullify the prompt
    deferredPrompt = null;
  }
}
```

#### Questions

- Can I unregister a Service Worker?

yes

```js
navigator.serviceWorker.getRegistrations().then(function (registrations) {
  for (let registration of registrations) {
    registration.unregister();
  }
});
```

- My app behaves strangely/ A new Service Worker isn't getting installed.

It probably gets installed but you still have some tab/ window with your app open (in one and the same browser). New service workers don't activate before all tabs/ windows with your app running in it are closed. Make sure to do that and then try again.

- Can I have multiple 'fetch' listeners in a service worker?

Yes, this is possible.

- Can I have multiple service workers on a page?

Yes, but only with different scopes. You can use a service worker for the /help "subdirectory" and one for the rest of your app. The more specific service worker (=> /help) overwrites the other one for its scope.

- Can Service Workers communicate with my Page/ the "normal" JavaScript code there?

Yes, that's possible using messages. Have a look at the following thread for more infos: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#Sending_messages_to_and_from_a_dedicated_worker

This is actually not Service Worker specific, it applies to all Web Workers.

- What's the difference between Web Workers and Service Workers?

Service Workers are a special type of Web Workers. Web Workers also run on a background thread, decoupled from the DOM. They don't keep on living after the page is closed though. The Service Worker on the other hand, keeps on running (depending on the operating system) and also is decoupled from an individual page.
