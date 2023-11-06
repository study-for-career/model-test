 let questions = [];
 const userName = document.querySelector('#userName');
 const alertBox = document.querySelector('#alert-box');

    fetch('https://script.googleusercontent.com/macros/echo?user_content_key=OWZxWqCfOff3C2-x4wDLoRVmIuo_UA_pukkK6s0NcMT4EZ8I4ZTmVbVt_J9XTwS37U8RAN5hBejr4lXk0n7FY3LmxpOghStcm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnEQvSjX_3Nyh3EI6_5z1rKzCCY_E9OWz6p7UeEXX7bnFfp5fJJsHLwFiPQZDZzTFBUJjalhm7DSQz9Q2nrIuFjNmE83eygiXVg&lib=MoxRe8bhSOosuLoF0eYV9CX9pvBciOz3Z')
    .then( res => res.json())
    .then(data => {
        // console.log(data.content);
      questions = data.content.map(function(array){
            //console.log(array);
           return {
                question: array[0],
                options: [array[1], array[2], array[3], array[4]],
                answer: array[5]
            }
        })

        loadQuestion();
    })



let currentQuestionIndex = 0;
let score = 0;
let NA = 0;

const nextBtn = document.querySelector('#next');
let questionArea = document.querySelector('#question');
let optionArea = document.querySelector('#optionArea');
const appContainer = document.querySelector('.app-container');

function startQuiz() {
    const userInfoForm = document.getElementById('userInfo');
    
    if(userName.value == ''){
        alertBox.innerHTML = 'Please fill the form correctly.'
        alertBox.style.color = 'red';
    } else {
        userInfoForm.style.display = 'none';
        const mcqArea = document.createElement('div');
        mcqArea.classList.add('mcq-area');
        mcqArea.innerHTML = `
          <h1 id="question"></h1>
          <ul id="optionArea"></ul>
          <button onclick="checkSelection()" id="next">Next</button>
        `;
    
        appContainer.innerHTML = '';
        appContainer.appendChild(mcqArea);
    
        // Get the updated questionArea and optionArea after creating the mcq-area
        questionArea = document.querySelector('#question');
        optionArea = document.querySelector('#optionArea');
    
        loadQuestion();
    }

}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
    questionArea.innerText = `${questionNumber}. ${currentQuestion.question}`;
    optionArea.innerHTML = "";

    currentQuestion.options.forEach((option) => {
        const li = document.createElement('li');
        li.innerText = option;
        optionArea.appendChild(li);
        li.addEventListener('click', function() {
            selectOption(option);
        });
    });
}


// finding the correct answer here.

function selectOption(selectedOption){
    const options = document.querySelectorAll('li');
    options.forEach(option=>{
        option.classList.remove('selected');
       
        if(option.innerText == selectedOption){
            option.classList.add('selected');
            
            if(selectedOption == questions[currentQuestionIndex].answer){
                option.classList.add('correct');
                score++;
            } else {
                option.classList.add('incorrect');
                
            }
        }
        option.style.pointerEvents = 'none';
    })
}


// checking if the answers were selected or not.

function checkSelection(){
    
    const isSelected = document.querySelector('li.selected');
    if(!isSelected){
        NA++;
    }
    
  // go to the next questions. 

    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length){
        loadQuestion();
    } else {

    const finalResult = `      
    <div class="resultPage"> 
    <p><span>&#9758;</span> স্ক্রিনশট নিন </p> 
    <p><span>&#9758;</span> গ্রুপ: <a href='https://www.facebook.com/groups/group.studyforcareer'>Group Study for Career👑</a> </p> 
    <h2>Result of <br> ${userName.value}</h2>
    <h2 id="score">${score - (((questions.length) - (score+NA))/4)}</h2>
    <table>
        <tr>
            <th>Questions</th>
            <th class="correctAnswer">Correct</th>
            <th class="wrongAnswer">Wrong</th>
            <th>N/A</th>
        </tr>
        <tr>
            <td>${questions.length}</td>
            <td class="correctAnswer">${score}</td>
            <td class="wrongAnswer">${(questions.length) - (score+NA)}</td>
            <td>${NA}</td>
        </tr>
    </table>
    </div>`
    appContainer.innerHTML = finalResult;
}
    }



 




