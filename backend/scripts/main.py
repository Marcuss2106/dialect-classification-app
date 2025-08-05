from pydantic import BaseModel
import numpy as np
import joblib


class Features(BaseModel):
    features: list[float]


# model = joblib.load("model.pkl")

# @app.post("/predict")
# def predict(features: Features):
#     input_array = np.array(features.features).reshape(1, -1)
#     prediction = model.predict(input_array)[0]
#     return {"prediction": prediction}
