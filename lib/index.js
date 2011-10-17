/*
 *
 * Server site callback module.
 *
 */

/*
 * Dependencies.
 */

var callback = {
    /*
     * Register a dependencie of a initialized dependencie list.
     *
     * @param dependencieName, the name of the dependencie to register.
     */
    register: function(dependencieName, data) {
        this[dependencieName] = data;

        var dependencies = this.dependencies
          , i = 0
          , ii = dependencies.length;

        for(i; i < ii; i++) {
            if(dependencies[i] === dependencieName) {
                dependencies.splice(i, 1);
            }
        }

        // Execute the callback, if all necessary dependencies are registered.
        if(dependencies.length === 0) {
            this.callback();
        }
    },

    /*
     * Initialize the callback helper module. Register a list of
     * dependencies that have to be registered, to execute a callback
     * after the registration of all necessary dependencies.
     *
     * @param dependencies, array of dependencie names.
     * @param cb, function to execute if all necessary dependencies are registered.
     *
     * @return object, of that module.
     */
    init: function(dependencies, cb) {
        var instance = new function() {};

        instance.dependencies = dependencies;
        instance.callback = cb;

        instance.register = callback.register;

        return instance;
    },
};

module.exports = callback;

