var $ = require('NodObjC')
var EventLoop = require('./event-loop')
EventLoop.initObjC($)

function createApp (done) {
  var pool = $.NSAutoreleasePool('alloc')('init')
  var application = $.NSApplication('sharedApplication')
  var loop = new EventLoop()
  application('setActivationPolicy', $.NSApplicationActivationPolicyRegular)

  var app = new App({
    eventLoop: loop
  })

  var AppDelegate = $.NSObject.extend('AppDelegate')
  AppDelegate.addMethod('applicationDidFinishLaunching:', 'v@:@', function (self, _cmd, notif) {
    process.nextTick(function () {
      done(null, app)
    })
  })

  AppDelegate.register()
  var delegate = AppDelegate('alloc')('init')
  application('setDelegate', delegate)

  application('activateIgnoringOtherApps', $.YES)
  application('finishLaunching')
  loop.start()
  pool('drain')
}

function App (options) {
  this._eventLoop = options.eventLoop
}

App.prototype.close = function close () {
  this._eventLoop.stop()
}

module.exports = createApp
