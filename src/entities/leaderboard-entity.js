import Entity from 'mostly-entity';
import { entities as contents } from 'playing-content-services';

const LeaderBoardEntity = new Entity('LeaderBoard', {
  image: { using: contents.BlobEntity }
});

LeaderBoardEntity.excepts('updatedAt', 'destroyedAt');

export default LeaderBoardEntity.asImmutable();
