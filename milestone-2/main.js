// definisco variabili API
const apiUri = 'https://api.themoviedb.org/3/';
const apiKey = 'd697a14c56f5dc39b8a8034bfcea2fc1';

// parte Vue Js
new Vue({
  el: '#app',
  data: {
    results: [],
    searchText: '',
    titleText: '',
    loading: false,
    flags: ['it', 'en']
  },
  methods: {
    search() {

      if(this.searchText !== '') {
        // la proprietà loading diventa true
        this.loading = true;

        // svuoto/ripristino input di ricerca e risultati
        this.results = [];
        let userText = this.searchText;
        this.searchText = '';

        // e metto il testo ricercato nel titolo
        this.titleText = userText;

        // da qui , faccio partire la chiamata ajax con axios a tmdb per i film
        // passo l'apikey come parametro all'url tramite un oggetto usato come secondo parametro di axios
        axios.get(apiUri + 'search/movie', {
          params: {
            api_key: apiKey,
            query: userText
          }
        })
          .then((resp) => {
            console.log('Array di film selezionati: ', resp.data.results);
            this.results = resp.data.results;
            // la proprietà loading diventa di nuovo false
            this.loading = false;
          });

        // e poi, faccio partire la chiamata ajax con axios a tmdb per le serie tv
        // passo sempre l'apikey come parametro all'url tramite un oggetto usato come secondo parametro di axios
        axios.get(apiUri + 'search/tv', {
          params: {
            api_key: apiKey,
            query: userText
          }
        })
          .then((resp) => {
            console.log('Array di serie tv selezionati: ', resp.data.results);
            this.results = resp.data.results;
            // la proprietà loading diventa di nuovo false
            this.loading = false;
          });

      }
    },
    getStars(vote) {
      return Math.ceil(vote / 2);
    },
    getFlags(language) {
      return 'img/' + language + '.png';
    }
  },
  mounted() {

  }
});
Vue.config.devtools = true;
