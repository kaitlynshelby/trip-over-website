const gradient = document.querySelector(".gradient");

// function onMouseMove(event) {
//   setTimeout(function () {
//     gradient.style.backgroundImage =
//       "radial-gradient(at " +
//       event.clientX +
//       "px " +
//       event.clientY +
//       "px, #ce185eb6 0, #0a121b 70%)";
//   });
// }
// document.addEventListener("mousemove", onMouseMove);

var btnLearnMore = document.getElementById("btnLearnMore");
var panel = document.getElementsByClassName("slider__inner")[0];

btnLearnMore.addEventListener("click", function () {
  panel.style.left = "-100%";
});

var btnGoBack = document.getElementById("btnGoBack");

btnGoBack.addEventListener("click", function () {
  // if (radio2.checked == true) {
  panel.style.left = "0";
  // }
});
