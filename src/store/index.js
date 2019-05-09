import Vuex from 'vuex';
import Vue from 'vue';
import shop from '@/api/shop';

Vue.use(Vuex);

// vue store has five options 'state, mutation, getters, actions and modules'
export default new Vuex.Store({
    // = data
    state: {
        products: [],
        // {id, quantity}
        cart: []
    },
    // = computed properties
    getters: {
        availableProducts (state, getters) {
            return state.products.filter(product => product.inventory > 0)
        },
        cartProducts (state) {
            return state.cart.map(cartItem => {
                const product = state.products.find(product => product.id === cartItem.id)
                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity,
                }
            })
        },
        cartTotal (state, getters) {
            // let total = 0
            // getters.cartProducts.forEach(product => {
            //     total += product.price * product.quantity
            // })
            // return total
            return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
        }
    },
    actions: {
        fetchProducts({commit}) {
            return new Promise((resolve, reject) => {
                // make the call
                // run setProducts mutation
                shop.getProducts(products => {
                    commit('setProducts', products)
                    resolve()
                })
            })
        },
        addProductToCart (context, product) {
            // check if product is in stock
            if (product.inventory > 0) {
                const cartItem = context.state.cart.find(item => item.id === product.id)
                // find cartItem - if it exist in the cart
                if (!cartItem) {
                    context.commit('pushProductToCart', product.id)
                } else {
                    // incrementItemQuantity
                    context.commit('incrementItemQuantity', cartItem)
                }
                // remove product from the invertory if its added to cart
                context.commit('decrementProductInventory', product)
            }
        }
    },
    // responsible for setting & updating the-state 
    mutations: {
        setProducts(state, products) {
            // update products
            state.products = products
        },
        // const cartItem ={id: 123, quantity: 2}
        pushProductToCart (state, productId) {
            state.cart.push({
                id: productId,
                quantity: 1
            })
        }, 
        incrementItemQuantity (state, cartItem) {
            cartItem.quantity++
        },
        decrementProductInventory (state, product) {
            product.inventory--
        }
    }
})