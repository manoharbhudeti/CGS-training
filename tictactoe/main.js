window.onload = function () {
   const boxes = document.querySelectorAll(".box");
   let currentPlayer = "X";
   let board = Array(9).fill(""); 


   boxes.forEach((box, index) => {
       box.addEventListener('click', () => makeMove(box, index));
   });

   function makeMove(box, index) {
       if (box.innerText !== "") return;
       box.innerText = currentPlayer;
       board[index] = currentPlayer;
       if (checkWinner()) {
           setTimeout(() => alert(`${currentPlayer} wins!`), 100);
           resetGame();
       } else if (board.every(cell => cell)) {
           setTimeout(() => alert("It's a draw!"), 100);
           resetGame();
       }

       currentPlayer = currentPlayer === "X" ? "O" : "X";
   }

   function checkWinner() {
       const winPatterns = [
           [0, 1, 2], [3, 4, 5], [6, 7, 8], 
           [0, 3, 6], [1, 4, 7], [2, 5, 8], 
           [0, 4, 8], [2, 4, 6]             
       ];

       return winPatterns.some(pattern => 
           pattern.every(index => board[index] === currentPlayer)
       );
   }

   function resetGame() {
       board.fill(""); 
       boxes.forEach(box => box.innerText = ""); 
       currentPlayer = "X"; 
   }
};
