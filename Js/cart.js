import config from "../conf/index.js";
const cartArr = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
window.cart = async (id) => {
  let alreadyAdded = false;
  if (cartArr.length > 0) {
    for (let i = 0; i < cartArr.length; i++) {
      if (id == cartArr[i].product_id) {
        Toastify({
          text: "Product already Added To Cart",
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
    document.querySelector('.overflow_screen-custom').style.display = "block";
    const response = await fetch(
      config.backendEndpoint + `/fetch_single_product?product=${id}`
    );
    var data = await response.json();
    var final_price = data.data.price;
    console.log(final_price)
    if ((parseInt(data.data.flat_discount) > 0)) {
      final_price = (parseInt(data.data.price) - parseInt(data.data.flat_discount))
    } else if ((parseInt(data.data.discount_percent) > 0)) {
      var numVal1 = Number(data.data.price);
      var numVal2 = Number(data.data.discount_percent) / 100;
      final_price = (numVal1 - (numVal1 * numVal2))
    }
    document.querySelector('.overflow_screen-custom').style.display = "none";
    data.data.price = final_price
    let item = data.data;
    cartArr.push(item);
    console.log(cartArr);
    localStorage.setItem("cart", JSON.stringify(cartArr));
    Toastify({
      text: "Item Added To Cart",
      duration: 3000,
      newWindow: true,
      // close: true,
      gravity: "bottom", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#2f3452",
            width: "80%",
            top: "107px",
            maxWidth: "none",
            textAlign: "center",
            padding: "5px",
            height: "33px",
            boxShadow: "none",
          },
    }).showToast();
  }
};
