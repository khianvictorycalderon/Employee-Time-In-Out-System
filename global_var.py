import os

db_path = os.path.join(os.environ["PUBLIC"], "KV-Project-Manager-Data", "data.xlsx")

project_sheet_headers = ["ID", "Name", "Description", "Date Started", "Date Finished", "Remarks"]
edit_update_field = [field for field in project_sheet_headers if field != "ID"]
project_sheet = "Projects"