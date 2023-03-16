from pub import db
from pub.models import Market

market = Market(items="gloves", enhance=1, price=100)
db.session.add(market)
market = Market(items="knife", enhance=2, price=10)
db.session.add(market)
market = Market(items="boots", enhance=0, price=42)
db.session.add(market)
db.session.commit()
