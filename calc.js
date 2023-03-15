'use strict';
const id = id => document.getElementById(id);

const questionElement = id('question');
const submit = id('submit');
const answer = id('answer');
const resultElement = id('result');
const keta = id('keta');
const nums = id('nums');
const between = id('between');
const start = id('start');

let numarray = [];
let correctAnswer = null;

function generateQuestion() {
  for (let i = 0; i <= parseInt(nums.value, 10) - 1; i++) {
    numarray.push((Math.floor((Math.random() * 100000000))) % (10**(parseInt(keta.value, 10))-1-10**(parseInt(keta.value, 10)-1)) + 10**(parseInt(keta.value, 10)-1));
  }

  correctAnswer = numarray.reduce((acc, cur) => acc + cur);
}

start.onclick = () => {
  let bets = parseFloat(between.value, 10);
  generateQuestion();
  window.setTimeout(() => {
    questionElement.innerText = '3秒前';
    window.setTimeout(() => {
      questionElement.innerText = '';
      window.setTimeout(() => {
        questionElement.innerText = '2秒前';
        window.setTimeout(() => {
          questionElement.innerText = '';
          window.setTimeout(() => {
            questionElement.innerText = '1秒前';
            window.setTimeout(() => {
              questionElement.innerText = '';
            }, 950)
          }, 50)
        }, 950)
      }, 50)
    }, 950)
  }, 10)
  window.setTimeout(() => {
    for (let i = 1; i <= numarray.length; i++) {
      window.setTimeout(() => {
        id('frash').currentTime = 0;
        id('frash').play();
        questionElement.innerText = numarray.shift();
        window.setTimeout(() => {
          questionElement.innerText = '';
        }, bets*1000*i-100)
      }, bets*1000*i)
    }
  }, 3100 - bets*1000)
};

submit.onclick = () => {
  const userAnswer = parseInt(answer.value, 10);

  if (userAnswer === correctAnswer) {
    resultElement.innerHTML = '御明算！（正解）';
  } else {
    resultElement.innerHTML = '残念、不正解です。<br>正解は、' + correctAnswer + 'です。';
  }
};

document.body.onkeydown = (e) => {
  if(e.key==='Enter') {submit.onclick();}
}