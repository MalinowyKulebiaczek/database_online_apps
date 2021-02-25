const CarDelete = Vue.component('car-delete', {
    template: `
    <form id="car-form" @submit.prevent="process()" >    
        <table style="width: 800px;">
            <tr>
                <td><label for="id">ID to be deleted</label></td>
                <td><input type="text" id="id" name="id" value="$route.params.id" v-model="id"></td>
            </tr>

            <tr>
            <td colspan="2">
                <button type="submit" style="width: 80px; display: block; margin: auto">OK</button>
            </td>
            </tr>
        </table>
    </form>` 
    ,
    data: function() {
        return {
            id: this.$route.params.id
        }
    }, 
    methods: {
        process: function() {
            console.log("form: ", this.id);
            msg = {
                id: this.id
            }
            axios.post("/webresources/delete-cars", 
            JSON.stringify(msg), 
             {   
                 headers: {
                 'Content-Type': 'application/json; charset=UTF-8'
                 }
             }
            ).then((response) => {
                console.log(response);
                this.$router.push('/lista');
            }).catch(error => {
                alert("Error: " + error)
            });
        }
    }
    /*created: function() {
        axios.get("/webresources/cars").then((response) => {
          const data = response.data;
          console.log(data);
          this.cars = data;
        }).catch(error => {
          alert("Error: " + error)
        });
    }*/
})
 