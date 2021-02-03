let products = new Vue({
  el: '#app',

  data() {
    return {
      info: null,
      loading: true,
      errored: false,
      cart: [],
      counter: 0,
      pricefilter:"",
      categoryfilter:"",
      search:"",
    }
  },
  computed: {
    sortedArray(){
        let tempInfo=this.info
        if (this.search != '' && this.search) {
          tempInfo = tempInfo.filter((item) => {
            return item.title
              .toUpperCase()
              .includes(this.search.toUpperCase())
            })
        }
        if(this.categoryfilter !="" && this.categoryfilter){
          tempInfo = tempInfo.filter((item) => {
            return (item.category===this.categoryfilter)
          })
        }
        if(this.pricefilter !="" && this.pricefilter){
          tempInfo = tempInfo.filter((item) => {
            switch (this.pricefilter){
              case "10":
                return (item.price < 10);
                
              case "50":
                return (item.price>=10 && item.price<50);
                
              case "51":
                return (item.price>=50 && item.price<100);
                
              case "101":
                return (item.price >= 100);
                              
              default:
                return tempInfo;   
            }
          })
        }
      return tempInfo
    },
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
        this.removeproduct(index)
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
        document.getElementById("carticon").style.display = "none"
      } else {
        localStorage.setItem('panier', JSON.stringify(this.cart))
      }
    },
  },
  filters: {

    subStr30: function (string) {
      return string.substring(0, 30) + '...';
    },
    subStr50: function (string) {
      if(string.length>50){
      return string.substring(0, 50) + '...';}
      else{ return string}
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