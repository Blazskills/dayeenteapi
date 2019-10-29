from flask import Flask ,redirect, url_for, render_template, request, flash, session, jsonify
from flask_login import LoginManager,UserMixin,login_user, logout_user, login_required,current_user
from sqlalchemy.exc import IntegrityError,InvalidRequestError
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from datetime import timedelta
from datetime import datetime
import os
import sqlite3
from random import randint
from werkzeug.security import generate_password_hash, check_password_hash
from flask_marshmallow import Marshmallow


app = Flask(__name__)
basedir=os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+os.path.join(basedir,'database.db')
app.config['SECRET_KEY'] = 'JIHDGJIDHFHJDFJ'

db = SQLAlchemy(app)
ma = Marshmallow(app)

ALLOWED_EXTENSIONS = set(['png','gif','jpg','jpeg'])

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class regtb(db.Model):
       id = db.Column(db.Integer,primary_key=True)
       fname = db.Column(db.String(255))
       lname= db.Column(db.String(255))
       gender= db.Column(db.String(255))
       password = db.Column(db.String(255))
       staffid = db.Column(db.Integer)
       userpix =db.Column(db.String(200))
       username = db.Column(db.String(255), unique=True)
       usermail= db.Column(db.String(255), unique=True)
       isstaff = db.Column(db.Boolean, default=False, nullable=False)
       isAdmin = db.Column(db.Boolean, default=False, nullable=False)
       issuper = db.Column(db.Boolean, default=False, nullable=False)
       today=db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

class announcementtb(db.Model,UserMixin):
       id = db.Column(db.Integer,primary_key=True)
       title = db.Column(db.String(255))
       postername = db.Column(db.String(255))
       posterid = db.Column(db.Integer)
       content = db.Column(db.Text)
       today=db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


class filetb(db.Model,UserMixin):
    id = db.Column(db.Integer,primary_key=True)
    filesno = db.Column(db.Integer)
    filename = db.Column(db.String(255))
    content = db.Column(db.Text)
    openedby =db.Column(db.String(255))
    staffimg =db.Column(db.String(200))
    staffdept =db.Column(db.String(200))
    docs =db.Column(db.String(200))
    closedfile = db.Column(db.Boolean, default=False, nullable=False)
    today=db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


class UserSchema(ma.ModelSchema):
    class Meta:
        # fields =('fname', 'email', 'random','id')
        model=regtb




@app.route('/')
def index():
    return render_template('index.html')

@app.route('/registration', methods=['POST'])
def registration():
        user_schema =UserSchema(strict=True)
        fname = request.json['fName']
        lname = request.json['lName']
        username = request.json['username']
        # usermail = request.json['usermail']
        gender = request.json['gender']
        password = request.json['password']
        userpix = request.json['userpix']
        secure_password = generate_password_hash(password, method="sha256")
        if userpix and allowed_file(userpix.filename):
             filename=secure_filename(userpix.filename)
             userpix.save(os.path.join('/home/blazskills/Documents/dayeenteapi/static/userpixfolder',filename))
             url = str(filename)
             new_user = regtb(fName=fname, lName=lname,username=username,gender=gender,password=secure_password, userpix=url)
             new_user.staffid =randint(1,59000)
             db.session.add(new_user)
             db.session.commit()
             return jsonify({'message' : "Information submitted successfully"})    

        else:
            return jsonify({'error' : "Invalid Picture Submitted"})  
       
            


if __name__ == "__main__":
    app.run(port=9000 ,debug=True)