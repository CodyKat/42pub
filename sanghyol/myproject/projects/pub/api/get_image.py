from flask import Blueprint, jsonify, session
from flask import request as f_req
import json


bp = Blueprint('api_get_image', __name__, url_prefix='/api')


from pub import db
from pub.models import UserInfo

from ..functions.DBcontrol import database

import time
import requests
from datetime import timedelta

@bp.route('/character-image', methods=['GET'])
def get_character_image():
    items = f_req.args.get('items', '')
    animation = f_req.args.get('animation', 'stand1')
    frame = f_req.args.get('frame', '0')
    #version = f_req.args.get('version', '1150')
    skin_id = f_req.args.get('skin_id', '2000')

    # Convert the items string into a list of dictionaries
    try:
        item_list = json.loads(items)
    except:
        item_list = []

    # Create the items part of the URL
    items_url = ",".join([str(item["itemId"]) for item in item_list])

    base_url = f"https://maplestory.io/api/KMST/1150/Character/"
    image_url = f"{base_url}{skin_id}/{items_url}/{animation}/{frame}"

    return jsonify({"image_url": image_url})
