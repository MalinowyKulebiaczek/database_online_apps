import sqlite3

def cut_string(original, word_before_which_you_cut):
    original=original.split(word_before_which_you_cut)
    modified_string = original[0]
    return modified_string

with open('USA_cars_datasets_good.csv', 'r') as file:
    conn = sqlite3.connect("cars.db")
    conn.execute("DROP TABLE IF EXISTS cars")
    conn.execute("CREATE TABLE cars("+
                 "[car_id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "+
                 "[price] INTEGER NOT NULL, " +
                 "[brand] VARCHAR(32) NOT NULL, " +
                 "[model] VARCHAR(32) NOT NULL, "+
                 "[year] INTEGER NOT NULL, "+
                 "[title_status] VARCHAR(32) NOT NULL, " +
                 "[mileage] REAL NOT NULL, "+
                 "[color] VARCHAR(32) NOT NULL)")

    first_row = True
    i=0
    for row in file:
        if i>=50:
            break
        if first_row:
            columns = row.rstrip().split()
            columns[0] = cut_string(columns[0], ',vin')
            first_row = False
        else:
            values = row.rstrip().split(',')
            values = values[:8]
            query = "INSERT INTO cars(" + ",".join(columns) +") VALUES(?,?,?,?,?,?,?,?)"
            conn.execute(query, tuple(values))
        i += 1

    conn.commit()
    conn.close()
