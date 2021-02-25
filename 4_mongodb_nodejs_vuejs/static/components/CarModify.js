const CarModify = Vue.component('car-modify', {
    template: `
    <form id="car-modify" @submit.prevent="process()" >    
    <table>

    <tr>
        <td style="width: 10%;"><label for="id">ID</label></td>
        <td style="width: 90%;"><input type="text" id="id" name="id" v-model="id"></td>
    </tr>

    <tr>
        <td><label for="price">Price</label></td>
        <td><input size="1000" type="number" min="0" id="price" name="price" v-model="price"></td>
    </tr>
    <tr>
        <td><label for="brand">Brand</label></td>
        <td><input type="text" id="brand" name="brand" v-model="brand"></td>
    </tr>

    <tr>
        <td><label for="model">Model</label></td>
        <td><input type="text" id="model" name="model" v-model="model"></td>
    </tr>

    <tr>
        <td><label for="year">Year</label></td>
        <td><input type="number" min="1900" id="year" name="year" v-model="year"></td>
    </tr>

    <tr>
        <td><label for="title_status">Title Status</label></td>
        <td>
            <select name="title_status" id="title_status" v-model="title_status">
                <option value="clean vehicle">clean vehicle</option>
                <option value="broken vehicle">broken vehicle</option>
            </select>
        </td>
    </tr>

    <tr>
        <td><label for="mileage">Mileage</label></td>
        <td><input type="number" min="0" step=".01" id="mileage" name="mileage" v-model="mileage"></td>
    </tr>

    <tr>
        <td><label for="color">Color</label></td>
        <td><input type="text" id="color" name="color" v-model="color"></td>
    </tr>

        <tr>
            <td colspan="2">
                <button type="submit" style="width: 80px; display: block; margin: auto">Update</button>
            </td>
        </tr>
    </table>
    </form>` 
    ,
    data: function() {
        return {
            id: this.$route.params.id,
            price: null,
            brand: "",
            model: "",
            year: null,
            title_status: "",
            mileage: null,
            color: "" 
        }
    }, 
    methods: {
        process: function() {
            console.log("form: id=", this.id, "form: price=", this.price, "brand=", this.brand, "model=", this.model,"year=", this.year, 'title_status=', this.title_status, "mileage=", this.mileage,"color=", this.color);
            car = {
                id: this.id,
                price: parseInt(this.price),
                brand: this.brand,
                model: this.model,
                year: parseInt(this.year),
                title_status: this.title_status,
                mileage: parseFloat(this.mileage),
                color: this.color
            }
            axios.post("/webresources/modify-cars", 
                       JSON.stringify(car), 
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
})
 