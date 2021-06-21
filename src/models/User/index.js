const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const config = require('@config');
const jwt = require('jsonwebtoken');

require('mongoose-type-email');

const userTypes = [ 'user', 'admin' ];

const userSchema = new Schema({
	fullname: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: mongoose.SchemaTypes.Email,
		required: true,
		correctTld: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	userType: {
		type: String,
		required: true,
		enum: userTypes,
		default: 'user',
		trim: true,
	},
	active: {
		type: Boolean,
		required: true,
		default: true,
	},
	votes: {
		type: [
			{
				_id: {
					type: mongoose.SchemaTypes.ObjectId,
					ref: 'Movie',
				},
				score: {
					type: Number,
				},
			},
		],
		default: [],
	},
	token: {
		type: String,
		default: '',
	},
}, {
	timestamps: true,
});

/*
 * ----- Indexes -----
 */
userSchema.index({ email: 1 }, { unique: true });

/*
 * ----- Query helpers -----
 */
userSchema.query.byEmail = async function (email) {
	return await this.where({ email });
};

/*
 * ----- Pre -----
 */
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	try {
		const salt = await bcrypt.genSalt(config.db.saltRounds);

		this.password = await bcrypt.hash(this.password, salt);

		return next();
	} catch (error) {
		return next(error);
	}
});


/*
 * ----- Post -----
 */


/*
 * ----- Static methods -----
 */
userSchema.statics.getUserTypes = function () {
	return userTypes;
};

/*
 *	Valida o token
 */
userSchema.statics.findByToken = async function (token) {
	const user = this;
	const decode = jwt.verify(token, config.jwt.secret);

	return await user.findOne({
		_id: decode.id,
		token: token,
	});
};

userSchema.statics.getTypeUserStr = function () {
	return userTypes[0];
};

userSchema.statics.getTypeAdminStr = function () {
	return userTypes[1];
};

userSchema.statics.insertIfNotExists = async function (doc) {
	const user = await mongoose.model('User').findOne({ email: doc.email });

	if (!user) {
		return await doc.save();
	}

	return user;
};

/*
 * ----- Instance methods -----
 */

/*
 * Retorna true se o password dado estiver correto
 */
userSchema.methods.checkPasswordMatch = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};

/*
 * Gera o token de login
 */
userSchema.methods.generateToken = async function () {
	const user = this;

	const token = jwt.sign(
		{ id: user._id.toHexString() },
		config.jwt.secret,
		{
			expiresIn: config.jwt.expireTime,
		},
	);

	user.token = token;

	return await user.save();
};

userSchema.methods.isActive = function () {
	return this.active;
};

userSchema.methods.isAdmin = function () {
	return mongoose.model('User').getTypeAdminStr() === this.userType;
};

userSchema.methods.activate = async function () {
	let user = this;

	if (!user.isActive()) {
		this.active = true;
		user = await this.save();
	}

	return user;
};

userSchema.methods.deactivate = async function () {
	let user = this;

	if (user.isActive()) {
		this.active = false;
		this.token = '';
		user = await this.save();
	}

	return user;
};

userSchema.methods.vote = async function (movieId, score) {
	let user = this;
	let movie = await mongoose.model('Movie').findById(movieId);

	if (!movie) {
		throw new Error('O filme informado não existe.');
	}

	if (score < 0 || score > 4) {
		throw new Error('A nota deve estar entre 0 e 4.');
	}

	user.votes = await user.votes.pull(movieId);

	const vote = {
		_id: movieId,
		score: score,
	};

	user.votes.push(vote);
	movie = await movie.saveVote(user._id, score);
	user = await user.save();

	return user;
};


mongoose.model('User', userSchema);
