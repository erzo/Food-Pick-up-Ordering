

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
      $(`<div class="card" style="">
      <img class="card-img-top" src="${data.food_item_photo}">
      <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <p class="card-text">${data.description}</p>
        <p>${data.price}</p>
        <a href="#" class="btn btn-primary" id="addtoorderbutton">Add to Order</a>
      </div>
    </div>`);

    // $(newMenuItem.find('.menu-item-container')).text(phrase);

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
            console.log("name", res.menu[i]);
          const MenuItem = createNewMenuItem(res.menu[i]);
          $('#menu-item-container').prepend(MenuItem);
          }
    })
    // .catch(error => console.log(error));




});

