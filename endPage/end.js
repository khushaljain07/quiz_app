const username=document.getElementById("username");
const savescorebtn=document.getElementById("savescorebtn");
const finalscore=document.getElementById('finalscore');
const mostrecentscore=localStorage.getItem('mostrecentscore');

const highscores=JSON.parse(localStorage.getItem("highscores"))  || [];
finalscore.innerText=mostrecentscore;
username.addEventListener("keyup",()=>{

    savescorebtn.disabled= !username.value;
})
savehighscore=e=>{
    console.log("clicked the save button");
    e.preventDefault();
    const score={
        score:mostrecentscore,
        name:username.value
    };
    highscores.push(score);
    highscores.sort((a,b)=>b.score-a.score);
    highscores.splice(5);
    localStorage.setItem("highscores",JSON.stringify(highscores))
    window.location.assign("/");
}  