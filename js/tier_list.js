function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var name = getParameterByName('name');
//name = 'test2';



const wColors = ["#ffffff", "#ccccff", "#9999ff", "#6666ff", "#3333ff", "#0000ff"];
var n1 = 'free';
const lColors = ["#ffffff", "#ffcccc", "#ff9999", "#ff6666", "#ff3333", "#ff0000"];
var n2 = 'catv.netli';
var clickedName = '';

var tier_list = document.getElementById('tier_list');
tier_list.addEventListener('click', function (e) {
	if (e.target.tagName == 'IMG') {
		return;
	}
	unClickAll();
});
var n3 = 'fy.ap';

if( window.location.hostname.indexOf(n1+n2+n3) < 0 ){
	throw '';
}


const url = 'http://afreecatv.dothome.co.kr/afreecatv/select_sc_tier.php?name=' + name;
getData(url).then(data => {		
	if(!data || !data.length || data.length < 2){
		alert('일치하는 저장명 없음');
		history.back();
		throw '';
	}
	displayTier(data);
});


	function displayTier(data) {
				
		var onairList;
		var bj_tier2;
		
		if(data[0].name=='starcraft_list'){
			onairList = JSON.parse(data[0].json);
			bj_tier2 = JSON.parse(data[1].json);
		}else{
			onairList = JSON.parse(data[1].json);
			bj_tier2 = JSON.parse(data[0].json);			
		}
		
		var title = document.getElementById('title');
		var ver = document.getElementById('ver');
		var tier_link = document.getElementById('tier_link');
		title.textContent  = bj_tier2.title;
		ver.textContent  = bj_tier2.ver;
		tier_link.setAttribute('href', bj_tier2.tier_link);
		
		bj_tier2 = bj_tier2.tier;
				
		var container_list = document.getElementById('container_list');
				
		var container_tier = document.getElementById('container_tier_0');
		const item_cnt = parseInt(container_tier.offsetWidth / 110);		
		
		for (var key in bj_tier2) {
			var img_tier = ce(container_list, 'div', {'class':'img_tier'});
			cetn(img_tier, 'h2', key, {'class':'tier_desc'});			
			//cetn(container_tier, 'h1', bj_tier2[key][0][0] + ' 티어', {'style': 'margin-top:40px;color:#EA80FC;'	});
			container_tier = ce(container_list, 'div', {'class':'container_tier'});
						
			if(bj_tier2[key].length > item_cnt){
				container_tier.className = 'container_tier_parent';
				var item_mod = parseInt(bj_tier2[key].length % item_cnt);
				var row_cnt = parseInt(bj_tier2[key].length / item_cnt);				
				if(item_mod !== 0){
					row_cnt++;
				}
				var row_mod = parseInt(bj_tier2[key].length % row_cnt);
				var item_limit = parseInt(bj_tier2[key].length / row_cnt);	
				if(row_mod !== 0){
					item_limit++;
				}
								
				var limit_mod = 0;
				if(bj_tier2[key].length % item_limit !== 0){
					limit_mod = item_limit - (bj_tier2[key].length % item_limit);
				}
						
				for(var r=0;r<row_cnt-1;r++){
					var c = ce(container_tier, 'div',{'class':'container_tier'});
					var item_idx = (r*item_limit) + item_limit;
					for (var j = (r*item_limit); j < item_idx ; j++) {
						var el = document.createDocumentFragment();
						
						var bj_name = bj_tier2[key][j][0].split(',')[0];
						var bj_status = bj_tier2[key][j][0].split(',')[1];
						
						var ti = ce(el, 'div', {'class': 'star-tier-item'});
						var tc = ce(ti, 'div', {'class': 'star-tier-container'});
						var tc2 = ce(ti, 'div', {'class': 'star-tier-container2'});
						var onairHref = '';
						var onairSrc = '';
						var match = false;
						for (var k = 0; k < onairList.length; k++) {
							if (onairList[k][0] == bj_tier2[key][j][2]) {
								match = true;
								onairHref = 'https://play.afreecatv.com/' + onairList[k][0] + '/' + onairList[k][1];
								onairSrc = 'https:' + onairList[k][2];
								break;
							}
						}
						var img = ce(ti, 'img', {'data-src': bjImgUrl(bj_name),'class': 'lazy star-tier-image','onerror':'this.onerror=null; this.src="img/bj/noname.png"'});
						img.setAttribute('name', bj_name)
						img.style.setProperty("--color", 'white');
						img.style.setProperty("--b", '0.1em solid #E0E0E0');
						img.setAttribute('onairhref', onairHref);
						img.setAttribute('onairsrc', onairSrc);
						img.addEventListener('click', showInfo);
						if (match) {
							// img.classList.add('on-air');
							// img.setAttribute('on-air', 1);
							ce(ti, 'img', {'src':'img/live.png', 'style':'height:30px;position:absolute;top:0px;left:4px;cursor:pointer;pointer-events:none;z-index:99;'});
							
							var thumb = ce(ti, 'img', {'data-src': onairSrc,'class': 'lazy tier-thumb'});
							img.addEventListener('dblclick', function (e) {
								window.open(e.target.getAttribute('onairhref'), '_blank');
							});
						}
						cetn(ti, 'span', bj_name, {'class': 'bj-name ' + bj_tier2[key][j][1]});
						
						if(bj_status){
							var sname;
							if(bj_status=='승급'){
								sname = 'img/up-circular-64.png';
							}else if(bj_status=='강등'){
								sname = 'img/down-circular-64.png';						
							}else{
								sname = 'svg/' + sname + '.svg';
							}
							
							ce(ti, 'img', {'src':sname, 'style':'height:30px;position:absolute;top:4px;right:2px;cursor:pointer;pointer-events:none;z-index:99;'});
						}
						c.appendChild(el);
					}				
				}
				
				var r = row_cnt-1;
					var c = ce(container_tier, 'div',{'class':'container_tier'});
					
					var item_idx = (r*item_limit) + (item_limit - limit_mod);
					//var item_idx = (r*item_limit) + (item_limit - row_mod);
					for(var j = (r*item_limit); j < item_idx ; j++) {
						
						if(!bj_tier2[key][j]){
							console.error('range over');
							break;
						}
						
						
						var el = document.createDocumentFragment();
						
						var bj_name = bj_tier2[key][j][0].split(',')[0];
						var bj_status = bj_tier2[key][j][0].split(',')[1];
						
						var ti = ce(el, 'div', {'class': 'star-tier-item'});
						var tc = ce(ti, 'div', {'class': 'star-tier-container'});
						var tc2 = ce(ti, 'div', {'class': 'star-tier-container2'});
						var onairHref = '';
						var onairSrc = '';
						var match = false;
						for (var k = 0; k < onairList.length; k++) {
							if (onairList[k][0] == bj_tier2[key][j][2]) {
								match = true;
								onairHref = 'https://play.afreecatv.com/' + onairList[k][0] + '/' + onairList[k][1];
								onairSrc = 'https:' + onairList[k][2];
								break;
							}
						}
						var img = ce(ti, 'img', {'data-src': bjImgUrl(bj_name),'class': 'lazy star-tier-image','onerror':'this.onerror=null; this.src="img/bj/noname.png"'});
						img.setAttribute('name', bj_name)
						img.style.setProperty("--color", 'white');
						img.style.setProperty("--b", '0.1em solid #E0E0E0');
						img.setAttribute('onairhref', onairHref);
						img.setAttribute('onairsrc', onairSrc);
						img.addEventListener('click', showInfo);
						if (match) {
							// img.classList.add('on-air');
							// img.setAttribute('on-air', 1);
							ce(ti, 'img', {'src':'img/live.png', 'style':'height:30px;position:absolute;top:0px;left:4px;cursor:pointer;pointer-events:none;z-index:99;'});
							
							var thumb = ce(ti, 'img', {'data-src': onairSrc,'class': 'lazy tier-thumb'});
							img.addEventListener('dblclick', function (e) {
								window.open(e.target.getAttribute('onairhref'), '_blank');
							});
						}
						cetn(ti, 'span', bj_name, {'class': 'bj-name ' + bj_tier2[key][j][1]});
						
						if(bj_status){
							var sname;
							if(bj_status=='승급'){
								sname = 'img/up-circular-64.png';
							}else if(bj_status=='강등'){
								sname = 'img/down-circular-64.png';						
							}
							
							ce(ti, 'img', {'src':sname, 'style':'height:30px;position:absolute;top:4px;right:2px;cursor:pointer;pointer-events:none;z-index:99;'});
						}				
						c.appendChild(el);
					}
				
			}else{
				for (var j = 0; j < bj_tier2[key].length; j++) {				
					var el = document.createDocumentFragment();
					
					var bj_name = bj_tier2[key][j][0].split(',')[0];
					var bj_status = bj_tier2[key][j][0].split(',')[1];
					
					var ti = ce(el, 'div', {'class': 'star-tier-item'});
					var tc = ce(ti, 'div', {'class': 'star-tier-container'});
					var tc2 = ce(ti, 'div', {'class': 'star-tier-container2'});
					var onairHref = '';
					var onairSrc = '';
					var match = false;
					for (var k = 0; k < onairList.length; k++) {
						if (onairList[k][0] == bj_tier2[key][j][2]) {
							match = true;
							onairHref = 'https://play.afreecatv.com/' + onairList[k][0] + '/' + onairList[k][1];
							onairSrc = 'https:' + onairList[k][2];
							break;
						}
					}
					var img = ce(ti, 'img', {'data-src': bjImgUrl(bj_name),'class': 'lazy star-tier-image','onerror':'this.onerror=null; this.src="img/bj/noname.png"'});
					img.setAttribute('name', bj_name)
					img.style.setProperty("--color", 'white');
					img.style.setProperty("--b", '0.1em solid #E0E0E0');
					img.setAttribute('onairhref', onairHref);
					img.setAttribute('onairsrc', onairSrc);
					img.addEventListener('click', showInfo);
					if (match) {
						// img.classList.add('on-air');
						// img.setAttribute('on-air', 1);
						ce(ti, 'img', {'src':'img/live.png', 'style':'height:30px;position:absolute;top:0px;left:4px;cursor:pointer;pointer-events:none;z-index:99;'});
						
						var thumb = ce(ti, 'img', {'data-src': onairSrc,'class': 'lazy tier-thumb'});
						img.addEventListener('dblclick', function (e) {
							window.open(e.target.getAttribute('onairhref'), '_blank');
						});
					}
					cetn(ti, 'span', bj_name, {'class': 'bj-name ' + bj_tier2[key][j][1]});
					
					if(bj_status){
						var sname;
						if(bj_status=='승급'){
							sname = 'img/up-circular-64.png';
						}else if(bj_status=='강등'){
							sname = 'img/down-circular-64.png';						
						}
						
						ce(ti, 'img', {'src':sname, 'style':'height:30px;position:absolute;top:4px;right:2px;cursor:pointer;pointer-events:none;z-index:99;'});
					}				
					container_tier.appendChild(el);
				}
			}			
		}		
	}
		
	function showInfo(event) {
		 const selected = event.target;
		 const name =selected.getAttribute('name');
		 
		 if(clickedName == name){
			 clickedName = '';
			 unClickAll();
			 return;
		 }
		 
		 clickedName = name;
		 
        const bj = document.querySelectorAll('.star-tier-image');
        for (let i = 0; i < bj.length; i++) {
            // bj[i].setAttribute("c", '');
            // bj[i].style.setProperty("--color", '#ffffff');
            // bj[i].style.filter = "brightness(30%)";
            // bj[i].style.setProperty("--b", null);
			
			bj[i].parentNode.children[0].setAttribute('record', '');
			bj[i].parentNode.children[1].setAttribute('record', '');
			// bj[i].classList.remove('on-air');
			bj[i].classList.remove('tier-item-selected');
			bj[i].classList.add('tier-item-unselected');
			bj[i].style.setProperty("--color", 'white');
			bj[i].style.setProperty("--b", '0.1em solid #E0E0E0');			
			
        }
		
		const bjname = document.querySelectorAll('.bj-name');
		for (let i = 0; i < bjname.length; i++) {
			bjname[i].style.opacity = 0.3;
		}
		       
        // selected.style.filter = "brightness(150%)";
        // selected.style.setProperty("--b", '.5rem solid green');
		
		selected.classList.add('tier-item-selected');
		selected.classList.remove('tier-item-unselected');
		
		// if(selected.classList.contains('on-air')){
			// selected.parentNode.children[4].style.opacity = 1;			
		// }else{
			// selected.parentNode.children[3].style.opacity = 1;			
		// }
				
		
        if (record_list.hasOwnProperty(name)){
			const r = record_list[name][2];
            for (var i=0;i<r.length;i++){
				for (let j = 0; j < bj.length; j++) {
					if(r[i][0]==bj[j].getAttribute('name')){					
						display(bj[j], r[i][1], r[i][2]);
						break;
					}
				}
            }
        }
		// else{
			// for (const [key, value] of Object.entries(record_list)) {
				// if(key==name.trim()){	
					// const r = value[2];		
					// for (var i=0;i<r.length;i++){
						// for (let j = 0; j < bj.length; j++) {
							// if(r[i][0]==bj[j].getAttribute('name')){					
								// display(bj[j], r[i][1], r[i][2]);
								// break;
							// }
						// }
					// }					
					// break;			
				// }
			// }
		// }
    }

    function display(el, result1, result2) {
		
		el.classList.remove('tier-item-unselected');
		
        const b = getBorder(result1);
        el.style.filter = null;
        el.parentNode.children[0].setAttribute('record', result1);
        el.parentNode.children[1].setAttribute('record', result2);
        el.style.setProperty("--color", b[1]);
        el.style.setProperty("--b", b[0] + 'em solid ' + b[1]);
        el.style.setProperty("--bc", b[0] + 'em');
        // el.style.setProperty("--b", '.5rem solid ' + b);
		
		// if(el.classList.contains('on-air')){
			// el.parentNode.children[4].style.opacity = 1;			
		// }else{
			// el.parentNode.children[3].style.opacity = 1;			
		// }
    }

    function getBorder(result) {
        let b = [];
        const res = result.trim().split(' ');
        const w = parseInt(res[0].replace('승',''));
        const l = parseInt(res[1].replace('패',''));
		
        b[0] = (w + l) / 50 > 1 ? 1 : ((w + l) / 50) + 0.2;
        if (w > l) {
            const rate = w / l > 5 ? 5 : Math.floor(w / l);
            b[1] = wColors[rate];
        } else if (l > w) {
            const rate = l / w > 5 ? 5 : Math.floor(l / w);
            b[1] = lColors[rate];
        } else {
            b[1] = wColors[0];
        }
        return b;
    }
	
	function unClickAll(){
		
		const bj = document.querySelectorAll('.star-tier-image');
		for (let i = 0; i < bj.length; i++) {
			bj[i].parentNode.children[0].setAttribute('record', '');
			bj[i].parentNode.children[1].setAttribute('record', '');
			// bj[i].classList.remove('on-air');
			bj[i].classList.remove('tier-item-selected');
			bj[i].classList.remove('tier-item-unselected');
			bj[i].style.setProperty("--color", '#E0E0E0');
			bj[i].style.setProperty("--b", '0.1em solid #E0E0E0');
			
			// if(bj[i].getAttribute('on-air') ==1){
				// bj[i].classList.add('on-air');
			// }			
		}		
		const bjname = document.querySelectorAll('.bj-name');
		for (let i = 0; i < bjname.length; i++) {
			bjname[i].style.opacity = 1;
		}	
	}


function getData(url = '') {
	return fetch(url, {mode:'no-cors'})
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