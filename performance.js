//To test the performance of the KNN algorithm
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
let normalization='minimax';//To set the normalization type
//To set the target colum
if(normalization==='minmax'){
//To normalize the data
data.minMaxNormalization('Pregnancies');
data.minMaxNormalization('Glucose');
data.minMaxNormalization('BloodPressure');
data.minMaxNormalization('SkinThickness');
data.minMaxNormalization('Insulin');
data.minMaxNormalization('BMI');
data.minMaxNormalization('DiabetesPedigreeFunction');
data.minMaxNormalization('Age');
}
if(normalization==='zscore'){
//use zscore normalization
data.zScoreNormalization('Pregnancies');
data.zScoreNormalization('Glucose');
data.zScoreNormalization('BloodPressure');
data.zScoreNormalization('SkinThickness');
data.zScoreNormalization('Insulin');
data.zScoreNormalization('BMI');
data.zScoreNormalization('DiabetesPedigreeFunction');
data.zScoreNormalization('Age');
}
data.setTarget('Outcome','string');//Outcome is the target column
//To test the performance of the KNN algorithm we split the data into training and testing data
//We will use 80% of the data for training and 20% for testing
let trainingData=[]
let testingData=[]
for(let i=0;i<data.objects.length;i++)
{
    if(i%5===0)
    {
        testingData.push(data.objects[i])
    }
    else
    {
        trainingData.push(data.objects[i])
    }
}


console.log('Training Data:',trainingData.length);
console.log('Testing Data:',testingData.length);
//To remove the outcome from the testing data
let accuracyStats=[]
let limit=200
//Set the K value
for(let k=1;k<=limit;k++)
{
    let correctPredictions=0;
    let incorrectPredictions=0;
    //To set the data in the knn as the training data
    data.objects=trainingData;
    for(let i=0;i<testingData.length;i++)
    {
        const knn = new KNN(data,k,testingData[i]);
        if(knn.predictedTarget===testingData[i].Outcome)
        {
            correctPredictions++
        }
        else
        {
            incorrectPredictions++
        }
    }
    let accuracy = (correctPredictions/(correctPredictions+incorrectPredictions))*100;
    let errorRate = (incorrectPredictions/(correctPredictions+incorrectPredictions))*100;
    let accuracyObject = {
        K:k,
        Accuracy:accuracy,
        ErrorRate:errorRate
    }
    accuracyStats.push(accuracyObject)
}

//Sort the accuracy stats
accuracyStats.sort((a,b)=>b.Accuracy-a.Accuracy)
// console.log('Accuracy Stats:',accuracyStats)
//Sort it again by K
accuracyStats.sort((a,b)=>a.K-b.K)
//Create a CSV file to store the accuracy stats
const fs = require('fs');
let csvData='K,Accuracy,ErrorRate\n';
accuracyStats.forEach(stat=>{
    csvData+=`${stat.K},${Math.log(stat.Accuracy)},${stat.ErrorRate}\n`
})
let fileName=`${limit}-${normalization}.csv`
fs.writeFileSync(fileName,csvData)
