import sqlite3

from flask import Flask, redirect, request, url_for
from flask import render_template

app = Flask(__name__, template_folder="templates")


#def hello_world():
#@app.route('/')
#def redirect():
#    return redirect(url_for('get_cars'))


# @app.route('/index/')
# def index():
#    return app.send_static_file('index.html')

@app.route('/')
def get_cars():
    conn = sqlite3.connect('cars.db')
    cursor = conn.cursor()
    query = "SELECT * FROM cars"
    cursor.execute(query)
    data = cursor.fetchall()
    conn.commit()
    conn.close()

    return render_template('cars.html', data=data)


@app.route('/update-cars/<int:car_id>', methods=["GET"])
def update_cars_form(car_id):
    try:
        conn = sqlite3.connect('cars.db')
        cursor = conn.cursor()
        query = "SELECT * FROM cars where car_id=?"
        cursor.execute(query, (car_id,))
        data = cursor.fetchall()
        conn.commit()
        conn.close()
        return render_template("update-cars.html", data=data[0])
    except Exception as err:
        return "Error! " + str(err), 500


@app.route('/update-cars', methods=["POST"])
def update_cars_db():
    try:
        car_id = int(request.form['car-id'])
        price = int(request.form['price'])
        brand = request.form['brand']
        model = request.form['model']
        year = int(request.form['year'])
        title_status = request.form['title_status']
        mileage = float(request.form['mileage'])
        color = request.form['color']

        conn = sqlite3.connect('cars.db')
        cursor = conn.cursor()
        query = "UPDATE cars SET price=?, brand=?, model=?, year=?, " + \
                "title_status=?, mileage=?, color=? WHERE car_id=?"
        cursor.execute(query, (price, brand, model, year, title_status, mileage, color, car_id))
        conn.commit()
        conn.close()
        return redirect(url_for('get_cars'))
    except Exception as err:
        return "Error! " + str(err), 500


@app.route('/delete-cars/<int:car_id>', methods=["GET"])
def delete_cars_form(car_id):
    try:
        conn = sqlite3.connect('cars.db')
        cursor = conn.cursor()
        query = "SELECT * FROM cars where car_id=?"
        cursor.execute(query, (car_id,))
        data = cursor.fetchall()
        conn.commit()
        conn.close()
        return render_template("delete-cars.html", data=data[0])
    except Exception as err:
        return "Error! " + str(err), 500

@app.route('/delete-cars', methods=["POST"])
def delete_cars_db():
    try:
        car_id = int(request.form['car-id'])

        conn = sqlite3.connect('cars.db')
        cursor = conn.cursor()
        query = "DELETE FROM cars WHERE car_id=?"
        cursor.execute(query, (car_id,))
        conn.commit()
        conn.close()
        return redirect(url_for('get_cars'))
    except Exception as err:
        return "Error! " + str(err), 500

@app.route('/add-cars/form')
def add_cars_form():
        return render_template("add-cars.html")


@app.route('/add-cars', methods=["POST"])
def add_cars_db():
    try:
        price = int(request.form['price'])
        brand = request.form['brand']
        model = request.form['model']
        year = int(request.form['year'])
        title_status = request.form['title_status']
        mileage = float(request.form['mileage'])
        color = request.form['color']

        conn = sqlite3.connect('cars.db')
        cursor = conn.cursor()
        query = "INSERT INTO cars(price, brand, model, year, title_status, mileage, color)"+\
                "VALUES(?,?,?,?,?,?,?)"
        cursor.execute(query, (price, brand, model, year, title_status, mileage, color))
        conn.commit()
        conn.close()
        return redirect(url_for('get_cars'))
    except Exception as err:
        return "Error! " + str(err), 500

if __name__ == '__main__':
    #app.run()
    app.run(debug=True)
