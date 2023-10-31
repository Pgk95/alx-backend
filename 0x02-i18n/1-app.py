#!/usr/bin/python3
"""intialize babel flask app"""

from flask import Flask, render_template
from flask_babel import Babel

app = Flask(__name__)

babel = Babel(app)

class Config(object):
    """Config class for babel"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIME_ZONE = "UTC"


if __name__ == "__main__":
    app.run()