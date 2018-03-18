import json

from server import db


class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    time = db.Column(db.Integer())
    ingredients = db.Column(db.String())
    instructions = db.Column(db.String())

    def __repr__(self):
        return "<Recipe " + self.name + ">"

    def to_public_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "time": self.time,
            "ingredients": json.loads(self.ingredients),
            "instructions": json.loads(self.instructions)
        }
        # return {c.name: getattr(self, c.name) for c in self.__table__.columns}
