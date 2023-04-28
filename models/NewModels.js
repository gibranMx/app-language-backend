
//CATEGORY
const mongoose = require("mongoose");
const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    //_id: 293402934kjdfd
    title: String, // idiomas, frances, frances principiantes
    description: String, // descripción, descrioción, as
    color: String,// rojo, azul, azul claro
    image: {
      type: String, //htts:imagen.png //french.png, asd
      required: false,
      default: null
    }, // opcional
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // null,  293402934kjdfd
  },
  { timestamps: true })
);
module.exports = Category;

// crear, eliminar, 

//get all categories where parentCategory == null (categorias padre)
//get category by name(create recursive function)
//delete category, if category contains other categories then delete all categories.
//update category



//TAG
const mongoose = require("mongoose");
const Tag = mongoose.model(
  "TAG",
  new mongoose.Schema({
    title: String, // francés fácil, verbos, principiantes
    description: String,
    category: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    isExpired:false
  })
);
module.exports = Tag;

// crear, eliminar, editar

// QUESTION
const mongoose = require("mongoose");
const Question = mongoose.model(
  "Question",
  new mongoose.Schema({
    title: { // Do I have 25 years old?
      type: String,
      required: true
    },
    image: String, //image.png
    isMultiple: {
      type: Boolean,
      default: false
    },
    /*
    isLanguageQuestion: {
      type: Boolean,
      default: false
    },*/
    category:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cateogry"
    },
    audio:
    {
      type: String, // adio 1 min assets/adio/audio.mp3
      default: null
    },
    startAudio:
    {
      type: Number, // 00.01s
      default: null
    },
    endAudio:
    {
      type: Number,// 10.00s
      default: null
    },
    translations: [ //[34234234234,234234234,234234234,234234234]
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Translation"
      }
    ],
    answers: [
      {
        title: {
          type: String,
          required: true
        },
        isCorrect: {
          type: Boolean,
          default: false
        },
        image: {
          type: String,
          required: false,
          default: null
        }, // opcional
        audio: {
            type: String,
            required: false,
            default: null
          }, // opcional
        startAudio:
          {
            type: Number, // 00.01s
            default: null
          },
        endAudio:
          {
            type: Number,// 10.00s
            default: null
          },
      }
    ],
    isExpired:false
  },
    { timestamps: true }
  )

);

module.exports = Question;


//TRANSLATION
const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
  phrase: { 
  type: String,
  required: true
 },

  language: { 
  type: String,
  required: true 
 },
  translation: { 
  type: String,
  required: true 
 },
  audio: { 
  type: String,
  required: false 
 },
  audioStart: {
  type: Number,
  required: false
 },
  audioEnd: {
  type: Number,
  required: false 
 },
  image: {
  type: String,
  required: false }
});

const Translation = mongoose.model('Translation', translationSchema);

module.exports = Translation;


//MATCH PAIRS
const mongoose = require("mongoose");

const MatchPairs = new mongoose.model({
    title: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    pairs: [ //12, 2,3,4
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Translation",
            required: true,
          },
    ],
    isExpired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = MatchPairs;

// ACTIVITY
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
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId, // 2389234, 23sakjdha, kjasd12
      ref: 'Tag'
    }
  ]
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;



/*

// MATCH PAIRS
const matchPairsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: String,
  words: [
    {
      title: {
        type: String,
        required: true,
      },
      translation: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: false,
        default: null
      }, 
    }
  ],
  isExpired: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});


*/



/*
const TranslationSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  answers: [
    {
      title: {
        type: String,
        required: true
      }
    }
  ]
});*/

