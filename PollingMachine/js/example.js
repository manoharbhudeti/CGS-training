var output = document.getElementById("output");
var textarea = document.getElementById("textarea");
var submit = document.getElementById("submit");

submit.addEventListener("click", changeText)

function changeText() 
{
    output.innerText = textarea.value;
}
