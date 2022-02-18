const breakpoints = {
  xs: "0",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1400px",
};

const $badge = $(".download-badge");
const $input_signup = $("#input-signup");

const tooltipOptions = {
  html: true,
  trigger: "manual",
  placement: "right",
  fallbackPlacement: "top",
  title:
    "<div class='p-3'>We're launching soon!<br>Sign up to get notified.</div>",
  selector: ".input-group",
  offset: [0, 10],
  container: "body",
};

const signupTooltip = new bootstrap.Tooltip($input_signup, tooltipOptions);

$(".download-badge").on("click", function () {
  signupTooltip.show();
  setTimeout(function () {
    signupTooltip.hide();
  }, 2000);
});

tooltipOptions.title =
  "<div class='p-3'>Thanks for signing up! We'll keep you updated with the latest news from Trip Over.</div>";

const thanksTooltip = new bootstrap.Tooltip($input_signup, tooltipOptions);

var adjustFormSize = function () {
  var xs = window.matchMedia("(min-width: " + breakpoints.xs + ")");
  makeSmall(xs);
  var sm = window.matchMedia("(min-width: " + breakpoints.sm + ")");
  makeMedium(sm);
  var lg = window.matchMedia("(min-width: " + breakpoints.md + ")");
  makeLarge(lg);
};

var makeSmall = function (s) {
  if (s.matches) {
    $input_signup.addClass("input-group-sm").removeClass("input-group-lg");
    $input_signup
      .find("input")
      .addClass("form-control-sm")
      .removeClass("form-control-lg");
    $input_signup.find("button").addClass("btn-sm").removeClass("btn-lg");
  }
};

var makeMedium = function (s) {
  if (s.matches) {
    $input_signup.removeClass("input-group-sm").removeClass("input-group-lg");
    $input_signup
      .find("input")
      .removeClass("form-control-sm")
      .removeClass("form-control-lg");
    $input_signup.find("button").removeClass("btn-sm").removeClass("btn-lg");
  }
};

var makeLarge = function (s) {
  if (s.matches) {
    $input_signup.removeClass("input-group-sm").addClass("input-group-lg");
    $input_signup
      .find("input")
      .removeClass("form-control-sm")
      .addClass("form-control-lg");
    $input_signup.find("button").removeClass("btn-sm").addClass("btn-lg");
  }
};

adjustFormSize();
$(window).on("resize", adjustFormSize);

$("[type='email']").on("input", function () {
  var form = this.closest("form");
  form.classList.add("was-validated");
});

$("[type='email'] + button").on("click", function (event) {
  var button = this;
  var input = $(this).prev();
  var form = this.closest("form");
  form.classList.add("was-validated");

  if (form.checkValidity()) {
    $(button).html(
      "<div class='spinner-grow spinner-grow-sm text-light' role='status'><span class='visually-hidden'>Loading...</span></div>"
    );
    $(button).attr("disabled", "disabled");
    var url =
      "https://script.google.com/macros/s/AKfycbwniboruhPfRRW9sW_r1TTs3GifIZsSmt02gPEYg25plXKZlmlRM2iCvyV9sX5tA3Q/exec";
    $.ajax({
      crossDomain: true,
      url: url,
      method: "POST",
      data: { email: input.val() },
      success: function () {
        thanksTooltip.show();
        setTimeout(function () {
          thanksTooltip.hide();
        }, 3000);
        $(button).html("<i class='fa-solid fa-circle-check'></i>");
        input.attr("readonly", true);
      },
    });
  }
  return false;
});
