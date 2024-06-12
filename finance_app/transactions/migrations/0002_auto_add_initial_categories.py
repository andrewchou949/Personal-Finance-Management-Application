from django.db import migrations

def add_initial_categories(apps, schema_editor):
    Category = apps.get_model('transactions', 'Category')
    User = apps.get_model('auth', 'User')
    default_categories = ['Expense', 'Income', 'Deposit']

    for user in User.objects.all():
        for category_name in default_categories:
            if not Category.objects.filter(name=category_name, user=user).exists():
                Category.objects.create(name=category_name, user=user)

class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0001_initial'), 
    ]

    operations = [
        migrations.RunPython(add_initial_categories),
    ]