from tkinter import *
import customtkinter as ctk

# Defaults
from colors import * # color_1, color_2, up to color_6
from fonts import * # font_1, font_2, up to font_4

def employees_page(parent):
    ctk.CTkLabel(parent, text="Employees", font=font_1).pack(pady=20)