from pub import db


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    level = db.Column(db.Integer, nullable=False)
    point = db.Column(db.Integer, nullable=False)
    money = db.Column(db.Integer, nullable=False)
    itemPossession = db.Column(db.String(100), nullable=True)


class Market(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    items = db.Column(db.String(100), unique=True, nullable=False)
    enhance = db.Column(db.Integer, nullable=True)
    price = db.Column(db.Integer, nullable=True)
    