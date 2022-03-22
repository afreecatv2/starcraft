// log('profile_앵지'.romanize() + '.jpg');
// log('profile_김윤환'.romanize() + '.jpg');
// log('profile_김성대'.romanize() + '.jpg');
// log('profile_혜로로'.romanize() + '.jpg');
// log('profile_오세블리'.romanize() + '.jpg');
// log('profile_늑대채린'.romanize() + '.jpg');
// log('profile_이유란'.romanize() + '.jpg');
// log('profile_러아'.romanize() + '.jpg');
// log('profile_구루미'.romanize() + '.jpg');
// log('profile_나무늘봉순'.romanize() + '.jpg');

var aengji_settings = {"titles":["3","2","1","앵~~~","afreecaTV AengJi.","아프리카TV 앵지.","9집 가수 앵지.","공주상사 앵상무.","중수 저그 MidWater.","앵개! 앵개!","눈!코! 눈!코!","앵지는 카리나.","캄성여대 학생회장"],"aenggae":true,"aenggae_volume":"20","spon":[["tjfdk6664","공춘리"],["yeonee1129","다연"],["chzh1chzh","지유"],["dkssudzz11","미니쉘"],["mudorl","무찌"],["kzzang96","경짱"],["hy4985","옆집뽀누나"],["zalalz","뚜밥"],["msuk2017","모꿀몬"],["cyj982002","다나짱"]],"cswu":[["gks2wl",""],["brainzerg7",""],["tjdeosks",""],["llqqqq",""],["impact501",""],["forweourus",""],["smmms2002",""],["clclcl8888",""],["9rumee",""],["yjk011599",""]]}
loadSettings();

function loadSettings(){
	aengji_settings = JSON.parse(localStorage.getItem('aengji_settings')) || aengji_settings;
}

function log(m){
	console.log(m);
}

function ae(parentNode, childNode) {
    parentNode.appendChild(childNode);
}
function ce(parentNode, childTag) {
    childTag = document.createElement(childTag);
    parentNode.appendChild(childTag);
    return childTag;
}
function ce(parentNode, childTag, attr) {
    childTag = document.createElement(childTag);
    for (let a in attr) {
        childTag.setAttribute(a, attr[a]);
    }
    parentNode.appendChild(childTag);
    return childTag;
}
function cetn(parentNode, childTag, t) {
    childTag = document.createElement(childTag);
    childTag.appendChild(document.createTextNode(t));
    parentNode.appendChild(childTag);
    return childTag;
}
function cetn(parentNode, childTag, t, attr) {
    childTag = document.createElement(childTag);
    for (let a in attr) {
        childTag.setAttribute(a, attr[a]);
    }
    childTag.appendChild(document.createTextNode(t));
    parentNode.appendChild(childTag);
    return childTag;
}
function textNode(node, t) {
    node.appendChild(document.createTextNode(t));
}

function popup2(msg) {
  var myDialog = document.createElement("dialog");
  myDialog.style = "white-space: pre;padding:50px 100px 50px 100px;border:0.2em solid white;background-color:#333;color:white;font-size:1.4em;"
  document.body.appendChild(myDialog)
  var text = document.createTextNode(msg);
  myDialog.appendChild(text);
  
  myDialog.addEventListener('click', function (event) {
	  this.remove();
  });  
  
  myDialog.showModal();  
}





function checkNotice(data){
	log(data);
	
	const notice = JSON.pase(data);	
	const local_version = localStorage.getItem('notice_version') || -1;
	if(notice.version > local_version){
		localStorage.setItem('notice_version', data.version);
		popup2(notice.msg);
	}	
}

function jsonp(url, callback) {
	const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
	window[callbackName] = function (data) {
		delete window[callbackName];
		document.body.removeChild(script);
		callback(data);
	};
	
	const script = document.createElement('script');
	script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
	document.body.appendChild(script);
}

// function bjImgUrl(bj){
	// if(!bj || bj==''){
		// return 'https://s10.gifyu.com/images/noname.png';		
	// }else{		
		// return 'https://s10.gifyu.com/images/bj_' + bj.romanize() + '.jpg';
	// }
// }
// function bjImgUrl(bj){
	// if(!bj || bj==''){
		// return 'https://0000u.github.io/afreecatv/img/bj/noname.png';		
	// }else{		
		// return 'https://0000u.github.io/afreecatv/img/bj/' + bj + '.jpg';
	// }
// }

// function bjImgUrl(bj){
	// if(!bj || bj==''){
		// return 'https://0000u.github.io/afreecatv/img/bj/noname.png';		
	// }else{		
		// return 'https://0000u.github.io/afreecatv/img/bj/' + bj + '.jpg';
	// }
// }


function bjImgUrl(bj){
	if(!bj || bj==''){
		return 'img/bj/noname.png';		
	}else{		
		return 'img/bj/' + bj + '.jpg';
	}
}

async function pageview() {
	 await fetch("https://test.aengji.com/etc/pageview.php?url=" + 'univ-' + window.location.pathname);
}