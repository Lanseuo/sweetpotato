import json
import os
import time
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
            filename = "/static/images/" + filename
        else:
            filename = None

        recipe = Recipe(name=request.form.get("name"),
                        image=filename,
                        time=request.form.get("time"),
                        serves=request.form.get("serves"),
                        ingredients=json.dumps(ingredients),
                        instructions=json.dumps(instructions))
        db.session.add(recipe)
        db.session.commit()

        return recipe.to_public_json()


class Recipes(Resource):
    def get(self, recipe_id):
        recipe = Recipe.query.filter_by(id=recipe_id)

        if not recipe.first():
            return {"error": "Recipe not found"}, 404

        recipe.update(dict(last_access=time.time()))
        db.session.commit()

        return recipe.first().to_public_json()

    def put(self, recipe_id):
        recipe = Recipe.query.filter_by(id=recipe_id)
        if not recipe.first():
            return {"error": "Recipe not found"}, 404

        if request.form.get("name"):
            recipe.update(dict(name=request.form.get("name")))

        if request.form.get("time"):
            recipe.update(dict(time=request.form.get("time")))

        if request.form.get("serves"):
            recipe.update(dict(serves=request.form.get("serves")))

        if request.form.get("ingredients"):
            ingredients = []
            try:
                for i in request.form.get("ingredients").split("\r\n"):
                    ingredients.append({
                        "amount": i.split(": ")[0],
                        "ingredient": i.split(": ")[1]
                    })
            except:
                return {"error": "Unable to parse ingredients"}, 409
            recipe.update(dict(ingredients=json.dumps(ingredients)))

        if request.form.get("instructions"):
            instructions = request.form.get("instructions").split("\r\n\r\n")
            recipe.update(dict(instructions=json.dumps(instructions)))

        image = request.files.get("image")
        if image:
            if not image.filename.endswith(tuple([".jpg", ".png"])):
                return {"error": "Image is not valid"}, 409

            had_image_before = recipe.first().image
            if had_image_before:
                filename = "".join(recipe.first().image.split("/")[3])
            else:
                # Generate random filename
                filename = str(uuid.uuid4()).replace("-", "") + "." + image.filename.split(".")[-1]

            image.save(os.path.join(app.static_folder + "/images", filename))
        else:
            filename = None

        db.session.commit()

        return recipe.first().to_public_json()

    def delete(self, recipe_id):
        recipe = Recipe.query.filter_by(id=recipe_id).first()
        if not recipe:
            return {"error": "Recipe not found"}, 404

        db.session.delete(recipe)
        db.session.commit()

        return {"done": True}
