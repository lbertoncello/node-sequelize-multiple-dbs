module.exports = {
	secret: process.env.SECRET,
	expireTime: parseInt(process.env.EXPIRE_TIME),
	saltRounds: parseInt(process.env.SALT_ROUNDS),
};
