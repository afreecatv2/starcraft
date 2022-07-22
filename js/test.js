
function postData(url = '', data) {
	// var a = Math.floor(Math.random() * 1000000);
	
	return fetch(url, {
    method: 'PUT',
	headers: {'User-Agent': username, 'Accept':'application/vnd.github.v3+json', 'Authorization':'token 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'},
    body: data
  })
	.then((response) => {
		return response;
	})
	.then((data) => {
		return data;
	})
	.catch(function (error) {
		console.log(error);
	});
}
async function getDataAsync(url = '') {
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

var username = '0000u';
var token = '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';
var url = "https://api.github.com/repos/0000u/api/contents/test.json";
var curl_url = url;
var curl_token_auth = 'Authorization: token ' + token;
var sha = '';
getData(url).then(data => {
	
	sha = data.sha;
	postData(url,'[""]').then(data2 => {
	
		console.log(data2);
	});
});
