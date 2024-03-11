// Wish list card Desktop
let wishArr = [1, 2];
let cardWish1 = document.querySelectorAll(".card-wish-row");
const cardWish = [...cardWish1];
const wishlistArr = localStorage.getItem("wishlist")
  ? JSON.parse(localStorage.getItem("wishlist"))
  : [];
let html = ``;
let htmlLaptop = ``;
if(wishlistArr.length){
  
  wishlistArr.map((item) => {
    const {
      price,
      sum_total,
      first_sum,
      number_status,
      number,
      product_id,
      wishlists,
      show_number,
      vendor,
      discount_percent,
      flat_discount,
    } = item;
    var final_price = price;
    var init = "";
    var offer_show = "";
    if (parseInt(flat_discount) > 0) {
      init = "₹" + price;
      final_price = parseInt(price) - parseInt(flat_discount);
      offer_show = flat_discount + " off";
    } else if (discount_percent && parseInt(discount_percent) > 0) {
      init = "₹" + price;
      var numVal1 = parseInt(price);
      var numVal2 = parseInt(discount_percent) / 100;
      final_price = numVal1 - numVal1 * numVal2;
      offer_show = discount_percent + "% off";
    }
    let rating = "";
    for (let index = 0; index < Math.ceil(vendor.rating); index++) {
      rating += ' <i class="fa-solid fa-star"></i>';
    }
  
    let dov = document.createElement("div");
    dov.classList.add("col-6", "col-md-6", "col-18", "pull-up");
    if (flat_discount || discount_percent) {
      html += `<div id=${product_id} class="color-on" style="margin-top:15px;margin-bottom:8px;height:153px;background:white;border-radius: 20px;box-shadow: 0px 0px 19px #dfdfdfdd, 0px 0px 15px #dfdfdfdd;">
        <div style="position: relative;">
          <div style="font-weight:500;font-size:1.6rem;margin:auto auto auto 1.7rem;padding-top:1.3rem;">${show_number}</div>
          
          <div style="font-size:0.9rem;margin:auto auto auto 2.3rem;">Total-${sum_total} | Sum-${first_sum}</div>
  
          <div style="font-size: 1.1rem;
          position: absolute;
          font-weight: 500;
          top: 54%;
          right: 36px;z-index:5;">₹${final_price}</div>
  
          <div style="font-size: 1.3rem;
          position: absolute;
          font-weight: 500;
          top: 76%;
          right: 32px;" class="final-price"><s>${init}</s></div>
  
          <div style="font-size: 1.5rem;
          position: absolute;
          font-weight: 500;
          top: 12%;
          right: 20px;">
          <i id='${product_id}' onclick="addToWishlist(${product_id}, 'remove')" changeColor('${product_id}')" class="bookmark-icon fa-duotone fa-circle-heart ${
        localStorage.getItem("user") && wishlists && `active`
      }"></i>
          </div>
  
  
          <div class="offer-animation" style="font-size: 1.5rem;
          position: absolute;
          background: transparent;
          font-weight: 500;
          top: 9%;
          font-size:1rem;
          display:flex;
          right: 62px;">
          <img style="width:28px;" alt="" src="./Assets/Gift.svg"><div style="line-height: 14px;background: linear-gradient( to bottom, red, #ff6b08, #ff6b08, #ff6b08);font-weight: 900;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;"><span>${
          offer_show.split("off")[0]
        }<br>OFF</span></div>
          </div>
  
        </div>
        <div style="width:90%;margin: 1.3rem auto auto auto;display:flex;justify-content: space-between;">
          <div style="display:inline-block">
            <div class="font-size-card"  style="display:inline-block;text-align:center;color:grey;">
              <i style="font-size:1.6rem;" class="any-state fa-sharp fa-solid fa-location-dot"></i><br>Any State
            </div>
            <div class="font-size-card"  style="display:inline-block;text-align:center;color:grey;margin-left:5px;">
            <i style="font-size:1.6rem;" class="any-network fa-duotone fa-signal"></i><br> Any Network
            </div>
            <div class="font-size-card"  style="display:inline-block;text-align:center;color:grey;margin-left:5px;">
              <i style="font-size:1.6rem;" class="any-sim fa-thin fa-sim-card"></i><br> Any Pre/Post
            </div>
          </div>
          <div style="display:flex;align-items: center;">
          <button style="width:30px;height:30px;z-index: 5;background: #FFDE59;border:none;border-radius: 2px;box-shadow: 2px 2px 8px #d8d8d8, -2px -2px 8px #d8d8d8;color:#000;" onclick="cart(${product_id})"><i class="fa-light fa-cart-shopping" style="font-size:.8rem"></i></button>
                 
                <button style="width:75px; height:30px; font-size:.8rem;z-index: 5;background: #FFDE59;border:none;border-radius: 2px;box-shadow: 2px 2px 8px #d8d8d8, -2px -2px 8px #d8d8d8;color:#000;margin-left:7px;"  onclick="buyNow(${product_id})">BUY NOW</button> 
          </div>
        </div>
  </div>
        `;
    } else {
      html += `<div class="col-xl-4 col-lg-4 col-md-4 col-18 pull-up" style="margin-top:15px;">
        <div class="color-on" style="height:153px;background:white;border-radius: 20px;box-shadow: 0px 0px 19px #dfdfdfdd, 0px 0px 15px #dfdfdfdd;">
        <div style="position: relative;">
          <div style="font-weight:500;font-size:1.6rem;margin:auto auto auto 1.7rem;padding-top:1.3rem;">${show_number}</div>
          
          <div style="font-size:0.9rem;margin:auto auto auto 2.3rem;">Total-${sum_total} | Sum-${first_sum}</div>
          <div style="font-size: 1.3rem;
          position: absolute;
          font-weight: 500;
          top: 76%;
          right: 32px;" class="final-price">₹${final_price}</div>
  
          <div style="font-size: 1.5rem;
          position: absolute;
          font-weight: 500;
          top: 12%;
          right: 20px;">
          <i id='${
            product_id + "_mob"
          }' onclick="addToWishlist(${product_id}, 'remove')" changeColor('${product_id}')" class="bookmark-icon fa-duotone fa-circle-heart active ${
        localStorage.getItem("user") && wishlists.length && `active`
      }"></i>
          </div>
        </div>
        <div style="width:90%;margin: 1.3rem auto auto auto;display:flex;justify-content: space-between;">
          <div style="display:inline-block">
            <div class="font-size-card"  style="display:inline-block;text-align:center;color:grey;">
              <i style="font-size:1.6rem;" class="any-state fa-sharp fa-solid fa-location-dot"></i><br>Any State
            </div>
            <div class="font-size-card"  style="display:inline-block;text-align:center;color:grey;margin-left:5px;">
            <i style="font-size:1.6rem;" class="any-network fa-duotone fa-signal"></i><br> Any Network
  
            </div>
            <div class="font-size-card"  style="display:inline-block;text-align:center;color:grey;margin-left:5px;">
              <i style="font-size:1.6rem;" class="any-sim fa-thin fa-sim-card"></i><br> Any Pre/Post
            </div>
          </div>
          <div style="display:flex;align-items: center;">
          <button style="width:30px;height:30px;z-index: 5;background: #FFDE59;border:none;border-radius: 2px;box-shadow: 2px 2px 8px #d8d8d8, -2px -2px 8px #d8d8d8;color:#000;" onclick="cart(${product_id})"><i class="fa-light fa-cart-shopping" style="font-size:.8rem"></i></button>
                 
                <button style="width:75px; height:30px; font-size:.8rem;z-index: 5;background: #FFDE59;border:none;border-radius: 2px;box-shadow: 2px 2px 8px #d8d8d8, -2px -2px 8px #d8d8d8;color:#000;margin-left:7px;"  onclick="buyNow(${product_id})">BUY NOW</button> 
          </div>
        </div>
  </div>
      </div>
  `;
    }
    document.querySelector(
      ".card-wish-sm-row"
    ).innerHTML = `<div style="width:90%;margin:auto;margin-bottom:20px;">${html}</div>`;

    if(flat_discount || discount_percent){
      htmlLaptop += `<div class="col-xl-4 col-lg-4 col-md-4 col-18 pull-up">
      <div id=${product_id} class="color-on" style="margin-bottom:8px;height:153px;background:white;border-radius: 20px;box-shadow: 0px 0px 19px #dfdfdfdd, 0px 0px 15px #dfdfdfdd;margin-right: 10px;margin-bottom: 10px;">
      <div style="position: relative;">
        <div style="font-weight:500;font-size:1.6rem;margin:auto auto auto 1.7rem;padding-top:1.3rem;">${
          show_number
        }</div>
        
        <div style="font-size:0.9rem;margin:auto auto auto 2.3rem;">Total-${
          sum_total
        } | Sum-${first_sum}</div>

        <div style="font-size: 1.1rem;
        position: absolute;
        font-weight: 500;
        top: 54%;
        right: 36px;z-index:5;">₹${final_price}</div>

        <div style="font-size: 1.3rem;
        position: absolute;
        font-weight: 500;
        top: 76%;
        right: 32px;" class="final-price"><s>${init}</s></div>

        <div style="font-size: 1.5rem;
        position: absolute;
        font-weight: 500;
        top: 12%;
        right: 20px;">
        <i id='${product_id}' onclick="addToWishlist(${product_id}, 'remove')" changeColor('${
        product_id
      }')" class="bookmark-icon fa-duotone fa-circle-heart active"></i>
        </div>


        <div class="offer-animation" style="font-size: 1.5rem;
        position: absolute;
        background: transparent;
        font-weight: 500;
        top: 9%;
        font-size:1rem;
        display:flex;
        right: 62px;">
        <img style="width:28px;" alt="" src="./Assets/Gift.svg"><div style="line-height: 14px;background: linear-gradient( to bottom, red, #ff6b08, #ff6b08, #ff6b08);font-weight: 900;
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;"><span>${offer_show.split("off")[0]}<br>OFF</span></div>
        </div>

      </div>
      <div style="width:90%;margin: 1.3rem auto auto auto;display:flex;justify-content: space-between;">
        <div style="display:inline-block">
          <div class="font-size-card"  style="display:inline-block;text-align:center;color:grey;">
            <i style="font-size:1.6rem;" class="any-state fa-sharp fa-solid fa-location-dot"></i><br>Any State
          </div>
          <div class="font-size-card"  style="display:inline-block;text-align:center;color:grey;margin-left:5px;">
          <i style="font-size:1.6rem;" class="any-network fa-duotone fa-signal"></i><br> Any Network
          </div>
          <div class="font-size-card"  style="display:inline-block;text-align:center;color:grey;margin-left:5px;">
            <i style="font-size:1.6rem;" class="any-sim fa-thin fa-sim-card"></i><br> Any Pre/Post
          </div>
        </div>
        <div style="display:flex;align-items: center;">
        <button style="width:30px;height:30px;z-index: 5;background: #FFDE59;border:none;border-radius: 2px;box-shadow: 2px 2px 8px #d8d8d8, -2px -2px 8px #d8d8d8;color:#000;" onclick="cart(${
          product_id
        })"><i class="fa-light fa-cart-shopping" style="font-size:.8rem"></i></button>
               
              <button style="width:75px; height:30px; font-size:.8rem;z-index: 5;background: #FFDE59;border:none;border-radius: 2px;box-shadow: 2px 2px 8px #d8d8d8, -2px -2px 8px #d8d8d8;color:#000;margin-left:7px;"  onclick="buyNow(${
                product_id
              })">BUY NOW</button> 
        </div>
      </div>
</div>
</div>`
    }else{
    htmlLaptop +=
      `<div class="col-xl-4 col-lg-4 col-md-4 col-18 pull-up">
      <div class="color-on" style="height:153px;background:white;border-radius: 20px;box-shadow: 0px 0px 19px #dfdfdfdd, 0px 0px 15px #dfdfdfdd;margin-right: 10px;margin-bottom: 10px;">
      <div style="position: relative;">
        <div style="font-weight:500;font-size:1.6rem;margin:auto auto auto 1.7rem;padding-top:1.3rem;">${
          show_number
        }</div>
        
        <div style="font-size:0.9rem;margin:auto auto auto 2.3rem;">Total-${
          sum_total
        } | Sum-${first_sum}</div>
        <div style="font-size: 1.3rem;
        position: absolute;
        font-weight: 500;
        top: 76%;
        right: 32px;" class="final-price">₹${final_price}</div>

        <div style="font-size: 1.5rem;
        position: absolute;
        font-weight: 500;
        top: 12%;
        right: 20px;">
        <i id='${product_id}' onclick="addToWishlist(${product_id}, 'remove')" changeColor('${
        product_id
      }')" class="bookmark-icon fa-duotone fa-circle-heart active"></i>
        </div>
      </div>
      <div style="width:90%;margin: 1.3rem auto auto auto;display:flex;justify-content: space-between;">
        <div style="display:inline-block">
          <div class="font-size-card"  style="display:inline-block;text-align:center;color:grey;">
            <i style="font-size:1.6rem;" class="any-state fa-sharp fa-solid fa-location-dot"></i><br>Any State
          </div>
          <div class="font-size-card"  style="display:inline-block;text-align:center;color:grey;margin-left:5px;">
          <i style="font-size:1.6rem;" class="any-network fa-duotone fa-signal"></i><br> Any Network

          </div>
          <div class="font-size-card"  style="display:inline-block;text-align:center;color:grey;margin-left:5px;">
            <i style="font-size:1.6rem;" class="any-sim fa-thin fa-sim-card"></i><br> Any Pre/Post
          </div>
        </div>
        <div style="display:flex;align-items: center;">
        <button style="width:30px;height:30px;z-index: 5;background: #FFDE59;border:none;border-radius: 2px;box-shadow: 2px 2px 8px #d8d8d8, -2px -2px 8px #d8d8d8;color:#000;" onclick="cart(${
          product_id
        })"><i class="fa-light fa-cart-shopping" style="font-size:.8rem"></i></button>
               
              <button style="width:75px; height:30px; font-size:.8rem;z-index: 5;background: #FFDE59;border:none;border-radius: 2px;box-shadow: 2px 2px 8px #d8d8d8, -2px -2px 8px #d8d8d8;color:#000;margin-left:7px;"  onclick="buyNow(${
                product_id
              })">BUY NOW</button> 
        </div>
      </div>
</div>
    </div>
`;
    }
    document.querySelector(
      ".card-wish-row"
    ).innerHTML = `<div style="width:90%;margin:auto;margin-bottom:20px;display: flex;flex-wrap: wrap;">${htmlLaptop}</div>`;
  });
}else{
  let mainCard = document.querySelector('.card-wish-sm-row');
  let mainCardLaptop = document.querySelector('.card-wish-row');
  let dov = document.createElement("div");
                dov.innerHTML = `<div class="cart-details-cont">
                <div>
                  <img src="./Assets/Wishlist-img.png" alt="empty-cart" style="width: 80%; height: 100%">
                </div>

                <span class="mt-0" style="font-size:1.7rem;font-weight:500;">
                  No item in your wishlist
                </span>
                <span style="margin-bottom:1rem;font-size:0.85rem;">Please Choose your VIP Number & Buy now</span>
                <a href="./vipNumber.html" class="fw-bold">GoTo Store</a>
              </div>`;
              mainCard.appendChild(dov);
              mainCardLaptop.innerHTML = `<div style="width:80%;margin:auto;"><div class="cart-details-cont">
              <div>
                <img src="./Assets/Wishlist-img.png" alt="empty-cart" style="width: 35%; height: 100%">
              </div>

              <span class="mt-0" style="font-size:1.7rem;font-weight:500;">
                No item in your wishlist
              </span>
              <span style="margin-bottom:1rem;font-size:0.85rem;">Please Choose your VIP Number & Buy now</span>
              <a style="width:30%;" href="./vipNumber.html" class="fw-bold">GoTo Store</a>
            </div></div>`;
}


// let token = localStorage.getItem("user");
// if (token) {
//   var myHeaders = new Headers();
//   myHeaders.append("token", `${token}`);

//   var requestOptions1 = {
//     method: "POST",
//     headers: myHeaders,
//     redirect: "follow",
//   };

//   fetch(
//     "https://vipnumberapi.bigboychoice.com/api/v1/customer/customer_info",
//     requestOptions1
//   )
//     .then((response) => response.json())
//     .then((result) => {
//       fetch(
//         "https://vipnumberapi.bigboychoice.com/api/v1/customer/fetch_whishlist/1?customer_id=" +
//           result.data.customer_id,
//         requestOptions
//       )
//         .then((response) => response.json())
//         .then((result) => {
//           cardWish.map((item) => {
//             if(result.status=='failure'){
//               let mainCardLaptop = document.querySelector('.card-wish-row');
//               mainCardLaptop.innerHTML = `<div style="width:80%;margin:auto;"><div class="cart-details-cont">
//               <div>
//                 <img src="./Assets/Wishlist-img.png" alt="empty-cart" style="width: 35%; height: 100%">
//               </div>

//               <span class="mt-0" style="font-size:1.7rem;font-weight:500;">
//                 No item in your wishlist
//               </span>
//               <span style="margin-bottom:1rem;font-size:0.85rem;">Please Choose your VIP Number & Buy now</span>
//               <a style="width:30%;" href="./vipNumber.html" class="fw-bold">GoTo Store</a>
//             </div></div>`;
//             }
//             result.data.forEach((val) => {
//               let rating = "";
//               var init = "";
//               var final_price = val.price;
//               if (val.flat_discount && parseInt(val.flat_discount) > 0) {
//                 init = "₹" + val.price;
//                 final_price = parseInt(val.price) - parseInt(val.flat_discount);
//               } else if (
//                 val.discount_percent &&
//                 parseInt(val.discount_percent) > 0
//               ) {
//                 init = "₹" + val.price;
//                 var numVal1 = Number(val.price);
//                 var numVal2 = Number(val.discount_percent) / 100;
//                 final_price = numVal1 - numVal1 * numVal2;
//               }
//               for (
//                 let index = 0;
//                 index < Math.ceil(val.vendor?.rating);
//                 index++
//               ) {
//                 rating += ' <i class="fa-solid fa-star"></i>';
//               }
//               let dov = document.createElement("div");
//               dov.classList.add("col-6", "col-md-6", "col-18", "pull-up");
//               dov.innerHTML = `<div id=${
//                 val.product_id
//               } style="border-radius:10px;background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% );border:1.5px solid #e6e6e6;box-shadow:0 0 10px grey;">
//                    <div class="d-flex justify-content-between align-items-center col-div px-2 py-1 ">

//                        <div class="d-inline-flex">${rating}</div>
//                        <button class="btn-card-heart"><i class="fa-solid fa-trash-can" onclick="addToWishlist(${
//                          val.product_id
//                        }, 'remove')"></i></button>
//                      </div>
//                <div class="d-flex flex-column bg-cont">

//                <div class="d-flex justify-content-center col-div-2 mt-2">

//               <h1 class="mb-0 fw-bold" style="font-size:2rem;height: 40px">${val.show_number.replace(
//                 "<strong>",
//                 "<strong style='color: #9e48cd'>"
//               )}<span style="color:#9e48cd ;"></span></h1>

//                </div>

//               <div class="d-flex justify-content-center col-div-3 py-1">
//               Total-<strong class="mx-2">${
//                 val.sum_total
//               }</strong> | Sum-<strong class="mx-2">${
//                 val.first_sum
//               }</strong> | <span class="mx-1"> RTP</span> | <a href="./vipNumber" class="ms-1" style="font-size:12px;"><span>SIMILAR NUMBERS</span></a>
//               </div>

//               <div class="d-flex justify-content-center align-items-center card-icon-cont py-3">

//              <h4 class="mb-0 fw-bold"><s>${init}</s> ₹${final_price}</h4><div class="vl mx-1"></div><button class=""><i class="fa-solid fa-cart-shopping"  onclick="cart(${
//                 val.product_id
//               })"></i></button>

//               <div class="vl mx-1"></div>
//               <button class="py-2" onclick=window.location.href="./Detail?product=${
//                 val.product_id
//               }"><i class="fa-solid fa-circle-info d-block"></i></button>
//                <div class="vl mx-1"></div>
//               <button  onclick="buyNow(${val.product_id})">BUY</button>

//               </div>
//               </div>
//               `;
//               item.appendChild(dov);
//             });
//           });
//         });
//       var requestOptions = {
//         method: "GET",
//         redirect: "follow",
//       };

//       // Wish list card Mobile
//       let cardWish1Sm = document.querySelectorAll(".card-wish-sm-row");
//       const cardWishSm = [...cardWish1Sm];
//       fetch(
//         "https://vipnumberapi.bigboychoice.com/api/v1/customer/fetch_whishlist/1?customer_id=" +
//           result.data.customer_id,
//         requestOptions
//       )
//         .then((response) => response.json())
//         .then((result) => {

//           cardWishSm.map((item) => {
//             if(result.status=='failure'){
//               let dov = document.createElement("div");
//                 dov.innerHTML = `<div class="cart-details-cont">
//                 <div>
//                   <img src="./Assets/Wishlist-img.PNG" alt="empty-cart" style="width: 80%; height: 100%">
//                 </div>

//                 <span class="mt-0" style="font-size:1.7rem;font-weight:500;">
//                   No item in your wishlist
//                 </span>
//                 <span style="margin-bottom:1rem;font-size:0.85rem;">Please Choose your VIP Number & Buy now</span>
//                 <a href="./vipNumber.html" class="fw-bold">GoTo Store</a>
//               </div>`;
//               item.appendChild(dov);
//             }
//             result.data.forEach((val) => {
//               let rating = "";
//               var init = "";
//               var final_price = val.price;
//               if (val.flat_discount && parseInt(val.flat_discount) > 0) {
//                 init = "₹" + val.price;
//                 final_price = parseInt(val.price) - parseInt(val.flat_discount);
//               } else if (
//                 val.discount_percent &&
//                 parseInt(val.discount_percent) > 0
//               ) {
//                 init = "₹" + val.price;
//                 var numVal1 = Number(val.price);
//                 var numVal2 = Number(val.discount_percent) / 100;
//                 final_price = numVal1 - numVal1 * numVal2;
//               }
//               for (
//                 let index = 0;
//                 index < Math.ceil(val.vendor?.rating);
//                 index++
//               ) {
//                 rating += ' <i class="fa-solid fa-star"></i>';
//               }
//               let dov = document.createElement("div");
//               dov.classList.add("col-6", "col-md-6", "col-18", "pull-up");
//               dov.innerHTML = `  <div id=${
//                 val.product_id
//               } style="border-top-left-radius:5px;border-top-right-radius:5px;background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% );">
//                 <div class="d-flex justify-content-between align-items-center col-div px-2 ">
//                 <div class="d-inline-flex">
//                ${rating}
//                 </div>
//                 <button class="btn-card-heart"><i class="fa-solid fa-trash-can" onclick="addToWishlist(${
//                   val.product_id
//                 }, 'remove')"></i></button>
//               </div>
//                   </div>
//             <div class="d-flex flex-column bg-cont">

//             <div class="d-flex flex-column align-items-center col-div-2 mt-1">

//             <h1 class="mb-0 fw-bold" style='height: 40px'>${val.show_number.replace(
//               "<strong>",
//               "<strong style='color: #9e48cd'>"
//             )}<span style="color:#9e48cd"></span></h1>
//             </div>

//             <div class="d-flex justify-content-center col-div-3 py-1">
//             Total- <strong class="mx-1">${
//               val.sum_total
//             }</strong> | Sum- <strong class="mx-1">${
//                 val.first_sum
//               }</strong> | <span class="mx-1">RTP</span> |
//             <a href="./vipNumber" class="ms-1"><span>SIMILAR NUMBERS</span></a>
//             </div>

//             <div class="d-flex justify-content-center align-items-center card-icon-cont py-2 py-md-3">

//             <h6 class="mb-0 fw-bold" style="font-size:12px"><s>${init}</s> ₹${final_price}</h6>
//             <div class="vl mx-1"></div><button class=""><i class="fa-solid fa-cart-shopping"  onclick="cart(${
//               val.product_id
//             })"></i></button>

//                 <div class="vl mx-1"></div>
//                 <button class="py-2" onclick=window.location.href="./Detail?product=${
//                   val.product_id
//                 }"><i class="fa-solid fa-circle-info d-block"></i></button>
//                  <div class="vl mx-1"></div>
//                 <button  onclick="buyNow(${val.product_id})">BUY</button>

//             </div>
//             </div>
//             </div>
//                 `;
//               item.appendChild(dov);
//             });

//           });
//         });
//     })
//     .catch((error) => console.log("error", error));
// }else{
//   let mainCard = document.querySelector('.card-wish-sm-row');
//   let mainCardLaptop = document.querySelector('.card-wish-row');
//   let dov = document.createElement("div");
//                 dov.innerHTML = `<div class="cart-details-cont">
//                 <div>
//                   <img src="./Assets/Wishlist-img.png" alt="empty-cart" style="width: 80%; height: 100%">
//                 </div>

//                 <span class="mt-0" style="font-size:1.7rem;font-weight:500;">
//                   No item in your wishlist
//                 </span>
//                 <span style="margin-bottom:1rem;font-size:0.85rem;">Please Choose your VIP Number & Buy now</span>
//                 <a href="./vipNumber.html" class="fw-bold">GoTo Store</a>
//               </div>`;
//               mainCard.appendChild(dov);
//               mainCardLaptop.innerHTML = `<div style="width:80%;margin:auto;"><div class="cart-details-cont">
//               <div>
//                 <img src="./Assets/Wishlist-img.png" alt="empty-cart" style="width: 35%; height: 100%">
//               </div>

//               <span class="mt-0" style="font-size:1.7rem;font-weight:500;">
//                 No item in your wishlist
//               </span>
//               <span style="margin-bottom:1rem;font-size:0.85rem;">Please Choose your VIP Number & Buy now</span>
//               <a style="width:30%;" href="./vipNumber.html" class="fw-bold">GoTo Store</a>
//             </div></div>`;

// }
