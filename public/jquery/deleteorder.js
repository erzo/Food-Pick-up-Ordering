//when an order item is clicked and the modal confirms 'delete', we will remove this order item from the /order page
//used in order.ejs

$(document).ready(function () {
  $("#deletebutton1").on('click', function () {
    //const info = $(".test-order1").serialize();
    const info = $(".test-order1").val();
    $.ajax({
      url: "/deleteorder",
      type: "POST",
      data: JSON.stringify(info)
    })
    console.log("2", info);
    $(".test-order1").remove();
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

$(document).ready(function () {
  $("#deletebutton2").on('click', function () {
    $(".test-order2").remove();
  });
});

$(document).ready(function () {
  $("#deletebutton3").on('click', function () {
    $(".test-order3").remove();
  });
});

$(document).ready(function () {
  $("#deletebutton4").on('click', function () {
    $(".test-order4").remove();
  });
});

