import os
import time
import uuid

from flask import request
from flask_restful import Resource

from .models import Recipe
from server import app, db


def upload_image(image, filename=None):
    image = request.files.get("image")
    if not image:
        return None, None

    if filename:
        filename = filename.split("/")[3]
    else:
        identifier = str(uuid.uuid4()).replace("-", "")
        file_extension = image.filename.split(".")[-1]
        filename = identifier + "." + file_extension

    if not image.filename.endswith(tuple([".jpg", ".png"])):
        return {}, "Image is not valid"

    image.save(os.path.join(app.static_folder + "/images", filename))
    filename = "/static/images/" + filename

    return filename, None


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

        filename, error = upload_image(request.files.get("image"))
        if error:
            return {"error": error}, 409

        # TODO: Check whether ingredients and instructions have correct format

        recipe = Recipe(
            name=request.form.get("name"),
            image=filename,
            time=request.form.get("time"),
            serves=request.form.get("serves"),
            ingredients=request.form.get("ingredients"),
            instructions=request.form.get("instructions")
        )
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
            recipe.update(dict(ingredients=request.form.get("ingredients")))

        if request.form.get("instructions"):
            recipe.update(dict(instructions=request.form.get("instructions")))

        filename, error = upload_image(
            request.files.get("image"), recipe.first().image)
        if error:
            return {"error": error}, 409
        if filename:
            recipe.update(dict(image=filename))

        db.session.commit()

        return recipe.first().to_public_json()

    def delete(self, recipe_id):
        recipe = Recipe.query.filter_by(id=recipe_id).first()
        if not recipe:
            return {"error": "Recipe not found"}, 404

        db.session.delete(recipe)
        db.session.commit()

        return {"done": True}
