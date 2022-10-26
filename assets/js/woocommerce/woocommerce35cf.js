var jwsThemeWooModule;
(function($) {
    "use strict";
    jwsThemeWooModule = (function() {
        return {
            init: function() {
                this.jws_product_tabs_block();
                this.woo_tabs();
                this.related_slider();
                this.quickViewInit();
                this.filterAjax();
                this.productImagesGallery();
                this.jwsproductAttribute();
                this.productImages();
                this.share_button();
                this.shop_sidebar();
                this.addToCartAllTypes();
                this.swatchesVariations();
                this.jws_tigger_function();
                this.initZoom();
                this.countdown_single();
                this.change_quantity_discount();
                this.jws_woocommerce_checkout_medern();
                this.checkout_input();
                this.switch_checkout_layout();
                this.comments_sort();
              this.single_product_js();
            },
            copy(){
              $('.addthis_button_copy').on("click", function() {
                $('html, body').animate({
                    scrollTop: 0
                }, 100);
                return false;
            });   
        },
         single_product_js() {
         $('body.single-product').on('adding_to_cart', function() {
           var checkExist = setInterval(function() {
           if ($('body > .woocommerce-error').length) {
              if(!$('.jws-notices').length) {
                $('body').append('<div class="jws-notices"></div>');  
              }  
              
              var container = $('body > .woocommerce-error').appendTo('.jws-notices').wrap('<div class="note-item"></div>');
               var container_item = container.closest('.note-item');
               container_item.fadeIn(500);
               setTimeout(function(){
                  container_item.fadeOut(500);  
               },3500);  
               setTimeout(function(){
                 container_item.remove();  
               },4000); 
   
              clearInterval(checkExist);
           }
        }, 100);
        
        $('body').on('click','.note-close', function() { 
            $(this).parent().fadeOut(500); ;
        });
      
       });
    
    
    
   },
   comments_sort: function() {
        
  
        $( ".jws-shorting-review" ).on( "change", function() {
            var $this = $(this);
            var value = $this.val();
            $this.addClass('active');
            $('.commentlist').addClass('loading');

            var url = document.location.href+"?sort="+value+"";
        


            $('#comments').append('<div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>');

            if ('?' == url.slice(-1)) {
                url = url.slice(0, -1);
            }

            url = url.replace(/%2C/g, ',');


            $.get(url, function(res) {
                 $this.removeClass('active');
                $('#comments').replaceWith($(res).find('#comments'));


            }, 'html');
            
            
            
            
    
        });
            
   } ,


   switch_checkout_layout : function() {  
        $('body').on('click','.sw-modern', function() { 
            $('.switch_checkout_layout a').removeClass('active');
            $(this).addClass('active');
             Cookies.set('checkout', 'modern') ;  
        }); 
        $('body').on('click','.sw-classic', function() {  
            $('.switch_checkout_layout a').removeClass('active');
            $(this).addClass('active');
             Cookies.set('checkout', 'classic') ;  
        }); 
   },
   
   checkout_input : function() { 
            function checkForInput(element) {
              // element is passed to the function ^
              
              const $label = $(element).parents('.form-row');
            
              if ($(element).val().length > 0) {
                $label.addClass('entering_text');
              } else {
                $label.removeClass('entering_text');
              }
            }
            
            // The lines below are executed on page load
            $('#customer_details .input-text').each(function() {
              checkForInput(this);
            });
            
            // The lines below (inside) are executed on change & keyup
            $('#customer_details .input-text').on('change keyup', function() {
              checkForInput(this);  
            });
            
            
            
            function checkselect() {
                $('.country_select').each(function() {
                    if ($('option:selected',this).val().length > 0) {
                        $('option:selected',this).parents('.form-row').addClass('entering_text');
                    } else {
                        $('option:selected',this).parents('.form-row').removeClass('entering_text');
                    }   
                });  
            }
            checkselect();
            $('body').on('change','.country_select', function() {  
              checkselect();    
            });   
           
   },         
            
            
   jws_woocommerce_checkout_medern: function() {
       var _apply_coupon = false; 
       $('body').on('updated_checkout', function() {
            if ($('.page_checkout_modern').length) {
                $('.processing').removeClass('processing');
    
                jwsThemeWooModule.jws_update_shipping_methods();
    
                if ($('.page_checkout_modern .woocommerce-additional-fields').length && $('#jws-shipping-methods').length) {
                    var _note = $('.page_checkout_modern .woocommerce-additional-fields').clone();
    
                    $('.page_checkout_modern .woocommerce-additional-fields').remove();
                    $('#jws-shipping-methods').after(_note);
                }
              
                if (_apply_coupon) {
                    jwsThemeWooModule.jws_clone_notices_coupon();
    
                    if ($('.woocommerce-error').length && $('.coupon-clone-wrap').length) {
                        $('.coupon-clone-wrap').find(':input:eq(0)').trigger('focus');
                    }
                }
    
                _apply_coupon = false;
            }
        });
        
        $('body').on('checkout_error', function () {
            jwsThemeWooModule.jws_move_valiate_notices();
        });

        
        $('body').on('jws_update_custommer_info', function() {
            $('body').trigger('update_checkout');
            
            if ($('#jws-billing-info').length) {
                var _email = $('input[name="billing_email"]').val();
                $('#jws-billing-info .customer-info-email .customer-info-right').html(_email);
            }
        });
        
        $('body').on('applied_coupon_in_checkout', function () {
            jwsThemeWooModule.jws_move_valiate_notices();
        if ($('.shipping-wrap-modern').length) {
            $('.woocommerce-error, .woocommerce-message').hide();
            _apply_coupon = true;
            }
        });
        
        $('body').on('removed_coupon_in_checkout', function () {
            if ($('.shipping-wrap-modern').length) {
                $('.woocommerce-error, .woocommerce-message').hide();
                _apply_coupon = true;
            }
        });
    
        $('body').on('click', '.showcoupon', function () {
            if ($('.woocommerce-error').length) {
                $('.woocommerce-error').hide();
            }
        });
         
        $('body').on('click', '.showcoupon-clone', function() {
            $('.coupon-clone-wrap').toggleClass('hidden');
            $('.coupon-clone-wrap').find(':input:eq(0)').trigger('focus');
        });
        
        $('body').on('click', '#apply_coupon_clone', function() {
            if ($('input[name="coupon_code_clone"]').length && $('form.checkout_coupon input[name="coupon_code"]').length) {
               
                $('.woocommerce-error, .woocommerce-message').hide();
                var _coupon = $('input[name="coupon_code_clone"]').val();
                $('form.checkout_coupon input[name="coupon_code"]').val(_coupon).change();
                $('form.checkout_coupon').trigger('submit');
                $('.woocommerce-checkout-review-order').addClass('processing');
            }
        });
        
        
        $('body').on('change', 'select.shipping_method, input[name^="shipping_method"], #ship-to-different-address input, .update_totals_on_change select, .update_totals_on_change input[type="radio"], .update_totals_on_change input[type="checkbox"]', function() {
            if ($('.page_checkout_modern').length && !$('.woocommerce-checkout-review-order').hasClass('processing')) {
                $('.woocommerce-checkout-review-order').addClass('processing');
            }
        });
        
        
        var action = $('.jws-nav-modern a');
        $('body').on('click', '.jws-nav-modern .jws-shipping-step', function() { 
            var _valid = jwsThemeWooModule.jws_validate_form_checkout();
            console.log(_valid);
            if(_valid) {
               $('body').trigger('jws_update_custommer_info');
                action.removeClass('active');
                $(this).addClass('active');
                $('#jws-shipping-methods').show();
                $('.woocommerce-additional-fields').show();
                $('#customer_details').hide();
                $('.woocommerce-checkout-payment').hide(); 
                $('#next-step-shipping').hide(); 
                $('#next-step-payment').show(); 
            }
            
        });
        
        $('body').on('click', '.jws-nav-modern .jws-billing-step', function() {
            $('body').trigger('jws_update_custommer_info');
            action.removeClass('active');
            $(this).addClass('active');  
            $('#jws-shipping-methods').hide();
            $('.woocommerce-additional-fields').hide();
            $('#customer_details').show();
            $('.woocommerce-checkout-payment').hide();
            $('#next-step-shipping').show(); 
            $('#next-step-payment').hide(); 
        });
        
        $('body').on('click', '.jws-nav-modern .jws-payment-step', function() {
            var _valid = jwsThemeWooModule.jws_validate_form_checkout();
            if(_valid) { 
                $('body').trigger('jws_update_custommer_info');
                action.removeClass('active');
                $(this).addClass('active');  
                $('#jws-shipping-methods').hide();
                $('.woocommerce-additional-fields').hide();
                $('#customer_details').hide();
                $('.woocommerce-checkout-payment').show();
                $('#next-step-shipping').hide(); 
                $('#next-step-payment').hide();   
            }  
        }); 
        
        
        $('body').on('click', '#next-step-shipping .jws-next-step', function() {
                $('.jws-shipping-step').trigger('click');
        }); 
        
        $('body').on('click', '#next-step-payment .jws-next-step', function() {
                $('.jws-payment-step').trigger('click');
        }); 
        
        $('body').on('click', '#next-step-payment .jws-back-step', function() {
                $('.jws-billing-step').trigger('click');
        }); 
        
        
                    
   }, 
   
   
   jws_validate_form_checkout: function() {
        var _form = $('form.checkout');
    
        if (_form.length <= 0) {
            return false;
        }
        
        var _diffirent = _form.find('[name="ship_to_different_address"]').is(':checked') ? true : false;
        
        var _wrap = !_diffirent ? _form.find('.woocommerce-billing-fields') : _form.find('#customer_details');
    
        _wrap.find('.form-row').each(function () {
           
            jwsThemeWooModule.jws_validate_field($(this));
       
        });
        
        return _wrap.find('.jws-invalid, .jws-error').length ? false : true;
    },
    
    
    jws_validate_field: function(_form_row) {
    var $this = _form_row.find('.input-text, select, input:checkbox'),
        validated = true,
        validate_required = _form_row.is('.validate-required'),
        validate_email = _form_row.is('.validate-email'),
        validate_phone = _form_row.is('.validate-phone'),
        pattern = '',
        _note = '';

    _form_row.removeClass('jws-invalid');
    
        
    if (validate_required) {
        if ('checkbox' === $this.attr('type') && !$this.is(':checked')) {
            _form_row.removeClass('woocommerce-validated').addClass('woocommerce-invalid woocommerce-invalid-required-field');
            validated = false;
            
            if (_form_row.find('.jws-error').length <= 0) {
                _note = $('.jws-require-notice').html();
                $this.after('<span class="jws-error">' + _note + '</span>');
            }
        } else if ($this.val() === '') {
            _form_row.removeClass('woocommerce-validated').addClass('woocommerce-invalid woocommerce-invalid-required-field');
            validated = false;
            
            if (_form_row.find('.jws-error').length <= 0) {
                _note = $('.jws-require-notice').html();
                $this.after('<span class="jws-error">' + _note + '</span>');
            }
        }
    }

    if (validate_email) {
        if ($this.val()) {
            /* https://stackoverflow.com/questions/2855865/jquery-validate-e-mail-address-regex */
            pattern = new RegExp(/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i); // eslint-disable-line max-len

            if (!pattern.test($this.val())) {
                _form_row.removeClass('woocommerce-validated').addClass('woocommerce-invalid woocommerce-invalid-email woocommerce-invalid-phone'); // eslint-disable-line max-len
                validated = false;
                
                if (_form_row.find('.jws-error').length <= 0) {
                    _note = $('.jws-email-notice').html();
                    $($this).after('<span class="jws-error">' + _note + '</span>');
                }
            }
        }
    }

    if (validate_phone) {
        pattern = new RegExp(/[\s\#0-9_\-\+\/\(\)\.]/g);

        if (0 < $this.val().replace(pattern, '').length) {
            _form_row.removeClass('woocommerce-validated').addClass('woocommerce-invalid woocommerce-invalid-phone');
            validated = false;
            
            if (_form_row.find('.jws-error').length <= 0) {
                _note = $('.jws-phone-notice').html();
                $($this).after('<span class="jws-error">' + _note + '</span>');
            }
        }
    }

    if (validated) {
        _form_row.removeClass('woocommerce-invalid woocommerce-invalid-required-field woocommerce-invalid-email woocommerce-invalid-phone').addClass('woocommerce-validated'); // eslint-disable-line max-len
        _form_row.find('.jws-error').remove();
    } else {
        _form_row.addClass('jws-invalid');
    }
 
    return validated;
},    
  
  
  jws_clone_notices_coupon: function() {
    var _notice = $('.woocommerce-error, .woocommerce-message');
    if ($(_notice).length) {
        $('.woocommerce-error, .woocommerce-message').each(function() {
            var _this = $(this);
            $('.coupon-clone-wrap').after(_this);
        });
        
        $('.woocommerce-error, .woocommerce-message').show();
    }
} , 
    
    
  jws_update_shipping_methods: function() {
    if ($('.jws-shipping-wrap').length && $('.order-shipping-modern').length) {
         
        var _shipping = '';
        var _available = false;
        var _avai_html = '';
        $('.jws-shipping-wrap').each(function() {
            var _this = $(this);
            if (_this.find('#shipping_method').length) {
               
                var _p_name = _this.find('.shipping-package-name').html();

                _shipping += '<tr class="woocommerce-shipping-totals shipping">';

                /**
                 * Shipping Pagckage Name
                 */
                _shipping += '<th>' + _p_name + '</th>';

                _shipping += '<td>';
                /**
                 * Shipping Methods
                 */
                _shipping += '<ul id="shipping_method_clone" class="woocommerce-shipping-methods-clone">';

                _this.find('#shipping_method li').each(function() {
                    var _method = $(this);
                    if ($(_method).find('select.shipping_method, input[name^="shipping_method"][type="radio"]:checked, input[name^="shipping_method"][type="hidden"]').length) {
                        var _used = _method.clone();
                        $(_used).find('select.shipping_method, input[name^="shipping_method"][type="radio"]:checked, input[name^="shipping_method"][type="hidden"]').remove();
                        _avai_html = $(_used).html();
                        _shipping += '<li>' + _avai_html + '</li>';

                        _available = true;
                    }
                });

                _shipping += '</ul>';

                _shipping += '</td></tr>';
            } else {
                $('#jws-billing-info .customer-info-method').remove();
            }
        });
        
        if (_available) {
            $('.order-shipping-modern').replaceWith(_shipping);
           
            $('#jws-billing-info .customer-info-method .customer-info-right').html(_avai_html);
        }
    }
    
    $('.woocommerce-checkout-review-order-table').addClass('jws-loaded');
},

jws_move_valiate_notices: function() {
    var _billing = false;
    if ($('.woocommerce-error li').length) {
        $('.woocommerce-error li').each(function () {
            var _li = $(this);
            var _this = _li.attr('data-id');
            if (typeof _this !== 'undefined' && $('#' + _this).length) {
                var _wrap = $('#' + _this).parents('.form-row');
                if (_wrap.length) {
                    var _appent = $(_li).html();
                    if (_wrap.find('.jws-error').length) {
                        _wrap.find('.jws-error').html(_appent);
                    } else {
                        $('#' + _this).after('<span class="jws-error">' + _appent + '</span>');
                    }

                    if (!_wrap.hasClass('woocommerce-invalid')) {
                        _wrap.removeClass('woocommerce-validated');
                        _wrap.addClass('woocommerce-invalid');
                    }

                    $(_li).remove();
                    
                    _billing = true;
                }
            }
        });

        if ($('.woocommerce-error li').length) {
            $('.woocommerce-error').show();
        } else {
            $('.woocommerce-error').hide();
        }
        
        if (_billing) {
            $('.jws-nav-modern .jws-billing-step').trigger('click');
        }
    }
},

            
            change_quantity_discount: function() { 
               $(document).on("change", 'input[name="quantity_discount"]', function() {
                    var $this = $(this),
                        $value = $this.val(),
                        $qty = $this.parents(".product").find(".quantity .qty");
                        $qty.val($value);
                        
                });
            },
            
            countdown_single: function() { 
                	$('.count_down').each(function() {
        	           var $coundown = $(this).find('.countdown');
                       $().jws_countdown($coundown);
	               	});
            },

            jws_tigger_function: function(variations_global) {

                $('body').on('click', '.product_type_variation', function(e) {
                    var _this = $(this),
                        _variation = null,
                        _data = '';


                    _data += 'product_id=' + _this.data('product_id');
                    _data += '&quantity=' + _this.data('quantity');
                    _data += '&variation_id=' + _this.attr('data-attr_id');
                    _data += '&add-to-cart=' + _this.data('product_id');

                    console.log(_this.data('variation'));

                    if (typeof $(_this).attr('data-variation') !== 'undefined') {
                        _variation = JSON.parse($(_this).attr('data-variation'));
                    }

                    if (_variation) {


                        for (var k in _variation) {
                            _data += '&' + k + '=' + _variation[k];
                        }

                    } else {
                        var _href = $(_this).attr('href');
                        window.location.href = _href;
                    }


                    e.preventDefault();
                    jwsThemeWooModule.single_add_to_cart(_this, _data);

                });



                setTimeout(function() {
                    if ($('.jws-attr-swatches').length) {
                        $('.jws-attr-swatches').each(function() {
                            var _this = $(this);

                            jwsThemeWooModule.jws_load_select_attr(_this);

                        });
                    }
                }, 100);
            },




            jws_load_select_attr: function(variations_global) {

                var variations = JSON.parse($(variations_global).attr('data-variations')),
                    product_item = $(variations_global).parents('.product-item-inner'),
                    count_attr = $(product_item).find('.jws-attr-content').length,
                    selected_count = $(product_item).find('.jws-attr-content .selected').length,
                    add_to_cat_btn = $(product_item).find('.add_to_cart_button'),
                    main_image = $(product_item).find('.woocommerce-loop-product__link img'),
                    gallery_image = $(product_item).find('.gallery img'),
                    old_image = main_image.attr('old_src'),
                    old_image_gallery = gallery_image.attr('old_src'),
                    selected_attr = [],
                    variation = {},
                    attr_val = null,
                    attr_selected = [],
                    attr_name = null,
                    variation_end = null,
                    finded = false,
                    selected_attr = [],
                    i;

                $(variations_global).find('.selected').each(function() {

                    var $this = $(this);

                    attr_val = $this.data('value');
                    attr_name = 'attribute_' + $this.data('type');
                    attr_selected = {
                        'key': attr_name,
                        'value': attr_val
                    };
                    variation[attr_name] = attr_val;
                    selected_attr.push(attr_selected);

                });



                if (count_attr !== selected_count) {

                    if (typeof old_image !== 'undefined') {
                        main_image.attr('src', old_image);
                    }
                    if (typeof old_image_gallery !== 'undefined') {
                        gallery_image.attr('src', old_image_gallery);
                    }


                } else {

                    for (i in variations) {


                        var total_attr = 0,
                            attrs = variations[i].attributes;


                        for (var k in attrs) {
                            total_attr++;
                        }



                        if (count_attr !== total_attr) {
                            break;
                        }


                        for (var k_select in selected_attr) {

                            if (attrs[selected_attr[k_select].key] === '' || attrs[selected_attr[k_select].key] === selected_attr[k_select].value) {
                                finded = true;
                            } else {
                                finded = false;
                                break;
                            }
                        }


                        if (finded) {
                            variation_end = variations[i];
                            break;
                        }
                    };



                    if (variation_end) {


                        /**
                         * Change Images
                         */

                        if (typeof old_image === 'undefined') {
                            $(main_image).attr('old_src', $(main_image).attr('src'));
                        }



                        if ($(gallery_image).length && typeof old_image_gallery === 'undefined') {
                            $(gallery_image).attr('old_src', $(gallery_image).attr('src'));
                        }


                        $(main_image).attr('src', variation_end.image.src);
                        $(main_image).removeAttr('srcset');

                        if (gallery_image.length) {
                            if (typeof variation_end.jws_variation_img === 'undefined') {
                                $(gallery_image).attr('src', variation_end.image.src);
                                $(gallery_image).removeAttr('srcset');
                            } else {
                                $(gallery_image).attr('src', variation_end.jws_variation_img);
                            }

                            $(gallery_image).removeAttr('srcset');
                        }


                        /**
                         * Change Price
                         */

                        if (variation_end.price_html) {
                            $(product_item).find('.price-item').html(variation_end.price_html);
                        } else {
                            $(product_item).find('.price-item').html('');
                        }


                        /**
                         * Change Add To Cart
                         */
                        var add_cart_text = jws_script.add_to_cart_text;
                        add_to_cat_btn.html(add_cart_text);
                        add_to_cat_btn.attr('title', add_cart_text);

                        var variObj = {};

                        for (var attr_pa in variation_end.attributes) {
                            variObj[attr_pa] = variation[attr_pa];
                            console.log(variation[attr_pa]);

                        }


                        add_to_cat_btn
                            .attr('data-attr_id', variation_end.variation_id)
                            .removeClass('product_type_variable')
                            .addClass('product_type_variation')
                            .attr('data-variation', JSON.stringify(variObj));
                    } else {
                        console.log('alo');
                    }

                }

            },



            jwsproductAttribute: function() {
                $(document.body).on('click', '.jws-swatch-variation-image', function(e) {
                    e.preventDefault();
                    var variations_global = $(this).parents('.jws-attr-swatches');
                    $(this).siblings('.jws-swatch-variation-image').removeClass('selected');
                    $(this).toggleClass('selected');

                    jwsThemeWooModule.jws_load_select_attr(variations_global);

                });
            },


            single_add_to_cart: function($thisbutton, _data) {


                var data = _data;
                
                data += '&action=jws_ajax_add_to_cart';
                if ($thisbutton.val()) {
                data += '&add-to-cart=' + $thisbutton.val();
                 }
                $thisbutton.removeClass('added not-added');
                $thisbutton.addClass('loading');
                if(!$thisbutton.find('.loader').length) {    
                        $thisbutton.append('<div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>');    
                }
                // Trigger event
                $(document.body).trigger('adding_to_cart', [$thisbutton, data]);

                $.ajax({
                    url: jws_script.ajax_url,
                    data: data,
                    method: 'POST',
                    success: function(response) {
                        if (!response) {
                            return;
                        }

                        var this_page = window.location.toString();
                        this_page = this_page.replace('add-to-cart', 'added-to-cart');
                        if (response.error && response.product_url) {
                            window.location = response.product_url;
                            return;
                        }
                        // Redirect to cart option
                        if (wc_add_to_cart_params.cart_redirect_after_add === 'yes') {
                            window.location = wc_add_to_cart_params.cart_url;
                            return;
                        } else {
                            $thisbutton.removeClass('loading');
                            $('.jws-mini-cart-wrapper ').removeClass('acttive');
                            var fragments = response.fragments;
                            var cart_hash = response.cart_hash;
                            // Block fragments class
                            if (fragments) {
                                $.each(fragments, function(key) {
                                    $(key).addClass('updating');
                                });
                            }
                            // Replace fragments
                            if (fragments) {
                                $.each(fragments, function(key, value) {
                                    $(key).replaceWith(value);
                                });
                            }
                            // Show notices
                            console.log(response);
                            if (response.notices.indexOf('error') > 0) {
                                $('body').append(response.notices);
                                $thisbutton.addClass('not-added');
                            } else {
                                // Changes button classes
                                $thisbutton.addClass('added');
                                // Trigger event so themes can refresh other areas
                                $(document.body).trigger('added_to_cart', [fragments, cart_hash, $thisbutton]);
                            }
                        }
                    },
                    error: function() {
                        console.log('ajax adding to cart error');
                    },
                    complete: function() {},
                });
            },


            addToCartAllTypes: function() {
                // AJAX add to cart for all types of products
                
                $(document).on('click', '.ajax_add_to_cart', function(e) {
                    if(!$(this).find('.loader').length) {    
                        $(this).append('<div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>');    
                    }
                });
                
                
                 
                $('body').on('submit', ' form.cart', function(e) {
                    e.preventDefault();
                    var $form = $(this),
                        $thisbutton = $form.find('.single_add_to_cart_button'),
                        _data = $form.serialize();

                    jwsThemeWooModule.single_add_to_cart($thisbutton, _data);

                });
            },
            shop_sidebar: function() {
                $('.toggle-shop-sidebar').on('click', function() {
                    $('.shop-sidebar').toggleClass('active');
                });
                $(document).on("click", function(e) {
                    if ($(e.target).is(".shop-sidebar,.shop-sidebar *,.toggle-shop-sidebar,.toggle-shop-sidebar *") === false) {
                        $('.shop-sidebar').removeClass('active');
                    }
                });
            },

            related_slider: function() {
                $('.related-slider').not('.slick-initialized').slick({
                    swipeToSlide: true,
                    prevArrow: '<span class="jws-carousel-btn prev-item"><i aria-hidden="true" class="jws-icon-caret-right-thin"></i></span>',
                    nextArrow: '<span class="jws-carousel-btn next-item "><i aria-hidden="true" class="jws-icon-caret-right-thin"></i></span>',
                });
            },


            //Woo Popuop
            jws_product_popup: function() {
                $('.jws-popup-woo').magnificPopup({
                    type: 'inline',
                    removalDelay: 500, //delay removal by X to allow out-animation
                    mainClass: 'mfp-zoom-in mfp-img-mobile',
                    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
                });
            },
                           /**
               *-------------------------------------------------------------------------------------------------------------------------------------------
               * Tabs
               *-------------------------------------------------------------------------------------------------------------------------------------------
               */
              
               woo_tabs : function() {
             
                   $('.woocommerce-tabs').eq(0).each(function() {
                     var $this = $(this);

                    /** Line magic tabs filter **/
                    var leftPos, newWidth, $magicLine;
                    if ($this.find('.wc-tabs').length) {
                        $this.find('.wc-tabs').append("<li id='magic_line'></li>");
                        $magicLine = $this.find('#magic_line');
                        $magicLine
                        .width($this.find('.active').width())
                        .css('left', $this.find('.active a').position().left)
                        .data('origLeft', $magicLine.position().left)
                        .data('origWidth', $magicLine.width())
                        $this.find('.wc-tabs li a').on("click", function() {  
                            var $this = $(this);
                            $(document).trigger('resize');
                            $magicLine
                                .data('origLeft', $this.position().left)
                                .data('origWidth', $this.parent().width())
                       
                        });

                        /*Magicline hover animation*/
                        $this.find('.wc-tabs li').find('a').click(function () {
                             $magicLine.css({
                                "left": $magicLine.data('origLeft'),
                                "width": $magicLine.data('origWidth'),
                            });
                        });
                    }
                    });
                },
            //Product tabs
            jws_product_tabs_block: function() {
                $('.accordion-active .wc-tab').show();
                
                $(document).on('click', '.tabs li a', function() {

                    $('.jws-group-accordion.accordion-active').removeClass('accordion-active');

                    $($(this).attr('href')).closest('.jws-group-accordion').addClass('accordion-active');
                });
                $(document).on('click', '.jws-group-accordion .tab-heading', function() {

                    let tab_is_activated = $(this).closest('.accordion-active')[0];
                    $('.woocommerce-tabs .accordion-active .wc-tab').slideUp();
                    $('.woocommerce-tabs .accordion-active').removeClass('accordion-active');
                    if (!tab_is_activated) {
                        $(this).closest('.jws-group-accordion').toggleClass('accordion-active');
                        $(this).next('.wc-tab').slideToggle();

                        if ($('.woocommerce-tabs .tabs.wc-tabs')[0]) {
                            let id = $(this).next('.wc-tab').attr('id');
                            $('.woocommerce-tabs .tabs.wc-tabs .active').removeClass('active');
                            $('.woocommerce-tabs .tabs.wc-tabs a[href="#' + id + '"]').parent().addClass('active');
                        }
                    }
                });




                
                $('.form-questions').on('submit',function(e){
                e.preventDefault();  
                var data = $(this).serialize();
                data += '&action=jws_add_question';
                data += '&product_id='+$(this).data('product')+'';
                $('.error').remove();
                console.log(data);
                $(this).addClass('loading');
                 $.ajax({
					url: jws_script.ajax_url,
					data: data,
					type: 'POST',
                    dataType: 'json',
				}).success(function(response) {
				    if(response.status == 'error') {
				       $('.form-questions').append('<div class="error">'+response.note+'</div>'); 
				    }else{
				       location.reload(true); 
				    }
					$('.form-questions').removeClass('loading');
                    
				}).error(function(ex) {
					console.log(ex);
				});
                });
                
                
                 $(document.body).on('click', '#answer-question-list .jws-pagination-number a', function(e) {
                    e.preventDefault();

                    var url = $(this).attr('href');

                    if ('?' == url.slice(-1)) {
                        url = url.slice(0, -1);
                    }

                    url = url.replace(/%2C/g, ',');


                    $.get(url, function(res) {
                        $('#answer-question-list .jws-pagination-number').html($(res).find('#answer-question-list .jws-pagination-number').html());
                        $('#answer-question-list > ul').html($(res).find('#answer-question-list > ul').html());
                    }, 'html');


                });
                
                



            },

            woocommerceCategoryWidget: function() {
                $('.product-categories .cat-parent ').append("<span class='cat_btn lnr lnr-chevron-down'></span>");
                $("body").on("click", ".product-categories .cat-parent > .cat_btn", function(e) {
                    var t = $(this).parent(),
                        n = $(t).parent();
                    if ($(t).hasClass("active")) $(t).find("> ul").slideUp(200).parent().removeClass("active");
                    else {
                        var s = $(n).children("li.active");
                        $(s).removeClass("active").children("ul").css({
                            height: "auto"
                        }).slideUp(200), $(t).children("ul").slideDown(200).parent().addClass("active")
                    }
                    return !1
                })
            },

            mobile_shop_filter: function() {
                $('.sidebar-mobile a').magnificPopup({
                    type: 'inline',
                    mainClass: '',
                    midClick: true,
                    callbacks: {
                        beforeOpen: function() {
                            this.st.mainClass = 'shop-sidebar-click sidebar-mobile-wap';
                        },
                        afterClose: function() {
                            $('.shop-sidebar').removeClass('mfp-hide');
                        }
                    },
                });

            },



            swatchesVariations: function() {
                var $variation_forms = $('.variations_form'),
                    variationGalleryReplace = false;
                // Firefox mobile fix
                $('.variations_form .label').on('click', function(e) {
                    if ($(this).siblings('.value').hasClass('with-swatches')) {
                        e.preventDefault();
                    }
                });
                $variation_forms.each(function() {
                    var $variation_form = $(this);
                    if ($variation_form.data('swatches')) return;
                    $variation_form.data('swatches', true);
                    // If AJX
                    if (!$variation_form.data('product_variations')) {
                        $variation_form.find('.swatches-select').find('> div').addClass('swatch-enabled');
                    }
                    if ($('.swatches-select > div').hasClass('active-swatch')) {
                        $variation_form.addClass('variation-swatch-selected');
                    }
                    $variation_form.on('click', '.swatches-select > div', function() {
                            var value = $(this).data('value');
                            var id = $(this).parent().data('id');
                            $variation_form.trigger('check_variations', ['attribute_' + id, true]);
                            resetSwatches($variation_form);
                            if ($(this).hasClass('active-swatch')) {
                                return;
                            }
                            if ($(this).hasClass('swatch-disabled')) return;
                            $variation_form.find('select#' + id).val(value).trigger('change');
                            $(this).parent().find('.active-swatch').removeClass('active-swatch');
                            $(this).addClass('active-swatch');
                            resetSwatches($variation_form);
                        })
                        // On clicking the reset variation button
                        .on('click', '.reset_variations', function(event) {
                            $variation_form.find('.active-swatch').removeClass('active-swatch');
                        })
                        .on('reset_data', function() {
                    
                          replaceMainGallery('default', $variation_form);
                            $('.text_vari').remove();
                            var all_attributes_chosen = true;
                            var some_attributes_chosen = false;
                            $variation_form.find('.variations select').each(function() {
                                var attribute_name = $(this).data('attribute_name') || $(this).attr('name');
                                var value = $(this).val() || '';
                                if (value.length === 0) {
                                    all_attributes_chosen = false;
                                } else {
                                    some_attributes_chosen = true;
                                }
                            });
                            if (all_attributes_chosen) {
                                $(this).parent().find('.active-swatch').removeClass('active-swatch');
                            }
                            $variation_form.removeClass('variation-swatch-selected');
                            var $mainOwl = $('.woocommerce-product-gallery__wrapper.owl-carousel'),
                                $slider_wap = $('.woocommerce-product-gallery');
                            resetSwatches($variation_form);
                            if (!isQuickShop($variation_form)) {
                                scrollToTop();
                            }
                            if (!$mainOwl.hasClass('owl-carousel')) return;
                            if ($slider_wap.hasClass('image_slider_center')) {
                                $mainOwl = $mainOwl.owlCarousel({
                                    center: true,
                                    loop: true,
                                    nav: true,
                                    navText: ["<span class='nav-left'></span>", "<span class='nav-right'></span>"],
                                    responsive: {
                                        979: {
                                            items: 3
                                        },
                                        768: {
                                            items: 3
                                        },
                                        479: {
                                            items: 1,
                                            center: false
                                        },
                                        0: {
                                            items: 1,
                                            center: false
                                        }
                                    },
                                })
                            } else {
                                $mainOwl = $mainOwl.owlCarousel({
                                    loop: false,
                                    margin: 10,
                                    nav: true,
                                    navText: ["<span class='nav-left'></span>", "<span class='nav-right'></span>"],
                                    items: 1
                                })
                            }
                            $mainOwl.trigger('refresh.owl.carousel');
                            $mainOwl.trigger('to.owl.carousel', 0);
                           
                           
                        })
                        // Update first tumbnail
                        .on('reset_image', function() {
 
                            var $thumb = $('.thumbnails .product-image-thumbnail img').first();
                            if (!isQuickView() && !isQuickShop($variation_form)) {
                                $thumb.wc_reset_variation_attr('src');

                            }
                        })
                        .on('show_variation', function(e, variation, purchasable) {
                            $('.text_vari').remove();
                            var text_vari = $variation_form.find('.swatch-color.selected');
                            text_vari.parents('.value').prev('.label').append('<span class="text_vari">' + $variation_form.find('.swatch-color.selected').data('value') + '</span>');


                            if (!variation.image.src) {
                                // return;
                            }
                            // See if the gallery has an image with the same original src as the image we want to switch to.
                            if (isQuickView()) {
                                var galleryHasImage = $variation_form.parents('.single-product-content').find('.thumbnails .product-image-thumbnail img[data-o_src="' + variation.image.thumb_src + '"]').length > 0;
                                var $firstThumb = $variation_form.parents('.single-product-content').find('.thumbnails .product-image-thumbnail img').first();
                            } else {
                                var galleryHasImage = $variation_form.parents('body').find('.thumbnails .product-image-thumbnail img[data-o_src="' + variation.image.thumb_src + '"]').length > 0;
                                var $firstThumb = $variation_form.parents('body').find('.thumbnails .product-image-thumbnail img').first();
                            }
                            // If the gallery has the image, reset the images. We'll scroll to the correct one.
                            if (galleryHasImage) {
                                $firstThumb.wc_reset_variation_attr('src');
                            }

                            if (!isVariationGallery(variation.variation_id)) {
                                replaceMainGallery('default', $variation_form)
                            } else {
                                if (!isQuickShop($variation_form) && !replaceMainGallery(variation.variation_id, $variation_form)) {
                                    if ($firstThumb.attr('src') != variation.image.thumb_src) {
                                        $firstThumb.wc_set_variation_attr('src', variation.image.src);
                                    }
                                    jwsThemeWooModule.initZoom();
                                }
                            }


                            $variation_form.addClass('variation-swatch-selected');
                            if (!isQuickShop($variation_form) && !isQuickView()) {
                                scrollToTop();
                            }
                            var $mainOwl = $('.woocommerce-product-gallery__wrapper.owl-carousel'),
                                $slider_wap = $('.woocommerce-product-gallery');
                            if (!$mainOwl.hasClass('owl-carousel')) return;
                            $variation_form.addClass('variation-swatch-selected');
                            if (!isQuickShop($variation_form)) {
                                scrollToTop();
                            }
                            if (!$mainOwl.hasClass('owl-carousel')) return;
                            $mainOwl.trigger('destroy.owl.carousel');
                            if ($slider_wap.hasClass('image_slider_center')) {
                                $mainOwl = $mainOwl.owlCarousel({
                                    center: true,
                                    loop: true,
                                    nav: true,
                                    navText: ["<span class='nav-left'></span>", "<span class='nav-right'></span>"],
                                    responsive: {
                                        979: {
                                            items: 3
                                        },
                                        768: {
                                            items: 3
                                        },
                                        479: {
                                            items: 1,
                                            center: false
                                        },
                                        0: {
                                            items: 1,
                                            center: false
                                        }
                                    },
                                })
                            } else {
                                $mainOwl = $mainOwl.owlCarousel({
                                    loop: false,
                                    margin: 10,
                                    nav: true,
                                    navText: ["<span class='nav-left'></span>", "<span class='nav-right'></span>"],
                                    items: 1,
                                    smartSpeed: 500,
                                });

                            }
                            $mainOwl.trigger('refresh.owl.carousel');
                            var $thumbs = $('.images .thumbnails');
                            $mainOwl.trigger('to.owl.carousel', 0);
                            if ($thumbs.hasClass('owl-carousel')) {
                                $thumbs.owlCarousel().trigger('to.owl.carousel', 0);
                                $thumbs.find('.active-thumb').removeClass('active-thumb');
                                $thumbs.find('.product-image-thumbnail').eq(0).addClass('active-thumb');
                            } else if ($thumbs.hasClass('slick-slider')) {
                                $thumbs.slick('slickGoTo', 0);
                                if (!$thumbs.find('.product-image-thumbnail').eq(0).hasClass('active-thumb')) {
                                    $thumbs.find('.active-thumb').removeClass('active-thumb');
                                    $thumbs.find('.product-image-thumbnail').eq(0).addClass('active-thumb');
                                }
                            }
                        });
                })
                var resetSwatches = function($variation_form) {
                    // If using AJAX
                    if (!$variation_form.data('product_variations')) return;
                    $variation_form.find('.variations select').each(function() {
                        var select = $(this);
                        var swatch = select.parent().find('.swatches-select');
                        var options = select.html();
                        options = $(options);
                        swatch.find('> div').removeClass('swatch-enabled').addClass('swatch-disabled');
                        options.each(function(el) {
                            var value = $(this).val();
                            if ($(this).hasClass('enabled')) {
                                swatch.find('div[data-value="' + value + '"]').removeClass('swatch-disabled').addClass('swatch-enabled');
                            } else {
                                swatch.find('div[data-value="' + value + '"]').addClass('swatch-disabled').removeClass('swatch-enabled');
                            }
                        });
                    });
                };
                var scrollToTop = function() {
                    if (!$('body').hasClass('crypteckduct-design-sticky') || !$('.entry-summary').hasClass('block-sticked') || $(window).width() <= 1024) return;
                    $('html, body').animate({
                        scrollTop: $('.product-image-summary').offset().top - 150
                    }, 800);
                }
                var isQuickShop = function($form) {
                    return $form.parent().hasClass('quick-shop-form');
                };
                var isQuickView = function() {
                    return $('.single-product-content').hasClass('product-quick-view');
                };
                var isVariationGallery = function(key) {
                    var variation_gallery_data = isQuickView() ? '' : jws_variation_gallery_data;
                    return typeof variation_gallery_data !== 'undefined' && variation_gallery_data && variation_gallery_data[key];
                };
                var replaceMainGallery = function(key, $variationForm) {
                    var variation_gallery_data = isQuickView() ? '' : jws_variation_gallery_data;
                    console.log(variation_gallery_data);
                    if (!isVariationGallery(key) || isQuickShop($variationForm)) {
                        return false;
                    }

                    var imagesData = variation_gallery_data[key];

                    if (isQuickView()) {
                        var $mainGallery = $variationForm.parents('.single-product-content').find('.woocommerce-product-gallery__wrapper');
                    } else {
                        var $mainGallery = $variationForm.parents('body').find('.woocommerce-product-gallery__wrapper');
                    }
                    $mainGallery.empty();
                    for (var index = 0; index < imagesData.length; index++) {
                        var $html = '<div class="product-image-wrap"><figure data-thumb="' + imagesData[index].data_thumb + '" class="woocommerce-product-gallery__image">';
                        if (!isQuickView()) {
                            $html += '<a href="' + imagesData[index].href + '">';
                        }
                        $html += imagesData[index].image;
                        if (!isQuickView()) {
                            $html += '</a>';
                        }
                        $html += '</figure></div>';
                        $mainGallery.append($html);
                    }
                    jwsThemeWooModule.productImagesGallery();
                    jwsThemeWooModule.quickViewCarousel();
                    $('.woocommerce-product-gallery__image').trigger('zoom.destroy');
                    if (!isQuickView()) {
                        jwsThemeWooModule.initZoom();
                    }

     
                    return true;
                }
            },
            productImagesGallery: function() {
               
                var $thumbs = $('.images .thumbnails'), // magnific photo-swipe
                    $mainOwl = $('.woocommerce-product-gallery__wrapper:not(.quick-view-gallery)'),
                    $slider_wap = $('.main-product'),
                    $mainGallery = $('.woocommerce-product-gallery__wrapper:not(.quick-view-gallery)');
                if($slider_wap.hasClass('layout_gid_two_coloms') || $slider_wap.hasClass('layout_vertical_metro') || $slider_wap.hasClass('layout_vertical')) { return false; }    
                if ($slider_wap.hasClass('image_image_vertical') && $(window).width() < 767) {
                    initMainGallery();
                }
                if (!$slider_wap.hasClass('image_image_vertical')) {
                    initMainGallery();
                    initThumbnailsMarkup();

                    if (($slider_wap.hasClass('thumbnail_position_left') || $slider_wap.hasClass('thumbnail_position_right')) && jQuery(window).width() > 1024) {
                        initThumbnailsVertical();
                    } else {
                        initThumbnailsHorizontal();
                    }

                }


                function initMainGallery() {
                    $mainGallery.trigger('destroy.owl.carousel');
                    if ($slider_wap.hasClass('image_slider_center')) {
                        $mainGallery.addClass('owl-carousel').owlCarousel({
                            center: true,
                            loop: true,
                            nav: true,
                            navText: ["<span class='nav-left'></span>", "<span class='nav-right'></span>"],
                            responsive: {
                                979: {
                                    items: 3
                                },
                                768: {
                                    items: 3
                                },
                                479: {
                                    items: 1,
                                    center: false
                                },
                                0: {
                                    items: 1,
                                    center: false
                                }
                            },
                        })
                    } else {
                        $mainGallery.addClass('owl-carousel').owlCarousel({
                            loop: false,
                            margin: 0,
                            nav: true,
                            navText: ["<span class='nav-left'></span>", "<span class='nav-right'></span>"],
                            items: 1,
                            smartSpeed: 500,
                        })
                    }
                };

                function initThumbnailsMarkup() {

                    var markup = '';
                    $mainGallery.find('.woocommerce-product-gallery__image').each(function() {
                        var image = $(this).data('thumb'),
                            alt = $(this).find('a > img').attr('alt'),
                            title = $(this).find('a > img').attr('title');
                        markup += '<div class="product-image-thumbnail"><img alt="' + alt + '" title="' + title + '" src="' + image + '" /></div>';
                    });
                    if ($thumbs.hasClass('slick-slider')) {
                        $thumbs.slick('unslick');
                    } else if ($thumbs.hasClass('owl-carousel')) {
                        $thumbs.trigger('destroy.owl.carousel');
                    }
                    $thumbs.empty();
                    $thumbs.append(markup);
                };

                function initThumbnailsHorizontal() {
                    $thumbs.addClass('owl-carousel').owlCarousel({
                        rtl: $('body').hasClass('rtl'),
                        items: 5,
                        responsive: {
                            979: {
                                items: 5
                            },
                            768: {
                                items: 4
                            },
                            479: {
                                items: 4
                            },
                            0: {
                                items: 4
                            }
                        },
                        dots: false,
                        nav: true,
                        navText: ["<span class='nav-left'></span>", "<span class='nav-right'></span>"],
                    });
                    var $thumbsOwl = $thumbs.owlCarousel();
                    $thumbs.on('click', '.owl-item', function(e) {
                        var i = $(this).index();
                        $thumbsOwl.trigger('to.owl.carousel', i);
                        $mainOwl.trigger('to.owl.carousel', i);
                    });
                    $mainOwl.on('changed.owl.carousel', function(e) {
                        var i = e.item.index;
                        $thumbsOwl.trigger('to.owl.carousel', i);
                        $thumbs.find('.active-thumb').removeClass('active-thumb');
                        $thumbs.find('.owl-item').eq(i).addClass('active-thumb');
                    });
                    $thumbs.find('.owl-item').eq(0).addClass('active-thumb');
                };

                function initThumbnailsVertical() {

                    $thumbs.slick({
                         arrows:false,
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        vertical: true,
                        verticalSwiping: true,
                        infinite: false,
                        focusOnSelect: true,
                        swipeToSlide: true,
                    });

                    $thumbs.on('click', '.product-image-thumbnail', function(e) {
                        var i = $(this).index();
                        $mainOwl.trigger('to.owl.carousel', i);
                    });
                    $mainOwl.on('changed.owl.carousel', function(e) {
                        var i = e.item.index;
                        $thumbs.slick('slickGoTo', i);
                        $thumbs.find('.active-thumb').removeClass('active-thumb');
                        $thumbs.find('.product-image-thumbnail').eq(i).addClass('active-thumb');
                    });
                    $thumbs.find('.product-image-thumbnail').eq(0).addClass('active-thumb');
                };
            },
            initZoom: function() {
                if($('.layout_gid_two_coloms , .layout_vertical_metro').length) {
                    return false;
                }
                var $mainGallery = $('.woocommerce-product-gallery__wrapper:not(.quick-view-gallery)');
                $mainGallery.find('.product-image-wrap').each(function() {
                    var $wrapper = $(this).find('.woocommerce-product-gallery__image');
                    var image = $wrapper.find('img');
                    var zoomOptions = {
                        touch: false
                    };
                    if ('ontouchstart' in window) {
                        zoomOptions.on = 'click';
                    }
                    // But only zoom if the img is larger than its container.
                    if (image.data('large_image_width') > $(this).width()) {
                        $wrapper.trigger('zoom.destroy');
                        $wrapper.zoom(zoomOptions);
                    }
                });
            },
            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Product thumbnail images & photo swipe gallery
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            productImages: function() {
                // Init photoswipe
                var currentImage,
                    $productGallery = $('.woocommerce-product-gallery'),
                    $mainImages = $('.woocommerce-product-gallery__wrapper'),
                    $thumbs = $productGallery.find('.thumbnails'),
                    currentClass = 'current-image',
                    PhotoSwipeTrigger = '.jws-show-product-gallery';


                $thumbs.addClass('thumbnails-ready');


                if ($productGallery.hasClass('image-action-popup')) {
                    PhotoSwipeTrigger += ', .woocommerce-product-gallery__image a';
                }
                $productGallery.on('click', '.woocommerce-product-gallery__image a', function(e) {
                    e.preventDefault();
                });
                $productGallery.on('click', PhotoSwipeTrigger, function(e) {
                    e.preventDefault();
                    currentImage = $(this).attr('href');
                    // build items array
                    var items = getProductItems();
                    jwsThemeWooModule.callPhotoSwipe(getCurrentGalleryIndex(e), items);
                });
                var getCurrentGalleryIndex = function(e) {
                    if ($mainImages.hasClass('owl-carousel') && !$productGallery.hasClass('image_slider_center'))
                        return $mainImages.find('.owl-item.active').index();
                    else if ($productGallery.hasClass('image_slider_center')) return $(e.currentTarget).parent().parent().parent().index();
                    else return $(e.currentTarget).parent().parent().index();
                };
                var getProductItems = function() {
                    var items = [];
                    $mainImages.find('figure a img').each(function() {
                        var src = $(this).attr('data-large_image'),
                            width = $(this).attr('data-large_image_width'),
                            height = $(this).attr('data-large_image_height'),
                            caption = $(this).data('caption');
                        items.push({
                            src: src,
                            w: width,
                            h: height,
                        });
                    });
                    return items;
                };
                /* Fix zoom for first item firstly */
                if ($productGallery.hasClass('image-action-zoom')) {
                    var zoom_target = $('.woocommerce-product-gallery__image');
                    var image_to_zoom = zoom_target.find('img');
                    // But only zoom if the img is larger than its container.
                    if (image_to_zoom.attr('width') > $('.woocommerce-product-gallery').width()) {
                        zoom_target.trigger('zoom.destroy');
                        zoom_target.zoom({
                            touch: false
                        });
                    }
                }
            },
            callPhotoSwipe: function(index, items) {
                var pswpElement = document.querySelectorAll('.pswp')[0];
                if ($('body').hasClass('rtl')) {
                    index = items.length - index - 1;
                    items = items.reverse();
                }
                // define options (if needed)
                var options = {
                    // optionName: 'option value'
                    // for example:
                    index: index, // start at first slide
                    shareButtons: [{
                        id: 'facebook',
                        label: 'Share on Facebook',
                        url: 'https://www.facebook.com/sharer/sharer.php?u={{url}}'
                    }, {
                        id: 'twitter',
                        label: 'Tweet',
                        url: 'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'
                    }, {
                        id: 'pinterest',
                        label: 'Pin it',
                        url: 'http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}'
                    }, {
                        id: 'download',
                        label: 'Download image',
                        url: '{{raw_image_url}}',
                        download: true
                    }],

                };
                // Initializes and opens PhotoSwipe
                var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
                gallery.init();
            },

            quickViewInit: function() {
                // Open popup with product info when click on Quick View button
                $(document).on('click', '.quickview-button', function(e) {
                    e.preventDefault();
                    var productId = $(this).data('product_id'),
                        loopName = $(this).data('loop-name'),
                        closeText = 'close_view',
                        loadingText = 'loading_view',
                        loop = $(this).data('loop'),
                        prev = '',
                        next = '',
                        loopBtns = $('.quick-view').find('[data-loop-name="' + loopName + '"]'),
                        btn = $(this);
                    if(!btn.find('.loader').length) {    
                        btn.append('<div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>');    
                    }
                    btn.addClass('loading');
                    if (typeof addthis == 'undefined') {
                        var s = document.createElement("script");
                        s.src = "//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-562f7aa6d38d8980";
                        document.getElementsByTagName("body")[0].appendChild(s);
                    }

                    if (typeof loopBtns[loop - 1] != 'undefined') {
                        prev = loopBtns.eq(loop - 1).addClass('quick-view-prev');
                        prev = $('<div>').append(prev.clone()).html();
                    }
                    if (typeof loopBtns[loop + 1] != 'undefined') {
                        next = loopBtns.eq(loop + 1).addClass('quick-view-next');
                        next = $('<div>').append(next.clone()).html();
                    }
                    jwsThemeWooModule.quickViewLoad(productId, btn, prev, next, closeText, loadingText);
                });
            },
            quickViewLoad: function(id, btn, prev, next, closeText, loadingText) {
                var data = {
                    id: id,
                    action: "jws_ajax_load_product_quickview",
                };
                $.ajax({
                    url: jws_script.ajax_url,
                    data: data,
                    method: 'get',
                    success: function(data) {
                        // Open directly via API
                        $.magnificPopup.open({
                            items: {
                                src: '<div id="jws-quickview" class="mfp-with-anim popup-quick-view">' + data + '</div>', // can be a HTML string, jQuery object, or CSS selector
                                type: 'inline'
                            },
                            tClose: closeText,
                            tLoading: loadingText,
                            removalDelay: 500, //delay removal by X to allow out-animation
                            callbacks: {
                                beforeOpen: function() {
                                    this.st.mainClass = 'quick-view-main';
                                },
                                open: function() {
                                    $('.popup-quick-view').find('.variations_form').each(function() {
                                        $(this).wc_variation_form().find('.variations select:eq(0)').change();
                                        if (typeof $.fn.tawcvs_variation_swatches_form !== 'undefined') {
                                            $(this).tawcvs_variation_swatches_form();
                                        }
                                    });
                                    $('.variations_form').trigger('wc_variation_form');
                                    $('body').trigger('jws-quick-view-displayed');
                                    jwsThemeWooModule.quickViewCarousel();
                                    jwsThemeWooModule.swatchesVariations();
                                    jwsThemeWooModule.share_button();

                                }
                            },
                        });
                    },
                    complete: function() {
                        btn.removeClass('loading');


                        //addthis.toolbox('.addthis_inline_share_toolbox', {} , {'media':$('.quick-view-gallery img').attr('src'),'title':$('.addthis_inline_share_toolbox').data('title'),'url': $('.addthis_inline_share_toolbox').data('url')});
                    },
                    error: function() {},
                });
            },
            quickViewCarousel: function() {
                $('#jws-quickview .woocommerce-product-gallery__wrapper').trigger('destroy.owl.carousel');
                $('#jws-quickview .woocommerce-product-gallery__wrapper').addClass('owl-carousel').owlCarousel({
                    loop: false,
                    margin: 10,
                    nav: true,
                    navText: ["<span class='nav-left'></span>", "<span class='nav-right'></span>"],
                    items: 1
                });
            },

            share_button: function() {
                var $container = $('.popup-list'),
                    $item = $container.find('.item');
                $().gallery_popup($container, $item);

                $('.addthis_button_copy').on("click", function() {
                    $('#copyClipboard').select();
                  document.execCommand("copy");
                  
                  $('#copied-success').fadeIn(800);
                  $('#copied-success').fadeOut(800);
                 
                });   
                $('.product- button').on('click', function() {
                    var parents = $(this).parents('.product-share');
                    parents.find(".addthis_inline_share_toolbox").toggleClass('opened');
                    if (parents.find(".addthis_inline_share_toolbox").hasClass('opened')) {
                        parents.find(".addthis_inline_share_toolbox a").delay(100).each(function(i) {
                            $(this).delay(50 * i).queue(function() {
                                $(this).addClass("show");
                                $(this).dequeue();
                            })
                        });
                    } else {
                        parents.find(".addthis_inline_share_toolbox a").removeClass('show');
                    }
                });
            },


            priceSlider: function() {
                // woocommerce_price_slider_params is required to continue, ensure the object exists
                if (typeof woocommerce_price_slider_params === 'undefined') {
                    return false;
                }

                if ($('body').find('.price_slider_wrapper').length <= 0) {
                    return false;
                }

                // Get markup ready for slider
                $('input#min_price, input#max_price').hide();
                $('.price_slider, .price_label').show();

                // Price slider uses jquery ui
                var min_price = $('.price_slider_amount #min_price').data('min'),
                    max_price = $('.price_slider_amount #max_price').data('max'),
                    current_min_price = parseInt(min_price, 10),
                    current_max_price = parseInt(max_price, 10);

                if ($('.price_slider_amount #min_price').val() != '') {
                    current_min_price = parseInt($('.price_slider_amount #min_price').val(), 10);
                }
                if ($('.price_slider_amount #max_price').val() != '') {
                    current_max_price = parseInt($('.price_slider_amount #max_price').val(), 10);
                }

                $(document.body).bind('price_slider_create price_slider_slide', function(event, min, max) {
                    if (woocommerce_price_slider_params.currency_pos === 'left') {

                        $('.price_slider_amount span.from').html(woocommerce_price_slider_params.currency_symbol + min);
                        $('.price_slider_amount span.to').html(woocommerce_price_slider_params.currency_symbol + max);

                    } else if (woocommerce_price_slider_params.currency_pos === 'left_space') {

                        $('.price_slider_amount span.from').html(woocommerce_price_slider_params.currency_symbol + ' ' + min);
                        $('.price_slider_amount span.to').html(woocommerce_price_slider_params.currency_symbol + ' ' + max);

                    } else if (woocommerce_price_slider_params.currency_pos === 'right') {

                        $('.price_slider_amount span.from').html(min + woocommerce_price_slider_params.currency_symbol);
                        $('.price_slider_amount span.to').html(max + woocommerce_price_slider_params.currency_symbol);

                    } else if (woocommerce_price_slider_params.currency_pos === 'right_space') {

                        $('.price_slider_amount span.from').html(min + ' ' + woocommerce_price_slider_params.currency_symbol);
                        $('.price_slider_amount span.to').html(max + ' ' + woocommerce_price_slider_params.currency_symbol);

                    }

                    $(document.body).trigger('price_slider_updated', [min, max]);
                });
                if (typeof $.fn.slider !== 'undefined') {
                    $('.price_slider').slider({
                        range: true,
                        animate: true,
                        min: min_price,
                        max: max_price,
                        values: [current_min_price, current_max_price],
                        create: function() {

                            $('.price_slider_amount #min_price').val(current_min_price);
                            $('.price_slider_amount #max_price').val(current_max_price);

                            $(document.body).trigger('price_slider_create', [current_min_price, current_max_price]);
                        },
                        slide: function(event, ui) {

                            $('input#min_price').val(ui.values[0]);
                            $('input#max_price').val(ui.values[1]);

                            $(document.body).trigger('price_slider_slide', [ui.values[0], ui.values[1]]);
                        },
                        change: function(event, ui) {

                            $(document.body).trigger('price_slider_change', [ui.values[0], ui.values[1]]);
                        }
                    });
                }
            },

            // Filter Ajax
            filterAjax: function() {
                var autoload = true;
                $(window).on('resize scroll', function() {
                    if ($('.auto_load_more').length &&  $('.auto_load_more').isInViewport() && autoload) {
                        autoload = false;
                        $('.auto_load_more').trigger( "click" );
                    }
                });


                $(document.body).on('click', '.woocommerce-pagination .jws-products-load-more', function(e) {
                    e.preventDefault();
       
                    $('.jws-products-load-more').append('<div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>');
                    $('.jws-products-load-more , .spinner').addClass('loading');
                    var url = $(this).attr('href');

                    if ('?' == url.slice(-1)) {
                        url = url.slice(0, -1);
                    }

                    url = url.replace(/%2C/g, ',');


                    $.get(url, function(res) {
                        $('.products-wrap').append($(res).find('.products-wrap').html());


                        setTimeout(function() {
                            $('.load-template').each(function() {
                                $(this).parent().html(JSON.parse($(this).html()));
                            });
                        }, 500);
                        
                        
                        autoload = true;



                        $('.woocommerce-pagination').html($(res).find('.woocommerce-pagination').html());
                    }, 'html');


                });

                $(document).on('click', '.show_filter_shop', function() {
                    $('.jws-filter-modal').fadeIn().addClass('open');
                });
                $(document).on('click', '.modal-close , .modal-overlay', function() {
                    $('.jws-filter-modal').fadeOut().removeClass('open');
                });
                
              
                
                
                

                $(document.body).on('submit', '.woocommerce-ordering ', function(e) {
                    e.preventDefault();
                });


                $(document.body).on('click', 'form.woocommerce-ordering div.orderby ul span', function(e) {
                    e.preventDefault();
                    if ($(this).hasClass('current')) {
                        return;
                    }
                    $('.orderby-current').html($(this).text());
                    var form = $('form.woocommerce-ordering');
                    var data = $(this).attr('data-orderby');
                    $('form.woocommerce-ordering div.orderby ul span').removeClass('current');
                    $(this).addClass('current');
                    form.find('select.orderby').val(data).trigger('change');
                });


                $(document.body).on('change', '#pgs_product_pp , .orderby', function(e) {

                    var url = $(this).parents('form').attr('action') + '?' + $(this).parents('form').serialize();

                    $(document.body).trigger('crypteck_catelog_filter_ajax', [url, $(this)]);

                });


                $(document.body).on('click', '.price_slider_wrapper button', function(event, ui) {
                    event.preventDefault();
                    var form = $(this).closest('form').get(0),
                        $form = $(form),
                        url = $form.attr('action') + '?' + $form.serialize();

                    $(document.body).trigger('crypteck_catelog_filter_ajax', [url, $(this)]);
                });


                $(document.body).on('submit', '.woocommerce-widget-layered-nav-dropdown', function(e) {
                    e.preventDefault();
                    var url = $(this).attr('action') + '?' + $(this).serialize();
                    $(document.body).trigger('crypteck_catelog_filter_ajax', [url, $(this)]);
                });


                $(document.body).on('click', '.widget_layered_nav_filters a', function(e) {
                    e.preventDefault();
                    var url = $(this).attr('href');
                    $(document.body).trigger('crypteck_catelog_filter_ajax', [url, $(this)]);
                });

                $(document.body).on('click', '.view-icon-list a', function(e) {
                    e.preventDefault();
                    $('.view-icon-list a').removeClass('sel-active')
                    $(this).addClass('sel-active');
                    var url = $(this).attr('href');
                    $(document.body).trigger('crypteck_catelog_filter_ajax', [url, $(this)]);
                });


                $(document.body).on('click', ' #remove-filter-actived', function(e) {
                    e.preventDefault();
                    var url = $(this).attr('href');
                    $(document.body).trigger('crypteck_catelog_filter_ajax', [url, $(this)]);
                });

                $(document.body).on('click', '.woocommerce-pagination .page-numbers a', function(e) {
                    e.preventDefault();

                    var url = $(this).attr('href');
                    $(document.body).trigger('crypteck_catelog_filter_ajax', [url, $(this)]);
                });

                $(document.body).find('#jws-shop-product-cats').on('click', '.cat-link', function(e) {
                    e.preventDefault();
                    var url = $(this).attr('href');
                    $(document.body).trigger('crypteck_catelog_filter_ajax', [url, $(this)]);
                });

                $(document.body).find('#jws-categories-filter').on('click', 'a', function(e) {
                    e.preventDefault();
                    $(this).addClass('selected');
                    var url = $(this).attr('href');
                    $(document.body).trigger('crypteck_catelog_filter_ajax', [url, $(this)]);

                });


                $(document.body).find(' .siderbar-inner , .filter-shop-nav').on('click', 'a', function(e) {
                    var $widget = $(this).closest('ul');

                    if ($widget.hasClass('widget_product_tag_cloud') ||
                        $widget.hasClass('product-categories') ||
                        $widget.hasClass('wc-layered-nav') ||
                        $widget.hasClass('product-sort-by') ||
                        $widget.hasClass('product_reset') ||
                        $widget.hasClass('woocommerce-widget-layered-nav')) {
                        e.preventDefault();
                        $(this).closest('.product-categories').find('li').removeClass('current-cat');
                        $(this).closest('li').addClass('chosen');
                        var url = $(this).attr('href');
                        $(document.body).trigger('crypteck_catelog_filter_ajax', [url, $(this)]);
                    }

                    if ($widget.hasClass('widget_product_tag_cloud')) {
                        $(this).addClass('selected');
                    }

                    if ($widget.hasClass('product-sort-by')) {
                        $(this).addClass('active');
                    }
                });

                $(document.body).on('crypteck_catelog_filter_ajax', function(e, url, element) {

                    $('html,body').animate({
                        scrollTop: $(".shop-container").offset().top - 60
                    }, 600);
                    
                    $('.shop-topbar').slideUp();

                    $('.is-sticky').addClass('no-active-sticky').removeClass('active-sticky');


                    $('.product-container').addClass('crypteck-animated-products');

                    $('.products').addClass('loading');

                    var skel = 'grid';
                    var view = $('.view-icon-list .sel-active');

                    if (view.hasClass('view-product-4')) {
                        $('.content-area .product-item').attr('class', 'product-item product col-xl-3 col-lg-3 col-12');
                    } else if (view.hasClass('view-product-3')) {
                        $('.content-area .product-item').attr('class', 'product-item product col-xl-4 col-lg-4 col-12');
                    } else if (view.hasClass('view-product-2')) {
                        $('.content-area .product-item').attr('class', 'product-item product col-xl-6 col-lg-6 col-12');
                    } else if (view.hasClass('view-product-1')) {
                        $('.content-area .product-item').attr('class', 'product-item product col-12');
                        skel = 'list';
                    }

                    if (skel == 'grid') {
                        $('.content-area .product-item').html('<div class="skel-mask"></div>');
                    } else {
                        $('.content-area .product-item').html('<div class="skel-mask skel-list"></div>');
                    }



                    if ('?' == url.slice(-1)) {
                        url = url.slice(0, -1);
                    }

                    url = url.replace(/%2C/g, ',');

                    window.history.pushState(null, "", url);
                    $(window).bind("popstate", function() {
                        window.location = location.href
                    });
                    $(document.body).trigger('crypteck_ajax_filter_before_send_request');

                    $.get(url, function(res) {

                        $('.products-wrap').replaceWith($(res).find('.products-wrap'));
                        $('.title-wrapper').html($(res).find('.title-wrapper').html());
                        $('.jws-breadcrumbs').html($(res).find('.jws-breadcrumbs').html());
                        $('.woocommerce-result-count').html($(res).find('.woocommerce-result-count').html());
                        $('.shop-top-filters-right').html($(res).find('.shop-top-filters-right').html());
                        $('.shop-filter-actived').html($(res).find('.shop-filter-actived').html());
                        $('.siderbar-inner').html($(res).find('.siderbar-inner').html());
                        $('.woocommerce-pagination').html($(res).find('.woocommerce-pagination').html());

                        jwsThemeWooModule.priceSlider();
                        $('.load-template').each(function() {
                            $(this).parent().html(JSON.parse($(this).html()));
                        });

                        $(document.body).trigger('crypteck_ajax_filter_request_success', [res, url]);

                    }, 'html');


                });

                $(document.body).on('crypteck_ajax_filter_before_send_request', function() {
                    if ($('#jws-shop-toolbar').hasClass('on-mobile')) {
                        $('#jws-toggle-cats-filter').removeClass('active');
                        $('.jws-filter').removeClass('active');
                    }
                });


                window.onpageshow = function(event) {
                    if (event.persisted) {
                        window.location.reload();
                    }
                };

            }


        } // End Class
    }())
})(jQuery);
jQuery(document).ready(function() {
    jwsThemeWooModule.init();
});
jQuery(window).load(function() {

});