/**
 * @jest-environment <rootDir>/test/jest/env/mysql-static.js
 */
const log = console.log.bind (console);

describe ('composition showcase', () => {

    // 1

    it ('should provide information from the used environment', mysql (config => log (JSON.stringify (config))));



    // 2

    const sequelize = f => async (config) => {
        const db = await connect (config);

        await migrate (db);
        await truncate (db);

        try {
            return await f (db);
        } finally {
            await disconnect (db);
        }
    };

    it ('should supply a service layer', mysql (sequelize (async ({ teams, sequelize }) => log (`creating an ${await teams.create ('awesome-team')}, still on ${sequelize.whom}`))));



    // 3

    const populate = f => async (db) => {
        const entities = {
            team: await db.teams.create ('awesome-team'),
        };

        return f (db, entities);
    };

    it ('should populate required entities to avoid a before/after setup', mysql (sequelize (populate (async ({ teams, sequelize }, { team }) => log (`:aw_yeah:, my ${team} is here to meet the ${await teams.create ('avengers-team')}, still on ${sequelize.whom}`)))));



    // 4

    const setup = require ('ramda').compose (mysql, sequelize, populate); // imports should stay on the top; used it here to structure this showcase. welcome, ramda

    it ('should be easy to use', setup (async ({ teams, sequelize }, { team }) => log (`:aw_yeah:, my ${team} is here to meet the ${await teams.create ('avengers-team')}, still on ${sequelize.whom}`)));

});



const zzzZ     = 10;
const delay    = (duration = 1000, f) => new Promise (r => setTimeout (r, duration)).then (f); // not cancelable, just for this showcase

// a real implementation targeting a test preparation for sequelize can be found at
// https://medium.com/riipen-engineering/testing-with-sequelize-cc51dafdfcf4

const connect  = ({ database,      host,   port }) => {
    const whom = `${database} on ${host}:${port}`;

    log (`connecting ${whom}`);

    return delay (zzzZ, () => ({
        Sequelize: {},
        sequelize: {
            whom,
        },
        teams: {
            create (whatever) { return delay (zzzZ, () => whatever); },
        }
    }));
};
const disconnect = db => delay (zzzZ, () => log (`disconnecting ${db.sequelize.whom}`));
const migrate    = db => delay (zzzZ, () => log (`migrating ${db.sequelize.whom}`));
const truncate   = db => delay (zzzZ, () => log (`truncating ${db.sequelize.whom}`));
