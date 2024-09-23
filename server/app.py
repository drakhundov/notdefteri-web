from flask import Flask, request, Response
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


@app.route("/save_note", methods=["POST"])
def save_note():
    note = request.json
    if note.get("$id") is None:
        return Response("Invalid request format.", status=400)
    with open(f"notes/{note.get('$id')}", "w") as note_f:
        json.dump(note, note_f)
    return Response(status=200)


@app.route("/retrieve_note", methods=["POST"])
def retrieve_note():
    pass


app.run(debug=True, port=4040)
