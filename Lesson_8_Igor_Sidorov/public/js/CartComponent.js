Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            showCart: false
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {
                        quantity: 1
                    })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({
                    quantity: 1
                }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    });
            }

            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if(data.result === 1){
            //             let find = this.cartItems.find(el => el.id_product === item.id_product);
            //             if(find){
            //                 find.quantity++;
            //             } else {
            //                 const prod = Object.assign({quantity: 1}, item);
            //                 this.cartItems.push(prod)
            //             }
            //         }
            //     })
        },
        remove(item) {
            if(item.quantity > 1){
                this.$parent.putJson(`/api/cart/${item.id_product}`, {quantity: -1})
                    .then(data => {
                        if(data.result === 1){
                            item.quantity--;
                        }
                    })
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    })
            }
        },




        // remove(item) {
        //     this.$parent.getJson(`${API}/addToBasket.json`)
        //         .then(data => {
        //             if (data.result === 1) {
        //                 if (item.quantity > 1) {
        //                     item.quantity--;
        //                 } else {
        //                     this.cartItems.splice(this.cartItems.indexOf(item), 1);
        //                 }
        //             }
        //         });
        // },




        
    },



    template: `

    <div>
<button class="btn-cart" type="button" @click="showCart = !showCart">
<svg class="header__shopping-img" xmlns="http://www.w3.org/2000/svg" width="32" height="29"
    viewBox="0 0 32 29">
    <g>
        <g>
            <path
                d="M26.401 29a2.477 2.477 0 1 0-.2 0zm-19.65-2.68a2.68 2.68 0 1 0 5.357 0 2.68 2.68 0 0 0-5.355 0zm18.66-5.634a1.185 1.185 0 0 0 1.084-.709L31.9 7.565a1.191 1.191 0 0 0-.526-1.513 1.178 1.178 0 0 0-.56-.142H14.401a1.183 1.183 0 1 0 0 2.365h14.6l-4.383 10.048H11.44L6.607.868A1.183 1.183 0 0 0 5.463 0H1.182a1.182 1.182 0 1 0 0 2.364h3.393l4.833 17.455a1.185 1.185 0 0 0 1.145.867z" />
        </g>
    </g>
    </svg>

</button>
  
<div class="cart-block" v-show="showCart">
            <p v-if="!cartItems.length" co>Ваша корзина пуста</p>
            <cart-item v-for="item of cartItems" 
            :key="item.id_product" 
            :img="item.imgProduct" 
            :cart-item="item"
             @remove="remove">
            </cart-item>
</div>
</div>
`
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
    <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some img" width="50" height="60">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Количество: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }} каждый</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
});

















// Vue.component('cart', {
//     props: ['cartItems', 'img', 'visibility'],
//     template: `
//         <div class="cart-block" v-show="visibility">
//             <p v-if="!cartItems.length">Ваша корзина пуста</p>
//             <cart-item v-for="item of cartItems" :key="item.id_product" :img="img" :cart-item="item">
//             </cart-item>
//         </div>
//     `
// });

// Vue.component('cart-item', {
//     props: ['img', 'cartItem'],
//     template: `
//     <div class="cart-item">
//                     <div class="product-bio">
//                         <img :src="img" alt="Some img">
//                         <div class="product-desc">
//                             <div class="product-title">{{ cartItem.product_name }}</div>
//                             <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
//                             <div class="product-single-price">$ {{ cartItem.price }} each</div>
//                         </div>
//                     </div>
//                     <div class="right-block">
//                         <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
//                         <button class="del-btn" @click="$parent.$emit('remove', cartItem)">&times;</button>
//                     </div>
//                 </div>
//     `
// });