import os
import sys

from server import app

if __name__ == "__main__":
  if len(sys.argv) > 1 and sys.argv[1] == "build":
    sweet_potatoe_path = os.path.dirname(os.path.realpath(__file__))
    os.system("cd " + sweet_potatoe_path + "/client && npm install && npm run build")
    os.system("mv " + sweet_potatoe_path + "/client/build " + sweet_potatoe_path + "/server/static/frontend")

  else:
    app.run(debug=True, host="0.0.0.0")
