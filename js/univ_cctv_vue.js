
var cards = document.querySelectorAll('.card');

for(var i = 0; i< ml.length; i++){
	var newDiv = document.createElement('div');
	/* var newContent = document.createTextNode("환영합니다!");
	newDiv.appendChild(newContent); */
	newDiv.className = 'multi-button';
		
	var btn1 = document.createElement('button');
	btn1.className = 'fa-brands fa-adn';
	btn1.style.color = '#1C46AE';
	btn1.setAttribute('au',ml[i][0]);
	btn1.onclick = function changeContent() {
		window.open('https://bj.afreecatv.com/' + event.target.getAttribute('au'));
	}
	newDiv.appendChild(btn1);
	
	if(ml[i][1] !== ""){
		btn1 = document.createElement('button');
		btn1.className = 'fa-brands fa-youtube';
		btn1.style.color = '#f00';
		btn1.setAttribute('au',ml[i][1]);
		btn1.onclick = function changeContent() {
			window.open('https://www.youtube.com/' + event.target.getAttribute('au'));
		}
		newDiv.appendChild(btn1);
	}
	if(ml[i][2] !== ""){
		btn1 = document.createElement('button');
		btn1.className = 'fa-brands fa-youtube';
		btn1.style.color = '#00f';
		btn1.setAttribute('au',ml[i][2]);
		btn1.onclick = function changeContent() {
			window.open('https://www.youtube.com/' + event.target.getAttribute('au'));
		}
		newDiv.appendChild(btn1);
	}
	if(ml[i][3] !== ""){
		btn1 = document.createElement('button');
		btn1.className = 'fa-brands fa-instagram';
		btn1.style.color = '#B53297';
		btn1.setAttribute('au',ml[i][3]);
		btn1.onclick = function changeContent() {
			window.open('https://www.instagram.com/' + event.target.getAttribute('au'));
		}
		newDiv.appendChild(btn1);
	}
	cards[i].parentNode.classList.add('menu-card');
	cards[i].parentNode.appendChild(newDiv);
	
	var newImg = document.createElement('img');
	newImg.setAttribute('src','img/mcu/card_mcu_front.png');
	newImg.style.position = "absolute";
	newImg.style.width = "140px";
	newImg.style.height = "180px";
	newImg.style.top = "0px";
	newImg.style.left = "0px";
	
	cards[i].appendChild(newImg);
}