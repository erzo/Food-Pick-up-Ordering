//when an order item is clicked and the modal confirms 'delete', we will remove this order item from the /order page
//used in order.ejs

$(document).ready(function () {
  $(".deletebutton").on('click', function () {
    const parent = $(this).parents(".list-group-item");
    //const info = $(".test-order1").serialize();
    const orderId = parent.data("id");
    //line 8 "parent.data("id"), should be the dynamic id from each order item, 1 through 9
    $.ajax({
      url: "/deleteorder",
      type: "POST",
      data: { orderId }
    })
    console.log("deleteorder", orderId);
    $(parent).remove();
  });
});

//example - https://digitalpark.co.uk/2018/10/02/use-jquery-ajax-php-insert-get-database-data/
// $('#signupbtn').on('click', function (e) {
//   formData = $("#signUp").serialize();
//   $.ajax({
//     url: "Your php code URL",
//     type: "post",
//     data: formData,
//     success: function (d) {
//       $('.success').show();
//       $('.success').delay(3000).fadeOut();
//     },
//     error: function (request, status, error) {
//       //console.log(request.responseText);
//     }
//   });
// }
//   }
//   e.preventDefault();
//   });
