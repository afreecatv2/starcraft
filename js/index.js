
function show(){
	var input_name = document.getElementById('input_name');
	var name = input_name.value;
	if(!name || name==''){
		alert('저장명을 입력하세요.');
		throw '';
	}
	window.location.href = "/tier.html?name=" + name;

}