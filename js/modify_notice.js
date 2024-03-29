async function getDataAsync(url = '') {
	var response = await fetch(url);
	var data = await response.json();
	return data;
}

function postData(url = '', name, notice) {
	return fetch(url, {
    method: 'POST',
	headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: 'name=' + name + '&notice=' + encodeURIComponent(notice)
  })
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

function modify_notice(){
	const sp_notice = document.getElementById('sp_notice');
	const ta_notice = document.getElementById('ta_notice');
	if(event.target.textContent == '수정하기'){		
		event.target.textContent = '저장';
		ta_notice.value = sp_notice.textContent;
		sp_notice.style.display = 'none';
		document.getElementById('ta_notice').style.display = 'block';
	} else {
		event.target.textContent = '수정하기';
		sp_notice.style.display = 'block';
		ta_notice.style.display = 'none';
		
		if(ta_notice.value == sp_notice.textContent){
			return;
		}
		
		if(ta_notice.value.trim() == ''){
			if( ! confirm("입력된 내용이 없습니다.\n내용 없이 저장하시겠습니까?")){
				return;
			}
		}
					
		postData('https://test.aengji.com/afreecatv/afreecatv_notice_insert.php', univ_name, ta_notice.value).then(data => {
			if(data == 'OK'){				
				sp_notice.textContent = ta_notice.value;
				
				var dialog = popup3('감사합니다.\n좋은 하루 되세요.');
				setTimeout(() => {
					dialog.close();
				}, 1000);
			}else {
				if(data.hasOwnProperty("BLOCKED")){
					alert('부적절한 글 수정으로 차단된 사용자입니다.\n관리자에게 문의하세요.\n\n차단 사유:' + data["BLOCKED"]);
				}else{
					alert('저장에 실패하였습니다. 관리자에게 문의하세요');
				}
			}
		});
	}
}


getDataAsync('https://test.aengji.com/afreecatv/afreecatv_notice2.php?name=' + univ_name).then(data => {
	document.getElementById('sp_notice').textContent = data;
}).catch((error) => {
  console.error('실패:', error);
});