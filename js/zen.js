jQuery.browser = {};
(function () {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})();


const bgm1 = [{mp3:'https://cdn.filesend.jp/private/wG-UL0pW5ick0d5RULuQG5CyCbQ18GpsBHcBW6-MIRrzp-nusU2OtqdJQ8x4j9ge/bgm2.mp3'}];
const bgm2 = [{mp3: "https://cdn.filesend.jp/private/Ggb4hBSEzhH7gWDTo0iq-U2cMyNmVftvHfZlqKVCTIFyIxflHG5F43CccqHEW8oQ/bgm3.mp3"}];
const bgm3 = [{mp3:'https://cdn.filesend.jp/private/QaFjxT_WQ1bcyctk4JlxKVA5NdYwdJJbQ2sEt3ZYZl66VwsD1TkXJpe4qPWcaTN1/sad-puppy-we-were-young-scloudtomp3downloader.com.mp3'}];

var selected_playlist = 0;
var playlist = [bgm1, bgm2, bgm3];
// var play_index = Math.floor(Math.random() * playlist[selected_playlist].length);
var play_index = Math.floor(Math.random() * playlist[selected_playlist].length);
var prev_index = play_index;
var status = "stop";

var player = $("#zen .player");

$(document).ready(function(){    
		
	var dragging = false;
	

	
	// init
	
	var vol = 0.1;
	if(aengji_settings && aengji_settings['aenggae_volume']){
		vol = (aengji_settings['aenggae_volume'] / 100);
	}
	vol = 0.1;
	
	player.jPlayer({
		ready: function () {
			// $(this).jPlayer("volume", aengji_settings['aenggae_volume'] /100);
      		$(this).jPlayer("setMedia", playlist[selected_playlist][play_index]);
    	},
    	swfPath: "",
		supplied: "m4a, mp3, oga",
		loop: true,
		volume: vol,
		autoPlay : true
  	});  




	
	// preload, update, end
	
	player.bind($.jPlayer.event.progress, function(event) {    
			
		var audio = $('#zen audio').get(0);
		var pc = 0;    
				
		if ((audio.buffered != undefined) && (audio.buffered.length != 0)) {
		 	pc = parseInt(((audio.buffered.end(0) / audio.duration) * 100), 10); 
		  	displayBuffered(pc);
		  	//console.log(pc);
		  	if(pc >= 99) {
		  		//console.log("loaded");
		  		$('#zen .buffer').addClass("loaded");
				
		  	}  
		}        
		
	});
	
	//player.bind($.jPlayer.event.loadeddata, function(event) {    
		//$('#zen .buffer').addClass("loaded");    
	//});
	
	player.bind($.jPlayer.event.timeupdate, function(event) { 
		var pc = event.jPlayer.status.currentPercentAbsolute;
		if (!dragging) { 
	    	displayProgress(pc);
		}
	});
	
	player.bind($.jPlayer.event.ended, function(event) {   
		// $('#zen .circle').removeClass( "rotate" );
		// $("#zen").removeClass( "play" );
		// $('#zen .progress').css({rotate: '0deg'});
		// status = "stop";
		
		/* if(play_index > playlist.length - 2){			
			play_index = 0;
		}else{
			play_index++;
		} */
		
		
		prev_index = play_index;
		play_index = Math.floor(Math.random() * playlist[selected_playlist].length);
		$(this).jPlayer("setMedia", playlist[selected_playlist][play_index]);
		player.jPlayer("play");
		
	});
	
	
	
	
	
	// play/pause
	
	$("#zen .button").bind('mousedown', function() {
		// not sure if this can be done in a simpler way.
		// when you click on the edge of the play button, but button scales down and doesn't drigger the click,
		// so mouseleave is added to still catch it.
		$(this).bind('mouseleave', function() {
			$(this).unbind('mouseleave');
			onClick();
		});
	});
	
	$("#zen .button").bind('mouseup', function() {
		$(this).unbind('mouseleave');
		onClick();
	});
	
	
	function onClick() {  		
                    
        if(status != "play") {
			status = "play";
			$("#zen").addClass( "play" );
			player.jPlayer("play");
		} else {
			$('#zen .circle').removeClass( "rotate" );
			$("#zen").removeClass( "play" );
			status = "pause";
			player.jPlayer("pause");
		}
	};
	
	
	
	
	// draggin
	
	var clickControl = $('#zen .drag');
	
	clickControl.grab({
		onstart: function(){
			dragging = true;
			$('#zen .button').css( "pointer-events", "none" );
			
		}, onmove: function(event){
			var pc = getArcPc(event.position.x, event.position.y);
			player.jPlayer("playHead", pc).jPlayer("play");
			displayProgress(pc);
			
		}, onfinish: function(event){
			dragging = false;
			var pc = getArcPc(event.position.x, event.position.y);
			player.jPlayer("playHead", pc).jPlayer("play");
			$('#zen .button').css( "pointer-events", "auto" );
		}
	});	
	
	
	
	
	
	
	// functions
	
	function displayProgress(pc) {
		var degs = pc * 3.6+"deg"; 
		$('#zen .progress').css({rotate: degs}); 		
	}
	function displayBuffered(pc) {
		var degs = pc * 3.6+"deg"; 
		$('#zen .buffer').css({rotate: degs}); 		
	}
	
	function getArcPc(pageX, pageY) { 
		var	self	= clickControl,
			offset	= self.offset(),
			x	= pageX - offset.left - self.width()/2,
			y	= pageY - offset.top - self.height()/2,
			a	= Math.atan2(y,x);  
			
			if (a > -1*Math.PI && a < -0.5*Math.PI) {
		   a = 2*Math.PI+a; 
		} 

		// a is now value between -0.5PI and 1.5PI 
		// ready to be normalized and applied   			
		var pc = (a + Math.PI/2) / 2*Math.PI * 10;   
		   
		return pc;
	}
	

	
	
});


function changeList(name){
	if(name=='a'){
		selected_playlist = 2;
	}else if(name=='c'){
		selected_playlist = 1;
	}else if(name=='g'){
		selected_playlist = 0;
	}
	
	nextAudio();
}

function togleAudio(){
	if(status != "play") {
		status = "play";
		$("#zen").addClass( "play" );
		player.jPlayer("play");
	} else {
		$('#zen .circle').removeClass( "rotate" );
		$("#zen").removeClass( "play" );
		status = "pause";
		player.jPlayer("pause");
	}
}

function playAudio(){
	if(status != "play") {
		status = "play";
		$("#zen").addClass( "play" );
		player.jPlayer("play");
	}	
}

function prevAudio(){	
	if(status != "play") {
		status = "play";
		$("#zen").addClass( "play" );
	}
	const temp_index = play_index;
	play_index = prev_index;	
	prev_index = temp_index;
	player.jPlayer("setMedia", playlist[selected_playlist][play_index]);	
	player.jPlayer("play");
}

function nextAudio(){	
	if(status != "play") {
		status = "play";
		$("#zen").addClass( "play" );
	}
	
	prev_index = play_index;
	play_index = Math.floor(Math.random() * playlist[selected_playlist].length);	
		
	player.jPlayer("setMedia", playlist[selected_playlist][play_index]);
	player.jPlayer("play");
}

function setVolumn(vol){
	player.jPlayer("volume", vol /100);
}

function stopAudio(){
	if(status == "pause"){
		return;
	}
	$('#zen .circle').removeClass( "rotate" );
	$("#zen").removeClass( "play" );
	status = "pause";
	player.jPlayer("pause");
}

function playAudioIndex(index){
	if(status == "play") {
		return;
	}
	
	if(status != "play") {
		status = "play";
		$("#zen").addClass( "play" );
	}
	
	prev_index = play_index;
	play_index = 0;	
	
	selected_playlist = index-1;
	
	player.jPlayer("setMedia", playlist[selected_playlist][0]);
	if(selected_playlist ==2){
		player.jPlayer("play", 107);	
	}else{
		player.jPlayer("play");		
	}
}