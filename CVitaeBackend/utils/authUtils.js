const util = require("util");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const randomBytesAsync = util.promisify(crypto.randomBytes);
const pbkdf2Async = util.promisify(crypto.pbkdf2);
const jwtSignAsync = util.promisify(jwt.sign);
const jwtVerifyAsync = util.promisify(jwt.verify);

const secret = process.env.JWT_SECRET;

// Hash a password with an optional salt
const hash_password = async (password, salt = null) => {
    if (!salt) salt = (await randomBytesAsync(16)).toString("hex");
    const hash = (await pbkdf2Async(password, salt, 1000, 64, "sha512")).toString("hex");
    return { hash, salt };
};

// Verify a password against a stored hash and salt
const verify_password = async (password, hash, salt) => {
    const { hash: newHash } = await hash_password(password, salt);
    return hash === newHash;
};

// Generate a JWT token
const generate_token = async (payload) => {
    const exp = Math.floor(Date.now() / 1000) + 60 * 60; // token expires in 1h
    return await jwtSignAsync({ ...payload, exp }, secret);
};

// Verify a JWT token
const verify_token = async (token) => {
    return await jwtVerifyAsync(token, secret);
};

module.exports = {
    hash_password,
    verify_password,
    generate_token,
    verify_token,
};