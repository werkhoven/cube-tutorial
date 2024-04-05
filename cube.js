// import schema repository from overrides/repositoryFactory.js
const { SimpleSchemaRepository } = require("./overrides/repositoryFactory");


let schema_version = 1;
module.exports = {
    // Base path for the REST API
    basePath: '/cube-api',

    scheduledRefreshTimer: 5, // 24 hours

    // Inspect, modify, or restrict every query
    schemaVersion: async ({ securityContext }) => {
        console.log('schemaVersion', schema_version);
        return schema_version;
    },
    repositoryFactory: ({ securityContext }) => {
        console.log('REPOSITORY FACTORY --- INITIALIZING SCHEMA REPOSITORY');
        return new SimpleSchemaRepository('model/cubes');
    },
    cacheAndQueueDriver: 'memory'
};