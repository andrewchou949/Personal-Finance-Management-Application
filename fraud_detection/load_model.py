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
    
# Example transaction data to make a prediction
# to check if the fraud or non fraud result!
# Note: 1: fraud, 0: non-fraud!
data = pd.DataFrame({
    'V1': [-1.359807],
    'V2': [-0.072781],
    'V3': [2.536346],
    'V4': [1.378155],
    'V5': [-0.338321],
    'V6': [0.462388],
    'V7': [0.239599],
    'V8': [0.098698],
    'V9': [0.363787],
    'V10': [0.090794],
    'V11': [-0.551599],
    'V12': [-0.617801],
    'V13': [-0.991389],
    'V14': [-0.311169],
    'V15': [1.468177],
    'V16': [-0.470401],
    'V17': [0.207971],
    'V18': [0.025791],
    'V19': [0.403993],
    'V20': [0.251412],
    'V21': [-0.018307],
    'V22': [0.277838],
    'V23': [0.110473],
    'V24': [0.066928],
    'V25': [0.128539],
    'V26': [-0.189115],
    'V27': [0.133558],
    'V28': [-0.021053],
    'Normalized_Amount': [149.62]
})

# Predict fraud
prediction = model.predict(data)
print(f'Fraud Prediction: {prediction[0]}')