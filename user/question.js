let question = document.getElementById('question');
let option1 = document.getElementById('opt1');
let option2 = document.getElementById('opt2');
let option3 = document.getElementById('opt3');
let option4 = document.getElementById('opt4');

let show = document.getElementById('show');

let answers = document.getElementsByName('answers');

let changing_submit = document.getElementById('submit');

let quizCount = 0;

let score = 0;


const lc = localStorage.getItem('category');
const quizQuestions = []

let loadQuestion =  ()=>{
    firebase.database().ref("QUIZ").child(lc).on('child_added', function (data) {
        quizQuestions.push(data.val())
        // console.log(quizQuestions);
        question.innerText = quizQuestions[quizCount].question;
        option1.innerText =  quizQuestions[quizCount].option1;
        option2.innerText =  quizQuestions[quizCount].option2;
        option3.innerText =  quizQuestions[quizCount].option3;
        option4.innerText =  quizQuestions[quizCount].option4;
    });

}

loadQuestion();

let checkedAnswer = ()=>{
    let answer;
     answers.forEach((CurrentAnswer)=>{
            if(CurrentAnswer.checked){
                   answer = CurrentAnswer.id;
            }
     })
   return answer;
}

let deselect = ()=>{
    answers.forEach((CurrentAnswer) =>CurrentAnswer.checked = false)
}


let submit = ()=>{
    answer = checkedAnswer();
    // console.log(answer)

    if(answer === quizQuestions[quizCount].answer){

        score++;
         localStorage.setItem('score',score)
         
    }
    quizCount++;


    if(quizCount < quizQuestions.length){
            

        loadQuestion();
        deselect();
        
    }
    else{
        window.location.href = 'result.html';
    }

  
       
    if(quizQuestions.length-1 == quizCount){
        changing_submit.innerText = 'SUBMIT'
        changing_submit.className = "btn btn-primary"

    }
        
}

let localQuizQuestions = localStorage.setItem('localQuizQuestions',quizQuestions.length)





