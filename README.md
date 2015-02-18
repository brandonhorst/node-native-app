# node-native-app
Node tool for building native apps on OSX

Currently only working on node 0.10.x. Support for 0.12.x and io.js  will come when `NodObjC` is updated.

##Installation

```sh
npm install native-app
```

##Usage

```js
var createApp = require('native-app')

createApp(function (err, app) {
  //do whatever you want

  app.close()
})
```

Try a sample with

```sh
npm run demo
```

##API Reference

### `createApp(callback)`
`callback` is passed a `App` once it is ready to use.

Each program should only call `createApp` once.

### `App`

#### `close()`
Closes the `App`, releasing all memory and removing all items. Any further calls to this `App` will throw.
