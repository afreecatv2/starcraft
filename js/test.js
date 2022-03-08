
function log(msg){
	console.log(msg);
}

//displayData(data, filter);
getDataAsync('http://www.aengji.com/fifa/index.html').then(data => {
	log(1);
	log(data);
});



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

