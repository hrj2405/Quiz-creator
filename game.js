const question =document.querySelector('#question');
const choices=Array.from(document.querySelectorAll('.choice-text'));
const progressText=document.querySelector('#progressText');
const scoreText=document.querySelector('#score');
const progressBarFull =document.querySelector('#progressBarFull');

let currentQuestion={}
let acceptingAnswers=true
let score=0
let questionCounter=0
let availableQuestions=[]

let questions=[
    {
    question:'The Battle of Plassey was fought in',
    choice1:'1757',
    choice2:'1748',
    choice3:'1782',
    choice4:'1764',
    answer:1,
},
{
    question:'That pig ____ very fat',
    choice1:'the',
    choice2:'away',
    choice3:'is',
    choice4:'my',
    answer:3,
},
{
    question:'Tripitakas are sacred books of',
    choice1:'Buddhists',
    choice2:'Hindus',
    choice3:'Jains',
    choice4:'Muslims',
    answer:1,
},{
    question:"845 x 856 -263 ?",
    choice1:"723085",
    choice2:"725486",
    choice3:"723058",
    choice4:"723057",
    answer:4,
},
{
    question:"B.C. Roy Award is given in the fiecd of",
    choice1:"Music",
    choice2:"Medicine",
    choice3:"Journalism",
    choice4:"Environment",
    answer:2,
}


]

const SCORE_POINTS=100
const MAX_QUESTIONS=5

startGame=() => {
    questionCounter =0
    score=0
    availableQuestions=[...questions]
    getNewQuestion()
}
getNewQuestion=() => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score)

        return window.location.assign('end.html')
    }
    questionCounter++
    progressText.innerText=`Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width =`${(questionCounter/MAX_QUESTIONS) * 100}% `
 
    const questionsIndex =Math.floor(Math.random() * availableQuestions.length)
    currentQuestion =availableQuestions[questionsIndex]
    question.innerText=currentQuestion.question

    choices.forEach(choice => {
        const number =choice.dataset['number']
        choice.innerText=currentQuestion['choice'+number]
    })
   
    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers=true

}
choices.forEach(choice => {
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswers =false
        const selectedChoice =e.target
        const selectedAnswer =selectedChoice.dataset['number']

        let classToApply =selectedAnswer == currentQuestion.answer ? 'correct':'incorrect'

        if(classToApply ==='correct'){
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000)
   })
})

incrementScore =num =>{
    score +=num
    scoreText.innerText =score
}

startGame()