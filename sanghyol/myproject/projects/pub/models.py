from pub import db


class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(100), unique=True, nullable=True)
    enhancement = db.Column(db.Integer, nullable=True)
    grade = db.Column(db.Float, nullable=True)
    price = db.Column(db.Integer, nullable=False, default=0)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'enhancement': self.enhancement,
            'grade': self.grade,
            'price': self.price
        }


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    info = db.relationship('Info', backref='user', uselist=False)
    equipment = db.relationship('Equipment', backref='user', uselist=False)
    inventory = db.relationship('Inventory', backref='user')

    class Info(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
        user_name = db.Column(db.String(20), unique=True, nullable=False, default="User42")
        wallet = db.Column(db.Integer, nullable=False, default=0)
        eval_point = db.Column(db.Integer, nullable=False, default=0)    
        money = db.Column(db.Integer, nullable=False, default=0)
        level = db.Column(db.Integer, nullable=False, default=0)
        exp = db.Column(db.Float, nullable=False, default=0)


    class Equipment(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
        hair = db.Column(db.String(100), nullable=True)
        boots = db.Column(db.String(100), nullable=True)
        shirts = db.Column(db.String(100), nullable=True)
        pants = db.Column(db.String(100), nullable=True)
        weapon = db.Column(db.String(100), nullable=True)

    class Inventory(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        user_id = db.Column(db.Integer, db.ForeignKey('users.id', name='fk_inventory_user_id'))
        item_id = db.Column(db.Integer, db.ForeignKey('item.id', name='fk_inventory_item_id'))
        inven_item_name = db.Column(db.String(100), unique=False, nullable=True)