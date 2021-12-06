Vue.component('products', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
            
        }
    },
     mounted(){
         this.$parent.getJson(`/api/products`)
             .then(data => {
                 for (let item of data){
                     this.$data.products.push(item);
                     this.$data.filtered.push(item);
                 }
             });
     },
     methods: {
         filter(userSearch){
             let regexp = new RegExp(userSearch, 'i');
             this.filtered = this.products.filter(el => regexp.test(el.product_name));
         }
     },

   template: `<ul class="products__list">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="item.imgProduct"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
                </ul>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `

                   
                    <li class="product" >
                        <div class="products__card-overlay">
                            <button @click="$emit('add-product', product)" class="products__card-add-btn buy-btn">
                                <svg class="products__card-img-btn" xmlns="http://www.w3.org/2000/svg" width="27"
                                    height="25" viewBox="0 0 26 25">
                                    <g>
                                        <g>
                                            <path
                                                d="M5.658 23.034a2.22 2.22 0 0 0 1.18 1.212c.266.114.552.173.84.176.43 0 .85-.128 1.207-.368.358-.24.637-.58.803-.98a2.216 2.216 0 0 0-.454-2.39 2.162 2.162 0 0 0-2.362-.502c-.4.16-.743.435-.987.791a2.211 2.211 0 0 0-.387 1.21c-.002.292.052.58.16.85zm15.807 1.389a2.144 2.144 0 0 0 1.49-.772 2.274 2.274 0 0 0 .53-1.63 2.249 2.249 0 0 0-.453-1.199 2.202 2.202 0 0 0-3.397-.15 2.246 2.246 0 0 0-.388 2.43c.178.398.467.736.833.97.365.235.791.357 1.224.35zm-.805-6.94a.957.957 0 0 0 .883-.591l4.39-10.359a1.016 1.016 0 0 0-.08-.937.954.954 0 0 0-.8-.445H11.72a.974.974 0 0 0-.692.29.991.991 0 0 0 0 1.395.974.974 0 0 0 .692.289h11.858l-3.558 8.385H9.315L5.388.943a.974.974 0 0 0-.344-.52.96.96 0 0 0-.586-.203H.978a.974.974 0 0 0-.691.289.991.991 0 0 0 0 1.396.975.975 0 0 0 .692.289h2.758L7.664 16.76c.054.207.175.39.343.52a.96.96 0 0 0 .587.203z" />
                                        </g>
                                    </g>
                                </svg>
                                Купить
                            </button>
                        </div>
                        <img :src="img" width="360" height="420" alt="product-image_1" class="product__img">
                        <div class="product__text-wrap">
                            <a href="#">
                                <h3 class="product__title">{{product.product_name}}</h3>
                                <p class="product__text">{{product.description}}</p>
                                <p class="product__price"> &#36;{{product.price}}</p>
                            </a>
                        </div>
                    </li>
                
    `
})









// Vue.component('products', {
//     props: ['products', 'img'],
//     template: `<ul class="products__list">
//              <product v-for="item of products" 
//              :key="item.id_product" 
//              :img="img"
//              :product="item"></product>
//              </ul>`
//  });
//  Vue.component('product', {
//      props: ['product', 'img'],
//      template: `
 
                    
//                      <li class="product" >
//                          <div class="products__card-overlay">
//                              <button @click="$parent.$emit('add-product', product)" class="products__card-add-btn buy-btn">
//                                  <svg class="products__card-img-btn" xmlns="http://www.w3.org/2000/svg" width="27"
//                                      height="25" viewBox="0 0 26 25">
//                                      <g>
//                                          <g>
//                                              <path
//                                                  d="M5.658 23.034a2.22 2.22 0 0 0 1.18 1.212c.266.114.552.173.84.176.43 0 .85-.128 1.207-.368.358-.24.637-.58.803-.98a2.216 2.216 0 0 0-.454-2.39 2.162 2.162 0 0 0-2.362-.502c-.4.16-.743.435-.987.791a2.211 2.211 0 0 0-.387 1.21c-.002.292.052.58.16.85zm15.807 1.389a2.144 2.144 0 0 0 1.49-.772 2.274 2.274 0 0 0 .53-1.63 2.249 2.249 0 0 0-.453-1.199 2.202 2.202 0 0 0-3.397-.15 2.246 2.246 0 0 0-.388 2.43c.178.398.467.736.833.97.365.235.791.357 1.224.35zm-.805-6.94a.957.957 0 0 0 .883-.591l4.39-10.359a1.016 1.016 0 0 0-.08-.937.954.954 0 0 0-.8-.445H11.72a.974.974 0 0 0-.692.29.991.991 0 0 0 0 1.395.974.974 0 0 0 .692.289h11.858l-3.558 8.385H9.315L5.388.943a.974.974 0 0 0-.344-.52.96.96 0 0 0-.586-.203H.978a.974.974 0 0 0-.691.289.991.991 0 0 0 0 1.396.975.975 0 0 0 .692.289h2.758L7.664 16.76c.054.207.175.39.343.52a.96.96 0 0 0 .587.203z" />
//                                          </g>
//                                      </g>
//                                  </svg>
//                                  Купить
//                              </button>
//                          </div>
//                          <img :src="img" width="360" height="420" alt="product-image_1" class="product__img">
//                          <div class="product__text-wrap">
//                              <a href="#">
//                                  <h3 class="product__title">{{product.product_name}}</h3>
//                                  <p class="product__text">Текст карточки товара</p>
//                                  <p class="product__price">{{product.price}} &#36;</p>
//                              </a>
//                          </div>
//                      </li>
                 
//      `
//  })