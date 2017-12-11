//modify DOM - hit start then go to next view
'use strict';

const listQUESTIONS = [{
  nameQuestion: "Question 1",
  textQuestion: "textstring",
  textOptions: "optionstring",
  textAnswer: "answerstring",
},
{
  nameQuestion: "Question 2",
  textQuestion: "textstring",
  textOptions: "optionstring",
  textAnswer: "answerstring",
},
{
  nameQuestion: "Question 3",
  textQuestion: "textstring",
  textOptions: "optionstring",
  textAnswer: "answerstring",
}
];

const STORE = {


};
//if app switch statement - start, question, answer, result
//current state of start; then run start app
//if in question state, put out quenstions, etc


function startApp() {
  $('.start').on('click', function(event){
    console.log('testStart');
    event.preventDefault();
    $('h1').remove();
    $('h2').remove();
    //event.currentTarget.closest
    $('.question').append(`<p> ${listQUESTIONS[0].textOptions} </p>`);
    //console.log(listQUESTIONS[0].textOptions);
    $('.view').append(`<button class="submit">Submit</button>`);
    $('.start').remove();
  });
}

startApp();