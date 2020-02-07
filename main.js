Vue.component('product-review',{
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{error}}</li>
                </ul>
            </p>
            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name">
            </p>
            <p>
                <label for="review">Review:</label>
                <textarea id="review" v-model="review"></textarea>
            </p>
            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>
            <p>Would you recommend this product?</p>
            <label>
                Yes
                <input type="radio" value="Yes" v-model="recommend"/>
            </label>
            <label>
                No
                <input type="radio" value="No" v-model="recommend"/>
            </label>
            <p>
                <input type="submit" value="Submit">
            </p>
        </form>
    `,
    data(){
        return {
            name:null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods:{
        onSubmit(){
            this.errors = []
            if(this.name && this.review && this.rating && this.recommend){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                this.$emit('review-submitted', productReview)
                this.name = null,
                this.review = null,
                this.rating = null,
                this.recommend = null
            }
            else{
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(!this.recommend) this.errors.push("Recommendation required.")
            }
        }
    }
})

Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
			<li v-for="detail in details">{{detail}}</li>
		</ul>
    `
})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
				<div class="product-image">
					<img v-bind:src="image">

				</div>

				<div class="product-info">
					<h1>{{title}}</h1>
					<p>{{description}}</p>
					<p>Shipping: {{shipping}}</p>
					<span v-if="onSale">On Sale!</span>
					<product-details :details="details"></product-details>
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
				    <button @click="removeFromCart">Remove</button>
					<!-- <button v-on:click="emptyCart" v-show="cart">Empty Cart</button> -->
					<p><a :href="link" target="_blank">More products like this</a></p>
				</div>

                <div>
                    <h2>Reviews</h2>
                    <p v-if="!reviews.length">There are no reviews yet.</p>
                    <ul>
                        <li v-for="review in reviews">
                            <ul>
                                <li>{{review.name}}</li>
                                <li>Rating: {{review.rating}}</li>
                                <li>{{review.review}}</li>
                                <li>Recommend? {{review.recommend}}</li>
                            </ul>
                        </li>
                    </ul>
                </div>

				<product-review @review-submitted="addReview"></product-review>

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
            reviews: []
        }
    },
    methods: {
        addToCart: function(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        removeFromCart: function(){
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },
//       emptyCart: function(){
//            this.cart = 0
//        },
        updateProduct(index){
            this.selectedVariant = index
        },
        addReview(productReview){
            this.reviews.push(productReview)
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
        },
        shipping(){
            if (this.premium){
                return "Free"
            }
            else{
                return "$2.99"
            }

        }
    }

})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id){
            this.cart.push(id)
        },
        removeFromCart(id){
            this.cart.pop(id)
        }
    }
})
