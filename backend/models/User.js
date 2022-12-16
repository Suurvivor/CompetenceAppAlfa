const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomize = require('randomatic');

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      unique: true,
      required: [true, 'Please add a name'],
   },
   email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
   },
   workplace: {
      type: mongoose.Schema.ObjectId,
      ref: 'workplace',
   },
   role: {
      type: String,
      enum: ['user'],
      default: 'user',
   },
   password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 8,
      select: false,
   },
   resetPasswordToken: String,
   resetPasswordExpire: Date,
   confirmEmailToken: String,
   isEmailConfirmed: {
      type: Boolean,
      default: false,
   },
   notifications: [],
   rating: [],
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

//search User by name
UserSchema.query.byName = function (name) {
   return this.where({ name: new RegExp(name, 'i') });
};

//Encrypt password befor saving with bcryptjs
UserSchema.pre('save', async function (next) {
   //isModifed jezeli hasło w tym "dokumencie noSQL" zostało zmienione podczas zapisu, ty jest !to negacja
   if (!this.isModified('password')) {
      next();
   }

   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

//sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
   });
};

//Check if password match return true or false
UserSchema.methods.matchPassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
};

//check if rating of competence is already in base then update else push new rating
UserSchema.methods.addNewRatingOrUpdateIfExists = async function (competence_id, ratingData, updateby, callback) {
   const ratingArray = this.rating;
   const ratingIds = ratingArray.map((rating) => {
      return rating.competence_id;
   });

   if (ratingIds.includes(competence_id)) {
      const index = ratingArray.findIndex((rating) => rating.competence_id == competence_id);
      const ratingDataUpdate = {
         competence_id: ratingData.competence_id,
         rating: ratingData.rating,
         lastmodify: Date.now(),
         lastmodify_by: updateby,
         created_at: ratingArray[index].created_at,
         created_by: ratingArray[index].created_by,
      };
      //zamiast splice i tej zmiennej na gorze
      // ratingArray[index] = {
      //    ...ratingArray[index],
      //    competence_id: ratingData.competence_id,
      //    rating: ratingData.rating,
      //    lastmodify: Date.now(),
      //    lastmodify_by: updateby,
      // };

      ratingArray.splice(index, 1, ratingDataUpdate);
      await this.updateOne({ rating: ratingArray });
      callback(ratingArray[index]);
   } else {
      //podwojne zapisywanie tzn push zmienia wartosc this.rating a wiec pytanie czy trzeba this.update do sprawdzenia
      ratingArray.push(ratingData);
      await this.updateOne({ rating: ratingArray });
      callback(ratingData);
   }
};

module.exports = mongoose.model('User', UserSchema);
