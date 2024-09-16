from django.db import models

class Transaction(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    is_fraudulent = models.BooleanField(default=False)  # Add fraud detection field

    def __str__(self):
        return f"{self.description} - {self.amount}"