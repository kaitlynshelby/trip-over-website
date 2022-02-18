const $badge = $(".download-badge");
const $input_signup1 = $("#input-signup1");
const $input_signup2 = $("#input-signup2");

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

const tooltip = new bootstrap.Tooltip($input_signup1, tooltipOptions);
const tooltip2 = new bootstrap.Tooltip($input_signup2, tooltipOptions);

function signUpTooltip() {
  var x = window.matchMedia("(max-width: 768px)");
  let t;
  if (x.matches) {
    t = tooltip;
  } else {
    t = tooltip2;
  }
  return t;
}

$(".download-badge").on("click", function () {
  signUpTooltip().show();
  setTimeout(function () {
    signUpTooltip().hide();
  }, 2000);
});

tooltipOptions.title =
  "<div class='p-3'>Thanks for signing up! We'll keep you updated with the latest news from Trip Over.</div>";

const tooltip3 = new bootstrap.Tooltip($input_signup1, tooltipOptions);
const tooltip4 = new bootstrap.Tooltip($input_signup2, tooltipOptions);

function thanksTooltip() {
  var x = window.matchMedia("(max-width: 768px)");
  let t;
  if (x.matches) {
    t = tooltip3;
  } else {
    t = tooltip4;
  }
  return t;
}

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
        thanksTooltip().show();
        setTimeout(function () {
          thanksTooltip().hide();
        }, 3000);
        $(button).html("<i class='fa-solid fa-circle-check'></i>");
        input.attr("readonly", true);
      },
    });
  }
  return false;
});
