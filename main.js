Vue.component('product', {
    template: `
        <div class="product">
				<div class="product-image">
					<img v-bind:src="image">

				</div>

				<div class="product-info">
					<h1>{{title}}</h1>
					<p>{{description}}</p>
					<span v-if="onSale">On Sale!</span>
					<ul>
						<li v-for="detail in details">{{detail}}</li>
					</ul>
					<p v-if="inStock"> In Stock </p>
					<p v-else :class="{outOfStock: !inStock}"> Out of Stock </p>
					<p>Available in sizes:</p>
					<ul>
						<li v-for="size in sizes">{{size}}</li>

					</ul>
					<div v-for="(variant, index) in variants"
						 :key="variant.variantId"
						 class="color-box"
						 :style="{backgroundColor: variant.variantColor}"
					     @mouseover="updateProduct(index)">
					</div>


					<button v-on:click="addToCart"
							:disabled="!inStock"
						    :class="{disabledButton: !inStock}">Add to Cart</button>
					<button v-on:click="emptyCart" v-show="cart">Empty Cart</button>
					<div class="cart">
						<p>Cart({{cart}})</p>
					</div>
					<p><a :href="link" target="_blank">More products like this</a></p>
				</div>

			</div>
    `,
    data(){
        return {
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
        }
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

var app = new Vue({
    el: '#app'
})
