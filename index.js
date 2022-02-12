var $panel = $(".slider__inner").first();

$("#btnLearnMore").on("click", function () {
  $panel.css("left", "-100%");
});

$("#btnGoBack").on("click", function () {
  $panel.css("left", "0");
});

const $badge = $(".download-badge");
const $input_signup = $("#input_signup");

const tooltip = new bootstrap.Tooltip($input_signup, {
  html: true,
  trigger: "manual",
  placement: "right",
  title:
    "<div class='p-3'>We're launching soon!<br>Sign up to get notified.</div>",
  offset: [0, 10],
  container: "body",
});

$(".download-badge").on("click", function () {
  tooltip.show();
  setTimeout(function () {
    tooltip.hide();
  }, 2000);
});

$("#input_signup").on("focus", function () {
  tooltip.hide();
});
