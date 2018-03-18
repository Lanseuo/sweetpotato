import json
import os
import uuid

from flask import request
from flask_restful import Resource

from .models import Recipe
from server import app, db


class RecipesList(Resource):
    def get(self):
        return [r.to_public_json() for r in Recipe.query.all()]

    def post(self):
        if not request.form:
            return {"error": "Data not specified"}, 409
        if not request.form.get("name"):
            return {"error": "Title not specified"}, 409
        if not request.form.get("ingredients"):
            return {"error": "Ingredients not specified"}, 409
        if not request.form.get("instructions"):
            return {"error": "Instructions not specified"}, 409

        ingredients = []
        try:
            for i in request.form.get("ingredients").split("\r\n"):
                ingredients.append({
                    "amount": i.split(": ")[0],
                    "ingredient": i.split(": ")[1]
                })
        except:
            return {"error": "Unable to parse ingredients"}, 409

        instructions = request.form.get("instructions").split("\r\n\r\n")

        image = request.files.get("image")
        if image:
            if not image.filename.endswith(tuple([".jpg", ".png"])):
                return {"error": "Image is not valid"}, 409
            # Generate random filename
            filename = str(uuid.uuid4()).replace("-", "") + "." + image.filename.split(".")[-1]
            image.save(os.path.join(app.static_folder + "/images", filename))
        else:
            filename = None

        recipe = Recipe(name=request.form.get("name"),
                        image="/static/images/" + filename,
                        time=request.form.get("time"),
                        ingredients=json.dumps(ingredients),
                        instructions=json.dumps(instructions))
        db.session.add(recipe)
        db.session.commit()

        return recipe.to_public_json()


class Recipes(Resource):
    def get(self, recipe_id):
        return Recipe.query.filter_by(id=recipe_id).first().to_public_json()
