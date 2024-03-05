const apiKey = '53c344e6ba791494d1b35ad0f623a6f7'
const baseURL = 'https://api.themoviedb.org/3';
const moveUrl = 'https://api.themoviedb.org/3/search/movie'

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

         const Container = document.querySelector('.container') 
         const containerGroup = document.createElement('div')

         for (let i = 0; i < dados.length; i++) {

            const h2 = document.createElement('h2')
            const card = document.createElement('div')
            card.className = 'card'
            const img = document.createElement('img')
            img.className = 'image'
            h2.className = 'text-title'
            img.src = `https://image.tmdb.org/t/p/w500/${dados[i].poster_path}`
            img.alt = 'Imagem não encontrada'
            h2.innerHTML = dados[i].title

            const timer = document.createElement('div')
            timer.className = 'timer'
            const icone = document.createElement('i')
            icone.className = 'fa-solid fa-clock icone'
            const span = document.createElement('span')
            span.className = 'time-details'
            const button = document.createElement('button')
            button.className = 'btn-details'
            button.innerHTML = 'DETALHES'
            
            const avaiationDiv = document.createElement('div')
            avaiationDiv.className = 'avaiation'
            const avaliationSpan = document.createElement('span')
            avaliationSpan.className = 'avaliation'
            avaliationSpan
            const iAvaliation = document.createElement('i')
            iAvaliation.className = 'fa-solid fa-star icone'
            
            const avaliationTime = dados[i].vote_average
            const stars = converterStars(avaliationTime)
            avaliationSpan.innerHTML = stars
            avaiationDiv.append(avaliationSpan, iAvaliation)

            timer.append(icone, span)
            const detailsGroup = document.createElement('div')
            detailsGroup.className = 'details-group'
            detailsGroup.append(timer, button, avaiationDiv)


            card.append(img, h2, detailsGroup)
           
            containerGroup.className = 'container-group'
            containerGroup.append(card)
            

            if (dados[i].poster_path) {
               card.id = dados[i].id
               button.id = dados[i].id

               consultarMovie(card.id)
                  .then(movieDetails => {
                     timer.innerHTML = movieDetails.runtime + ' min'
                     const score = movieDetails.vote_average
                     const avaliation = converterStars(score)
                     
                     console.log(movieDetails)
                  })
            }

         }
         Container.append(containerGroup)

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

function searchMovie(movie) {
   const url = `${moveUrl}?api_key=${apiKey}&query=${movie}`

   function consulta() {
      return fetch(url).then(response => response.json())
   }

   fetch(url)
       .then(response => {
         if (!response.ok) {
            throw new Error(`Erro ao buscar filmes: ${response.statusText}`)
         }
         return response.json()

      })
      .then(data => {

         function converterStars(avaliation) {
            const stars = (avaliation * 5) / 10
            const estrela = stars.toFixed(2)
            return estrela
         }

         const resultado = data.results
         const main = document.getElementById('second-main')

         if (main) {
            const existingH2 = document.getElementById('movie-title')
   
            const Container = document.createElement('div');
            Container.className = 'container-group';
            
   
            for (let i = 0; i < resultado.length; i++) {
               const h2 = document.createElement('h2')
               const card = document.createElement('div')
               card.className = 'card'
               const img = document.createElement('img')
               img.className = 'image'
               h2.className = 'text-title'
               img.src = `https://image.tmdb.org/t/p/w500/${resultado[i].poster_path}`
               img.alt = 'Imagem não encontrada'
               h2.innerHTML = resultado[i].title

               const timer = document.createElement('div')
               timer.className = 'timer'
               const icone = document.createElement('i')
               icone.className = 'fa-solid fa-calendar-days icone'
               const span = document.createElement('span')
               span.className = 'time-details'
               span.innerHTML = resultado[i].release_date
               const button = document.createElement('button')
               button.className = 'btn-details'
               button.innerHTML = 'DETALHES'
               
               const avaiationDiv = document.createElement('div')
               avaiationDiv.className = 'avaiation'
               const avaliationSpan = document.createElement('span')
               avaliationSpan.className = 'avaliation'
               avaliationSpan
               const iAvaliation = document.createElement('i')
               iAvaliation.className = 'fa-solid fa-star icone'
               
               const avaliationTime = resultado[i].vote_average
               const stars = converterStars(avaliationTime)
               avaliationSpan.innerHTML = stars
               avaiationDiv.append(avaliationSpan, iAvaliation)
               

               timer.append(icone, span)
               const detailsGroup = document.createElement('div')
               detailsGroup.className = 'details-group'
               detailsGroup.append(timer, button, avaiationDiv)


               card.append(img, h2, detailsGroup)
               Container.append(card)
            }
   
            main.append(Container)
         }
        
         
         console.log(resultado)
      })
      .catch(error => {
         console.log(error)
      })
   }

   const movieName = document.querySelector('.fa-magnifying-glass').addEventListener('click', function(e){
      const input = document.getElementById('inputsearch')

      const movieName = input.value.trim() // Remova espaços em branco extras do input
      if (movieName !== "") {
         searchMovie(movieName)

         const firstMain = document.getElementById('main-principal')
         const secondMain = document.getElementById('second-main')
         secondMain.classList.remove('display')
         firstMain.classList.add('display')
         const movieSearched = document.querySelector('.movie-pesquisado')
         movieSearched.innerHTML = input.value
         movieSearched.style.color = '#f64348'

         const voltarbtn = document.querySelector('.voltar').addEventListener('click', function() {
            secondMain.classList.add('display')
         firstMain.classList.remove('display')
         input.value = ''
         input.style.borderColor = '#ffe400'
         const element = document.querySelector('.fa-magnifying-glass')
         element.style.backgroundColor = '#ffe400'
         input.placeholder = 'Buscar por Filmes'
         })

      } else {
         input.style.borderColor = '#f64348'
         const element = document.querySelector('.fa-magnifying-glass')
         element.style.backgroundColor = '#f64348'
         input.placeholder = 'Não é possível pesquisar algo vazio'
      }
      
   })

  