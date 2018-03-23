import { hooks } from 'mostly-feathers-mongoose';
import { cache } from 'mostly-feathers-cache';

import LeaderboardEntity from '~/entities/leaderboard.entity';

export default function (options = {}) {
  return {
    before: {
      all: [
        hooks.authenticate('jwt', options.auth),
        cache(options.cache)
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
        cache(options.cache),
        hooks.presentEntity(LeaderboardEntity, options),
        hooks.responder()
      ]
    }
  };
}