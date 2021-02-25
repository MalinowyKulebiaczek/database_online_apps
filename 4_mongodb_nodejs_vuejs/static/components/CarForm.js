const CarForm = Vue.component('car-form', {
    template: `
    <form id="car-form" @submit.prevent="process()" >    
    <table style="width: 800px;">

    <tr>
        <td style="width: 10%;"><label for="price">Price</label></td>
        <td style="width: 90%;"><input type="number" min="0" id="price" name="price" v-model="price"></td>
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
                <button type="submit" style="width: 80px; display: block; margin: auto">OK</button>
            </td>
        </tr>
    </table>
    </form>` 
    ,
    data: function() {
        return {
            price: 10,
            brand: "default_brand",
            model: "default_model",
            year: 2000,
            title_status: "clean vehicle",
            mileage: 1000,
            color: "default_color" 
        }
    }, 
    methods: {
        process: function() {
            console.log("form: price=", this.price, "brand=", this.brand, "model=", this.model,"year=", this.year, 'title_status=', this.title_status, "mileage=", this.mileage,"color=", this.color);
            car = {
                price: parseInt(this.price),
                brand: this.brand,
                model: this.model,
                year: parseInt(this.year),
                title_status: this.title_status,
                mileage: parseFloat(this.mileage),
                color: this.color
            }
            axios.post("/webresources/cars", 
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
 