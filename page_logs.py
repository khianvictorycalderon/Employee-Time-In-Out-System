from tkinter import *
import customtkinter as ctk

# Defaults
from colors import * # color_1, color_2, up to color_6
from fonts import * # font_1, font_2, up to font_4
from global_var import *

# Templates
from ctk_temp_treeview import create_treeview
from opxl_temp_read import opxl_read

def logs_page(parent):
    ctk.CTkLabel(parent, text="Logs", font=font_1).pack(pady=20)

    # Read log data (Status, Employee ID, Time, Date)
    log_data = opxl_read(db_path, log_sheet)

    # Create a mapping of ID -> Name from the employee sheet
    employee_map_raw = opxl_read(db_path, employee_sheet, columns=["ID", "Employee Name"])
    employee_map = {row[0]: row[1] for row in employee_map_raw}

    # Replace Employee ID with Employee Name in the logs
    processed_log_data = []
    for row in log_data:
        status, emp_id, time, date = row
        name = employee_map.get(emp_id, emp_id)  # fallback to ID if name not found
        processed_log_data.append([status, name, time, date])

    # Reverse order if more than 1 entry
    if len(processed_log_data) > 1:
        processed_log_data = processed_log_data[::-1]

    tree_columns = ["Status", "Employee Name", "Time", "Date"]
    create_treeview(
        parent, 
        columns=tree_columns, 
        data=processed_log_data,

        # General (Applies to all)
        content_bg=color_2,
        text_color=color_6,
        font=font_2,
        
        # Rows
        alternate_row_bg=True,
        row_a_bg=color_3,
        row_b_bg=color_2,
        row_height=50,
        
        # Header
        header_bg_color=color_1,
        header_text_color=color_6,
        
    ).pack(fill=BOTH)