//A simple task to group sample data using a primitive KNN algorithm
//Suppose the data is the following:
//points.csv contains the data with the following columns: x,y,label which are arbitrary numbers with no specific meaning

//The task is to group the unknown data points in the file unknown.csv using the data in points.csv

//Step 1: Load the data
//Import the path module
const path = require('path');
//Load the data from points.csv
let filePath= path.resolve(__dirname, 'points.csv');
const fs = require('fs');
let data =fs.readFileSync(filePath, 'utf8');
//Each line is a data point
//The first line is the header
let lines = data.split('\n');
let points = [];
for(let i=1; i<lines.length; i++){
    let line = lines[i].split(',');
    points.push({x: parseFloat(line[0]), y: parseFloat(line[1]), group: line[2].replace(/\r/g,'')});
}
let knownPoints=points;
//Now we have the data we can start the algorithm
//Step 2: Define the distance function
//Import the distanceMetrics module
const distanceMetrics = require('./distanceMetrics');
//Step 3: Define the K such that K is an odd number
let K = 3;

function KNN(knownPoints,new_point,K)
{
    //an array to store distances between points
    let distances=[]
    //Array to store its nearest neignbours
    let nearest_neighbours=[]
    //We need to loop through each known point for each unknown and find the 3 nearest neighbours using euclidean distance
    knownPoints.forEach(knownPoint => {
        //To find the distances between each points
        let distance=distanceMetrics.euclideanDistance(knownPoint,new_point)
        let distanceData={
            distance:distance,
            point:knownPoint
        }
        distances.push(distanceData)
    });
    distances.sort((a,b)=>a.distance-b.distance)
    //get the k-nearest neighbours
    nearest_neighbours=distances.slice(0,K)
    //Get the majority category
    let votes={
        A:0,
        B:0
    }
    nearest_neighbours.forEach(neighbour=>{
        //vote
        group=neighbour.point.group;
        votes[group]++
    })
    //Get the highest vote
    let category = Object.entries(votes).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    return category;
}
//Step 4: Load the unknown data
//Load the data from unknown.csv
filePath= path.resolve(__dirname, 'unknown.csv');
data =fs.readFileSync(filePath, 'utf8');
//Each line is a data point
//The first line is the header
lines = data.split('\n');
let unknownPoints = [];
for(let i=1; i<lines.length; i++){
    let line = lines[i].split(',');
    unknownPoints.push({x: parseFloat(line[0]), y: parseFloat(line[1])});
}


//To test the data
unknownPoints.forEach(unknownPoint=>{
    let category=KNN(knownPoints,unknownPoint,K)
    console.log(`(${unknownPoint.x},${unknownPoint.y})=>${category} \n`)
})
