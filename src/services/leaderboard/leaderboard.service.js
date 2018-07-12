const assert = require('assert');
const makeDebug = require('debug');
const { Service, createService } = require('mostly-feathers-mongoose');
const fp = require('mostly-func');

const LeaderboardModel = require('../../models/leaderboard.model');
const defaultHooks = require('./leaderboard.hooks');

const debug = makeDebug('playing:leaderboard-services:leaderboards');

const defaultOptions = {
  name: 'leaderboards'
};

class LeaderboardService extends Service {
  constructor (options) {
    options = fp.assignAll(defaultOptions, options);
    super(options);
  }

  setup (app) {
    super.setup(app);
    this.hooks(defaultHooks(this.options));
  }
}

module.exports = function init (app, options, hooks) {
  options = { ModelName: 'leaderboard', ...options };
  return createService(app, LeaderboardService, LeaderboardModel, options);
};
module.exports.Service = LeaderboardService;
