const apiKey = '53c344e6ba791494d1b35ad0f623a6f7'
const baseURL = 'https://api.themoviedb.org/3';

function getPopularMovies() {
   const endpoint = '/movie/popular';
   const url = `${baseURL}${endpoint}?api_key=${apiKey}`;

   function consultarMovie(id) {
      const endpointOfMovie = `/movie/${id}`;
      const urlOfMovie = `${baseURL}${endpointOfMovie}?api_key=${apiKey}`;

      return fetch(urlOfMovie).then(response => response.json())
   }

   function converterStars(avaliation) {
      const stars = (avaliation * 5) / 10
      const estrela = stars.toFixed(2)
      return estrela
   }

   fetch(url)
       .then(response => response.json())
       .then(data => {
         const dados = data.results
         const img = document.querySelectorAll('.image')
         const h2 = document.querySelectorAll('.text-title')
         const cards = document.querySelectorAll('.card')
         const timers = document.querySelectorAll('.time-details')
         const estrelas = document.querySelectorAll('.avaliation')
         const buttons = document.querySelectorAll('.btn-details')

         for (let i = 0; i < dados.length; i++) {
            const image = img[i]
            const title = h2[i]
            const card = cards[i]
            const time = timers[i]
            const estrela = estrelas[i]
            const botao = buttons[i]

            if (dados[i].poster_path) {
               image.src = `https://image.tmdb.org/t/p/w500/${dados[i].poster_path}`
               img.alt = 'Nome do filme: ' + dados[i].original_title
               title.innerHTML = dados[i].title
               card.id = dados[i].id
               botao.id = dados[i].id

               consultarMovie(card.id)
                  .then(movieDetails => {
                     time.innerHTML = movieDetails.runtime + ' min'
                     const score = movieDetails.vote_average
                     const avaliation = converterStars(score)
                     estrela.innerHTML = avaliation
                     
                     console.log(movieDetails)
                  })
            }

         }

         document.querySelectorAll('.btn-details').forEach(function(element) {
            element.addEventListener('click', async function() {
               const id = element.id

               try {
                  const data = await consultarMovie(id)
                  const img = document.getElementById('img-detail')
                  img.src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`
                  const titulo = document.getElementById('title-detail')
                  titulo.innerHTML = data.title
                  const description = document.getElementById('description')
                  description.innerHTML = data.overview

                  const window = document.querySelector('.details-window')
                  window.classList.remove('display')

                  document.getElementById('back-icon').addEventListener('click', function() {
                     const window = document.querySelector('.details-window')
                     window.classList.add('display')
                  })
                  console.log(data.title)
               } catch {
                  console.error('Erro ao obter dados do filme:', error)
               }
               
            })
         })

           console.log(dados); 

       })
       .catch(error => {
           console.error('Erro ao buscar filmes populares:', error);
       });
}

getPopularMovies();