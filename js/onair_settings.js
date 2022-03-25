function showModal(){
	var modal = document.createElement('div');
	modal.innerHTML = `<div id="modal" class="modal" onclick="closeModal(this);">
	<article class="modal-container" style="min-width:400px;">
		<header class="modal-container-header" style="justify-content: center;">
			<h2 class="modal-container-title" style="color:#000;">즐겨찾기 등록</h2>
			<!-- <button id="btn_close" class="icon-button">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
					<path fill="none" d="M0 0h24v24H0z" />
					<path fill="currentColor" d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
				</svg>
			</button> -->
		</header>
		<div class="modal-container-body rtf">			
			<div style="display:flex;flex-direction: row;">
				<div style="width:50%;color:#000;">
					<h2 style="color:#000;">클릭 -> 삭제</h2>
					<div id="div_bj">						
					</div>
				</div>
				<div style="width:50%;color:#000;">					
					<h2 style="color:#000;">BJ명 입력</h2>
					<input id="input_search" type="text" placeholder="BJ명 검색" size="10" onkeypress="searchBJ()"></input>
					<div id="div_search">
					</div>					
				</div>
			</div>
		</div>
		<footer class="modal-container-footer">
			<button id="btn_cancel" class="button is-ghost">닫기</button>
			<!-- <button id="btn_save" class="button is-primary">저장</button> -->
		</footer>
	</article>
</div>`;

	if(idx==0){
		popup2('사용할 즐겨찾기를 선택하세요');
		return;
	}else{
		modal.querySelector('.modal-container-title').textContent = favRadios[idx].nextSibling.nextSibling.textContent + " 등록";
	}
		
	document.body.appendChild(modal);		
	displayBJ();
	modal.querySelector("#input_search").focus();
	
}

function displayBJ(){
	var modal = document.getElementById('modal');
		
	var div_bj = modal.querySelector('#div_bj');
	div_bj.innerHTML = '';
	var nav = ce(div_bj, 'nav', {'class':'modal-menu'});
	var ul = ce(nav, 'ul');
	var i = 1;
	for(bj of univ_settings["fav"][idx]){
		var li = ce(ul, 'li');
		var a = cetn(li, 'a', bj[1], {'href':'#'});
		a.name = bj[0];
		a.setAttribute('nickname', bj[1]);
		a.onclick = function(){
			var nickname = event.target.getAttribute('nickname');
			if (confirm( nickname + '\n선택한 BJ를 게임 상대에서 삭제합니다.')) {
				deleteBJ(event.target.getAttribute('name'));
			}
		};
	}
	
}

function closeModal(modal){
	if(event.target.matches("#btn_close") || event.target.matches("#btn_cancel") || (!event.target.closest(".modal-container") && !event.target.closest("a"))) {
		modal.remove();
		location.reload();
		//showMonthModal();
	}	
}

function searchBJ(){
	if (event.keyCode === 13) {
		event.preventDefault();
		var input_search = document.getElementById("input_search");
		var name = input_search.value;
		
		if(name.length < 1){
			return;
		}
		
		input_search.value = '';
		var div_search = document.getElementById('div_search');	
		div_search.innerHTML = '';
		var names = [];
		/* if(record_list.hasOwnProperty(name)){
			names.push(name);
		}else */{
			for(var bj of bj_list){
				if(bj[0].includes(name) && record_list.hasOwnProperty(bj[0]) && record_list[bj[0]][0][9] !== ''){
					if( ! names.includes(bj[0])){
						names.push(bj[0]);
					}
				}
			}
		}
		if(names.length == 1){
			insertBJ(names[0]);
		}else if(names.length > 1){
			var nav = ce(div_search, 'nav', {'class':'modal-menu'});
			var ul = ce(nav, 'ul');
			
			for(bj of names){
				var li = ce(ul, 'li');
				var a = cetn(li, 'a', bj, {'href':'#'});
				a.name = bj;
				a.onclick = function(){
					insertBJ(event.target.getAttribute('name'));
				};
			}
		}else{
			var aid = prompt("검색 결과가 없습니다.\n수동 입력을 하시려면 BJ의 아프리카 아이디를 입력하세요.", "");
			if (aid != null) {
			  insertBJ2(name, aid);
			}
		}		
	}
}

function insertBJ(name){
	var aid = record_list[name][0][9];
	if(!aid || aid==''){
		return;
	}
	var match = false;
	for(var s of univ_settings["fav"][idx]){
		if(s[0] == aid){
			match = true;
			break;
		}
	}
	if(!match){
		univ_settings["fav"][idx].push([aid, name]);
		localStorage.setItem('univ_settings', JSON.stringify(univ_settings));
		
		displayBJ();
	}	
}

function insertBJ2(name, aid){
	
	var match = false;
	for(var s of univ_settings["fav"][idx]){
		if(s[0] == aid){
			match = true;
			break;
		}
	}
	if(!match){
		univ_settings["fav"][idx].push([aid, name]);
		localStorage.setItem('univ_settings', JSON.stringify(univ_settings));
		
		displayBJ();
	}	
}
function deleteBJ(aid){
	for(var i = 0; i < univ_settings["fav"][idx].length; i++){
		if(univ_settings["fav"][idx][i][0] == aid){
			univ_settings["fav"][idx].splice(i, 1);			
			localStorage.setItem('univ_settings', JSON.stringify(univ_settings));			
			break;
		}
	}
	
	displayBJ();
}
