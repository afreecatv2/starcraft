
function log(msg){
	console.log(msg);
}


var hexagonal = [];
var sortHex;


// getDataAsync('http://aengji.dothome.co.kr/afreecatv/select_lol_get.php').then(data => {
	// displayData(data);
// });

var fifa_list = [];
var filter = '전체';
var cover = false;

displayData(data, filter, cover);

function displayData(fifa_list, filter, cover){
	this.fifa_list = fifa_list;
	this.filter = filter;
	this.cover = cover;
	
	var dh = document.getElementById('hexagonal');
	dh.innerHTML = '';
	hexagonal = [];
	
	var date = '';
	var docFragment = document.createDocumentFragment();
	var mcontainer;
	var i=0;
	
	for(match of fifa_list){
		const bj1 = match.bj1;
		const bj2 = match.bj2;
		
		if(bj1 !== ''){
			var m = false;
			for(h in hexagonal){
				if(hexagonal[h].name == bj1){				
					m=true;
					break;
				}
			}
			if( ! m){
				var bj = new newTeam(bj1);
				hexagonal[bj1] = bj;
			}
		}
		if(bj2 !==''){
			var m = false;
			for(h in hexagonal){
				if(hexagonal[h].name == bj2){
					m=true;
					break;
				}
			}
			if( ! m){
				var bj = new newTeam(bj2);
				hexagonal[bj2] = bj;
			}
		}
		
		// if(bj1 !=='' && bj2 !=='' && parseInt(match.mtype) !== 10 && parseInt(match.mtype) !== 20)
		// if(parseInt(match.mtype) == 30 || (cover && (parseInt(match.mtype) == 30 || parseInt(match.mtype) == 40))){
				
		if(date !== match.mdate.split(' ')[0]){
			date = match.mdate.split(' ')[0];
			
			mcontainer = ce(docFragment, 'div',{'class':'match-day-container'});
			cetn(mcontainer, 'h3', date, {'class':'match-day'});

			docFragment.appendChild(mcontainer);
		}
		
		if(filter !== '전체' && filter !== bj1 && filter !== bj2){
			continue;
		}
		
		var node = document.createDocumentFragment();
		var dm = ce(node,'div',{'class':'match'});
		var tp = ce(dm,'div',{'class':'teams-playing'});
		var label1 = ce(tp, 'label', {'class':'team'});
		// ce(label1, 'img', {'data-src':bjImgUrl(bj1),'class':'lazy bj_img_blue'});
		ce(label1, 'img', {'data-src':'img/' + logo[bj1],'class':'lazy bj_img_blue','style':'width:200px;height:200px;'});
		cetn(label1,'span',bj1);
		// cetn(label1,'span',member[bj1]);
		var label2 = ce(tp, 'label', {'class':'team'});
		// ce(label2, 'img', {'data-src':bjImgUrl(bj2),'class':'lazy bj_img_red'});
		ce(label2, 'img', {'data-src':'img/' + logo[bj2],'class':'lazy bj_img_blue','style':'width:200px;height:200px;'});
		cetn(label2,'span',bj2);
		// cetn(label2,'span',member[bj2]);
		var elmt = document.createElement('h4');
		elmt.innerHTML = mtype[match.mtype] + '<br><small>'+ match.mdate + '</small>';
		elmt.style.marginTop = '5px';
		elmt.style.marginBottom = '-5px';
		dm.appendChild(elmt);
				
		var ds = ce(dm, 'div',{'class':'teams-score','data-game':'played'});
		
		if(parseInt(match.mtype) > 99){
			ce(ds, 'input',{'type':'text','class':'local','data-team':bj1,'onBlur':'updateGame(this);','maxlength':2, 'value':(match.score1 > match.score2 ?'승   ':'패   ')  + match.score1,'readonly':''});
			ce(ds, 'input',{'type':'text','class':'local','data-team':bj2,'onBlur':'updateGame(this);','maxlength':2, 'value':match.score2 + (match.score2 > match.score1?'   승':'   패'),'readonly':''});
		}else{
			ce(ds, 'input',{'type':'text','class':'local','data-team':bj1,'onBlur':'updateGame(this);','maxlength':2, 'value':match.score1 == 1?'':'','readonly':''});
			ce(ds, 'input',{'type':'text','class':'local','data-team':bj2,'onBlur':'updateGame(this);','maxlength':2, 'value':match.score2 == 1?'':'','readonly':''});
		}
		
		mcontainer.appendChild(node);
	}
	
	
	
	// var ul_cover = document.getElementById('ul_cover');
	// if(cover){
		// ul_cover.children[0].className = '';
		// ul_cover.children[1].className = 'active';
	// }else{
		// ul_cover.children[0].className = 'active';
		// ul_cover.children[1].className = '';		
	// }
	
	dh.appendChild(docFragment);
		
	// sortTable();
	
}






function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] > b[0]) ? -1 : 1;
    }
}




async function getDataAsync(url) {
	if(!url){
		return;
	}
	var response = await fetch(url);
	var data = await response.json();
	return data;
}

function getData(url = '') {
	return fetch(url)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		return data;
	})
	.catch(function (error) {
		console.log(error);
	});
}


function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
}


function newTeam(name){
		this.name= name,
		this.img= bjImgUrl(name),
		this.pj= 0,
		this.pg= 0,
		this.pe= 0,
		this.pp= 0,
		this.gf= 0,
		this.gc= 0,
		this.gd= function(){
			return this.gf - this.gc;
		},
		this.pts= function(){
			return this.pg * 3 + this.pe;
		},
		this.fs= function(){
			//const f = ((this.pg * 3 + this.pe) * (this.pg / (this.pg + this.pp)));
			//const f = ((this.pg * 3 + this.pe) / this.pj);
			// return isNaN(f)?0:f.toFixed(2);
			// const f = ((this.pg * 3 + this.pe) / this.pj);
			const f = (this.pg / (this.pj));
			return isNaN(f) ? 0 : (f * 100);
		},
		this.fs2= function(){
			const f = (this.gf / (this.gf + this.gc));
			return isNaN(f) ? 0 : (f * 100);
		}
	}
	

	// team builder object constructor
	function newTeam2(name,img){
		this.name= name,
		this.img= img+'-flag.png',
		this.pj= 0,
		this.pg= 0,
		this.pe= 0,
		this.pp= 0,
		this.gf= 0,
		this.gc= 0,
		this.gd= function(){
			return this.gf - this.gc;
		},
		this.pts= function(){
			return this.pg * 3 + this.pe;
		}
	}

	// update standings
	function updateTable(teamA,teamAGoals,teamB,teamBGoals){
		var teamA = teamA;
		var teamAGoals = teamAGoals;
		var teamB = teamB; 
		var teamBGoals = teamBGoals;

		// add goals to each team
		hexagonal[teamA]['gf'] += teamAGoals;
		hexagonal[teamA]['gc'] += teamBGoals;
		hexagonal[teamB]['gf'] += teamBGoals;
		hexagonal[teamB]['gc'] += teamAGoals;

		// Alocate pg pe pp and points
		if (teamAGoals > teamBGoals) {			
			hexagonal[teamA]['pg'] += 1; // won
			hexagonal[teamB]['pp'] += 1; // lost
		}else if (teamAGoals < teamBGoals) {
			hexagonal[teamA]['pp'] += 1; // lost
			hexagonal[teamB]['pg'] += 1; // won
		}else{
			hexagonal[teamA]['pe'] += 1; // draw
			hexagonal[teamB]['pe'] += 1; // draw
		}

		// update games played
		hexagonal[teamA]['pj'] ++;
		hexagonal[teamB]['pj'] ++;

		// call to update table positions
		//sortTable();
	}

	// sort table	to display correct teams positions
	function sortTable(){
		// Have to create and push elements from hexagonal array to new array (sortHex) in order to sort and display the correct table standing positions
		sortHex = [];
		// get standings and push them to new array
		for (var teams in hexagonal) {		
			var teamName = hexagonal[teams].name;
			var teamflag = hexagonal[teams].img;
			var teamGp = hexagonal[teams].pj;
			var teamGw = hexagonal[teams].pg;
			var teamGdr = hexagonal[teams].pe;
			var teamGl = hexagonal[teams].pp;
			var teamGf = hexagonal[teams].gf;
			var teamGa = hexagonal[teams].gc;
			var teamPts = hexagonal[teams].pts();
			var teamGd = hexagonal[teams].gd();
			var teamFs = hexagonal[teams].fs();
			var teamFs2 = hexagonal[teams].fs2();
			sortHex.push({name: teamName, img:teamflag, pj: teamGp, pg: teamGw, pe: teamGdr, pp: teamGl, gf: teamGf, gc: teamGa, pts: teamPts, gd: teamGd, fs: teamFs, fs2: teamFs2});			
		}	
		
		// sort array for correct standings positions
		sortHex.sort(function (a, b) {
			if (a.fs > b.fs) {
				return -1;	    
			}
			if (a.fs < b.fs) {
				return 1;	    
			}
		  // if teams have equal points then sort by goal difference
		  if (a.fs === b.fs) { 
		    // sort by hights gal difference
		    if (a.fs2 > b.fs2) {
		    	return -1;
		    }
		    if (a.fs2 < b.fs2) {
		    	return 1;
		    }
		  	// if teams have equal goal difference then sort by highest goal in favour
		  	if (a.fs2 == b.fs2) {
		  		if (a.pg > b.pg) {
		  			return -1;
		  		}
		  		if (a.pg < b.pg) {
		  			return 1;
		  		}
		  	}
		  }
		});
		// display updated table to user
		showStandings();
	}

	// reset hexagonal object back to 0
	// function resetHexagonal(){
		// for (var teams in hexagonal) {
			// hexagonal[teams].pj = 0;
			// hexagonal[teams].pg = 0;
			// hexagonal[teams].pe = 0;
			// hexagonal[teams].pp = 0;
			// hexagonal[teams].gf = 0;
			// hexagonal[teams].gc = 0;
		// }
	// }

// display sorted table
function showStandings(){
		// print sorted table
		var hexTable = document.getElementById('hexagonal-table');	
		// remove old standings
		var oldtbody = document.getElementsByTagName('tbody')[0];	
		oldtbody.parentNode.removeChild(oldtbody);

		// create and populate new standings
		var tbody = hexTable.appendChild(document.createElement('tbody'));	

		for (team in sortHex) {
			var teamRow = document.createElement('tr');			
			teamRow.innerHTML = '<td><img src="'+sortHex[team].img+'" alt="' + sortHex[team].name + '" width="30" height="30">' + sortHex[team].name + ' ' + member[sortHex[team].name] + '</td>' +
			'<td>' + sortHex[team].pj + '</td>' +
			'<td>' + sortHex[team].pg + '</td>' +
			'<td>' + sortHex[team].pp + '</td>' +
			/* '<td>' + sortHex[team].pts + '</td>'; + */
			/* '<td>' + (isNaN(sortHex[team].fs)?0:sortHex[team].fs.toFixed(1)) + '</td>'; */
			'<td>' + sortHex[team].fs.toFixed(0) + '</td>';
			tbody.appendChild(teamRow);
		}
	}

	// function to get team and scores from input fields and send to update table
	function matchDay(teamPerfomance){
		// Normally teamPerformance is the parent div or node that holds the game's
		// input fields for easy access to each one.

		// get all input fields in the game
		var results = teamPerfomance.getElementsByTagName('input');
		// get local team name and results	
		var localT = results[0].getAttribute('data-team');
		var localTScore = Number(results[0].value);
		// get visitor team name and results
		var visitorT = results[1].getAttribute('data-team');
		var visitorTScore = Number(results[1].value);
		// update table
		updateTable(localT,localTScore,visitorT,visitorTScore);
	}

	// get scores from all games already played in the past when page is loaded
	function tableToday(){
		// create array to save all the match results
		var matches = [];

		// find every single match in the page and push it to the array
		// for loop i <= 30 becuase it is 30 games in total
		for (var i = 1; i <= 30; i++) {	
			matches[i] = document.getElementById('match-score-'+i);						
		}		
		
		// get each team name and score on every match
		for(matchResult in matches){
			var teams = matches[matchResult];
			// only get games scores that have been already played
			if (teams.hasAttribute('data-game')) {
				matchDay(teams);				
			}else{
				sortTable();
			}
		}		
	}	

	// get scores when a game is updated by user from the input fields
	function updateGame(game){
		// get parent div that holds the teams in match
		var thisMatch = game.parentNode;
		// get both teams scores from input fields
		var gameScores = thisMatch.getElementsByTagName('input');
		
		// Update match only if Both teams values have been placed in the field
		if (gameScores[0].value !== '' && gameScores[1].value !== '') {
			// if this has already been played then it is only an update
			if (thisMatch.hasAttribute('data-game')) {
				// reset everything to 0 in hexagonal calculate everything again with new numbers.
				//resetHexagonal();
				//tableToday();
			}else{
				// if this is a game result added for the first time then make it already played 
				// and update table only
				thisMatch.setAttribute('data-game','played');
				matchDay(thisMatch);
			};
		}else{
			// if user is removing scores and leaves the game empty, remove data-game and reset and recalculate the table
			thisMatch.removeAttribute('data-game');
			//resetHexagonal();
			//tableToday();
		}
	}

	// back to top button
	/* var winHeight  = window.innerHeight;
	var backTotopBtn = document.getElementById('back-to-top');
	window.onscroll = function(){
		if (window.pageYOffset > winHeight) {
			backTotopBtn.className = 'show-back-to-top';
		} else if(window.pageYOffset < (winHeight / 2)){
			backTotopBtn.removeAttribute('class');
		}
	}

	function TopscrollTo(e) {
		if(window.scrollY!=0)
		{
		  setTimeout(function() {
			  window.scrollTo(0,window.scrollY-30);
		  	TopscrollTo();
		  }, 0);
		}
	}
	backTotopBtn.addEventListener('click', TopscrollTo, false); */

	// Show table on mobile devices
	function showTableMobile(){
		var leftCol = document.getElementById('standings-container');
		leftCol.classList.toggle('open-table-mobile');
		showTableBtn.classList.toggle('close-nav');
	}
	var showTableBtn = document.getElementById('mobile-table');
	showTableBtn.addEventListener('click',showTableMobile,false);
	
	// load document and rock & roll baby!
	document.addEventListener('DOMContentLoaded', function(){ 
		//tableToday();
	}, false);
