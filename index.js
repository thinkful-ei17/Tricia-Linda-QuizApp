//modify DOM - hit start then go to next view
'use strict';

const listQUESTIONS = [{
  question: 'In what year were the Cleveland Browns established?',
  a1: '1946',
  a2: '1963',
  a3: '1952',
  a4: '1950',
  answer: "a1",
  comment: 'The correct answer is 1946.   Paul Brown, who was once called the \'father of modern football\', was the team\'s namesake and first coach. From the beginning of play in 1946 at Cleveland Municipal Stadium, the Browns were a great success'
},
{
  nameQuestion: 'Question 2',
  textQuestion: 'textstring',
  textOptions: 'optionstring',
  textAnswer: 'answerstring',
},
{
  nameQuestion: 'Question 3',
  textQuestion: 'textstring',
  textOptions: 'optionstring',
  textAnswer: 'answerstring',
}
];

const STORE = {
  index: 0,
  numberOfQuestions: listQUESTIONS.length,
  currentCorrectNum: 0,
};
//if app switch statement - start, question, answer, result
//current state of start; then run start app
//if in question state, put out quenstions, etc


function questionTemplate() {
  return `<form>
  <div>
  <p class= "questionTitle">${listQUESTIONS[STORE.index].question}</p>
    <input type="radio" id="Choice1"
     name="answer" value="a1">
    <label for="answerChoice1">${listQUESTIONS[STORE.index].a1}</label>

    <input type="radio" id="Choice2"
    name="answer" value="a2">
   <label for="answerChoice1">${listQUESTIONS[STORE.index].a2}</label>

    <input type="radio" id="Choice3"
    name="answer" value="a3">
    <label for="answerChoice1">${listQUESTIONS[STORE.index].a3}</label>

    <input type="radio" id="Choice4"
    name="answer" value="a4">
  <label for="answerChoice1">${listQUESTIONS[STORE.index].a4}</label>
  </div>
</form>`;
}

function startApp() {
  $('.start').on('click', function(event) {
    console.log('testStart');
    event.preventDefault();
    $('h1').remove();
    $('h2').remove();
    //event.currentTarget.closest
    $('.start').remove();
    displayQuestion();
  });
}

function displayQuestion() {
  //display the question and 4 answers
  //display the SUBMIT button

  let currentQuestion = questionTemplate();
  $('.question').html(currentQuestion);
  $('.buttons').append('<button class="submit">Submit</button>');
  displayStatus();

}

//display current status
//display correctly answered

function displayStatus() {
  $('.status').append(`<p> ${STORE.index + 1} out of ${STORE.numberOfQuestions} </p>`);
  $('.status').append(`<p> ${STORE.currentCorrectNum} correct, ${STORE.numberOfQuestions} total </p>`);
  handleAnswerClick();
}

function handleAnswerClick() {
  $('.submit').click( event => { 
    let answer = $('input[name="answer"]:checked').val();
    console.log('we clicked the submit button');
    console.log(answer);
    if (answer === listQUESTIONS[STORE.index].answer) {
      STORE.currentCorrectNum += 1;
    }
  }
  );
}

startApp();