let darkMode = true;

function toggleDarkWhiteMode() {
  if (darkMode) whiteModeToggle();
  else darkModeToggle();
}

// DARK MODE
const darkModeToggle = () => {
  map.setStyle("mapbox://styles/mapbox/dark-v9");

  document.getElementById("toggleDarkWhiteBtn").className =
    "button is-primary is-light";
  document.querySelector("#toggleDarkWhiteBtn").innerHTML = "Light Mode";
  darkMode = true;
};

// LIGHT MODE
const whiteModeToggle = () => {
  map.setStyle("mapbox://styles/mapbox/outdoors-v9");

  document.getElementById("toggleDarkWhiteBtn").className = "button is-primary";
  document.querySelector("#toggleDarkWhiteBtn").innerHTML = "Dark Mode";
  darkMode = false;
};
