from datetime import datetime

def get_current_time():
    return datetime.now().strftime("%I:%M %p").lstrip("0")

def get_current_date():
    return datetime.now().strftime("%m/%d/%Y")