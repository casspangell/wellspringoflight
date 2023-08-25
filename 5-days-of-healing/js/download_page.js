var timer_obj;
var m_first_y = 0;
var device_name="desktop"

$(function () {
     $("body").on("click",".rce-tab-nav", function(){
        if($(this).hasClass('active')) return;
        var id = $(this).attr('id');
        $(this).closest('.rce-tab-wrap').find('.active').removeClass('active');
        $(this).addClass('active');
        $(`#${id}_tab`).addClass('active');
    })
     
     
    $("iframe").unwrap('.rce-iframe-wrap');
    $("body").on("click",".rce-mega-menu-icon", function(){
        var mega_menu_t = $(this).closest('.rce-section').outerHeight();
        $(this).closest('.rce-menu-row').toggleClass('open-mega-menu');
        if($(this).closest('.rce-menu-row').hasClass('open-mega-menu')){
            $(this).html(`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.9893 14.9907L7.99859 8.00001M1.00792 1.00934L7.99992 8.00001M7.99992 8.00001L14.9893 1.00934M7.99859 8.00001L1.00792 14.9907" stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `)
            $(this).closest('.rce-menu-row').find('.rce-menu-wrap').css('top', `${mega_menu_t}px`);
        } else {
            $(this).html(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                <path d="M3 12H21M3 6H21M3 18H21" stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>            </svg>
            `)
        }

    })
    
    $(".rce-iframe-content").remove();
     $("body").on('click','.rce-product-sort-wrap', function(e){
        if($(e.target).closest('.rce-product-sort-content').length == 0){
            if($(this).closest('.rce-product-sort-wrap').find('.rce-product-sort-content').css('display') == "none"){
                $(this).closest('.rce-product-sort-wrap').find('.rce-product-sort-content').show();
            }
        }
    })

    $(".rce-phone-field input").attr({
        name: "phone",
        type: "text"
    });

    $("body").on('click', function(e){
        if($(e.target).closest('.rce-product-sort-title').length == 0 && $(e.target).closest('.rce-product-sort-icon').length == 0){
            $(".rce-product-sort-content").hide();
        }
    });

    $('body').on('click','.rce-product-sort-item', function(){
        var sort_type = $(this).data('type');
        if(sort_type == "name"){
            sort_direct = $(this).closest('.rce-section').find('.rce-product-wrap').data('name_sort');
            if(sort_direct == undefined || sort_direct == "name_desc"){
                sort_type = "name_asc";
            } else {
                sort_type = "name_desc";
            }
            $(this).closest('.rce-section').find('.rce-product-wrap').data('name_sort',sort_type);
            $(this).closest('.rce-section').find('.rce-product-wrap').attr('data-name_sort',sort_type);
        }

        if(sort_type == "price"){
            sort_direct = $(this).closest('.rce-section').find('.rce-product-wrap').data('price_sort');
            if(sort_direct == undefined || sort_direct == "price_desc"){
                sort_type = "price_asc";
            } else {
                sort_type = "price_desc";
            }
            $(this).closest('.rce-section').find('.rce-product-wrap').data('price_sort',sort_type);
            $(this).closest('.rce-section').find('.rce-product-wrap').attr('data-price_sort',sort_type);
        }

        for(i = 0; i< $(this).closest('.rce-section').find('.rce-product').length; i++){
            first_ele = $(this).closest('.rce-section').find('.rce-product').eq(i);

            for(j = i + 1; j< $(this).closest('.rce-section').find('.rce-product').length; j++){
                second_ele = $(this).closest('.rce-section').find('.rce-product').eq(j);
                if(sort_type == "name_asc"){
                    if(first_ele.find('.rce-product-name').text().trim() > second_ele.find('.rce-product-name').text().trim()){
                        $(second_ele).insertBefore(first_ele);
                        first_ele = second_ele;
                    }
                }

                if(sort_type == "name_desc"){
                    if(first_ele.find('.rce-product-name').text().trim() < second_ele.find('.rce-product-name').text().trim()){
                        $(second_ele).insertBefore(first_ele);
                        first_ele = second_ele;
                    }
                }

                if(sort_type == "price_asc"){
                    if(getNumberVal(first_ele.find('.rce-product-price').text().trim()) > getNumberVal(second_ele.find('.rce-product-price').text().trim())){
                        $(second_ele).insertBefore(first_ele);
                        first_ele = second_ele;
                    }
                }

                if(sort_type == "price_desc"){
                    if(getNumberVal(first_ele.find('.rce-product-price').text().trim()) < getNumberVal(second_ele.find('.rce-product-price').text().trim())){
                        $(second_ele).insertBefore(first_ele);
                        first_ele = second_ele;
                    }
                }
            }
        }
    })


    $("body").on('click','.rce-category', function(){
        $product_wrap = $(this).closest('.rce-section').find('.rce-product-wrap');
        var category = $(this).text().trim();
        $(this).closest('.rce-category-wrap').find('.active').removeClass('active');
        $(this).addClass('active');
        $product_wrap.find('.rce-product').each(function(){
            var product_category = $(this).find('.rce-product-category').text().trim();
            if(product_category == category){
                if($(this).hasClass('rce-grid')){
                    $(this).css('display','grid');
                } else {
                    $(this).css('display','flex');
                }
            }
            else {
                $(this).hide();
            }
        })
    })

    $('body').on('click','.rce-product-filter-wrap', function(){
        $(this).closest('.rce-section').find('.rce-product').each(function(){
            if($(this).hasClass('rce-grid')){
                $(this).css('display','grid');
            } else{
                $(this).css('display','flex');
            }
        })
        $(this).closest('.rce-section').find('.rce-category.active').removeClass('active');

    })

    $("body").on('click','.rce-checkout-close-btn', function(){
        $('.rce-checkout-wrap').hide();
    })

    $("body").on("click","[data-purchases_url]", function(){
        url = $(this).data("purchases_url");
        url = url.match(/^http[s]?:\/\//) ? url : 'https://' + url;
        window.open(url, "_blank");
    })
    var page_id = $("#page_id").val();
    if(localStorage.getItem('cart_infos' + page_id) != null && localStorage.getItem('cart_infos' + page_id) != ""){
        cart_infos = localStorage.getItem('cart_infos' + page_id);
        cart_infos = cart_infos.split('^');
        var ss = 0;
        for(i = 0; i< cart_infos.length; i++){
            $product = $(`#${cart_infos[i]}`);
            if($product.find('.rce-count-wrap').length > 0){
                product_count = $product.find('.rce-count-wrap .rce-count-input').text().trim();
                product_count = getNumberVal(product_count);
            } else {
                product_count = 1;
            }
            ss += product_count;

        }
        $('.rce-cart-btn-wrap').show();
        $('.rce-cart-item-count').html(ss);
    }
    $("body").on("click",`[data-type="cart"]`, function(){
        cart_infos = localStorage.getItem('cart_infos' + page_id);

        if(cart_infos == null || cart_infos == "")
            cart_infos = [];
        else
            cart_infos = cart_infos.split('^');

        var product_id = $(this).closest('.rce-product').attr('id');
        cart_infos.push(product_id)
        var ss = 0;
        for(i = 0; i< cart_infos.length; i++){
            $product = $(`#${cart_infos[i]}`);
            if($product.find('.rce-count-wrap').length > 0){
                product_count = $product.find('.rce-count-wrap .rce-count-input').text().trim();
                product_count = getNumberVal(product_count);
            } else {
                product_count = 1;
            }
            ss += product_count;

        }
        cart_infos = cart_infos.join('^');
        localStorage.setItem('cart_infos' + page_id, cart_infos);

        $('.rce-cart-btn-wrap').show();
        $('.rce-cart-item-count').html(ss);
    });

    $("body").on("click",`.rce-cart-btn-wrap`, function(){
        var cart_infos = localStorage.getItem('cart_infos' + page_id);

        cart_infos = cart_infos.split('^');
        var product_ids = [];
        var product_counts = [];
        for(i = 0; i< cart_infos.length; i++){
            if(product_counts[cart_infos[i]] == null){
                product_counts[cart_infos[i]] = 1;
                product_ids.push(cart_infos[i]);
            } else {
                product_counts[cart_infos[i]] ++;
            }
        }
        $('.rce-cart-product-window').html('');
        var total_price = 0;
        product_ids.forEach((element) => {
            $product = $(`#${element}`);

            var product_count = product_counts[element];
            if($product.find('.rce-count-wrap').length > 0){
                product_count = ($product.find('.rce-count-wrap .rce-count-input').text().trim()) * product_count;
            }
            product_price = getNumberVal($product.find('.rce-product-price').text().trim());


            var product_str = `
            <div class="rce-cart-product-wrap">
                <div class="rce-cart-product-img" style="background-image:url('${$product.find('.rce-product-image img').attr('src')}')">
                </div>
                <div class="rce-grid" style="grid-template-columns:auto 160px 160px; grid-gap: 10px; padding:10px; ">
                    <div class="rce-vertical-box-start" style="grid-gap:10px;">
                        <div class="rce-cart-product-name">${$product.find('.rce-product-name').text().trim()}</div>`;
                        if($product.find('.rce-product-desc').length > 0){
                        product_str += `
                        <div class="rce-cart-product-desc">
                            ${$product.find('.rce-product-desc').text().trim()}
                        </div>`;
                        }
            product_str += `<div class="rce-grid rce-grid-2 rce-cart-product-meta" style="width:auto;">`;
                        if($product.find('.rce-product-color-item.active').length > 0){

                            product_str += `<div class="rce-flex-start rce-cart-product-meta" style="grid-gap:10px;">
                                Color :
                                <div class="rce-cart-product-color" style="background-color:${$product.find('.rce-product-color-item.active').css('background-color')};"></div>
                            </div>`
                        }
                        if($product.find('.rce-product-size').length > 0){
                             product_str += `<div class="rce-flex-start rce-cart-product-meta" style="grid-gap:10px;">
                                Size : <b>${$product.find('.rce-product-size .rce-drop-btn-text').text().trim()}</b>
                            </div>`
                        }
            product_str += `
                        </div>
                    </div>
                    <div class="rce-vertical-box-top rce-cart-product-quantity" style="align-items:flex-end;">
                        $${ convertPrice(product_price)} × ${product_count}
                    </div>
                    <div class="rce-vertical-box-start-top rce-cart-product-price" style="align-items:flex-end;">
                        $${ convertPrice(product_price * product_count)}
                    </div>
                </div>
            </div>`;
            $('.rce-cart-product-window').append(product_str);
            total_price += product_count * product_price;
        })
        $('.rce-cart-product-total').html(`$${convertPrice(total_price)}`)

        $('.rce-checkout-wrap').show();
    });

    $("body").on("click","#empty_cart", function(){
        localStorage.setItem('cart_infos' + page_id, '');
        $('.rce-checkout-wrap').hide();
        $('.rce-cart-btn-wrap').hide();

    })
    $("body").on("click",`[data-type="inbuilt"]`, function(){
        var product_id = $(this).closest('.rce-product').attr('id');
        $product = $(this).closest('.rce-product');
        var product_info = {};
        if($product.find('.rce-product-name').length > 0){
            product_info.product_name = $product.find('.rce-product-name').text().trim();
        }
        if($product.find('.rce-product-price').length > 0){
            product_info.product_price = getNumberVal($product.find('.rce-product-price').text().trim());
        }

        if($product.find('.rce-product-color-item.active').length > 0){
            product_info.color = $product.find('.rce-product-color-item.active').css('background-color');
        }

        if($product.find('.rce-product-size').length > 0){
            product_info.size = $product.find('.rce-product-size .rce-drop-btn-text').text().trim();
        }

        if($product.find('.rce-product-image').length > 0){
            product_info.product_img = $product.find('.rce-product-image img').first().attr('src');
        }

        product_info.count = 1;
        if($product.find('.rce-count-wrap').length > 0){
            product_info.count = $product.find('.rce-count-wrap .rce-count-input').text().trim();
            product_info.count = getNumberVal(product_info.count);
        }
        if(product_info.count * 1 == 0) product_info.count = 1;

        prodcut_infos = [];
        prodcut_infos.push(product_info);
        prodcut_infos = JSON.stringify(prodcut_infos);
        $("#product_infos").val(prodcut_infos);
        $("#cart_check").val('no');
        $("#checkout_form")[0].submit();
    });
    $("body").on("click",'#cart_pay_btn', function(){
        var cart_infos = localStorage.getItem('cart_infos' + page_id);

        cart_infos = cart_infos.split('^');
        var product_ids = [];
        var product_counts = [];
        for(i = 0; i< cart_infos.length; i++){
            if(product_counts[cart_infos[i]] == null){
                product_counts[cart_infos[i]] = 1;
                product_ids.push(cart_infos[i]);
            } else {
                product_counts[cart_infos[i]] ++;
            }
        }

        var prodcut_infos = [];
        product_ids.forEach((element) => {

            $product = $(`#${element}`);

            var product_info = {};
            if($product.find('.rce-product-name').length > 0){
                product_info.product_name = $product.find('.rce-product-name').text().trim();
            }
            if($product.find('.rce-product-price').length > 0){
                product_info.product_price = getNumberVal($product.find('.rce-product-price').text().trim());
            }

            if($product.find('.rce-product-color-item.active').length > 0){
                product_info.color = $product.find('.rce-product-color-item.active').css('background-color');
            }

            if($product.find('.rce-product-size').length > 0){
                product_info.size = $product.find('.rce-product-size .rce-drop-btn-text').text().trim();
            }

            if($product.find('.rce-product-image').length > 0){
                product_info.product_img = $product.find('.rce-product-image img').first().attr('src');
            }

            product_info.count = product_counts[element];

            if($product.find('.rce-count-wrap').length > 0){
                product_info.count = ($product.find('.rce-count-wrap .rce-count-input').text().trim()) * product_counts[element];
                product_info.count = getNumberVal(product_info.count);
            }
            if(product_info.count * 1 == 0) product_info.count = 1;


            prodcut_infos.push(product_info);
        })

        prodcut_infos = JSON.stringify(prodcut_infos);
        $("#product_infos").val(prodcut_infos);
        $("#cart_check").val('yes');

        $("#checkout_form")[0].submit();


    })
    $("body").on("click",".rce-product-image", function(){
        if($(this).closest('.rce-product-image-wrap').length > 0){
            $(this).closest('.rce-product-image-wrap').find('.active').removeClass('active');
            $(this).closest('.rce-product-image-wrap').find('.rce-image-inner').css('border','0px');
            $(this).addClass('active');
            $(this).find('.rce-image-inner').css('border',$(this).closest('.rce-product-image-wrap').data('border'));
            $(this).closest('.rce-product').find('.rce-product-image-show .rce-image-inner').css('background-image',`url('${$(this).find('img').attr('src')}')`);
        }
    })
    $("body").on("click",'.rce-count-btn', function(){
        var val = $(this).closest('.rce-count-wrap').find('.rce-count-input').text().trim();
        var step = $(this).data('value') * 1;
        value = val*1 + step * 1;
        if(value < 0) value = 0;
        $(this).closest('.rce-count-wrap').find('.rce-count-input').html(value);

    })
    $("body").on('click','.rce-drop-btn', function(){
        if($(this).closest('.rce-dropdown-menu-wrap').find('.rce-dropdown-menu-content').css('display') == "none"){
            $(this).closest('.rce-dropdown-menu-wrap').find('.rce-dropdown-menu-content').show();
        }
    })
    $("body").on('click', function(e){
        if($(e.target).closest('.rce-drop-btn').length == 0){
            $(".rce-dropdown-menu-content").hide();
        }
    });
    $("body").on("click",".rce-dropdown-menu-item", function(){
        $(this).closest('.rce-dropdown-menu-wrap').find('.rce-drop-btn-text').html($(this).text().trim());
    })
    $("body").on("click",".rce-product-color-item", function(){
        $(this).closest('.rce-product-color-wrap').find('.active').removeClass('active');
        $(this).addClass('active');

    })


     $("body").on("click",".rce-checkbox-wrap", function(e){
        if($(e.target).closest(`[contenteditable="true"]`).length > 0) return;
        $(this).find('.rce-checkbox').toggleClass('checked');
    })

     $("body").on("click",".rce-radio-wrap", function(e){
        if($(e.target).closest(`[contenteditable="true"]`).length > 0) return;
        $(this).closest('form').find('.rce-radio-checked').removeClass('rce-radio-checked');
        $(this).find(".rce-radio").addClass('rce-radio-checked')
        $(this).closest('form').find('.rce-radio-tab-active').removeClass('rce-radio-tab-active');
        $(this).closest('.rce-radio-tab').addClass('rce-radio-tab-active');

    })

     $('body').on("click", '.rce-signup-nav-item', function(){
        $(this).closest('.rce-form-wrap').find('.rce-signup-nav-item-active').removeClass('rce-signup-nav-item-active');
        $(this).addClass('rce-signup-nav-item-active');
        $(this).closest('.rce-form-wrap').find('.rce-signup-nav-content-active').removeClass('rce-signup-nav-content-active');
        $(`#` + $(this).data('id')).addClass('rce-signup-nav-content-active');
    })

    $(".rce-accordion-wrap").each(function(){
        $(this).closest(".rce-accordion-wrap").find(".rce-accordion-item-active").removeClass("rce-accordion-item-active");
    })
    $("body").on("click",".rce-accordion-title", function(){
        $(this).closest(".rce-accordion-wrap").find(".rce-accordion-item-active").removeClass("rce-accordion-item-active");
        $(this).closest('.rce-accordion-item').addClass('rce-accordion-item-active');
    })

    // $("body").on("click","[data-link]", function(){
    //     url = $(this).data("link");
    //     if(url == "" || url == undefined) return;
    //     url = url.match(/^http[s]?:\/\//) ? url : 'https://' + url;
    //     window.open(url, "_blank");
    // });

    $("body").on("click","[data-link]", function(){
        if($(this).data("link-type") == "anchor"){
            anchor_id = $(this).data("link");
            if(anchor_id == undefined || anchor_id == "") return;
            // window.location.hash = '#' + anchor_id;
            $([document.documentElement, document.body]).animate({
                scrollTop: $("#" + anchor_id).offset().top
            }, 400);
            return;
        }


        url = $(this).data("link");

        if (url == "" || url == undefined) return;
        if(url.toLowerCase().indexOf("tel") >= 0 || url.toLowerCase().indexOf("mailto") >= 0){
            url = url;
            openUrl(url, "_blank");
        } else {
            if(url.indexOf("./") == 0 || url.indexOf("/") == 0){

            } else {
                url = url.match(/^http[s]?:\/\//) ? url : 'https://' + url;
            }
        }
        var target = "_blank";
        if($(this).data('open_new_tab') == "yes")
            target = "_blank";
        else
            target = "_self";

        openUrl(url, target);
    });

    $('body').on("click",".rce-close-btn", function(){
        $(this).closest('.rce-box-ele').hide();
    })
    $("#rce_timer_bar").removeAttr("data-date");
    $(".rce-countdown-item").find(".rce-countdown-value").html("00");
    $(".rce-video-wrap").remove();
    execCounterdown();
    $(".cloned").remove();
    $(".owl-nav").remove();
    $(".owl-dots").remove();
    $(".rce-owl-carousel-1").owlCarousel({
        loop: true,
        nav: true,
        items: 1
    });

    $(".rc-modal").hide();
    $(".rc-modal-wrap").remove();

    $('[contenteditable="true"]').removeAttr("contenteditable");
    $(".rce-disable-timer").remove();

    $(".rce-video-wrap").remove();
    $("body").on("mousemove",function(e){
        if($("#rce_exit_popup_modal").data("status") != "yes") return;
        if(Math.abs(e.pageY -  $(window).scrollTop()) <= 10){
            if(e.pageY < m_first_y && $("#rce_exit_popup_modal").css("display") == "none" && $(".rc-modal-wrap").length == 0){
                $("body").append('<div class="rc-modal-wrap"></div>');
                $("#rce_exit_popup_modal").fadeIn();
            }
        }
        m_first_y = e.pageY;
    })

    $("body").on("click","#rce_exit_popup_modal button", function(){
        $(".rc-modal-close").click();
        $("#rce_exit_popup_modal").remove();
    })

    $(".rce-direct-signup-btn").each(function(){
        if($(this).closest('#signup_modal').length > 0){
            $(this).closest('#signup_modal').find("form").attr("id","signup_form");
            return;
        }
        if($(this).data('action_type') == "ar"){
            $(this).closest("form").attr("action",asset_url + "ar/arAction");
            $(this).closest("form").attr("method","get");
        } else {
            $(this).closest("form").attr("action",$(this).data("action_url"));
            var form_method = $(this).data("method");
            if(form_method == undefined) form_method = "get";
            $(this).closest("form").attr("method", form_method);
        }
    })
    $("body").on("click", ".rce-signup-btn", function () {
        // if($(this).hasClass("pass-quiz-modal")) return;
        if($(this).data("type") == undefined){
            $(this).data("type",'popup_form');
            $(this).attr("data-type",'popup_form');
        }
        if($(this).data("type") == "direct_form"){

        } else if($(this).data("type") == "popup_form"){
            if($(this).hasClass("rce-popup-signup-btn")){
                $("body").append('<div class="rc-modal-wrap"></div>');
                id = $(this).attr("id");
                $("#" + id + "_popup_modal").fadeIn();
                if($("#" + id + "_popup_modal").length == 0){
                    $("#signup_modal").fadeIn();
                }
            } else if($(this).hasClass("rce-direct-signup-btn") == false){
                $("body").append('<div class="rc-modal-wrap"></div>');
                $("#signup_modal").fadeIn();
            }

            if($(this).data('action_type') == "ar"){
                $("#signup_modal").find("form").attr("action",asset_url + "ar/arAction");
                $("#signup_modal").find("form").attr("method","get");
            } else {
                $("#signup_modal").find("form").attr("action",$(this).data("action_url"));

                var form_method = $(this).data("method");
                if(form_method == undefined) form_method = "get";
                $(this).closest("form").attr("method", form_method);
                $("#signup_modal").find("form").attr("method",form_method);
            }

            var hh = $("#signup_modal").height() + 120;
            $("#signup_modal").css("top",`calc(50VH - ${hh/2}px)`);

        } else {
            url = $(this).data("link");
            if($(this).data('link-type') == "anchor") return;
            if(url == undefined) return;
            url = url.match(/^http[s]?:\/\//) ? url : 'https://' + url;
            window.open(url, "_blank");
        }
    })

    $("body").on("click", ".rc-modal-close, .rc-modal-close-btn", function () {
        $("#rce_exit_popup_modal").remove();
        $(".rc-modal").fadeOut();
        $(".rc-modal-wrap").remove();
    })
    $("body").on("click",".rce-direct-signup-btn", function(){
        if($(this).closest('form').find('input[name="page_id"]').length == 0){
            $(this).closest('form').append(`<input type="hidden" name="page_id" value="${$("#page_id").val()}">`);
        }

        var url = $(this).closest("form").attr("action");
        if(url == undefined) {
            url = "";
        }
        url = url.match(/^http[s]?:\/\//) ? url : 'https://' + url;
        $(this).closest("form").attr("action", url);
        var submit_status = "";
        $(this).closest("form").find(`[required]`).each(function(){
            if($(this).val() == ""){
                $(this).addClass('required-error-box');
                submit_status = "no";
            }
        })
        if(submit_status == "no") return;
        var form_obj = $(this).closest("form");

        $.ajax({
             url: asset_url + "ar/saveLead",
             type: "get",
             data: {
                page_id: $('#page_id').val(),
                'user_name' : form_obj.find(`[name="user_name"]`).val(),
                'email' : form_obj.find(`[name="email"]`).val(),
             },
             dataType:'json',
             success: function(res){
                $.toast({
                    heading: 'Subscribed',
                    text: 'Subscribed Successfully',
                    showHideTransition: 'slide',
                    icon: 'success',
                    position: 'bottom-right'
                })
                $("#signup_modal").fadeOut();
                $(".rc-modal-wrap").remove();
                if(asset_url + "ar/arAction" != form_obj.attr('action')){
                    if(form_obj.attr('action') == "https://") {
                        return;
                    }
                    form_obj.submit();
                }
             },
             complete: function(res){

             },
             error: function(res)
             {
                $.toast({
                    heading: 'Subscribed',
                    text: 'Subscribed Successfully',
                    showHideTransition: 'slide',
                    icon: 'success',
                    position: 'bottom-right'
                })
                $("#signup_modal").fadeOut();
                $(".rc-modal-wrap").remove();
                if(asset_url + "ar/arAction" != form_obj.attr('action')){
                    if(form_obj.attr('action') == "https://") {
                        return;
                    }
                    form_obj.submit();
                }
             }
        });

    })
    $('body').on('focus','.required-error-box', function(){
        $(this).removeClass('required-error-box');
    })
    refreshTestimonial();
    $(window).resize(function(){
        refreshTestimonial();
        $(".rce-menu-row.open-mega-menu").removeClass("open-mega-menu");
        $(".rce-mega-menu-icon").html(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                <path d="M3 12H21M3 6H21M3 18H21" stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>            </svg>`);
            
        if($(window).width() < 720){
            $("body").addClass("mobile");
            $("body").removeClass("tablet");
            $("body").removeClass("desktop");
        }
        if($(window).width() >= 720 && $(window).width() <= 1024){
            $("body").addClass("tablet");
            $("body").removeClass("mobile");
            $("body").removeClass("desktop");
        }
        if($(window).width() > 1024){
            $("body").removeClass("tablet");
            $("body").removeClass("mobile");
            $("body").addClass("desktop");
        }
    })
    if($(window).width() < 720){
        $("body").addClass("mobile");
        $("body").removeClass("tablet");
        $("body").removeClass("desktop");
    }
    if($(window).width() >= 720 && $(window).width() <= 1024){
        $("body").addClass("tablet");
        $("body").removeClass("mobile");
        $("body").removeClass("desktop");
    }
    if($(window).width() > 1024){
        $("body").removeClass("tablet");
        $("body").removeClass("mobile");
        $("body").addClass("desktop");
    }
})

function refreshTestimonial(ele_id = ""){
    if(ele_id == ""){
        $(".rce-testimonial").each(function(){

            ele_id = $(this).attr("id");
            $("#" + ele_id).find(".slick-cloned").remove();
            if($("#" + ele_id).find(".rce-testimonial-item").closest('.slick-slide').length > 0)
            $("#" + ele_id).find(".rce-testimonial-item").unwrap("div");

            $("#" + ele_id).find(".rce-testimonial-item").unwrap(".slick-slide");
            $("#" + ele_id).find(".rce-testimonial-item").unwrap(".slick-track");
            $("#" + ele_id).find(".rce-testimonial-item").unwrap(".slick-list");
            $("#" + ele_id).find(".slick-arrow").remove();
            $("#" + ele_id).find(".slick-dots").remove();
            $("#" + ele_id + "_inner").attr("class","rce-testimonial-1-inner");

            $(this).find(".rce-testimonial-item").each(function(){
                if($(this).find(".rce-element").length == 0) $(this).remove();
            })
            if($(this).data("type") == "type-1"){
                if($(window).width() <= 760){
                    $("#" + ele_id + "_inner").slick({
                      dots: false,
                      infinite: true,
                      slidesToShow: 1,
                      slidesToScroll: 1
                    });
                 } else if($(window).width() <= 1114){
                    $("#" + ele_id + "_inner").slick({
                      dots: false,
                      infinite: true,
                      slidesToShow: 3,
                      slidesToScroll: 1
                    });
                 } else {
                    $("#" + ele_id + "_inner").slick({
                      dots: false,
                      infinite: true,
                      slidesToShow: 4,
                      slidesToScroll: 1
                    });
                 }
             }

             if($(this).data("type") == "type-2"){
                if($(window).width() <= 760){
                     $("#" + ele_id + "_inner").slick({
                      dots: true,
                      infinite: true,
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      arrows:false
                    });
                 } else if($(window).width() <= 1114){
                    $("#" + ele_id + "_inner").slick({
                      dots: true,
                      infinite: true,
                      slidesToShow: 2,
                      slidesToScroll: 1,
                      arrows:false
                    });
                 } else {
                   $("#" + ele_id + "_inner").slick({
                      dots: true,
                      infinite: true,
                      slidesToShow: 2,
                      slidesToScroll: 1,
                      arrows:false
                    });
                 }
             }

             if($("#" + ele_id).data("type") == "type-3"){
                if($(window).width() <= 760){
                    $("#" + ele_id + "_inner").slick({
                      dots: true,
                      infinite: true,
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      arrows:false
                    });
                 } else if($(window).width() <= 1114){
                    $("#" + ele_id + "_inner").slick({
                      dots: true,
                      infinite: true,
                      slidesToShow: 2,
                      slidesToScroll: 1,
                      arrows:false
                    });
                 } else {
                    $("#" + ele_id + "_inner").slick({
                      dots: true,
                      infinite: true,
                      slidesToShow: 2,
                      slidesToScroll: 1,
                      centerMode: true,
                      variableWidth: true,
                      arrows:false
                    });
                 }
            }

            if($(this).data("type") == "type-4"){
                if($(window).width() <= 760){
                     $("#" + ele_id + "_inner").slick({
                      dots: true,
                      infinite: true,
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      arrows:false
                    });
                 } else if($(window).width() <= 1114){
                    $("#" + ele_id + "_inner").slick({
                      dots: true,
                      infinite: true,
                      slidesToShow: 2,
                      slidesToScroll: 1,
                      arrows:false
                    });
                 } else {
                   $("#" + ele_id + "_inner").slick({
                      dots: true,
                      infinite: true,
                      slidesToShow: 3,
                      slidesToScroll: 1,
                      arrows:false
                    });
                 }
             }

        })
    } else {
        $("#" + ele_id).find(".slick-cloned").remove();
        $("#" + ele_id).find(".rce-testimonial-item").unwrap("div");
        $("#" + ele_id).find(".rce-testimonial-item").unwrap(".slick-slide");
        $("#" + ele_id).find(".rce-testimonial-item").unwrap(".slick-track");
        $("#" + ele_id).find(".rce-testimonial-item").unwrap(".slick-list");
        $("#" + ele_id).find(".slick-arrow").remove();
        $("#" + ele_id).find(".slick-dots").remove();
        $("#" + ele_id + "_inner").attr("class","rce-testimonial-1-inner");
        if(device_name == "mobile"){
            $("#" + ele_id + "_inner").slick({
                dots: true,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1
            });
        } else {
            $("#" + ele_id + "_inner").slick({
                dots: true,
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1
            });
        }
    }
}

function execCounterdown(){
    clearInterval(timer_obj);
    timer_obj = setInterval(function(){
        $('.rce-timer-bar').each(function(){

            var timer_type = $(this).data("timer_type");
            if(timer_type == undefined) timer_type = "countdown";
            if(timer_type == "countdown"){

                end_date = $(this).data("end_date");
                date = end_date;
                // var dateFuture = stringToDate(date,"dd/MM/yyyy","/");
                var dateFuture = new Date(date);
                var dateNow = new Date();

                var seconds = Math.floor((dateFuture - (dateNow))/1000);
                var minutes = Math.floor(seconds/60);
                var hours = Math.floor(minutes/60);
                var days = Math.floor(hours/24);

                hours = hours-(days*24);
                minutes = minutes-(days*24*60)-(hours*60);
                seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
                if(days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0){
                    redirect_url = $(this).data("redirect_url");
                    if(redirect_url != undefined && redirect_url != ""){
                        document.location.replace(redirect_url);
                    }
                }
            } else {
                var date = $(this).data("date");
                if(date == "" || date == undefined){
                    date = new Date().toString();
                    $(this).data("date",date);
                    $(this).attr("data-date",date);
                }
                dd = $(this).data("days");
                hh = $(this).data("hours");
                mm = $(this).data("minutes");
                ss = $(this).data("seconds");
                if(dd == undefined) dd = 0;
                if(hh == undefined) hh = 0;
                if(mm == undefined) mm = 0;
                if(ss == undefined) ss = 0;

                a_dd = $(this).data("after_day");
                a_hh = $(this).data("after_hour");

                if(a_dd == undefined) a_dd = 0;
                if(a_hh == undefined) a_hh = 0;

                var dateNow = new Date();
                var dateFuture = new Date(date);

                ss1 = dateFuture.getTime();
                ss2 = ss1*1  +  (a_dd*3600*24 + dd*3600*24 + a_hh * 3600 + hh * 3600 + mm * 60 + ss*1)*1000;
                ss1 += (dd*3600*24 + hh * 3600 + mm * 60 + ss*1)*1000;

                m_date = new Date(ss2);
                if(m_date < dateNow){
                    $(this).data("date",new Date(ss2).toString());
                    $(this).attr("data-date",new Date(ss2).toString());
                    date = $(this).data("date");
                    dateFuture = new Date(date);
                }

                var seconds = Math.floor((dateFuture - dateNow)/1000 + (dd*3600*24 + hh * 3600 + mm * 60 + ss*1));
                var minutes = Math.floor(seconds/60);
                var hours = Math.floor(minutes/60);
                var days = Math.floor(hours/24);

                hours = hours-(days*24);
                minutes = minutes-(days*24*60)-(hours*60);
                seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
            }

            if(days<0 || hours<0 || minutes<0 || seconds<0 || isNaN(seconds)){
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
            }
            if(days < 10) days = "0"+days;
            if(hours < 10) hours = "0"+hours;
            if(minutes < 10) minutes = "0"+minutes;
            if(seconds < 10) seconds = "0"+seconds;

            $(this).find(".rce-countdown-day").html(days);
            $(this).find(".rce-countdown-hour").html(hours);
            $(this).find(".rce-countdown-minute").html(minutes);
            $(this).find(".rce-countdown-second").html(seconds);
        });
    }, 1000);
}


function getNumberVal(val){
    val = val.replace(/[^0-9\.]/g,'');
    if(val.split('.').length>2)
    val =val.replace(/\.+$/,"");
    return val * 1;
}

function convertPrice(val){
    val = val + " ";
    val = val.replace(/[^0-9\.]/g,'');
    if(val.split('.').length>2)
    val =val.replace(/\.+$/,"");
    val = new Intl.NumberFormat().format(val);
    if(val.indexOf('.') === -1) val = val + ".00";
    return val;
}

/**
 * @param {"desktop"|"tablet"|"mobile"} type - current viewing device viewport
 */
function setDeviceName(type=device_name) {
    device_name=type
}

function getLinkType($el) {
    var linkType = $el.data("link-type")
    var target = "_self";

    if (linkType === "internal") target = "_self";
    if (linkType === "external") target = "_blank";

    return target;
}

function openUrl(url, target='_blank') {
    let link = document.createElement('a');
    link.href = url;
    link.target = target;
    link.click();
    link = null;
}

function setBodyClassName() {
    if($(window).width() < 720){
        $("body").addClass("mobile");
        $("body").removeClass("tablet");
        setDeviceName("mobile")
    }
    if($(window).width() >= 720 && $(window).width() <= 1024){
        $("body").addClass("tablet");
        $("body").removeClass("mobile");
        setDeviceName("tablet")
    }
    if($(window).width() > 1024){
        $("body").removeClass("tablet");
        $("body").removeClass("mobile");
        setDeviceName("desktop")
    }
}
