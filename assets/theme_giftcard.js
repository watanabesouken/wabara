$(function(){
    // ギフトカード購入者ページのアコーディオン展開
    var qaTitle = $('#accordionList .qaTtl');
    qaTitle.each(function() {
        $(this).on('click', function() {
            $(this).toggleClass('is-open')
            $(this).next('.qaContent').slideToggle(300);
        });
    });
});