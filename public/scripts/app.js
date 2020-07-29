

$(() => {
  console.log("loading")
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   console.log(users);
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }


  // })
  // .catch(error => console.log(error));


  const createNewMenuItem = function(data) {

    const newMenuItem =
      $(`
      <div class="col-lg-4 col-sm-4">
          <div class="card" style="">
          <form id="order-form" method="POST" action="/menu">
            <img class="card-img-top" src="${data.food_item_photo}">
            <div class="card-body">
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
      console.log("Felipe");
      console.log("we are here", res.menu);
          //for(const item in menu)
          for(let i = 0; i < res.menu.length; i++) {
            if(i < 3) {
            console.log("name", res.menu[i]);
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




});

