readMore = function() { /* to make sure the script runs after page load */

    $('.description').each(function (event) { /* select all divs with the item class */
        var _this = $(this);
        var max_length = 15;
        /* set the max content length before a read more link will be added */

        if (_this.html().length > max_length) { /* check for content length */

            var short_content = _this.html().substr(0, max_length);
            /* split the content in two parts */
            var long_content = _this.html().substr(max_length);

            _this.html(short_content +
                '<a href="#" class="read_more"><br/>Read More</a>' +
                '<span class="more_text" style="display:none;">' + long_content + '</span>' +
                '<a href="#" style="display: none;" class="less">Hide</a>');
            /* Alter the html to allow the read more functionality */

            _this.find('a.read_more').click(function (event) { /* find the a.read_more element within the new html and bind the following code to it */
                var clicked = $(this);
                event.preventDefault();
                /* prevent the a from changing the url */
                clicked.hide();
                /* hide the read more button */
                clicked.parents('.description').find('.more_text').show();
                clicked.parents('.description').find('.less').show();
                /* show the .more_text span */

            });
            _this.find('a.less').click(function(e){
                var clicked = $(this);
                e.preventDefault();
                clicked.hide();
                clicked.parents('.description').find('.more_text').hide();
                clicked.parents('.description').find('.read_more').show();
            })

        }

    });
};
