import { quizData } from './quiz.js';

const { quizTitle, questionList } = quizData;

const quizTitleHeading = document.getElementById('quiz-title');
const questionArea = document.getElementById('question-area');
const choiceButtons = document.querySelectorAll('.choice-button');
const resultArea = document.getElementById('result-area');
const nextQuestionButton = document.getElementById('next-question');

let currentQuestionIndex = 0;

quizTitleHeading.textContent = quizTitle;
renderQuestion();

choiceButtons.forEach(button =>
	button.addEventListener('click', handleOptionClick),
);
nextQuestionButton.addEventListener('click', handleNextQuestionClick);

function renderQuestion() {
	const currentQuestion = questionList[currentQuestionIndex];
	questionArea.textContent = currentQuestion.question;
	choiceButtons.forEach((button, i) => {
		button.textContent = currentQuestion.options[i];
		button.disabled = false;
		button.style.display = 'block';
	});
	resultArea.textContent = '';
    resultArea.style.display = 'none';
	nextQuestionButton.style.display = 'none';
}

function handleOptionClick(event) {
	const selectedButton = event.target;
    const currentQuestion = questionList[currentQuestionIndex];
	const isCorrect = selectedButton.textContent === currentQuestion.options[currentQuestion.correctIndex];
	resultArea.textContent = isCorrect
		? 'Correct answer! Great job.'
		: 'Sorry, that is not correct.';
	choiceButtons.forEach(button => (button.disabled = true));
    resultArea.style.display = 'block';
	nextQuestionButton.style.display = 'block';
}

function handleNextQuestionClick() {
	currentQuestionIndex++;
	if (currentQuestionIndex === questionList.length) {
		questionArea.textContent = 'Quiz Completed';
		resultArea.textContent = `Thank you for playing!`;
		choiceButtons.forEach(button => {
			button.style.display = 'none';
		});
		nextQuestionButton.style.display = 'none';
	} else {
		renderQuestion();
	}
}