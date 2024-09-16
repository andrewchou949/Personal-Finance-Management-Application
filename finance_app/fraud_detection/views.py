import joblib
import pandas as pd
from .models import Transaction

# Load the fraud detection model
model = joblib.load('./fraud_deteection/models/fraud_detection_model.pkl')

# Function to predict fraud
def predict_fraud(transaction_data):
    df = pd.DataFrame([transaction_data])
    prediction = model.predict(df)
    return bool(prediction[0])

# View to create transactions with fraud detection
class TransactionListCreateView(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def perform_create(self, serializer):
        # Extract relevant fields for fraud prediction
        transaction_data = {
            'V1': self.request.data.get('V1'),
            'V2': self.request.data.get('V2'),
            # Add all the necessary V columns here
            'Normalized_Amount': self.request.data.get('Normalized_Amount'),
        }
        
        # Predict fraud
        is_fraudulent = predict_fraud(transaction_data)
        
        # Save transaction with fraud status
        serializer.save(is_fraudulent=is_fraudulent)