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
