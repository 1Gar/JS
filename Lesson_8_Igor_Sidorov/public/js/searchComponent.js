Vue.component('filter-el', {
  data() {
    return {
      userSearch: ''
    }
  },
  template: `
  <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
  <input type="text" class="search-field" v-model="userSearch">
  <button type="submit" class="btn-search">
      <svg class="header__search-img" xmlns="http://www.w3.org/2000/svg" width="26" height="27"
          viewBox="0 0 26 27">
          <g>
              <g>
                  <path
                      d="M25.73 25.371a.97.97 0 0 1-.3 1.557.9.9 0 0 1-.718-.002.93.93 0 0 1-.301-.209l-7.748-7.807a10.318 10.318 0 0 1-6.24 2.09 10.395 10.395 0 1 1 7.639-3.375zM4.378 16.565a8.575 8.575 0 0 0 6.046 2.535 8.535 8.535 0 1 0-8.534-8.6 8.575 8.575 0 0 0 2.488 6.065z" />
              </g>
          </g>
      </svg>

  </button>
</form>`
});