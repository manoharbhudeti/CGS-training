window.onload = function () {
   const boxes = document.querySelectorAll(".box");
   let currentPlayer = "X";
   let board = Array(9).fill(""); // Flattened array representing the 3x3 board

   // Add click events to all boxes
   boxes.forEach((box, index) => {
       box.addEventListener('click', () => makeMove(box, index));
   });

   function makeMove(box, index) {
       // Prevent overwriting a filled box
       if (box.innerText !== "") return;

       // Set the current player's mark on the box and update the board
       box.innerText = currentPlayer;
       board[index] = currentPlayer;

       // Check for a winner or draw
       if (checkWinner()) {
           setTimeout(() => alert(`${currentPlayer} wins!`), 100);
           resetGame();
       } else if (board.every(cell => cell)) {
           setTimeout(() => alert("It's a draw!"), 100);
           resetGame();
       }

       // Switch player
       currentPlayer = currentPlayer === "X" ? "O" : "X";
   }

   function checkWinner() {
       const winPatterns = [
           [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
           [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
           [0, 4, 8], [2, 4, 6]             // Diagonals
       ];

       return winPatterns.some(pattern => 
           pattern.every(index => board[index] === currentPlayer)
       );
   }

   function resetGame() {
       board.fill(""); // Reset board array
       boxes.forEach(box => box.innerText = ""); // Clear the UI
       currentPlayer = "X"; // Reset to player X
   }
};
