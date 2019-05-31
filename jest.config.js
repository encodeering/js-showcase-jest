module.exports = {
    roots: [
        "<rootDir>/src/",
        "<rootDir>/test/"
    ],
    testMatch: [
        "<rootDir>/test/**/*-spec.js"
    ],
    testEnvironmentOptions: {
        "mysql-static": {
            database: 'milkyway',
            user:     'galaxy',
            password: 'solar',
            host:     'universe',
            port:      3306,
        }
    },
}
