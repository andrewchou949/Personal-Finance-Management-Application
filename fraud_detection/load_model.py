import joblib
import pandas as pd

# Load the model
model = joblib.load('models/fraud_detection_model.pkl')

# Print model details
print("Model Structure:")
print(model)

# If the model has feature_importances_ attribute (like RandomForest), display it
if hasattr(model, 'feature_importances_'):
    feature_importances = model.feature_importances_
    print("Feature Importances:")
    print(feature_importances)