import json

from flask import request
from flask_restful import Resource

from .models import Recipe
from server import db


class RecipesList(Resource):
    def get(self):
        return [r.to_public_json() for r in Recipe.query.all()]

    def post(self):
        if not request.json.get("name"):
            return {"error": "Title not specified"}, 409
        if not request.json.get("ingredients"):
            return {"error": "Ingredients not specified"}, 409
        if not request.json.get("instructions"):
            return {"error": "Instructions not specified"}, 409

        recipe = Recipe(name=request.json.get("name"),
                        time=request.json.get("time"),
                        ingredients=json.dumps(request.json.get("ingredients")),
                        instructions=json.dumps(request.json.get("instructions")))
        db.session.add(recipe)
        db.session.commit()

        return recipe.to_public_json()


class Recipes(Resource):
    def get(self, recipe_id):
        return Recipe.query.filter_by(id=recipe_id).first().to_public_json()
