const fs = require("fs");
const problems = JSON.parse(fs.readFileSync("bundle.json").toString());
const promptly = require("promptly");
const _ = require("lodash");


(async () => {
    const number = parseInt(await promptly.prompt("Length", {
        validator: (value) => {
            value = parseInt(value);
            if (value < 1 || value > 25) throw new Error("Invalid input");
        },
        retry: true
    }));
    //
})();