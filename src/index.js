const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { correctFile } = require("./corrector");
const moment = require("moment");

const INDEX_PATH = path.join(__dirname, "../data/index.html");
const INDEX_CONTENT = fs.readFileSync(INDEX_PATH);
const UPLOAD_PATH = path.join(__dirname, "../upload");
const UPLOAD_OPTS = { dest: "../upload/" };
const OUTPUT_PATH = path.join(__dirname, "../upload/output.pdf");
const app = express();

app.get("/", (req, res) => {
	res.setHeader("Content-Type", "text/html");
	res.send(INDEX_CONTENT);
});

app.post("/upload", multer(UPLOAD_OPTS).single("my_pdf"), async (req, res) => {
	var inputPath = path.join(__dirname, "../upload", req.file.filename);
	await correctFile(inputPath, OUTPUT_PATH);
	await fs.promises.unlink(inputPath);
	res.send("done");
});

app.get("/download", (req, res) => {
	res.download(
		OUTPUT_PATH,
		"document_" + moment().format("DD_MM_YYYY") + ".pdf"
	);
});

const port = process.env.PORT || 3000;
app.use(express.static("../data")).listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
