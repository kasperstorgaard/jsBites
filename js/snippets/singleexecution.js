var promise = new Promise(function(resolve, reject){
  for(var i=0; i<100; i++){
    resolve(i);
  }
});

promise.then(function (data) {
  console.log(data);
})
