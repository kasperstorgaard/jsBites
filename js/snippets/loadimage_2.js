function loadImage($img) {
    var deferred = new jQuery.Deferred();
    $img.load(function() {
        deferred.resolve(jQuery(this));
    }).error(function() {
        deferred.reject({ msg: "failed to load image", $el: jQuery(this) });
    });
    
    return deferred.promise(); //promise is invoked here instead
}
var $fakeImage = jQuery('#fake-image');
loadImage($fakeImage)
    .then(function success() { console.log('success');  },
          function fail() { console.log('fail'); });

$fakeImage.attr('src', 'http://fakeimg.pl/350x200/?text=World&font=lobster')