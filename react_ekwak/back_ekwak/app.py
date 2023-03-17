from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///items.db'
db = SQLAlchemy(app)

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    count = db.Column(db.Integer, nullable=False)
    grade = db.Column(db.Integer, nullable=False)
    enhancement = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    img = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'count': self.count,
            'grade': self.grade,
            'enhancement': self.enhancement,
            'price': self.price,
            'description': self.description,
            'img': self.img
        }

with app.app_context():
    db.create_all()

    # Sample data
    sample_data = [
        {
          'name': '교복신발',
          'count': 0,
          'grade': 0,
          'enhancement': 0,
          'price': 40.00,
          'description': '교복신발 입니다',
          'img': '교복신발.png'
        },
        {
          'name': '루시드드림',
          'count': 0,
          'grade': 0,
          'enhancement': 0,
          'price': 25.00,
          'description': '루시드드림 입니다',
          'img': '루시드드림.png'
        },
        {
          'name': '루시드실크헷',
          'count': 0,
          'grade': 0,
          'enhancement': 0,
          'price': 25.00,
          'description': '루시드실크헷 입니다',
          'img': '루시드실크헷.png'
        },
        {
          'name': '분필',
          'count': 0,
          'grade': 0,
          'enhancement': 0,
          'price': 25.00,
          'description': '분필 입니다',
          'img': '분필.png'
        },
        {
          'name': '교복모자',
          'count': 0,
          'grade': 0,
          'enhancement': 0,
          'price': 25.00,
          'description': '교복모자 입니다',
          'img': '교복모자.png'
        },
	]

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

        # Sample data
        sample_data = [
            {
              'name': '교복신발',
              'count': 0,
              'grade': 0,
              'enhancement': 0,
              'price': 40.00,
              'description': '교복신발 입니다',
              'img': '교복신발.png'
            },
            {
              'name': '루시드드림',
              'count': 0,
              'grade': 0,
              'enhancement': 0,
              'price': 25.00,
              'description': '루시드드림 입니다',
              'img': '루시드드림.png'
            },
            {
              'name': '루시드실크헷',
              'count': 0,
              'grade': 0,
              'enhancement': 0,
              'price': 25.00,
              'description': '루시드실크헷 입니다',
              'img': '루시드실크헷.png'
            },
            {
              'name': '분필',
              'count': 0,
              'grade': 0,
              'enhancement': 0,
              'price': 25.00,
              'description': '분필 입니다',
              'img': '분필.png'
            },
            {
              'name': '교복모자',
              'count': 0,
              'grade': 0,
              'enhancement': 0,
              'price': 25.00,
              'description': '교복모자 입니다',
              'img': '교복모자.png'
            },
            {
              'name': '교복상의',
              'count': 0,
              'grade': 0,
              'enhancement': 0,
              'price': 25.00,
              'description': '교복상의 입니다',
              'img': '교복상의.png'
            },
            {
              'name': '건-항아리',
              'count': 0,
              'grade': 0,
              'enhancement': 0,
              'price': 10.00,
              'description': '건 항아리 입니다',
              'img': '건-항아리.png'
            }
        ]

        # Add sample data to the database if it's empty
        if len(Item.query.all()) == 0:
            for data in sample_data:
                item = Item(**data)
                db.session.add(item)
            db.session.commit()

        @app.route('/api/hello')
        def hello_world():
            data = {
                'message': 'Hello World!'
            }
            return jsonify(data)

        @app.route('/api/items')
        def get_items():
            items = Item.query.all()
            return jsonify([item.to_dict() for item in items])

    app.run(debug=True)
