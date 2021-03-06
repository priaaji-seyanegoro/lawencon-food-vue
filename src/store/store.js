import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from 'vuex-persist';

const vuexLocalStorage = new VuexPersist({
  key: 'LawenFood', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})


Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    authenticated: false,
    bestFood : [],
    foods : [],
    carts : [],
  },
  mutations: {
    setAuthentication(state, status) {
      state.authenticated = status;
    },
    setBestFood(state, payload){
      state.bestFood = payload;
    },
    setFoods(state, payload){
      state.foods = payload;
    },
    setCarts(state, payload){
      state.carts = payload
    },
    updatedCarts(state, payload){
      state.carts.push(payload)
    },
    deletedCarts(state, id){
      state.carts = state.carts.filter((cart) => cart.id !== id)
    }
  },
  plugins: [vuexLocalStorage.plugin]
});
