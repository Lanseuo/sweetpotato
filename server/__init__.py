from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///../sweet_potato.db"
db = SQLAlchemy(app)
api = Api(app)

from .models import Recipe
from .recipes import RecipesList, Recipes

db.create_all()

api.add_resource(RecipesList, "/api/recipes")
api.add_resource(Recipes, "/api/recipes/<recipe_id>")


@app.route("/")
@app.route("/<path:path>")
def index(path=None):
    return app.send_static_file("frontend/index.html")


@app.route("/static/css/<string:filename>")
def static_css(filename):
    return app.send_static_file("frontend/static/css/" + filename)


@app.route("/static/js/<string:filename>")
def static_js(filename):
    return app.send_static_file("frontend/static/js/" + filename)


@app.route("/manifest.json")
def manifest_json():
    return app.send_static_file("frontend/manifest.json")


@app.route("/favicon.ico")
def favicon_ico():
    return app.send_static_file("frontend/manifest.ico")


@app.route("/favicon-16x16.png")
def favicon_16x16_png():
    return app.send_static_file("frontend/favicon-16x16.png")


@app.route("/favicon-32x32.png")
def favicon_32x32_png():
    return app.send_static_file("frontend/favicon-32x32.png")


@app.route("/service-worker.js")
def service_worker_js():
    return app.send_static_file("frontend/service-worker.js")
