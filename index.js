var $panel = $(".slider__inner").first();

$(".btnLearnMore").on("click", function () {
  $panel.css("left", "-100%");
  $(".mockup").toggleClass("show");
});

$(".btnGoBack").on("click", function () {
  $panel.css("left", "0");
  $(".mockup").toggleClass("show");
});

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

// Fetch all the forms we want to apply custom Bootstrap validation styles to
var forms = document.querySelectorAll("form");
var buttons = document.querySelectorAll("[type='email'] + button");
// Loop over them and prevent submission

buttons.forEach(function () {
  addEventListener("submit", function (event) {
    Array.prototype.slice.call(forms).forEach(function (form) {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add("was-validated");
      if (form.checkValidity()) {
        thanksTooltip().show();
        setTimeout(function () {
          thanksTooltip().hide();
        }, 4000);
      }
    });
  });
});
