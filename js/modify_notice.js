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
		sp_notice.textContent = ta_notice.value;
		
		postData('https://test.aengji.com/afreecatv/afreecatv_notice_insert.php', univ_name, ta_notice.value).then(data => {
			if(data == 'BLOCKED'){
				alert('부적절한 글 수정으로 차단된 사용자입니다.\n관리자에게 문의하세요.');
			}else if(data == 'OK'){
				var dialog = popup3('감사합니다.\n좋은 하루 되세요.');
				setTimeout(() => {
					dialog.close();
				}, 1000);
			}
		});
	}
}