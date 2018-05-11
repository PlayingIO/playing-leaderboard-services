import assert from 'assert';
import makeDebug from 'debug';
import { Service, createService } from 'mostly-feathers-mongoose';
import fp from 'mostly-func';

import LeaderboardModel from '../../models/leaderboard.model';
import defaultHooks from './leaderboard.hooks';

const debug = makeDebug('playing:leaderboard-services:leaderboards');

const defaultOptions = {
  name: 'leaderboards'
};

export class LeaderboardService extends Service {
  constructor (options) {
    options = fp.assignAll(defaultOptions, options);
    super(options);
  }

  setup (app) {
    super.setup(app);
    this.hooks(defaultHooks(this.options));
  }
}

export default function init (app, options, hooks) {
  options = { ModelName: 'leaderboard', ...options };
  return createService(app, LeaderboardService, LeaderboardModel, options);
}

init.Service = LeaderboardService;
