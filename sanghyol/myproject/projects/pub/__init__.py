from flask import Flask, session, request, url_for
from flask_migrate import Migrate
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import redirect

import config

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config.from_object(config)
    app.secret_key = "test_secret_key"
    app.permanent_session_lifetime = config.PERMANENT_SESSION_LIFETIME

    #ORM
    db.init_app(app)
    migrate.init_app(app, db)
    from . import models

    #blueprint
    from .views import main_views
    from .api import get_random_username, login, get_image, get_profile, inventory, items
    app.register_blueprint(main_views.bp)
    app.register_blueprint(get_random_username.bp)
    app.register_blueprint(login.bp)
    app.register_blueprint(get_profile.bp)
    app.register_blueprint(get_image.bp)
    app.register_blueprint(inventory.bp)
    app.register_blueprint(items.bp)

    @app.before_request
    def load_logged_in_user():
        user_id = session.get('user_name')
        if user_id is None and request.endpoint != 'main.index':
            redirect(url_for('main.index'))
        else :session.permanent = True

    return app
