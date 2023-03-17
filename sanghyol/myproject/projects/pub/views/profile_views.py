from flask import Blueprint, url_for, render_template
from werkzeug.utils import redirect

from pub.models import Users, Market, Inventory

bp = Blueprint('profile', __name__, url_prefix='/profile')
@bp.route('/')
def profile_view():
    test_user = Users.query.get_or_404(1)
    user_inven = Inventory.query.filter_by(username=test_user.username)
    return render_template('Profile/my_profile.html', test_user=test_user, user_inven=user_inven)