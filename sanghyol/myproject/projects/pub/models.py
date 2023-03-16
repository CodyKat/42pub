from pub import db


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    level = db.Column(db.Integer, nullable=False)
    point = db.Column(db.Integer, nullable=False)
    money = db.Column(db.Integer, nullable=False)

#Image 추가
class Market(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(100), unique=True, nullable=False)
    price = db.Column(db.Integer, nullable=True)
    grade = db.Column(db.Integer, nullable=True)
    description = db.Column(db.Text(), nullable=True)

# class-> 유저별로 인벤토리모델을 새로 만들어서, 강화/개수/특히 강화에 따른 같은 아이템도 다르게 판별해야함.
class Inventory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=True)
    item_name = db.Column(db.String(100), nullable=True)
    enhance = db.Column(db.Integer, nullable=True)
    grade = db.Column(db.Integer, nullable=True)