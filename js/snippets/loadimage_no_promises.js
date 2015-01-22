function loadImageFromDataAttr(img, successCallback, errorCallback) {
  var dataSrc = img.getAttribute('data-src');
  if(!dataSrc){
    errorCallback('no data src on image');
  }

  img.onload = function(){
    successCallback('successfully loaded');
  }
  img.onerror = function(){
    errorCallback('image failed to load');
  };
  img.src = dataSrc;
}

var testImage = document.getElementById('img-id');

loadImageFromDataAttr(testImage,
  function(msg) {

  }, function(msg) {

);
