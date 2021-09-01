var questions = [
	{
		question: "What is the baby of a Moth known as?",
		choices: ["baby", "infant", "kit", "larva"],
		correctAnswer: 3,
	},
	{
		question: "What is the adult of a kid called",
		choices: ["calf", "doe", "goat", "chick"],
		correctAnswer: 2,
	},
	{
		question: "What is the young of Bufallo called?",
		choices: ["calf", "baby", "pup", "cow"],
		correctAnswer: 0,
	},
	{
		question: "What a baby Aligator called?",
		choices: ["baby", "gator", "hatchling", "calf"],
		correctAnswer: 2,
	},
	{
		question: "What is a baby Goose called?",
		choices: ["gooser", "gosling", "gup", "pup"],
		correctAnswer: 1,
	},
	{
		question: "What is a baby Hamster called?",
		choices: ["pup", "chick", "infant", "billy"],
		correctAnswer: 0,
	},
	{
		question: "What is a baby Hawk called?",
		choices: ["hawklett", "pup", "larva", "eyas"],
		correctAnswer: 3,
	},
	{
		question: "What is a baby grasshopper called?",
		choices: ["hopper", "nymph", "stick", "pup"],
		correctAnswer: 1,
	},
	{
		question: "What is a baby Kangaroo called?",
		choices: ["kinga", "joey", "calf", "baby"],
		correctAnswer: 1,
	},
	{
		question: "What is a baby Whale called?",
		choices: ["whala", "cub", "grub", "infant"],
		correctAnswer: 1,
	},
	{
		question: "What is a baby Monkey called?",
		choices: ["infant", "baby", "calf", "pup"],
		correctAnswer: 0,
	},
	{
		question: "What is a baby Bear Called?",
		choices: ["cub", "baby balu", "young bear", "bearlet"],
		correctAnswer: 0,
	},
];

var currentQuestion = 0;
var correctAnswers = [];
var quizOver = false;

$(document).ready(function () {
	displayCurrentQuestion();
	var curValue = null;
	$(this).find(".quizMessage").hide();

	$(this)
		.find(".nextButton")
		.on("click", function () {
			if (!quizOver) {
				value = $("input[type='radio']:checked").val();

				if (value == undefined) {
					$(document).find(".quizMessage").text("Please select an answer");
					$(document).find(".quizMessage").show();
				} else {
					$(document).find(".quizMessage").hide();

					if (value == questions[currentQuestion].correctAnswer) {
						correctAnswers.push(1);
					} else {
						correctAnswers.push(0);
					}

					currentQuestion++;

					if (currentQuestion < questions.length) {
						displayCurrentQuestion();
					} else {
						displayScore();
						$(document).find(".nextButton").text("Play Again?");
						quizOver = true;
					}
				}
			} else {
				quizOver = false;
				$(document).find(".nextButton").text("Next Question");
				resetQuiz();
				displayCurrentQuestion();
				hideScore();
			}
		});
	$(this)
		.find(".backButton")
		.on("click", function () {
			if (currentQuestion <= 0) {
				$(document).find(".quizMessage").hide();
				$(document).find(".quizMessage").text("No more previous question");
				$(document).find(".quizMessage").show();
			} else {
				$(document).find(".quizContainer > .result").hide();
				$(document).find(".quizMessage").hide();
				currentQuestion--;
				correctAnswers.pop();
				displayCurrentQuestion();
			}
		});

	$(document).on("click", ".choice", function () {
		$(this).find("input[type=radio]").prop("checked", "true");
		$(".active").removeClass("active");
		$(this).addClass("active");
	});
});
var optionsArr = ["A", "B", "C", "D", "E"];

function displayCurrentQuestion() {
	var question = questions[currentQuestion].question;
	var questionClass = $(document).find(".quizContainer > .question");
	var choiceList = $(document).find(".quizContainer > .choiceList");
	var numChoices = questions[currentQuestion].choices.length;
	$(questionClass).text(
		currentQuestion + 1 + ". of " + questions.length + " " + question
	);
	$(choiceList).find("li").remove();

	var choice;
	var option;
	for (i = 0; i < numChoices; i++) {
		option = optionsArr[i];
		choice = questions[currentQuestion].choices[i];
		$(
			"<li value=" +
				i +
				' class="choice btn btn-outline-primary" style="font-size:1.2em;font-weight:600;width:250%;text-align:start;"><input type="radio" value=' +
				i +
				' name="btnradio" />' +
				option +
				". " +
				choice +
				"</li>"
		).appendTo(choiceList);
	}
}

function resetQuiz() {
	currentQuestion = 0;
	correctAnswers = 0;
	hideScore();
}

function displayScore() {
	var sumed = 0;
	for (let i = 0; i < correctAnswers.length; i++) {
		sumed += correctAnswers[i];
	}
	$(document)
		.find(".quizContainer > .result")
		.text("You scored: " + sumed + " out of: " + questions.length);
	$(document).find(".quizContainer > .result").show();
}

function hideScore() {
	$(document).find(".result").hide();
}
