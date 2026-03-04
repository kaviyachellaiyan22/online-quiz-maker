let questions={
easy:[
{q:"2 + 2 ?", o:["3","4","5","6"], a:1},
{q:"Capital of India?", o:["Delhi","Mumbai","Chennai","Kolkata"], a:0}
],
medium:[
{q:"HTML stands for?", o:["Hyper Text Markup Language","HighText","Hyper Tab","None"], a:0},
{q:"5 * 6 ?", o:["11","30","60","25"], a:1}
],
hard:[
{q:"Which is not JS framework?", o:["React","Angular","Laravel","Vue"], a:2},
{q:"Binary of 5?", o:["101","110","111","100"], a:0}
]
};

let currentQuestions=[];
let index=0;
let score=0;
let timer;
let timeLeft=15;

function startQuiz(){
let level=document.getElementById("level").value;
currentQuestions=questions[level];
index=0;score=0;
hideAll();
document.getElementById("quizPage").classList.remove("hidden");
showQuestion();
startTimer();
}

function showQuestion(){
let q=currentQuestions[index];
document.getElementById("questionText").innerText=q.q;
let optDiv=document.getElementById("options");
optDiv.innerHTML="";
q.o.forEach((opt,i)=>{
optDiv.innerHTML+=`
<div class="option">
<input type="radio" name="answer" value="${i}"> ${opt}
</div>`;
});
updateProgress();
}

function nextQuestion(){
let selected=document.querySelector('input[name="answer"]:checked');
if(selected && parseInt(selected.value)===currentQuestions[index].a){
score++;
}
index++;
if(index<currentQuestions.length){
showQuestion();
resetTimer();
}else{
endQuiz();
}
}

function startTimer(){
timeLeft=15;
document.getElementById("time").innerText=timeLeft;
timer=setInterval(()=>{
timeLeft--;
document.getElementById("time").innerText=timeLeft;
if(timeLeft<=0){
nextQuestion();
}
},1000);
}

function resetTimer(){
clearInterval(timer);
startTimer();
}

function endQuiz(){
clearInterval(timer);
hideAll();
document.getElementById("resultPage").classList.remove("hidden");
let percent=Math.round((score/currentQuestions.length)*100);
let msg=percent>=90?"Excellent 🎉":percent>=60?"Good 👍":"Practice More 📚";
document.getElementById("resultText").innerText=
`Score: ${score}/${currentQuestions.length} (${percent}%) - ${msg}`;
saveScore(percent);
}

function updateProgress(){
let percent=(index/currentQuestions.length)*100;
document.getElementById("progressBar").style.width=percent+"%";
}

function toggleDark(){
document.body.classList.toggle("dark");
}

function hideAll(){
document.querySelectorAll(".container > div").forEach(div=>div.classList.add("hidden"));
}

function goHome(){
hideAll();
document.getElementById("home").classList.remove("hidden");
}

function saveScore(percent){
let name=document.getElementById("username").value||"Guest";
let leaderboard=JSON.parse(localStorage.getItem("leaderboard"))||[];
leaderboard.push({name,percent});
leaderboard.sort((a,b)=>b.percent-a.percent);
leaderboard=leaderboard.slice(0,5);
localStorage.setItem("leaderboard",JSON.stringify(leaderboard));
}

function showLeaderboard(){
hideAll();
document.getElementById("leaderboardPage").classList.remove("hidden");
let leaderboard=JSON.parse(localStorage.getItem("leaderboard"))||[];
let list=document.getElementById("leaderboardList");
list.innerHTML="";
leaderboard.forEach(player=>{
list.innerHTML+=`<li>${player.name} - ${player.percent}%</li>`;
});
}