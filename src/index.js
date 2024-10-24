document.addEventListener("DOMContentLoaded", () => {
  getImages();
  getBreeds();
});
function addImages(urls) {
  for (let i = 0; i < urls.length; i++) {
    const img = document.createElement("img");
    img.src = urls[i];
    img.style.height = `700px`;
    img.style.width = `700px`;

    document.querySelector("#dog-image-container").appendChild(img);
  }
}
function getImages() {
  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then((res) => {
      return res.json();
    })
    .then((obj) => {
      addImages(obj.message);
    });
}
function getBreeds() {
  fetch("https://dog.ceo/api/breeds/list/all")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const select = document.querySelector("#breed-dropdown");
      defaultList(data.message);
      select.addEventListener("change", () => {
        const ul = document.querySelector("#dog-breeds");
        ul.innerHTML = "";
        const filter = select.value;
        for (let key in data.message) {
          if (key[0] === filter) {
            addBreeds(key);
          }
        }
      });
    });
}
function addBreeds(breed) {
  const li = document.createElement("li");
  li.textContent = breed;
  li.addEventListener("click", () => {
    li.style.color = "blue";
  });
  document.querySelector("#dog-breeds").appendChild(li);
}
function defaultList(breed) {
  const select = document.querySelector("#breed-dropdown");
  const ul = document.querySelector("#dog-breeds");
  ul.innerHTML = "";
  const filter = select.value;
  for (let key in breed) {
    if (key[0] === filter) {
      addBreeds(key);
    }
  }
}
