//functions
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

function loadImages(urls, container){
  if(!_.isArray(urls)){
    urls = [urls];
  }

  var promises = _.map(urls, function(url){
    return createImage(url, container);
  });

  return Promise.all(promises);
}

function createImage (url, container){
  var image = new Image();

  return new Promise(function (resolve, reject) {
    if(!container){
      reject({error: 'no container element'});
      return;
    }

    if(!url){
      reject({error: 'no url'});
      return;
    }

    image.onload = function(){
      resolve(image);
    }

    image.onerror = function(){
      reject(image);
    }

    image.src = url;
    container.appendChild(image);
  });
}

var imageContainer = document.getElementById('image-container');

var jsonLoaded = loadJSON('/js/snippets/imagedata.json');

jsonLoaded
  .then(function (json) {
    var urls = _.pluck(json, 'url');
    return loadImages(urls, imageContainer);
  })
  .then(function (images) {
    console.log('done loading!');
  })
