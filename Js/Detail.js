//scripts to fetch data from backend Desktop
import config from "../conf/index.js";
let detailArr = document.querySelector(".detail-row");
let detailData;
const id = window.location.search;
let url = config.backendEndpoint + `/fetch_single_product${id}`;
var myHeaders = new Headers();
localStorage.getItem("user") &&
  myHeaders.append("token", localStorage.getItem("user"));
var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};
const FetchProductData = async () => {
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  detailData = data.data;
  let num = detailData.number.toString();
  let rating = "";
  for (let index = 0; index < Math.ceil(detailData.vendor?.rating); index++) {
    rating += ' <i class="fa-solid fa-star"></i>';
  }
  detailArr.innerHTML = `
   <div class="col-xl-4 col-lg-4">
             <div class="number-card">
              <div style="border-radius:10px;background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% );border:1.5px solid #e6e6e6;box-shadow:0 0 10px grey;">
         <div class="d-flex justify-content-between align-items-center col-div px-2 py-1 ">
            
             <div class="d-inline-flex">${rating}</div>
             <button  onclick="addToWishlist(${
               detailData.product_id
             }); changeColor('${
    detailData.product_id
  }')" class="btn-card-heart"><i id='${
    detailData.product_id
  }' class="fa-solid fa-heart ${
    localStorage.getItem("user") && detailData?.wishlists[0]?.class
  }"></i></button>
           </div>
     <div class="d-flex flex-column bg-cont">
      
     
    
     <div class="d-flex justify-content-center col-div-2 mt-2">
       
    <h1 class="mb-0 fw-bold" style="font-size:2rem;height: 40px">${detailData.show_number.replace(
      "<strong>",
      "<strong style='color: #9e48cd'>"
    )}</span></h1>
    
       
     </div>
    
    <div class="d-flex justify-content-center col-div-3 py-1">
    Total-<strong class="mx-2">${
      detailData.sum_total
    }</strong> | Sum-<strong class="mx-2">${
    detailData.first_sum
  }</strong> | <span class="mx-1">${
    detailData.number_status
  }</span> | <a href="./vipNumber" class="ms-1" style="font-size:10px;"><span>SIMILAR NUMBERS</span></a>
    </div>
    
    <div class="d-flex justify-content-center align-items-center card-icon-cont py-3">
  
   <h4 class="mb-0 fw-bold">₹${
     detailData.price
   }</h4><div class="vl mx-1"></div><button onclick="cart(${
    detailData.product_id
  })" class=""><i class="fa-solid fa-cart-shopping"></i></button>
   
    <div class="vl mx-1"></div>
    <button onclick="buyNow(${detailData.product_id})">BUY</button> 
    
    
    </div>
    </div>
             </div>
             </div>
            </div>
            <div class="col-xl-4 col-lg-4">
              <h2 class="detial-title">Number Details</h2>
              <div class="number-details">
                <h3 style="font-size: 1.2rem; font-weight: bold">
                  Number :<span style="font-weight: lighter; margin-left: 4px"
                    >${detailData.number}</span
                  >
                </h3>
                <h3 style="font-size: 1.2rem; font-weight: bold">
                  Number status :<span
                    style="font-weight: lighter; margin-left: 4px"
                    >${detailData.number_status}</span
                  >
                </h3>
                <h3 style="font-size: 1.2rem; font-weight: bold">
                  Number Type:<span
                    style="font-weight: lighter; margin-left: 4px"
                    >Prepaid</span
                  >
                </h3>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4">
              <h2
                style="
                  font-weight: bold;
                  text-transform: capitalize;
                  font-size: 1.4rem;
                  font-family: 'Poppins';
                "
              >
                Share Number with Friends
              </h2>
              <div
                class="d-flex justify-content-start align-items-center flex-row"
              >
                <a href="whatsapp://send/?phone=+91%2077100%2067100&text=Hi!"
                  class="btn btn-primary mx-2"
                  style="background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% ); border-color: #bf68e6; box-shadow: none;"
                >
                  <i class="fa-brands fa-whatsapp"></i>
                </a>
                <a href="https://www.facebook.com/ViP-Number-Club-633811640408412/"
                  class="btn btn-primary mx-2"
                  style="background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% ); border-color: #bf68e6;box-shadow: none;"
                >
                  <i class="fa-brands fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com/VipNumberClub?t=kisV3II8-mVLAmLC68jfyw&s=08"
                  class="btn btn-primary mx-2"
                  style="background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% ); border-color: #bf68e6;box-shadow: none;"
                >
                  <i class="fa-brands fa-twitter"></i>
                </a>
                <a href="https://www.instagram.com/vipnumberclub/"
                  class="btn btn-primary mx-2"
                  style="background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% ); border-color: #bf68e6;box-shadow: none;"
                >
                  <i class="fa-brands fa-instagram"></i>
                </a>
                 <a href="https://www.snapchat.com/add/vipnumberclub?share_id=wj4CI44_FvE&locale=en-IN"
                  class="btn btn-primary mx-2"
                  style="background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% ); border-color: #bf68e6;box-shadow: none;"
                >
                  <i class="fa-brands fa-snapchat"></i>
                </a>
              </div>
            </div>
  `;
};
FetchProductData();

//scripts to fetch data from backend end Desktop
// script to fetch data from backend mobile-->

let detailArrSm = document.querySelector(".detail-mobile");
let detailDataSm;
const idSm = window.location.search;
let urlSm = config.backendEndpoint + `/fetch_single_product${idSm}`;
const FetchProductDataSm = async () => {
  const response = await fetch(urlSm, requestOptions);
  const data = await response.json();
  detailDataSm = data.data;
  let rating = "";
  for (let index = 0; index < Math.ceil(detailData.vendor?.rating); index++) {
    rating += ' <i class="fa-solid fa-star"></i>';
  }
  let num = detailDataSm.number.toString();

  detailArrSm.innerHTML = `<div class="number-card m-2">
              <div style="border-radius:10px;background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% );border:1.5px solid #e6e6e6;box-shadow:0 0 10px grey;">
         <div class="d-flex justify-content-between align-items-center col-div px-2 py-1 ">
             <div class="d-inline-flex">${rating}</div>
             <button class="btn-card-heart"><i onclick="addToWishlist(${
               detailDataSm.product_id
             }); changeColor('${detailDataSm.product_id}')" id='${
    detailDataSm.product_id + "_mob"
  }' class="fa-solid fa-heart ${
    localStorage.getItem("user") && detailDataSm?.wishlists[0]?.class
  }"></i></button>
           </div>
     <div class="d-flex flex-column bg-cont">
      
     
    
     <div class="d-flex justify-content-center col-div-2 mt-2">
       
    <h1 class="mb-0 fw-bold" style="font-size:2rem;height: 40px">${detailDataSm.show_number.replace(
      "<strong>",
      "<strong style='color: #9e48cd'>"
    )}</h1>
    
       
     </div>
    
    <div class="d-flex justify-content-center col-div-3 py-1" style="font-size:13px ;">
    Total-<strong class="mx-2">${
      detailDataSm.sum_total
    }</strong> | Sum-<strong class="mx-2">${
    detailDataSm.first_sum
  }</strong> | <span class="mx-1">${
    detailDataSm.number_status
  }</span> | <a href="./vipNumber" class="ms-1" style="font-size:13px;"><span>SIMILAR NUMBERS</span></a>
    </div>
    
    <div class="d-flex justify-content-center align-items-center card-icon-cont py-2 py-md-3">
  
   <h4 class="mb-0 fw-bold" style="font-size: 1.2rem;">₹${
     detailDataSm.price
   }</h4>
   <div class="vl mx-1"></div><button onclick="cart(${
     detailDataSm.product_id
   })" style="width:30px; height:30px"><i class="fa-solid fa-cart-shopping" style="font-size:.8rem;"></i></button>
   
    <div class="vl mx-1"></div>
    <button style="width: 60px; height:30px"  onclick="buyNow(${
      detailDataSm.product_id
    })">BUY</button> 
    
    
    </div>
    </div>
             </div>
             </div>
        <div class="d-flex flex-column m-2 pt-3">
          <h2 class="detial-title">Number Details</h2>
          <div class="number-details">
            <h3 style="font-size: 1rem; font-weight: bold">
              Number :<span style="font-weight: lighter; margin-left: 4px"
                >${detailDataSm.number}</span
              >
            </h3>
            <h3 style="font-size: 1rem; font-weight: bold">
              Number status :<span
                style="font-weight: lighter; margin-left: 4px"
                >${detailDataSm.number_status}</span
              >
            </h3>
            <h3 style="font-size: 1rem; font-weight: bold">
              Number Type:<span style="font-weight: lighter; margin-left: 4px"
                >Prepaid</span
              >
            </h3>
          </div>
        </div>
        <div class="d-flex flex-column m-2 pt-3">
          <h2
            style="
              font-weight: bold;
              text-transform: capitalize;
              font-size: 1.4rem;
            "
          >
            Share Number with Friends
          </h2>
          <div class="d-flex justify-content-start align-items-center flex-row">
            <a href="whatsapp://send/?phone=+91%2077100%2067100&text=http://127.0.0.1:5500/Detail.html!" data-action="share/whatsapp/share"  
              class="btn btn-primary mx-2"
              style="background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% ); border-color: #bf68e6;box-shadow: none;"
            >
              <i class="fa-brands fa-whatsapp"></i>
            </a>
            <a href="https://www.facebook.com/ViP-Number-Club-633811640408412/"
              class="btn btn-primary mx-2"
              style="background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% ); border-color: #bf68e6;box-shadow: none;"
            >
              <i class="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/VipNumberClub?t=kisV3II8-mVLAmLC68jfyw&s=08"
              class="btn btn-primary mx-2"
              style="background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% ); border-color: #bf68e6;box-shadow: none;"
            >
              <i class="fa-brands fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com/vipnumberclub/"
              class="btn btn-primary mx-2"
              style="background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% ); border-color: #bf68e6;box-shadow: none;"
            >
              <i class="fa-brands fa-instagram"></i>
            </a>
              <a href="https://www.snapchat.com/add/vipnumberclub?share_id=wj4CI44_FvE&locale=en-IN"
                  class="btn btn-primary mx-2"
                  style="background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% ); border-color: #bf68e6;box-shadow: none;"
                >
                  <i class="fa-brands fa-snapchat"></i>
                </a>
          </div>
        </div>
 `;
};
FetchProductDataSm();
// script to fetch data from backend end mobile

// script to fetch similar type of number
let simUrl = config.backendEndpoint + `/fetch_similar_numbers/1${id}`;
var CarouselData;
const FetchCarouselData = async () => {
  const response = await fetch(simUrl, requestOptions);
  const data = await response.json();
  CarouselData = data.data;
  CarouselData.length = 12;
  console.log(CarouselData);
};
FetchCarouselData();
let cardArr = document.querySelectorAll(".card-row"); // dream number desktop
let cardArr2 = document.querySelectorAll(".card-Vip-row"); // latest and updated stock desktop

const card = [...cardArr]; // dream number desktop
const cardVip2 = [...cardArr2]; //latest and updated stock desktop
//------------------------------------------------------------------//
let HomeCardData;
// Home card Desktop
const FetchHome = async () => {
  const response = await fetch(
    config.backendEndpoint + "/fetch_similar_numbers/1" + id,
    requestOptions
  );
  const data = await response.json();
  HomeCardData = data.data;
  HomeCardData.length = 12;
  card.map((item) => {
    HomeCardData.forEach((val) => {
      let rating = "";
      for (let index = 0; index < Math.ceil(val.vendor?.rating); index++) {
        rating += ' <i class="fa-solid fa-star"></i>';
      }
      let dov = document.createElement("div");
      let num = val.number.toString();

      dov.classList.add(
        "col-xl-3",
        "col-lg-3",
        "col-md-3",
        "col-18",
        "pull-up"
      );
      dov.innerHTML = `<div style="border-radius:10px;background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% );border:1.5px solid #e6e6e6;box-shadow:0 0 10px grey;">
         <div class="d-flex justify-content-between align-items-center col-div px-2 py-1 ">
            
             <div class="d-inline-flex">${rating}</div>
             <button class="btn-card-heart"><i onclick="addToWishlist(${
               val.product_id
             }); changeColor('${val.product_id}')" id='${
        val.product_id
      }' class="fa-solid fa-heart ${
        localStorage.getItem("user") && val?.wishlists[0]?.class
      }"></i></button>
           </div>
     <div class="d-flex flex-column bg-cont">  
    
     <div class="d-flex justify-content-center col-div-2 mt-2">
       
    <h1 class="mb-0 fw-bold" style="font-size:2rem;height: 40px">${val.show_number.replace(
      "<strong>",
      "<strong style='color: #9e48cd'>"
    )}</span></h1>
    
       
     </div>
    
    <div class="d-flex justify-content-center col-div-3 py-1">
    Total-<strong class="mx-2">${
      val.sum_total
    }</strong> | Sum-<strong class="mx-2">${
        val.first_sum
      }</strong> | <span class="mx-1">${
        val.number_status
      }</span> | <a href="./vipNumber" class="ms-1" style="font-size:10px;"><span>SIMILAR NUMBERS</span></a>
    </div>
    
    <div class="d-flex justify-content-center align-items-center card-icon-cont py-3">
  
   <h4 class="mb-0 fw-bold">₹${val.price}</h4><div class="vl mx-1"></div>
   <button class="" onclick="cart(${
     val.product_id
   })"><i class="fa-solid fa-cart-shopping"></i></button>
   
    <div class="vl mx-1"></div>
    <button class="py-2"onclick=window.location.href="./Detail?product=${
      val.product_id
    }"><i class="fa-solid fa-circle-info d-block"></i></button>
     <div class="vl mx-1"></div>
    <button onclick="buyNow(${val.product_id})">BUY</button> 
    
    
    </div>
    </div>
    `;
      item.appendChild(dov);
    });
  });
};
FetchHome();
// Home card Desktop 2
const FetchHome2 = async () => {
  const response = await fetch(
    config.backendEndpoint + "/fetch_similar_numbers/1" + id,
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
      dov.classList.add(
        "col-xl-3",
        "col-lg-3",
        "col-md-3",
        "col-18",
        "pull-up"
      );
      dov.innerHTML = `<div style="border-radius:10px;background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% );border:1.5px solid #e6e6e6;box-shadow:0 0 10px grey;">
         <div class="d-flex justify-content-between align-items-center col-div px-2 py-1 ">
            
             <div class="d-inline-flex">${rating}</div>
             <button class="btn-card-heart"><i onclick="addToWishlist(${
               val.product_id
             }); changeColor('${val.product_id}')" id='${
        val.product_id + "_mob"
      }' class="fa-solid fa-heart ${
        localStorage.getItem("user") && val?.wishlists[0]?.class
      }"></i></button>
           </div>
     <div class="d-flex flex-column bg-cont">
      
     
    
     <div class="d-flex justify-content-center col-div-2 mt-2">
       
    <h1 class="mb-0 fw-bold" style="font-size:2rem;height: 40px">${val.show_number.replace(
      "<strong>",
      "<strong style='color: #9e48cd'>"
    )}</span></h1>
    
       
     </div>
    
    <div class="d-flex justify-content-center col-div-3 py-1">
    Total-<strong class="mx-2">${
      val.sum_total
    }</strong> | Sum-<strong class="mx-2">${
        val.first_sum
      }</strong> | <span class="mx-1">${
        val.number_status
      }</span> | <a href="./vipNumber" class="ms-1" style="font-size:10px;"><span>SIMILAR NUMBERS</span></a>
    </div>
    
    <div class="d-flex justify-content-center align-items-center card-icon-cont py-3">
  
   <h4 class="mb-0 fw-bold">₹${
     val.price
   }</h4><div class="vl mx-1"></div><button onclick="cart(${
        val.product_id
      })" class=""><i class="fa-solid fa-cart-shopping"></i></button>
   
    <div class="vl mx-1"></div>
    <button class="py-2" onclick=window.location.href="./Detail?product=${
      val.product_id
    }"><i class="fa-solid fa-circle-info d-block"></i></button>
     <div class="vl mx-1"></div>
    <button onclick="buyNow(${val.product_id})">BUY</button> 
    
    
    </div>
    </div>
    `;
      item.appendChild(dov);
    });
  });
};
FetchHome2();
