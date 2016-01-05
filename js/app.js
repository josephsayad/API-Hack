var DEBUG = true;

$(document).ready(function(){
  runApplication();
});

function runApplication() {
  $('.input-form').on('click', 'button', function(event) {
    event.preventDefault();
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
    limit: 6
  };
  $.ajax({
    url: 'https://www.tastekid.com/api/similar',
    data: request,
    dataType: 'jsonp', 
    type: 'GET',
  })
  .done(function(result) {
    console.log(result);
    var counter = 0;
    $.each(result.Similar.Results, function(i, item) {
      var artistNumber = new Array('One', 'Two', 'Three', 'Four', 'Five', 'Six');
      var newArtist = showArtist(item.Name, artistNumber[counter]);
      $('.data-display').append(newArtist);
      counter++;
    });
  });
}

function showArtist(artistName, artistNumber) {
  var result = ('<div class="featured-artist template col-xs-10 col-xs-offset-1 well-lg"><div class="row"><div class="col-xs-12"><h2 class="artist-header lead">Artist'+ artistNumber +':<span> '+ artistName +'</span></h2></div></div></div>');
  return result;
}
