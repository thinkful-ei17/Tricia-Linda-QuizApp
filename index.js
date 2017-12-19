'use strict';
/* global $ */

const listQuestions = [
  {
    question: 'Question 1: What is the largest land animal in the world?',
    option_one: 'Elephant', 
    option_two: 'Human',
    option_three: 'Hippo',
    option_four: 'Dinosaur',
    answer_option: 'option_one',
    answer_text: 'Elephant',
  },
  {
    question: 'Question 2: Groups of lions are known as what?',
    option_one: 'Gangs',
    option_two: 'Packs',
    option_three: 'Pride',
    option_four: 'Herd',
    answer_option: 'option_three',
    answer_text: 'Pride',
  },
  {
    question: 'Question 3: What is the fastest land animal in the world?',
    option_one: 'Leopard',
    option_two: 'Cheetah',
    option_three: 'Elephant',
    option_four: 'Iganua',
    answer: 'Cheetah',
    answer_option: 'option_two',
    answer_text: 'Cheetah',
  },
  {
    question: 'Question 4: What can cats see that humans cannot?',
    option_one: 'Ghosts',
    option_two: 'Dust',
    option_three: 'Sound',
    option_four: 'Ultraviolet light',
    answer_option: 'option_four',
    answer_text: 'Ultraviolet light',

  },
  {
    question: 'Question 5: How many hours can a puppy sleep a day?',
    option_one: '5 to 20 hours',
    option_two: '10 to 15 hours',
    option_three: '18 to 20 hours',
    option_four: '24 hours',
    answer_option: 'option_three',
    answer_text: '18 to 20 hours',
  }
];

const STORE = { 
  questionNum: 0,
  numberOfQuestions: listQuestions.length,
  questionCount: 1,
  currentCorrectCount: 0, 
  view: 'start',
};
//if app switch statement - start, question, answer, result
//current state of start; then run start app
//if in question state, put out quenstions, etc

function questionTemplate() {
  return `<form>
  <div>
  <p class= "questionTitle">${listQuestions[STORE.questionNum].question}</p>
    <input type="radio" id="Choice1"
     name="answer" value="option_one">
    <label for="answerChoice1">${listQuestions[STORE.questionNum].option_one}</label>

    <input type="radio" id="Choice2"
    name="answer" value="option_two">
   <label for="answerChoice1">${listQuestions[STORE.questionNum].option_two}</label>

    <input type="radio" id="Choice3"
    name="answer" value="option_three">
    <label for="answerChoice1">${listQuestions[STORE.questionNum].option_three}</label>

    <input type="radio" id="Choice4"
    name="answer" value="option_four">
  <label for="answerChoice1">${listQuestions[STORE.questionNum].option_four}</label>
  </div>
</form>`;
}

function statusTemplate() {//pass as parameter and other templates!
  return `<p> You have completed ${STORE.questionCount} out of ${STORE.numberOfQuestions}  total questions.</p><p> You have answered ${STORE.currentCorrectCount} correct, out of ${STORE.numberOfQuestions} total questions</p>`;
}

function resultTemplate(feedback) {
  if (listQuestions[STORE.questionNum].answer_option === feedback) {
    return '<p> Congratulations, your answer is correct!</p>';
  } else {
    
    let correctAnswer = listQuestions[STORE.questionNum].answer_text; 
    return `<p>Your answer is incorrect, the correct answer is: ${correctAnswer}</p>`;
  }
}

function startButtonTemplate() {
  return '<button class="start">Start</button>';
}

function submitButtonTemplate() {
  return '<button class="submit">Submit</button>';
}

function nextButtonTemplate() {
  return '<button class="next">Next</button>';
}

function renderPage() { 

  if (STORE.view === 'start') {
    $('h1').show();
    $('h2').show();
    $('.start').show();
    $('.question').hide();
    $('.result').hide();
    $('.status').hide();
    $('.submit').hide();
    $('.remove').hide();
    $('.next').hide();
    $('.form').hide();
    displayQuestion();
  } else if (STORE.view === 'question') {
    $('h1').hide();
    $('h2').hide();
    $('.start').hide();
    $('.question').show();
    $('.result').hide();
    $('.status').hide();
    $('.submit').show();
    $('.next').hide();
    $('.form').show();
  } else if (STORE.view === 'answer') {
    $('h1').hide();
    $('h2').hide();
    $('.start').hide();
    $('.question').hide();
    $('.result').show();
    $('.status').show();
    $('.submit').hide();
    $('.next').show();
    $('.form').hide();
  }
  else if (STORE.view === 'restart') {
    $('h1').show();
    $('h2').show();
    $('.start').show();
    $('.question').hide();
    $('.result').hide();
    $('.status').hide();
    $('.submit').hide();
    $('.remove').hide();
    $('.next').hide();
    $('.form').hide();
  }
}

function startApp() {
  $('.buttons').html(startButtonTemplate);
  handleSubmitClick();
  handleNextClick();
  handleStartClick();
}     

function handleStartClick() {
  $('body').on('click', '.start', function(event) {
    event.preventDefault();
    $('.buttons').html(submitButtonTemplate);
    STORE.view = 'start';
    renderPage();
  }
  );
}

function handleSubmitClick() {
  $('body').on('click', '.submit', function(event) {
    let clickResponse = $('input[name="answer"]:checked').val();

    if (clickResponse === listQuestions[STORE.questionNum].answer_option) {
      STORE.currentCorrectCount += 1;
    }

    displayResults(clickResponse);
    displayStatus();
    $('.buttons').html(nextButtonTemplate);
    STORE.questionNum += 1;
    STORE.questionCount += 1;
    STORE.view = 'answer';
    renderPage();

  });

}

function handleNextClick() {
  $('body').on('click', '.next', function(event) {
    displayQuestion();
  });

}

function displayQuestion() {
  if (STORE.questionNum < STORE.numberOfQuestions) {
    let currentQuestion = questionTemplate();
    $('.question').html(currentQuestion);
    $('.buttons').html(submitButtonTemplate);
    STORE.view = 'question';
    renderPage();
  } 
  else {
    STORE.questionNum = 0; 
    STORE.questionCount = 1;
    STORE.currentCorrectCount = 0;
    $('.buttons').html(startButtonTemplate);
    STORE.view = 'restart';
    renderPage();
  }
}

function displayStatus() {
  let status = statusTemplate();
  $('.status').html(status);

}

function displayResults(input) {
  let results = resultTemplate(input);
  $('.result').html(results);
}

$(startApp());