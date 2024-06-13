from rest_framework import serializers
from .models import Transaction, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['amount', 'description', 'category', 'date']

    def validate(self, data):
        if 'category' not in data or data['category'] is None:
            raise serializers.ValidationError("Category is required.")
        if 'amount' not in data or data['amount'] <= 0:
            raise serializers.ValidationError("Amount must be greater than zero.")
        if 'description' not in data or data['description'] == "":
            raise serializers.ValidationError("Description is required.")
        return data