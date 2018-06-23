import Entity from 'mostly-entity';
import { BlobEntity } from 'playing-content-common';

const LeaderboardEntity = new Entity('Leaderboard', {
  image: { using: BlobEntity }
});

LeaderboardEntity.discard('_id');

export default LeaderboardEntity.freeze();
