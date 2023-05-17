import sys
import pandas as pd


data = pd.read_excel("./data_base.xlsx",sheet_name="Usuarios")
order_data = []

arr = sys.argv[1].split("&")
user = arr[0]
password = arr[1]
cont = 0
for i in range(len(data)):
    t_vec = []
    try:
        row = data.iloc[i]
        if row['user'] == user and row['password'] == password:
            cont =+ 1
            print("succefull_login")
        """t_vec.append(row['usuario'])
        t_vec.append(row['contraseña'])
        t_vec.append(row['tipo'])
        order_data.append(t_vec)"""
    except IndexError:
        pass
if cont == 0:
    print("user_error")
#print(order_data[-1])






