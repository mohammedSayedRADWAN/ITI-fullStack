const blackDiv = $("<div></div>")
  .addClass("black")
  .append($("<p></p>").text("Hello Ahmed"));
const whiteDiv = $("<div></div>")
  .addClass("white")
  .append($("<p></p>").text("Hello white div"));
const yellowP = $("<p class='yellow'>hello p  yellow</p>");

$(".container1").append(blackDiv);
$(".container1").prepend(whiteDiv);
$(".pink").before(yellowP);

$(".container2 p").each(function () {
  const textContent = $(this).text();

  const anchor = $("<a></a>")
    .text(textContent)
    .attr("href", "http://" + textContent);

  $(this).replaceWith(anchor);
});

$(document).ready(function() {
    // 1. اختيار الصورة داخل container3 وتغليفها بعنصر figure
    $(".container3 img").wrap("<figure></figure>");

    // 2. إضافة عنصر figcaption بعد الصورة مباشرة
    $(".container3 img").after("<figcaption>Coffee</figcaption>");
});

    $(".container4").ready(function() {
    $("td.col-age").empty();
});
$(".container4 .row1 .col-name").addClass("man");

$(".container4 td").toggleClass("your-email");

$("#username").attr("name", "yourname"); 

$("#remember").prop("checked", true);
