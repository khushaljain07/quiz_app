const question = document.getElementById("question")
const choices = Array.from(document.getElementsByClassName("choice-text"));
const choices_container = Array.from(document.getElementsByClassName("choice-container"));
const progressbartext=document.getElementById('progressbartext');
const progressbarfull=document.getElementById('progressbarfull');
const scoretext=document.getElementById('score');
const loader=document.getElementById('loader');
const game=document.getElementById('game');
let currentquestion = {};
let acceptanswer = true;
let score = 0;
let questioncounter = 0;
let availablequestion = [];

let questions=[];

//loading question--->FETCHING FROM API--->FORMATTING LOADED QUESTION--->STARTING THE GAME
fetch("https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple").then(res=>{
  return res.json();
}).then(loadedquestion=>{
   console.log(loadedquestion);
  questions=loadedquestion.results.map(loadedquestion =>{
     const formattedquestion={
       question:loadedquestion.question
     };
     const answerchoice=[...loadedquestion.incorrect_answers]; 
     formattedquestion.answer=Math.floor(Math.random()*4)+1; 
     answerchoice.splice(formattedquestion.answer-1,0,loadedquestion.correct_answer); 
     answerchoice.forEach((choice,index)=>{formattedquestion["choice"+(index+1)]=choice;
    });
    
    
    return formattedquestion; 
  });
  
  startgame();  
})



// /constrant
const correct_bonus = 10; ////BONUS PER QUESTION
const max_question = 10;  ////MAX_QUESTIONS


//START_GAME_PROGRAM --->SETTING DEFAULT--->SETTING AVAILABLE_QUESTION--->GETTING OUR FIRST QUESTION
startgame = () => {
  //SETTING DEFAULT
  questioncounter = 0;
  score = 0;
  
  //LOADING QUESTION
  availablequestion = [...questions];
  console.log(availablequestion)
  getnewquestion();//LOADING NEW QUESTION
  game.classList.remove("hidden");////REMOVING HIDDEN CLASS FROM THE GAME
  loader.classList.add("hidden");//HIDDING LOADER
};


//LOADING NEW QUESTION--->SETTING MOSTRECENT SCORE---->QUESTION COUNTER--->PROGRESS BAR--->UPDATE AVAILABLE QUESTION ARRAY
getnewquestion = () => {
  
  //UPDATING MOSTRECENT SCORE AT THE END AND REFERING TO END PAGE
  if (availablequestion.length === 0 || questioncounter >= max_question)
  {
    localStorage.setItem('mostrecentscore',score); 
    
    return window.location.assign("../endPage/end.html");
  }
  questioncounter++;
  
  progressbartext.innerText= `Question ${questioncounter}/${max_question}`//SETTING "QUESTION 1/10"
  
  progressbarfull.style.width=`${(questioncounter/max_question)*100 +1}%`  //SETTING PROGRESS BAR FULL
  
  //CURRENT QUESTION
  const questionindex = Math.floor(Math.random() * availablequestion.length);
  
  currentquestion = availablequestion[questionindex];
  console.log(currentquestion)

  question.innerText = currentquestion.question;


  //LOADING CHOICE FOR EACH CHOICE COLUMN---->GETTING RESPECTIVE DATASET NUMBER AND UPDATE ITS INNERHTML
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    
    choice.innerText = currentquestion["choice"+ number]

  });

  //REMOVING CURRENT QUESTION
  availablequestion.splice(questionindex, 1);
  acceptanswer = true;
};
 

//
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptanswer)
      return;
    acceptanswer = false;
    const selectedchoice = e.target;
    const selectanswer = selectedchoice.dataset["number"];
    const classtoapply=selectanswer==currentquestion.answer?"correct":"incorrect";
    if(classtoapply=='correct')
    incrementscore(correct_bonus)
    selectedchoice.parentElement.classList.add(classtoapply);
    setTimeout(()=>{
    selectedchoice.parentElement.classList.remove(classtoapply);
    getnewquestion();},1000);
  });
});
incrementscore=num=>{
  score+=num;
  scoretext.innerText=score;
}
