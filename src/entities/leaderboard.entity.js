const Entity = require('mostly-entity');
const { BlobEntity } = require('playing-content-common');

const LeaderboardEntity = new Entity('Leaderboard', {
  image: { using: BlobEntity }
});

LeaderboardEntity.discard('_id');

module.exports = LeaderboardEntity.freeze();
