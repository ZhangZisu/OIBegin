const fs = require("fs");

const dir = fs.readdirSync("data_utf8");

const problems = [];

for (let file of dir) {
    let content = fs.readFileSync("data_utf8/" + file).toString();
    content = content.split("\n");
    const problem = {
        description: content[0],
        options: [
            content[1],
            content[2],
            content[3],
            content[4]
        ],
        answer: content[1]
    };
    problems.push(problem);
}

fs.writeFileSync("bundle.json", JSON.stringify(problems));