#!/usr/bin/env python3
"""intialize babel flask app"""

from flask import Flask, render_template
from flask_babel import Babel

app = Flask(__name__)
babel = Babel(app)

class Config(object):
    app.config['BABEL_DEFAULT_LOCALE'] = "en", "fr"
    app.config['BABEL_DEFAULT_TIMEZONE'] = "UTC"


@app.route("/", strict_slashes=False)
def index():
    return render_template("1-index.html")


babel.init_app(app)

if __name__ == "__main__":
    app.run()