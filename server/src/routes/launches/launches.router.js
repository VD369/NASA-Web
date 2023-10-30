const express = require('express');
// const { httpAbortLaunch } = require('../../../../client/src/hooks/requests');
const {
   httpGetAllLaunches,
   httpAddNewLaunches,
   httpAbortLaunch,
} = require('./launches.controller')
;

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunches)
launchesRouter.delete('/:id', httpAbortLaunch)

module.exports = launchesRouter;