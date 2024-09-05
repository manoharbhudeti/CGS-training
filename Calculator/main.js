

var display = document.getElementById("display");
var btns = document.getElementsByClassName("col");
for(let i=0;i<btns.length;i++)
{
    btns[i].addEventListener("click",Expression);

}
function Expression(e)
{
    var cur = e.target;
    if(cur.innerText=="=")
    {
            var result = eval(display.value);
            display.value = result;
    }

    else
    {
        display.value += cur.innerText;
    }    
}
