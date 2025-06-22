from tkinter import *
import customtkinter as ctk
from tkinter import messagebox

# Defaults
from colors import * # color_1, color_2, up to color_6
from fonts import * # font_1, font_2, up to font_4
from global_var import *
from utility_helper_functions import * # get_current_time, get_current_date

# Templates
from ctk_temp_entry_dropdown_mixed_input import create_entry_dropdown
from opxl_temp_insert import opxl_insert
from opxl_temp_read import opxl_read

def time_in_out_page(parent):
    ctk.CTkLabel(parent, text="Time In & Out", font=font_1).pack(pady=20)

    input_vars = {}
    input_fields = {
        "Employee ID": "text",
    }

    def log_data():
        input_id_raw = input_vars["Employee ID"].get().strip()  # preserve original casing
        input_id = input_id_raw.lower()  # for comparison only

        # Validate if ID exists (case-insensitive match)
        existing_ids = [row[0].lower() for row in opxl_read(db_path, employee_sheet, columns=["ID"])]
        if input_id not in existing_ids:
            messagebox.showerror("Log Failed", "Employee ID doesn't exist.")
            return

        try:
            # Read existing logs for this employee using original casing
            this_employee_log = opxl_read(
                db_path,
                log_sheet,
                columns=["Status"],
                condition={"Employee ID": input_id_raw}
            )

            # Determine status based on last log
            if this_employee_log:
                last_status = this_employee_log[-1][0]
                status = "In" if last_status == "Out" else "Out"
            else:
                status = "In"

            # Insert new log
            opxl_insert(
                db_path,
                log_sheet,
                [status, input_id_raw, get_current_time(), get_current_date()]
            )

            # Fetch employee name for feedback message
            employee_name = opxl_read(
                db_path,
                employee_sheet,
                columns=["Employee Name"],
                condition={"ID": input_id_raw}
            )[0][0]  # Extract actual name string from [[name]]

            messagebox.showinfo("Logged", f"Time {status} for Employee '{employee_name}'")
            input_vars["Employee ID"].set("") # Clears the input

        except Exception as error:
            messagebox.showerror("Log Failed", f"Unable to log: {error}")

    create_entry_dropdown(
        parent, 
        input_fields, 
        default_font=font_2,
        col_per_rows=1, 
        input_bg_color=color_3,
        input_text_color=color_6,
        button_color=color_4,
        button_hover_color=color_5,
        variable=input_vars,
        button_label="Log",
        on_submit=log_data
    ).pack(fill = BOTH)