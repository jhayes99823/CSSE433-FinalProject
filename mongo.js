const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const DATABASE_NAME = 'steam_reviews';
const MONGOD_URL = 'mongodb://localhost:27017/' + DATABASE_NAME;

mongoose.connect(MONGOD_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

let Games = require('./game.model');
let Reviews = require('./userReview.model');
let User = require('./user.model');

import { saltPassword, comparePasswords } from './util';
 
export async function getAllGames() {
    let games = await Games.find({});

    console.log(games);

    return;
}

export async function getAllReviews() {
    let reviews = await Reviews.find({});

    console.log(reviews);
    
    return;
}

export async function createUser(username, password) {
    let user = await User.findOne({ username }).exec();
    
    if (user) {
        console.log('ERROR: User already exists');
        return;
    }

    let hashed = saltPassword(password);

    let newUser = new User({
        username,
        password: hashed
    });

    let result = await newUser.save();
    console.log('USER ADDED:  ', result);
}

export async function updateUsername(oldusername, newusername) {
    let currUser = await User.findOne({ username: oldusername }).exec();

    if (!currUser) {
        console.log('ERROR: User Not Found. Please enter a valid username');
        return;
    }

    let newUser = await User.findOne({ username: newusername }).exec();
    if (newUser) {
        console.log('ERROR: User already exists. Please enter a different username');
        return;
    }

    let res = await User.updateOne({ username: oldusername }, { username: newusername }).exec();
    console.log('Username UPDATED   ', res);
}

export async function updatePassword(username, newpassword) {
    let currUser = await User.findOne({ username }).exec();

    if (!currUser) {
        console.log('ERROR: User Not Found. Please enter a valid username');
        return;
    }
    
    const match = await bcrypt.compare(newpassword, currUser.password);

    if (match) {
        console.log('ERROR: Password matches current password for user. Please enter a different password');
        return;
    }

    let hashed = saltPassword(newpassword);

    let res = await User.updateOne({ username }, { password: hashed });
    console.log('Password UPDATED    ', res);
}

export async function getUserByUsername(username) {
    let currUser = await User.findOne({ username }).exec();

    if (!currUser) {
        console.log('ERROR: User Not Found. Please enter a valid username');
        return;
    }

    console.log('User Found:   ', currUser);
}

export async function deleteUserByUsername(username) {
    let currUser = await User.findOne({ username }).exec();

    if (!currUser) {
        console.log('ERROR: User Not Found. Please enter a valid username');
        return;
    }

    let res = await User.deleteOne({ username });
    console.log('User DELETED     ', res);
}

export async function setUsersSteamID(username, steamID) {
    let currUser = await User.findOne({ username }).exec();

    if (!currUser) {
        console.log('ERROR: User Not Found. Please enter a valid username');
        return;
    }

    currUser.steamUserID = steamID;

    let res = await currUser.save();
    console.log('User Steam ID UPDATED    ', res);
}

export async function createGame(title, perc_rec, num_reviewers, game_img_url, override = false) {
    let game = await Games.find({ game_title: title });

    if (game.length > 0) {
        console.log('WARNING: At least one game with this title already exists.\n Here are the game(s) ...\n', game, '\nAdd the -O tag at the to override and add anyway.');
        return;
    }

    let newGame = new Games({
        game_title: title,
        percent_recommended: perc_rec,
        num_reviewers,
        game_img_url
    });

    let res = await newGame.save();
    console.log('Game CREATED:  ', res);
}

// might want to improve this with some Regex or partial search or something instead of having to do exact match
export async function getGamesByTitle(title) {
    let games = await Games.find({ game_title: title });

    console.log('Games with title - ', title, '\n', games);
}

export async function filterGamesByPercentRecommended() {

}

export async function filterGamesByNumReviewers() {

}

export async function sortGamesByTitle() {

}

export async function sortGamesByPercentRecommended() {

}

export async function sortGamesByNumReviwers() {

}

export async function updateGameTitle() {

}

export async function updateGamePercentRecommended() {

}

export async function updateGameReviewers() {
    
}

export async function updateGameImgURL() {

}

export async function verifyUser(username, password) {
    let currUser = await User.findOne({ username }).exec();

    if (!currUser) return false;

    const match = await bcrypt.compare(password, currUser.password);

    if (!match) return false;

    return currUser;
}