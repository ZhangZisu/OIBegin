const _ = require("lodash");
const fs = require("fs");
const problems = _.shuffle(JSON.parse(fs.readFileSync("bundle.json").toString()));
const promptly = require("promptly");

(async () => {
    const number = parseInt(await promptly.prompt("Length", {
        validator: (value) => {
            value = parseInt(value);
            if (value < 1 || value > 25) throw new Error("Invalid input");
            return value;
        },
        retry: true
    }));
    console.log(number);
    for (let i = 0; i < number; i++) {
        console.log(problems[i].description);
        problems[i].options = _.shuffle(problems[i].options);
        const choices = [];
        for (let j = 0; j < problems[i].options.length; j++) {
            console.log(`${j}: ${problems[i].options[j]}`);
            choices.push(j);
        }
        const result = await promptly.choose("Select one:", choices);
        if (problems[i].options[result] === problems[i].answer) {
            console.log("Correct");
        } else {
            console.log("Wrong");
        }
    }
})();