// import config from "../conf/index.js";
let cardArr2 = document.querySelector(".card-vip-row");
let cardArrMob = document.querySelector(".card-vipSm-row");
var myHeaders = new Headers();
localStorage.getItem("user") &&
  myHeaders.append("token", localStorage.getItem("user"));
let defaultData = (
  count,
  number,
  sum_total,
  not_contains,
  sort,
  low_price,
  high_price,
  number_series,
  search_type,
  category,
  type
) => {
  fetch(
    `https://vipnumberapi.bigboychoice.com/api/v1/customer/search_products/${count}?number=${number}&sum_total=${sum_total}&number_not_contains=${not_contains}&sort=${sort}&low_price=${low_price}&high_price=${high_price}&number_series=${number_series}&search_type=${search_type}&category=${category}`,
    { headers: myHeaders }
  )
    .then((res) => res.json())
    .then((data) => {
      document.querySelector('.overflow_screen-custom').style.display = "none";
      if (data.status === "failure") {
        $(".more").html("More Numbers");
        $(".more-sm").html("View More");
        // cardArr2.innerHTML = `<h1>${data.msg}</h1>`;
        // cardArrMob.innerHTML = `<h1>${data.msg}</h1>`;
        cardArr2.innerHTML = `<h1 style="text-align:center">Not Found</h1>`;
        cardArrMob.innerHTML = `<h1 style="text-align:center">Not Found</h1>`;
      } else {
        if(!type){
          cardArr2.innerHTML = ``;
          cardArrMob.innerHTML = ``;
        }
        document.querySelector('.overflow_screen-custom').style.display = "none";
        let dataOfNums = data.data;
        dataOfNums.map((item) => {
          const {
            price,
            sum_total,
            first_sum,
            number_status,
            number,
            product_id,
            wishlists,
            vendor,
            show_number,
            discount_percent,
            flat_discount,
          } = item;
          // console.log("discount_percent, flat_discount",discount_percent, flat_discount)
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
          // let rating = "";
          // for (let index = 0; index < Math.ceil(vendor.rating); index++) {
          //   rating += ' <i class="fa-solid fa-star"></i>';
          // }
          if(flat_discount || discount_percent){
            cardArr2.innerHTML =
            cardArr2.innerHTML +`<div class="col-xl-4 col-lg-4 col-md-4 col-18 pull-up">
            <div id=${product_id} class="color-on" style="margin-bottom:8px;height:153px;background:#ffffff6b;border-radius: 20px;box-shadow: 0px 0px 19px #dfdfdfdd, 0px 0px 15px #dfdfdfdd;">
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
              <i id='${product_id}' onclick="addToWishlist(${
              product_id
            });changeColor('${
              product_id
            }')" class="bookmark-icon fa-duotone fa-circle-heart ${
              localStorage.getItem("user") && wishlists.length && `active`
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
              <img style="width:28px;" alt="" src="./Assets/Gift.svg"><div style="line-height: 14px;background: linear-gradient( to bottom, red, #ff6b08, #ff6b08, #ff6b08);font-weight: 700;
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
          cardArr2.innerHTML =
            cardArr2.innerHTML +
            `<div class="col-xl-4 col-lg-4 col-md-4 col-18 pull-up">
            <div class="color-on" style="height:153px;background:#ffffff6b;border-radius: 20px;box-shadow: 0px 0px 19px #dfdfdfdd, 0px 0px 15px #dfdfdfdd;">
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
              <i id='${product_id}' onclick="addToWishlist(${
              product_id
            });changeColor('${
              product_id
            }')" class="bookmark-icon fa-duotone fa-circle-heart ${
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
      // <div
      //     style="
      //       border-radius: 10px;
      //       background: linear-gradient(
      //         40deg,
      //         #bf68e6 20%,
      //         #9e48cd 51%,
      //         #bf68e6 90%
      //       );
      //       border: 1.5px solid #e6e6e6;
      //       box-shadow: 0 0 10px grey;
      //     "
      //   >
      //     <div
      //       class="d-flex justify-content-between align-items-center col-div px-2 py-1"
      //     >
      //       <div class="d-inline-flex">
      //        ${rating}
      //       </div>
      //       <button class="btn-card-heart">
      //         <i id='${product_id}' onclick="addToWishlist(${product_id}); changeColor('${product_id}')"  class="fa-solid fa-heart  ${
      //         localStorage.getItem("user") && wishlists[0]?.class
      //       }"></i>
      //       </button>
      //     </div>
      //     <div class="d-flex flex-column bg-cont">
      //       <div class="d-flex justify-content-center col-div-2 mt-2">
      //         <h1 class="mb-0 fw-bold" style="font-size: 2rem;height: 40px" >
      //          ${show_number.replace(
      //            "<strong>",
      //            "<strong style='color: #9e48cd'>"
      //          )}
      //         </h1>
      //       </div>
  
      //       <div class="d-flex justify-content-center col-div-3 py-1">
      //         Total-<strong class="mx-2">${sum_total}</strong> | Sum-<strong
      //           class="mx-2"
      //           >${first_sum}</strong
      //         >
      //         | <span class="mx-1">${number_status}</span> |
      //         <a href="./vipNumber" class="ms-1" style="font-size: 10px"
      //           ><span>SIMILAR NUMBERS</span></a
      //         >
      //       </div>
  
      //       <div
      //         class="d-flex justify-content-center align-items-center card-icon-cont py-3"
      //       >
      //         <h4 class="mb-0 fw-bold"><s>${init}</s> ₹${final_price}</h4>
      //         <div class="vl mx-1"></div>
      //         <button class=""><i class="fa-solid fa-cart-shopping" onclick="cart(${product_id})"></i></button>
  
      //         <div class="vl mx-1"></div>
      //         <button
      //           class="py-2"
      //           onclick=window.location.href="./Detail?product=${product_id}"
      //         >
      //           <i class="fa-solid fa-circle-info d-block"></i>
      //         </button>
      //         <div class="vl mx-1"></div>
      //         <button onclick="buyNow(${product_id})">BUY</button>
      //       </div>
      //     </div>
      //   </div>
      if(flat_discount || discount_percent){
        cardArrMob.innerHTML =
        cardArrMob.innerHTML +
        `
        <div style="width:90%;margin:auto;">
      <div class="col-md-6 col-18 pull-up">
        <div id=${product_id} class="color-on" style="margin-top: 12px;margin-bottom:8px;height:153px;background:#ffffff6b;border-radius: 20px;box-shadow: 0px 0px 19px #dfdfdfdd, 0px 0px 15px #dfdfdfdd;">
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
          <i id='${product_id + "_mob"}' onclick="addToWishlist(${
            product_id
          });changeColor('${
            product_id
          }')" class="bookmark-icon fa-duotone fa-circle-heart ${
            localStorage.getItem("user") && wishlists.length && `active`
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
          <img style="width:28px;" alt="" src="./Assets/Gift.svg"><div style="line-height: 14px;background: linear-gradient( to bottom, red, #ff6b08, #ff6b08, #ff6b08);font-weight: 700;
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
  </div>
  </div>`
      }else{
        cardArrMob.innerHTML =
        cardArrMob.innerHTML +
        `<div style="width:90%;margin:auto;">
        <div class="col-md-6 col-18 pull-up">
        <div class="color-on" style="margin-top: 12px;height:153px;background:#ffffff6b;border-radius: 20px;box-shadow: 0px 0px 19px #dfdfdfdd, 0px 0px 15px #dfdfdfdd;">
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
          <i id='${product_id + "_mob"}' onclick="addToWishlist(${
          product_id
        });changeColor('${
          product_id
        }')" class="bookmark-icon fa-duotone fa-circle-heart ${
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
      </div>
  `;
              }
        });
      }
      $(".more").html("More Numbers");
      $(".more-sm").html("View More");
    });
};

let search_sum = screen.width > 700 ? "" : "_mob";
document
  .querySelector(`.search_sum${search_sum}`)
  .addEventListener("click", (e) => {
    e.preventDefault();
    let sum_total =
      screen.width > 700
        ? document.querySelector(".sumtotal").value
        : document.querySelector(".sumotalMobile").value;

    if (sum_total.length > 0) {
      filters[1] = sum_total;
      defaultData((count += 1), ...filters);
    } else {
      filters[1] = "";
      dataOfCategory((count += 1), ...filters);
    }
  });
document.querySelector(`.search_number`).addEventListener("click", (e) => {
  e.preventDefault();
  let sum_total = document.querySelector(".search_number_left").value;

  if (sum_total.length > 0) {
    // window.location = `vipNumber?search_num=${sum_total}&search_type=Anywhere`;
    filters[0] = sum_total;
    dataOfCategory((count += 1), ...filters);
  } else {
    filters[0] = "";
    dataOfCategory((count += 1), ...filters);
  }
});
let dataOfCategory = (
  count,
  number,
  sum_total,
  not_contains,
  sort,
  low_price,
  high_price,
  number_series,
  search_type,
  category
) => {
  onResetFilterBtn = true;
  onResetFilter();
  fetch(
    `https://vipnumberapi.bigboychoice.com/api/v1/customer/search_products/${count}?number=${number}&sum_total=${sum_total}&number_not_contains=${not_contains}&sort=${sort}&low_price=${low_price}&high_price=${high_price}&number_series=${number_series}&search_type=${search_type}&category=${category}`,
    { headers: myHeaders }
  )
    .then((res) => res.json())
    .then((data) => {
      document.querySelector('.overflow_screen-custom').style.display = "none";
      if (data.status === "failure") {
        // cardArr2.innerHTML = `<h1>${data.msg}</h1>`;
        cardArr2.innerHTML = `<h1 style="text-align:center">Not Found</h1>`;
      } else {
        document.querySelector('.overflow_screen-custom').style.display = "none";
        let dataOfNums = data.data;
        cardArr2.innerHTML = "";
        cardArrMob.innerHTML = "";
        dataOfNums.map((item) => {
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
          // let rating = "";
          // for (let index = 0; index < Math.ceil(vendor.rating); index++) {
          //   rating += ' <i class="fa-solid fa-star"></i>';
          // }
          if(flat_discount || discount_percent){
            cardArr2.innerHTML =
            cardArr2.innerHTML +`<div class="col-xl-4 col-lg-4 col-md-4 col-18 pull-up">
            <div id=${product_id} class="color-on" style="margin-bottom:8px;height:153px;background:#ffffff6b;border-radius: 20px;box-shadow: 0px 0px 19px #dfdfdfdd, 0px 0px 15px #dfdfdfdd;">
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
              <i id='${product_id}' onclick="addToWishlist(${
              product_id
            });changeColor('${
              product_id
            }')" class="bookmark-icon fa-duotone fa-circle-heart ${
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
              <img style="width:28px;" alt="" src="./Assets/Gift.svg"><div style="line-height: 14px;background: linear-gradient( to bottom, red, #ff6b08, #ff6b08, #ff6b08);font-weight: 700;
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
          cardArr2.innerHTML =
            cardArr2.innerHTML +
            `<div class="col-xl-4 col-lg-4 col-md-4 col-18 pull-up">
            <div class="color-on" style="height:153px;background:#ffffff6b;border-radius: 20px;box-shadow: 0px 0px 19px #dfdfdfdd, 0px 0px 15px #dfdfdfdd;">
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
              <i id='${product_id}' onclick="addToWishlist(${
              product_id
            });changeColor('${
              product_id
            }')" class="bookmark-icon fa-duotone fa-circle-heart ${
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



                  if(flat_discount || discount_percent){
                    cardArrMob.innerHTML =
                    cardArrMob.innerHTML +
                    `
                    <div style="width:90%;margin:auto;">
                  <div class="col-md-6 col-18 pull-up">
                    <div id=${product_id} class="color-on" style="margin-top: 12px;margin-bottom:8px;height:153px;background:#ffffff6b;border-radius: 20px;box-shadow: 0px 0px 19px #dfdfdfdd, 0px 0px 15px #dfdfdfdd;">
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
                      <i id='${product_id + "_mob"}' onclick="addToWishlist(${
                        product_id
                      });changeColor('${
                        product_id
                      }')" class="bookmark-icon fa-duotone fa-circle-heart ${
                        localStorage.getItem("user") && wishlists.length && `active`
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
                      <img style="width:28px;" alt="" src="./Assets/Gift.svg"><div style="line-height: 14px;background: linear-gradient( to bottom, red, #ff6b08, #ff6b08, #ff6b08);font-weight: 700;
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
              </div>
              </div>`
                  }else{
                    cardArrMob.innerHTML =
                    cardArrMob.innerHTML +
                    `<div style="width:90%;margin:auto;">
                    <div class="col-md-6 col-18 pull-up">
                    <div class="color-on" style="margin-top: 12px;height:153px;background:#ffffff6b;border-radius: 20px;box-shadow: 0px 0px 19px #dfdfdfdd, 0px 0px 15px #dfdfdfdd;">
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
                      <i id='${product_id + "_mob"}' onclick="addToWishlist(${
                      product_id
                    });changeColor('${
                      product_id
                    }')" class="bookmark-icon fa-duotone fa-circle-heart ${
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
                  </div>
              `;
                          }
          
        });
      }
    });
};
