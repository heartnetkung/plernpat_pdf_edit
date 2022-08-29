const { PDFDocument, PDFDictionary, rgb, grayscale } = require("pdf-lib");
const fs = require("fs").promises;
const fontkit = require("@pdf-lib/fontkit");

exports.readPdf = async (filepath) => {
	var bin = await fs.readFile(filepath);
	var doc = await PDFDocument.load(bin);
	return doc;
};

exports.registerFont = async (doc, fontPath) => {
	var bin = await fs.readFile(fontPath);
	doc.registerFontkit(fontkit);
	var customFont = await doc.embedFont(bin);
	return customFont;
};

exports.savePdf = async (doc, filepath) => {
	var bin = await doc.save();
	await fs.writeFile(filepath, bin);
};

exports.drawText = async (page, text, font, x, y, size) => {
	page.drawText(text, { x, y, size, font });
};

exports.drawWhiteBox = async (page, x, y, width, height) => {
	page.drawRectangle({
		x,
		y,
		width,
		height,
		borderWidth: 0,
		borderColor: grayscale(0.5),
		color: rgb(1, 1, 1),
		opacity: 1,
		borderOpacity: 1,
	});
};

exports.getSize = async (page) => {
	return page.getSize();
};

exports.getPages = async (doc) => {
	return doc.getPages();
};
