function deferFilterjQuery() {
    if (window.jQuery) {
        var $ = window.jQuery;
        $(function(){
          // On load/reload
          var pt_on_load = function() {
            // Accordion
            

            // Search
            $('.pt-display-search').not('.has_group_selected').find('input.fm-search-box').show();

            // Drop downs
            $('.pt-display-dropdown').each(function( index ) {
                $(this).find('h4').after($(this).find('.filter-clear'));
            });

            $('.pt-display-dropdown .scroll-content').each(function( index ) {
              if($(this).parent().find('.menu-trigger').length === 0) {
                if($(this).find('li.selected').length) {
                  var selected = $.map(
                    $(this).find('li.selected a'),
                    function(element){
                      return $(element).text();
                    }
                  ).join(", ");

                  if (selected.length < 30) {
                    $(this).before('<div class="menu-trigger" tabindex="0" aria-label="' + $(this).closest('.filter-group').find('h4').text() + ' dropdown selection collapsed">' + selected +'</div>');
                  } else {
                    $(this).before('<div class="menu-trigger" tabindex="0" aria-label="' + $(this).closest('.filter-group').find('h4').text() + ' dropdown selection collapsed">' + $(this).find('li.selected').length + ' Selected </div>');
                  }
                }
                else {
                  $(this).before('<div class="menu-trigger" tabindex="0" aria-label="' + $(this).closest('.filter-group').find('h4').text() + ' dropdown selection collapsed">'+ $(this).closest('.filter-group').find('h4').text() +'</div>');
                }
              }
            });

            //Sticky Mode
            

            // View more
            

            $('.filter-menu li a').attr('title', function() {
              return ($(this).closest('li').hasClass('selected') ? "Clear filter: " : "Add filter: ") + $(this).text();
            });

            // Handle nested filters
            var splitPath = function(url) {
              var splitUrl =  url.split('?')[0].split('#')[0].split('/');
              return splitUrl;
            }

            var getCollection = function(url) {
              var splitUrl = splitPath(url);
              return splitUrl[2];
            }

            var getTags = function(url) {
              var splitUrl = splitPath(url);
              return (splitUrl[3] || '').split('+');
            }

            var getCommonCollection = function(url_top, url_nested) {
              var collection_top = getCollection(url_top);
              var collection_nested = getCollection(url_nested);
              if (collection_top !== collection_nested) {
                return 'all';
              }
              return collection_top;
            }

            var getCommonTags = function(url_top, url_nested) {
              var tags_top = getTags(url_top);
              var tags_nested = getTags(url_nested);

              return tags_top.filter(function(n) {
                return tags_nested.indexOf(n) > -1;
              });
            }

            var getCommonUrl = function(url_top, url_nested) {
              var val = '/collections/' + getCommonCollection(url_top, url_nested) + '/' + getCommonTags(url_top, url_nested).join('+');

              var lastChar = val.slice(-1);
                    if (lastChar == '/') {
                    val = val.slice(0, -1);
                }

              return val;
            }

            var clearNestedParent = $('.pt-display-nested').prev().each(function() {
              var clearNested = $(this).next().find('a.filter-clear').attr('href');
              if (!clearNested) return;
              var clearLink = $(this).find('a.filter-clear');
              clearLink.attr('href', getCommonUrl(clearLink.attr('href'), clearNested))
              var filterLinks = $(this).find('li.selected .collection-name a').each(function() {
                $(this).attr('href', getCommonUrl($(this).attr('href'), clearNested));
              })
            })
          }

          pt_on_load();

          // Mobile filter button
          
          $(document).on('click', '.filter-menu .pt-mobile-header a', function(e){
            if(e.handled !== true) {
              if ($('.pt-nav-toggle').hasClass('active')) {
                $('.filter-menu').removeClass('pt-expand');
                $('.pt-display-dropdown .scroll-content').hide();
                $('.pt-nav-toggle').attr('aria-expanded', 'false');
                $('.pt-nav-toggle').attr('aria-label', 'Show Filters');
              } else {
                $('.filter-menu').addClass('pt-expand');
                $('.pt-nav-toggle').attr('aria-expanded', 'true');
                $('.pt-nav-toggle').attr('aria-label', 'Hide Filters');
              }

              $('.pt-nav-toggle').toggleClass('active');
              e.preventDefault();
              e.handled = true;
            }
          });

          

          // Accordion
          

          // Search
          $(document).on('keyup', '.filter-group input.fm-search-box', function () {
            var value = this.value.toLowerCase();
            $(this).closest('.filter-group').find('li').each(function () {
              if ($(this).text().toLowerCase().search(value) > -1) {
                $(this).show(100);
              } else {
                $(this).hide(100);
              }
            });
          });

          // Drop downs
          $(document).on('click','.pt-display-dropdown .menu-trigger', function() {
            $(this).next('.scroll-content').css('top', $(this).position().top + $(this).height() + 1).css('left', $(this).position().left);
            $(this).next('.scroll-content').slideToggle('fast');
            $(this).next('.scroll-content').toggleClass('dropdown-open')
            if ($(this).next('.scroll-content').hasClass('dropdown-open')) {
              $(this).attr('aria-label', $(this).closest('.filter-group').find('h4').text() + ' dropdown selection expanded');
            } else {
              $(this).attr('aria-label', $(this).closest('.filter-group').find('h4').text() + ' dropdown selection collapsed');
            }
          });

          $(document).on('keydown', '.pt-display-dropdown .menu-trigger', function(e) {
            if(e.which == 13 || e.which == 32 ) { // return or space keys
              e.preventDefault();
              $(this).click();
            }
          });

          $(document).on('mouseleave', '.pt-display-dropdown .scroll-content', function() {
            $(this).removeClass('dropdown-open');
            $(this).slideUp('fast');
            $(this).prev('.menu-trigger').attr('aria-label', $(this).closest('.filter-group').find('h4').text() + ' dropdown selection collapsed');
          });

          $(document).on('focusout', '.pt-display-dropdown .scroll-content li:last-child', function() {
            $(this).closest('.scroll-content').removeClass('dropdown-open');
            $(this).closest('.scroll-content').slideUp('fast');
            $(this).closest('.scroll-content').prev('.menu-trigger').attr('aria-label', $(this).closest('.filter-group').find('h4').text() + ' dropdown selection collapsed');
          });

          // Apply button
          

          // Ajax
          
      });
    }
    else {
        setTimeout(function() { deferFilterjQuery() }, 50);
    }
}

deferFilterjQuery();
