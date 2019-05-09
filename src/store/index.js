import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

// vue store has five options 'state, mutation, getters, actions and modules'
new Vuex.Store({
    // = data
    state: {
        products: []
    },

    // = computed properties
    getters: {
        productsCount() {

        }
    },

    actions: {
        fetchProducts() {

        }
    },
    // responsible for setting & updating the state 
    mutations: {
        setProducts () {
            //update products
        }
    }
})