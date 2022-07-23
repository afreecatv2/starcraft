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

var aengji_settings = {"aenggae":true,"aenggae_volume":"10"}
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
  myDialog.style = "white-space: pre;padding:50px 100px 50px 100px;border:0.1em solid white;background-color:#1B0B33;color:white;font-size:1.4em;"
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

function bjImgUrl(bj){
	if(!bj || bj==''){
		return 'https://s10.gifyu.com/images/noname.png';		
	}else{		
		return 'https://s10.gifyu.com/images/bj_' + bj.romanize() + '.jpg';
	}
}
// function bjImgUrl(bj){
	// if(!bj || bj==''){
		// return 'img/bj/noname.png';		
	// }else{		
		// return 'img/bj/' + bj + '.jpg';
	// }
// }

async function pageview() {
	 await fetch("/etc/pageview.php?url=" + window.location.pathname);
}