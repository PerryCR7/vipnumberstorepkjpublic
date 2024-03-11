let cardArr = document.querySelectorAll(".card-row");
let cardSmArr = document.querySelectorAll(".card-sm-row");
let cardVip = document.querySelectorAll(".card-vipSm-row");
const card = [...cardArr];
const cardSm = [...cardSmArr];
const VipSmCard = [...cardVip];
let Arr = [];
const Arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const Arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

var myHeaders = new Headers();
localStorage.getItem("user") &&
  myHeaders.append("token", localStorage.getItem("user"));
var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

// offer card Desktop
let cardOffer = document.querySelectorAll(".card-offer-row");
let card5 = [...cardOffer];
fetch(
  "https://vipnumberapi.bigboychoice.com/api/v1/customer/fetch_offers/1",
  requestOptions
)
  .then((response) => response.json())
  .then((result) => {
    Arr = result.data;
    card5.map((item) => {
      let dov = document.createElement("div");
      if (!result.data) {
        document.querySelector(".card-offer-row").innerHTML =
          '<h1 class="text-center">No Data Found!</h1>';
      } else {
        Arr.forEach((val) => {
          let rating = "";
          for (let index = 0; index < Math.ceil(val.vendor?.rating); index++) {
            rating += ' <i class="fa-solid fa-star"></i>';
          }
          var init = "";
          var final_price = val.price;
          var offer_show = "";
          if (val.flat_discount && parseInt(val.flat_discount) > 0) {
            init = "₹" + val.price;
            final_price = parseInt(val.price) - parseInt(val.flat_discount);
            offer_show = val.flat_discount + " off";
          } else if (
            val.discount_percent &&
            parseInt(val.discount_percent) > 0
          ) {
            init = "₹" + val.price;
            var numVal1 = Number(val.price);
            var numVal2 = Number(val.discount_percent) / 100;
            final_price = numVal1 - numVal1 * numVal2;
            offer_show = val.discount_percent + "% off";
          }
          let dov = document.createElement("div");
          dov.classList.add(
            "col-xl-3",
            "col-lg-3",
            "col-md-3",
            "col-18",
            "pull-up"
          );
          dov.innerHTML = `<div id=${val.product_id} class="color-on" style="margin-bottom:8px;height:153px;background:white;border-radius: 20px;box-shadow: 0px 0px 19px #dfdfdfdd, 0px 0px 15px #dfdfdfdd;">
          <div style="position: relative;">
            <div style="font-weight:500;font-size:1.6rem;margin:auto auto auto 1.7rem;padding-top:1.3rem;">${
              val.show_number
            }</div>
            
            <div style="font-size:0.9rem;margin:auto auto auto 2.3rem;">Total-${
              val.sum_total
            } | Sum-${val.first_sum}</div>

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
            <i id='${val.product_id + "_mob"}' onclick="addToWishlist(${
            val.product_id
          });changeColor('${
            val.product_id
          }')" class="bookmark-icon fa-duotone fa-circle-heart ${
            localStorage.getItem("user") && val.wishlists.length && `active`
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
              val.product_id
            })"><i class="fa-light fa-cart-shopping" style="font-size:.8rem"></i></button>
                   
                  <button style="width:75px; height:30px; font-size:.8rem;z-index: 5;background: #FFDE59;border:none;border-radius: 2px;box-shadow: 2px 2px 8px #d8d8d8, -2px -2px 8px #d8d8d8;color:#000;margin-left:7px;"  onclick="buyNow(${
                    val.product_id
                  })">BUY NOW</button> 
            </div>
          </div>
    </div>
          `;
          item.appendChild(dov);
        });
      }
    });
  })
  .catch((error) => console.log("error", error));

// offer card Mobile
let cardSmOffer = document.querySelectorAll(".card-offer-sm-row");
const card6 = [...cardSmOffer];
fetch(
  "https://vipnumberapi.bigboychoice.com/api/v1/customer/fetch_offers/1",
  requestOptions
)
  .then((response) => response.json())
  .then((result) => {
    if (!result.data) {
      document.querySelector(".card-offer-sm-row").innerHTML =
        '<h1 class="text-center">No Data Found!</h1>';
    } else {
      card6.map((item) => {
        result.data.forEach((val) => {
          let rating = "";
          for (let index = 0; index < Math.ceil(val.vendor?.rating); index++) {
            rating += ' <i class="fa-solid fa-star"></i>';
          }
          var init = "";
          var final_price = val.price;
          var offer_show = "";
          if (val.flat_discount && parseInt(val.flat_discount) > 0) {
            init = "₹" + val.price;
            final_price = parseInt(val.price) - parseInt(val.flat_discount);
            offer_show = val.flat_discount + " off";
          } else if (
            val.discount_percent &&
            parseInt(val.discount_percent) > 0
          ) {
            init = "₹" + val.price;
            var numVal1 = Number(val.price);
            var numVal2 = Number(val.discount_percent) / 100;
            final_price = numVal1 - numVal1 * numVal2;
            offer_show = val.discount_percent + "% off";
          }
          let dov = document.createElement("div");
          dov.classList.add("col-md-6", "col-18", "pull-up");
          dov.innerHTML = `  <div id=${val.product_id} class="color-on" style="margin-bottom:8px;height:153px;background:white;border-radius: 20px;box-shadow: 0px 0px 19px #dfdfdfdd, 0px 0px 15px #dfdfdfdd;">
          <div style="position: relative;">
            <div style="font-weight:500;font-size:1.6rem;margin:auto auto auto 1.7rem;padding-top:1.3rem;">${
              val.show_number
            }</div>
            
            <div style="font-size:0.9rem;margin:auto auto auto 2.3rem;">Total-${
              val.sum_total
            } | Sum-${val.first_sum}</div>

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
            <i id='${val.product_id + "_mob"}' onclick="addToWishlist(${
            val.product_id
          });changeColor('${
            val.product_id
          }')" class="bookmark-icon fa-duotone fa-circle-heart ${
            localStorage.getItem("user") && val.wishlists.length && `active`
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
              val.product_id
            })"><i class="fa-light fa-cart-shopping" style="font-size:.8rem"></i></button>
                   
                  <button style="width:75px; height:30px; font-size:.8rem;z-index: 5;background: #FFDE59;border:none;border-radius: 2px;box-shadow: 2px 2px 8px #d8d8d8, -2px -2px 8px #d8d8d8;color:#000;margin-left:7px;"  onclick="buyNow(${
                    val.product_id
                  })">BUY NOW</button> 
            </div>
          </div>
    </div>
            `;
          item.appendChild(dov);
        });
      });
    }
  });
