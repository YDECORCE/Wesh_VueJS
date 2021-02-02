let products = new Vue({
  el: '#app',

  data() {
    return {
      info: null,
      loading: true,
      errored: false,
      cart: [],
      counter: 0,

    }
  },
  computed: {
    total() {
      if (this.counter > 0) {
        let somme = 0
        for (var i = 0; i < this.cart.length; i++) {
          somme += (this.cart[i].price) * (this.cart[i].quantity)
          }
        return somme.toFixed(2);
      }
      else {
        return 0
      }
    }
  },

  methods: {
    mouseover(index) {
      const card = document.getElementById('button' + index)
      card.style.display = "block"
    },
    mouseout(index) {
      const card = document.getElementById('button' + index)
      card.style.display = "none"
    },
    addtocart(index) {
      this.cart.push({
        id: index,
        name: this.info[index].title,
        price: this.info[index].price,
        picture: this.info[index].image,
        quantity: 1
      })
      localStorage.setItem('panier', JSON.stringify(this.cart))
      this.counter = this.cart.length
      let carticon = document.getElementById("carticon")
      carticon.style.display = "block"
    },
    showcart() {
      const panier = document.getElementById("panier")
      panier.style.display = "block"

    },
    hidecart() {
      const panier = document.getElementById("panier")
      panier.style.display = "none"
    },
    moreproduct(index) {
      let oldquantity = this.cart[index].quantity
      let newquantity = oldquantity + 1
      this.cart[index].quantity = newquantity
      localStorage.setItem('panier', JSON.stringify(this.cart))
    },
    lessproduct(index) {
      let oldquantity = this.cart[index].quantity
      let newquantity = oldquantity - 1
      if (newquantity === 0) {
        this.cart.splice(index, 1)
        this.counter = this.cart.length
      } else {
        this.cart[index].quantity = newquantity
      }
      localStorage.setItem('panier', JSON.stringify(this.cart))
    },
    removeproduct(index) {
      this.cart.splice(index, 1)
      this.counter = this.cart.length
      if (this.counter === 0) {
        localStorage.removeItem('panier');
      } else {
        localStorage.setItem('panier', JSON.stringify(this.cart))
      }
    },
  },
  filters: {

    subStr: function (string) {
      return string.substring(0, 30) + '...';
    }

  },
  mounted() {
    if (localStorage.getItem('panier')) {
      this.cart = JSON.parse(localStorage.getItem('panier'))
      this.counter = this.cart.length
      let carticon = document.getElementById("carticon")
      carticon.style.display = "block"
    }


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