from tkinter import *
import customtkinter as ctk

# Defaults
from colors import * # color_1, color_2, up to color_6
from fonts import * # font_1, font_2, up to font_4

# Templates
from ctk_temp_flex_text import create_flex_text

def credits_page(parent):
    ctk.CTkLabel(parent, text="Credits", font=font_1).pack(pady=20)

    data = {
        "Developer": [
            "Khian Victory D. Calderon"
        ],
        "Contact Me": [
            "https://khian.netlify.app/",
            "https://github.com/khianvictorycalderon/",
            "https://www.upwork.com/freelancers/~013a9c6d4543925f1e",
            "https://www.linkedin.com/in/khian-victory-d-calderon-b1493030a/",
            "https://x.com/KhianVictory",
            "https://www.instagram.com/khiandelapena/",
            "https://www.tiktok.com/@khian.vc"
        ],
    }

    create_flex_text(parent, data, bg_color=color_2, title_font=font_2, subtitle_font=font_3).pack(fill = BOTH)
