import random
import string

def generate_random_name(length=5):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))

def generate_random_number(length=4):
    digits = string.digits
    return ''.join(random.choice(digits) for i in range(length))

def generate_user_id():
    random_name = generate_random_name()
    random_number = generate_random_number()
    return f"{random_name}{random_number}"
