import config from "../conf/index.js";
let cardArr = document.querySelectorAll(".card-row"); // dream number desktop
let cardArr2 = document.querySelectorAll(".card-Vip-row"); // latest and updated stock desktop
let cardSmArr = document.querySelectorAll(".card-sm-row"); // dream number mobile
let cardVip = document.querySelectorAll(".card-Vipsm-row"); // latest and updated stock mobile
const card = [...cardArr]; // dream number desktop
const cardSm = [...cardSmArr]; // dream number mobile
const VipSmCard = [...cardVip]; // latest and updated stock mobile
const cardVip2 = [...cardArr2]; //latest and updated stock desktop
//------------------------------------------------------------------//
let HomeCardData;
// Home card Desktop
const FetchHome = async () => {
  var myHeaders = new Headers();
  localStorage.getItem("user") &&
    myHeaders.append("token", localStorage.getItem("user"));
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch(
    config.backendEndpoint + "/fetch_favourite_products/1",
    requestOptions
  );
  const data = await response.json();
  HomeCardData = data.data;
  HomeCardData.length = 12;
  card.map((item) => {
    HomeCardData.forEach((val) => {
      let dov = document.createElement("div");
      let num = val.number.toString();
      let rating = "";
      for (let index = 0; index < Math.ceil(val.vendor?.rating); index++) {
        rating += ' <i class="fa-solid fa-star"></i>';
      }
      var init = "";
      var final_price = val.price;
      if (val.flat_discount && parseInt(val.flat_discount) > 0) {
        init = "₹" + val.price;
        final_price = parseInt(val.price) - parseInt(val.flat_discount);
      } else if (val.discount_percent && parseInt(val.discount_percent) > 0) {
        init = "₹" + val.price;
        var numVal1 = Number(val.price);
        var numVal2 = Number(val.discount_percent) / 100;
        final_price = numVal1 - numVal1 * numVal2;
      }
      dov.classList.add(
        "laptop-num",
        "pull-up"
      );
      // dov.classList.add(
      //   "col-xl-3",
      //   "col-lg-3",
      //   "col-md-3",
      //   "col-18",
      //   "pull-up"
      // );
  //     dov.innerHTML = `<div style="border-radius:10px;background: linear-gradient(40deg, #F9C835 20%, #f9c935 51%, #F9C835 90%);border:1.5px solid #e6e6e6;box-shadow:0 0 10px grey;">
  //        <div class="d-flex justify-content-between align-items-center col-div px-2 py-1 ">
            
  //            <div class="d-inline-flex">${rating}</div>
  //            <button class="btn-card-heart"><i id='${
  //              val.product_id
  //            }' onclick="addToWishlist(${val.product_id}); changeColor('${
  //       val.product_id
  //     }')" class="fa-solid fa-heart ${
  //       localStorage.getItem("user") && val?.wishlists[0]?.class
  //     }"></i></button>
  //          </div>
  //    <div class="d-flex flex-column bg-cont">  
    
  //    <div class="d-flex justify-content-center col-div-2 mt-2">
       
  //   <h1 class="mb-0 fw-bold" style="font-size:2rem;height: 40px">${val.show_number.replace(
  //     "<strong>",
  //     "<strong style='color: #9e48cd'>"
  //   )}</h1>
    
       
  //    </div>
    
  //   <div class="d-flex justify-content-center col-div-3 py-1">
  //   Total-<strong class="mx-2">${
  //     val.sum_total
  //   }</strong> | Sum-<strong class="mx-2">${
  //       val.first_sum
  //     }</strong> | <span class="mx-1">${
  //       val.number_status
  //     }</span> | <a href="./vipNumber" class="ms-1" style="font-size:10px;"><span>SIMILAR NUMBERS</span></a>
  //   </div>
    
  //   <div class="d-flex justify-content-center align-items-center card-icon-cont py-3">
  
  //  <h4 class="mb-0 fw-bold"><s>${init}</s> ₹${final_price}</h4><div class="vl mx-1"></div>
  //  <button class="" onclick="cart(${
  //    val.product_id
  //  })"><i class="fa-solid fa-cart-shopping"></i></button>
   
  //   <div class="vl mx-1"></div>
  //   <button class="py-2"onclick=window.location.href="./Detail?product=${
  //     val.product_id
  //   }"><i class="fa-solid fa-circle-info d-block"></i></button>
  //    <div class="vl mx-1"></div>
  //   <button onclick="buyNow(${val.product_id})">BUY</button> 
    
    
  //   </div>
  //   </div>
  //   `;
  dov.innerHTML = `
  <div class="color-on" style="height:153px;background:white;border-radius: 20px;box-shadow: 0px 0px 19px #dfdfdfdd, 0px 0px 15px #dfdfdfdd;">
        <div style="position: relative;">
          <div style="font-weight:400;font-size:1.6rem;margin:auto auto auto 1.7rem;padding-top:1.3rem;">${
            val.show_number
          }</div>
          
          <div style="font-size:0.9rem;margin:auto auto auto 2.3rem;">Total-${
            val.sum_total
          } | Sum-${val.first_sum}</div>
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
          <i id='${val.product_id}' onclick="addToWishlist(${
          val.product_id
        });changeColor('${
          val.product_id
        }')" class="bookmark-icon fa-duotone fa-circle-heart ${
          localStorage.getItem("user") && val.wishlists.length && `active`
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
            val.product_id
          })"><i class="fa-light fa-cart-shopping" style="font-size:.8rem"></i></button>
                 
                <button style="width:75px; height:30px; font-size:.8rem;z-index: 5;background: #FFDE59;border:none;border-radius: 2px;box-shadow: 2px 2px 8px #d8d8d8, -2px -2px 8px #d8d8d8;color:#000;margin-left:7px;"  onclick="buyNow(${
                  val.product_id
                })">BUY NOW</button> 
          </div>
        </div>
  <div>
`;
      item.appendChild(dov);
    });
  });
};
FetchHome();
// Home card Desktop 2
const FetchHome2 = async () => {
  var myHeaders = new Headers();
  localStorage.getItem("user") &&
    myHeaders.append("token", localStorage.getItem("user"));
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch(
    config.backendEndpoint + "/fetch_all_latest_products/1",
    requestOptions
  );
  const data = await response.json();
  HomeCardData = data.data;
  HomeCardData.length = 12;
  cardVip2.map((item) => {
    HomeCardData.forEach((val) => {
      let dov = document.createElement("div");
      let num = val.number.toString();
      let rating = "";
      for (let index = 0; index < Math.ceil(val.vendor?.rating); index++) {
        rating += ' <i class="fa-solid fa-star"></i>';
      }
      var init = "";
      var final_price = val.price;
      if (val.flat_discount && parseInt(val.flat_discount) > 0) {
        init = "₹" + val.price;
        final_price = parseInt(val.price) - parseInt(val.flat_discount);
      } else if (val.discount_percent && parseInt(val.discount_percent) > 0) {
        init = "₹" + val.price;
        var numVal1 = Number(val.price);
        var numVal2 = Number(val.discount_percent) / 100;
        final_price = numVal1 - numVal1 * numVal2;
      }
      dov.classList.add(
        "laptop-num",
        "pull-up"
      );
  //     dov.innerHTML = `<div style="border-radius:10px;background: linear-gradient(40deg, #F9C835 20%, #f9c935 51%, #F9C835 90%);border:1.5px solid #e6e6e6;box-shadow:0 0 10px grey;">
  //        <div class="d-flex justify-content-between align-items-center col-div px-2 py-1 ">
            
  //            <div class="d-inline-flex">${rating}</div>
  //            <button class="btn-card-heart"><i  id='${
  //              val.product_id
  //            }' onclick="addToWishlist(${val.product_id}); changeColor('${
  //       val.product_id
  //     }')"  class="fa-solid fa-heart ${
  //       localStorage.getItem("user") && val?.wishlists[0]?.class
  //     }"></i></button>
  //          </div>
  //    <div class="d-flex flex-column bg-cont">
      
     
    
  //    <div class="d-flex justify-content-center col-div-2 mt-2">
       
  //   <h1 class="mb-0 fw-bold" style="font-size:2rem;height: 40px">${val.show_number.replace(
  //     "<strong>",
  //     "<strong style='color: #9e48cd'>"
  //   )}</h1>
    
       
  //    </div>
    
  //   <div class="d-flex justify-content-center col-div-3 py-1">
  //   Total-<strong class="mx-2">${
  //     val.sum_total
  //   }</strong> | Sum-<strong class="mx-2">${
  //       val.first_sum
  //     }</strong> | <span class="mx-1">${
  //       val.number_status
  //     }</span> | <a href="./vipNumber" class="ms-1" style="font-size:10px;"><span>SIMILAR NUMBERS</span></a>
  //   </div>
    
  //   <div class="d-flex justify-content-center align-items-center card-icon-cont py-3">
  
  //  <h4 class="mb-0 fw-bold"><s>${init}</s> ₹${final_price}</h4><div class="vl mx-1"></div><button onclick="cart(${
  //       val.product_id
  //     })" class=""><i class="fa-solid fa-cart-shopping"></i></button>
   
  //   <div class="vl mx-1"></div>
  //   <button class="py-2" onclick=window.location.href="./Detail?product=${
  //     val.product_id
  //   }"><i class="fa-solid fa-circle-info d-block"></i></button>
  //    <div class="vl mx-1"></div>
  //   <button onclick="buyNow(${val.product_id})">BUY</button> 
    
    
  //   </div>
  //   </div>
  //   `;
  dov.innerHTML = `
<div class="color-on" style="height:153px;background:white;border-radius: 20px;box-shadow: 0px 0px 19px #dfdfdfdd, 0px 0px 15px #dfdfdfdd;">
      <div style="position: relative;">
        <div style="font-weight:400;font-size:1.6rem;margin:auto auto auto 1.7rem;padding-top:1.3rem;">${
          val.show_number
        }</div>
        
        <div style="font-size:0.9rem;margin:auto auto auto 2.3rem;">Total-${
          val.sum_total
        } | Sum-${val.first_sum}</div>
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
        <i id='${val.product_id}' onclick="addToWishlist(${
        val.product_id
      });changeColor('${
        val.product_id
      }')" class="bookmark-icon fa-duotone fa-circle-heart ${
        localStorage.getItem("user") && val.wishlists.length && `active`
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
          val.product_id
        })"><i class="fa-light fa-cart-shopping" style="font-size:.8rem"></i></button>
               
              <button style="width:75px; height:30px; font-size:.8rem;z-index: 5;background: #FFDE59;border:none;border-radius: 2px;box-shadow: 2px 2px 8px #d8d8d8, -2px -2px 8px #d8d8d8;color:#000;margin-left:7px;"  onclick="buyNow(${
                val.product_id
              })">BUY NOW</button> 
        </div>
      </div>
<div>
`;
      item.appendChild(dov);
    });
  });
};
FetchHome2();

// Home card Mobile
const FetchHomeMobile = async () => {
  var myHeaders = new Headers();
  localStorage.getItem("user") &&
    myHeaders.append("token", localStorage.getItem("user"));
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch(
    config.backendEndpoint + "/fetch_favourite_products/1",
    requestOptions
  );
  const data = await response.json();
  HomeCardData = data.data;
  HomeCardData.length = 12;
  cardSm.map((item) => {
    HomeCardData.forEach((val) => {
      let dov = document.createElement("div");
      let num = val.number.toString();
      let rating = "";
      for (let index = 0; index < Math.ceil(val.vendor?.rating); index++) {
        rating += ' <i class="fa-solid fa-star"></i>';
      }
      var init = "";
      var final_price = val.price;
      if (val.flat_discount && parseInt(val.flat_discount) > 0) {
        init = "₹" + val.price;
        final_price = parseInt(val.price) - parseInt(val.flat_discount);
      } else if (val.discount_percent && parseInt(val.discount_percent) > 0) {
        init = "₹" + val.price;
        var numVal1 = Number(val.price);
        var numVal2 = Number(val.discount_percent) / 100;
        final_price = numVal1 - numVal1 * numVal2;
      }
      dov.classList.add("col-12", "col-md-6", "col-18", "pull-up");
      //       dov.innerHTML = `  <div style="border-top-left-radius:10px;border-top-right-radius:10px;background: linear-gradient(40deg, #F9C835 20%, #f9c935 51%, #F9C835 90%);">
      //     <div class="d-flex justify-content-between align-items-center col-div px-2 ">
      //     <div class="d-inline-flex">
      //     ${rating}
      //     </div>
      //     <button class="btn-card-heart"><i id='${
      //       val.product_id + "_mob"
      //     }' onclick="addToWishlist(${val.product_id}); changeColor('${
      //         val.product_id
      //       }')" class="fa-solid fa-heart ${
      //         localStorage.getItem("user") && val?.wishlists[0]?.class
      //       }"></i></button>
      //   </div>
      //       </div>
      // <div class="d-flex flex-column bg-cont">

      // <div class="d-flex flex-column align-items-center col-div-2 mt-1">

      // <h1 class="fw-bold" style='height: 35px'>${val.show_number.replace(
      //         "<strong>",
      //         "<strong style='color: #9e48cd'>"
      //       )}</span></h1>
      // </div>

      // <div class="d-flex justify-content-center col-div-3 py-1">
      // <span style="font-size:.8rem;">Total -<strong class="mx-1">${
      //         val.sum_total
      //       } | </strong> </span>
      // <span style="font-size:.8rem"> Sum - <strong class="mx-1">${
      //         val.first_sum
      //       } |</strong>  </span>
      // <span class="mx-1" style="font-size:.8rem">${val.number_status} |</span>
      // <a href="./vipNumber" class="ms-1"style="font-size:.8rem"><span>SIMILAR NUMBERS</span></a>
      // </div>

      // <div class="d-flex justify-content-center align-items-center card-icon-cont py-2 py-md-3">

      // <h6 class="mb-0 fw-bold" style="font-size:1.2rem"><s>${init}</s> ₹${final_price}</h6>
      // <div class="vl mx-1"></div>
      // <button style="width:30px;height:30px" onclick="cart(${
      //         val.product_id
      //       })"><i class="fa-light fa-cart-shopping" style="font-size:.8rem"></i></button>
      //      <div class="vl mx-1"></div>
      //     <button class="py-2" onclick=window.location.href="./Detail?product=${
      //       val.product_id
      //     }" style="width:30px; height:30px;"><i class="fa-solid fa-circle-info d-block" style="font-size:1rem"></i></button>
      //      <div class="vl mx-1"></div>
      //     <button style="width:60px; height:30px; font-size:.8rem"  onclick="buyNow(${
      //       val.product_id
      //     })">BUY</button>

      // </div>
      // </div>
      // </div>
      //     `;
      dov.innerHTML = `
      <div class="color-on" style="margin-bottom:8px;height:153px;background:white;border-radius: 20px;box-shadow: 0px 0px 19px #dfdfdfdd, 0px 0px 15px #dfdfdfdd;">
            <div style="position: relative;">
              <div style="font-weight:400;font-size:1.6rem;margin:auto auto auto 1.7rem;padding-top:1.3rem;">${
                val.show_number
              }</div>
              
              <div style="font-size:0.9rem;margin:auto auto auto 2.3rem;">Total-${
                val.sum_total
              } | Sum-${val.first_sum}</div>
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
              <i id='${val.product_id + "_mob"}' onclick="addToWishlist(${
              val.product_id 
            });changeColor('${
              val.product_id
            }')" class="bookmark-icon fa-duotone fa-circle-heart ${
              localStorage.getItem("user") && val.wishlists.length && `active`
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
};
FetchHomeMobile();
//Home card Mobile 2
const FetchHomeMobile2 = async () => {
  var myHeaders = new Headers();
  localStorage.getItem("user") &&
    myHeaders.append("token", localStorage.getItem("user"));
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch(
    config.backendEndpoint + "/fetch_all_latest_products/1",
    requestOptions
  );
  const data = await response.json();
  HomeCardData = data.data;
  HomeCardData.length = 12;
  VipSmCard.map((item) => {
    HomeCardData.forEach((val) => {
      let dov = document.createElement("div");
      let num = val.number.toString();
      let rating = "";
      for (let index = 0; index < Math.ceil(val.vendor?.rating); index++) {
        rating += ' <i class="fa-solid fa-star"></i>';
      }
      var init = "";
      var final_price = val.price;
      if (val.flat_discount && parseInt(val.flat_discount) > 0) {
        init = "₹" + val.price;
        final_price = parseInt(val.price) - parseInt(val.flat_discount);
      } else if (val.discount_percent && parseInt(val.discount_percent) > 0) {
        init = "₹" + val.price;
        var numVal1 = Number(val.price);
        var numVal2 = Number(val.discount_percent) / 100;
        final_price = numVal1 - numVal1 * numVal2;
      }
      dov.classList.add("col-12", "col-md-6", "col-18", "pull-up");
//       dov.innerHTML = `  <div style="border-top-left-radius:10px;border-top-right-radius:10px;background: linear-gradient(40deg, #F9C835 20%, #f9c935 51%, #F9C835 90%);">
//     <div class="d-flex justify-content-between align-items-center col-div px-2 ">
//     <div class="d-inline-flex">
//    ${rating}
//     </div>
//     <button class="btn-card-heart"><i id='${
//       val.product_id + "_mob"
//     }' onclick="addToWishlist(${val.product_id}); changeColor('${
//         val.product_id
//       }')" class="fa-solid fa-heart ${
//         localStorage.getItem("user") && val?.wishlists[0]?.class
//       }"></i></button>
//   </div>
//       </div>
// <div class="d-flex flex-column bg-cont">
 
// <div class="d-flex flex-column align-items-center col-div-2 mt-1">
   
// <h1 class="fw-bold" style='height: 35px'>${val.show_number.replace(
//         "<strong>",
//         "<strong style='color: #9e48cd'>"
//       )}</span></h1>
// </div>

// <div class="d-flex justify-content-center col-div-3 py-1">
// <span style="font-size:.8rem;">Total -<strong class="mx-1">${
//         val.sum_total
//       } | </strong> </span> 
// <span style="font-size:.8rem"> Sum - <strong class="mx-1">${
//         val.first_sum
//       } |</strong>  </span> 
// <span class="mx-1" style="font-size:.8rem">${val.number_status} |</span> 
// <a href="./vipNumber" class="ms-1"style="font-size:.8rem"><span>SIMILAR NUMBERS</span></a>
// </div>

// <div class="d-flex justify-content-center align-items-center card-icon-cont py-2 py-md-3">

// <h6 class="mb-0 fw-bold" style="font-size:1.2rem"><s>${init}</s> ₹${final_price}</h6>
// <div class="vl mx-1"></div>
// <button style="width:30px;height:30px" onclick="cart(${
//         val.product_id
//       })"><i class="fa-light fa-cart-shopping" style="font-size:.8rem"></i></button>
//      <div class="vl mx-1"></div>
//     <button class="py-2" onclick=window.location.href="./Detail?product=${
//       val.product_id
//     }" style="width:30px; height:30px;"><i class="fa-solid fa-circle-info d-block" style="font-size:1rem"></i></button>
//      <div class="vl mx-1"></div>
//     <button style="width:60px; height:30px; font-size:.8rem" onclick="buyNow(${
//       val.product_id
//     })">BUY</button> 
    
// </div>
// </div>
// </div>
//     `;
dov.innerHTML = `
<div class="color-on" style="margin-bottom:8px;height:153px;background:white;border-radius: 20px;box-shadow: 0px 0px 19px #dfdfdfdd, 0px 0px 15px #dfdfdfdd;">
      <div style="position: relative;">
        <div style="font-weight:400;font-size:1.6rem;margin:auto auto auto 1.7rem;padding-top:1.3rem;">${
          val.show_number
        }</div>
        
        <div style="font-size:0.9rem;margin:auto auto auto 2.3rem;">Total-${
          val.sum_total
        } | Sum-${val.first_sum}</div>
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
        <i id='${val.product_id + "_mob"}' onclick="addToWishlist(${
          val.product_id
        });changeColor('${
          val.product_id
        }')" class="bookmark-icon fa-duotone fa-circle-heart ${
          localStorage.getItem("user") && val.wishlists.length && `active`
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
          val.product_id
        })"><i class="fa-light fa-cart-shopping" style="font-size:.8rem"></i></button>
               
              <button style="width:75px; height:30px; font-size:.8rem;z-index: 5;background: #FFDE59;border:none;border-radius: 2px;box-shadow: 2px 2px 8px #d8d8d8, -2px -2px 8px #d8d8d8;color:#000;margin-left:7px;"  onclick="buyNow(${
                val.product_id
              })">BUY NOW</button> 
        </div>
      </div>
<div>
`;
      item.appendChild(dov);
    });
  });
};
FetchHomeMobile2();

// function to add card to wish list
let btnHeartArr = document.querySelectorAll(".btn-card-heart");
let bool1 = false;
console.log(bool1);
Array.from(btnHeartArr).forEach((link) => {
  link.addEventListener("click", function (event) {
    if (!bool1) {
      event.target.style.color = "red";
      bool1 = true;
      console.log(bool1);
    } else {
      event.target.style.color = "white";
      bool1 = false;
      console.log(bool1);
    }
  });
});
