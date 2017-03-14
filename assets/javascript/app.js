
$(document).ready(function() {

    
$("#start-btn").on("click", function(){
	$("#game-area").removeClass("hidden");
	$("#timer").removeClass("hidden");
	$("body").removeClass("open-page");
	$(this).addClass("hidden");
	$(".timerBar").addClass("timer-start");
	trivia.game.start();
});


var i = 0;
var time = 10;
var wrongA = 0;
var correctA= 0;
var unanswerA = 0;
var intervalId; 

var trivia = {


     questionbank : [{ 
	        "question": "How many % of the world\'s population struggles to gain access to safe drinking water every day?",
            "options": ["1.3%", "5%" ,"20%","17%"],
            "answer": "20%",
        },{
            "question": "How many children die each day from contaminated water?",
            "options": ["1,000","30,000","10,999","20,000"],
            "answer": "30,000",
        },{
           "question": "What is NOT an element that water is made up of?",
           "options": ["hydrogen", "oxygen", "osmium"],
           "answer": "osmium"
       },{
          "question": "Half of the world's hospital beds are filled with people suffering from a water-related disease.",
          "options": ["True", "False"],
          "answer": "True"
       },{
          "question": "What is NOT an efficient solution to water crisis in Africa?",
          "options": ["Wells","Dams","Rain catchment","Power plant"],
          "answer": "Power plant"
       },{
       	  "question": "Nearly 97% of the world\'s water is salty or otherwise undrinkable.",
          "options": ["True","False"],
          "answer": "True"

      },{
       	  "question": "Who are mainly responsible for collecting water in most developing countries?",
          "options": ["Men","Boys","Women"],
          "answer": "Women"
       }],


	game: { 
            

		  start: function(){

                 $("#timer-time").html(time);
                 trivia.timer.reset();
                 trivia.timer.start(); 
                 $("#question").text(trivia.questionbank[i].question);
                 
                 for (var j = 0; j < trivia.questionbank[i].options.length; j++){
                        	var optionBtn = $("<button><h4>"+trivia.questionbank[i].options[j]+"</h4></button></br>");
                        	optionBtn.attr("optiondata",trivia.questionbank[i].options[j]);
                        	optionBtn.attr("type","button");
                        	optionBtn.addClass("btn");
                        	optionBtn.addClass("btn-default");
                        	optionBtn.addClass("option-btn");
                        	optionBtn.attr("value","Input Button");
                        	$("#options").append(optionBtn); 
                        	                              
                          }

                    
                      $(".option-btn").on("click",function(){

                          trivia.timer.stop();


                                        var FinalGuess= $(this).attr("optiondata");
                                        var FinalAnswer= trivia.questionbank[i].answer;
                                        
                                        console.log(FinalAnswer);
                                        console.log(FinalGuess);

                                        if(FinalGuess===FinalAnswer){
                                          alert("Correct!");
                                          correctA++;
                                        }
                              
                                         else {
                                         alert("nope!");
                                         wrongA++;

                                             }
                                    i++; 
                                    console.log(i);
                                    $("#options").empty();
                                    setTimeout(trivia.game.start(), 9000);
                                    $("#timer-time").html(time);   
                                  });


                    if( i === trivia.questionbank.length-1) {
                                      trivia.timer.stop();
                                       $("#results").removeClass("hidden");
                                       $("#timer").addClass("hidden");
                                       $("#correct-count").text(correctA);
                                       $("#wrong-count").text(wrongA);
                                       $("#unanswer-count").text(unanswerA); 

                                          $("#again-btn").on("click",function(){
                                               i = 0; 
                                               $("#results").addClass("hidden");
                                               $("#options").empty();
                                               trivia.game.start();
                                               $("#timer").removeClass("hidden");
                                               $("#timer-time").html(time);
                                          });
                                     }
              
             }
            },
	
    
   timer: {
             start: function() {
               intervalId = setInterval(trivia.timer.count, 1000);
                            },                         

   
             stop: function() {
                  clearInterval(intervalId);
                 },

             reset: function(){
             	time = 10;

             },
             
             count: function() {
                time--;
                $("#timer-time").html(time);

      if(time < 0){ 
                         
            trivia.timer.stop();
            alert("timeout!");
            unanswerA++;

            i++; 
            console.log(i);
            $("#options").empty();
            $("#timer-time").html(time); 
            trivia.timer.reset();
            trivia.game.start(); 
                    }
               
       }
   }

}



 console.log(trivia.questionbank);

});