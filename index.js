/*
 *
 * Server site callback queue.
 *
 */

/*
 * Class function definition.
 */
var CallbackQueue = function(dependencies, cb) {
    /*
     *
     * public
     *
     */

    var self = {};

    self.dependencies = dependencies;
    self.callback = cb;
    self.registered = 0;

    /*
     * Register a dependencie of a initialized dependencie list.
     *
     * @param dependencieName, the name of the dependencie to register.
     */
    self.register = function(dependencieName, data) {
        if(inArray(dependencieName, self.dependencies)) {
            self[dependencieName] = data;
            self.registered++;
        }

        // Execute the callback, if all necessary dependencies are registered.
        if(self.registered === self.dependencies.length) {
            this.callback();
        }
    };

    /*
     *
     * private
     *
     */

    /*
     * Check if array contains item.
     *
     * @param needle, the term to search for.
     * @param array haystack, the array to search trough.
     *
     * @return boolean.
     */
    function inArray(needle, haystack) {
        if(haystack.indexOf(needle) === -1) {
            return false;
        } else {
            return true;
        }
    }

    /*
     * Iterate trough array.
     *
     * @param function cb.
     */
    function each(array, cb) {
        var i = 0
          , ii = array.length;

        for(i; i < ii; i++) {
            var returnValue = cb(i, array[i]);

            if(returnValue === false) {
                break;
            } else {
                continue;
            }
        }
    }

    return self;
};

module.exports = CallbackQueue;

