from tkinter import *
import customtkinter as ctk
from tkinter import messagebox

# Defaults
from colors import * # color_1, color_2, up to color_6
from fonts import * # font_1, font_2, up to font_4
from global_var import *

# Templates
from ctk_temp_editable_list import create_editable_list
from opxl_temp_insert import opxl_insert
from opxl_temp_read import opxl_read
from opxl_temp_delete import opxl_delete

def employees_page(parent):
    ctk.CTkLabel(parent, text="Employees", font=font_1).pack(pady=20)

    columns = {
        "ID": "text",
        "Employee Name": "text"
    }

    # Read all employees
    employee_list = opxl_read(db_path, employee_sheet)

    # Declare editable_list in outer scope so we can reassign it
    editable_list = None

    def save_employees(new_data):
        nonlocal editable_list  # So we can modify the outer variable
        seen_ids = set()
        filtered_data = []
        duplicates = []

        for item in new_data:
            emp_id_raw = item[0]
            emp_id = emp_id_raw.strip().lower()  # Normalize to lowercase for duplicate checking

            if emp_id in seen_ids:
                duplicates.append(item)
            else:
                seen_ids.add(emp_id)
                filtered_data.append(item)

        if duplicates:
            messagebox.showerror("Save Failed", "Unable to save: Duplicate ID found (case-insensitive check).")
            if editable_list:
                editable_list.destroy()

            # Recreate editable list with filtered (unique) data
            editable_list = create_editable_list(
                parent,
                columns=columns,
                data_list=filtered_data,
                on_save=save_employees,
                content_bg=color_2,
                font=font_2
            )
            editable_list.pack(expand=True, fill=BOTH)
            return  # Do not proceed to save to Excel if there were duplicates

        # No duplicates, safe to overwrite Excel
        opxl_delete(db_path, employee_sheet)
        opxl_insert(db_path, employee_sheet, data=filtered_data)

    # Initial creation of editable list
    editable_list = create_editable_list(
        parent,
        columns=columns,
        data_list=employee_list,
        on_save=save_employees,
        content_bg=color_2,
        font=font_2
    )
    editable_list.pack(expand=True, fill=BOTH)