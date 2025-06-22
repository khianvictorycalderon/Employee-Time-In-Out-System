# Main entry point of the program, run this .py file
from tkinter import *
import customtkinter as ctk
import sys

# Defaults
from colors import * # color_1, color_2, up to color_6
from fonts import * # font_1, font_2, up to font_4
from global_var import * # db_path

# Templates
from opxl_temp_ensures import * # ensure_excel_exist, ensure_sheet_exist, and remove_sheet
from opxl_temp_headers import opxl_write_headers
from ctk_temp_dual_frame import create_dual_frame

# Pages
from page_time_in_out import time_in_out_page
from page_logs import logs_page
from page_employees import employees_page
from page_credits import credits_page

app = ctk.CTk()
screen_width = app.winfo_screenwidth()
screen_height = app.winfo_screenheight()
app.geometry(f"{screen_width}x{screen_height}+0+0")
app.update()
app.state("zoomed")
# app.iconbitmap("./Icons/ETIOS.ico")
app.title("Employee Time In Out System")

# Ensure that everything works correctly:
ensure_excel_exist(db_path)
ensure_sheet_exist(db_path, employee_sheet)
opxl_write_headers(db_path, employee_sheet, headers=["ID", "Employee Name"])
ensure_sheet_exist(db_path, log_sheet)
opxl_write_headers(db_path, log_sheet, headers=["Status", "Employee ID", "Time", "Date"])
remove_sheet(db_path, "Sheet")

frame_content = {
    "Employee & Logs": {
        "Time In / Out": time_in_out_page,
        "Logs": logs_page,
        "Employees": employees_page
    },
    "Misc": {
        "Credits": credits_page,
        "Quit": lambda _: sys.exit()
    }
}

dual_frame = create_dual_frame(app, frame_content, left_frame_bg_color=color_1, right_frame_bg_color=color_2, button_hover_color=color_3, left_frame_font=font_2)
dual_frame.pack(expand = True, fill = BOTH)

app.mainloop()