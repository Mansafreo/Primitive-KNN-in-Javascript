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
const testDataFile='test_patients.csv';
const testData = new Objectify(testDataFile);
//To set the features
testData.setFeatures(
    ['Pregnancies','Glucose','BloodPressure','SkinThickness','Insulin','BMI','DiabetesPedigreeFunction','Age'],
    ['float','float','float','float','float','float','float','float']
);

//To min-max normalize the data
data.minMaxNormalization('Pregnancies');
data.minMaxNormalization('Glucose');
data.minMaxNormalization('BloodPressure');
data.minMaxNormalization('SkinThickness');
data.minMaxNormalization('Insulin');
data.minMaxNormalization('BMI');
data.minMaxNormalization('DiabetesPedigreeFunction');
data.minMaxNormalization('Age');

//Also normalize the test data using min-max normalization
testData.minMaxNormalization('Pregnancies');
testData.minMaxNormalization('Glucose');
testData.minMaxNormalization('BloodPressure');
testData.minMaxNormalization('SkinThickness');
testData.minMaxNormalization('Insulin');
testData.minMaxNormalization('BMI');
testData.minMaxNormalization('DiabetesPedigreeFunction');
testData.minMaxNormalization('Age');

//To predict the outcome of the test data
let predictions=[]
K=3;
for(let i=0;i<testData.objects.length;i++)
{
    const knn = new KNN(data,K,testData.objects[i]);
    predictions.push(knn.predictedTarget);
    console.log(`testData[${i}]`,testData.objects[i],'Prediction:',knn.predictedTarget)
}
console.log('Predictions:',predictions);