var app = new Vue({
    el: '#app',
    data: {
        selectedVariant: 0,
        product: 'Socks',
        brand: 'Vue Mastery',
        description: 'A pair of warm, fuzzy socks',
        link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        onSale: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
          {
            variantId: 2234,
            variantColor: "green",
            variantImage: './images/vmSocks-green-onWhite.jpg',
            variantQuantity: 10
          },
          {
            variantId: 2235,
            variantColor: "blue",
            variantImage: './images/vmSocks-blue-onWhite.jpg',
            variantQuantity: 0
          }
        ],
        sizes: ['S', 'M', 'L'],
        cart: 0
    },
    methods: {
        addToCart: function(){
            this.cart += 1
        },
       emptyCart: function(){
            this.cart = 0
        },
        updateProduct(index){
            this.selectedVariant = index
        }
    },
    computed: {
        title: function(){
            return this.brand + ' ' + this.product
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        }
    }
})
