/*
 * ChessCharsPwdBoard JavaScript library
 * https://github.com/youcrypted/chess-characters-pwd
 * 
 * License
 * http://www.apache.org/licenses/LICENSE-2.0
 */
const ChessCharsPwdBoard = function (boardDivId, config) {
	const board = new ChessBoard(boardDivId, config);
	board.getPwd = () => {
		const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
		const position = board.position();
		let pwd = "";

		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const key = columns[i] + (j + 1);
				let squareContent = position[key];
				if (typeof board.passwords[key] == 'string' && board.passwords[key].length > 0) {
					squareContent += board.passwords[key];
				}

				pwd = pwd + ((squareContent) ? squareContent : "K"); //k from kyberneees ;)
			}
		}

		return config.hash(pwd);
	};
	board.passwords = {};

	$("#" + boardDivId + " div[class^='square']").each(function (i, el) {
		$(el).click(function () {
			config.readSquarePwd(board, $(el));
		});
	});

	return board;
};