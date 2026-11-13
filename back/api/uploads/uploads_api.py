from flask import Blueprint, request, send_from_directory

uploads_api = Blueprint('uploads', __name__)

@uploads_api.route('/')
def get_upload():
   return send_from_directory('uploads', request.args.get("name"))
 