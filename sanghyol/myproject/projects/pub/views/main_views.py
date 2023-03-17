from flask import Blueprint, url_for, render_template
from werkzeug.utils import redirect


bp = Blueprint('main', __name__, url_prefix='/')
@bp.route('/index')
def index():
    return render_template('Main/index.html')

@bp.route('/')
def return_index():
    return redirect(url_for('main.index'))
