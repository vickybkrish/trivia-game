$('#start').on('click', function() {
	$('#start').remove();
	game.loadQuestion();
});

$(document).on('click', '.answer-button', function(e){
	game.clicked(e);
});

$(document).on('click', '#reset', function(){
	game.reset();
});

var audio = new Audio("assets/audio/harry_potter_bgm.mp3");
audio.play();  
audio.loop = true;


//e is typically used for events

var questions = [{
	question: "Who unwittingly gives Hermione permission to take Most Potente Potions out of the Restricted Section in the library?",
	answers: ["Professor Flitwick", "Professor Lockhart", "Professor Snape", "Professor McGonagall"],
	correctAnswer: "Professor Lockhart",
	image: "assets/images/lockhart.gif",
}, {
	question: "What secret name do Harry, Ron and Hermione use to refer to Sirius Black?",
	answers: ["Snuffles", "Prongs", "Padfoot", "Griphook"],
	correctAnswer: "Snuffles",
	image: "assets/images/sunffles.gif",
}, {
	question: "What is the name of Dumbledore's Phoenix?",
	answers: ["Quakes", "Hedwig", "Fawkes", "Witherwings", "Griphook"],
	correctAnswer: "Fawkes",
	image: "assets/images/fawkes.gif",
}, {
	question: "What is the name of the sweet that Dudley eats when the Weasleys visit Privet Drive in Harry Potter and the Goblet of Fire??",
	answers: ["Fainting Fancy", "Nosebleed Nogaut", "Ton-Tongue Toffee", "Peruvian chocolate", "Puking pastle"],
	correctAnswer: "Ton-Tongue Toffee",
	image: "assets/images/dudley.gif",
}, {
	question: "What is the name of the dragon Harry encounters during the first task in Triwizard Tournament?",
	answers: ["Norberta", "Norwedigian Ridgeback", "Hungarian Horntail", "Grwap"],
	correctAnswer: "Hungarian Horntail",
	image: "assets/images/hungarian.gif",
}, {
	question: "What is the name of Griffindor's ghost?",
	answers: ["Bloody Baron", "Peeves", "Headless Nick", "Fat Lady", "Grey Lady"],
	correctAnswer: "Headless Nick",
	image: "assets/images/headless nick.gif",
}];

var game = {
	questions: questions,
	currentQuestion: 0,
	counter: 30,
	correct: 0,
	incorrect: 0,
	unanswered: 0,
	countDown: function() {
		game.counter--;
		$('#counter').html(game.counter);
		if(game.counter <= 0){
			console.log("time Up!");
			game.timeUp();
		}
	},
	loadQuestion: function(){
		timer = setInterval(game.countDown,1000);
		//add timer to the page
		$('#subwrapper').html("<h2>Time Remaining: <span id='counter'>30</span> seconds</h2>");
		//posts the question to the page
		$('#subwrapper').append("<h2>"+ questions[game.currentQuestion].question+"</h2>");
		//posts the answers to the corresponging question
		for(var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
			$('#subwrapper').append('<button class="btn btn-primary answer-button disable" id="button-'+i+'" data-name="'+ questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
		}
		
	},
	nextQuestion: function(){
		game.counter = 30;
		$('#counter').html(game.counter);
		game.currentQuestion++;
		game.loadQuestion();
	},
	timeUp: function(){
		clearInterval(timer);
		game.unanswered++;
		$('#subwrapper').html('<h2>OUT OF TIME</h2>');
		$('#subwrapper').append('<h3>The correct answer was: '+ questions[game.currentQuestion].correctAnswer + "</h3>");
		$('#subwrapper').append($("<img>").attr("src", questions[game.currentQuestion].image));
		if(game.currentQuestion == questions.length-1) {
			setTimeout(game.results, 3*1000);
		}
		else {
			setTimeout(game.nextQuestion, 3 * 1000);
		}

	},
	results: function(){
		clearInterval(timer);
		$('#subwrapper').html("<h2> All Done! </h2>");
		$('#subwrapper').append("<h3>Correct: " + game.correct + "</h3>");
		$('#subwrapper').append("<h3>Incorrect: " + game.incorrect +"</h3>");
		$('#subwrapper').append("<h3>Unanswered: " + game.unanswered + "</h3>");
		$('#subwrapper').append('"<br> <img src="assets/images/final.gif" style="width: 300px; height: auto" >"');
		$('#subwrapper').append("<br> <br> <button class='btn btn-success' id='reset'>RESET</button>");
		

		// console log the scores of the questions below (cumulative)
		console.log(game.unanswered + game.correct + game.incorrect);
	},
	clicked: function(e){
		jQuery.fn.extend({
    disable: function(state) {
        return this.each(function() {
            this.disabled = state;
        });
    }
	});

	// Disabled with:
	$('input[type="submit"], input[type="button"], button').disable(true);
		clearInterval(timer);
		if($(e.target).data("name") == questions[game.currentQuestion].correctAnswer) {
			game.answeredCorrectly();
		} 
		else {
			game.answeredIncorrectly();
		} 
	},
	answeredCorrectly: function(){
		console.log("you nailed it");
		clearInterval(timer);
		game.correct++;
		$('#subwrapper').append('<h2>YOU GOT IT RIGHT</h2><br><img src="' + questions[game.currentQuestion].image +'" style="width: 300px; height: auto">');

		if(game.currentQuestion == questions.length-1) {
			setTimeout(game.results, 3 * 1000);
		}
		else {
			setTimeout(game.nextQuestion, 3 * 1000);
		}

	},
	answeredIncorrectly: function(){
		console.log("wrong, try again");
		clearInterval(timer);
		game.incorrect++;
		$('#subwrapper').html('<h2>Wrong answer, next question!<h2><br><img src="assets/images/ron.gif" style="width: 300px; height: auto" alt="Boo!">');
		if(game.currentQuestion == questions.length-1) {
			setTimeout(game.results, 3 * 1000);
		}
		else {
			setTimeout(game.nextQuestion, 3 * 1000);
		}
	},
	reset: function(){
		//reset back to original state
		game.currentQuestion = 0;
		game.counter = 30;
		game.correct = 0;
		game.incorrect = 0;
		game.unanswered = 0;
		game.loadQuestion();
	},

	


} 
