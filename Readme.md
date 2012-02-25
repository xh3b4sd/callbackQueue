# CallbackQueue

  Callbacknesting gets more dirty when the amount of nested callbacks
  increases. Here is a way to control your asynchronous code pretty simple.



## Installation

    npm install callbackQueue



## Usage

    var CallbackQueue = require('callbackQueue')
      , moduleOne = require('./moduleOne.js')
      , moduleTwo = require('./moduleTwo.js');

    var callbackQueue = CallbackQueue(['moduleOne', 'moduleTwo'], function() {
        console.log(this.moduleOneData);
        console.log(this.moduleTwoData);
    });

    moduleOne.doSomething(function(err, moduleOneData) {
        callbackQueue.register('moduleOne', moduleOneData);
    });

    moduleTwo.doSomething(function(err, moduleTwoData) {
        callbackQueue.register('moduleTwo', moduleTwoData);
    });

