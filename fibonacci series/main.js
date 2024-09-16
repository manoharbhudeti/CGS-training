// Access the input and button
var input = document.getElementById("input");
var button = document.querySelector(".btn-primary");
var output = document.getElementById("output");

// Add event listener to the button, not the input field
button.addEventListener("click", f1);

function f1() {
    // Get the input value and parse it to an integer
    var n = parseInt(input.value);
    
    var fibSeries = fibonacci(n);
    
    // Display the Fibonacci series in the output div
    output.innerText = `Fibonacci Series: ${fibSeries.join(", ")}`;
}

function fibonacci(n) {
    let fib = [0, 1];  // Initialize the series

    // Generate the Fibonacci sequence
    for (let i = 2; i < n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }

    // Return the sequence truncated to 'n' elements
    return fib.slice(0, n);
}
