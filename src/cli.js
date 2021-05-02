import minimist from 'minimist';
import { exit } from 'yargs';
import { addGamesToDislikedListCli, addGamesToLikedListCli, allGamesCli, allReviewsCli, createGameCli, createSystemUserCli, deleteUserCli, getUserByIdCli, getUserByUsernameCli, getUserDislikedListCli, getUserLikedListCli, loginUserCli, removeGamesFromDislikedListCli, removeGamesFromLikedListCli, setUsersSteamIDCli, updateUserPasswordCli, updateUsersUsernameCli } from './cli-parser';

var OrientDB = require('orientjs');

var server = OrientDB({
    host: '433-21.csse.rose-hulman.edu',
    port: 2424,
    username: 'root',
    password: 'pheeN7wi',
    useToken: true
});

var ODatabase = require('orientjs').ODatabase;
var db = new ODatabase({
   host:     '433-21.csse.rose-hulman.edu',
   port:     2424,
   username: 'root',
   password: 'pheeN7wi',
   name:     '433project'
});

export async function cli(argArr) {
    const args = minimist(argArr.slice(2));
    let cmd = args._[0] || 'help';

    switch (cmd) {
        case 'help':
            console.log('default help method goes here  ');
            exit(1);
            break;
	case 'create-user':
		createSystemUserCli(args);
		break;
	case 'get-sys-user':
        getUserByUsernameCli(args);
		break;
	case 'update-user-username':
        updateUsersUsernameCli(args);
		break;
	case 'update-user-password':
        updateUserPasswordCli(args);
		break;
	case 'delete-user':
        deleteUserCli(args);
		break;
    case 'set-sys-user-steam-id':
        setUsersSteamIDCli(args);
        break;
    case 'all-games':
        allGamesCli(args);
        break;
    case 'all-reviews':
        allReviewsCli(args);
        break;
    case 'get-user':
        getUserByIdCli(args);
        break;
    case 'user-liked-games':
        getUserLikedListCli(args);
        break;
    case 'user-disliked-games':
        getUserDislikedListCli(args);
        break;
    case 'create-game':
        createGameCli(args);
        break;
    case 'login-user':
        loginUserCli(args);
        break;
    case 'add-liked-game':
        addGamesToLikedListCli(args);
        break;
    case 'add-disliked-game':
        addGamesToDislikedListCli(args);
        break;
    case 'remove-liked-game':
        removeGamesFromLikedListCli(args);
        break;
    case 'remove-disliked-game':
        removeGamesFromDislikedListCli(args);
        break;
    case 'orient-test':
        db.open().then(function() {
            return db.query('SELECT FROM V LIMIT 1');
            }).then(function(res){
            console.log(res.length);
            console.log(res);
            db.close().then(function(){
                console.log('closed');
                exit(1);
            });
            });
        break;
        default:
            console.error(`"${cmd}" is not a valid command!`);
            exit(1);
            break;
    }
}
