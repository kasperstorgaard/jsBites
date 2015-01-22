function loadImage($img) {
    var deferred = new jQuery.Deferred();
    $img.load(function() {
        deferred.resolve(jQuery(this));
    }).error(function() {
        deferred.reject({ msg: "failed to load image", $el: jQuery(this) });
    });
    
    return deferred.promise(); //promise is invoked here instead
}
jQuery.when(loadImage(jQuery('#some-image'))).then(
    function success() { /*dostuff*/ },
    function fail(){ /*dostuff*/ }
);