const lib = require("./pdf_lib_facade");
const path = require("path");

const FONT_PATH = path.join(__dirname, "..","data","cordianew.ttf");
const FONT_BOLD_PATH = path.join(__dirname, "..","data","cordianew_bold.ttf");

exports.correctFile = async (inputPath, outputPath) => {
	var doc = await lib.readPdf(inputPath);
	var pages = await lib.getPages(doc);
	var font1 = await lib.registerFont(doc, FONT_PATH);
	var font2 = await lib.registerFont(doc, FONT_BOLD_PATH);
	for (var page of pages) {
		var size = await lib.getSize(page);
		await lib.drawWhiteBox(page, 80, size.height - 40, size.width - 80, 40);
		await lib.drawWhiteBox(
			page,
			178,
			size.height - 100,
			size.width - 178,
			20
		);
		await lib.drawText(
			page,
			"โรงเรียนเพลินพัฒนา",
			font2,
			88,
			size.height - 35,
			20
		);
		await lib.drawText(
			page,
			"0994002501614",
			font1,
			180,
			size.height - 90,
			14
		);
	}
	await lib.savePdf(doc, outputPath);
};
