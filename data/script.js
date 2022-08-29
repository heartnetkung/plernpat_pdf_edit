$(document).ready(function () {
	$("#pdf_input").change(function () {
		$("form").submit();
	});
	$("form").submit(function (e) {
		$("#loader").css("display", "block");
		var req = $.ajax({
			url: "/upload",
			type: "POST",
			data: new FormData(this),
			processData: false,
			contentType: false,
		});
		req.done(function () {
			console.log("done");
			$("#loader").css("display", "none");
			window.location = '/download'
			alert('ดาวน์โหลดเรียบร้อย')
		});
		req.fail(function () {
			alert("อัพโหลดไม่สำเร็จ");
			$("#loader").css("display", "none");
		});
		e.preventDefault();
	});
});
