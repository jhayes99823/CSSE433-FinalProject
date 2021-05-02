const bcrypt = require('bcryptjs')

function saltPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    return hash;
}

function comparePasswords(hash, password) {
    let result =  false;
    console.log(hash, '   ', password);
    bcrypt.compare(password, hash)
        .then((res) => {
            console.log('whats up   ', res);
            return res;
        });
}

export { saltPassword, comparePasswords };
