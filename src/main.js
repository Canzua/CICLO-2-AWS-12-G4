import {
  sortByAZ,
  sortByZA,
  filterData,
  filterName,
  filterEpisode,
} from "./data.js";
import data from "./data/rickandmorty/rickandmorty.js";

const originData = data.results;
let filterResult = originData;

function printCards(data) {
  const mapping = data.map((item) => {
    const regex = /\d+/g;
    const episodes = item.episode.toString();
    const numberEpisode = episodes.match(regex);
    const numberBackspace = numberEpisode.join(", ");
    return `<div class="flip-container">
     <div class="flipper">
        <div class="front">
           <img  class= "image" src="${item.image}">
           <h2 class="titleFront">${item.name}</h2>
           <p class="textFront">${item.species}</p>
           <p class="textFront">${item.gender} * ${item.status}</p> 
        </div> 
        <div class="back">
        <h2 class="titleBack">${item.name}</h2>
        <p class="textBack">${item.location.name}<p>
        <p class="textBack"><b>Episodes:</b> ${numberBackspace}</p>
        </div>
    </div>
</div>`;
  });
  document.getElementById("listening").innerHTML = mapping.join(" ");
}

printCards(originData);

const selectGender = document.querySelector(".select-gender");
const selectSpecies = document.querySelector(".select-species");
const selectStatus = document.querySelector(".select-status");
const selectEpisode = document.querySelector(".select-episode");
const searchName = document.getElementById("search");
const stats = document.querySelector(".stats");
const statsNumber = stats.querySelector(".number");

function showStats(visible, value) {
  if (visible){
    stats.classList.add("visible")
    statsNumber.innerHTML=value
  }
  else {
    stats.classList.remove("visible")
  }
}

function printGenderFiltered() {

  filterResult = filterData(filterResult, "gender", selectGender.value)
  showStats (true, filterResult.length)
  return printCards(filterResult);
}

function printSpeciesFiltered() {
  filterResult = filterData(filterResult, "species", selectSpecies.value)
  showStats (true, filterResult.length);
  return printCards(filterResult);
}

function printStatusFiltered() {
  filterResult = filterData(filterResult, "status", selectStatus.value)
  showStats (true, filterResult.length);
  return printCards(filterResult);
}

function printFilterByName() {
  filterResult = filterName(originData, searchName.value);
  showStats (true, filterResult.length);
  return printCards(filterResult);
}

function printFilterByEpisode() {
  filterResult= filterEpisode(filterResult, selectEpisode.value);
  showStats (true, filterResult.length);
  return printCards(filterResult);
}

function printCharacterAZ() {
  return printCards(sortByAZ(filterResult));
}

function printCharacterZA() {
  return printCards(sortByZA(filterResult));
}

function clearCharacters() {
  filterResult = originData
  showStats (false)
  printCards (filterResult);
}

document
  .getElementById("clear")
  .addEventListener("click", clearCharacters);
document
  .getElementById("btn-order-az")
  .addEventListener("click", printCharacterAZ);
document
  .getElementById("btn-order-za")
  .addEventListener("click", printCharacterZA);
selectGender.addEventListener("change", printGenderFiltered);
selectSpecies.addEventListener("change", printSpeciesFiltered);
selectStatus.addEventListener("change", printStatusFiltered);
selectEpisode.addEventListener("change", printFilterByEpisode);
searchName.addEventListener("keypress", printFilterByName);
searchName.addEventListener("keydown", (event) => {
  if (event.KeyCode === 8) {
    return printCards(originData);
  }
});
