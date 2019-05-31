const NodeEnvironment = require ('jest-environment-node');

class MysqlNodeEnvironment extends NodeEnvironment {

    constructor (config, context) {
        super   (config, context);

        this.parameters = config.testEnvironmentOptions['mysql-static'];
    }

    async setup () {
        console.log ('setup')
        await super.setup ();

        this.global.mysql = f => async () => f ({ ...this.parameters });
    }

    async teardown () {
        await super.teardown ();
        console.log ('teardown')
    }

}

module.exports = MysqlNodeEnvironment;
