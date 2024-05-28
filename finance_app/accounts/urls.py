from django.urls import path
from .views import RegisterView, LoginView,  protected_view

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('protected/', protected_view, name='protected'),
]