# chess-characters-pwd
> Library that allows to create strong user's passwords by using the combination of chess board, pieces and the traditional password characters.

## Introduction

Common IT users complain and suffer the fact of not using strong passwords to protect their private data, services accounts... 
The main reason is because strong passwords (upper, lower, numbers, special chars) are simply hard to remember for non IT experienced persons. In the other hand, the authentication interface of the majority of Internet services only offer the traditional "enter password text box".
Some services started to require strong user passwords but then, users can't remember those passwords. 

## What is 

The objective of this library is in fact, to provide a new friendly user interface to request the user's passwords. Keeping the simplicity and accessibility as 
first goal, by using the combination of Chess boards, chess pieces and the classic password characters, we achieve a very high chance of success; 
even IT novice users will be able to generate complex passwords, quite accidentally.

## Impact 

The proposed "password generation interface", result in a very strong challenge for existing brute-force attack methods. >= 64 length passwords are always generated and the complexity
becomes exponential even for pretty simple combinations.

If we talk about numbers, we have 13^64 combinations only for the chess pieces (including the blank squares). Then if we consider that the user can introduce characters in every square 
(255^N, where N is the length of each password chunk), generate all the possible combinations becomes really prohibitive. The silver bullet appear because we are always 
talking about >= 64 length passwords, that the users will extended, having 64 "squares" to decide ;)

### Computational complexity (worse case)

- C = Number of printable characters. Normal ASCII contains 95.
- P = Number of chess pieces (including the blank square), 13.

Possible combinations:

- (P)^64: If you only use the chess game pieces.
- (C)^64: If you only use 1 character per square.
- (P + C)^64: If you combine the chess pieces and the printable characters, but keeping the square's content, to only 1 element of the alphabet.
- (P + (C)^N)^64: Where N is the biggest length of the content per square. For example if you use: "Mom", "1", "LoveU", divided into 3 squares, 
then N = 5 ("LoveU"). Remember that you also can combine chess pieces and printable characters as square content.

>Yes, we have (13 + (95)^N)^64 possible combinations with the normal ASCII code.

Of course, the strength of the generated password depends of the ability of the user to combine and remember "content" in multiple squares.

## The library

The library "chess-characters-pwd", is the result of an extension of the chessboardjs (http://chessboardjs.com/) library. Suppose to be the interface for 
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
				},
				hash: function (aPwd) {
					// custom password hashing function
					return CryptoJS.SHA512(aPwd).toString(CryptoJS.enc.Base64);
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
- http://jquery.com/


## Live Demo

- http://youcrypted.github.io/chess-chars-pwd/example/


