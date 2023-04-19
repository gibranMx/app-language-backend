
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
    title: {
      type: String,
      required: true
    },
    image: String,
    isMultiple: {
      type: Boolean,
      default: false
    },
    idCategory:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
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
      }
    ],
    isExpired:false
  },
    { timestamps: true }
  )

);

module.exports = Question;

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





// MATCH PAIRS
/*const matchPairsSchema = new mongoose.Schema({
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

