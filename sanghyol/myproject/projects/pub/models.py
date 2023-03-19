from pub import db


class UserInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    UserName = db.Column(db.String(20), unique=True, nullable=False, default="User42")
    Wallet = db.Column(db.Integer, nullable=False, default=0)
    Money = db.Column(db.Integer, nullable=False, default=0)
    EvalPoint = db.Column(db.Integer, nullable=False, default=0)    
    Level = db.Column(db.Integer, nullable=False, default=0)
    EXP = db.Column(db.Float, nullable=False, default=0)

    Inventory = db.relationship('Inventory', backref='user', lazy=True)
    ShowRoom = db.relationship('Inventory', backref='user', uselist=False)

    class Inventory(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        itemId = db.Column(db.Integer, nullable=True)
        ItemName = db.Column(db.String(100), nullable=True)
        Category = db.Column(db.Text(), nullable=True)
        SubCategory = db.Column(db.Text(), nullable=True)
        Enhancement = db.Column(db.Integer, nullable=False, default=0)
        Mounted = db.Column(db.Boolean, nullable=False, default=False)
        Icon = db.Column(db.Text(), nullable=True)

    class ShowRoom(Inventory):
        __tablename__ = 'show_room'
        id = db.Column(db.Integer, db.ForeignKey('inventory.id', name='fk_ShowRoom'), primary_key=True)

class Subject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Title = db.Column(db.String(100), unique=True, nullable=True)
