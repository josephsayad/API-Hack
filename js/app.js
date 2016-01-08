var DEBUG = false;

$(document).ready(function(){
  runApplication();
});

function runApplication() {
  $('.input-form').on('click', 'button', function(event) {
    event.preventDefault();

    // zeros out results container if previous search has run
    $('.data-display').html('');
    
    var userName = null, artistName = null;
    userName = $('.user-name').val();
    artistName = $('.artist-name').val();
    $('.user-status').html(userName);
    $('.artist-status').html(artistName + ',');
    $('.status').fadeIn();
    
    if(DEBUG) {console.log(userName + ' likes ' + artistName);}
    getNewArtists(artistName);
  });
}

function getNewArtists(content) {
  // the parameters needed to pass in a request to the TasteKid API.
  var request = {
    q: content, 
    type: 'music',
    info: 1, 
    k: '191288-APIHack-815HRZIG',
    limit: 10
  };
  $.ajax({
    url: 'https://www.tastekid.com/api/similar',
    data: request,
    dataType: 'jsonp', 
    type: 'GET',
  })
  // this waits for the ajax to return with a succesful promise object.
  .done(function(result) {
    var counter = 0;
    // $.each is a higher order function. It takes an array and a function as an argument.
    $.each(result.Similar.Results, function(i, item) {
      var artistNumber = new Array('One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten');
      if(DEBUG) {console.log(item);}
      var newArtist = showArtist(item.Name, artistNumber[counter], item.wTeaser, item.yUrl);
      $('.data-display').append(newArtist);
      counter++;
    });
  });
}

function showArtist(artistName, artistNumber, artistInfo, youtubeContent) {
  var result = ('<div class="featured-artist template col-xs-10 col-xs-offset-1 well-lg"><div class="row"><div class="col-xs-12"><h2 class="artist-header lead">Artist'+ artistNumber +':<span> '+ artistName +'</span></h2></div></div><div class="row"><div class="col-xs-12 teaser"><p class="col-xs-8 text-justify hidden-xs">'+ artistInfo +'</p></div><div class="col-xs-12 teaser youtube"><p class="col-xs-8 text-justify"><a href="'+ youtubeContent +'" target="_blank">Check This Artist Out!</a></p></div></div></div>');
  return result;
}
