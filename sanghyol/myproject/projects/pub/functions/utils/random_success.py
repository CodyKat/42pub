from random import random

def by_probability()->bool:
    if random() <= 0.1:
        return True
    else:
        return False