$(function(){
    $(".right-side li .content").click(function () {
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

  
      //#region cart

      let wishlist = [];
      if (JSON.parse(localStorage.getItem("wishlist")) == null) {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      } else {
        wishlist = JSON.parse(localStorage.getItem("wishlist"));
      }

      let products = [];
      if (JSON.parse(localStorage.getItem("products")) == null) {
        localStorage.setItem("products", JSON.stringify(products));
      } else {
        products = JSON.parse(localStorage.getItem("products"));
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


      function checkWishlist(wishlist){
        if(wishlist.length == 0){
          $("#wishlist-area .wishlist").addClass("d-none");
          $("#wishlist-area .wishlist-empty-alert").removeClass("d-none");
        }else{
          $("#wishlist-area .wishlist").removeClass("d-none");
          $("#wishlist-area .wishlist-empty-alert").addClass("d-none"); 
        }
      }


      function getBasketProductsForMiniCart(products) {
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
          localStorage.setItem("products",JSON.stringify(products));
          $(this).parent().parent().parent().parent().remove();
      
          getBasketCount(products);
          getTotalPrice(products);
          checkBasket(products);

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

      function getBasketProducts(wishlist) {
        let data = ""
        wishlist.forEach(product => {
          data+= `
          <tr>
          <td class="cart-img">
              <a href=""><img src="${product.image}" alt=""></a>
          </td>
          <td class="cart-title">
              <a href="">${product.name}</a>
          </td>
          <td class="cart-price">
              <span>$<span>${product.price}</span></span>
          </td>
          <td class="add-to-cart">    
              <a href="" data-id="${product.id}">Add To Cart</a>
          </td>
          <td class="cart-action">
              <a href="" class="remove-prod" data-id="${product.id}"><i class="fa-solid fa-xmark"></i> Remove</a>
          </td>
      </tr>`
        }); 
    
        $("#wishlist-area tbody").html(data);

        $(".add-to-cart a").click(function(e){
          e.preventDefault();
          let productId = $(this).attr("data-id");
          let productImage = $(this).parent().parent().find(".cart-img").children().first().children().first().attr("src");
          let productName = $(this).parent().prev().prev().children().first().html()
          let productPrice = $(this).parent().prev().children().first().children().first().html()
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
          getTotalPrice(products);
          checkBasket(products);
          getBasketProductsForMiniCart(products);
        })

        $(".remove-prod").click(function(e){
          e.preventDefault();
          wishlist = wishlist.filter(m => m.id != $(this).attr("data-id"))
          localStorage.setItem("wishlist",JSON.stringify(wishlist));
          $(this).parent().parent().remove();
      
          checkWishlist(wishlist);
          getWishlistCount(wishlist);
          getBasketProducts(wishlist);

          toastr["error"](`${$(this).parent().parent().children().first().next().children().first().html()} removed from wishlist`);
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

      function getBasketCount(products) {
        let count = 0;
        if (products.length != 0) {
          for (const product of products) {
            count += product.count;
          }
        }
    
        $("#header-sticky .actions .cart-count").html(count);
      }


      function getTotalPrice(products){
        let sum = 0
        products.forEach(product => {
          sum += product.price * product.count
        });
    
        $(".cart-mini .total-price .total").children().first().html(Math.round(sum));
        $(".subtotal-area .subtotal").children().first().html(Math.round(sum));
      }

      function getWishlistCount(wishlist) {
        let count = 0;
        if (wishlist.length != 0) {
          for (const product of wishlist) {
            count++;
          }
        }
    
        $("#header-sticky .actions .wishlist-count").html(count);
      }



      checkWishlist(wishlist);
      checkBasket(products);
      getWishlistCount(wishlist);
      getTotalPrice(products);
      getBasketCount(products);
      getBasketProducts(wishlist);
      getBasketProductsForMiniCart(products);



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
      
      
      //#region price-filter




      //#endregion
      
      
})