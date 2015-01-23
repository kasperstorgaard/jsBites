//Promises A+
function getErrorPromise(){
  return new Promise(function (resolve, reject) {
    throw new Error('testError')
  });
}

var promise = getErrorPromise();

promise.catch(function(error){
  console.log(error);
});

//jQuery, no error handling
function getErrorPomiseJQuery (argument) {
  var deferred = $.Deferred();
  throw new Error('testError');
  return deferred.promise();
}

var promise = getErrorPomiseJQuery();

promise.fail(function(error){
  console.log(error);
});

//jQuery, error handling
function getErrorPomiseJQuery (argument) {
  var deferred = $.Deferred();
  try {
    throw new Error('testError');
  } catch(error) {
    deferred.reject(error);
  }

  return deferred.promise();
}

var promise = getErrorPomiseJQuery();

promise.fail(function(error){
  console.log(error);
});

