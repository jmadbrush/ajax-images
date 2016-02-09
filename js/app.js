$(document).ready(function() {


 $('form').submit(function(e) {
   //stop form  from submitting
   e.preventDefault();
   
   var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"; 
   var $searchField = $('#search');
   var $submitButton = $('#submit');
   var searchValue = $('input[type=search]').val();
   var flickrOptions = {
      tags: searchValue,
      format: "json"
   };
   
   $searchField.prop("disabled", true);
   $submitButton.attr("disabled", true).val("searching...");

   // the AJAX part
   
    function displayPhotos(data) {
      if ($.isEmptyObject(data.items) === false) {
          var photoHTML = '<ul>';
          $.each(data.items,function(i,photo) {
            photoHTML += '<li class="grid-25 tablet-grid-50">';
            photoHTML += '<a href="' + photo.link + '" class="image">';
            photoHTML += '<img src="' + photo.media.m + '"></a></li>';
          }); // end each
          //Start HTML form manipulation
          photoHTML += '</ul>';
          $('#photos').html(photoHTML);
          $searchField.prop("disabled", false);
          $submitButton.attr("disabled", false).val("Search");
      } else {
           $searchField.prop("disabled", false);
           $submitButton.attr("disabled", false).val("Search");
           $('#photos').html('<b>' + searchValue + '</b> is not a valid search term.');
      }
    }// end function
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);

  }); // end click

}); // end ready