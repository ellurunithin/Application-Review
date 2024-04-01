from flask import Flask

# Create a Flask application instance
app = Flask(__name__)

# Define a route for the home page
@app.route('/')
def hello_world():
    # HTML with CSS styling for the message
    message = '<h1 style="color:blue;">Hello, <span style="color:red;">World</span>!</h1>'
    return message

# Run the application
if __name__ == '__main__':
    app.run(debug=True)
