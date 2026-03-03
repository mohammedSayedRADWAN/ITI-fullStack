$(function () {

  $(".box")

    .animate({
      left: "400px",
      width: "60px",
      height: "60px"
    }, 1000)
    .queue(function (next) {
      $(this).css("background-color", "blue");
      next();
    })

    .animate({
      top: "300px",
      width: "120px",
      height: "120px"
    }, 1000)
    .queue(function (next) {
      $(this).css("background-color", "green");
      next();
    })

    .animate({
      left: "0px",
      width: "70px",
      height: "70px"
    }, 1000)
    .queue(function (next) {
      $(this).css("background-color", "orange");
      next();
    })

    .animate({
      top: "0px",
      width: "100px",
      height: "100px"
    }, 1000)
    .queue(function (next) {
      $(this).css("background-color", "red");
      next();
    });

});
