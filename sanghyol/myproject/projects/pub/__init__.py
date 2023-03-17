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
    from .views import main_views, market_views, profile_views
    from .purchase import purchase
    from .api import get_random_username, get_item_list, login
    app.register_blueprint(main_views.bp)
    app.register_blueprint(market_views.bp)
    app.register_blueprint(purchase.bp)
    app.register_blueprint(profile_views.bp)
    app.register_blueprint(get_item_list.bp)
    app.register_blueprint(get_random_username.bp)
    app.register_blueprint(login.bp)
    return app