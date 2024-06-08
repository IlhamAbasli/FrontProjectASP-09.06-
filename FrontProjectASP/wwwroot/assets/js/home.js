$(function () {
  $(".right-side li .content").click(function () {
    $(this).next().toggleClass("menu-down");
    $(this).parent().siblings().find(".menu").removeClass("menu-down");
  });

  $(".search-area .selector").click(function () {
    $(this).children().first().toggleClass("rotate");
    $(this).next().toggleClass("menu-down");
    $(this).parent().siblings().find(".menu").removeClass("menu-down");
  });

  $(".all-categories").click(function () {
    $(".categories").toggleClass("d-none");
  });

  //#region back-to-top-button
  var btn = $("#button");

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.addClass("show");
    } else {
      btn.removeClass("show");
    }
  });

  btn.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "300");
  });

  //#endregion



    //#region header-sticky
    var headerSticky = $("#header-sticky");

    $(window).scroll(function () {
      if ($(window).scrollTop() > 200) {
        headerSticky.addClass("show");
      } else {
        headerSticky.removeClass("show");
      }
    });
    //#endregion

  //#region slider-area

  $("#slider-area .controllers .left").click(function (event) {
    event.preventDefault();
    let activeSlider = $(".active-slider");
    let activeSliderImage = $(".active-slider-image");
    let dotActive = $(".active-dot");

    if (activeSlider.prev().length == 0 && activeSliderImage.prev().length == 0 && dotActive.prev().length == 0) {
      return;
    } else {
      activeSlider.removeClass("active-slider");
      activeSliderImage.removeClass("active-slider-image");
      dotActive.removeClass("active-dot");

      activeSlider.prev().addClass("active-slider");
      activeSliderImage.prev().addClass("active-slider-image");
      dotActive.prev().addClass("active-dot");
    }
  });

  $("#slider-area .controllers .right").click(function (event) {
    event.preventDefault();
    let activeSlider = $(".active-slider");
    let activeSliderImage = $(".active-slider-image");
    let dotActive = $(".active-dot");

    if (
      activeSlider.next().length == 0 &&
      activeSliderImage.next().length == 0 &&
      dotActive.next().length == 0
    ) {
      return;
    } else {
      activeSlider.removeClass("active-slider");
      activeSliderImage.removeClass("active-slider-image");
      dotActive.removeClass("active-dot");

      activeSlider.next().addClass("active-slider");
      activeSliderImage.next().addClass("active-slider-image");
      dotActive.next().addClass("active-dot");
    }
  });

  $("#slider-area .pagination .first-slide-dot").click(function () {
    $(this).addClass("active-dot");
    $(this).siblings().removeClass("active-dot");
    $(".first-slide").addClass("active-slider");
    $(".first-slide").siblings().removeClass("active-slider");
    $(".first-slider-image").addClass("active-slider-image");
    $(".first-slider-image").siblings().removeClass("active-slider-image");
  });

  $("#slider-area .pagination .second-slide-dot").click(function () {
    $(this).addClass("active-dot");
    $(this).siblings().removeClass("active-dot");
    $(".second-slide").addClass("active-slider");
    $(".second-slide").siblings().removeClass("active-slider");
    $(".second-slider-image").addClass("active-slider-image");
    $(".second-slider-image").siblings().removeClass("active-slider-image");
  });

  $("#slider-area .pagination .third-slide-dot").click(function () {
    $(this).addClass("active-dot");
    $(this).siblings().removeClass("active-dot");
    $(".third-slide").addClass("active-slider");
    $(".third-slide").siblings().removeClass("active-slider");
    $(".third-slider-image").addClass("active-slider-image");
    $(".third-slider-image").siblings().removeClass("active-slider-image");
  });

  //#endregion

  //#region sidebar
  $(".bars").click(function (e) {
    e.preventDefault();
    $(".right-side-menu").addClass("opened");
    $(".right-side-menu").removeClass("closed");
  });

  $(".close").click(function (e) {
    e.preventDefault();
    $(".right-side-menu").removeClass("opened");
    $(".right-side-menu").addClass("closed");
  });

  //#endregion

  //#region product-tabmenu

  $("#products .tab-categories .new-products").click(function (e) {
    e.preventDefault();
    $(this).addClass("active");
    $("#products .tab-categories .featured-products").removeClass("active");
    $("#products .tab-categories .top-products").removeClass("active");
    $("#products .new-products-list").removeClass("d-none");
    $("#products .featured-products-list").addClass("d-none");
    $("#products .top-products-list").addClass("d-none");
  });

  $("#products .tab-categories .featured-products").click(function (e) {
    e.preventDefault();
    $(this).addClass("active");
    $("#products .tab-categories .new-products").removeClass("active");
    $("#products .tab-categories .top-products").removeClass("active");
    $("#products .new-products-list").addClass("d-none");
    $("#products .featured-products-list").removeClass("d-none");
    $("#products .top-products-list").addClass("d-none");
  });

  $("#products .tab-categories .top-products").click(function (e) {
    e.preventDefault();
    $(this).addClass("active");
    $("#products .tab-categories .featured-products").removeClass("active");
    $("#products .tab-categories .new-products").removeClass("active");
    $("#products .new-products-list").addClass("d-none");
    $("#products .featured-products-list").addClass("d-none");
    $("#products .top-products-list").removeClass("d-none");
  });

  //#endregion

  //#region add-to-cart&wishlist

  let products = [];
  let wishlist = [];
  let product = {};

  if (JSON.parse(localStorage.getItem("products")) == null) {
    localStorage.setItem("products", JSON.stringify(products));
  } else {
    products = JSON.parse(localStorage.getItem("products"));
  }

  if (JSON.parse(localStorage.getItem("wishlist")) == null) {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  } else {
    wishlist = JSON.parse(localStorage.getItem("wishlist"));
  }

  if (JSON.parse(localStorage.getItem("product")) == null) {
    localStorage.setItem("product", JSON.stringify(product));
  } else {
    product = JSON.parse(localStorage.getItem("product"));
  }


  function checkBasket(products){
    if(products.length == 0){
      $(".mini-cart .cart-mini-body").addClass("d-none");
      $(".mini-cart .cart-mini-empty").removeClass("d-none");
    }else{
      $(".mini-cart .cart-mini-body").removeClass("d-none");
      $(".mini-cart .cart-mini-empty").addClass("d-none");
    }
  }


  function getBasketCount(products) {
    let count = 0;
    if (products.length != 0) {
      for (const product of products) {
        count += product.count;
      }
    }

    $("#header-mid .actions .cart-count").html(count);
    $("#header-sticky .actions .cart-count").html(count);
  }

  function getWishlistCount(products) {
    let count = 0;
    if (wishlist.length != 0) {
      for (const product of products) {
        count++;
      }
    }

    $("#header-mid .actions .wishlist-count").html(count);
    $("#header-sticky .actions .wishlist-count").html(count);
  }

  function checkWishlist(wishlist) {
    let products = $(".product");
    for (const product of products) {
      for (const item of wishlist) {
        if (product.getAttribute("data-id") == item.id) {
          product.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.lastElementChild.firstElementChild.setAttribute(
            "class",
            "add-to-wishlist active-wishlist"
          );
        }
      }
    }
  }

  function getBasketProducts(products) {
    let data = ""
    products.forEach(product => {
      data+= `                        
      <div class="col-12">
      <div class="mini-product">
          <div class="row">
              <div class="col-4">
                  <div class="image">
                      <a href="">
                          <img src="${product.image}" alt="">
                      </a>
                  </div>
              </div>
              <div class="col-7">
                  <div class="product-details">
                      <h1>${product.name}</h1>
                      <div class="price-count">
                          <span class="cart-mini-price">$${product.price * product.count}</span>
                          <span class="cart-mini-count">x${product.count}</span>
                      </div>
                  </div>
              </div>
              <div class="col-1">
                  <div class="remove-mark">
                      <img src="./assets/icons/xmark.svg" alt="" class="remove-icon" data-id="${product.id}">
                  </div>
              </div>
          </div>
      </div>
      </div> `
    }); 

    $(".cart-mini .cart-item .mini-products").html(data);
    $(".mini-product .remove-icon").click(function(){
      products = products.filter(m => m.id != $(this).attr("data-id"))
      $(this).parent().parent().parent().parent().remove();
  
      getBasketCount(products);
      getTotalPrice(products);
      checkBasket(products);
      getBasketProducts(products);


      localStorage.setItem("products",JSON.stringify(products));

      toastr["error"](`${$(this).parent().parent().prev().children().first().children().first().html()} removed from cart`);
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-center",
        preventDuplicates: false,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
    })

  }

  function getTotalPrice(products){
    let sum = 0
    products.forEach(product => {
      sum+= product.price * product.count
      Math.round(sum);
    });

    $(".cart-mini .total-price .total").children().first().html(sum);
  }

  checkBasket(products);
  getTotalPrice(products);
  checkWishlist(wishlist);
  getBasketCount(products);
  getWishlistCount(wishlist);
  getBasketProducts(products);

  $(".add-to-cart").click(function (e) {
    e.preventDefault();
    let productId = $(this).parent().parent().parent().parent().parent().attr("data-id");
    let productImage = $(this).parent().parent().parent().prev().children().first().attr("src");
    let productName = $(this).parent().parent().parent().parent().next().children().first().next().html();
    let productPrice = $(this).parent().parent().parent().parent().next().children().last().children().last().children().first().html();

    if (
      $(this).parent().parent().parent().parent().parent().hasClass("out-of-stock")
    ) {
      toastr["error"](`${productName} out of stock`);
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-center",
        preventDuplicates: false,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      return;
    }

    let existProduct = products.find((m) => m.id == parseInt(productId));

    if (existProduct != undefined) {
      existProduct.count++;
    } else {
      products.push({
        id: parseInt(productId),
        image: productImage,
        name: productName,
        price: parseFloat(productPrice),
        count: 1,
      });
    }

    localStorage.setItem("products", JSON.stringify(products));

    toastr["success"](`${productName} added to cart`);
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: "toast-top-center",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };

    getBasketCount(products);
    getBasketProducts(products);
    getTotalPrice(products);
    checkBasket(products);
  });

  $(".add-to-wishlist").click(function (e) {
    e.preventDefault();
    let productId = $(this).parent().parent().parent().parent().parent().attr("data-id");
    let productImage = $(this).parent().parent().parent().prev().children().first().attr("src");
    let productName = $(this).parent().parent().parent().parent().next().children().first().next().html();
    let productPrice = $(this).parent().parent().parent().parent().next().children().last().children().last().children().first().html();

    let existProduct = wishlist.find((m) => m.id == parseInt(productId));

    if (existProduct != undefined) {
      toastr["error"](`${productName} remove to wishlist`);
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-center",
        preventDuplicates: false,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      return;
    } else {
      wishlist.push({
        id: parseInt(productId),
        image: productImage,
        name: productName,
        price: parseFloat(productPrice),
        count: 1,
      });
      $(this).addClass("active-wishlist");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    toastr["success"](`${productName} added to wishlist`);
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: "toast-top-center",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };

    getWishlistCount(wishlist);
  });


  $(".add-to-cart-preview").click(function(e){
    e.preventDefault();
    let productId = $(this).attr("data-id");
    let productImage = $(this).parent().parent().parent().parent().parent().prev().children().first().find(".active-preview-image").children().first().attr("src");
    let productName = $(this).parent().parent().parent().parent().find(".name").children().last().html();
    let productPrice = $(this).parent().parent().parent().parent().find(".price").find(".new-price").children().first().html();
    let productCount = $(this).parent().parent().children().first().find(".product-count-input").val();
    if (
      $(this).parent().parent().parent().parent().find(".reviews").children().first().html() == "out-of-stock"
    ) {
      toastr["error"](`${productName} out of stock`);
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-center",
        preventDuplicates: false,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      return;
    }

    let existProduct = products.find((m) => m.id == parseInt(productId));

    if (existProduct != undefined) {
      existProduct.count++;
    } else {
      products.push({
        id: parseInt(productId),
        image: productImage,
        name: productName,
        price: parseFloat(productPrice),
        count: parseInt(productCount),
      });
    }

    localStorage.setItem("products", JSON.stringify(products));

    toastr["success"](`${productCount} ${productName} added to cart`);
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: "toast-top-center",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };

    getBasketCount(products);
    getBasketProducts(products);
    getTotalPrice(products);
    checkBasket(products);
  })



  $(".count-input .plus").click(function(){
    let inputValue = $(this).prev().val()
    inputValue = parseInt(inputValue) + 1
    $(this).prev().val(inputValue)
  });

  $(".count-input .minus").click(function(){
    let inputValue = $(this).next().val()
    if(inputValue > 1){
      inputValue = parseInt(inputValue) - 1
      $(this).next().val(inputValue)
    }
  });




  //#endregion

  //#region tablet-slider

  $("#tablet-collection .pagination .first-slide-dot").click(function () {
    $(this).addClass("active-dot");
    $(this).siblings().removeClass("active-dot");
    $(".first-slide").addClass("active-slider");
    $(".first-slide").siblings().removeClass("active-slider");
    $(".first-slider-image").addClass("active-slider-image");
    $(".first-slider-image").siblings().removeClass("active-slider-image");
  });

  $("#tablet-collection .pagination .second-slide-dot").click(function () {
    $(this).addClass("active-dot");
    $(this).siblings().removeClass("active-dot");
    $(".second-slide").addClass("active-slider");
    $(".second-slide").siblings().removeClass("active-slider");
    $(".second-slider-image").addClass("active-slider-image");
    $(".second-slider-image").siblings().removeClass("active-slider-image");
  });

  $("#tablet-collection .pagination .third-slide-dot").click(function () {
    $(this).addClass("active-dot");
    $(this).siblings().removeClass("active-dot");
    $(".third-slide").addClass("active-slider");
    $(".third-slide").siblings().removeClass("active-slider");
    $(".third-slider-image").addClass("active-slider-image");
    $(".third-slider-image").siblings().removeClass("active-slider-image");
  });

  //#endregion


  //#region cart-sidebar 

  $(".cart").click(function (e) {
    e.preventDefault();
    $(".mini-cart").addClass("opened-cart");
    $(".mini-cart").removeClass("closed-cart");
  });

  $(".close-mini-cart").click(function (e) {
    e.preventDefault();
    $(".mini-cart").removeClass("opened-cart");
    $(".mini-cart").addClass("closed-cart");
  });

  $(".overlay").click(function(){
    $(".mini-cart").removeClass("opened-cart");
    $(".mini-cart").addClass("closed-cart");
  })




  //#endregion



  //#region quick-view-tabmenu

  $(".first").click(function(){
    $(this).addClass("active-image")
    $(this).parent().parent().parent().next().find(".first-prev").addClass("active-preview-image")

    $(this).parent().parent().find(".second").removeClass("active-image");
    $(this).parent().parent().parent().next().find(".second-prev").removeClass("active-preview-image")

    $(this).parent().parent().find(".third").removeClass("active-image");
    $(this).parent().parent().parent().next().find(".third-prev").removeClass("active-preview-image")

    $(this).parent().parent().find(".fourth").removeClass("active-image");
    $(this).parent().parent().parent().next().find(".fourth-prev").removeClass("active-preview-image")
  })

  $(".second").click(function(){
    $(this).addClass("active-image")
    $(this).parent().parent().parent().next().find(".second-prev").addClass("active-preview-image")

    $(this).parent().parent().find(".first").removeClass("active-image");
    $(this).parent().parent().parent().next().find(".first-prev").removeClass("active-preview-image")

    $(this).parent().parent().find(".third").removeClass("active-image");
    $(this).parent().parent().parent().next().find(".third-prev").removeClass("active-preview-image")

    $(this).parent().parent().find(".fourth").removeClass("active-image");
    $(this).parent().parent().parent().next().find(".fourth-prev").removeClass("active-preview-image")
  })

  $(".third").click(function(){
    $(this).addClass("active-image")
    $(this).parent().parent().parent().next().find(".third-prev").addClass("active-preview-image")

    $(this).parent().parent().find(".second").removeClass("active-image");
    $(this).parent().parent().parent().next().find(".second-prev").removeClass("active-preview-image")

    $(this).parent().parent().find(".first").removeClass("active-image");
    $(this).parent().parent().parent().next().find(".first-prev").removeClass("active-preview-image")

    $(this).parent().parent().find(".fourth").removeClass("active-image");
    $(this).parent().parent().parent().next().find(".fourth-prev").removeClass("active-preview-image")
    
  })

  $(".fourth").click(function(){
    $(this).addClass("active-image")
    $(this).parent().parent().parent().next().find(".fourth-prev").addClass("active-preview-image")

    $(this).parent().parent().find(".second").removeClass("active-image");
    $(this).parent().parent().parent().next().find(".second-prev").removeClass("active-preview-image")

    $(this).parent().parent().find(".third").removeClass("active-image");
    $(this).parent().parent().parent().next().find(".third-prev").removeClass("active-preview-image")

    $(this).parent().parent().find(".first").removeClass("active-image");
    $(this).parent().parent().parent().next().find(".first-prev").removeClass("active-preview-image")
  })













  //#endregion




  //#region product-detail

  $(".product .image a").click(function(){
    let productCategory = $(this).parent().next().find(".card-product-category").html();
    let productName = $(this).parent().next().find(".product-name").html();
    let oldPrice = $(this).parent().next().find(".old-price").html();
    let newPrice = $(this).parent().next().find(".new-price").children().first().html();
    let productStock = $(this).parent().next().next().find(".reviews").children().first().html();
    let productImage1 = $(this).parent().next().next().find(".first").children().first().attr("src");
    let productImage2 = $(this).parent().next().next().find(".second").children().first().attr("src");
    let productImage3 = $(this).parent().next().next().find(".third").children().first().attr("src");
    let productImage4 = $(this).parent().next().next().find(".fourth").children().first().attr("src");


    product.category = productCategory;
    product.name = productName;
    product.oldPrice = oldPrice;
    product.newPrice = newPrice;
    product.stock = productStock;

    product.image1 = productImage1;
    product.image2 = productImage2;
    product.image3 = productImage3;
    product.image4 = productImage4;

    localStorage.setItem("product",JSON.stringify(product));
  })




  //#endregion





  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});
