function loadJSON(url){
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            resolve(json);
          } else {
            reject(xhr.responseText);
          }
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  });
}

var jsonLoadedPromise = loadJSON('/js/snippets/imagedata.json');

jsonLoadedPromise
  .then(function(json){
    console.log(json);
  })
  .catch(function(error){
    console.log('error: ', error);
  })

