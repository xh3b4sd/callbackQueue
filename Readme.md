# CallbackQueue

  Callbacknesting gets more dirty when the amount of nested callbacks
  increases. Here is a way to control your asynchronous code pretty simple.

## Usage

    var callback = require('./callback.js')
      , moduleOne = require('./moduleOne.js')
      , moduleTwo = require('./moduleTwo.js');

    var callbackQueue = callback.init(['moduleOne', 'moduleTwo'], function() {
        console.log(this.moduleOneData);
        console.log(this.moduleTwoData);
    });

    moduleOne.doSomething(function(err, moduleOneData) {
        callbackQueue.register('moduleOne', moduleOneData);
    });

    moduleTwo.doSomething(function(err, moduleTwoData) {
        callbackQueue.register('moduleTwo', moduleTwoData);
    });

