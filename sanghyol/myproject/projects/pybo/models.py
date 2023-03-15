from pybo import db


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    level = db.Column(db.Integer, nullable=False)
    point = db.Column(db.Integer, nullable=False)


class Market(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    items = db.Column(db.String(100), unique=True, nullable=False)
    count = db.Column(db.Integer, nullable=False)