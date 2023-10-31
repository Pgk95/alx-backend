#!/usr/bin/env python3
"""intialize babel flask app"""

from flask import Flask, render_template
from flask_babel import Babel

app = Flask(__name__)
babel = Babel(app)

app.config['BABEL_DEFAULT_LOCALE'] = "en"
app.config['BABEL_DEFAULT_TIMEZONE'] = "UTC"

babel.init_app(app)

@app.route("/", strict_slashes=False)
def index():
    """index page"""
    return render_template("1-index.html")


if __name__ == "__main__":
    app.run()
