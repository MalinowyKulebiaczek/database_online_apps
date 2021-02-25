const NotFound = { template: '<div>nie ma takiego numeru</div>' }

const routes = [
    { path: '/', redirect: '/lista'},
    { path: '/lista', 
      component: CarLista, 
      name: "lista"
    },
    { path: '/delete/:id', 
    component: CarDelete, 
    name: "delete"
    },
    { path: '/modify/:id', 
    component: CarModify, 
    name: "modify"
    },
    { path: '/nowy', name: 'nowy', component: CarForm },
    { path: '*', component: NotFound
    }
]

const router = new VueRouter({
    routes: routes
})

const app = new Vue({
    router: router,    
    data: {
      cars: "abc"
    },
    methods: {
      send: function() {
        console.log("submit form");
      }
  }
  }).$mount('#app')
