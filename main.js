let productcard = {
  data (){
    return{
    active: false
    }
  },
  props: ['message'],
  template: `<div class="card" @mouseover="mouseOver">
              <div class="image">
                <img v-bind:src = message.image alt="image" style="max-width:80%; height:auto">
              </div>
              <div class="title">{{message.title}}</div>
              <div class="price">{{message.price + " €"}}</div>
            </div>
            <div v-show="active" class="cardover">
              <button> add to cart</button>
            </div>`,
  methods:{
    mouseOver: function() {
        this.active= !this.active;
    }
      },
  
}


new Vue({
  el: '#app',
  components:{productcard},
  data() {
    return {
      info: null,
      loading: true,
      errored: false
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