$(() => {
  console.log("loading")
  const arrayOfMenuItems = [];

  const createNewMenuItem = function(data) {
    console.log(data);
    const newMenuItem =
      $(`
        <div class="col-lg-4 col-sm-4">
          <div class="card" style="">
          <form id="order-form">
            <img class="card-img-top" src="${data.food_item_photo}">
            <div class="card-body" data-menu-item="${data.id}">
              <h5 class="card-title">${data.name}</h5>
              <p class="card-text">${data.description}</p>
              <p>$${data.price}</p>
              <input type="submit" value="Add to Order" class="btn btn-primary" id="addtoorderbutton"></input>
            </div>
            </form>
          </div>
        </div>`);

    return $(newMenuItem);
  };

  $.ajax({
    method: "GET",
    url: "/api/menu"
  }).done((res) => {
      // console.log("Felipe");
      console.log("we are here", res.menu);
          //for(const item in menu)
          for(let i = 0; i < res.menu.length; i++) {
            if(i < 3) {
            // console.log("name", res.menu[i]);
            const MenuItem = createNewMenuItem(res.menu[i]);
            $('#menu-item-container1').after(MenuItem);
            } else if(i < 6) {
              const MenuItem = createNewMenuItem(res.menu[i]);
              $('#menu-item-container2').after(MenuItem);
            } else if(i < 9) {
              const MenuItem = createNewMenuItem(res.menu[i]);
              $('#menu-item-container3').after(MenuItem);
            }
          }
    })
    // .catch(error => console.log(error));



  $(document).on('click', '#addtoorderbutton', function(event) {

    console.log("button clicked");
      // let menuItems = $('form#order-form').serialize();
      // debugger <--- helpful to debug
      // const menuItems = $(this).data("product-id");   <--different way

    event.preventDefault();
    // const uniqueMenuItem = {};
    // let quantity = 0;
    // quantity += 1;
    arrayOfMenuItems.push({ menuItem: event.target.parentElement.getAttribute("data-menu-item") })
    console.log(arrayOfMenuItems);
  });


  $(document).on('click', '#checkoutButton', function(event) {  // <---- new button checkout  / submits order
    console.log("checkout Button Clicked");
    $.ajax({
      method: 'POST',
      url: '/api/menu',
    // dataType: 'json',
      data: { menuItems: arrayOfMenuItems }
  }).done((data) => {
    console.log(data);
    window.location.href="/proceedtocheckout";
    })
    .catch(error => {
      console.log(error)
    })
  })






  // const createNewMenuItem = function(data) {
  // console.log(data);
  // const newMenuItem =
  //   $(`
  //     <div class="col-lg-4 col-sm-4">
  //       <div class="card" style="">
  //       <form id="order-form">
  //         <img class="card-img-top" src="${data.food_item_photo}">
  //         <div class="card-body" data-menu-item="${data.id}">
  //           <h5 class="card-title">${data.name}</h5>
  //           <p class="card-text">${data.description}</p>
  //           <p>$${data.price}</p>
  //           <input type="submit" value="Add to Order" class="btn btn-primary" id="addtoorderbutton"></input>
  //         </div>
  //         </form>
  //       </div>
  //     </div>`);

  // return $(newMenuItem);
  // };



});

