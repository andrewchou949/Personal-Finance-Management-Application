import pandas as pd # for data preprocessing and analysis
# for scikit learn --> learning the data itself
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib # saving the training to a result (.pkl)

# Load the dataset
# dataset name may change, since data is not collected yet!
data = pd.read_csv('data/creditcard.csv')

# Handle missing values
# data = data.dropna()

# preprocessing columns: drop the 'Time' column, standardize 'Amount' only
data['Normalized_Amount'] = StandardScaler().fit_transform(data[['Amount']])
data = data.drop(['Amount', 'Time'], axis=1) # axis=1 drop up down direction

# Features and target variable
X = data.drop('Class', axis=1)
y = data['Class'] # the target variable (fraud or not_fraud!)

# Split the data into training and testing sets
# testing data is 20% / training is 80%
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a model
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))
print(f'Accuracy: {accuracy_score(y_test, y_pred)}')

# Save the trained model to be used later on
joblib.dump(model, 'model/fraud_detection_model.pkl')