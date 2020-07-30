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

    // $(newMenuItem.find('.menu-item-container')).text(phrase);
      //\
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

//   $(document).on('click', '#checkoutButton', function(event) {  // <---- new button checkout / submits order
//     $.ajax({
//       method: 'POST',
//       url: '/api/menu',
//     // dataType: 'json',
//       data: { menuItems: arrayOfMenuItems }
//   }).done((data) => {
//     console.log(data);
//   //   for(user of users) {
//   //     $("<div>").text(user.name).appendTo($("body"));
//   //   }
//     })
//     .catch(error => {
//       console.log(error)
//     })
// }

  // (".add-to-cart").click(function (event) {
  //   const menuId = $(this).data("product-id");
  //   const menuItemObject = menuItems.find(item => item.id === menuId);
  //   let qty = Number(($(`.display[data-product-id='${menuId}']`)).text());
  //   event.preventDefault();
  //   $.ajax({
  //     method: 'POST',
  //     url: '/checkout',
  //     data: { item_id: menuId, qty: qty, price: menuItemObject.price, name: menuItemObject.name, image:menuItemObject.thumbnail_url }
  //   })

  /*
    const menuItems = [];

    // const test = (data) => {
    //   console.log(data);
    // };

    var test = function(){
      console.log(data);
      };

    // // -------- on click events --- /

    $(document).on('click', '#addtoorderbutton', function(event) {

      // console.log($('form#formID').serialize())

      console.log("button clicked");
      console.log("event: ", event.target.value);
      event.preventDefault();

      // for()


      $.ajax({
        method: "POST",
        url: "/api/menu",
        data: { menuItems: menuItems } //<--- this sends the data to menu.js
      }).done((data) => {
        console.log(data);
        //   for(user of users) {
        //     $("<div>").text(user.name).appendTo($("body"));
        //   }
        })
        .catch(error => console.log(error));


    });

  */

    // $("#subtractfromorderbutton").sumbit( () => {
    //   //subtracts 1 from quantity
    // });

    //variable array to keep track of individual menu object (id, quantity, price)
    //click event, goes inside object and increases quantity of exisitng item
    //doesnt exist, it creates the obeject inside array




  // $.ajax({
  //   method: "POST",
  //   url: "/api/menu",
  //   data: { menuItems: menuItems } //<--- this sends the data to menu.js
  // }).done((data) => {
  //   console.log(data);
  //   //   for(user of users) {
  //   //     $("<div>").text(user.name).appendTo($("body"));
  //   //   }
  //   })
  //   .catch(error => console.log(error));


});

