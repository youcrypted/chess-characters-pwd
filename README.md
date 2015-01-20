# chess-characters-pwd
> Library that allows to create strong user's passwords by using the combination of chess board, pieces and the traditional password characters.

## Introduction

Common IT users complain and suffer the fact of not using strong passwords to protect their private data services account... One, because strong passwords (upper, lower, numbers, special chars)
are simply hard to remember for non IT experienced persons, second, the authentication interface of the majority of Internet services only offer the traditional "enter password box".
Some services started to complain about the weakness of user's passwords and force users to introduce "not so weak passwords"..., 
user's complain again because they simply forget the password ;(

## What is 

The objective of this library is in fact, to provide a new friendly user interface to request the user's passwords. Keeping the simplicity and accessibility as 
first goal, by using the combination of classic Chess boards and the chess pieces, the classic password characters, we achieve a very high percent of success; 
even IT novice users will be able to generate complex passwords, quite accidentally.

## The goal

The proposed "password generation interface", result in a very strong challenge for existing brute-force attack methods. >= 64 length passwords are always generated and the complexity
becomes exponential even for pretty simple combinations.

If we talk about numbers, we have 13^64 combinations only for the chess pieces (including the blank squares). Then if we consider that the user can introduce characters in every square 
(255^N, where N is the length of each password chunk), generate all the possible combinations becomes really prohibitive. The silver bullet appear because we are always 
talking about >= 64 length passwords, that the users will extended, having 64 "squares" to decide ;)

## The library

The library "chess-characters-pwd", is the result of an extension of the chessboardjs (http://chessboardjs.com/) library. Suppose to be to the interface for 
requesting the user's passwords in the future encrypted social network: youcrypted.com


## How to

```js
	<script>
		var init = function () {

			var board = ChessCharsPwdBoard('board', {
				draggable: true,
				dropOffBoard: 'trash',
				sparePieces: true,
				pieceTheme: 'images/pieces/{piece}.png',
				position: 'start',
				readSquarePwd: function (aBoard, aSquare) {
					// replace by app specific password dialog
					// this is just a demo
					var lPwd = prompt("Enter password:", aBoard.passwords[aSquare.attr('data-square')]);
					if ("" != lPwd) {
						aBoard.passwords[aSquare.attr('data-square')] = lPwd;
					} else {
						aBoard.passwords[aSquare.attr('data-square')] = "";
					}
				}
			});

			$('#startBtn').on('click', board.start);
			$('#clearBtn').on('click', function () {
				board.passwords = {};
				board.clear();
			});
			$('#pwdBtn').on('click', function () {
				alert(board.getPwd());
			});

		};

		$(document).ready(init);
	</script>
```

## Dependencies

The library depends of the following third-party libraries:
- https://github.com/oakmac/chessboardjs/
- https://code.google.com/p/crypto-js/
- http://jquery.com/




