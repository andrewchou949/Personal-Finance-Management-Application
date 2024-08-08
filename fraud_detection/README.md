# Fraud Detection Model Training

## Overview
This directory contains the necessary files and instructions for training the fraud detection model using machine learning techniques.

## Libraries Used
- **pandas**: Used for data manipulation and analysis.
- **scikit-learn**: Used for building and training the machine learning model.

## Dataset
- Dataset: [Credit Card Fraud Detection](https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud)
- Features:
  - `V1` to `V28`: Principal Component Analysis (PCA) transformed features
  - `Amount`: Transaction amount
  - `Class`: Target variable (1 for fraudulent transactions, 0 for non-fraudulent transactions)

## Installation
1. Ensure you have the necessary libraries installed:
   ```bash
   pip install pandas scikit-learn joblib
    ```

2. Add these dependencies to your requirements.txt:
    ```bash
    pip freeze > requirements.txt
    ```

## Data Preparation
1. Load and preprocess the data using pandas. This includes handling missing values, encoding categorical variables, and splitting the data into training and testing sets.

## Model Training
1. Use scikit-learn to train a machine learning model on the prepared data.
2. Save the trained model using joblib for later use in the application.
**Note:** with the provided fraud_detection.py files, simply run:
    ```bash
    python fraud_detection.py
    ```
- But need to make sure that the creditcard.csv is present in the right folders and models folder exist (or you can adjust the directory manually).

## Training Metrics
The fraud detection model was trained using the credit card fraud detection dataset. Below are the metrics achieved during the training:

### Model Accuracy
```plaintext
              precision    recall  f1-score   support

           0       1.00      1.00      1.00     56864
           1       0.97      0.77      0.86        98

    accuracy                           1.00     56962
   macro avg       0.99      0.88      0.93     56962
weighted avg       1.00      1.00      1.00     56962

Accuracy: 0.9995611109160493
```
These metrics indicate the performance of the model on the test set, showing high precision and recall for both fraud and non-fraud transactions.

## Usage
The trained model can be used in the Django application to predict fraudulent transactions. The model is loaded and used to make predictions in real-time.

## Components
- **data/**: Contains data in csv format.
- **models/**: Contains the trained models.
- **fraud_detection.py**: python script to utilize data to train model
- **load_model.py**: to load the trained pkl format model.

## Contributing
Feel free to submit issues or pull requests if you find any bugs or have suggestions for improvements.

## License
This project is licensed under the MIT License.