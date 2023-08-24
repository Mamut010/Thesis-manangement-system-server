function hash(raw) {
    const bcrypt = require('bcrypt');
    return bcrypt.hashSync(raw, bcrypt.genSaltSync());
}

const args = process.argv.slice(2);

if (args.length === 0) {
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question('Raw password: ', (password) => {
        console.log(hash(password));
        rl.close();
    });

    rl.on("close", () => process.exit(0));
}
else if (args.length === 1) {
    console.log(hash(args[0]));
}
else {
    console.log('Usage:     node [options] gen-pass.js [raw-password]');
}