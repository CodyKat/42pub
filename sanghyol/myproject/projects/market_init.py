from pub import db
from pub.models import Market

market = Market(item_name="gloves", enhance=1, price=100)
db.session.add(market)
market = Market(item_name="knife", enhance=2, price=10)
db.session.add(market)
market = Market(item_name="boots", enhance=0, price=42)
db.session.add(market)
db.session.commit()

from pub.models import Users
user = Users(username='user42', password='user42', level=1, point=100, money=10000)
db.session.add(user)
db.session.commit()