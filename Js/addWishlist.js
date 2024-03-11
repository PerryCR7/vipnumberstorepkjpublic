import config from "../conf/index.js";
let wishlistArr = localStorage.getItem("wishlist")
  ? JSON.parse(localStorage.getItem("wishlist"))
  : [];
window.addToWishlist = async (id, type) => {
  if (type == "remove") {
    wishlistArr = wishlistArr.filter((element) => id != element.product_id);
    localStorage.setItem("wishlist", JSON.stringify(wishlistArr));
    Toastify({
      text: "Item Removed from Wishlist!",
      duration: 3000,
      newWindow: true,
      // close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "red",
        width: "80%",
        top: "145px",
        maxWidth: "none",
        textAlign: "center",
        padding: "5px",
        height: "33px",
        boxShadow: "none",
      },
    }).showToast();
    location.reload();
  }
  let alreadyAdded = false;
  if (wishlistArr.length > 0) {
    for (let i = 0; i < wishlistArr.length; i++) {
      if (id == wishlistArr[i].product_id) {
        // Toastify({
        //   text: "Product already Added To Wishlist",
        //   duration: 3000,
        //   newWindow: true,
        //   // close: true,
        //   // gravity: "top", // `top` or `bottom`
        //   position: "center", // `left`, `center` or `right`
        //   stopOnFocus: true, // Prevents dismissing of toast on hover
        //   style: {
        //     background: "red",
        //     width: "80%",
        //     // top: "107px",
        //     maxWidth: "none",
        //     textAlign: "center",
        //     padding: "5px",
        //     height: "33px",
        //     boxShadow: "none",
        //   },
        // }).showToast();
        // alreadyAdded = true;
        wishlistArr = wishlistArr.filter((element) => id != element.product_id);
        localStorage.setItem("wishlist", JSON.stringify(wishlistArr));
        Toastify({
          text: "Item Removed from Wishlist!",
          duration: 3000,
          newWindow: true,
          // close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "red",
            width: "80%",
            top: "145px",
            maxWidth: "none",
            textAlign: "center",
            padding: "5px",
            height: "33px",
            boxShadow: "none",
          },
        }).showToast();
        alreadyAdded = true;
        break;
      }
    }
  }
  if (!alreadyAdded) {
    document.querySelector(".overflow_screen-custom").style.display = "block";
    const response = await fetch(
      config.backendEndpoint + `/fetch_single_product?product=${id}`
    );
    var data = await response.json();
    console.log(id);
    console.log(data);
    var final_price = data.data.price;
    console.log(final_price);
    if (parseInt(data.data.flat_discount) > 0) {
      final_price =
        parseInt(data.data.price) - parseInt(data.data.flat_discount);
    } else if (parseInt(data.data.discount_percent) > 0) {
      var numVal1 = Number(data.data.price);
      var numVal2 = Number(data.data.discount_percent) / 100;
      final_price = numVal1 - numVal1 * numVal2;
    }
    data.data.price = final_price;
    let item = data.data;
    wishlistArr.push(item);
    console.log(wishlistArr);
    localStorage.setItem("wishlist", JSON.stringify(wishlistArr));
    document.querySelector(".overflow_screen-custom").style.display = "none";
    Toastify({
      text: "Item Added To Wishlist ❤️",
      duration: 3000,
      newWindow: true,
      // close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#2f3452",
        width: "80%",
        top: "108px",
        maxWidth: "none",
        textAlign: "center",
        padding: "5px",
        height: "33px",
        boxShadow: "none",
      },
    }).showToast();
  }
};

// window.addToWishlist = (id, type) => {
//   if (localStorage.getItem("user")) {
//     var myHeaders = new Headers();
//     myHeaders.append("token", localStorage.getItem("user"));

//     var requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       redirect: "follow",
//     };

//     fetch(
//       "https://vipnumberapi.bigboychoice.com/api/v1/customer/customer_info",
//       requestOptions
//     )
//       .then((response) => response.json())
//       .then((result) => {
//         if (result.status == "success") {
//           var myHeaders2 = new Headers();
//           myHeaders2.append("Content-Type", "application/json");

//           var raw = JSON.stringify({
//             product_id: id,
//             customer_id: result.data.customer_id,
//           });

//           var requestOptions = {
//             method: "POST",
//             headers: myHeaders2,
//             body: raw,
//             redirect: "follow",
//           };

//           fetch(
//             "https://vipnumberapi.bigboychoice.com/api/v1/customer/add_whishlist",
//             requestOptions
//           )
//             .then((response) => response.json())
//             .then((result) => {
//               if (result.status == "success") {
//                 if (type == "remove") {
//                   Toastify({
//                     text: "Item removed from wishlist!",
//                     duration: 3000,
//                     newWindow: true,
//                     // close: true,
//                     gravity: "top", // `top` or `bottom`
//                     position: "right", // `left`, `center` or `right`
//                     stopOnFocus: true, // Prevents dismissing of toast on hover
//                     style: {
//                       background: "red",
//                     },
//                   }).showToast();
//                   location.reload();
//                 } else if (result.msg) {
//                   Toastify({
//                     text: "Item removed from wishlist!",
//                     duration: 3000,
//                     newWindow: true,
//                     // close: true,
//                     gravity: "top", // `top` or `bottom`
//                     position: "right", // `left`, `center` or `right`
//                     stopOnFocus: true, // Prevents dismissing of toast on hover
//                     style: {
//                       background: "red",
//                     },
//                   }).showToast();
//                 } else {
//                   Toastify({
//                     text: "Item Added To Wishlist ❤️",
//                     duration: 3000,
//                     newWindow: true,
//                     // close: true,
//                     gravity: "top", // `top` or `bottom`
//                     position: "right", // `left`, `center` or `right`
//                     stopOnFocus: true, // Prevents dismissing of toast on hover
//                     style: {
//                       background: "#2f3452",
//                     },
//                   }).showToast();
//                 }
//               }
//             })
//             .catch((error) => console.log("error", error));
//         } else {
//           localStorage.removeItem("user");
//           window.location = "/";
//         }
//       })
//       .catch((error) => console.log("error", error));
//   } else {
//     window.location = "sign.html";
//   }
// };

window.changeColor = (id) => {
  let ifMob = screen.width > 700 ? id : id + "_mob";
  if (document.getElementById(ifMob).classList.contains("active"))
    document.getElementById(ifMob).classList.remove("active");
  else document.getElementById(ifMob).classList.add("active");
};
