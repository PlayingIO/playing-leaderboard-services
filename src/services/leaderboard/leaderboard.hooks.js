const { hooks } = require('mostly-feathers-mongoose');
const { cache } = require('mostly-feathers-cache');

const LeaderboardEntity = require('../../entities/leaderboard.entity');

module.exports = function (options = {}) {
  return {
    before: {
      all: [
        hooks.authenticate('jwt', options.auth),
        cache(options.cache)
      ],
      update: [
        hooks.discardFields('createdAt', 'updatedAt', 'destroyedAt')
      ],
      patch: [
        hooks.discardFields('createdAt', 'updatedAt', 'destroyedAt')
      ]
    },
    after: {
      all: [
        cache(options.cache),
        hooks.presentEntity(LeaderboardEntity, options.entities),
        hooks.responder()
      ]
    }
  };
};