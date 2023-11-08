import Mustache from 'mustachejs'
import { createApp } from 'vue'

const url = "http://www.omdbapi.com/?s=harry potter&apikey=adf1f2d7";

const results = document.querySelector('#results');
const template = document.querySelector('#movieCardTemplate');

// Example with vanilla javascript

// fetch("http://www.omdbapi.com/?s=harry potter&apikey=adf1f2d7")
//   .then(response => response.json())
//   .then((data) => {
//     data.Search.forEach((result) => {
//       const movieCard = `
//         <div class='col-3'>
//           <div class="card">
//             <img src="${result.Poster}" class="card-img-top" alt="${result.Title} poster">
//             <div class="card-body">
//               <h6 class="card-title">${result.Title}</h6>
//               <p class="card-text">${result.Year}</p>
//               <a href="https://www.imdb.com/title/${result.imdbID}" class="btn btn-primary" target="_blank">Go on IMDB</a>
//             </div>
//           </div>
//         </div>
//       `;

//     results.insertAdjacentHTML('beforeend', movieCard);
//     });
//   });


// Example with <template> HTML tag

// fetch("http://www.omdbapi.com/?s=harry potter&apikey=adf1f2d7")
// .then(response => response.json())
// .then((data) => {
//     data.Search.forEach((movie) => {
//       const clone = template.content.cloneNode(true);
//       clone.querySelector("img").src = movie.Poster
//       clone.querySelector("h6").textContent = movie.Title
//       clone.querySelector("p").textContent = movie.Year
//       clone.querySelector("a").href = `https://www.imdb.com/title/${movie.imdbID}`
//       results.appendChild(clone);
//     });
//   });


// Example with Mustache templating library

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
