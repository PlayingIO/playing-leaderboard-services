import { hooks } from 'mostly-feathers-mongoose';
import LeaderboardEntity from '~/entities/leaderboard-entity';

module.exports = function(options = {}) {
  return {
    before: {
      all: [
        hooks.authenticate('jwt', options.auth)
      ],
      update: [
        hooks.discardFields('id', 'createdAt', 'updatedAt', 'destroyedAt')
      ],
      patch: [
        hooks.discardFields('id', 'createdAt', 'updatedAt', 'destroyedAt')
      ]
    },
    after: {
      all: [
        hooks.presentEntity(LeaderboardEntity, options),
        hooks.responder()
      ]
    }
  };
};