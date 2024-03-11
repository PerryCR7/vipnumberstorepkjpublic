const checkout = [
    {
      number: 8819227271,
      price: 700,
    },
    {
      number: 8819227271,
      price: 700,
    },
    {
      number: 8819227271,
      price: 700,
    },
    {
      number: 8819227271,
      price: 700,
    },
  ];
  let data = document.querySelector(".data");
  const Amount = document.querySelector(".amount");
  const total = document.querySelector(".total");
  let newData = checkout.map((items) => {
    const { number, price } = items;
    return `
    <div>
      <img
                    src="../Assets/Ready2Port.png"
                    alt="ready2port"
                    width="60"
                    height="30"
                  />
    <div class="d-flex  selectedNumber">
                      <h2 class="checkOut-Number">${number}</h2>
                      <h2 class="number-price">${price}</h2>
                    </div>    
                    </div>    
        `;
  });
  newData = newData.join("");
  data.innerHTML = newData;
  /* function to get total price */
  const sum = checkout.reduce((accumulator, object) => {
    return accumulator + object.price;
  }, 0);
  Amount.innerHTML = `₹ ${sum}`;
  total.innerHTML = sum;
  

  const checkoutSm = [
    {
      number: "8819227271",
      price: 700,
    },
    {
      number: "8192256371",
      price: 700,
    },
    {
      number: "8819226431",
      price: 124,
    },
    {
      number: "0001256242",
      price: 300,
    },
    {
      number: "0001256242",
      price: 100,
    },
  ];
  let dataSm = document.querySelector(".data-sm");
  const AmountSm = document.querySelector(".amount-sm");
  const totalSm = document.querySelector(".total-sm");
  let newdataSm = checkoutSm.map((items) => {
    const { number, price } = items;
  
    return ` 
    <div>
     <img
                    src="../Assets/Ready2Port.png"
                    alt="ready2port"
                    width="60"
                    height="30"
                  />
    <div class="d-flex justify-content-between selectedNumber">
                      <h2 class="checkOut-Number">${number}</h2>
                      <h2 class="number-price">${price}</h2>
                    </div>
                      <hr style="color: e6e6e6" />
                      </div>
    `;
  });
  newdataSm = newdataSm.join("");
  dataSm.innerHTML = newdataSm;
  /* function to get total price */
  const sumSm = checkoutSm.reduce((accumulator, object) => {
    return accumulator + object.price;
  }, 0);
  AmountSm.innerHTML = `₹ ${sumSm}`;
  totalSm.innerHTML = sumSm;
  