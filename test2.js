//To test dynamic distance calculation given the features to consider
//Load the data
const {Objectify} = require('./Objectify.js');
const {KNN}=require('./KNN.js');
let points = new Objectify('./points.csv');
points.setFeatures(
    ["X","Y","Group"],
    ["float","float","string"]
);
points.setTarget("Group","string");
let unknownPoints=new Objectify('./unknown.csv')
unknownPoints.setFeatures(
    ["X","Y"],
    ["float","float"]
)

//To KNN all the unknown points
unknownPoints.objects.forEach(sampleUnkownPoint=>{
let knn=new KNN(points,3,sampleUnkownPoint);
console.log(`${knn.predictedTarget}`)
});


