 $("div.wrap2>ul").on("click","[data-toggle='item']",function(e){
		var $target=$(e.target);
		if(!$target.parent().hasClass("active")){
			$target.parent()
						.siblings(".active")
						.removeClass("active");
			$target.parent().addClass("active");
			$($(this).attr("href")).addClass("active")
										.siblings(".active")
										.removeClass("active");
		}
	}
 );
 $("div.wrap2>ul>li>a").click(function(e) {
	  e.preventDefault();
      var $target=$(e.target);
      $target.parent().children(".bgm").css('display', 'block');
	  $target.parent().siblings().children(".bgm").css('display', 'none');
      $target.addClass("bg");
      $target.parent().siblings().children("[data-toggle='item']").removeClass("bg");
  }
);
$(function () {
        var container = $('.container');
        var list = $('.list-list');
        var prev = $('#prev');
        var next = $('#next');
        var index = 1;
        var len = 4;
        var interval = 2000;
        var timer;
            function animate (offset) {
                var left = parseInt(list.css('left')) + offset;
                if (offset>0) {
                    offset = '+=' + offset;
                }
                else {
                    offset = '-=' + Math.abs(offset);
                }
                list.animate({'left': offset}, 300, function () {
                    if(left > -200){
                        list.css('left', -621 * len);
                    }
                    if(left < (-621 * len)) {
                        list.css('left', -621);
                    }
                });
            }
            function play() {
                timer = setTimeout(function () {
                    next.trigger('click');
                    play();
                }, interval);
            }
            function stop() {
                clearTimeout(timer);
            }
            next.bind('click', function () {
                if (list.is(':animated')) {
                    return;
                }
                if (index == 5) {
                    index = 1;
                }
                else {
                    index += 1;
                }
                animate(-621);
            });
            prev.bind('click', function () {
                if (list.is(':animated')) {
                    return;
                }
                if (index == 1) {
                    index = 5;
                }
                else {
                    index -= 1;
                }
                animate(621);
                showButton();
            });
            container.hover(stop, play);
            play();
        }
	);