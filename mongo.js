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

    //console.log(reviews);
    
    return reviews;
}

export async function createGame(game_id, title, perc_rec, n_reviewers, game_img_url, override = false) {
    let game = await Games.find({ game_title: title });

    if (game.length > 0) {
        console.log('WARNING: At least one game with this title already exists.\n Here are the game(s) ...\n', game, '\nAdd the -O tag at the to override and add anyway.');
        return;
    }

    let newGame = new Games({
        _id: game_id,
        game_title: title,
        percent_recommended: perc_rec,
        num_reviewers: n_reviewers,
        game_image_url: game_img_url
    });

    let res = await newGame.save();
    // console.log('Game CREATED:  ', res);
    return res;
}

// might want to improve this with some Regex or partial search or something instead of having to do exact match
export async function getGamesByTitle(title) {
    let games = await Games.find({ game_title: title });

    // console.log('Games with title - ', title, '\n', games);
    return games;
}

export async function filterGamesByPercentRecommended(perc) {
    let games = await Games.find({ percent_recommended: perc });
    return games;
}

export async function filterGamesByNumReviewers(nr) {
    let games = await Games.find({ num_reviewers: nr });
    return games;
}

export async function sortGamesByTitle() {
    let games = await Games.aggregate([{ $sort : { title: -1 } }]);
    return games;
}

export async function sortGamesByPercentRecommended() {
    let games = await Games.aggregate([{ $sort : { title: -1 } }]);
    return games;
}

export async function sortGamesByNumReviwers() {
    let games = await Games.aggregate([{ $sort : { num_reviewers: -1 } }]);
    return games;
}

export async function updateGameTitle(gid, new_title) {
    let result = await Games.update_one({_id: gid}, {$set: { title: new_title } });
    return result;
}

export async function updateGamePercentRecommended(gid, perc) {
    let result = await Games.update_one({_id: gid}, {$set: { percent_recommended: perc } });
    return result;
}

export async function updateGameReviewers(gid, nrev) {
    let result = await Games.update_one({_id: gid}, {$set: { num_reviewers: nrev } });
    return result;
}

export async function updateGameImgURL(gid, url) {
    let result = await Games.update_one({_id: gid}, {$set: { game_image_url: url } });
    return result;
}
