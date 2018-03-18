from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sweet_potatoe.db'
db = SQLAlchemy(app)
api = Api(app)

from .models import Recipe
from .recipes import RecipesList, Recipes

db.create_all()

api.add_resource(RecipesList, '/recipes')
api.add_resource(Recipes, '/recipes/<recipe_id>')


@app.route("/")
def index():
    return jsonify({})
