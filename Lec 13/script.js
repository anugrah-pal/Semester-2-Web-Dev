let count=0
const display=document.getElementById("count")
const incbtn=document.getElementById("plus")
const decbtn=document.getElementById("minus")
const resetbtn=document.getElementById("reset")
incbtn.addEventListener("click", function(){
    count++;
    display.textContent=count;
})
decbtn.addEventListener("click", function(){
    count--;
    display.textContent=count;
})
resetbtn.addEventListener("click", function(){
    count=0;
    display.textContent=count;
})
