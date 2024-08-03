import pandas as pd # for data preprocessing and analysis
# for scikit learn --> learning the data itself
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import joblib # saving the training to a result (.pkl)

# Load the dataset
# dataset name may change, since data is not collected yet!
data = pd.read_csv('data/creditcard.csv')

# Handle missing values
data = data.dropna()

# Encode categorical variables
# category indicator name may cahnge!
data = pd.get_dummies(data, columns=['category'])

# Feature scaling
scaler = StandardScaler()
data[['amount']] = scaler.fit_transform(data[['amount']])

# Split data into features (X) and target (y)
X = data.drop('is_fraud', axis=1) # getting all columns except is_fraud (is_fraud target column may change)
y = data['is_fraud']

# Split data into training and testing sets
# testing data is 20% / training is 80%
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save the trained model to be used later on
joblib.dump(model, 'model/trained_model.pkl')