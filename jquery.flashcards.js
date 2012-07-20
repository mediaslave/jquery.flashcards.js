;(function($){
 
    var card = 0;
    var isOnBack = false;

    $.fn.flashcards = function(options){

        var options = $.extend({}, $.fn.flashcards.defaults, options);

        return this.each(function() { 
            var $this = $(this);
            // build element specific options
            var o = $.meta ? $.extend({}, options, $this.data()) : options;

            $this.css({
                'background-color' : (typeof o.frontColor == 'undefined') ? '' : o.frontColor,
                'min-width': o.width,
                'width':o.width,
                'min-height': o.height,
                'height':o.height
            });

            
            var cards = $this.children();
            hideAllCards(cards, o);
            $(cards[card]).show();

            $(o.previousButton).click(function(e){
                e.preventDefault();
                ele = previous(cards, o);
                if(typeof ele !== 'undefined'){
                    o.onClickPrevious(ele);
                }
            });

            $(o.flipButton).click(function(e){
                e.preventDefault();
                ele = flip(cards, o);

                color = (isOnBack) ? (typeof o.backColor == 'undefined') ? '' : o.backColor : (typeof o.frontColor == 'undefined') ? '' : o.frontColor;
                $this.animate({'background-color' : color}, 500);
                o.onClickFlip(ele);
            });

            $(o.nextButton).click(function(e){
                e.preventDefault();
                ele = next(cards, o);
                if(typeof ele !== 'undefined'){
                    o.onClickNext(ele);
                }
            });

        });
    };
    //go to the previous card.
    function previous(cards, o){
        if(card == 0){
            return;
        }
        hideAllCards(cards, o);
        //we have to move one element up
        card --;
        //if the card is on a front of a card we need to move move one more elment up.
        if(isOnBack){
            if(card > 1){
                card --;
            }
            if(card != 0) card --;
        }else{
            card --;
        }
        isOnBack =false;
        return $(cards[card]);
    }
    //flip the card.
    function flip(cards, o){
        hideAllCards(cards, o);
        if(isOnBack){
            isOnBack = false;
            card --;
            return $(cards[card]);
        }else{
            isOnBack = true;
            card ++;
            return $(cards[card]);
        }
    }
    //go to the next card.
    function next(cards, o){
        if(card == cards.length - 1 || card == cards.length - 2){
            return;
        }
        hideAllCards(cards, o);
        //we have to move one element down
        card ++;
        //if the card is on a front of a card we need to move move one more elment down.
        if(!isOnBack){
            card++;
        }
        isOnBack =false;
        return $(cards[card]);

    }

    function hideAllCards (cards, o) {
        var ele_mid_height = parseInt(o.height) / 2;
        var ele_mid_width = parseInt(o.width) / 2;
        cards.each(function(){
            $(this).hide()
                    .css({
                        'position':'absolute',
                        'top' : ele_mid_height - ($(this).height() / 2),
                        'left' : ele_mid_width - ($(this).width() / 2),
                        'max-width' : o.width
                    });
        });
    }


    $.fn.flashcards.defaults = {
            frontColor: null,
            backColor : null,
            width: '300px',
            height: '200px',
            previousButton : '#prev',
            flipButton : '#flip',
            nextButton : '#next',
            onClickPrevious : function(){
                ele.animate( { "opacity": "show"} , 500 );
            },
            onClickFlip : function(){
                color = (isOnBack) ? $.fn.flashcards.defaults.backColor : $.fn.flashcards.defaults.frontColor;
                ele.animate( { "opacity": "show"} , 500 );
                ele.parent().animate({'background-color' : color});
            },
            onClickNext : function(){
                ele.animate( { "opacity": "show"} , 500 );
            }
    };
     
})(jQuery);