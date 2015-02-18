var $ = require('NodObjC')
var createApp = require('..')

function nsString (string) {
  return $.NSString('stringWithUTF8String', string)
}

createApp(function (err, app) {
  if (err) {
    return console.error(err)
  }
  var osAlert = $.NSAlert('alloc')('init')
  osAlert('setMessageText', nsString('Hello from OSX'))
  osAlert('addButtonWithTitle', nsString('OK'))
  osAlert('addButtonWithTitle', nsString('Nope'))

  var response = osAlert('runModal')
  if (response === 1000) {
    console.log('User pressed OK')
  } else {
    console.log('User pressed Cancel')
  }

  osAlert('release')
  app.close()
})
