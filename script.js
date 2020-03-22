$(document).ready(() => {
  showWidth();
});

function showWidth() {
  console.log(window.innerWidth);
  console.log(window.innerHeight);
  requestAnimationFrame(showWidth);
}
