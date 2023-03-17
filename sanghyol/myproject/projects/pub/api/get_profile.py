from flask import Blueprint, jsonify
from flask_login import current_user

bp = Blueprint('api_get_profile', __name__, url_prefix='/api')


@bp.route('/get_profile')
def get_profile():
