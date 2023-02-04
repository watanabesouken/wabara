$(function() {


    var initAnkerScroll = function(fix_boolean, time_scroll, header) {

        var headerHight = 0;

        //固定ヘッダーが存在する場合の分岐
        if (fix_boolean == true) {
            headerHight = $(header).height();
        }

        //外部アンカーリンクからの遷移処理
        $(document).ready(function() {
            if (location.hash != "") {
                var targetDiv = $(location.hash);
                $('html,body').animate({
                    scrollTop: targetDiv.offset().top - headerHight
                }, time_scroll, 'easeOutQuart');
                return false;
            }
        });

        //ページ内アンカーリンクの処理
        var $anker = $("a[href*='#']:not([href='#']):not([href^='#tab']):not([href^='#quicktab']):not([href^='#pane'])");

        $anker.on('click', function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - headerHight
                    }, time_scroll, 'easeOutQuart');
                    return false;
                }
            }
        });

    }
    initAnkerScroll(true, 500, "#commonHeader");

    // PCヘッダー表示
    $('.transparentHeaderActive .header').hover(
        function() {
            $(this).removeClass('is-transparent')
        },
        function() {
            $(this).addClass('is-transparent')
        }
    );
    $('.transparentHeaderActive #smtGnaviBtn').hover(
        function() {
            //$('.template-index .header').removeClass('is-transparent')
        },
        function() {
            //$('.template-index .header').addClass('is-transparent')
        }
    );

    // SPヘッダー表示
    $('#smtGnaviBtn').on('click', function() {
        //$('body').toggleClass('fixed');
        $(this).toggleClass('is-open');
        $('.transparentHeaderActive .header').toggleClass('gnav-open');
        $('.gnav').fadeToggle(500);
    });

    // SPヘッダーのドロップダウン展開
    var slideToggleBtn = function(target, content) {
        $(target).each(function() {
            var self = $(this);
            self.on('click', function() {
                $(target).not(self).removeClass('is-open').next(content).slideUp(300);
                self.toggleClass('is-open').next(content).slideToggle(300);
            });
        });
    }
    slideToggleBtn('.dropdownBtn', '.toggleMenu');

    // わばら図鑑
    $('.fileterShowBlock').on('click', function() {
        $(this).next('.sidebarContent').slideToggle();
        $(this).toggleClass('show');
    });

    // 固定ページのスライダー
    $('#heroSlider').slick({
        dots: true,
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false
    });

    // 商品詳細ページのスライダー
    function sliderSetting() {
        var width = $(window).width();
        if (width <= 768) {
            $('#productSlider').not('.slick-initialized').slick({
                dots: true,
                fade: false,
                speed: 200,
                cssEase: 'ease-out',
                adaptiveHeight: true,
                autoplay: false
            });
        } else {
            $('#productSlider.slick-initialized').slick('unslick');
        }
    }
    sliderSetting();

    $(window).resize(function() {
        sliderSetting();
    });

    // 商品ページ数量変更
    var quantityElm = $("#Quantity"),
        quantityElmCopy = $("#Quantity-sub");
    quantityElm.on('mouseup keyup', function(e) {
        var quantity = parseInt($(this).val()),
            quantityMax = parseInt(quantityElm.attr('max')),
            quantityMin = parseInt(quantityElm.attr('min'));
        if (quantity > quantityMax) { $(this).val(quantityMax); }
        if (quantity < quantityMin) { $(this).val(quantityMin); }
        if (isNaN(quantity)) { $(this).val('1'); }
        quantityElmCopy.val($(this).val());
    });
    quantityElmCopy.on('mouseup keyup', function(e) {
        var quantity = parseInt($(this).val()),
            quantityMax = parseInt(quantityElm.attr('max')),
            quantityMin = parseInt(quantityElm.attr('min'));
        if (quantity > quantityMax) {
            $(this).val(quantityMax);
        }
        if (quantity < quantityMin) {
            $(this).val(quantityMin);
        }
        if (isNaN(quantity)) { $(this).val('1'); }
        quantityElm.val($(this).val());
    });
    $(".increase-quantity").on('click', function() {
        var quantity = parseInt(quantityElm.val()),
            quantityMax = parseInt(quantityElm.attr('max'));
        if (quantity < quantityMax) {
            quantity++;
        }
        quantityElm.val(quantity);
        quantityElmCopy.val(quantity);
    });
    $(".decrease-quantity").on('click', function() {
        var quantity = parseInt(quantityElm.val());
        if (quantity > 1) {
            quantity--;
        }
        quantityElm.val(quantity);
        quantityElmCopy.val(quantity);
    });

    // 商品ページのモーダル展開
    $('.modalOpenBtn').on("click", function() {
        $('body').addClass('fixed');
        $('#productModal').addClass('is-open');
    });
    $('.modalCloseBtn').on("click", function() {
        $('body').removeClass('fixed');
        $('#productModal').removeClass('is-open');
    });
    $('.modalBg').on("click", function() {
        $('body').removeClass('fixed');
        $('#productModal').removeClass('is-open');
    });

    // 商品ページのバリエーション選択
    var selectedOption = $('#customVariantSelect select option:selected').text();
    $('#customVariantSelectTxt').text(selectedOption);


    // 商品ページアコーディオン展開
    var parent = $('.productInfoAcordionBtn');
    parent.each(function() {
        var self = $(this);
        self.on('click', function() {
            parent.not(self).removeClass('is-open').next('.productInfoAcordionContent').slideUp(300);
            self.toggleClass('is-open').next('.productInfoAcordionContent').slideToggle(300);
        });
    });

    // 母の日コレクションの日付絞り込み
    $('#filterDateSelect input[name=deliverFilterRadio]').on('change', function() {
      var selectedDay = $(this).val(),
          allTarget = $('#mothersDayCollection .filterTarget'),
          filterTarget = $('#mothersDayCollection .filterTarget:not(.soldOut)'),
          soldoutTarget = $('#mothersDayCollection .soldOut.filterTarget');

      // すべての日程では、非表示状態を一括解除
      if (selectedDay == "option1") {

        allTarget.removeClass("hide");

      } else {
        // すべての日程でない限り、売り切れ商品は非表示に
        soldoutTarget.addClass("hide");

        // 個別日程の出し分け実装
        filterTarget.addClass("hide");
        filterTarget.each(function(){

          var thisProduct = $(this),
              deliverAvailableList = thisProduct.find(".deliverAvailList"),
              availableOption = deliverAvailableList.find(".deliverFilterDate");

          availableOption.each(function(){
            if (selectedDay == $(this).attr("data-optionindex")) {
              thisProduct.removeClass("hide");
            }
          })

        });

      }

    });

    // カートページ、数量変更処理
    $('.quantitySelect').on('change', function() {
        $('#cartUpdate').trigger('click');
    });

    // Faqページアコーディオン展開
    var faqTitle = $('#faqContentList .faqTitle');
    faqTitle.each(function() {
        $(this).on('click', function() {
            $(this).toggleClass('is-open')
            $(this).next('.faqContent').slideToggle(300);
        });
    });

    // コスメティクスページのアコーディオン展開
    var cosmeticsTitle = $('#accordionList .cosmeticsTitle');
    cosmeticsTitle.each(function() {
        $(this).on('click', function() {
            $(this).toggleClass('is-open')
            $(this).next('.cosmeticsContent').slideToggle(300);
        });
    });

    // 共通アコーディオン展開コンポーネント
    var acordionItem = $('.acordionComponent .acordionItemHead');
    acordionItem.each(function() {
        $(this).on('click', function() {
            $(this).toggleClass('is-open')
            $(this).next('.acordionItemBody').slideToggle(300);
        });
    });
});
