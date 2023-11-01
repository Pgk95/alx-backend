#!/usr/bin/env pytohn3
"""initialize babel request"""

from flask import Flask, g, request, render_template
from flask_babel import Babel, gettext

app = Flask(__name__)
babel = Babel(app)


class Config(object):
    """config class for babel"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_TIMEZONE = "UTC"
    BABEL_DEFAULT_LOCALE = "en"


app.config.from_object(Config)


@babel.localeselector
def get_locale():
    """get locale"""
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route("/", methods=['GET'])
def index():
    """index page"""
    return render_template("2-index.html")


if __name__ == '__main__':
    app.run()
