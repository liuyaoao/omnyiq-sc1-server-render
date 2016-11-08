import React from 'react';

import GoalThermometer from '../../../components/GoalThermometer';
var RectChart = React.createClass({
	shouldComponentUpdate: function(nextProps){
		if(this.props.value !== nextProps.value || this.props.avgVal !== nextProps.avgVal){
        return true;
    }
    return false;
	},
	render: function() {
		var {value, avgVal} = this.props;
		var size = {sizeWidth: parseInt(this.props.sizeWidth),
								sizeHeight: parseInt(this.props.sizeHeight),
								space: parseInt(this.props.sizeHeight) + parseInt(this.props.space)
								};
		var arrays = [], fills = [], arrLengh = 10, arrStep = 10; //["0","10","20","30","40","50","60","70","80","90"];
		if (avgVal !== undefined) {
			arrLengh = 20;
			arrStep = 5;
			fills = ["#158d12","#158d12","#158d12","#0a6616","#0a6616","#4b7215","#4b7215","#595709","#595709","#8d5128","#8d5128",
			"#a54219","#a54219","#a54219","#b21602","#b21602","#b21602","#c8180f","#c8180f","#c8180f"];
		}else {
			fills = ["#158d12","#158d12","#0a6616","#4b7215","#595709","#8d5128","#a54219","#b21602","#c8180f","#c8180f"];
		}
		for (var i = 0; i < arrLengh; i++) {
			arrays.push((i * arrStep));
		}

		// console.log(val);
		var avgNum = 0;
		var numSize = parseInt(this.props.space) * 2;
		var chart = arrays.map(function(c, i) {
			var fill = fills[i];
			if (parseFloat(avgVal) > c) {
				avgNum = i;
			}
			if(parseFloat(value) > c) {
				return (
					<rect width={size.sizeWidth} height={size.sizeHeight} x="0" y={size.space * ((arrays.length - 1) - i)} fill={fill} style={{strokeWidth:0,strokeOpacity:0.5}} key={i}/>
				);
			} else {
				return (
					<rect width={size.sizeWidth} height={size.sizeHeight} x="0" y={size.space * ((arrays.length - 1) - i)} fill="#9fdbb9" style={{strokeWidth:0,strokeOpacity:0.5}} key={i}/>
				);
			}
		});

		return (
			<div style={{position:"relative",marginBottom:"-6px", paddingTop: (avgVal !== undefined && avgVal !== -1 ? '5px' : 0)}}>
			<svg id="svgRect3" height={size.space * arrays.length + 2} width={size.sizeWidth} xmlns="http://www.w3.org/2000/svg">
				{chart}
			</svg>
			{avgVal !== undefined && avgVal !== -1 ? <span className="fa fa-arrow-left arrow-left" style={{top:((arrays.length - avgNum - 1) * numSize + 'px'),color:"#aeaeae"}}></span> : null}
			</div>
		);
	}
});
var TemperatureChart = React.createClass({
	componentDidMount: function() {
		var currentAmount = this.props.currentTemperature;
		var markerAmount = this.props.avgTemperature;
		var tickCount = this.props.tickCount;
		var goal = GoalThermometer({currentAmount: currentAmount, markerAmount: markerAmount, tickCount: tickCount});
	},
	shouldComponentUpdate: function(nextProps){
		if(this.props.currentTemperature !== nextProps.currentTemperature || this.props.avgTemperature !== nextProps.avgTemperature){
        return true;
    }
    return false;
	},
	componentWillReceiveProps: function(nextProps) {
		if (nextProps.currentTemperature !== this.props.currentTemperature || nextProps.avgTemperature !== this.props.avgTemperature) {
			var currentAmount = nextProps.currentTemperature;
			var markerAmount = nextProps.avgTemperature;
			var tickCount = nextProps.tickCount;
			// console.log(currentAmount);
			var goal = GoalThermometer({currentAmount: currentAmount, markerAmount: markerAmount, tickCount: tickCount});
		}
	},
	render: function() {
		return (
			<div id="goal-thermometer"></div>
		)
	}
});


module.exports = {
  RectChart,
  TemperatureChart
};
