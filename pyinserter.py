import sys
import openpyxl as op

string = sys.argv[1]
array = string.split(",")

book = op.load_workbook("./data_base.xlsx")
sheet = book.worksheets[1]
row = (array[0],array[1],array[2],array[3],array[4],array[5],array[6])
sheet.append(row)

book.save('./data_base.xlsx')

print("Datos registrados con exito")


