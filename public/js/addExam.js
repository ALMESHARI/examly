function addChoice(btn) {
        btn.insertAdjacentHTML('beforebegin', '<li><input class="choice-text" placeholder="CHOICE"></input></li>')
}

function sendExam(btn) {
        // document.querySelector('#exam-form').action = window.location.href + '/reviewExam'
        let questions = []
        let correct_Answers = []
        let questionsElements = document.querySelectorAll('.question')
        let examName = document.querySelector('.exam-name').value
        let examDes = document.querySelector('.exam-description').value

        for (question of questionsElements) {
                let questionText = question.querySelector('.question-text').value

                let answers = []
                let answersElements = question.querySelectorAll('.choice-text')
                for (choice of answersElements) {
                        answers.push(choice.value)
                }
                correct_Answers.push(answers[0])//first answer is the right one
                questions.push({ question: questionText, answers:answers })
        }

        

        let exam = { examName: examName,examDes:examDes, questions: questions, correct_Answers: correct_Answers }
        console.log(exam)
        fetch(window.location.pathname + '/data', {
                
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(exam)
        }).then(response => {
                // HTTP 301 response
                // HOW CAN I FOLLOW THE HTTP REDIRECT RESPONSE?
                if (response.redirected) {
                        window.location.href = response.url;
                }
        })

        

}
function addQuestion(btn) {
        btn.insertAdjacentHTML('beforebegin', '<div id="1" class="question"><textarea class= "question-text" placeholder = "WRITE QUESTION HERE AND CHOSE THE CORRECT CHOICE"></textarea><div class="addanswers"><ol><li><input class="choice-text correct" placeholder="CORRECT ANSWER"></input></li><div class="add-question" onclick=addChoice(this)><h4>+ ADD CHOICE</h4></div></ol></div></div>')
}