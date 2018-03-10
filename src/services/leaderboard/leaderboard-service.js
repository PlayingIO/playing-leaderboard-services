import assert from 'assert';
import makeDebug from 'debug';
import { Service, createService } from 'mostly-feathers-mongoose';
import fp from 'mostly-func';
import LeaderboardModel from '~/models/leaderboard-model';
import defaultHooks from './leaderboard-hooks';

const debug = makeDebug('playing:leaderboards-services:leaderboards');

const defaultOptions = {
  name: 'leaderboards'
};

class LeaderboardService extends Service {
  constructor(options) {
    options = Object.assign({}, defaultOptions, options);
    super(options);
  }

  setup(app) {
    super.setup(app);
    this.hooks(defaultHooks(this.options));
  }
}

export default function init(app, options, hooks) {
  options = Object.assign({ ModelName: 'leaderboard' }, options);
  return createService(app, LeaderboardService, LeaderboardModel, options);
}

init.Service = LeaderboardService;
