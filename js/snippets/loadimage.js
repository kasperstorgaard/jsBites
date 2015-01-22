function loadImageFromDataAttr (img) {
  return new Promise(function(resolve, reject) {
    var dataSrc = img.getAttribute('data-src');
    if(!dataSrc){
      reject('no data src on image');
    }

    img.onload = function(){
      resolve('successfully loaded');
    }
    img.onerror = function(){
      reject('image failed to load');
    };
    img.src = dataSrc;
  });
}

var testImage = document.getElementById('img-id');

var imageLoadedPromise = loadImageFromDataAttr(testImage);

imageLoadedPromise
  .then(function success(msg) {
      console.log(msg);
    },  function fail(msg) {
      console.log(msg);
    }
  );
