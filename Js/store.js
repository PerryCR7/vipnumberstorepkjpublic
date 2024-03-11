import config from "../conf/index.js";
let cardArr2 = document.querySelectorAll(".card-vip-row"); // store desktop
const card2 = [...cardArr2]; // store desktop
let cardVip = document.querySelectorAll(".card-vipSm-row"); // store mobile
const VipSmCard = [...cardVip]; // store mobile
let FilterCategories = document.querySelector(".FilterCategories");
let more = document.querySelector(".more");
// filter form desktop
let filterForm = document.querySelector(".filter-form");
filterForm.addEventListener("click", (e) => {
  e.preventDefault();
});
// filter form Mobile
let filterFormMobile = document.querySelector(".filterMobile");
filterFormMobile.addEventListener("click", (e) => {
  e.preventDefault();
});
// fatch category data Desktop
window.Check = async function (id) {
  const response = await fetch(
    config.backendEndpoint + `/fetch_single_category/1?category=${id}`
  );
  const data = await response.json();
  if (data.status == "error") {
    cardArr2[0].innerHTML = `<h1>${data.msg}<h1/>`;
  } else {
    const categoryData = data.data;
    cardArr2[0].innerHTML = "";
    let newData = categoryData.map((item) => {
      const {
        price,
        sum_total,
        first_sum,
        number_status,
        number,
        product_id,
        discount_percent,
        flat_discount,
      } = item;
      var init = "";
      var final_price = price;
      if (flat_discount && parseInt(flat_discount) > 0) {
        init = "₹" + price;
        final_price = parseInt(price) - parseInt(val.flat_discount);
      } else if (discount_percent && parseInt(discount_percent) > 0) {
        init = "₹" + price;
        var numVal1 = Number(price);
        var numVal2 = Number(discount_percent) / 100;
        final_price = numVal1 - numVal1 * numVal2;
      }
      const first3 = number.slice(0, 2);
      const reamaning = number.slice(2, 6);
      const last = number.slice(6, 10);
      return `<div class="col-xl-4 col-lg-4 col-md-4 col-18 pull-up">
      <div
        style="
          border-radius: 10px;
          background: linear-gradient(
            40deg,
            #bf68e6 20%,
            #9e48cd 51%,
            #bf68e6 90%
          );
          border: 1.5px solid #e6e6e6;
          box-shadow: 0 0 10px grey;
        "
      >
        <div
          class="d-flex justify-content-between align-items-center col-div px-2 py-1"
        >
          <div class="d-inline-flex">
            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i
            ><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i
            ><i class="fa-solid fa-star"></i>
          </div>
          <button class="btn-card-heart">
            <i class="fa-solid fa-heart"  onclick="addToWishlist(${product_id})"></i>
          </button>
        </div>
        <div class="d-flex flex-column bg-cont">
          <div class="d-flex justify-content-center col-div-2 mt-2">
            <h1 class="mb-0 fw-bold" style="font-size: 2rem">
              ${first3}-<span style="color: #9e48cd">${reamaning}-${last}</span>
            </h1>
          </div>

          <div class="d-flex justify-content-center col-div-3 py-1">
            Total-<strong class="mx-2">${sum_total}</strong> | Sum-<strong
              class="mx-2"
              >${first_sum}</strong
            >
            | <span class="mx-1">${number_status}</span> |
            <a href="./vipNumber" class="ms-1" style="font-size: 10px"
              ><span>SIMILAR NUMBERS</span></a
            >
          </div>

          <div
            class="d-flex justify-content-center align-items-center card-icon-cont py-3"
          >
            <h4 class="mb-0 fw-bold"><s>${init}</s> ₹${final_price}</h4>
            <div class="vl mx-1"></div>
            <button class=""><i class="fa-solid fa-cart-shopping" onclick="cart(${product_id})"></i></button>

            <div class="vl mx-1"></div>
            <button
              class="py-2"
              onclick="window.location.href"
              ="./Detail?product=${product_id}"
            >
              <i class="fa-solid fa-circle-info d-block"></i>
            </button>
            <div class="vl mx-1"></div>
            <button  onclick="buyNow(${product_id})">BUY</button>
          </div>
        </div>
      </div>
    </div>
    `;
    });
    newData = newData.join("");
    cardArr2[0].innerHTML = newData;
    more.removeEventListener("click", Increment);
  }
};
// fetch category data mobile
window.CategoryMobile = async function () {
  let id = FilterCategories.selectedIndex + 1;
  const response = await fetch(
    config.backendEndpoint + `/fetch_single_category/1?category=${id}`
  );
  const data = await response.json();
  const categoryData = data.data;
  cardVip[0].innerHTML = "";
  let newData = categoryData.map((item) => {
    const {
      price,
      sum_total,
      first_sum,
      number_status,
      number,
      product_id,
      flat_discount,
      discount_percent,
    } = item;
    var init = "";
    var final_price = price;
    if (flat_discount && parseInt(flat_discount) > 0) {
      init = "₹" + price;
      final_price = parseInt(price) - parseInt(val.flat_discount);
    } else if (discount_percent && parseInt(discount_percent) > 0) {
      init = "₹" + price;
      var numVal1 = Number(price);
      var numVal2 = Number(discount_percent) / 100;
      final_price = numVal1 - numVal1 * numVal2;
    }
    const first3 = number.slice(0, 2);
    const reamaning = number.slice(2, 6);
    const last = number.slice(6, 10);
    return `
       <div class="col-6 col-md-6 col-18 pull-up">
      <div
        style="
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          background: linear-gradient(
            40deg,
            #bf68e6 20%,
            #9e48cd 51%,
            #bf68e6 90%
          );
        "
      >
        <div
          class="d-flex justify-content-between align-items-center col-div px-2"
        >
          <div class="d-inline-flex">
            <i class="fa-solid fa-star" style="font-size: 12px"></i>
            <i class="fa-solid fa-star" style="font-size: 12px"></i>
            <i class="fa-solid fa-star" style="font-size: 12px"></i>
            <i class="fa-solid fa-star" style="font-size: 12px"></i>
            <i class="fa-solid fa-star" style="font-size: 12px"></i>
          </div>
          <button class="btn-card-heart">
            <i class="fa-solid fa-heart"  onclick="addToWishlist(${product_id})"></i>
          </button>
        </div>
      </div>
      <div class="d-flex flex-column bg-cont">
        <div class="d-flex flex-column align-items-center col-div-2 mt-1">
          <h1 class="mb-0 fw-bold">
            ${first3}-<span style="color: #9e48cd">${reamaning}-${last}</span>
          </h1>
        </div>

        <div class="d-flex justify-content-center col-div-3 py-1">
          Total- <strong class="mx-1">${sum_total}</strong> | Sum-
          <strong class="mx-1">${first_sum}</strong> |
          <span class="mx-1">${number_status}</span> |
          <a href="./vipNumber" class="ms-1"
            ><span>SIMILAR NUMBERS</span></a
          >
        </div>

        <div
          class="d-flex justify-content-center align-items-center card-icon-cont py-2 py-md-3"
        >
          <h6 class="mb-0 fw-bold" style="font-size: 12px"><s>${init}</s> ₹${final_price}</h6>
          <div class="vl mx-1"></div>
          <button class=""><i class="fa-solid fa-cart-shopping" onclick="cart(${product_id})"></i></button>

          <div class="vl mx-1"></div>
          <button
            class="py-2"
            onclick="window.location.href"
            ="./Detail?product=${product_id}"
          >
            <i class="fa-solid fa-solid fa-circle-info d-block"></i>
          </button>
          <div class="vl mx-1"></div>
          <button onclick="buyNow(${product_id})">BUY</button>
        </div>
      </div>
    </div>
      `;
  });
  newData = newData.join("");
  cardVip[0].innerHTML = newData;
  moreSm.removeEventListener("click", IncrementMobile);
  moreSm.addEventListener("click", () => {
    console.log(id);
  });
};

// sum total search Desktop
let sumTotal = document.querySelector(".sumtotal");
window.SumToTal = async () => {
  let num = sumTotal.value;
  const response = await fetch(
    config.backendEndpoint + `/search_products/1?sum_total=${num}`
  );
  const data = await response.json();
  if (data.status === "failure") {
    cardArr2[0].innerHTML = `<h1>${data.msg}</h1>`;
  } else {
    let sumData = data.data;
    cardArr2[0].innerHTML = "";
    let newData = sumData.map((item) => {
      const {
        price,
        sum_total,
        first_sum,
        number_status,
        number,
        product_id,
        flat_discount,
        discount_percent,
      } = item;
      var init = "";
      var final_price = price;
      if (flat_discount && parseInt(flat_discount) > 0) {
        init = "₹" + price;
        final_price = parseInt(price) - parseInt(val.flat_discount);
      } else if (discount_percent && parseInt(discount_percent) > 0) {
        init = "₹" + price;
        var numVal1 = Number(price);
        var numVal2 = Number(discount_percent) / 100;
        final_price = numVal1 - numVal1 * numVal2;
      }
      const first3 = number.slice(0, 2);
      const reamaning = number.slice(2, 6);
      const last = number.slice(6, 10);
      return `<div class="col-xl-4 col-lg-4 col-md-4 col-18 pull-up">
      <div
        style="
          border-radius: 10px;
          background: linear-gradient(
            40deg,
            #bf68e6 20%,
            #9e48cd 51%,
            #bf68e6 90%
          );
          border: 1.5px solid #e6e6e6;
          box-shadow: 0 0 10px grey;
        "
      >
        <div
          class="d-flex justify-content-between align-items-center col-div px-2 py-1"
        >
          <div class="d-inline-flex">
            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i
            ><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i
            ><i class="fa-solid fa-star"></i>
          </div>
          <button class="btn-card-heart">
            <i class="fa-solid fa-heart"  onclick="addToWishlist(${product_id})"></i>
          </button>
        </div>
        <div class="d-flex flex-column bg-cont">
          <div class="d-flex justify-content-center col-div-2 mt-2">
            <h1 class="mb-0 fw-bold" style="font-size: 2rem">
              ${first3}-<span style="color: #9e48cd">${reamaning}-${last}</span>
            </h1>
          </div>

          <div class="d-flex justify-content-center col-div-3 py-1">
            Total-<strong class="mx-2">${sum_total}</strong> | Sum-<strong
              class="mx-2"
              >${first_sum}</strong
            >
            | <span class="mx-1">${number_status}</span> |
            <a href="./vipNumber" class="ms-1" style="font-size: 10px"
              ><span>SIMILAR NUMBERS</span></a
            >
          </div>

          <div
            class="d-flex justify-content-center align-items-center card-icon-cont py-3"
          >
            <h4 class="mb-0 fw-bold"><s>${init}</s> ₹${final_price}</h4>
            <div class="vl mx-1"></div>
            <button class=""><i class="fa-solid fa-cart-shopping" onclick="cart(${product_id})"></i></button>

            <div class="vl mx-1"></div>
            <button
              class="py-2"
              onclick="window.location.href"
              ="./Detail?product=${product_id}"
            >
              <i class="fa-solid fa-circle-info d-block"></i>
            </button>
            <div class="vl mx-1"></div>
            <button onclick="buyNow(${product_id})">BUY</button>
          </div>
        </div>
      </div>
    </div>
    `;
    });
    newData = newData.join("");
    cardArr2[0].innerHTML = newData;
    more.removeEventListener("click", Increment);
    more.addEventListener("click", async () => {
      count = count + 1;
      let url =
        config.backendEndpoint + `/search_products/${count}?sum_total=${num}`;
      const response = await fetch(url);
      const data = await response.json();
      card2.map((item) => {
        data.data.forEach((val) => {
          let dov = document.createElement("div");
          dov.classList.add(
            "col-xl-4",
            "col-lg-4",
            "col-md-4",
            "col-18",
            "pull-up"
          );
          let num = val.number.toString();
          var init = "";
          var final_price = val.price;
          if (val.flat_discount && parseInt(val.flat_discount) > 0) {
            init = "₹" + val.price;
            final_price = parseInt(val.price) - parseInt(val.flat_discount);
          } else if (
            val.discount_percent &&
            parseInt(val.discount_percent) > 0
          ) {
            init = "₹" + val.price;
            var numVal1 = Number(val.price);
            var numVal2 = Number(val.discount_percent) / 100;
            final_price = numVal1 - numVal1 * numVal2;
          }
          const first3 = num.slice(0, 2);
          const reamaning = num.slice(2, 6);
          const last = num.slice(6, 10);
          dov.innerHTML = `<div style="border-radius:10px;background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% );border:1.5px solid #e6e6e6;box-shadow:0 0 10px grey;">
         <div class="d-flex justify-content-between align-items-center col-div px-2 py-1 ">
            
             <div class="d-inline-flex"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
             <button class="btn-card-heart"><i class="fa-solid fa-heart"  onclick="addToWishlist(${val.product_id})"></i></button>
           </div>
     <div class="d-flex flex-column bg-cont">
     <div class="d-flex justify-content-center col-div-2 mt-2">
       
    <h1 class="mb-0 fw-bold" style="font-size:2rem">${first3}-<span style="color:#9e48cd ;">${reamaning}-${last}</span></h1>
    
       
     </div>
    
    <div class="d-flex justify-content-center col-div-3 py-1">
    Total-<strong class="mx-2">${val.sum_total}</strong> | Sum-<strong class="mx-2">${val.first_sum}</strong> | <span class="mx-1">${val.number_status}</span> | <a href="./vipNumber" class="ms-1" style="font-size:10px;"><span>SIMILAR NUMBERS</span></a>
    </div>
    
    <div class="d-flex justify-content-center align-items-center card-icon-cont py-3">
  
   <h4 class="mb-0 fw-bold"> <s>${init}</s> ₹${final_price}</h4><div class="vl mx-1"></div><button class=""><i class="fa-solid fa-cart-shopping" onclick="cart(${val.product_id})"></i></button>
   
    <div class="vl mx-1"></div>
    <button class="py-2" onclick=window.location.href="./Detail?product=${val.product_id}"><i class="fa-solid fa-circle-info d-block"></i></button>
     <div class="vl mx-1"></div>
    <button  onclick="buyNow(${val.product_id})">BUY</button> 
    
    
    </div>
    </div>
    `;
          item.appendChild(dov);
        });
      });
    });
  }
};
// sum total mobile
let sumTotalMobile = document.querySelector(".sumotalMobile");
window.SumTotalMobile = async () => {
  let num = sumTotalMobile.value;
  const response = await fetch(
    config.backendEndpoint + `/search_products/1?sum_total=${num}`
  );
  const data = await response.json();
  if (data.status === "failure") {
    cardVip[0].innerHTML = `<h1>${data.msg}</h1>`;
  } else {
    let sumData = data.data;
    let newData = sumData.map((item) => {
      const {
        price,
        sum_total,
        first_sum,
        number_status,
        number,
        product_id,
        flat_discount,
        discount_percent,
      } = item;
      var init = "";
      var final_price = price;
      if (flat_discount && parseInt(flat_discount) > 0) {
        init = "₹" + price;
        final_price = parseInt(price) - parseInt(val.flat_discount);
      } else if (discount_percent && parseInt(discount_percent) > 0) {
        init = "₹" + price;
        var numVal1 = Number(price);
        var numVal2 = Number(discount_percent) / 100;
        final_price = numVal1 - numVal1 * numVal2;
      }
      const first3 = number.slice(0, 2);
      const reamaning = number.slice(2, 6);
      const last = number.slice(6, 10);
      return `
       <div class="col-6 col-md-6 col-18 pull-up">
      <div
        style="
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          background: linear-gradient(
            40deg,
            #bf68e6 20%,
            #9e48cd 51%,
            #bf68e6 90%
          );
        "
      >
        <div
          class="d-flex justify-content-between align-items-center col-div px-2"
        >
          <div class="d-inline-flex">
            <i class="fa-solid fa-star" style="font-size: 12px"></i>
            <i class="fa-solid fa-star" style="font-size: 12px"></i>
            <i class="fa-solid fa-star" style="font-size: 12px"></i>
            <i class="fa-solid fa-star" style="font-size: 12px"></i>
            <i class="fa-solid fa-star" style="font-size: 12px"></i>
          </div>
          <button class="btn-card-heart">
            <i class="fa-solid fa-heart"  onclick="addToWishlist(${product_id}})"></i>
          </button>
        </div>
      </div>
      <div class="d-flex flex-column bg-cont">
        <div class="d-flex flex-column align-items-center col-div-2 mt-1">
          <h1 class="mb-0 fw-bold">
            ${first3}-<span style="color: #9e48cd">${reamaning}-${last}</span>
          </h1>
        </div>

        <div class="d-flex justify-content-center col-div-3 py-1">
          Total- <strong class="mx-1">${sum_total}</strong> | Sum-
          <strong class="mx-1">${first_sum}</strong> |
          <span class="mx-1">${number_status}</span> |
          <a href="./vipNumber" class="ms-1"
            ><span>SIMILAR NUMBERS</span></a
          >
        </div>

        <div
          class="d-flex justify-content-center align-items-center card-icon-cont py-2 py-md-3"
        >
          <h6 class="mb-0 fw-bold" style="font-size: 12px"><s>${init}</s> ₹${final_price}</h6>
          <div class="vl mx-1"></div>
          <button class=""><i class="fa-solid fa-cart-shopping" onclick="cart(${product_id})"></i></button>

          <div class="vl mx-1"></div>
          <button
            class="py-2"
            onclick="window.location.href"
            ="./Detail?product=${product_id}"
          >
            <i class="fa-solid fa-solid fa-circle-info d-block"></i>
          </button>
          <div class="vl mx-1"></div>
          <button onclick="buyNow(${product_id})">BUY</button>
        </div>
      </div>
    </div>
      `;
    });
    newData = newData.join("");
    cardVip[0].innerHTML = newData;
    moreSm.removeEventListener("click", IncrementMobile);
    moreSm.addEventListener("click", async () => {
      count = count + 1;
      let url =
        config.backendEndpoint + `/search_products/${count}?sum_total=${num}`;
      const response = await fetch(url);
      const data = await response.json();
      VipSmCard.map((item) => {
        data.data.forEach((val) => {
          let dov = document.createElement("div");
          let num = val.number.toString();
          var init = "";
          var final_price = val.price;
          if (val.flat_discount && parseInt(val.flat_discount) > 0) {
            init = "₹" + val.price;
            final_price = parseInt(val.price) - parseInt(val.flat_discount);
          } else if (
            val.discount_percent &&
            parseInt(val.discount_percent) > 0
          ) {
            init = "₹" + val.price;
            var numVal1 = Number(val.price);
            var numVal2 = Number(val.discount_percent) / 100;
            final_price = numVal1 - numVal1 * numVal2;
          }
          const first3 = num.slice(0, 2);
          const reamaning = num.slice(2, 6);
          const last = num.slice(6, 10);
          dov.classList.add("col-6", "col-md-6", "col-18", "pull-up");
          dov.innerHTML = `  <div style="border-top-left-radius:5px;border-top-right-radius:5px;background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% );">
    <div class="d-flex justify-content-between align-items-center col-div px-2 ">
    <div class="d-inline-flex">
    <i class="fa-solid fa-star" style="font-size: 12px;"></i>
    <i class="fa-solid fa-star"  style="font-size: 12px;"></i>
    <i class="fa-solid fa-star"  style="font-size: 12px;"></i>
    <i class="fa-solid fa-star"  style="font-size: 12px;"></i>
    <i class="fa-solid fa-star"  style="font-size: 12px;"></i>
    </div>
    <button class="btn-card-heart"><i class="fa-solid fa-heart"  onclick="addToWishlist(${val.product_id})"></i></button>
  </div>
      </div>
<div class="d-flex flex-column bg-cont">
 
<div class="d-flex flex-column align-items-center col-div-2 mt-1">
   
<h1 class="mb-0 fw-bold">${first3}-<span style="color:#9e48cd;">${reamaning}-${last}</span></h1>
</div>

<div class="d-flex justify-content-center col-div-3 py-1">
Total- <strong class="mx-1">${val.sum_total}</strong> | Sum- <strong class="mx-1">${val.first_sum}</strong> | <span class="mx-1">${val.number_status}</span> |
<a href="./vipNumber" class="ms-1"><span>SIMILAR NUMBERS</span></a>
</div>

<div class="d-flex justify-content-center align-items-center card-icon-cont py-2 py-md-3">

<h6 class="mb-0 fw-bold" style="font-size:12px"><s>${init}</s> ₹${final_price}</h6><div class="vl mx-1"></div><button class=""><i class="fa-solid fa-cart-shopping" onclick="cart(${val.product_id})"></i></button>
   
    <div class="vl mx-1"></div>
    <button class="py-2" onclick=window.location.href="./Detail?product=${val.product_id}"><i class="fa-solid fa-solid fa-circle-info d-block"></i></button>
     <div class="vl mx-1"></div>
    <button onclick="buyNow(${val.product_id})">BUY</button> 
    
</div>
</div>
</div>
    `;
          item.appendChild(dov);
        });
      });
    });
  }
};
//price Desktop
let priceDesktop = document.querySelector(".priceDesktop");
window.PriceDesktop = async () => {
  let index = priceDesktop.selectedIndex;
  let low;
  let high;
  if (index == 1) {
    low = 0;
    high = 1500;
  } else if (index == 2) {
    low = 1501;
    high = 3000;
  } else if (index == 3) {
    low = 3001;
    high = 5000;
  } else if (index == 4) {
    low = 5001;
    high = 10000;
  } else if (index == 5) {
    low = 10001;
    high = 30000;
  } else if (index == 6) {
    low = 30001;
    high = 50000;
  } else if (index == 7) {
    low = 50001;
    high = 100000;
  } else if (index == 8) {
    low = 100000;
    high = 1000000;
  }
  const response = await fetch(
    config.backendEndpoint +
      `/search_products/1?low_price=${low}&high_price=${high}`
  );
  const data = await response.json();
  const PriceData = data.data;
  cardArr2[0].innerHTML = "";
  let newData = PriceData.map((item) => {
    const {
      price,
      sum_total,
      first_sum,
      number_status,
      number,
      product_id,
      flat_discount,
      discount_percent,
    } = item;
    var init = "";
    var final_price = price;
    if (flat_discount && parseInt(flat_discount) > 0) {
      init = "₹" + price;
      final_price = parseInt(price) - parseInt(val.flat_discount);
    } else if (discount_percent && parseInt(discount_percent) > 0) {
      init = "₹" + price;
      var numVal1 = Number(price);
      var numVal2 = Number(discount_percent) / 100;
      final_price = numVal1 - numVal1 * numVal2;
    }
    const first3 = number.slice(0, 2);
    const reamaning = number.slice(2, 6);
    const last = number.slice(6, 10);
    return `<div class="col-xl-4 col-lg-4 col-md-4 col-18 pull-up">
      <div
        style="
          border-radius: 10px;
          background: linear-gradient(
            40deg,
            #bf68e6 20%,
            #9e48cd 51%,
            #bf68e6 90%
          );
          border: 1.5px solid #e6e6e6;
          box-shadow: 0 0 10px grey;
        "
      >
        <div
          class="d-flex justify-content-between align-items-center col-div px-2 py-1"
        >
          <div class="d-inline-flex">
            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i
            ><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i
            ><i class="fa-solid fa-star"></i>
          </div>
          <button class="btn-card-heart">
            <i class="fa-solid fa-heart"  onclick="addToWishlist(${product_id})"></i>
          </button>
        </div>
        <div class="d-flex flex-column bg-cont">
          <div class="d-flex justify-content-center col-div-2 mt-2">
            <h1 class="mb-0 fw-bold" style="font-size: 2rem">
              ${first3}-<span style="color: #9e48cd">${reamaning}-${last}</span>
            </h1>
          </div>

          <div class="d-flex justify-content-center col-div-3 py-1">
            Total-<strong class="mx-2">${sum_total}</strong> | Sum-<strong
              class="mx-2"
              >${first_sum}</strong
            >
            | <span class="mx-1">${number_status}</span> |
            <a href="./vipNumber" class="ms-1" style="font-size: 10px"
              ><span>SIMILAR NUMBERS</span></a
            >
          </div>

          <div
            class="d-flex justify-content-center align-items-center card-icon-cont py-3"
          >
            <h4 class="mb-0 fw-bold"><s>${init}</s> ₹${final_price}</h4>
            <div class="vl mx-1"></div>
            <button class=""><i class="fa-solid fa-cart-shopping" onclick="cart(${product_id})"></i></button>

            <div class="vl mx-1"></div>
            <button
              class="py-2"
              onclick="window.location.href"
              ="./Detail?product=${product_id}"
            >
              <i class="fa-solid fa-circle-info d-block"></i>
            </button>
            <div class="vl mx-1"></div>
            <button onclick="buyNow(${product_id})">BUY</button>
          </div>
        </div>
      </div>
    </div>
    `;
  });
  newData = newData.join("");
  cardArr2[0].innerHTML = newData;
  more.removeEventListener("click", Increment);
  more.addEventListener("click", async () => {
    count = count + 1;
    let url =
      config.backendEndpoint +
      `/search_products/${count}?low_price=${low}&high_price=${high}`;
    const response = await fetch(url);
    const data = await response.json();
    card2.map((item) => {
      data.data.forEach((val) => {
        let dov = document.createElement("div");
        dov.classList.add(
          "col-xl-4",
          "col-lg-4",
          "col-md-4",
          "col-18",
          "pull-up"
        );
        let num = val.number.toString();
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
        const first3 = num.slice(0, 2);
        const reamaning = num.slice(2, 6);
        const last = num.slice(6, 10);
        dov.innerHTML = `<div style="border-radius:10px;background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% );border:1.5px solid #e6e6e6;box-shadow:0 0 10px grey;">
         <div class="d-flex justify-content-between align-items-center col-div px-2 py-1 ">
            
             <div class="d-inline-flex"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
             <button class="btn-card-heart"><i class="fa-solid fa-heart"  onclick="addToWishlist(${val.product_id})"></i></button>
           </div>
     <div class="d-flex flex-column bg-cont">
     <div class="d-flex justify-content-center col-div-2 mt-2">
       
    <h1 class="mb-0 fw-bold" style="font-size:2rem">${first3}-<span style="color:#9e48cd ;">${reamaning}-${last}</span></h1>
    
       
     </div>
    
    <div class="d-flex justify-content-center col-div-3 py-1">
    Total-<strong class="mx-2">${val.sum_total}</strong> | Sum-<strong class="mx-2">${val.first_sum}</strong> | <span class="mx-1">${val.number_status}</span> | <a href="./vipNumber" class="ms-1" style="font-size:10px;"><span>SIMILAR NUMBERS</span></a>
    </div>
    
    <div class="d-flex justify-content-center align-items-center card-icon-cont py-3">
  
   <h4 class="mb-0 fw-bold"> <s>${init}</s> ₹${final_price}</h4><div class="vl mx-1"></div><button class=""><i class="fa-solid fa-cart-shopping" onclick="cart(${val.product_id})"></i></button>
   
    <div class="vl mx-1"></div>
    <button class="py-2" onclick=window.location.href="./Detail?product=${val.product_id}"><i class="fa-solid fa-circle-info d-block"></i></button>
     <div class="vl mx-1"></div>
    <button onclick="buyNow(${val.product_id})">BUY</button> 
    
    
    </div>
    </div>
    `;
        item.appendChild(dov);
      });
    });
  });
};
// price Mobile
let priceMobile = document.querySelector(".priceMobile");
window.PriceMobile = async () => {
  let index = priceMobile.selectedIndex;
  let low;
  let high;
  if (index == 1) {
    low = 0;
    high = 1500;
  } else if (index == 2) {
    low = 1501;
    high = 3000;
  } else if (index == 3) {
    low = 3001;
    high = 5000;
  } else if (index == 4) {
    low = 5001;
    high = 10000;
  } else if (index == 5) {
    low = 10001;
    high = 30000;
  } else if (index == 6) {
    low = 30001;
    high = 50000;
  } else if (index == 7) {
    low = 50001;
    high = 100000;
  } else if (index == 8) {
    low = 100000;
    high = 1000000;
  }
  const response = await fetch(
    config.backendEndpoint +
      `/search_products/2?low_price=${low}&high_price=${high}`
  );
  const data = await response.json();
  const PriceData = data.data;
  cardVip[0].innerHTML = "";
  let newData = PriceData.map((item) => {
    const {
      price,
      sum_total,
      first_sum,
      number_status,
      number,
      product_id,
      flat_discount,
      discount_percent,
    } = item;
    var init = "";
    var final_price = price;
    if (flat_discount && parseInt(flat_discount) > 0) {
      init = "₹" + price;
      final_price = parseInt(price) - parseInt(val.flat_discount);
    } else if (discount_percent && parseInt(discount_percent) > 0) {
      init = "₹" + price;
      var numVal1 = Number(price);
      var numVal2 = Number(discount_percent) / 100;
      final_price = numVal1 - numVal1 * numVal2;
    }
    const first3 = number.slice(0, 2);
    const reamaning = number.slice(2, 6);
    const last = number.slice(6, 10);
    return `
       <div class="col-6 col-md-6 col-18 pull-up">
      <div
        style="
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          background: linear-gradient(
            40deg,
            #bf68e6 20%,
            #9e48cd 51%,
            #bf68e6 90%
          );
        "
      >
        <div
          class="d-flex justify-content-between align-items-center col-div px-2"
        >
          <div class="d-inline-flex">
            <i class="fa-solid fa-star" style="font-size: 12px"></i>
            <i class="fa-solid fa-star" style="font-size: 12px"></i>
            <i class="fa-solid fa-star" style="font-size: 12px"></i>
            <i class="fa-solid fa-star" style="font-size: 12px"></i>
            <i class="fa-solid fa-star" style="font-size: 12px"></i>
          </div>
          <button class="btn-card-heart">
            <i class="fa-solid fa-heart"  onclick="addToWishlist(${product_id})"></i>
          </button>
        </div>
      </div>
      <div class="d-flex flex-column bg-cont">
        <div class="d-flex flex-column align-items-center col-div-2 mt-1">
          <h1 class="mb-0 fw-bold">
            ${first3}-<span style="color: #9e48cd">${reamaning}-${last}</span>
          </h1>
        </div>

        <div class="d-flex justify-content-center col-div-3 py-1">
          Total- <strong class="mx-1">${sum_total}</strong> | Sum-
          <strong class="mx-1">${first_sum}</strong> |
          <span class="mx-1">${number_status}</span> |
          <a href="./vipNumber" class="ms-1"
            ><span>SIMILAR NUMBERS</span></a
          >
        </div>

        <div
          class="d-flex justify-content-center align-items-center card-icon-cont py-2 py-md-3"
        >
          <h6 class="mb-0 fw-bold" style="font-size: 12px"><s>${init}</s> ₹${final_price}</h6>
          <div class="vl mx-1"></div>
          <button class=""><i class="fa-solid fa-cart-shopping" onclick="cart(${product_id})"></i></button>

          <div class="vl mx-1"></div>
          <button
            class="py-2"
            onclick="window.location.href"
            ="./Detail?product=${product_id}"
          >
            <i class="fa-solid fa-solid fa-circle-info d-block"></i>
          </button>
          <div class="vl mx-1"></div>
          <button onclick="buyNow(${product_id})">BUY</button>
        </div>
      </div>
    </div>
      `;
  });
  newData = newData.join("");
  cardVip[0].innerHTML = newData;
  more.removeEventListener("click", async () => {
    count = count + 1;
    let url =
      config.backendEndpoint +
      `/search_products/${count}?low_price=${low}&high_price=${high}`;
    const response = await fetch(url);
    const data = await response.json();
    VipSmCard.map((item) => {
      data.data.forEach((val) => {
        let dov = document.createElement("div");
        let num = val.number.toString();
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
        const first3 = num.slice(0, 2);
        const reamaning = num.slice(2, 6);
        const last = num.slice(6, 10);
        dov.classList.add("col-6", "col-md-6", "col-18", "pull-up");
        dov.innerHTML = `  <div style="border-top-left-radius:5px;border-top-right-radius:5px;background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% );">
    <div class="d-flex justify-content-between align-items-center col-div px-2 ">
    <div class="d-inline-flex">
    <i class="fa-solid fa-star" style="font-size: 12px;"></i>
    <i class="fa-solid fa-star"  style="font-size: 12px;"></i>
    <i class="fa-solid fa-star"  style="font-size: 12px;"></i>
    <i class="fa-solid fa-star"  style="font-size: 12px;"></i>
    <i class="fa-solid fa-star"  style="font-size: 12px;"></i>
    </div>
    <button class="btn-card-heart"><i class="fa-solid fa-heart"  onclick="addToWishlist(${val.product_id})"></i></button>
  </div>
      </div>
<div class="d-flex flex-column bg-cont">
 
<div class="d-flex flex-column align-items-center col-div-2 mt-1">
   
<h1 class="mb-0 fw-bold">${first3}-<span style="color:#9e48cd;">${reamaning}-${last}</span></h1>
</div>

<div class="d-flex justify-content-center col-div-3 py-1">
Total- <strong class="mx-1">${val.sum_total}</strong> | Sum- <strong class="mx-1">${val.first_sum}</strong> | <span class="mx-1">${val.number_status}</span> |
<a href="./vipNumber" class="ms-1"><span>SIMILAR NUMBERS</span></a>
</div>

<div class="d-flex justify-content-center align-items-center card-icon-cont py-2 py-md-3">

<h6 class="mb-0 fw-bold" style="font-size:12px"><s>${init}</s> ₹${final_price}</h6><div class="vl mx-1"></div><button class=""><i class="fa-solid fa-cart-shopping" onclick="cart(${val.product_id})"></i></button>
   
    <div class="vl mx-1"></div>
    <button class="py-2" onclick=window.location.href="./Detail?product=${val.product_id}"><i class="fa-solid fa-solid fa-circle-info d-block"></i></button>
     <div class="vl mx-1"></div>
    <button onclick="buyNow(${val.product_id})">BUY</button> 
    
</div>
</div>
</div>
    `;
        item.appendChild(dov);
      });
    });
  });
};
// store card Desktop
let VipCardData;
let count = 1;
const FetchVip = async () => {
  const response = await fetch(
    config.backendEndpoint + "/fetch_all_products/1"
  );
  const data = await response.json();
  VipCardData = data.data;
  card2.map((item) => {
    VipCardData.forEach((val) => {
      let dov = document.createElement("div");
      dov.classList.add(
        "col-xl-4",
        "col-lg-4",
        "col-md-4",
        "col-18",
        "pull-up"
      );
      let num = val.number.toString();
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
      const first3 = num.slice(0, 2);
      const reamaning = num.slice(2, 6);
      const last = num.slice(6, 10);
      dov.innerHTML = `<div style="border-radius:10px;background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% );border:1.5px solid #e6e6e6;box-shadow:0 0 10px grey;">
         <div class="d-flex justify-content-between align-items-center col-div px-2 py-1 ">
            
             <div class="d-inline-flex"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
             <button class="btn-card-heart"><i class="fa-solid fa-heart"  onclick="addToWishlist(${val.product_id})"></i></button>
           </div>
     <div class="d-flex flex-column bg-cont">
     <div class="d-flex justify-content-center col-div-2 mt-2">
       
    <h1 class="mb-0 fw-bold" style="font-size:2rem">${first3}-<span style="color:#9e48cd ;">${reamaning}-${last}</span></h1>
    
       
     </div>
    
    <div class="d-flex justify-content-center col-div-3 py-1">
    Total-<strong class="mx-2">${val.sum_total}</strong> | Sum-<strong class="mx-2">${val.first_sum}</strong> | <span class="mx-1">${val.number_status}</span> | <a href="./vipNumber" class="ms-1" style="font-size:10px;"><span>SIMILAR NUMBERS</span></a>
    </div>
    
    <div class="d-flex justify-content-center align-items-center card-icon-cont py-3">
  
   <h4 class="mb-0 fw-bold"> <s>${init}</s> ₹${final_price}</h4>
   <div class="vl mx-1"></div>
   <button class="">
   <i class="fa-solid fa-cart-shopping" onclick="cart(${val.product_id})"></i>
   </button>
   
    <div class="vl mx-1"></div>
    <button class="py-2" onclick=window.location.href="./Detail?product=${val.product_id}"><i class="fa-solid fa-circle-info d-block"></i></button>
     <div class="vl mx-1"></div>
    <button onclick="buyNow(${val.product_id})">BUY</button> 
    
    
    </div>
    </div>
    `;
      item.appendChild(dov);
    });
  });
};
FetchVip();
// Store card Mobile
const FetchVipMobile = async () => {
  const response = await fetch(
    config.backendEndpoint + "/fetch_all_products/1"
  );
  const data = await response.json();
  let HomeCardData = data.data;
  HomeCardData.length = 12;
  VipSmCard.map((item) => {
    HomeCardData.forEach((val) => {
      let dov = document.createElement("div");
      let num = val.number.toString();
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
      const first3 = num.slice(0, 2);
      const reamaning = num.slice(2, 6);
      const last = num.slice(6, 10);
      dov.classList.add("col-6", "col-md-6", "col-18", "pull-up");
      dov.innerHTML = `  <div style="border-top-left-radius:5px;border-top-right-radius:5px;background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% );">
    <div class="d-flex justify-content-between align-items-center col-div px-2 ">
    <div class="d-inline-flex">
    <i class="fa-solid fa-star" style="font-size: 12px;"></i>
    <i class="fa-solid fa-star"  style="font-size: 12px;"></i>
    <i class="fa-solid fa-star"  style="font-size: 12px;"></i>
    <i class="fa-solid fa-star"  style="font-size: 12px;"></i>
    <i class="fa-solid fa-star"  style="font-size: 12px;"></i>
    </div>
    <button class="btn-card-heart"><i class="fa-solid fa-heart"  onclick="addToWishlist(${val.product_id})"></i></button>
  </div>
      </div>
<div class="d-flex flex-column bg-cont">
 
<div class="d-flex flex-column align-items-center col-div-2 mt-1">
   
<h1 class="mb-0 fw-bold">${first3}-<span style="color:#9e48cd;">${reamaning}-${last}</span></h1>
</div>

<div class="d-flex justify-content-center col-div-3 py-1">
Total- <strong class="mx-1">${val.sum_total}</strong> | Sum- <strong class="mx-1">${val.first_sum}</strong> | <span class="mx-1">${val.number_status}</span> |
<a href="./vipNumber" class="ms-1"><span>SIMILAR NUMBERS</span></a>
</div>

<div class="d-flex justify-content-center align-items-center card-icon-cont py-2 py-md-3">

<h6 class="mb-0 fw-bold" style="font-size:12px"><s>${init}</s> ₹${final_price}</h6><div class="vl mx-1"></div><button class=""><i class="fa-solid fa-cart-shopping" onclick="cart(${val.product_id})"></i></button>
   
    <div class="vl mx-1"></div>
    <button class="py-2" onclick=window.location.href="./Detail?product=${val.product_id}"><i class="fa-solid fa-solid fa-circle-info d-block"></i></button>
     <div class="vl mx-1"></div>
    <button onclick="buyNow(${val.product_id})">BUY</button> 
    
</div>
</div>
</div>
    `;
      item.appendChild(dov);
    });
  });
};
FetchVipMobile();
// add more data desktop
const Increment = async () => {
  count = count + 1;
  let url = config.backendEndpoint + `/fetch_all_products/${count}`;
  const response = await fetch(url);
  const data = await response.json();
  const newData = data.data;
  card2.map((item) => {
    newData.forEach((val) => {
      let dov = document.createElement("div");
      dov.classList.add(
        "col-xl-4",
        "col-lg-4",
        "col-md-4",
        "col-18",
        "pull-up"
      );
      let num = val.number.toString();
      const first3 = num.slice(0, 2);
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
      const reamaning = num.slice(2, 6);
      const last = num.slice(6, 10);
      dov.innerHTML = `<div style="border-radius:10px;background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% );border:1.5px solid #e6e6e6;box-shadow:0 0 10px grey;">
         <div class="d-flex justify-content-between align-items-center col-div px-2 py-1 ">
            
             <div class="d-inline-flex"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
             <button class="btn-card-heart"><i class="fa-solid fa-heart"  onclick="addToWishlist(${val.product_id})"></i></button>
           </div>
     <div class="d-flex flex-column bg-cont">
     <div class="d-flex justify-content-center col-div-2 mt-2">
       
    <h1 class="mb-0 fw-bold" style="font-size:2rem">${first3}-<span style="color:#9e48cd ;">${reamaning}-${last}</span></h1>
    
       
     </div>
    
    <div class="d-flex justify-content-center col-div-3 py-1">
    Total-<strong class="mx-2">${val.sum_total}</strong> | Sum-<strong class="mx-2">${val.first_sum}</strong> | <span class="mx-1">${val.number_status}</span> | <a href="./vipNumber" class="ms-1" style="font-size:10px;"><span>SIMILAR NUMBERS</span></a>
    </div>
    
    <div class="d-flex justify-content-center align-items-center card-icon-cont py-3">
  
   <h4 class="mb-0 fw-bold"> <s>${init}</s> ₹${final_price}</h4><div class="vl mx-1"></div><button class=""><i class="fa-solid fa-cart-shopping" onclick="cart(${val.product_id})"></i></button>
   
    <div class="vl mx-1"></div>
    <button class="py-2" onclick=window.location.href="./Detail?product=${val.product_id}"><i class="fa-solid fa-circle-info d-block"></i></button>
     <div class="vl mx-1"></div>
    <button onclick="buyNow(${val.product_id})">BUY</button> 
    
    
    </div>
    </div>
    `;
      item.appendChild(dov);
    });
  });
};
more.addEventListener("click", Increment);
// add more data mobile
let moreSm = document.querySelector(".more-sm");
const IncrementMobile = async () => {
  count = count + 1;
  let url = config.backendEndpoint + `/fetch_all_products/${count}`;
  const response = await fetch(url);
  const data = await response.json();
  const newData = data.data;
  newData.length = 12;
  VipSmCard.map((item) => {
    newData.forEach((val) => {
      let dov = document.createElement("div");
      let num = val.number.toString();
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
      const first3 = num.slice(0, 2);
      const reamaning = num.slice(2, 6);
      const last = num.slice(6, 10);
      dov.classList.add("col-6", "col-md-6", "col-18", "pull-up");
      dov.innerHTML = `  <div style="border-top-left-radius:5px;border-top-right-radius:5px;background:linear-gradient( 40deg, #bf68e6 20%, #9e48cd 51%, #bf68e6 90% );">
    <div class="d-flex justify-content-between align-items-center col-div px-2 ">
    <div class="d-inline-flex">
    <i class="fa-solid fa-star" style="font-size: 12px;"></i>
    <i class="fa-solid fa-star"  style="font-size: 12px;"></i>
    <i class="fa-solid fa-star"  style="font-size: 12px;"></i>
    <i class="fa-solid fa-star"  style="font-size: 12px;"></i>
    <i class="fa-solid fa-star"  style="font-size: 12px;"></i>
    </div>
    <button class="btn-card-heart"><i class="fa-solid fa-heart"  onclick="addToWishlist(${val.product_id})"></i></button>
  </div>
      </div>
<div class="d-flex flex-column bg-cont">
 
<div class="d-flex flex-column align-items-center col-div-2 mt-1">
   
<h1 class="mb-0 fw-bold">${first3}-<span style="color:#9e48cd;">${reamaning}-${last}</span></h1>
</div>

<div class="d-flex justify-content-center col-div-3 py-1">
Total- <strong class="mx-1">${val.sum_total}</strong> | Sum- <strong class="mx-1">${val.first_sum}</strong> | <span class="mx-1">${val.number_status}</span> |
<a href="./vipNumber" class="ms-1"><span>SIMILAR NUMBERS</span></a>
</div>

<div class="d-flex justify-content-center align-items-center card-icon-cont py-2 py-md-3">

<h6 class="mb-0 fw-bold" style="font-size:12px"><s>${init}</s> ₹${final_price}</h6><div class="vl mx-1"></div><button class=""><i class="fa-solid fa-cart-shopping" onclick="cart(${val.product_id})"></i></button>
   
    <div class="vl mx-1"></div>
    <button class="py-2" onclick=window.location.href="./Detail?product=${val.product_id}"><i class="fa-solid fa-solid fa-circle-info d-block"></i></button>
     <div class="vl mx-1"></div>
    <button onclick="buyNow(${val.product_id})">BUY</button> 
    
</div>
</div>
</div>
    `;
      item.appendChild(dov);
    });
  });
};
moreSm.addEventListener("click", IncrementMobile);
