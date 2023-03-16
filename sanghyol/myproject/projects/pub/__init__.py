from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy


import config

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    app.secret_key = "test_secret_key"

    #ORM
    db.init_app(app)
    migrate.init_app(app, db)
    from . import models

    #blueprint
    from .views import main_views, market_views
    from .purchase import purchase
    app.register_blueprint(main_views.bp)
    app.register_blueprint(market_views.bp)
    app.register_blueprint(purchase.bp)
    return app