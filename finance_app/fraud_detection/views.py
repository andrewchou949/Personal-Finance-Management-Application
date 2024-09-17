import joblib
from .models import Transaction
from .serializers import TransactionSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

# Load the fraud detection model
model = joblib.load('fraud_detection/models/fraud_detection_model.pkl')

class TransactionListCreateView(generics.ListCreateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        transaction_data = serializer.validated_data
        transaction_features = {
            'V1': transaction_data['V1'],
            'V2': transaction_data['V2'],
            # include all necessary features
            'Normalized_Amount': transaction_data['amount']
        }

        # Predict fraud using the model
        is_fraudulent = model.predict(pd.DataFrame([transaction_features]))[0]
        serializer.save(user=self.request.user, is_fraudulent=is_fraudulent)