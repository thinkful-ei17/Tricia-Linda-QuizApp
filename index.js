//modify DOM - hit start then go to next view
'use strict';

const listQUESTIONS = [{
  question: 'What is the largest land animal in the world?',
  a1: 'Elephant',
  a2: 'Human',
  a3: 'Hippo',
  a4: 'Dinosaur',
  answer: 'a1',
  comment: function() {
    return (this.al);
  },
},
{
  question: 'Groups of lions are known as what?',
  a1: 'Gangs',
  a2: 'Packs',
  a3: 'Pride',
  a4: 'Herd',
  answer: 'a3',
  comment: function() {
    return (this.a3);
  }
},

{
  question: 'What is the fastest land animal in the world?',
  a1: 'Leopard',
  a2: 'Cheetah',
  a3: 'Elephant',
  a4: 'Iganua',
  answer: 'a2',
  comment: function() {
    return (this.a2);
  }
},
{
  question: 'What can cats see that humans cannot?',
  a1: 'Ghosts',
  a2: 'Dust',
  a3: 'Sound',
  a4: 'Ultraviolet light',
  answer: 'a4',
  comment: function() {
    return (this.a4);
  }
},
{
  question: 'How many hours can a puppy sleep a day?',
  a1: '5 to 20 hours',
  a2: '10 to 15 hours',
  a3: '18 to 20 hours',
  a4: '24 hours',
  answer: '18 to 20 hours',
  comment: function() {
    return (this.a3);
  }
}


];

const STORE = {
  index: 0,
  numberOfQuestions: listQUESTIONS.length,
  currentCorrectNum: 0,
  startQuiz: false,
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
    STORE.startQuiz = true;
    displayQuestion();
  });
}

function displayQuestion() {
  //display the question and 4 answers
  //display the SUBMIT button

  let currentQuestion = questionTemplate();
  $('.question').html(currentQuestion);
  $('.buttons').append('<button class="submit">Submit</button>');
  $('.next').remove();

  displayStatus();

}

//display current status
//display correctly answered

function displayStatus() {
  $('.status').append(`<p> You have completed ${STORE.index+1} out of ${STORE.numberOfQuestions} </p> total questions.`);
  $('.status').append(`<p> You have answered ${STORE.currentCorrectNum} correct, out of ${STORE.numberOfQuestions} total questions</p>`);
  handleAnswerClick();
}

function handleAnswerClick() {
  $('.submit').click(event => {
    let answer = $('input[name="answer"]:checked').val();

    console.log(`User selected answer: ${answer}`);
    if (answer === listQUESTIONS[STORE.index].answer) {
      STORE.currentCorrectNum += 1;
    }
    console.log(`The current correct answers are: ${STORE.currentCorrectNum}`);

    $('.question').append(listQUESTIONS[STORE.index].answer === answer ? '<p>Congratulations, your answer is correct</p>' : '<p>the correct answer is: </p>', listQUESTIONS[STORE.index].comment());


    $('.buttons').append('<button class="next">Next</button>');
    $('form').remove();
    $('.status').remove();
    $('.submit').remove();
    displayStatus();
    handleNextClick();
  });
}

function handleNextClick() {
  //show the answer
  //show status
  $('.next').click(event => {
    console.log('User hit the Next button');
    STORE.index += 1;
    displayQuestion();



  });

}


startApp();