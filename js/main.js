const $ = (selector) => document.querySelector(selector);
const initApp = () => {
  const button = $("button");
  // click event
  button.addEventListener("click", debounce(clickOrder, 2000));
};

document.addEventListener("DOMContentLoaded", initApp);
const clickOrder = async () => {
  const name = $("#name");
  const input = $("#input");
  const value = input.value;
  console.log("start call api::", value);
  const url = `https://api.github.com/users/${value}`;

  const data = await fetch(url);
  const res = await data.json();
  if (res?.name) {
    name.innerHTML = res.name;
  } else {
    name.innerHTML = "No user found";
  }
};
const debounce = (fn, delay) => {
  delay = delay || 0;
  let timerId;
  return function () {
    console.log("timerId previous at::", timerId);
    let context = this;
    let args = arguments;
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    timerId = setTimeout(() => {
      return fn.apply(context, args);
    }, delay);
  };
};
