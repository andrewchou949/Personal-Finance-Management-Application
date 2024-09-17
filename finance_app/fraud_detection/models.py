from django.db import models

class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    is_fraudulent = models.BooleanField(default=False)  # New field to store fraud status


    def __str__(self):
        return f"{self.description} - {self.amount}"
