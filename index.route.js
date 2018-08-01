const router = require('express').Router();
const apiV1Routes = require('./src/routes');

Object.keys(apiV1Routes).map(function (key, index) {
        router.use('/', apiV1Routes[key]);
});

module.exports = router;
