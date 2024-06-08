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

      let products = [];
      if (JSON.parse(localStorage.getItem("products")) == null) {
        localStorage.setItem("products", JSON.stringify(products));
      } else {
        products = JSON.parse(localStorage.getItem("products"));
      }

      let wishlist = [];
      if (JSON.parse(localStorage.getItem("wishlist")) == null) {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      } else {
        wishlist = JSON.parse(localStorage.getItem("wishlist"));
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
      
          getBasketProducts(products);
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

      function getBasketProducts(products) {
        let data = ""
        products.forEach(product => {
          data+= `
          <tr>
          <td class="cart-img">
              <a href=""><img src="${product.image}" alt=""></a>
          </td>
          <td class="cart-title">
              <a href="">${product.name}</a>
          </td>
          <td class="cart-price">
              <span>$${product.price}</span>
          </td>
          <td class="cart-quantity">
              <div class="quantity-input">
                  <span class="minus" data-id="${product.id}"><img src="./assets/icons/minus.svg" alt=""></span>
                  <input type="text" value="${product.count}" disabled>
                  <span class="plus" data-id="${product.id}"><img src="./assets/icons/plus.svg" alt=""></span>
              </div>
          </td>
          <td class="cart-action">
              <a href="" class="remove-prod" data-id="${product.id}"><i class="fa-solid fa-xmark"></i> Remove</a>
          </td>
      </tr>`
        }); 
    
        $("#cart-area tbody").html(data);
        $(".remove-prod").click(function(e){
          e.preventDefault();
          products = products.filter(m => m.id != $(this).attr("data-id"))
          localStorage.setItem("products",JSON.stringify(products));
          $(this).parent().parent().remove();
      
          getBasketCount(products);
          getTotalPrice(products);
          checkBasket(products);
          getBasketProductsForMiniCart(products);

          toastr["error"](`${$(this).parent().parent().children().first().next().children().first().html()} removed from cart`);
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

        $(".cart-clear button").click(function(e){
          products = [];
          localStorage.setItem("products", JSON.stringify(products));

          getBasketCount(products);
          getTotalPrice(products);
          checkBasket(products);
          getBasketProductsForMiniCart(products);
        })



        $(".plus").click(function(){
          let existProduct = products.find(m => m.id == parseInt($(this).attr("data-id")))
          existProduct.count++;
          $(this).prev().val(existProduct.count);
          getBasketCount(products);
          getTotalPrice(products);
          checkBasket(products);
          getBasketProductsForMiniCart(products);

          localStorage.setItem("products",JSON.stringify(products))

          toastr["success"](`1 ${$(this).parent().parent().prev().prev().children().first().html()} added to cart`);
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


        $(".minus").click(function(){
          let existProduct = products.find(m => m.id == parseInt($(this).attr("data-id")))
          if(existProduct.count > 1){
            existProduct.count--;
            $(this).next().val(existProduct.count);
            getBasketCount(products);
            getTotalPrice(products);
            checkBasket(products);
            getBasketProductsForMiniCart(products);
  
            localStorage.setItem("products",JSON.stringify(products))

            toastr["info"](`The number of products was reduced for ${$(this).parent().parent().prev().prev().children().first().html()}`);
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
          }else{
            return;
          }
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

      function checkBasket(products){
        if(products.length == 0){
          $("#cart-area .cart-main").addClass("d-none");
          $("#cart-area .cart-empty-alert").removeClass("d-none");

          $(".mini-cart .cart-mini-body").addClass("d-none");
          $(".mini-cart .cart-mini-empty").removeClass("d-none");
        }else{
          $("#cart-area .cart-main").removeClass("d-none");
          $("#cart-area .cart-empty-alert").addClass("d-none");

          $(".mini-cart .cart-mini-body").removeClass("d-none");
          $(".mini-cart .cart-mini-empty").addClass("d-none");
        }
      }


      checkBasket(products)
      getWishlistCount(wishlist);
      getTotalPrice(products);
      getBasketCount(products);
      getBasketProducts(products);
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
      
      
      
      
      
})