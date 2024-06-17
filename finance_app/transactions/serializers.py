from rest_framework import serializers
from .models import Transaction, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    class Meta:
        model = Transaction
        fields = '__all__'

    def validate(self, data):
        if 'amount' not in data or data['amount'] <= 0:
            raise serializers.ValidationError({"amount": "Amount must be greater than zero."})
        if 'category' not in data or not data['category']:
            raise serializers.ValidationError({"category": "Category must be specified."})
        return data