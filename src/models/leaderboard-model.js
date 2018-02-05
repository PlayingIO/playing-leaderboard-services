import timestamps from 'mongoose-timestamp';
import { plugins } from 'mostly-feathers-mongoose';
import { models as rules } from 'playing-rule-services';

/*
 * Leaderboard are a system which rank players based upon their scores.
 */
const fields = {
  name: { type: 'String', required: true },  // name for the leaderboard
  description: { type: 'String' },           // brief description of the leaderboard
  metric: {                                  // metric on which this leaderboard is based upon
    id: { type: 'ObjectId' },
    type: { type: 'String', enum: [
      'point',
      'compound'
    ]}
  },
  metric: {                                  // scope on which this leaderboard operates
    id: { type: 'String' },                  // id of team definition or team instance
    type: { type: 'String', enum: [
      'game',
      'team_definition',
      'team_instance',
      'custom'
    ]}
  },
  type: { type: 'String', enum: [            // ranking type of the leaderboard
    'regular']
  },
  entityType: { type: 'String', enum: [      // type of leaderboard whether its for players or teams
    'players',
    'teams'
  ]},
  cycles: { type: 'String', enum: [          // interval in which the leaderboard is reset
    'alltime',
    'yearly',
    'monthly',
    'weekly',
    'daily'
  ]},
  requires: rules.rule.requires,             // visibility requirements for the leaderboard
  tags: [{ type: 'String' }],                // tags of the leaderboard
};

export default function model (app, name) {
  const mongoose = app.get('mongoose');
  const schema = new mongoose.Schema(fields);
  schema.plugin(timestamps);
  schema.plugin(plugins.softDelete);
  return mongoose.model(name, schema);
}

model.schema = fields;