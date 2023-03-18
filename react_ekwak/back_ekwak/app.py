#from flask import Flask, jsonify
#from flask_cors import CORS
#from flask_sqlalchemy import SQLAlchemy

#app = Flask(__name__)
#CORS(app)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///items.db'
#db = SQLAlchemy(app)

#class Item(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#    name = db.Column(db.String(100), nullable=False)
#    count = db.Column(db.Integer, nullable=False)
#    grade = db.Column(db.Integer, nullable=False)
#    enhancement = db.Column(db.Integer, nullable=False)
#    price = db.Column(db.Integer, nullable=False)
#    description = db.Column(db.Text, nullable=False)
#    img = db.Column(db.String(100), nullable=False)

#    def to_dict(self):
#        return {
#            'id': self.id,
#            'name': self.name,
#            'count': self.count,
#            'grade': self.grade,
#            'enhancement': self.enhancement,
#            'price': self.price,
#            'description': self.description,
#            'img': self.img
#        }

#with app.app_context():
#    db.create_all()

#if __name__ == '__main__':
#    with app.app_context():
#        db.drop_all()
#        db.create_all()

#        # Sample data
#        sample_data = [
#            {
#              'name': '교복신발',
#              'count': 0,
#              'grade': 0,
#              'enhancement': 0,
#              'price': 40.00,
#              'description': '교복신발 입니다',
#              'img': '교복신발.png'
#            },
#            {
#              'name': '루시드드림',
#              'count': 0,
#              'grade': 0,
#              'enhancement': 0,
#              'price': 25.00,
#              'description': '루시드드림 입니다',
#              'img': '루시드드림.png'
#            },
#            {
#              'name': '루시드실크헷',
#              'count': 0,
#              'grade': 0,
#              'enhancement': 0,
#              'price': 25.00,
#              'description': '루시드실크헷 입니다',
#              'img': '루시드실크헷.png'
#            },
#            {
#              'name': '분필',
#              'count': 0,
#              'grade': 0,
#              'enhancement': 0,
#              'price': 25.00,
#              'description': '분필 입니다',
#              'img': '분필.png'
#            },
#            {
#              'name': '교복모자',
#              'count': 0,
#              'grade': 0,
#              'enhancement': 0,
#              'price': 25.00,
#              'description': '교복모자 입니다',
#              'img': '교복모자.png'
#            },
#            {
#              'name': '교복상의',
#              'count': 0,
#              'grade': 0,
#              'enhancement': 0,
#              'price': 25.00,
#              'description': '교복상의 입니다',
#              'img': '교복상의.png'
#            },
#            {
#              'name': '건-항아리',
#              'count': 0,
#              'grade': 0,
#              'enhancement': 0,
#              'price': 10.00,
#              'description': '건 항아리 입니다',
#              'img': '건-항아리.png'
#            }
#        ]

#        # Add sample data to the database if it's empty
#        if len(Item.query.all()) == 0:
#            for data in sample_data:
#                item = Item(**data)
#                db.session.add(item)
#            db.session.commit()

#        @app.route('/api/hello')
#        def hello_world():
#            data = {
#                'message': 'Hello World!'
#            }
#            return jsonify(data)

#        @app.route('/api/items')
#        def get_items():
#            items = Item.query.all()
#            return jsonify([item.to_dict() for item in items])

#    app.run(debug=True)
from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/hello')
def hello_world():
    data = {
        'message': 'Hello World!'
    }
    return jsonify(data)

@app.route('/api/items')
def get_items():
    items = []
    base_url = 'https://maplestory.io/api/KMST/1150/item/'
    item_ranges = [
        range(20000, 20050,10),
        range(30000, 30050,10),
        range(1060000, 1060800),
        range(1042000, 1042026),
        range(1702000, 1702010),
    ]

    for item_range in item_ranges:
        success_count = 0
        for item_id in item_range:
            if success_count >= 5:
                break
            url = f'{base_url}{item_id}'
            response = requests.get(url)

            if response.status_code == 200:
                try:
                    if success_count == 0:
                      print(response.json())
                    item_json = response.json()
                    item_data = {
                        'id': item_id,
                        'name': item_json['description'].get('name') if 'description' in item_json else 'Unknown',
                        'description': item_json['description'].get('description') if 'description' in item_json else 'Unknown',
                        'typeInfo': item_json.get('typeInfo', {}),
                        'subCategory': item_json['typeInfo'].get('subCategory') if 'typeInfo' in item_json else 'Unknown',
                        'isCash': item_json['metaInfo'].get('cash') if 'metaInfo' in item_json else False,
                        'icon': f'{base_url}{item_id}/icon'
                    }
                    items.append(item_data)
                    print(f"Added item_id {item_id} to items list")
                    success_count += 1
                except Exception as e:
                    print(f"Error parsing JSON for item_id {item_id}: {e}")

    return jsonify(items)



if __name__ == '__main__':
    app.run(debug=True)
