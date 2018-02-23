# chess-characters-pwd
This JavaScript library allows the creation of super strong user passwords by using the combination of a chess board, its pieces and the traditional text based passwords.

Demo: https://files-rumimbtkjx.now.sh/ 

## Motivation
Internet users are affected by the fact of not using strong passwords to protect their private data, services accounts... 
The main reason is because strong passwords(upper, lower, numbers, special chars) are simply hard to remember by inexperienced users. 

## What is 
The library aims to provide a new friendly user interface to request passwords. Keeping the simplicity and accessibility as first goal, by using the combination of Chess boards, chess pieces and the classic password characters, users will create their strongest password ever. 

## Impact 
The proposed "password generation interface", disable the possibility of any brute-force attack method. >= 64 length passwords are always generated and the complexity becomes exponential even for basic combinations.

In concrete, there are 13^64 password combinations only for the chess pieces (including the blank squares). Then, if we consider that the user can introduce characters in every square (95^N, where N is the length of each password chunk per square).

### Computational complexity (worse case)

- C = Number of printable characters. Normal ASCII contains 95.
- P = Number of chess pieces (including the blank square), 13.

Possible combinations:
- (P)^64: If you only use the chess game pieces.
- (C)^64: If you only use 1 character per square.
- (P + C)^64: If you combine the chess pieces and the printable characters, but keeping the square's content, to only 1 element of the alphabet.
- (P + (C)^N)^64: Where N is the biggest length of the password chunks defined on the squares. For example if you use: "Mom", "I", "LoveU", chunked into 3 squares; we have N = 5 ("LoveU"). Remember that you also can combine chess pieces and printable characters as square content.

> Ultimately, we have (13 + (95)^N)^64 possible combinations, considering only 95 ASCII characters.

The strength of the generated password depends of the ability of the user to combine and remember "content" in multiple squares.

## The library
The library "chess-characters-pwd" is implemented using the chessboardjs (http://chessboardjs.com/) library as base, however it can be easily ported to other chess libraries, even to other kind of games. 

## How to

```js
const init = () => {
  const board = ChessCharsPwdBoard('board', {
    draggable: true,
    dropOffBoard: 'trash',
    sparePieces: true,
    pieceTheme: 'chessboardjs-0.3.0/img/chesspieces/wikipedia/{piece}.png',
    position: 'start',
    readSquarePwd: (board, square) => {
      const pwd = prompt("Enter password:", board.passwords[square.attr('data-square')]);
      if (pwd) {
        board.passwords[square.attr('data-square')] = pwd;
      } else {
        board.passwords[square.attr('data-square')] = "";
      }
    },
    hash: (pwd) => {
      return CryptoJS.SHA512(pwd).toString(CryptoJS.enc.Base64);
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
```

## Dependencies
The library depends of the following third-party libraries:
- https://github.com/oakmac/chessboardjs/
- http://jquery.com/


