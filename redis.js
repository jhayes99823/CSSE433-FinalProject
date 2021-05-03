import { verifyUser } from './mongo';

const asyncRedis = require('async-redis');
const client = asyncRedis.createClient({ port: 6700 });

const USER_LIKED_BASE = '_LIKED';
const USER_DISLIKED_BASE = '_DISLIKED';

export async function getUserById(username) {
    let userToReturn = await client.hgetall(username);
    console.log(userToReturn);
}

export async function getLikedGamesByUserId(userId, low = 0, high = -1) {
    let userToReturn = await client.smembers(userId + USER_LIKED_BASE);
    
    return userToReturn;
}

export async function getDislikedGamesByUserId(userId, low = 0, high = -1) {
    let userToReturn = await client.smembers(userId + USER_DISLIKED_BASE);

        return userToReturn;
}

export async function login(username, password) {
    let status = await verifyUser(username, password);

    if (status == false) {
        console.log('User not found!');
        return 'User not found!';
    }

    if (!status.steamUserID) {
        console.log('Please associate a steam user id');
        return 'Please associate a steam user id';
    }

    let loggedInUser = await client.hset(status.steamUserID, 'username', username, 'password', password);
    return loggedInUser;
}

export async function addGamesToLikedList(steamID, gameID) {
    let gameList = await client.sadd(steamID + USER_LIKED_BASE, gameID);
    
    if (gameList == 1) {
        console.log('Game Successfully ADDED')
        return true;
    } else {
        console.log('ERROR: Game already exists in set')
        return false;
    }
}

export async function deleteGameFromLikedList(steamID, gameID) {
    let gameList = await client.srem(steamID + USER_LIKED_BASE, gameID);
    
    if (gameList == 1) {
        console.log('Game Successfully REMOVED')
        return true;
    } else {
        console.log('ERROR: Game does not exist in set')
        return false;
    }
}

export async function addGameToDislikedList(steamID, gameID) {
    let gameList = await client.sadd(steamID + USER_DISLIKED_BASE, gameID);
    
    if (gameList == 1) {
        console.log('Game Successfully ADDED')
        return true;
    } else {
        console.log('ERROR: Game already exists in set')
        return false;
    }
}

export async function deleteGameFromDislikedList(steamID, gameID) {
    let gameList = await client.srem(steamID + USER_DISLIKED_BASE, gameID);
    
    if (gameList == 1) {
        console.log('Game Successfully REMOVED')
        return true;
    } else {
        console.log('ERROR: Game does not exist in set')
        return false;
    }
}