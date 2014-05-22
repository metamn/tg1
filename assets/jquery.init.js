$(document).ready(function() {
  var grid = "";
  for (i=0; i<500; i++) {
    grid += '<div class="col">';
    grid += '<div class="gutter-right">&nbsp;</div>';
    grid += '<div class="gutter-bottom">&nbsp;</div>';
    grid += '</div>';
  }
  
  $("body").append(
    '<section id="grid">' + grid + '</section>'
  );
  
});