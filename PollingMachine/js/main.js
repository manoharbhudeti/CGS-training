//code for first button
var score1 = document.getElementById("score1");
var btn1 = document.getElementById("btn1");
btn1.addEventListener("click",f1);
let count1 =0;
function f1(e)
{
    count1++;
 document.getElementById("score1").innerText= count1;
}

//code for second button
var score2 = document.getElementById("score2");
var btn2 = document.getElementById("btn2");
btn2.addEventListener("click",f2);
let count2 =0;
function f2(e)
{
    count2++;
 document.getElementById("score2").innerText= count2;
}

//code for third button
var score3 = document.getElementById("score3");
var btn3 = document.getElementById("btn3");
btn3.addEventListener("click",f3);
let count3 =0;
function f3(e)
{
    count3++;
 document.getElementById("score3").innerText= count3;
}

//code for submit button
var sub = document.getElementById("submit");
sub.addEventListener("click",SubmitFunction);
function SubmitFunction(e)
{
    alert("Thanks for voting");
    alert(result());
}

//code for result
function result(a,b,c)
{
    if(count1>count2 && count1>count3)
    {
        return "BJP won with :"+count1 +" votes";
    }
    else if(count2>count1 && count2>count3)
    {
        return "congress won with :"+count2 +" votes";
    }
    else{
        return "janasena won with :"+count3 +" votes";

    }
}