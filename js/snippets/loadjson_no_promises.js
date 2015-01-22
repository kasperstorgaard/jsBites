function loadJSON(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            //this might give and exception,
            //promises take care of exception handling out of the box
            var json = JSON.parse(xhr.responseText);
            callback({error: null, data: json});
          } else {
            callback({error:xhr.responseText, data: null});
          }
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

loadJSON('/js/snippets/imagedata.json', function(response){
  if(response.error){
    console.log('error: ', response.error);
    return;
  }
  console.log(response.data);
});

