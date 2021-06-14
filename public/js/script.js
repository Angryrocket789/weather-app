console.log("HEy bruh");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector(".para1");
const messageTwo = document.querySelector(".para2");
const messageThree = document.querySelector(".para3");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading";
  messageTwo.textContent = ``;
  messageThree.textContent = ``;
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        // console.log(data.error);
        messageOne.textContent = `${data.error}`;
        setTimeout(() => {
          messageOne.textContent = "";
        }, 2000);
      } else {
        // console.log(data.location);
        // console.log(data.foreCast);
        messageOne.textContent = "";
        messageTwo.textContent = `${data.location}`;
        messageThree.textContent = `${data.foreCast}`;
      }
    });
  });
});
