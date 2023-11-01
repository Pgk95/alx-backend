#!/usr/bin/env python3
"""intialize babel flask app"""

from flask import Flask, render_template
from flask_babel import Babel

app = Flask(__name__)
babel = Babel(app)


class Config(object):
    """Config class for babel"""
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"
    LANGUAGES = ["en", "fr"]


app.config.from_object(Config)


@app.route("/", methods=['GET'])
def index():
    """index page"""
    return render_template("1-index.html")


if __name__ == "__main__":
    app.run()
