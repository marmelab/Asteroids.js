Tiltable Asteroids
==================

Based on the well know [Asteroids](http://en.wikipedia.org/wiki/Asteroids_%28video_game%29) game, this project introduces another way to pilot your ship using a mobile phone.

The original game was reimplemented in JavaScript and SVG with [Raphaël.js](http://raphaeljs.com/), and a custom gaming loop. The synchronization between the desktop and the mobile screens also uses JavaScript ([Node.js](http://nodejs.org/) and [Socket.io](http://socket.io/)). The mobile webapp uses [Hammer.js](http://eightmedia.github.io/hammer.js/) for gesture and orientation detection.

It was developed in a single day (about 9 hours) during one of the marmelab Hacking Days.

Demo
----
![Tiltable asteroids demo](http://marmelab.github.io/AsteroidTilt/demo.gif)

Installation
------------

```sh
git clone https://github.com/marmelab/AsteroidTilt.git
cd AsteroidTilt
npm install
```

Configuration
-------------

The desktop & mobile application should connect to the node server via his host. This host can be configured in the `constants.js` file.

Getting Up And Running
----------------------

```sh
npm start
```

* Desktop URL: `http://{your host}:3000/display`
* Device URL: `http://{your host}:3000/`
