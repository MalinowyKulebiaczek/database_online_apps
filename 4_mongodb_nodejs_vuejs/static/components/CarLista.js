const CarLista = Vue.component('car-lista', {
    data: function () {
        return { cars: null}
    },
    template: 
    `

    <table>
                <thead>
                <td> edit? </td>
                <td> id </td>
                <td> price </td>
                <td> brand </td>
                <td> model </td>
                <td> year </td>
                <td> title_status </td>
                <td> mileage </td>
                <td> color </td>
                <td> delete? </td>
                </thead>
                <tbody>
                    
                        <tr v-for="item in cars">
                            
                        <td><router-link :to="{name: 'modify', params: {id: item._id}}">edit</router-link></td>  
                                <td v-for="i in item">{{i}}</td>
                        <td><router-link :to="{name: 'delete', params: {id: item._id}}">delete</router-link></td>   
                        </tr>
                    </tbody>
            </table>
    </div>`,
    created: function() {
      axios.get("/webresources/cars").then((response) => {
        const data = response.data;
        console.log(data);
        this.cars = data;
      }).catch(error => {
        alert("Error: " + error)
      });
    }
  })
  