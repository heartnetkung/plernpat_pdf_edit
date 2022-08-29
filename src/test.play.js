const { correctFile } = require("./corrector");
const path = require("path");

const INPUT_PATH = path.join(__dirname, "../data/input.pdf");
const OUTPUT_PATH = path.join(__dirname, "../data/out1.pdf");

const main = async () => {
	try {
		await correctFile(INPUT_PATH, OUTPUT_PATH);
	} catch (e) {
		console.error(e);
	}
};

main();
