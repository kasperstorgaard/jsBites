//promises
getGeoLocation() //async call, returns a promise
  .then(getRestaurants) //async call, returns a promise
  .then(getMenuImages) //async call, returns a promise
  .then(displayImages) //sync call
  .catch(handleError)

//sync code
try {
  var location = getGeoLocation(); //blocking
  var restaurants = getRestaurants(location); //blocking
  var menuImages = getMenuImages(restaurants);
  displayImages(menuImages):

} catch(error) {
  handleError(error);
}


//callbacks
getGeoLocation(function (location, error) {
  if(error){
    handleError(error);
    return;
  }

  getRestaurants(location, function (restaurants, error) {
    if(error){
      handleError(error);
      return;
    }

    getMenuImages(restaurants, function (menuImages) {
      if(error){
        handleError(error);
        return;
      }

      displayImages(menuImages);
      //if this fail, we would need error handling here aswell
    });
  });
});
//callbacks still don't look that bad,
//but with more complexity and longer chains, it gets ugly fast.

