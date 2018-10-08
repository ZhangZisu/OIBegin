const _ = require("lodash");
const fs = require("fs");
const problems = _.shuffle(JSON.parse(fs.readFileSync("bundle.json").toString()));
const prompts = require("prompts");

(async () => {
    const number = (await prompts([
        {
            type: "number",
            name: "number",
            message: "Problem count",
            initial: 5
        }
    ])).number;
    console.log(number);
    const questions = [];
    for (let i = 0; i < number; i++) {
        problems[i].options = _.shuffle(problems[i].options);
        const choices = [];
        for (let choice of problems[i].options) {
            choices.push({ title: choice, value: choice });
        }
        questions.push(
            {
                type: "select",
                name: i,
                message: problems[i].description,
                choices: choices
            }
        );
    }
    const result = await prompts(questions);
    const failed = [];
    for (let i in result) {
        if (result[i] !== problems[i].answer) {
            failed.push(problems[i]);
        }
    }
    fs.writeFileSync("failed.json", JSON.stringify(problems, null, '\t'));
    console.log(`AC Rate: ${number - failed.length} / ${number} ~~ ${(number - failed.length) / number}`);
})();