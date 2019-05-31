const NodeEnvironment = require ('jest-environment-node');

class MysqlNodeEnvironment extends NodeEnvironment {

    constructor (config, context) {
        super   (config, context);
    }

    async setup () {
        await super.setup ();

        /*
            you may want to use one of the following docker libraries

            * npm install --save-dev node-docker-api
            * npm install --save-dev testcontainers 

            to implement these steps cooperatively (see teardown)

            1. create a docker environment with a configuration according to the required environment (mysql in this case), e.g. environment variables, health-check
            2. start the environment
            3. wait until the environment has reached either a `success`, `timeout` or `failure` state and continue or abort the execution, respectively
            4. resolve additional configuration parameters from the container, e.g. network host and port
        */

        this.global.mysql = f => async () => f ({ /* port, host, username, password */ });   // expose a global function that serves connection information of the running database
    }

    async teardown () {
        try {
        /*
            1. cancel any running request to start the environment, e.g poison flag
            2. wait until the container has shut down, or enforce a shutdown after an amount of time
        */
        } finally {
            await super.teardown ();
        }
    }

}

module.exports = MysqlNodeEnvironment;
