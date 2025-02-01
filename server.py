from flask import Flask, request, jsonify

app = Flask(__name__)

# Scholarship database (No external DB, just in-memory list)
scholarships = {
    "engineering": [
        {"name": "XYZ Engineering Scholarship", "link": "https://xyz.com", "min_percentage": 75, "religion": "Hindu", "caste": "General"},
        {"name": "Tech Innovators Grant", "link": "https://techgrant.com", "min_percentage": 80, "religion": "Muslim", "caste": "OBC"}
    ],
    "medical": [
        {"name": "ABC Medical Scholarship", "link": "https://abc.com", "min_percentage": 70, "religion": "Christian", "caste": "SC"},
        {"name": "Future Doctors Fund", "link": "https://doctorsfund.com", "min_percentage": 85, "religion": "Hindu", "caste": "General"}
    ]
}

@app.route("/scholarships", methods=["GET"])
def get_scholarships():
    stream = request.args.get("stream")
    percentage = int(request.args.get("percentage", 0))
    religion = request.args.get("religion", "")
    caste = request.args.get("caste", "")

    if stream in scholarships:
        eligible_scholarships = [s for s in scholarships[stream] 
                                 if percentage >= s["min_percentage"] and
                                 (religion == "" or s["religion"] == religion) and
                                 (caste == "" or s["caste"] == caste)]
        return jsonify({"scholarships": eligible_scholarships})
    return jsonify({"scholarships": []})

if __name__ == "__main__":
    app.run(debug=True)
