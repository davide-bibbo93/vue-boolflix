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
    loading: false
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

        // da qui , faccio partire la chiamata ajax con axios a tmdb
        axios.get(apiUri + 'search/movie', {
          params: {
            api_key: apiKey,
            query: userText
          }
        }).then((resp) => {
            console.log('Array di film selezionati: ', resp.data.results);
            this.results = resp.data.results;
            // la proprietà loading diventa di nuovo false
            this.loading = false;
        });

      }
    }
  },
  mounted() {

  }
});
Vue.config.devtools = true;
