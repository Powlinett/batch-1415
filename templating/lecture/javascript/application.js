import Mustache from 'mustachejs'
// import { createApp } from 'vue'

const url = "http://www.omdbapi.com/?s=harry potter&apikey=adf1f2d7";

const results = document.querySelector('#results');
const template = document.querySelector('#movieCardTemplate');

// GET data from omDB API
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const movies = data.Search;

    // OPTIONAL -> sort movies by release year
    const sortedMovies = movies.sort((movieA, movieB) => {
      const yearNumberA = Number.parseInt(movieA.Year, 10);
      const yearNumberB = Number.parseInt(movieB.Year, 10);

      return yearNumberA - yearNumberB;
    });

    // Iterate over movies and render them with Mustache
    sortedMovies.forEach((movie) => {
      const output = Mustache.render(template.innerHTML, movie);
      
      results.insertAdjacentHTML('beforeend', output);
    });
  });

// createApp({
//   data() {
//     return {
//       message: "Hello from Vue.JS"
//     }
//   }
// }).mount('#results')
