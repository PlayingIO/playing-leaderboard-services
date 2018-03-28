import { plugins } from 'mostly-feathers-mongoose';
import { models as rules } from 'playing-rule-services';

const options = {
  timestamps: true
};

/**
 * Leaderboard are a system which rank players based upon their scores.
 */
const fields = {
  name: { type: String, required: true },  // name for the leaderboard
  description: { type: String },           // brief description of the leaderboard
  metric: { type: 'ObjectId' },            // metric on which this leaderboard is based upon
  scope: {                                 // scope on which this leaderboard operates
    id: { type: String },                  // id of team definition or group instance
    type: { type: String, enum: [
      'every', 'team', 'group', 'custom'
    ]}
  },
  type: { type: String, enum: [            // ranking type of the leaderboard
    'regular'
  ], default: 'regular' },
  entity: { type: String, enum: [          // type of leaderboard whether its for players or teams
    'players',
    'teams'
  ]},
  cycles: [{ type: String, enum: [         // interval in which the leaderboard is reset
    'alltime', 'yearly', 'monthly', 'weekly', 'daily'
  ]}],
  requires: rules.requires.schema,         // visibility requirements for the leaderboard
  tags: [{ type: String }],                // tags of the leaderboard
};

export default function model (app, name) {
  const mongoose = app.get('mongoose');
  const schema = new mongoose.Schema(fields, options);
  schema.plugin(plugins.softDelete);
  return mongoose.model(name, schema);
}

model.schema = fields;