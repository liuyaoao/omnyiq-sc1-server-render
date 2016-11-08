/**
 * @author Lance Snider - lance@lancesnider.com
*/
//standard resolution images
import glassTopImg1x from "./assets/glassTop.png";
import glassBodyImg1x from "./assets/glassBody.png";
import redVerticalImg1x from  "./assets/redVertical.png";
import tooltipFGImg from "./assets/tickShine.png";
import glassBottomImg1x from "./assets/glassBottom.png";
import tootipPointImg1x from "./assets/tooltipPoint.png";
import tooltipMiddleImg from "./assets/tooltipMiddle.png";
import tooltipButtImg1x from "./assets/tooltipButt.png";

//high res images
import glassTopImg2x from "./assets/glassTop2x.png";
import glassBodyImg2x from "./assets/glassBody2x.png";
import redVerticalImg2x from "./assets/redVertical2x.png";
import tooltipFGImg2x from "./assets/tickShine2x.png";
import glassBottomImg2x from "./assets/glassBottom2x.png";
import tootipPointImg2x from "./assets/tooltipPoint2x.png";
import tooltipMiddleImg2x from "./assets/tooltipMiddle2x.png";
import tooltipButtImg2x from "./assets/tooltipButt2x.png";

import './GoalThermometer.scss'
var GoalThermometer = function(options) {
//editable vars
var goalAmount = 100;//how much are you trying to get
var currentAmount = options.currentAmount;//how much do you currently have (if you want to define in js, not html)
var animationTime = 3000;//in milliseconds
var numberPrefix = "";//what comes before the number (set to "" if no prefix)
var numberSuffix = "&#176;C";//what goes after the number
var tickMarkSegementCount = options.tickCount || 3;//each segement adds 40px to the height
var widthOfNumbers = 28;//the width in px of the numbers on the left
var markerAmount = options.markerAmount;

/////////////////////////////////////////
// ------ don't edit below here ------ //
/////////////////////////////////////////

var arrayOfImages;
var imgsLoaded = 0;
var tickHeight = 40;
var mercuryHeightEmpty = 0;
var numberStartY = 6;
var thermTopHeight = 13;
var thermBottomHeight = 32;
var tooltipOffset = 15;
var markerOffset = 10;
var heightOfBody;
var mercuryId;
var tooltipId;
var markerId;
var resolution2x = false;

var glassTopImg = glassTopImg1x,
		glassBodyImg = glassBodyImg1x,
		redVerticalImg = redVerticalImg1x,
		glassBottomImg = glassBottomImg1x,
		tootipPointImg = tootipPointImg1x,
		tooltipButtImg = tooltipButtImg1x;
//start once the page is loaded
determineImageSet();

//this checks if it's the high or normal resolution images
function determineImageSet(){
	resolution2x = window.devicePixelRatio == 2;//check if resolution2x

	if(resolution2x){
		//switch the regular for 2x res graphics
		glassTopImg = glassTopImg2x;
		glassBodyImg = glassBodyImg2x;
		redVerticalImg = redVerticalImg2x;
		glassBottomImg = glassBottomImg2x;
		tootipPointImg = tootipPointImg2x;
		tooltipButtImg = tooltipButtImg2x;
	}

	createGraphics();
}

//visually create the thermometer
function createGraphics(){

	//add the html
	$("#goal-thermometer").html(
		"<div id='therm-numbers'>" +
		"</div>" +
		"<div id='therm-graphics'>" +
			"<img id='therm-top' src='"+glassTopImg+"'></img>" +
			"<img id='therm-body-bg' src='"+glassBodyImg+"' ></img>" +
			"<img id='therm-body-mercury' src='"+redVerticalImg+"'></img>" +
			"<div id='therm-body-fore'></div>" +
			"<img id='therm-bottom' src='"+glassBottomImg+"'></img>" +
			"<div id='therm-tooltip'>" +
				"<img class='tip-left' src='"+tootipPointImg+"'></img>" +
				"<div class='tip-middle'><p>0&#176;C</p></div>" +
				"<img class='tip-right' src='"+tooltipButtImg+"'></img>" +
			"</div>" +
			"<div id='therm-marker'>" +
				"<span class='fa fa-arrow-left'></span>" +
			"</div>" +
		"</div>"
	);

	//preload and add the background images
	$('<img/>').attr('src', tooltipFGImg).load(function(){
		$(this).remove();
		$("#therm-body-fore").css("background-image", "url('"+tooltipFGImg+"')");
		checkIfAllImagesLoaded();
	});

	$('<img/>').attr('src', tooltipMiddleImg).load(function(){
		$(this).remove();
		$("#therm-tooltip .tip-middle").css("background-image", "url('" + tooltipMiddleImg + "')");
		checkIfAllImagesLoaded();
	});

	//adjust the css
	heightOfBody = tickMarkSegementCount * tickHeight;
	$("#therm-graphics").css("left", widthOfNumbers)
	$("#therm-body-bg").css("height", heightOfBody);
	$("#goal-thermometer").css("height",  heightOfBody + thermTopHeight + thermBottomHeight);
	$("#therm-body-fore").css("height", heightOfBody);
	$("#therm-bottom").css("top", heightOfBody + thermTopHeight);
	mercuryId = $("#therm-body-mercury");
	mercuryId.css("top", heightOfBody + thermTopHeight);
	tooltipId = $("#therm-tooltip");
	tooltipId.css("top", heightOfBody + thermTopHeight - tooltipOffset);
	markerId = $("#therm-marker");
	markerId.css("top", heightOfBody + thermTopHeight - markerOffset);

	//add the numbers to the left
	var numbersDiv = $("#therm-numbers");
	var countPerTick = goalAmount/tickMarkSegementCount;
	var commaSepCountPerTick = commaSeparateNumber(countPerTick);

	//add the number
	for ( var i = 0; i < tickMarkSegementCount; i++ ) {

		var yPos = tickHeight * i + numberStartY;
		var style = $("<style>.pos" + i + " { top: " + yPos + "px; width:"+widthOfNumbers+"px }</style>");
		$("html > head").append(style);
		var dollarText = commaSeparateNumber(goalAmount - countPerTick * i);
		$( numbersDiv ).append( "<div class='therm-number pos" + i + "'>" +dollarText+ "</div>" );

	}

	//check that the images are loaded before anything
	arrayOfImages = new Array( "#therm-top", "#therm-body-bg", "#therm-body-mercury", "#therm-bottom", ".tip-left", ".tip-right");
	preload(arrayOfImages);

};

//check if each image is preloaded
function preload(arrayOfImages) {
	for(var i=0;i<arrayOfImages.length;i++){
		$(arrayOfImages[i]).load(function() {   checkIfAllImagesLoaded();  });
	}
}
//check that all the images are preloaded
function checkIfAllImagesLoaded(){
	imgsLoaded++;
	// console.log('imgsLoaded----------------------', imgsLoaded, arrayOfImages.length+2);
	if(imgsLoaded == arrayOfImages.length+2){
		$("#goal-thermometer").fadeTo(1000, 1, function(){
			animateThermometer();
		});
	}
}


//animate the thermometer
function animateThermometer(){

	var percentageComplete = currentAmount/goalAmount;
	var mercuryHeight = Math.round(heightOfBody * percentageComplete);
	var newMercuryTop = heightOfBody + thermTopHeight - mercuryHeight;

	var percentageComplete2 = markerAmount/goalAmount;
	var mercuryHeight2 = Math.round(heightOfBody * percentageComplete2);
	var newMercuryTop2 = heightOfBody + thermTopHeight - mercuryHeight2;

	// mercuryId.animate({height:mercuryHeight +1, top:newMercuryTop }, animationTime);
	// tooltipId.animate({top:newMercuryTop - tooltipOffset}, {duration:animationTime});
	// markerId.animate({top:newMercuryTop2 - markerOffset}, {duration:animationTime});

	mercuryId.css("height", mercuryHeight +1);
	mercuryId.css("top", newMercuryTop);
	tooltipId.css("top", newMercuryTop - tooltipOffset);
	markerId.css("top", newMercuryTop2 - markerOffset);

	var tooltipTxt = $("#therm-tooltip .tip-middle p");
	tooltipTxt.html(commaSeparateNumber(currentAmount));
	// console.log('-------------------------------', currentAmount);
	//change the tooltip number as it moves
	// $({tipAmount: 0}).animate({tipAmount: currentAmount}, {
	// 	duration:animationTime,
	// 	step:function(){
	// 		tooltipTxt.html(commaSeparateNumber(this.tipAmount));
	// 	}
	// });


}

//format the numbers with $ and commas
function commaSeparateNumber(val){
	val = Math.round(val);
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return numberPrefix + val + numberSuffix;
}

}
module.exports = GoalThermometer;
