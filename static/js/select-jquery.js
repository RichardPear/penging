(function($){
	$(".wrap").click(function(){
        var $options = $(this).find(".options");
        var flag = ($options.is(":hidden"));
        $(".options").hide();
        flag ? $options.show() : $options.hide();
        return false;
    });
	$(".options").click(function(e){
        if(e.target.nodeName.toUpperCase() == "LI"){
            $(this).prev().prev().html($(e.target).html());
        }
		$(this).hide();
		return false;
	});
	$(document).click(function(){
		$(".options").hide();
	});
})(jQuery);