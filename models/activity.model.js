const mongoose = require('mongoose');
const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  type: {
    type: String,
    enum: ['question', 'matchPairs']
  },
  question: {
    type: mongoose.Schema.Types.ObjectId, //null
    ref: 'Question',
    default: null
  },
  matchPairs: {
    type: mongoose.Schema.Types.ObjectId, // null
    ref: 'MatchPairs',
    default: null
  },
  
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: { type: Date, default: Date.now }, //
  isVisible: { type: Boolean, default: false },
  startDate: Date, // no seguro
  endDate: Date, // noseguro
  idTags: [
    {
      type: mongoose.Schema.Types.ObjectId, // 2389234, 23sakjdha, kjasd12
      ref: 'Tag'
    }
  ],
  idLesson: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson"
  },
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;


