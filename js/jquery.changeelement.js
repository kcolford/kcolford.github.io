// jQuery plugin to change the type of an element.

// Courtesy of
// http://stackoverflow.com/questions/8584098/how-to-change-an-element-type-using-jquery#answer-8584217

(function($) {
    $.fn.changeElementType = function(newType) {
      $.each(this, function() {
        var attrs = {};

        $.each(this.attributes, function(idx, attr) {
          attrs[attr.nodeName] = attr.value;
        });

        $(this).replaceWith(function() {
          return $("<" + newType + "/>", attrs).append($(this).contents());
        });
      });
    };
})(jQuery);
