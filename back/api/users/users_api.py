from flask import jsonify, Blueprint
from .users_models import User

users_api = Blueprint('users', __name__)


@users_api.route('/me', methods=['GET'])
def get_current_user_details():
    return {'error': 'User not logged in'}, 401
