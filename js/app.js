var DEBUG = true;

$(document).ready(function(){
  runApplication();
});

function runApplication() {
  $('.input-form').on('click', 'button', function(event) {
    event.preventDefault();
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
  .done(function(result) {
    var counter = 0;
    $.each(result.Similar.Results, function(i, item) {
      var artistNumber = new Array('One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten');
      console.log(item);
      var newArtist = showArtist(item.Name, artistNumber[counter], item.wTeaser, item.yUrl);
      $('.data-display').append(newArtist);
      counter++;
    });
  });
}

function showArtist(artistName, artistNumber, artistInfo, youtubeContent) {
  var result = ('<div class="featured-artist template col-xs-10 col-xs-offset-1 well-lg"><div class="row"><div class="col-xs-12"><h2 class="artist-header lead">Artist'+ artistNumber +':<span> '+ artistName +'</span></h2></div></div><div class="row"><div class="col-xs-12 teaser"><p class="col-xs-8 text-justify">'+ artistInfo +'</p></div><div class="col-xs-12 teaser youtube"><p class="col-xs-8 text-justify"><a href="'+ youtubeContent +'" target="_blank">Check This Artist Out!</a></p></div></div></div>');
  return result;
}
