/*
 *
 * CallbackQueue Tests.
 *
 */

/*
 *
 */
var CallbackQueue = require('../index.js');

beforeEach(function() {
    this.addMatchers({
        toBeFunction: function() {
            return typeof this.actual === 'function';
        },
        toBeNumber: function() {
            return typeof this.actual === 'number';
        },
        toBeObject: function() {
            return typeof this.actual === 'object' && !Array.isArray(this.actual);
        },
        toBeEmptyObject: function() {
            return !Object.keys(this.actual).length;
        }
    });
});

describe('callbackQueue', function() {
    describe('module', function() {
        it('should be a function', function() {
            expect(CallbackQueue).toBeFunction();
        });
    });

    describe('instance', function() {
        it('should be a object', function() {
            expect(CallbackQueue()).toBeObject();
        });
    });

    describe('instance property "registered"', function() {
        it('should be 0 by default', function() {
            expect(CallbackQueue().registered).toBe(0);
        });

        it('should be incremented by dependency registrations', function() {
            var dependencies = ['first', 'second', 'third'];

            var cb = function() {
                expect(this.registered).toBe(3);
            };

            var callbackQueue = CallbackQueue(dependencies, cb);

            callbackQueue.register('first');
            callbackQueue.register('second');
            callbackQueue.register('third');
        });
    });

    describe('instance property "register"', function() {
        it('should be a function', function() {
            expect(CallbackQueue().register).toBeFunction();
        });
    });

    describe('instance property "dependencies"', function() {
        it('should equal the given dependencies', function() {
            var dependencies = ['first', 'second', 'third'];
            expect(CallbackQueue(dependencies).dependencies).toBe(dependencies);
        });

        it('should extend instance with dependencies', function() {
            var dependencies = ['first', 'second', 'third']
              , cb = function() {}
              , callbackQueue = CallbackQueue(dependencies, cb);

            callbackQueue.register('first', 'first data set');

            expect(callbackQueue.first).toBe('first data set');
        });
    });

    describe('instance property "cb"', function() {
        it('should equal the given cb', function() {
            var Callback = function Callback() {};
            expect(CallbackQueue(undefined, Callback).callback).toBe(Callback);
        });

        it('should`nt be fired if not all dependencies are registered', function() {
            var dependencies = ['first', 'second', 'third']
              , cb = jasmine.createSpy()
              , callbackQueue = CallbackQueue(dependencies, cb);

            callbackQueue.register('first');
            callbackQueue.register('second');

            expect(cb).not.toHaveBeenCalled();
        });

        it('should be fired if all dependencies are registered', function() {
            var dependencies = ['first', 'second', 'third']
              , cb = jasmine.createSpy()
              , callbackQueue = CallbackQueue(dependencies, cb);

            callbackQueue.register('first');
            callbackQueue.register('second');
            callbackQueue.register('third');

            expect(cb).toHaveBeenCalled();
        });

        it('should be fired in the scope of the instance', function() {
            var dependencies = ['first', 'second', 'third'];

            var cb = function() {
                expect(this.first).toBe('first data set');
                expect(this.second).toBe('second data set');
                expect(this.third).toBe('third data set');
            };

            var callbackQueue = CallbackQueue(dependencies, cb);

            callbackQueue.register('first', 'first data set');
            callbackQueue.register('second', 'second data set');
            callbackQueue.register('third', 'third data set');
        });
    });
});

