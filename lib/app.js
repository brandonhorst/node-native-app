var $ = require('NodObjC')
var EventLoop = require('./event-loop')
EventLoop.initObjC($)

function createApp (done) {
  var pool = $.NSAutoreleasePool('alloc')('init')
  var application = $.NSApplication('sharedApplication')
  var loop = new EventLoop()

  var app = new App({
    eventLoop: loop,
    autoreleasePool: pool
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
}

function App (options) {
  this.eventLoop = options.eventLoop
  this.autoreleasePool = options.autoreleasePool
}

App.prototype.close = function close () {
  this.autoreleasePool('release')
  this.eventLoop.stop()
}

module.exports = createApp
