import json
import sys
import pandas as pd

data = pd.read_excel("./data_base.xlsx",sheet_name="Datos")

final_dic = {}
flag = 0
try:
    arr = sys.argv[1].split("&")
    search = arr[0]
    field = arr[1]
except IndexError:
    flag = 1

for i in range(len(data)):
    t_vec = []
    try:
        odata = {}
        row = data.iloc[i]
        if flag == 0:
            if row[field] == search:
                odata["tipo_rep"] = row["tipo_rep"]
                odata["usr"] = row["usr"]
                odata["tipo_usr"] = row["tipo_usr"]
                odata["ubicacion"] = row["ubicacion"]
                odata["fecha"] = row["fecha"]
                odata["hora"] = row["hora"]
                odata["descripcion"] = row["descripcion"]
        else:
            odata["tipo_rep"] = row["tipo_rep"]
            odata["usr"] = row["usr"]
            odata["tipo_usr"] = row["tipo_usr"]
            odata["ubicacion"] = row["ubicacion"]
            odata["fecha"] = row["fecha"]
            odata["hora"] = row["hora"]
            odata["descripcion"] = row["descripcion"]

        final_dic[str(i+1)] = odata
    except IndexError:
        pass

result = json.dumps(final_dic).encode("utf8")
print(result)