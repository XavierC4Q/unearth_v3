const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 9;

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 5,
		maxlength: 20,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 15,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	account: {
		type: String,
		enum: [ 'ADMIN', 'GUEST', 'ARTIST' ],
		default: 'GUEST',
	},
	joined: {
		type: Date,
		default: Date.now(),
	},
});

UserSchema.pre('save', function(next) {
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
