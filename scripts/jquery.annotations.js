/*!
 * jQuery Annotations
 * Annotate elements to use common jQuery functions.
 * 
 */
(function($) {

    if (!$) {
        throw 'Missing dependency: jQuery. Please include jQuery.';
    }
    
    // Regular expression to validate an annotation.
    var expr = /@[a-z|A-Z]+\-[\w]+[\-]?[\w]+[\-]?[\w]+/g;
    
    // Browser events.
    var events = [];
    $.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error").split(" "), function(i, name) {
        events.push('on' + name);
    });
    
    // Initialize the annotation inspection.
    $(function() {
        
        // Inspect all elements for annotations.
        var $elements = $('[class]');
        $elements.each(function() {
            var $element = $(this);
            var annotations = getAnnotations($element);
            if (annotations.length > 0) {
                
                // Annotations found.
                $.each(annotations, function(i, annotation) {
                    processAnnotation.apply($element, [annotation]);
                });
            }
        });
    });
    
    /**
     * Process a set of annotation.
     */
    function processAnnotation(annotation) {
    
        // Bind the event to the element.
        $(this).bind(annotation.event, function() {
            if (annotation.arg) {
                $(annotation.target)[annotation.action](annotation.arg);
            }
            else {
                $(annotation.target)[annotation.action]();
            }
        });
    }
    
    /**
     * Return all annotations in a element.
     */
    function getAnnotations($element) {
        var sources = $element.attr('class').match(expr) || [];
        var annotations = [];
        $.each(sources, function(i, source) {
            // Parse the source; remove '@' character then split by '-'.
            source = source.substr(1).split('-');
            var event = source[0];
            var action = source[1];
            var target = source[2];
            // Lookup for a 'target' element.
            target = typeof target === 'string' ? getTarget(target) : $element;
            var arg = source[3];
            // Check for valid event & valid jQuery function.
            if (isEvent(event) && isJQueryFunction(source[1])) {
                // Remove the 'on' prefix of the event.
                event = event.substr(2);
                annotations.push(new Annotation(event, action, target, arg));
            }
        });
        return annotations;
    }
    
    /**
     * Return a 'target' element based on a source string.
     */
    function getTarget(source) {
        var $target;
        $target = $('#' + source);
        if ($target.length === 0) {
            $target = $('.' + source);
        }
        return $target;
    }
    
    /**
     * Return 'true' if the given event name is a real browser event.
     */
    function isEvent(event) {
        return $.inArray(event, events) !== -1;
    }
    
    /**
     * Return 'true' if the given function name is a jQuery function.
     */
    function isJQueryFunction(func) {
        return $.fn[func] !== undefined;
    }
    
    /**
     * The 'annotation' object.
     */
    var Annotation = function(event, action, target, arg) {
            this.event = event;
            this.action = action;
            this.target = target;
            this.arg = arg;
        };

})(jQuery);