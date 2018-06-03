import json

from server import db


class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    image = db.Column(db.String(150))
    time = db.Column(db.Integer())
    serves = db.Column(db.Integer())
    ingredients = db.Column(db.String())
    instructions = db.Column(db.String())
    last_access = db.Column(db.Integer())

    def __repr__(self):
        return "<Recipe " + self.name + ">"

    def to_public_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "image": self.image,
            "time": self.time,
            "serves": self.serves,
            "ingredients": json.loads(self.ingredients),
            "instructions": json.loads(self.instructions),
            "lastAccess": self.last_access
        }
