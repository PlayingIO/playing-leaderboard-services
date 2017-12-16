import assert from 'assert';
import makeDebug from 'debug';
import { Service, helpers, createService } from 'mostly-feathers-mongoose';
import fp from 'mostly-func';
import LeaderBoardModel from '~/models/leaderboard-model';
import defaultHooks from './leaderboard-hooks';

const debug = makeDebug('playing:leaderboards-services:leaderboards');

const defaultOptions = {
  name: 'leaderboards'
};

class LeaderBoardService extends Service {
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
  return createService(app, LeaderBoardService, LeaderBoardModel, options);
}

init.Service = LeaderBoardService;
