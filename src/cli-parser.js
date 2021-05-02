import { exit } from "yargs";
import { getAllGames, getAllReviews, createUser, getUserByUsername, updatePassword, updateUsername, deleteUserByUsername, setUsersSteamID, createGame } from "../mongo";
import { addGamesToLikedList, addGameToDislikedList, deleteGameFromDislikedList, deleteGameFromLikedList, getDislikedGamesByUserId, getLikedGamesByUserId, getUserById, login } from "../redis";

export async function allGamesCli(args) {
    getAllGames().then(() => exit(1));
}

export async function allReviewsCli(args) {
    getAllReviews().then(() => exit(1));
}

export async function getUserByIdCli(args) {
    const username = args.u || args.U || args['username'];

    getUserById(username).then(() => exit(1));
}

export async function getUserLikedListCli(args) {
    const username = args.u || args.U || args['username'];

    getLikedGamesByUserId(username).then(() => exit(1));
}

export async function getUserDislikedListCli(args) {
    const username = args.u || args.U || args['username'];

    getDislikedGamesByUserId(username).then(() => exit(1));
}

export async function createSystemUserCli(args) {
	const username = args.u || args.U || args['username'];
	const password = args.p || args.P || args['password'];

	createUser(username, password).then(() => exit(1));
}

export async function getUserByUsernameCli(args) {
    const username = args.u || args.U || args['username'];

    getUserByUsername(username).then(() => exit(1));
}

export async function updateUsersUsernameCli(args) {
    const oldusrname = args.o || args.O;
    const newusername = args.n || args.N;

    updateUsername(oldusrname, newusername).then(() => exit(1));
}  

export async function updateUserPasswordCli(args) {
    const username = args.u || args.U || args['username'];
    const newpassword = args.n || args.N;

    updatePassword(username, newpassword).then(() => exit(1));
}

export async function deleteUserCli(args) {
    const username = args.u || args.U || args['username'];

    deleteUserByUsername(username).then(() => exit(1));
}

export async function setUsersSteamIDCli(args) {
    const username = args.u || args.U || args['username'];
    const steamID = args.s || args.S || args['steamID'];

    setUsersSteamID(username, steamID).then(() => exit(1));
}

export async function loginUserCli(args) {
    const username = args.u || args.U || args['username'];
	const password = args.p || args.P || args['password'];

    login(username, password).then(() => exit(1));
}

export async function addGamesToLikedListCli(args) {
    const steamID = args.s || args.S || args['steamID'];
    const gameID = args.g || args.G || args['gameID'];

    addGamesToLikedList(steamID, gameID).then(() => exit(1));
}

export async function addGamesToDislikedListCli(args) {
    const steamID = args.s || args.S || args['steamID'];
    const gameID = args.g || args.G || args['gameID'];

    addGameToDislikedList(steamID, gameID).then(() => exit(1));
}

export async function removeGamesFromLikedListCli(args) {
    const steamID = args.s || args.S || args['steamID'];
    const gameID = args.g || args.G || args['gameID'];

    deleteGameFromLikedList(steamID, gameID).then(() => exit(1));
}

export async function removeGamesFromDislikedListCli(args) {
    const steamID = args.s || args.S || args['steamID'];
    const gameID = args.g || args.G || args['gameID'];

    deleteGameFromDislikedList(steamID, gameID).then(() => exit(1));
}

export async function createGameCli(args) {
    const title = args.t || args.T || args['title'];
    const perc_rec = args.p || args.P;
    const num_reviwers = args.n || args.N;
    const game_img_url = args.i || args.I;

    createGame(title, perc_rec, num_reviwers, game_img_url).then(() => exit(1));
}