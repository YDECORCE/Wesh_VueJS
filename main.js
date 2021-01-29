let products=new Vue({
  el: '#app',
  
  data() {
    return {
      info: null,
      loading: true,
      errored: false,
      active: false
    }
  },
template:`<div id="card" class="row w-100" >
<div v-for="product in info" class="col-12 col-sm-6 col-lg-3 p-2">
  <div class="card" @mouseover="mouseOver">
    <div v-show="active" class="cardover">
      <button class="add"> add to cart</button>
    </div>
    <div class="image">
      <img v-bind:src = product.image alt="image" style="max-width:80%; height:auto">
    </div>
    <div class="title">{{product.title}}</div>
    <div class="price">{{product.price + " €"}}</div>
  </div>
     </div>
</div> `,

  methods:{
    mouseOver: function() {
      this.active= !this.active;
    }
},
  created() {
    axios
      .get('https://fakestoreapi.com/products')
      .then(response => {
        this.info = response.data

      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
})
