(function($) {
    "use strict";
    
    
    var convert_cryptocurrency = function($scope, $) {
        $scope.find('.jws-crypto-currency-convert').eq(0).each(function() {
            var $this = $(this),
                $default_currency = $this.data('currencies-default'),
                $default_coin = $this.data('coin-default'),
                price = $this.find('#selectCurrency2').val(),
                input_unit = $this.find('.curren_input.unit input'),
                input_price = $this.find('.curren_input.price input');
            
            
            
          
            var ui_select_coin = $this.find('#selectCurrency1').next('.jws_ui_select');
            var ui_select_currency = $this.find('#selectCurrency2').next('.jws_ui_select');
            
            ui_select_coin.on('click','.option',function(){
                ui_select_coin.find('.option').removeClass('selected');
                $(this).addClass('selected');
             
                $this.find('#selectCurrency1').prev('.ui_label').text($(this).text());
                $this.find('#selectCurrency1').val($(this).data('value')).trigger('change');
             
                symbol_reder($default_currency,$this);
                
            });
            ui_select_currency.on('click','.option',function(){
                ui_select_currency.find('.option').removeClass('selected');
                $this.find('#selectCurrency2').prev('.ui_label').text($(this).text());
                $(this).addClass('selected');
                $this.find('#selectCurrency2').val($(this).data('value')).trigger('change');
                
                
                var currency_selected = $(this).text();  
                symbol_reder(currency_selected,$this);
                $default_currency = currency_selected;
              
                
                
                
            });
              $('.currencyBox_wrapper').on('click',function(){

                   $('.currencyBox_wrapper').not('.opened').find('.jws_ui_select.active').removeClass('active');
                   $(this).toggleClass('opened');  
                   $(this).find('.jws_ui_select').toggleClass('active');  
               
            });
            
             $(document).on("click", function(e) {
              
                if ($(e.target).is(".currencyBox_wrapper") === false) {
                  $('.currencyBox_wrapper').removeClass('opened');    
                  $('.jws_ui_select.active').removeClass('active');
                } else {
                    if($('.currencyBox_wrapper').hasClass('opened')) {
                        $('.currencyBox_wrapper.opened').removeClass('opened');
                    }
                }
              });  
            
            $this.find('#selectCurrency2').on('change',function(){
               price = $(this).val();  
             
               input_unit.val(parseFloat(input_price.val() * price).toFixed(4));
            
            });   
            $this.find('#selectCurrency1').on('change',function(){
                let sub_object = $(this);
                
                let coin_name = sub_object.val();
                
                var all_coin = new Array();
                $.getJSON('https://api.coingecko.com/api/v3/coins/markets?vs_currency='+$default_currency+'&order=market_cap_desc&per_page=70&page=1&sparkline=false', function(json_data){
                     let array_cu = Object.values(json_data);
                  
                    $.each(array_cu, function( index, value ) {
                        
                        all_coin[value['id']] =  value['image'];
                        
                    });
                 
                    sub_object.parents('.currencyBox_wrapper').css('background-image','url('+all_coin[coin_name]+')');  
                 
                  
                });
                
                $.getJSON('https://api.coingecko.com/api/v3/simple/price?ids='+$(this).val()+'&vs_currencies='+$this.data('currencies')+'', function(json_data){
                     let array_cu = Object.values(json_data);
                  
                     let $option = '';
                     let $first_value = '';
             
                     var $seleced = ''; 
                      
                     $.each(array_cu[0], function( index, value ) {
              
                        if(index == $default_currency) {
                            $seleced = 'selected';
                        } else {
                            $seleced = '';
                        }
                        $first_value = array_cu[0][$default_currency];
                
                        $option += '<div class="option '+$seleced+'" data-value="'+value+'">'+index+'</div>';
                        
                    });
                   
                    $this.find('#selectCurrency2').next('.jws_ui_select').find('> div').empty().append($option);
                    $this.find('#selectCurrency2').prev('.ui_label').text($default_currency);
                    $this.find('#selectCurrency2').val($first_value).change();
                  
                });
      
            
                
                
            }); 
            input_unit.on('keyup',function() {
                  input_price.val(parseFloat($(this).val()/price).toFixed(4));
            });
            input_price.on('keyup',function() {
                  input_unit.val(parseFloat($(this).val()*price).toFixed(4));
            });
            
            function symbol_reder(currency_selected, btn) {
              const currency = currency_selected.toUpperCase();  
              const all_currency = new Array();
               $.getJSON('//zaharwork.jwsuperthemes.com/wp-json/jws_currency/api', function(json_data){ 
                 let array_cu = Object.values(json_data);
              
                   $.each(array_cu, function( index, value ) {
                    
                    all_currency[value['code']] =  value['symbol_native'];
                    
              });
              btn.find('.currency_symbol').text(all_currency[currency]);
            });
        
            }

        });
    };

    var jws_slider = function($scope, $) {
        $scope.find('.jws_slider_element').eq(0).each(function() {
            $(this).find('.jws_slider').not('.slick-initialized').slick({
                prevArrow: '<span class="jws-carousel-btn prev-item"><i class="jws-icon-arrow_left_long_light"></i></span>',
                nextArrow: '<span class="jws-carousel-btn next-item "><i class="jws-icon-arrow_right_long_light"></i></span>',
                swipeToSlide: true,
                fade: true,
                cssEase: 'linear',
                appendDots: $('.slider-dots-box'),
                dotsClass: 'slider-dots',
                
            });

        });
    };

//Chart
    var jws_doughut_chart = function($scope, $) {  
         
        $scope.find('.chart').eq(0).each(function() {
            
                   var canvas = $(this).find('#myChart'),
            item = canvas.data('item'),
            color = canvas.data('color'),
            percent = canvas.data('number-percent'),
            ctx = canvas[0].getContext('2d'),
            chart = canvas.data('chart'),
            legens = canvas.data('show-legens'),
            align = canvas.data('align-legen'),  
            
            jwsChartData = canvas.data('chart-color');
      
          var itemArray = item.replace("[","").replace("]","").split(','),
                percentArray = percent.replace("[","").replace("]","").split(',');
          
          
        Chart.defaults.global.defaultFontColor = "#888";
        Chart.defaults.global.maintainAspectRatio = true;
          

        var myChart = new Chart(ctx, {
            
          type: chart,
      
          data: {
            labels: itemArray,
            datasets: [
              {
                label: "crypto",
                backgroundColor: jwsChartData,
                borderColor:  "#161617",
                borderWidth: 0.5,
                data: percentArray,
                barThickness: 30
              }
            ]
          },
          options: {
            cutoutPercentage: 50,
            scale: {
                ticks: {
               	    display:false,
                },
            },
            
              legend: {
              display: legens,
              position:align,
              }
          }
        });
     
        });
  
        };
    var jws_product_group = function($scope, $) {
        $scope.find('.jws_product_group_element').eq(0).each(function() {
            var $this = $(this);
            $(this).find('.jws_product_slider').not('.slick-initialized').slick({
                swipeToSlide: true,
                dots: false,
                arrows: false,
            }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                $this.find("[data-index]").removeClass('active');
                $this.find("[data-index=" + nextSlide + "]").addClass('active');
            });


            $this.find("[data-index]").click(function(e) {
                e.preventDefault();
                var number = $(this).data('index');
                $this.find("[data-index]").removeClass('active');
                $this.find("[data-index=" + number + "]").addClass('active');
                $this.find('.jws_product_slider').slick('slickGoTo', parseInt(number));
            });

        });
    };

    var jws_carousel = function($scope, $) {
        $scope.find('.jws-carousel').eq(0).each(function() {
            var asNavFor = '',
                asNavFor2 = '';
            if ($(this).find('.slider-layout').hasClass('layout3')) {
                asNavFor = '<span class="jws-carousel-btn prev-item"><i class="jws-icon-caret-left-thin"></i><i class="visibility prev jws-icon-caret-left-thin"></i></span>';
                asNavFor2 = '<span class="jws-carousel-btn next-item "><i class="jws-icon-caret-right-thin"></i><i class="visibility next jws-icon-caret-right-thin"></i></span>';
            } else {
                asNavFor = '<span class="jws-carousel-btn middle prev-item"></span>';
                asNavFor2 = '<span class="jws-carousel-btn middle next-item "></span>';
            }
            $(this).find('.carousel').not('.slick-initialized').slick({
                prevArrow: asNavFor,
                nextArrow: asNavFor2,
                swipeToSlide: true,
                appendDots: $('.slider-dots-box'),
                dotsClass: 'slider-dots',
            });

        });
    };

    var jws_text_slider = function($scope, $) {
        $scope.find('.texts_slider').eq(0).each(function() {
            $(this).not('.slick-initialized').slick({
                infinite: true,
                centerMode: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                variableWidth: true,
                cssEase: "linear",
                autoplay: true,
                autoplaySpeed: 0,
                infinite: true,
                speed: 10000,
                arrows: false,
                dots: false,
                pauseOnHover: false,
                pauseOnFocus: false,
            })
        });
    };

    var product_tabs_filter = function($scope, $) {
        $scope.find('.jws-wrap').eq(0).each(function() {
            var wrap = $(this);
            if (wrap.hasClass('metro')) {
                wrap.find('.products-tab').isotope({
                    itemSelector: ".product-item",
                    layoutMode: 'masonry',
                    transitionDuration: "0.3s",
                    masonry: {
                        // use outer width of grid-sizer for columnWidth
                        columnWidth: '.grid-sizer',
                    }
                });
            }
            wrap.find('.jws-ajax-load a.ajax-load').on('click', function(e) {
                e.preventDefault();
                var $this = $(this),
                    intervalID;
                var key = $this.data('value');
                if ($this.hasClass('active')) {
                    return;
                }
                clearInterval(intervalID);
                wrap.addClass('jws-animated-products');
                $this.parents('.jws-ajax-load').find('a').removeClass('active');
                $this.addClass('active');
                if ($this.hasClass('opened')) {
                    wrap.find('.products-tab').html(wrap.find('.products-tab').data(key));
                    if (wrap.hasClass('jws-carousel')) {
                        jws_carousel($scope, $);
                    }
                    var iter = 0;
                    intervalID = setInterval(function() {
                        wrap.find('.product-item').eq(iter).addClass('jws-animated');
                        iter++;
                    }, 100);
                    return;
                }
                $this.addClass('opened');
                wrap.addClass('loading');
                var data = wrap.data('args');
                data.action = 'jws_ajax_product_filter';
                if ($this.data('type') == 'product_cat') {
                    data.filter_categories = $this.data('value');
                }
                if ($this.data('type') == 'asset_type') {
                    data.asset_type = $this.data('value');
                }
                $.ajax({
                    url: wrap.data('url'),
                    data: data,
                    type: 'POST',
                    dataType: 'json',
                }).success(function(response) {
                    wrap.removeClass('loading');
                    let content = response.items;
                    wrap.find('.products-tab').html(content);
                    wrap.find('.products-tab').data(key, content);
                    if (wrap.hasClass('jws-carousel')) {
                        jws_carousel($scope, $);
                    }
                    var iter = 0;
                    intervalID = setInterval(function() {
                        wrap.find('.product-item').eq(iter).addClass('jws-animated');
                        iter++;
                    }, 100);
                }).error(function(ex) {
                    console.log(ex);
                });
            });

            wrap.find('.jws-products-load-more').off('click').on('click', function(e) {
                e.preventDefault();
                var $this = $(this),
                    data = wrap.data('args'),
                    paged = wrap.data('paged');
                paged++;
                loadProducts2(data, paged, wrap, $this)
            });

            var loadProducts2 = function(data, paged, wrap, btn) {

                data.action = 'jws_ajax_product_filter';
                data.paged = paged;
                btn.addClass('loading');
                wrap.find('.product-item').addClass('jws-animated');
                wrap.addClass('jws-animated-products');
                btn.append('<div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>');
                $.ajax({
                    url: wrap.data('url'),
                    data: data,
                    method: 'POST',
                    dataType: 'json',
                    success: function(response) {

                        if (response.items) {
                            wrap.find('.products-tab').append(response.items);
                            wrap.data('paged', paged);
                        }

                        if (response.status == 'no-more-posts') {
                            btn.hide();
                        }


                    },
                    error: function(data) {
                        console.log('ajax error');
                        console.log(data);
                    },
                    complete: function() {
                        btn.removeClass('loading');
                        $('.loader').remove();

                    },
                });
            };
        });
    };

    /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * video popup
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */
    var demo_filter = function($scope, $) {
        $scope.find('.jws_demo_element').eq(0).each(function() {
            //Check to see if the window is top if not then display button
            $scope.find('.jws_demo_element .jws_demo_item').each(function() {
                var btn = $(this).find('.jws_image_content_inner');
                $(this).find('.jws_image a').scroll(function() {
                    if ($(this).scrollTop() > 100) {
                        btn.fadeOut("slow");
                    } else {
                        btn.fadeIn("slow");
                    }
                });
                //Click event to scroll to top
                $(this).find('.jws_column_content').on("mouseleave", function() {
                    $(this).find('.jws_image a').animate({
                        scrollTop: 0
                    }, 800);
                    return false;
                });
            });
        });
    };
    /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * video popup
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */
    var video_popup = function($scope, $) {
        $scope.find('.jws_video_popup').eq(0).each(function() {
            $(this).find('.jws_video_popup_inner').lightGallery();
        });
    };
    /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * testimonials_slider
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */
    var testimonials_slider = function($scope, $) {
        $scope.find('.jws_testimonials_slider_wrap').eq(0).each(function() {
   
            $(this).find('.testimonials_slider').not('.slick-initialized').slick({
                prevArrow: $(this).find('.prev-item'),
                nextArrow: $(this).find('.next-item'),
                swipeToSlide: true,
                appendDots: $('.custom_dots'),
                //dotsClass: 'slick-dots',
            }).on( 'afterChange', function( event, slick, currentSlide ) {
                      $(this).addClass('slider_running');   
                       $(this).removeClass('slider_top');  
                      if($(this).find('.custom_dots').length > 0) {
                         slick.$dots.each( function(i, el) {
                            $(el).find('li').eq(currentSlide).addClass('slick-active').find('button');
                          })
                      }  
                    });

       
        });
    };
            /**
         *-------------------------------------------------------------------------------------------------------------------------------------------
         * Animate textcircle
         *-------------------------------------------------------------------------------------------------------------------------------------------
         */
    var text_circle_animate= function($scope, $) {
        $scope.find('.jws-text-circle-animation').eq(0).each(function() {
            var $this = $(this);


            var t = $this.find('.text-content .circle-text');
            var a = 0;
            if(t){
            t.find('span').each(function() {
                var n = 360 / t.find('span').length * a,

                    g = (Math.PI / t.find('span').length).toFixed(0) * a,
                    l = (Math.PI / t.find('span').length).toFixed(0) * a;

                $(this).css({
                    "translate3d": g + "px," + l + "px,0)",
                    "transform": "rotateZ(" + n + "deg) translate3d(" + g + "px," + l + "px,0)"
                });
                a++;
            });
             }
        });
       
    };
    /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * Blog Filter
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */
    var blog_filter = function($scope, $) {
        $scope.find('.jws-blog-element').eq(0).each(function() {
            var $this = $(this);
            var $container = $this.find('.blog_content'),
                $filter = $this.find(".post_nav");
            // set vars
            if (!$container.hasClass('jws_blog_slider')) {
                setTimeout(function() {
				 if ($container.hasClass('has-masonry')) {
                        $container.isotope({
                            itemSelector: ".jws_blog_item",
                            layoutMode: 'masonry',
                            transitionDuration: "0.3s",
                        });
                    } else {
                        $container.isotope({
                            itemSelector: ".jws_blog_item",
                            layoutMode: 'masonry',
                            transitionDuration: "0.3s",
                        });
                    }	
				}, 1000); 
            }
            //Post slider
            function postslider() {
                $container.not('.slick-initialized').slick({
                    prevArrow: $this.find('.nav_left'),
                    nextArrow: $this.find('.nav_right'),
                    swipeToSlide: true,
                    appendDots: $('.blog_dots'),
                    dotsClass: 'blog-slick-dots',
                });

            }

            function filtersInit() {

                $filter.find("a").on("click touchstart", function(e) {
                    var $t = $(this),
                        selector = $t.data("filter");
                    // Don't proceed if already selected
                    if ($t.hasClass("filter-active"))
                        return false;

                    $filter.find("a").removeClass("filter-active");
                    $t.addClass("filter-active");
                    filterAnimateStart(selector);
                    e.stopPropagation();
                    e.preventDefault();

                });

            }

            function filterAnimateStart(filterValue) {
                anime.remove('.jws_blog_item');
                anime({
                    targets: '.jws_blog_item',
                    translateX: -30,
                    opacity: 0,
                    easing: 'easeInOutQuint',
                    duration: 500,
                    delay: function delay(el, i, l) {
                        return i * 60;
                    },
                    begin: function begin(anime) {

                        $(anime.animatables).each(function(i, el) {
                            var $element = $(el.target);
                            $element.css({
                                transition: 'none'
                            });
                        });
                    },
                    complete: function complete(anim) {
                        if (filterValue !== '*') {

                            $container.slick('slickUnfilter');

                            $container.find('.jws_blog_item').each(function() {
                                $(this).removeClass('slide-shown');
                            });

                            $(filterValue).addClass('slide-shown');

                            $container.slick('slickFilter', '.slide-shown');
                        } else {
                            $container.find('.jws_blog_item').each(function() {
                                $(this).removeClass('slide-shown');
                            });
                            $container.slick('slickUnfilter');

                        }

                        filterItems(filterValue);

                    }
                });
            }

            function filterItems(filterValue) {
                //use data-filter attribute & class for filtering 
                var slider = $container;
                var btn = filterValue;
                var slide = slider.find('.jws_blog_item');

                if (filterValue == '*') {
                    // if all show all
                    slide.removeClass('hidden');
                    slide.addClass('flickity');
                } else {
                    //set active slide
                    var active = $(filterValue).removeClass('hidden');
                    // show only slide with the same class as the button "attr('data-filter')"
                    slide.addClass('flickity');
                    slide.not(active).removeClass('flickity');
                    slide.not(active).addClass('hidden');
                    // destroy slider so we can rebuild with new filters


                }
                filterAnimateComplete();
            }

            function filterAnimateComplete() {

                anime.remove('.jws_blog_item');
                anime({
                    targets: '.jws_blog_item',
                    translateX: 0,
                    opacity: 1,
                    easing: 'easeOutQuint',
                    delay: function delay(el, i, l) {
                        return i * 60;
                    },
                    complete: function complete(anime) {
                        $(anime.animatables).each(function(i, el) {
                            var element = $(el.target);
                            element.css({
                                transition: '',
                                transform: '',
                                opacity: ''
                            });
                        });
                    }
                });
            }

            if ($container.hasClass('jws_blog_slider')) {
                filtersInit();
                postslider();

            }
        });
    };
    /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * team_slider
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */
    var team_slider = function($scope, $) {
        $scope.find('.jws_team_element').eq(0).each(function() {
            $(this).find('.jws_team_slider').not('.slick-initialized').slick({
                prevArrow: $(this).find('.nav_left'),
                nextArrow: $(this).find('.nav_right'),
                swipeToSlide: true,
            });
        });
    };
    /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * services_slider
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */
    var services_slider = function($scope, $) {
        $scope.find('.jws-services-element').eq(0).each(function() {
            $(this).find('.jws-services-slider').not('.slick-initialized').slick({
                swipeToSlide: true,
            });
        });
    };

    /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * gallery Filter
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */
    var jws_gallery = function($scope, $) {
        $scope.find('.jws_gallery_element').eq(0).each(function() {
            var $this = $(this),
                $container = $this.find('.jws_gallery');
            $('.jws_gallery').lightGallery({
                thumbnail: true,
                selector: '.jws_gallery_item .jws-popup-global'
            });
            //init flickity
            var pageDots = false;
            if ($container.hasClass('has-dots')) {
                pageDots = true;
            }
            if ($container.hasClass('slider')) {
                $container.not('.slick-initialized').slick({
                    prevArrow: $this.find('.nav_left'),
                    nextArrow: $this.find('.nav_right'),
                    slide: '.jws_gallery_item',
                });
                 $container.on('swipe', function() {
        			$('body').addClass('lg-on');
        		}).on('afterChange', function() {
        			$('body').removeClass('lg-on');
        		});
            }
            if (!$container.hasClass('slider')) {
                $(window).on("load", function() {
                    if ($container.hasClass('metro')) {
                        $container.isotope({
                            itemSelector: ".jws_gallery_item",
                            layoutMode: 'masonry',
                            transitionDuration: "0.3s",
                            masonry: {
                                // use outer width of grid-sizer for columnWidth
                                columnWidth: '.grid-sizer',
                            }
                        });
                    } else {
                        if ($container.hasClass('iso_container')) {
                            $container.isotope({
                                itemSelector: ".jws_gallery_item",
                                layoutMode: 'masonry',
                                transitionDuration: "0.5s",
                            });
                        }
                    }
                });
            }


            function filterAnimateStart(filterValue) {
                var anime_ = anime;
                anime_.remove('.jws_gallery_item');
                anime_({
                    targets: '.jws_gallery_item',
                    translateX: -30,
                    opacity: 0,
                    easing: 'easeInOutQuint',
                    duration: 500,
                    delay: function delay(el, i) {
                        return i * 60;
                    },
                    begin: function begin(anime_) {
                        $(".jws_gallery").data("lightGallery").destroy(true);
                        $(anime_.animatables).each(function(i, el) {
                            var $element = $(el.target);
                            $element.css({
                                transition: 'none'
                            });
                        });
                    },
                    complete: function complete() {
                        if (filterValue !== '*') {
                            $container.slick('slickUnfilter');
                            $container.find('.jws_gallery_item').each(function() {
                                $(this).removeClass('slide-shown');
                            });
                            $(filterValue).addClass('slide-shown');
                            $container.slick('slickFilter', '.slide-shown');
                        } else {
                            $container.find('.jws_gallery_item').each(function() {
                                $(this).removeClass('slide-shown');
                            });
                            $container.slick('slickUnfilter');
                        }
                        filterItems(filterValue);
                    }
                });
            }

            function filterItems(filterValue) {
                //use data-filter attribute & class for filtering 
                var slider = $container;
                var slide = slider.find('.jws_gallery_item');
                if (filterValue == '*') {
                    // if all show all
                    slide.removeClass('hidden');
                    slide.addClass('flickity');
                    $('.jws_gallery').lightGallery({
                        thumbnail: true,
                        selector: '.jws_gallery_item .jws-popup-global'
                    });
                } else {
                    //set active slide
                    var active = $(filterValue).removeClass('hidden');
                    // show only slide with the same class as the button "attr('data-filter')"
                    slide.addClass('flickity');
                    slide.not(active).removeClass('flickity');
                    slide.not(active).addClass('hidden');
                    // destroy slider so we can rebuild with new filters
                    $('.jws_gallery').lightGallery({
                        thumbnail: true,
                        selector: filterValue.replace('*', '') + ' .jws-popup-global'
                    });
                }
                filterAnimateComplete();
            }

            function filterAnimateComplete() {
                var anime_ = anime;
                anime_.remove('.jws_gallery_item');
                anime_({
                    targets: '.jws_gallery_item',
                    translateX: 0,
                    opacity: 1,
                    easing: 'easeOutQuint',
                    delay: function delay(el, i) {
                        return i * 60;
                    },
                    complete: function complete(anime_) {
                        $(anime_.animatables).each(function(i, el) {
                            var element = $(el.target);
                            element.css({
                                transition: '',
                                transform: '',
                                opacity: ''
                            });
                        });
                    }
                });
            }
        });
    };
    /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * banner slider
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */
    var jws_banner = function($scope, $) {
        $scope.find('.jws-banner-element').eq(0).each(function() {
            var $this = $(this),
                $container = $this.find('.jws-banner');
            if ($container.hasClass('slider')) {
                $container.not('.slick-initialized').slick({
                    prevArrow: $this.find('.prev-item'),
                    nextArrow: $this.find('.next-item'),
                    swipeToSlide: true,
                });
            }
        });
    };
        /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * nft slider
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */
    var jws_nft = function($scope, $) {
        $scope.find('.jws-nft-element').eq(0).each(function() {
            var $this = $(this),
                $container = $this.find('.jws-nft');
            if ($container.hasClass('slider')) {
                $container.not('.slick-initialized').slick({
                    prevArrow: $this.find('.prev-item'),
                    nextArrow: $this.find('.next-item'),
                    swipeToSlide: true,
                });
            }
        });
    };
    /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * Tabs
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */
    var jws_tabs = function($scope, $) {
        $scope.find('.jws_tab_wrap').eq(0).each(function() {
            var $this = $(this);
            /** Line magic tabs filter **/
            if ($this.find('.tab_nav').length) {
                $this.find('.tab_nav').append("<li id='magic_line'></li>");
                var $magicLine = $this.find('#magic_line');
                $magicLine.width($this.find('.current').width()).height($this.find('.current').height()).css('left', $this.find('.current a').position().left).data('origLeft', $magicLine.position().left).data('origWidth', $magicLine.width()).data('origHeight', $magicLine.height());
                if ($this.find(".tab_nav_container").hasClass('layout_layout2')) {
                    $magicLine.css('top', $this.find('.current a').position().top + $this.find('.current').height() - $magicLine.height()).data('origBottom', $magicLine.position().top);
                } else {
                    $magicLine.css('top', $this.find('.current a').position().top).data('origTop', $magicLine.position().top);
                }
                $(window).resize(function() {
                    $magicLine.width($this.find('.current').width()).height($this.find('.current').height()).css('left', $this.find('.current a').position().left).data('origLeft', $magicLine.position().left).data('origWidth', $magicLine.width()).data('origHeight', $magicLine.height());
                    if ($this.find(".tab_nav_container").hasClass('layout_layout2')) {
                        $magicLine.css('top', $this.find('.current a').position().top + $this.find('.current').height() - $magicLine.height()).data('origBottom', $magicLine.position().top + $this.find('.current').height() - $magicLine.height());
                    } else {
                        $magicLine.css('top', $this.find('.current a').position().top).data('origTop', $magicLine.position().top);
                    }
                });
                $this.find('.tab_nav li a').on("click", function() {
                    $(document).trigger('resize');
                    $magicLine.data('origLeft', $(this).position().left).data('origWidth', $(this).parent().width()).data('origHeight', $(this).parent().height());
                    if ($this.find(".tab_nav_container").hasClass('layout_layout2')) {
                        $magicLine.data('origBottom', $(this).position().top + $this.find('.current').height() - $magicLine.height());
                    } else {
                        $magicLine.data('origTop', $(this).position().top);
                    }
                    return false;
                });
                /*Magicline hover animation*/
                $this.find('.tab_nav li').find('a').click(function() {
                    if ($this.find(".tab_nav_container").hasClass('layout_layout2')) {
                        $magicLine.css({
                            "left": $magicLine.data('origLeft'),
                            "top": $magicLine.data('origBottom'),
                            "width": $magicLine.data('origWidth'),
                            "height": $magicLine.data('origHeight'),
                        });
                    } else {
                        $magicLine.css({
                            "left": $magicLine.data('origLeft'),
                            "top": $magicLine.data('origTop'),
                            "width": $magicLine.data('origWidth'),
                            "height": $magicLine.data('origHeight'),
                        });
                    }
                });
            }
            $this.find('.tab_nav li a').click(function(e) {
                e.preventDefault();
                var tab_id = $(this).attr('data-tab');
                $this.find('.tab_nav li a').parent().removeClass('current');
                $this.find('.jws_tab_item').removeClass('current');
                $(this).parent().addClass('current');
                $this.find("#" + tab_id).addClass('current');
                
                if($this.find("#" + tab_id).find('.slick-initialized').length) {
                    $this.find("#" + tab_id).find('.time_line_slider').slick('unslick');
                    $this.find("#" + tab_id).find('.time_line_slider').not('.slick-initialized').slick({
                        prevArrow: $this.find("#" + tab_id).find('.prev-item'),
                        nextArrow: $this.find("#" + tab_id).find('.next-item'),
                    });
                }
              
        });
        });
    };
     var circular_tab = function($scope, $) {
        $(".uix-tabs").each(function (id) {
              var $this = $(this),
                $li = $this.find("ul.tab_nav > li"),
                liWidth = $li.first().outerWidth(),
                liHeight = $li.first().outerHeight(),
                liNum = $li.length,
                ulWidth = $this.data("width"),
                fullwidth = $this.data("fullwidth"),
                rotation = $this.data("rotation"),
                rotationRadius = $this.data("rotation-radius"),
                rotationWapperDeg = $this.data("rotation-wrapper-angle"),
                rotationDisplay = $this.data("rotation-display"),
                tabBoxID = id,
                isNumeric = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
        
              if (typeof fullwidth != typeof undefined && fullwidth == 1) {
                $li.css("width", 100 / liNum + "%");
              }
        
              if (typeof rotation === typeof undefined) {
                rotation = false;
              }
        
              if (typeof rotationWapperDeg === typeof undefined) {
                rotationWapperDeg = 0;
              }
        
              if (typeof rotationDisplay === typeof undefined) {
                rotationDisplay = 5;
              }
        
              $li.each(function (index) {
                index = index + 1;
                $(this).attr("href", "javascript:");
                $(this).attr("data-tab", tabBoxID + "-tabs-show" + index);
              });

              // Tab Rotation Effect
              if (rotation) {
                $this.find(".tab_nav_wrap").css({
                  width: rotationRadius * 2 + "px"
                });
                $('.jws_tab_wrap').find(".tab_content").css({
                      width: rotationRadius * 2 -230 + "px",
                });
                $this.find("ul.tab_nav").css({
                  width: rotationRadius * 2 + "px",
                  height: rotationRadius * 2 + "px",
                  transform: "rotate(" + parseFloat(rotationWapperDeg) + "deg)"
                });
        
                //Layout components in a circle layout
                var angle = 0,
                  step = (2 * Math.PI) / rotationDisplay,
                  transitionDelay = 0,
                  pad = $this.find("ul.tab_nav").width();
        
                $this.find("ul.tab_nav > li").each(function () {
                  //Can'nt use arrow function here!!!
                  // 'this' works differently with arrow fucntions
                  var el = $(this),
                    x = rotationRadius * Math.cos(angle) - liWidth / 2,
                    y = rotationRadius * Math.sin(angle) - liHeight / 2;
        
                  el.css({
                    transform:
                      "translate(" +
                      parseFloat(x) +
                      "px," +
                      parseFloat(pad / 2 + y) +
                      "px)",
                    "transition-delay": transitionDelay + "s"
                  })
                    .find("> a")
                    .css({
                      transform: "rotate(" + parseFloat(-rotationWapperDeg) + "deg)"
                    });
        
                  angle += step;
                  transitionDelay += 0.15;
        

                });
              }
        
        
            });

          };
          
  
  
  
  
  
  
  
  
    /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * Process Tabs
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */
    var jws_process_tabs = function($scope, $) {
        $scope.find('.jws_progress.layout_tab').eq(0).each(function() {
            $('.process_nav .progress_item a').click(function(e) {
                e.preventDefault();
                var tab_id = $(this).attr('data-tab');
                $('.process_nav .progress_item a').parent().removeClass('current');
                $('.process_content .progress_item').removeClass('current');
                $(this).parent().addClass('current');
                $("#" + tab_id).addClass('current');
            });
        });
    };
    /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * Process Hover
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */
    var jws_process_hover = function($scope, $) {
        $scope.find('.jws_progress').eq(0).each(function() {
            var $this = $(this);
            if ($this.hasClass('layout_list_hover') || $this.hasClass('layout_grid_animation')) {
                $this.find('.progress_item').hover(function() {
                    $('.progress_item').removeClass('active');
                    $(this).addClass('active');
                });
            }
        });
    };
    /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * Process Slider
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */
    var jws_process_slider = function($scope, $) {
        $scope.find('.jws_progress.layout_slider').eq(0).each(function() {
            var $this = $(this),
                beforeslideNumber,
                beforetotalSlides,
                nav = $this.find('.slider-nav');
            $this.find('.process_slider').not('.slick-initialized').slick({
                slide: '.progress_item',
                arrows: true,
                dots: true,
                prevArrow: '<span class="slick-prev lnr lnr-chevron-left"></span>',
                nextArrow: '<span class="slick-next lnr lnr-chevron-right"></span>',
                appendArrows: nav,
                appendDots: nav,
                dotsClass: 'custom_paging',
                swipeToSlide: true,
                customPaging: function(slider, i) {
                    var slideNumber = (i + 1),
                        totalSlides = slider.slideCount;
                    if (slideNumber < 10) {
                        beforeslideNumber = '0' + slideNumber;
                    } else {
                        beforeslideNumber = slideNumber;
                    }
                    if (totalSlides < 10) {
                        beforetotalSlides = '0' + totalSlides;
                    } else {
                        beforetotalSlides = totalSlides;
                    }
                    return '<a class="custom-dot" role="button"><span class="string">' + beforeslideNumber + '</span>/<span class="total">' + beforetotalSlides + '</span></a>';
                }
            });
        });
    };
    var blogLoadMore = function($scope, $) {
        $scope.find('.jws-blog-element').eq(0).each(function() {
            loadmore_btn($(this));
        });
    };
    /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * Load more button for blog
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */

	var loadmore_btn = function($scope) {

		var __this = $scope;
		var $element = $scope.find('[data-ajaxify=true]');
		var options = $element.data('ajaxify-options');
		var observer = null;
		init();


		function init() {
			var trigger = 'click';
			trigger == 'inview' && setupIntersectionObserver();
			trigger == 'click' && onClick();
		}

		function onClick() {
			$element.on('click', function(event) {
			var	parents = $(this).parent('.jws_pagination').siblings('.row');
				event.preventDefault();
				loadItems(parents);
			});

		}

		function setupIntersectionObserver() {

			observer = new IntersectionObserver(function(enteries) {
				enteries.forEach(function(entery) {
					if (entery.isIntersecting) {
						loadItems();
					}
				});
			}, {
				threshold: [1]
			});
			observer.observe(this.element);
		}

		function loadItems($wrapper) {

			var target = $element.attr('href'); // Loading State
			$element.parent('.jws_pagination').addClass('items-loading'); // Load Items
            $element.parent('.jws_pagination').append('<div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>');

			$.ajax({
				type: 'GET',
				url: target,
				error: function error(MLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				},
				success: function success(data) {
					var $data = $(data);
					var $newItemsWrapper = $data.find(options.wrapper);
					var $newItems = $newItemsWrapper.find(options.items);
					var nextPageUrl = $data.find('[data-ajaxify=true]').attr('href'); // Add New Items on imagesLoaded

					;
					if ((nextPageUrl && nextPageUrl != '?ajaxify=1') && target != nextPageUrl) {

						$element.attr('href', nextPageUrl);
						$element.parent('.jws_pagination').removeClass('items-loading');
                         $element.parent('.jws_pagination').find('.loader').remove();
					} else {
						observer && observer.unobserve(element);
						$element.parent('.jws_pagination').removeClass('items-loading').addClass('all-items-loaded');
					} // Append new items
					$newItems.imagesLoaded(function() {
						$newItems.appendTo($wrapper);

						(!$wrapper.hasClass('jws-blog-item')) && $wrapper.isotope('appended', $newItems); // Calling function for the new items
						onSuccess($wrapper);
					});

				}
			});
		}

		function onSuccess($wrapper) {
			jwsThemeModule.video_popup();
			$element.removeClass('items-loading');
		}

	};

    /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * Search
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */
    var search = function($scope, $) {
        if ('undefined' == typeof $scope) return;
        $scope.find('.jws_search').eq(0).each(function() {
            var s = $(this);
            var openClass = 'open',
                button = s.find('> button');
            s.find(button).on('click', function(e) {
                e.preventDefault();
                if (!$('.form_content_popup').hasClass(openClass)) {
                    $('.form_content_popup').addClass(openClass);
                    setTimeout(function() {
                        $('.form_content_popup input.s').focus();
                    }, 100);
                    return false;
                } else {
                    $('.form_content_popup').removeClass(openClass);
                }
            });
            $('.close-form ').on('click', function(e) {
                $('.form_content_popup').removeClass(openClass);
            });
            s.find('.form_content_popup').appendTo(document.body);
            $(".form_content_popup").each(function() {
                if ($('.form_content_popup').length > 1) {
                    $(this).remove();
                }
            });




        });
    };
    /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * Crypto Currency
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */
     var jws_crypto_currency_table = function($scope, $) {
           if ('undefined' == typeof $scope)
            return;
             $scope.find('.jws-crypto-currency-list').eq(0).each(function() {
          
                        
                        
                        
              
                        
 
            var s = $(this),
                t = s.find(".jws_ticker_slider_container"),
                f = s.find(".cu_start"),
                l = s.find(".cu_end"),
                e = f.find(".jws-cu-item"),
                i = l.find(".jws-cu-item"),
                n = 0;
            e.each(function(t) {
                var e = $(this),
                    a = e.width() + 1;
                e.width(a), i.eq(t).width(a), a = e.outerWidth(), n += a
            }), f.width(n);

            function a() {
                function i() {
                    o = f.width() , n = 0, f.css({
                        left: 0
                    }), l.css({
                        width: o + 100,
                        left: o
                    })
                }
                var n, o, d = 1,
                    r = !1;
                i(), window.requestNextAnimationFrame = function() {
                    var a = void 0,
                        i = void 0,
                        t = navigator.userAgent,
                        e = 0,
                        n = this;
                    return window.webkitRequestAnimationFrame && (i = function(t) {
                        void 0 === t && (t = +new Date), n.callback(t)
                    }, a = window.webkitRequestAnimationFrame, window.webkitRequestAnimationFrame = function(t, e) {
                        n.callback = t, a(i, e)
                    }), window.mozRequestAnimationFrame && (e = t.indexOf("rv:"), -1 != t.indexOf("Gecko") && "2.0" === t.substr(e + 3, 3) && (window.mozRequestAnimationFrame = void 0)), window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t, e) {
                        var a, i;
                        window.setTimeout(function() {
                            a = +new Date, t(a), i = +new Date, n.timeout = 1e3 / 60 - (i - a)
                        }, n.timeout)
                    }
                }(), t.each(function(t) {
                    var e = $(this),
                        a = function() {
                            n -= d, e.position().left <= -o && (e.css("left", parseInt(o - d)), n = 0), r || (s.mouseover(function() {
                                d = 0
                            }), s.mouseout(function() {
                                d = 1
                            }), e.css({
                                transform: "translate3d(" + .5 * n + "px,0,0)"
                            })), Math.abs(f.position().left - l.position().left) < o - 1 && i(), requestNextAnimationFrame(a)
                        };
                    a()
                }), $(window).resize(function() {
                    r || (r = !0, s.stop().animate({
                        opacity: 0
                    }, 200, function() {
                        i(), r = !1, s.delay(200).animate({
                            opacity: 1
                        }, 200)
                    }))
                })
            }
            a();
                
                        
                        
                        
                        
          
         
             });
     }
     
    /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * Collapse
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */     
     var jws_collapse = function($scope, $) {
         if ('undefined' == typeof $scope)
                return;
            $scope.find('.jws_collapse_wrap').eq(0).each(function() {
                $('.btn_collapse').click(function(event){
                
                
                    // window.testEvent = event;
                    // Show the additional content
                    $('.collapse_content').slideDown();
                
                    // Toggle the controls
                    $('.btn_collapse').hide();
                    $('.btn_collapse_close').show();
                
                    event.preventDefault();
                  });
                
                  $('.btn_collapse_close').click(function(event){
            
                    
                    // Hide the additional content
                    $('.collapse_content').slideUp();
                
                        // Toggle the controls
                    $('.btn_collapse').show();
                    $('.btn_collapse_close').hide();
                
                    event.preventDefault();
                  });
                  
             
            });
         }
     var jws_button = function($scope, $) {
        function splitText() {
          const buttons = document.querySelectorAll('.elementor-button-text');
          buttons.forEach(button => {
            const words = Array.from(button.children).filter(function (item) {
              return item.matches('.word');
            });
            words.forEach(word => {
              let text = document.createElement('span');
              text.classList.add('full-text');
              text.innerHTML = word.getAttribute('data-word');
              word.appendChild(text);
            });
          });
        }
        
        Splitting();
        splitText();
     }
     
    /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * Time Line
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */
    var timeline = function($scope, $) {
            if ('undefined' == typeof $scope)
                return;

            $scope.find('.jws_timeline').eq(0).each(function() {
                    var $this = $(this),
                    field = $this.find('.jws_timeline_field'),
                    row = 1;
                    if($this.hasClass('layout4')){ 
                       var line = $this.find('.jws_timeline_line'),
                        circle = $this.find('.jws_timeline_circle'),
                 		timeline_start_icon = circle.first().position();
			             line.css('top', timeline_start_icon.top + 7);
                   }
                   if($this.hasClass('layout2')){ 
                    row = 2;
                    $(window).on("resize", function (e) {
                      $this.find(".slick-track > .slick-slide").css("height", "auto");  
                      resizeSlider();
                    });
                    function resizeSlider() {
                      var slickHeight = $this.find(".slick-track").outerHeight();  
                      $this.find(".slick-track > .slick-slide").css("height", slickHeight + "px");
                    }
             
                      $this.find('.time_line_slider').on('init', function(event, slick){
                         resizeSlider();
                    });
                   }
                  
                  $(this).find('.time_line_slider').not('.slick-initialized').slick({
                        rows: row,
                        swipeToSlide: true,
                        prevArrow: $this.find('.prev-item'),
                        nextArrow: $this.find('.next-item'),
                    });
                field.each(function() {
                    $(this).appear(function() {
        	               $(this).addClass('animation_show');
                    });  
                });
            });

        }
           /**
   *-------------------------------------------------------------------------------------------------------------------------------------------
   * Project Filter
   *-------------------------------------------------------------------------------------------------------------------------------------------
   */

   var project_filter = function($scope, $) {
      $scope.find('.jws-project-element').eq(0).each(function() {
        var $this = $(this);
        var $container = $this.find('.project_content'),    
        $filter = $this.find(".project_nav");
        var $item = $container.find('.jws_project_item');
      

        loadmore_btn($this);

        /** Line magic tabs filter **/
        var  $magicLine;
        if ($filter.length) {
            $filter.append("<li id='magic_line'></li>");
            $magicLine = $this.find('#magic_line');
            $magicLine
            .width($this.find('.filter-active').parent().width())
            .css('left', $this.find('a.filter-active').position().left)
            .data('origLeft', $magicLine.position().left)
            .data('origWidth', $magicLine.width())
            
            /*Magicline hover animation*/
            
            $this.find('.project_nav li').find('a').hover(function () {
                var $thisBar = $(this);
              var  leftPos = $thisBar.position().left,
                newWidth = $thisBar.parent().width();
                $magicLine.css({
                    "left": leftPos,
                    "width": newWidth,
                });
            }, function () {
                $magicLine.css({
                    "left": $this.find('a.filter-active').position().left,
                    "width": $this.find('.filter-active').parent().width(),
                });
            });
        }

        if(!$container.hasClass('slider')) { 
      
            $( document ).ready(function() {
            
                if($container.hasClass('masonry')||$container.hasClass('masonry3')) {
                    $container.isotope({
                        itemSelector: ".jws_project_item",
                        layoutMode: 'masonry',
                        transitionDuration: "0.7s",
                        masonry: {
                            // use outer width of grid-sizer for columnWidth
                            columnWidth: '.grid-sizer',
                        }
                    });  
                }else {
                    $container.isotope({
                        itemSelector: ".jws_project_item",
                        layoutMode: 'masonry',
                        transitionDuration: "0.7s",
                    }); 
                }
              

                $filter.find("a").on("click touchstart", function (e) {
                    var $t = $(this),
                        selector = $t.data("filter");
                    // Don't proceed if already selected
                    if ($t.hasClass("filter-active"))
                        return false;

                    $filter.find("a").removeClass("filter-active");
                    $t.addClass("filter-active");
                    $container.isotope({filter: selector});
                    
                    e.stopPropagation();
                    e.preventDefault();
                    
                });
                $container.on( 'layoutComplete',
                  function( event, laidOutItems ) {
                        var $items = $container.find('.jws_project_item');
                        var time = 0;
                        $items.each(function() {
                            var item = jQuery(this);
                            setTimeout(function() {
                                item.addClass('fadeIn');
                            }, time);
                            time += 200;
                        });
                  }
                );
            })
            //$().gallery_popup($container,$item);   
        }
        // set vars
        function flicitySlider() {
          //init flickity
          var full = false;
          if($container.hasClass('has_wrap')) {
            full = true;
          }
          $container.not('.slick-initialized').slick({
              prevArrow: $this.find('.nav_left'),
              nextArrow: $this.find('.nav_right'),
          });
          
        }
        function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
        function fullwidthSide() {
          if(!$container.hasClass('has_wrap') || $(window).width() < 767) return ;  
          var _viewportElWrap$css, _viewportElWrap$css2;
    
          var self = this;
          var element = $(self.element);
          var viewportEl = $container.find('.slick-list');
          var elementWidth = viewportEl.width();
          var viewportElOffset = viewportEl.offset();
          var viewportElOffsetRight = $(window).width() - (elementWidth + viewportElOffset.left);
          var margin = !this.isRTL ? 'marginRight' : 'marginLeft';
          var padding = !this.isRTL ? 'paddingRight' : 'paddingLeft';;
    
    
          viewportElWrap = viewportEl.parent();
          viewportElWrap.css((_viewportElWrap$css = {}, _defineProperty(_viewportElWrap$css, margin, ''), _defineProperty(_viewportElWrap$css, padding, ''), _viewportElWrap$css));
          viewportElWrap.css((_viewportElWrap$css2 = {}, _defineProperty(_viewportElWrap$css2, margin, viewportElOffsetRight >= 0 ? (viewportElOffsetRight - 1) * -1 : viewportElOffsetRight - 1), _defineProperty(_viewportElWrap$css2, padding, Math.abs(viewportElOffsetRight - 1)), _defineProperty(_viewportElWrap$css2, "overflow", 'hidden'), _viewportElWrap$css2));
          viewportEl.css('overflow', 'visible');
        }
        
        function filtersInit() {
              $filter.find("a").on("click touchstart", function (e) {
                    var $t = $(this),
                        selector = $t.data("filter");
                    // Don't proceed if already selected
                    if ($t.hasClass("filter-active"))
                        return false;

                    $filter.find("a").removeClass("filter-active");
                    $t.addClass("filter-active");
                    filterAnimateStart(selector);
                    e.stopPropagation();
                    e.preventDefault();
                    
                });
          
        }
      
        function filterAnimateStart(filterValue) {
          anime.remove('.jws_project_item');
          anime({
            targets: '.jws_project_item',
            translateX: -30,
            opacity: 0,
            easing: 'easeInOutQuint',
            duration: 300,
            delay: function delay(el, i, l) {
              return i * 60;
            },
            begin: function begin(anime) {

              $(anime.animatables).each(function (i, el) {
                var $element = $(el.target);
                $element.css({
                  transition: 'none'
                });
              });
            },
            complete: function complete(anim) {
                      if(filterValue !== '*'){

                      $container.slick('slickUnfilter');
          
                      $container.find('.jws_project_item').each(function(){
                        $(this).removeClass('slide-shown');
                      });
            
                      $(filterValue).addClass('slide-shown');
            
                      $container.slick('slickFilter', '.slide-shown');
                    }
                
                    else{
                      $container.find('.jws_project_item').each(function(){
                        $(this).removeClass('slide-shown');
                      });
                      $container.slick('slickUnfilter');

                    }
                  
                filterItems(filterValue);
              
            }
          });
        }
        function filterItems(filterValue) {
                  //use data-filter attribute & class for filtering 
              var slider = $container;    
              var btn = filterValue;
              var slide = slider.find('.jws_project_item');
              
              if (filterValue == '*') {
                // if all show all
                slide.removeClass('hidden');
                slide.addClass('flickity');
              } else {
                //set active slide
                var active = $(filterValue).removeClass('hidden');
                // show only slide with the same class as the button "attr('data-filter')"
                slide.addClass('flickity');
                slide.not(active).removeClass('flickity');
                slide.not(active).addClass('hidden');
                // destroy slider so we can rebuild with new filters
                
                
          }
          filterAnimateComplete();
        }
        function filterAnimateComplete() {

          anime.remove('.jws_project_item');
          anime({
            targets: '.jws_project_item',
            translateX: 0,
            opacity: 1,
            easing: 'easeOutQuint',
            delay: function delay(el, i, l) {
              return i * 60;
            },
            complete: function complete(anime) {
              $(anime.animatables).each(function (i, el) {
                var element = $(el.target);
                element.css({
                  transition: '',
                  transform: '',
                  opacity: ''
                });
              });
            }
          });
  
        }
        
        if($container.hasClass('slider')) { 
              filtersInit();   
              flicitySlider();
              fullwidthSide();
            
        }         
      });
  }
        /**
         *-------------------------------------------------------------------------------------------------------------------------------------------
         * Login Form
         *-------------------------------------------------------------------------------------------------------------------------------------------
         */
    var login_form = function($scope, $) {
        $scope.find('#jws-popup-login').eq(0).each(function() {
            $('.toggle-password').on('click', function() {
                $(this).toggleClass('icon-eye-blocked');
                var password = $(this).parent().find('.pwd');
                var password_repeat = $(this).parent().find('#repeat_pwd');
                if (password.attr('type') == 'password') {
                    password.attr('type', 'text');
                } else {
                    password.attr('type', 'password');
                }
                if (password_repeat.attr('type') == 'password') {
                    password_repeat.attr('type', 'text');
                } else {
                    password_repeat.attr('type', 'password');
                }
            });

            $('#jws-popup-login').eq(0).each(function() {
                $(this).find('form[name=loginpopopform]').ready(function() {
                    if (!($(this).find('.login-username input.required').val()) && !($(this).find('.login-password input.required').val())) {
                        $(this).find('.button').prop("disabled", true).css({
                            'cursor': 'not-allowed'
                        });
                    }
                });
                $(this).find('form[name=loginpopopform]').on('change', function() {
                    if (($(this).find('.login-username input.required').val()) || ($(this).find('.login-password input.required').val())) {
                        $(this).find('.button').prop("disabled", false).css({
                            'cursor': 'auto'
                        });
                    }
                });
                $(this).find('form[name=loginpopopform]').on('submit', function(event) {
                    event.preventDefault();
                    if (!($(this).find('.login-username input.required').val()) && !($(this).find('.login-password input.required').val())) {
                        $(this).find('.button').prop("disabled", true).css({
                            'cursor': 'not-allowed'
                        });
                    }
                    var valid = true,
                        email_valid = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
                    $(this).find('.error').remove();
                    $(this).find('input.required').each(function() {
                        // Check empty value
                        if (!$(this).val()) {
                            if ($(this).attr('name') == 'log') {

                                $(this).after('<span class="error">Please enter your username</span>');
                            }

                            // pass
                            if ($(this).attr('name') == 'pwd') {

                                $(this).after('<span class="error">Please enter your Password</span>');
                            }
                            // Uncheck
                            if ($(this).is(':checkbox') && !$(this).is(':checked')) {
                                $(this).addClass('invalid');
                                valid = false;
                            }
                            // Check email format
                            if ('email' === $(this).attr('type')) {
                                if (!email_valid.test($(this).val())) {
                                    $(this).addClass('invalid');
                                    valid = false;
                                }
                            }
                        }
                    });
                    $(this).find('input.required').on('focus', function() {
                        $(this).removeClass('invalid');
                    });
                    if (!valid) {
                        return valid;
                    }
                    var form = $(this),
                        $elem = $('#jws-popup-login .jws-login-container'),
                        wp_submit = $elem.find('input[type=submit]').val();
                    $elem.addClass('loading');
                    $elem.find('.message').slideDown().remove();
                    var data = {
                        action: 'jws_login_ajax',
                        data: form.serialize() + '&wp-submit=' + wp_submit,
                    };
                    $.post(MS_Ajax.ajaxurl, data, function(response) {
                        try {
                            response = JSON.parse(response);
                            $elem.find('.jws-login').append(response.message);
                            if (response.code == '1') {
                                if (response.redirect) {
                                    if (window.location.href == response.redirect) {
                                        location.reload();
                                    } else {
                                        window.location.href = response.redirect;
                                    }
                                } else {
                                    location.reload();
                                }
                            } else {
                                var $captchaIframe = $('#jws-popup-login .gglcptch iframe');
                                if ($captchaIframe.length > 0) {
                                    $captchaIframe.attr('src', $captchaIframe.attr('src')); // reload iframe
                                }
                            }
                        } catch (e) {
                            return false;
                        }
                        $elem.removeClass('loading');
                    });
                    return false;
                });
                $(this).find('form[name=registerformpopup]').ready(function() {
                    if (!($(this).find('.user_login input.required').val()) && !($(this).find('.user_email input.required').val()) && !($(this).find('.login-password input.required').val()) && !($(this).find('.login-password-repeater input.required').val())) {
                        $(this).find('.button').prop("disabled", true).css({
                            'cursor': 'not-allowed'
                        });
                    }
                });
                $(this).find('form[name=registerformpopup]').on('change', function() {
                    if (($(this).find('.user_login input.required').val()) || ($(this).find('.user_email input.required').val()) || ($(this).find('.login-password input.required').val()) || ($(this).find('.login-password-repeater input.required').val())) {
                        $(this).find('.button').prop("disabled", false).css({
                            'cursor': 'auto'
                        });
                    }
                });
                $(this).find('form[name=registerformpopup]').on('submit', function(e) {
                    e.preventDefault();
                    var registerform = $(this);
                    if (!($(this).find('.user_login input.required').val()) && !($(this).find('.user_email input.required').val()) && !($(this).find('.login-password input.required').val()) && !($(this).find('.login-password-repeater input.required').val())) {
                        $(this).find('.button').prop("disabled", true).css({
                            'cursor': 'not-allowed'
                        });
                    }
                    var valid = true,
                        email_valid = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
                    registerform.find('.error').remove();
                    registerform.find('input.required').each(function() {
                        // Check empty value
                        if (!$(this).val()) {
                            $(this).addClass('invalid');

                            if ($(this).attr('name') == 'user_login') {

                                $(this).after('<span class="error">Please enter your username</span>');
                            }

                            // email
                            if ($(this).attr('name') == 'user_email') {

                                $(this).after('<span class="error">Please enter your Email</span>');
                            }
                            // pass
                            if ($(this).attr('name') == 'password') {

                                $(this).after('<span class="error">Please enter your Password</span>');
                            }
                            // repeater pass
                            if ($(this).attr('name') == 'repeat_password') {

                                $(this).after('<span class="error">Please enter your Repeater Password</span>');
                            }

                            valid = false;
                        }
                        // Uncheck
                        if ($(this).is(':checkbox') && !$(this).is(':checked')) {
                            $(this).addClass('invalid');
                            valid = false;
                        }
                        if ($(this).attr('name') == 'user_email' && $(this).val() && !email_valid.test($(this).val())) {
                            $(this).addClass('invalid');
                            $(this).after('<span class="error">Your Email is invalid</span>');
                            valid = false;
                        }


                    });

                    if (!valid) {
                        return valid;
                    }
                    var $form = $(this),
                        data = {
                            action: 'jws_register_ajax',
                            data: $form.serialize() + '&wp-submit=' +
                                $form.find('input[type=submit]').val(),
                            register_security: $form.find('#register_security').
                            val(),
                        },
                        $elem = $('#jws-popup-login .jws-login-container');
                    $elem.addClass('loading');
                    $elem.find('.message').slideDown().remove();
                    $.ajax({
                        type: 'POST',
                        url: MS_Ajax.ajaxurl,
                        data: data,
                        success: function(response) {

                            $elem.removeClass('loading');
                            $elem.find('.popup-message').html(response.data.message);

                            if (response.success === true) {
                                $elem.find('.jws-register').html(response.data.message);
                            }

                        },
                    });
                });

                // Check Strong Passwoed /
                $(this).find('.jws-register input[name="password"]').keyup(function() {
                    checkpassword($(this).val());
                });

                function checkpassword(password) {
                    var strength = 0,
                        meter = $('.meter'),
                        meter_text = $('.text-meter'),
                        password_hint = $('.jws-password-hint'),
                        btn_submit = $('input[name="wp-submit"]');

                    if (password.match(/[a-z]+/)) {
                        strength += 1;
                    }
                    if (password.match(/[A-Z]+/) && password.length >= 8) {
                        strength += 1;
                    }
                    if (password.match(/[0-9]+/) && password.length >= 12) {
                        strength += 1;
                    }
                    if (password.match(/[$@#&!]+/) && password.length >= 14) {
                        strength += 1;

                    }

                    if (password.length > 0) {
                        meter.show();
                        password_hint.show();
                        btn_submit.attr("disabled", "disabled");
                    } else {
                        meter.hide();
                        password_hint.hide();
                    }
                    console.log(Verify_Ajax.metera);

                    switch (strength) {
                        case 0:
                            meter_text.html("");
                            meter.attr("meter", "0");
                            break;

                        case 1:
                            meter_text.html(Verify_Ajax.metera);
                            meter.attr("meter", "1");
                            break;

                        case 2:
                            meter_text.html(Verify_Ajax.meterb);
                            meter.attr("meter", "2");
                            btn_submit.removeAttr("disabled");
                            break;

                        case 3:
                            meter_text.html(Verify_Ajax.meterc);
                            meter.attr("meter", "3");
                            btn_submit.removeAttr("disabled");
                            password_hint.hide();
                            break;

                        case 4:
                            meter_text.html(Verify_Ajax.meterd);
                            meter.attr("meter", "4");
                            btn_submit.removeAttr("disabled");
                            password_hint.hide();
                            break;
                    }
                }
                $('#jws-popup-login .link-bottom a.login').on('click', function(e) {
                    e.preventDefault();
                    $('.jws-login').addClass('active');
                    $('.jws-register').removeClass('active');
                });
                $('#jws-popup-login .link-bottom a.register').on('click', function(e) {
                    e.preventDefault();
                    $('.jws-register').addClass('active');
                    $('.jws-login').removeClass('active');
                });
            });

        });
    };
    /**
     *-------------------------------------------------------------------------------------------------------------------------------------------
     * Google Map
     *-------------------------------------------------------------------------------------------------------------------------------------------
     */
    var WidgetjwsGoogleMapHandler = function($scope) {
        if ('undefined' == typeof $scope) return;
        var selector = $scope.find('.jws-google-map').eq(0),
            locations = selector.data('locations'),
            map_style = (selector.data('custom-style') != '') ? selector.data('custom-style') : '',
            predefined_style = (selector.data('predefined-style') != '') ? selector.data('predefined-style') : '',
            info_window_size = (selector.data('max-width') != '') ? selector.data('max-width') : '',
            animate = selector.data('animate'),
            auto_center = selector.data('auto-center'),
            maker_offset = selector.data('offset'),
            map_options = selector.data('map_options'),
            i = '',
            bounds = new google.maps.LatLngBounds(),
            marker_cluster = [],
            className = 'map_pin_jws';
        var animation;
        if ('drop' == animate) {
            animation = google.maps.Animation.DROP;
        } else if ('bounce' == animate) {
            animation = google.maps.Animation.BOUNCE;
        }

        function _typeof(obj) {
            var _typeof;
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                _typeof = function _typeof(obj) {
                    return typeof obj;
                };
            } else {
                _typeof = function _typeof(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
            }
            return _typeof(obj);
        }

        function CustomMarker(latlng, map, className) {
            this.latlng_ = latlng;
            this.className = className; // Once the LatLng and text are set, add the overlay to the map.  This will
            // trigger a call to panes_changed which should in turn call draw.
            this.setMap(map);
        }
        if ((typeof google === "undefined" ? "undefined" : _typeof(google)) !== _typeof(undefined) && _typeof(google.maps) !== _typeof(undefined)) {
            CustomMarker.prototype = new google.maps.OverlayView();
            CustomMarker.prototype.draw = function() {
                var me = this; // Check if the div has been created.
                var div = this.div_,
                    divChild,
                    divChild2;
                if (!div) {
                    // Create a overlay text DIV
                    div = this.div_ = document.createElement('DIV');
                    div.className = this.className;
                    divChild = document.createElement("div");
                    div.appendChild(divChild);
                    divChild2 = document.createElement("div");
                    div.appendChild(divChild2);
                    google.maps.event.addDomListener(div, "click", function() {
                        google.maps.event.trigger(me, "click");
                    }); // Then add the overlay to the DOM
                    var panes = this.getPanes();
                    panes.overlayImage.appendChild(div);
                } // Position the overlay
                var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
                if (point) {
                    div.style.left = point.x + 'px';
                    div.style.top = point.y + 'px';
                }
            };
            CustomMarker.prototype.remove = function() {
                // Check if the overlay was on the map and needs to be removed.
                if (this.div_) {
                    this.div_.parentNode.removeChild(this.div_);
                    this.div_ = null;
                }
            };
            CustomMarker.prototype.getPosition = function() {
                return this.latlng_;
            };
        }
        var skins = {
            "silver": "[{\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#f5f5f5\"}]},{\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#616161\"}]},{\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#f5f5f5\"}]},{\"featureType\":\"administrative.land_parcel\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#bdbdbd\"}]},{\"featureType\":\"poi\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#eeeeee\"}]},{\"featureType\":\"poi\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#757575\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#e5e5e5\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#9e9e9e\"}]},{\"featureType\":\"road\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#ffffff\"}]},{\"featureType\":\"road.arterial\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#757575\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#dadada\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#616161\"}]},{\"featureType\":\"road.local\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#9e9e9e\"}]},{\"featureType\":\"transit.line\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#e5e5e5\"}]},{\"featureType\":\"transit.station\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#eeeeee\"}]},{\"featureType\":\"water\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#c9c9c9\"}]},{\"featureType\":\"water\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#9e9e9e\"}]}]",
            "retro": "[{\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#ebe3cd\"}]},{\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#523735\"}]},{\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#f5f1e6\"}]},{\"featureType\":\"administrative\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#c9b2a6\"}]},{\"featureType\":\"administrative.land_parcel\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#dcd2be\"}]},{\"featureType\":\"administrative.land_parcel\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#ae9e90\"}]},{\"featureType\":\"landscape.natural\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#dfd2ae\"}]},{\"featureType\":\"poi\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#dfd2ae\"}]},{\"featureType\":\"poi\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#93817c\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#a5b076\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#447530\"}]},{\"featureType\":\"road\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#f5f1e6\"}]},{\"featureType\":\"road.arterial\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#fdfcf8\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#f8c967\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#e9bc62\"}]},{\"featureType\":\"road.highway.controlled_access\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#e98d58\"}]},{\"featureType\":\"road.highway.controlled_access\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#db8555\"}]},{\"featureType\":\"road.local\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#806b63\"}]},{\"featureType\":\"transit.line\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#dfd2ae\"}]},{\"featureType\":\"transit.line\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#8f7d77\"}]},{\"featureType\":\"transit.line\",\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#ebe3cd\"}]},{\"featureType\":\"transit.station\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#dfd2ae\"}]},{\"featureType\":\"water\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#b9d3c2\"}]},{\"featureType\":\"water\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#92998d\"}]}]",
            "dark": "[{\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#212121\"}]},{\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#757575\"}]},{\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#212121\"}]},{\"featureType\":\"administrative\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#757575\"}]},{\"featureType\":\"administrative.country\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#9e9e9e\"}]},{\"featureType\":\"administrative.land_parcel\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"administrative.locality\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#bdbdbd\"}]},{\"featureType\":\"poi\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#757575\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#181818\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#616161\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#1b1b1b\"}]},{\"featureType\":\"road\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#2c2c2c\"}]},{\"featureType\":\"road\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#8a8a8a\"}]},{\"featureType\":\"road.arterial\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#373737\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#3c3c3c\"}]},{\"featureType\":\"road.highway.controlled_access\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#4e4e4e\"}]},{\"featureType\":\"road.local\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#616161\"}]},{\"featureType\":\"transit\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#757575\"}]},{\"featureType\":\"water\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#000000\"}]},{\"featureType\":\"water\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#3d3d3d\"}]}]",
            "night": "[{\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#242f3e\"}]},{\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#746855\"}]},{\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#242f3e\"}]},{\"featureType\":\"administrative.locality\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#d59563\"}]},{\"featureType\":\"poi\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#d59563\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#263c3f\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#6b9a76\"}]},{\"featureType\":\"road\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#38414e\"}]},{\"featureType\":\"road\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#212a37\"}]},{\"featureType\":\"road\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#9ca5b3\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#746855\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#1f2835\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#f3d19c\"}]},{\"featureType\":\"transit\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#2f3948\"}]},{\"featureType\":\"transit.station\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#d59563\"}]},{\"featureType\":\"water\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#17263c\"}]},{\"featureType\":\"water\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#515c6d\"}]},{\"featureType\":\"water\",\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#17263c\"}]}]",
            "aubergine": "[{\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#1d2c4d\"}]},{\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#8ec3b9\"}]},{\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#1a3646\"}]},{\"featureType\":\"administrative.country\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#4b6878\"}]},{\"featureType\":\"administrative.land_parcel\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#64779e\"}]},{\"featureType\":\"administrative.province\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#4b6878\"}]},{\"featureType\":\"landscape.man_made\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#334e87\"}]},{\"featureType\":\"landscape.natural\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#023e58\"}]},{\"featureType\":\"poi\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#283d6a\"}]},{\"featureType\":\"poi\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#6f9ba5\"}]},{\"featureType\":\"poi\",\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#1d2c4d\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#023e58\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#3C7680\"}]},{\"featureType\":\"road\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#304a7d\"}]},{\"featureType\":\"road\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#98a5be\"}]},{\"featureType\":\"road\",\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#1d2c4d\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#2c6675\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#255763\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#b0d5ce\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#023e58\"}]},{\"featureType\":\"transit\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#98a5be\"}]},{\"featureType\":\"transit\",\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"color\":\"#1d2c4d\"}]},{\"featureType\":\"transit.line\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#283d6a\"}]},{\"featureType\":\"transit.station\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#3a4762\"}]},{\"featureType\":\"water\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#0e1626\"}]},{\"featureType\":\"water\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#4e6d70\"}]}]",
            "magnesium": "[{\"featureType\":\"all\",\"stylers\":[{\"saturation\":0},{\"hue\":\"#e7ecf0\"}]},{\"featureType\":\"road\",\"stylers\":[{\"saturation\":-70}]},{\"featureType\":\"transit\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"poi\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"water\",\"stylers\":[{\"visibility\":\"simplified\"},{\"saturation\":-60}]}]",
            "classic_blue": "[{\"featureType\":\"all\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"on\"}]},{\"featureType\":\"administrative.country\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"on\"}]},{\"featureType\":\"administrative.country\",\"elementType\":\"labels.text\",\"stylers\":[{\"visibility\":\"on\"}]},{\"featureType\":\"administrative.province\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"on\"}]},{\"featureType\":\"administrative.province\",\"elementType\":\"labels.text\",\"stylers\":[{\"visibility\":\"on\"}]},{\"featureType\":\"administrative.locality\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"on\"}]},{\"featureType\":\"administrative.neighborhood\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"administrative.land_parcel\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"landscape\",\"elementType\":\"all\",\"stylers\":[{\"hue\":\"#FFBB00\"},{\"saturation\":43.400000000000006},{\"lightness\":37.599999999999994},{\"gamma\":1}]},{\"featureType\":\"landscape\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"saturation\":\"-40\"},{\"lightness\":\"36\"}]},{\"featureType\":\"landscape.man_made\",\"elementType\":\"geometry\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"landscape.natural\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"saturation\":\"-77\"},{\"lightness\":\"28\"}]},{\"featureType\":\"landscape.natural\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"poi\",\"elementType\":\"all\",\"stylers\":[{\"hue\":\"#00FF6A\"},{\"saturation\":-1.0989010989011234},{\"lightness\":11.200000000000017},{\"gamma\":1}]},{\"featureType\":\"poi\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"poi.attraction\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"saturation\":\"-24\"},{\"lightness\":\"61\"}]},{\"featureType\":\"road\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"on\"}]},{\"featureType\":\"road\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"visibility\":\"on\"}]},{\"featureType\":\"road\",\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"all\",\"stylers\":[{\"hue\":\"#FFC200\"},{\"saturation\":-61.8},{\"lightness\":45.599999999999994},{\"gamma\":1}]},{\"featureType\":\"road.highway\",\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"road.highway.controlled_access\",\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"road.arterial\",\"elementType\":\"all\",\"stylers\":[{\"hue\":\"#FF0300\"},{\"saturation\":-100},{\"lightness\":51.19999999999999},{\"gamma\":1}]},{\"featureType\":\"road.local\",\"elementType\":\"all\",\"stylers\":[{\"hue\":\"#ff0300\"},{\"saturation\":-100},{\"lightness\":52},{\"gamma\":1}]},{\"featureType\":\"road.local\",\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"transit\",\"elementType\":\"geometry\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"transit\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"transit\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"transit\",\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"transit.line\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"transit.station\",\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"water\",\"elementType\":\"all\",\"stylers\":[{\"hue\":\"#0078FF\"},{\"saturation\":-13.200000000000003},{\"lightness\":2.4000000000000057},{\"gamma\":1}]},{\"featureType\":\"water\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"off\"}]}]",
            "aqua": "[{\"featureType\":\"administrative\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#444444\"}]},{\"featureType\":\"landscape\",\"elementType\":\"all\",\"stylers\":[{\"color\":\"#f2f2f2\"}]},{\"featureType\":\"poi\",\"elementType\":\"all\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"road\",\"elementType\":\"all\",\"stylers\":[{\"saturation\":-100},{\"lightness\":45}]},{\"featureType\":\"road.highway\",\"elementType\":\"all\",\"stylers\":[{\"visibility\":\"simplified\"}]},{\"featureType\":\"road.arterial\",\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"transit\",\"elementType\":\"all\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"water\",\"elementType\":\"all\",\"stylers\":[{\"color\":\"#46bcec\"},{\"visibility\":\"on\"}]}]",
            "earth": "[{\"featureType\":\"landscape.man_made\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#f7f1df\"}]},{\"featureType\":\"landscape.natural\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#d0e3b4\"}]},{\"featureType\":\"landscape.natural.terrain\",\"elementType\":\"geometry\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"poi\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"poi.business\",\"elementType\":\"all\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"poi.medical\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#fbd3da\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#bde6ab\"}]},{\"featureType\":\"road\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"road\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#ffe15f\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#efd151\"}]},{\"featureType\":\"road.arterial\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#ffffff\"}]},{\"featureType\":\"road.local\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"black\"}]},{\"featureType\":\"transit.station.airport\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#cfb2db\"}]},{\"featureType\":\"water\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#a2daf2\"}]}]"
        };
        if ('undefined' != typeof skins[predefined_style]) {
            map_style = JSON.parse(skins[predefined_style]);
        }
        (function initMap() {
            var latlng = new google.maps.LatLng(locations[0][0], locations[0][1]);
            map_options.center = latlng;
            map_options.styles = map_style;
            if (false == map_options.gestureHandling) {
                map_options.gestureHandling = 'none';
            }
            var map = new google.maps.Map($scope.find('.jws-google-map')[0], map_options);
            var infowindow = new google.maps.InfoWindow();
            var marker;
            for (i = 0; i < locations.length; i++) {
                var title = locations[i][3];
                var description = locations[i][4];
                var images_info = locations[i][5];
                var icon_size = parseInt(locations[i][8]);
                var icon_type = locations[i][6];
                var icon = '';
                var icon_url = locations[i][7];
                var enable_iw = locations[i][2];
                var click_open = locations[i][9];
                var lat = locations[i][0];
                var lng = locations[i][1];
                var infoWindow_opened = false;
                if ('undefined' === typeof locations[i]) {
                    return;
                }
                if ('' != lat.length && '' != lng.length) {
                    if ('custom' == icon_type) {
                        icon = {
                            url: icon_url,
                        };
                        if (!isNaN(icon_size)) {
                            icon.scaledSize = new google.maps.Size(icon_size, icon_size);
                            icon.origin = new google.maps.Point(0, 0);
                            icon.anchor = new google.maps.Point(icon_size / 2, icon_size);
                        }
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(lat, lng),
                            map: map,
                            title: title,
                            icon: icon,
                            animation: animation
                        });
                    } else if ('html' == icon_type) {
                        marker = new CustomMarker(new google.maps.LatLng(lat, lng), map, className);
                    } else {
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(lat, lng),
                            map: map,
                            title: title,
                            icon: icon,
                            animation: animation
                        });
                    }
                    if ('undefined' !== typeof maker_offset) {
                        map.panBy(0, maker_offset);
                    }
                    if (locations.length > 1) {
                        // Extend the bounds to include each marker's position
                        bounds.extend(marker.position);
                    }
                    marker_cluster[i] = marker;
                    if (enable_iw && 'iw_open' == click_open) {
                        infoWindow_opened = true;
                        var has_image = '';
                        if (images_info != '') {
                            has_image = ' has-image';
                        }
                        var content_string = '<div class="jws-infowindow-content">';


                        if (images_info != '') {
                            content_string += '<div class="info-left"><img src="' + images_info + '"></div>';
                        }
                        if ('' != description.length) {
                            content_string += ' <div class="content-right"><div class="jws-infowindow-title">' + title + '</div><div class="jws-infowindow-description">' + description + '</div></div>';
                        }

                        content_string += '</div>';
                        if ('' != info_window_size) {
                            var width_val = parseInt(info_window_size);
                            infowindow = new google.maps.InfoWindow({
                                content: content_string,
                                maxWidth: width_val
                            });
                        } else {
                            infowindow = new google.maps.InfoWindow({
                                content: content_string,
                            });
                        }
                        infowindow.open(map, marker);
                    }
                    // Adding close event for info window
                    google.maps.event.addListener(map, 'click', (function(infowindow) {
                        return function() {
                            infowindow.close();
                        };
                    })(infowindow));
                    infowindow.addListener('closeclick', () => {
                        infoWindow_opened = false;
                    });
                    if (enable_iw && '' != locations[i][3]) {
                        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                            var infowindow = new google.maps.InfoWindow();
                            if ('' != locations[i][5].length) {
                                var content_string = '<div class="jws-infowindow-content 00"><div class="info-left"><img src="' + locations[i][5] + '"></div>';
                            }

                            content_string += '<div class="content-right"><div class="jws-infowindow-title">' + locations[i][3] + '</div>';
                            if ('' != locations[i][4].length) {
                                content_string += '<div class="jws-infowindow-description">' + locations[i][4] + '</div></div>';
                            }

                            content_string += '</div>';

                            return function() {

                                infowindow.setContent(content_string);
                                if ('' != info_window_size) {
                                    var width_val = parseInt(info_window_size);
                                    var InfoWindowOptions = {
                                        maxWidth: width_val
                                    };
                                    infowindow.setOptions({
                                        options: InfoWindowOptions
                                    });
                                }

                                if (!infoWindow_opened) {
                                    infowindow.open(map, marker);
                                }


                            };

                        })(marker, i));
                    }
                }
            }
            if (locations.length > 1) {
                if ('center' == auto_center) {
                    // Now fit the map to the newly inclusive bounds.
                    map.fitBounds(bounds);
                }
                // Restore the zoom level after the map is done scaling.
                var listener = google.maps.event.addListener(map, "idle", function() {
                    map.setZoom(map_options.zoom);
                    google.maps.event.removeListener(listener);
                });
            }
        })();
    };
    /**
     * Table handler Function.
     *
     */
    var jws_table = function($scope, $) {
        if ('undefined' == typeof $scope) {
            return;
        }
        // Define variables.
        var node_id = $scope.data('id');
        var jws_table = $scope.find('.jws-table');
        var jws_table_id = $scope.find('#jws-table-id-' + node_id);
        var searchable = false;
        var showentries = false;
        var sortable = false;
        if (0 == jws_table_id.length) return;
        //Search entries
        var search_entry = $('.elementor-element-' + node_id + ' #' + jws_table_id[0].id).data('searchable');
        if ('yes' == search_entry) {
            searchable = true;
        }
        //Show entries select
        var show_entry = $('.elementor-element-' + node_id + ' #' + jws_table_id[0].id).data('show-entry');
        if ('yes' == show_entry) {
            showentries = true;
        }
        //Sort entries
        var sort_table = $('.elementor-element-' + node_id + ' #' + jws_table_id[0].id).data('sort-table');
        if ('yes' == sort_table) {
            $('.elementor-element-' + node_id + ' #' + jws_table_id[0].id + ' th').css({
                'cursor': 'pointer'
            });
            sortable = true;
        }
        var search_string = jws_script.search_str;
        var length_string = jws_script.table_length_string;
        if (searchable || showentries || sortable) {
            $('#' + jws_table_id[0].id).DataTable({
                "paging": showentries,
                "searching": searchable,
                "ordering": sortable,
                "info": false,
                "oLanguage": {
                    "sSearch": search_string,
                    "sLengthMenu": length_string,
                },
            });
            var div_entries = $scope.find('.dataTables_length');
            div_entries.addClass('jws-tbl-entry-wrapper jws-table-info');
            var div_search = $scope.find('.dataTables_filter');
            div_search.addClass('jws-tbl-search-wrapper jws-table-info');
            $scope.find('.jws-table-info').wrapAll('<div class="jws-advance-heading"></div>');
        }

        function coloumn_rules() {
            if ($(window).width() > 767) {
                $(jws_table).addClass('jws-column-rules');
                $(jws_table).removeClass('jws-no-column-rules');
            } else {
                $(jws_table).removeClass('jws-column-rules');
                $(jws_table).addClass('jws-no-column-rules');
            }
        }
        // Listen for events.
        window.addEventListener("load", coloumn_rules);
        window.addEventListener("resize", coloumn_rules);
    };
    /**
     * Menu Style.
     *
     */
    var jws_menu_style = function($scope, $) {
        if ('undefined' == typeof $scope) {
            return;
        }
        $scope.find('.jws_main_menu').eq(0).each(function() {
            var $this = $(this);
            $(this).find('.elementor-icon-list-item.active').parents('.nav > li').addClass('current-menu-item');
            if ($this.closest('.elementor-widget-jws_menu_nav').hasClass('elementor-before-menu-skin-animation-line')) {
                var main = $this.find(".jws_main_menu_inner"),
                    curent_item = main.find('> ul > li.current-menu-item , > ul > li.current-menu-ancestor'),
                    curent_item_sub = main.find('ul li.current-menu-item , .elementor-icon-list-item.active');
                if (main.find('> ul > li.current-menu-item').length == 0) {
                    if (curent_item_sub.length > 0) {
                        curent_item = curent_item_sub.parents('.nav > li');
                    } else {
                        curent_item = main.find('> ul > li:first-child');
                    }
                }
            }
            /** Menu toggle **/
            $this.find('.click-show-menu-v').on('click', function() {
                $this.find('.menu-toggle').toggleClass('open');
            });
        });
        //mega menu  
        var mainMenu = $('.elementor_jws_menu_layout_menu_horizontal').find('.nav');
        var mega_item = mainMenu.find(' > li.menu-item-design-mega_menu_full_width');

        if (mega_item.length > 0) {
            $('.jws_header').addClass('has-mega-full');
        }

        mega_item.mouseenter(function() {
            $('.jws_header.has-mega-full').addClass('mega-has-hover');
        });

        mega_item.mouseleave(function() {
            $('.jws_header.has-mega-full').removeClass('mega-has-hover');
        });

    };
    /**
     * Wishlist Count.
     *
     */
    var jws_wishlist = function($scope, $) {
        if ('undefined' == typeof $scope) {
            return;
        }
        $scope.find('.jws_wishlist').eq(0).each(function() {
            $(document).on('added_to_cart added_to_wishlist removed_from_wishlist', function() {
                var counter = $('.jws_wishlist_count');
                $.ajax({
                    url: yith_wcwl_l10n.ajax_url,
                    data: {
                        action: 'yith_wcwl_update_wishlist_count'
                    },
                    dataType: 'json',
                    success: function(data) {
                        counter.html(data.count);
                    },
                    beforeSend: function() {
                        counter.block();
                    },
                    complete: function() {
                        counter.unblock();
                    }
                });
            });
        });
    };
    var tooltip = function($scope, $) {
        $scope.find('.jws-tooltip-list').eq(0).each(function() {
            $(this).find('button').on("click", function() {
                var item = $(this).parents('li');
                item.toggleClass('active').siblings().removeClass('active');
            });
        });
    };

    var instagram_slider = function($scope, $) {
        $scope.find('.jws-instagram').eq(0).each(function() {
            //   if($('.instafeed_container').hasClass('.instagram-image-slider')){
            $('.instagram_image_slider').not('.slick-initialized').slick({
                dots: false,
                arrows: false,

                variableWidth: true
            });
            //  }
        });
    };

    var initSection = function ($obj) {
         var $container = $obj.children('.elementor-container.jws_section_slider'),
            dot_class =  $container.find('.slider-dots-box'),
            $events,
            current_side;
         if($container.hasClass('jws_section_slider')) {
            var item_length = $container.find('.elementor-top-column').length - 1;
            let blocked = false;
    		let blockTimeout = null;
    		let prevDeltaY = 0;
            $container.eq(0).each(function() {
                var $this = $(this);
                var verticalSwiping = false;
                var window_offset;
                if($container.hasClass('slick_wheel') ) {
                        slider_wheel();
                        $(window).scroll(function() {
                            window_offset = $container.offset().top - $(window).scrollTop();   
                            if(window_offset == 0){
                                $this.css('pointer-events','auto');
                            }
                        });  
                    
                    verticalSwiping = true;
                }
                
                var data_slick = $container.data('slick');

    			$this.not('.slick-initialized').slick({
    				prevArrow: $(this).find('.nav_left'),
                    nextArrow: $(this).find('.nav_right'),
    				swipeToSlide: true,
                    fade: false,
                    slide: '.elementor-column',
                    appendDots: dot_class,
    	            dotsClass: 'slider-dots',
                    verticalSwiping:verticalSwiping,
    			});
                $this.on('beforeChange', function(event, slick, currentSlide, nextSlide){
                   
                  if(currentSlide == nextSlide) {
                    return false;
                  } 
                  if(slick.$slider.hasClass('jws_section_slider')) { 
                      $('.slider-dots-box button').html('');
                      current_side = $this.find("[data-slick-index='" +nextSlide+ "']");
                      $events = 'no';
                      section_change(current_side,$events);
                  } else {
                    return false;
                } 
                }).on('afterChange', function(event, slick, currentSlide){
                
                  $(".jws_gallery.jws-slider").slick('slickGoTo', 0);
                if(slick.$slider.hasClass('jws_section_slider')) {
                   current_side = $this.find("[data-slick-index='" +currentSlide+ "']");
                   $events = 'next'; 
                   section_change(current_side,$events);
                     if( item_length == currentSlide && $container.hasClass('slick_wheel') ){
                       
                        if(!data_slick.infinite && !$('body').hasClass('elementor-editor-active')) {
                            $this.css('pointer-events','none');
                        }  
                    };
                    
                    $('.slider-dots-box button').html('');  
                }else {
                    return false;
                }
                });  
                
                function slider_wheel() {
                    $this.on('mousewheel DOMMouseScroll wheel', (function(e) {
                       let deltaY = e.originalEvent.deltaY;
						e.preventDefault();
						e.stopPropagation();

						clearTimeout(blockTimeout);
						blockTimeout = setTimeout(function(){
							blocked = false;
						}, 50);
                    
                      if (deltaY > 0 && deltaY > prevDeltaY || deltaY < 0 && deltaY < prevDeltaY || !blocked) {
						blocked = true;
						prevDeltaY = deltaY;

						if (deltaY > 0) {
							$this.slick('slickNext');
						} else {
							$this.slick('slickPrev');
						}
					}
                    }));   
                }
    		}); 
            function section_change($slick,$events) {
              
                $slick.find('[data-element_type="widget"]').each(function() { 
                	var data = $(this).data('settings');
                    var $this = $(this);
                    if(data !== undefined) {
                        $this.addClass('has_animated'); 
                    }
                    if(data !== undefined && data._animation_delay !== undefined) {
                       if($events == 'next') {
                        setTimeout(function(){
                           $this.addClass('animated');
                          $this.addClass(data._animation);
                       },data._animation_delay);  ;   
                       }else {
                             $this.removeClass('animated');
                             $this.removeClass(data._animation);
                       } 
                    }else if(data !== undefined) {
                       if($events == 'next') {
                        setTimeout(function(){
                           $this.addClass('animated');
                          $this.addClass(data._animation);
                       },0);  
                       }else {
                             $this.removeClass('animated');
                             $this.removeClass(data._animation);
                       }  
                    }
            	});
            }
         }
    };
//Toggle Switch

    var jws_switch_toggle = function($scope, $){
     $scope.find('.jws_toogle_wrap').eq(0).each(function() {
         var pricingSwitch = $(this).find('#pricing-Switch');
      
         var toggleIsOn = false;
        // DARK MODE TOGGLE FUNCTIONALITY
        pricingSwitch.click(function(){
            if (toggleIsOn === false) {
                $(this).css('justify-content','flex-end');
                 $(".jws_tab_item_month").hide();
                  $(".jws_tab_item_year").show();
                   $(".year").addClass('show');
                    $(".month").removeClass('show');
                toggleIsOn = true;
            } else {
                $(this).css('justify-content','flex-start');
                 $(".jws_tab_item_month").show();
                 $(".jws_tab_item_year").hide();
                  $(".month").addClass('show');
                   $(".year").removeClass('show');
                toggleIsOn = false;
            }
        
            return toggleIsOn;
        });

        
     });   
    };
//Countdown

    var countdown = function($scope, $) {
    if($('.jws-countdown-container').hasClass('layout1')){
          $scope.find('.jws-countdown-animation').eq(0).each(function() {
            var date_time = $(this).data('time-now');   
                    $(this).timeTo({
                        timeTo: new Date(new Date(date_time)),
                        displayCaptions: true,
                    });  
            });
         }
          if($('.jws-countdown-container').hasClass('layout2')){
            $scope.find('.countdown-container').eq(0).each(function() {   
             var $coundown = $(this).find('.countdown');
          
               $().jws_countdown($coundown); 
             });
     }
    };


    var category_list = function($scope, $) {
        $scope.find('.jws-category-list').eq(0).each(function() {
            $(this).find('.category-content-slider').not('.slick-initialized').slick({
                prevArrow: '<span class="jws-carousel-btn prev-item"><i class="jws-icon-expand_right"></i></span>',
                nextArrow: '<span class="jws-carousel-btn next-item "><i class="jws-icon-expand_right"></i></span>',
                swipeToSlide: true,
                appendDots: $('.slider-dots-box'),
                dotsClass: 'slider-dots',
            })
        });
    };



    // Make sure you run this code under Elementor..


    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/section', function($element) {
            initSection($element);
        });

        elementorFrontend.hooks.addAction('refresh_page_css', function(css) {
            var $obj = $('style#jws_elementor_custom_css');
            if (!$obj.length) {
                $obj = $('<style id="jws_elementor_custom_css"></style>').appendTo('head');
            }
            css = css.replace('/<script.*?\/script>/s', '');
            $obj.html(css).appendTo('head');
        });

        var widgets = {
            'jws_video_popup.default': video_popup,
            'jws_testimonial_slider.default': testimonials_slider,
            'jws_blog.default': [blogLoadMore, blog_filter],
            'jws_tab.default': [circular_tab,jws_tabs],
            'jws_map.default': WidgetjwsGoogleMapHandler,
            'jws_services.default': services_slider,
            'jws_search.default': search,
            'jws_progress.default': [jws_process_slider, jws_process_tabs, jws_process_hover],
            'jws_team.default': [team_slider],
            'jws_table.default': jws_table,
            'jws_menu_nav.default': jws_menu_style,
            'jws_wishlist.default': jws_wishlist,
            'jws_gallery.default': jws_gallery,
            'jws_demo.default': [demo_filter],
            'jws-product-advanced.default': [jws_carousel, product_tabs_filter],
            'jws_banner.default': jws_banner,
            'jws_nft.default': jws_nft,
            'tooltip.default': tooltip,
            'jws_instagram.default': [instagram_slider],
            'jws_slider.default': jws_slider,
            'jws_product_group.default': jws_product_group,
            'jws-category-list.default': category_list,
            'jws_widget_countdown.default': countdown,
            'jws_text_slider.default': jws_text_slider,
            'jws_timeline.default': timeline,
            'jws_login_form.default': login_form,
            'jws-pie-charts.default':jws_doughut_chart,
            'jws_crypto_currency_table.default':jws_crypto_currency_table,
            'jws_collapse.default':jws_collapse,
            'jws_switch_toggle.default':jws_switch_toggle,
            'jws_text_circle.default': text_circle_animate,
            'convert_cryptocurrency.default' : convert_cryptocurrency,
            'jws_project.default' :[project_filter] ,



       
        };

        $.each(widgets, function(widget, callback) {
            if ('object' === typeof callback) {
                $.each(callback, function(index, cb) {
                    elementorFrontend.hooks.addAction('frontend/element_ready/' + widget, cb);
                });
            } else {
                elementorFrontend.hooks.addAction('frontend/element_ready/' + widget, callback);
            }
        });
    });
})(jQuery);