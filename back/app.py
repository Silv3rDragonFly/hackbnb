from flask import Flask
from flask_cors import CORS
from database.init import db
from database.seed import seed_database
from flask_wtf.csrf import CSRFProtect

from api.rooms.rooms_models import Room
from api.rooms.rooms_api import rooms_api
from api.users.users_models import User
from api.users.users_api import users_api
from api.auth.auth_api import auth_api
from api.bookings.bookings_api import bookings_api
from api.bookings.bookings_models import Booking
from api.uploads.uploads_api import uploads_api


app = Flask(__name__)
csrf = CSRFProtect()
csrf.init_app(app)
app.config.from_pyfile('config.py')

# back/app.py, après csrf.init_app(app)
csrf.exempt(rooms_api)
csrf.exempt(users_api)
csrf.exempt(auth_api)
csrf.exempt(bookings_api)
csrf.exempt(uploads_api)

# Add CORS to all requests
CORS(app, origins=app.config["CORS_ORIGINS"])

@app.after_request
def set_security_headers(response):
    response.headers['Content-Security-Policy'] = "default-src 'self'"
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    return response

# Initialize database
db.init_app(app)
with app.app_context():
   db.create_all()
   seed_database()

# Routes
app.register_blueprint(rooms_api, url_prefix='/rooms')
app.register_blueprint(users_api, url_prefix='/users')
app.register_blueprint(auth_api, url_prefix='/auth')
app.register_blueprint(bookings_api, url_prefix='/bookings')
app.register_blueprint(uploads_api, url_prefix='/uploads')


@app.route('/', methods=['GET'])
def welcome():
   return "Welcome on API"


if __name__ == '__main__':
   app.run(
      debug=False,
      host="127.0.0.1",
      port=9001,
   )
