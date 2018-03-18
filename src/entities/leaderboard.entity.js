import Entity from 'mostly-entity';
import { entities as contents } from 'playing-content-services';

const LeaderboardEntity = new Entity('Leaderboard', {
  image: { using: contents.BlobEntity }
});

LeaderboardEntity.excepts('updatedAt', 'destroyedAt');

export default LeaderboardEntity.asImmutable();
