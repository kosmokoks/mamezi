$(document).ready(function () {

    countDownTimer();
    handleAjaxCall();
    handleChangeLimitClick();

    function countDownTimer() {
        if ($(".time").length > 0) {
            var countDownDate = new Date("March 14, 2019 23:59:25").getTime();

            var x = setInterval(function () {
                var now = new Date().getTime();
                var distance = countDownDate - now;
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                $(".day").html(days);
                $(".hrs").html(hours);
                $(".min").html(minutes);
                $(".sec").html(seconds);

                if (distance < 0) {
                    clearInterval(x);
                    $(".time").html("Promocja zakończyła się");
                }
            }, 1000);
        }
    }

    function handleAjaxCall(limit = 4) {
        var results = [];

        $.ajax({
            type: "get",
            url: "example.json",
            success: function (data) {
                if (data.count > 0) {
                    var listItems = data.list;

                    $.each(listItems, function (i, val) {
                        if (i < limit) {
                            var extraHtml = '<div>';
                            extraHtml += '<a href="'+val.url+'" class="inner-box">';
                            extraHtml += '<div class="top flex">';
                            extraHtml += '<div class="quantity flex">';
                            extraHtml += '<i class="icon-a"></i>';
                            extraHtml += '<div>';
                            extraHtml += val.availability.name;
                            extraHtml += '</div>';
                            extraHtml += '</div>';
                            extraHtml += '<div class="save-money flex">Oszczędzasz: ';
                            extraHtml += '<strong>';
                            extraHtml += val.price.gross.base_float - val.price.gross.promo_float + "zł";
                            extraHtml += '</strong>';
                            extraHtml += '</div>';
                            extraHtml += '</div>';
                            extraHtml += '<div class="photo">';
                            extraHtml += '<img src="https://www.outletmeblowy.pl/environment/cache/images/300_300_productGfx_' + val.main_image + '' + ".jpg" + '">';
                            extraHtml += '</div>';
                            extraHtml += '<div class="bottom">';
                            extraHtml += '<div class="price flex">';
                            extraHtml += '<div class="current">';
                            extraHtml += val.price.gross.final_float + " zł";
                            extraHtml += '</div>';
                            extraHtml += '<div class="old">';
                            extraHtml += val.price.gross.base_float + " zł";
                            extraHtml += '</div>';
                            extraHtml += '</div>';
                            extraHtml += '<div class="info-text">';
                            extraHtml += val.name;
                            extraHtml += '</div>';
                            extraHtml += '<div class="brand">';
                            extraHtml += val.producer.name;
                            extraHtml += '</div>';
                            extraHtml += '</div>';
                            extraHtml += '</a>';
                            extraHtml += '</div>';

                            results.push(extraHtml);
                        }
                    });
                } else {
                    results.push('<div>Brak przedmiotów</div>');
                }
                $('.row').addClass('active').html(results);
            },
        });
    }

    function handleChangeLimitClick() {
        var changeLimitBtn = $('.change-limit');

        changeLimitBtn.click(function (e) {
            e.stopPropagation();
            $('.row').removeClass('active');
            changeLimitBtn.removeClass('active');
            $(this).addClass('active');

            handleAjaxCall($(this).attr('data-limit'));
        });
    }
});