const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const config = require('@config');
const jwt = require('jsonwebtoken');

require('mongoose-type-email');

const userTypes = [
	'user',
	'admin',
];

const databasesAllowed = [
	'macapa',
	'varejao',
];

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
	token: {
		type: String,
		default: '',
	},
	databasesAllowed: {
		type: [ String ],
		required: true,
		trim: true,
		validate: {
			validator: function (databases) {
				for (const database of databases) {
					if (!databasesAllowed.includes(database)) {
						return false;
					}
				}

				return true;
			},
			message: (props) => `Algum dos bancos de dados '${props.value}' não existe.`,
		},
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
		const salt = await bcrypt.genSalt(config.jwt.saltRounds);

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

userSchema.statics.getAllDatabasesAllowed = function () {
	return databasesAllowed;
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


mongoose.model('User', userSchema);
