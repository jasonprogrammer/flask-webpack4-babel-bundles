from flask import Flask
from views.home_views import HomeView
# from dbmodels.models import db_wrapper, DATABASE

def create_app():
    app = Flask(__name__, static_folder='web/dist')
    app.config.from_object(__name__)

    # db_wrapper.init_app(app)
    app.add_url_rule('/', view_func=HomeView.as_view('/'))

    # TODO: Run this in debug only
    # Code from: https://stackoverflow.com/a/38524695
    @app.after_request
    def apply_caching(response):
        response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        return response

    return app


app = create_app()
