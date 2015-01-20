/*
 * ChessCharsPwdBoard JavaScript library
 * https://github.com/youcrypted/chess-characters-pwd
 * (c) 2015 by Rolando SM. All rights reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */
ChessCharsPwdBoard = function (aBoardDivId, aConfig) {
	var lBoard = new ChessBoard(aBoardDivId, aConfig);
	lBoard.getPwd = function () {
		var lColumns = ["a", "b", "c", "d", "e", "f", "g", "h"];
		var lPosition = lBoard.position();
		var lPwd = "";

		for (var lI = 0; lI < 8; lI++) {
			for (var lJ = 0; lJ < 8; lJ++) {
				var lKey = lColumns[lI] + (lJ + 1);
				var lSquareContent = lPosition[lKey];
				if (typeof lBoard.passwords[lKey] == 'string' && lBoard.passwords[lKey].length > 0) {
					lSquareContent += lBoard.passwords[lKey];
				}

				lPwd = lPwd + ((lSquareContent) ? lSquareContent : "K"); //k from kyberneees
			}
		}

		return CryptoJS.SHA512(lPwd).toString(CryptoJS.enc.Base64);
	};
	lBoard.passwords = {};

	$("#" + aBoardDivId + " div[class^='square']").each(function (i, aEl) {
		$(aEl).click(function () {
			aConfig.readSquarePwd(lBoard, $(aEl));
		});
	});

	return lBoard;
};