from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api

app = Flask(__name__)
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
