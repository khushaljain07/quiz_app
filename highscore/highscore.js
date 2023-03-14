const highscorelist=document.getElementById("highscorelist");
const highscores=JSON.parse(localStorage.getItem("highscores"))||[];
highscorelist.innerHTML=
highscores.map(score=>{
   return  `<li class=high-score>${score.score } - ${ score.name}</li>`
}).join(""); 
 
