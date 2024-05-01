//To test out our KNN algorithm to predict whether a patient has diabetes

//Import the Objectify class
const {Objectify} = require('./Objectify');
//Import the KNN class
const {KNN} = require('./KNN');
//Load the data
const dataFile='diabetes.csv';
const data = new Objectify(dataFile);
//To set the features
data.setFeatures(
    ['Pregnancies','Glucose','BloodPressure','SkinThickness','Insulin','BMI','DiabetesPedigreeFunction','Age','Outcome'],
    ['float','float','float','float','float','float','float','float','string']
);
//To set the target column
data.setTarget('Outcome','string');//Outcome is the target column

//Load the test data
const testDataFile='test_data.csv';
const testData = new Objectify(testDataFile);
//To set the features
testData.setFeatures(
    ['Pregnancies','Glucose','BloodPressure','SkinThickness','Insulin','BMI','DiabetesPedigreeFunction','Age'],
    ['float','float','float','float','float','float','float','float']
);

console.log('Data:',data.objects[0]);
//To zscore normalize the data
data.zScoreNormalization('Pregnancies');
data.zScoreNormalization('Glucose');
data.zScoreNormalization('BloodPressure');
data.zScoreNormalization('SkinThickness');
data.zScoreNormalization('Insulin');
data.zScoreNormalization('BMI');
data.zScoreNormalization('DiabetesPedigreeFunction');
data.zScoreNormalization('Age');

//Also normalize the test data
testData.zScoreNormalization('Pregnancies');
testData.zScoreNormalization('Glucose');
testData.zScoreNormalization('BloodPressure');
testData.zScoreNormalization('SkinThickness');
testData.zScoreNormalization('Insulin');
testData.zScoreNormalization('BMI');
testData.zScoreNormalization('DiabetesPedigreeFunction');
testData.zScoreNormalization('Age');

//To predict the outcome of the test data
let predictions=[]
K=3;
for(let i=0;i<testData.objects.length;i++)
{
    const knn = new KNN(data,K,testData.objects[i]);
    predictions.push(knn.predictedTarget);
}
console.log('Predictions:',predictions);