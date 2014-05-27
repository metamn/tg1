$(document).ready(function() {
  
  
  // The harmony calculator
  $('body').append('<div class="h-horizontal"></div>');
  $('body').append('<div class="h-vertical"></div>');
  
  //var elements = '[{"id" : "header", "type" : "text"},{"id" : "footer","type" : "text"},{"id" : "article","type" : "image", "collection" : "true"}]';
  var elements = '[{"id" : ".object", "type" : "image", "collection" : "true"}]';
  
  var sum = 0;
  var sumX = 0;
  var sumY = 0;
  
  var windowHeight = $(window).height();
  var windowWidth = $(window).width();
  
  // Loop through elements
  var data = $.parseJSON(elements);
  $.each(data, function() {
    if (this['collection']) {
      
      // A collection of articles, images
      var type = this['type'];
      $(this['id']).each(function() {
        calculate($(this), type);
      });
    } else {
      
      // A single standalone item
      calculate($(this['id']), this['type']);
    }
  });
  
  
  // Draw the gravity point
  var x = windowWidth / 2 + sumX / sum;
  var y = windowHeight / 2 - sumY / sum;
  var style = 'left: ' + x + 'px; top: ' + y + 'px';
  $('body').append('<div class="h-gravity-point" style="' + style + '"></div>');
  
  
  // Calculate
  function calculate(item, type) {
    var weight = getElementWeight(item, type);
    var x = distanceX(item);
    var y = distanceY(item);
    
    sum += weight;
    sumX += weight * x;
    sumY += weight * y;
  }
  
  
  // Get the distance of the center of an element from origo
  function distanceX(item) {
    var w = item.css('width');
    var centerX = parseInt(w) / 2;
    
    var position = item.offset();
    
    var coordinateX = position.left + centerX;
    return coordinateX - windowWidth / 2;
  }
  
  function distanceY(item) {
    var h = item.css('height');
    var centerY = parseInt(h) / 2;
    
    var position = item.offset();
    
    var coordinateY = position.top + centerY;
    return windowHeight / 2 - coordinateY;
  }
  
  
  // Get a single elements weight
  function getElementWeight(item, type) {
    var w = item.css('width');
    var h = item.css('height');
    return parseInt(w) * parseInt(h) * getGravityByType(type);
  }
  
  function getGravityByType(type) {
    return (type == 'text') ? 0.4 : 0.7;
  }
  
  
  
  
  
  
  
  
  
  // The visual grid
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