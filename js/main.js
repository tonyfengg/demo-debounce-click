const $ = (selector) => document.querySelector(selector);
const log = console.log;
const initApp = () => {
  const button1 = $("#button1");
  const button2 = $("#button2");
  // click event vs debounce
  button1.addEventListener("click", debounce(clickGetUser, 2000));
  // input event vs throttle
  button2.addEventListener("click", throttle(clickGetUser, 3000));
};

document.addEventListener("DOMContentLoaded", initApp);

// click event handler
const clickGetUser = async () => {
  const name = $("#name");
  const input = $("#input");
  const value = input.value;
  log("start call api::", value);
  const url = `https://api.github.com/users/${value}`;

  const data = await fetch(url);
  const res = await data.json();
  if (res?.name) {
    name.innerHTML = res.name;
  } else {
    name.innerHTML = "No user found";
  }
};
// debounce function
const debounce = (fn, delay) => {
  delay = delay || 0;
  let timerId;
  return function () {
    log("timerId previous at::", timerId);
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    timerId = setTimeout(() => {
      return fn.apply(this, arguments);
    }, delay);
  };
};

// init throttle function
const throttle = (fn, delay) => {
  delay = delay || 0;
  let lastCall = 0;
  return function () {
    log("lastCall previous at::", lastCall);
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn.apply(this, arguments);
  };
};
