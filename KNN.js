//A JS module for the KNN algorithm class
class distanceMetrics{
    euclideanDistance(point1,point2,features,target)
    {
        let distanceMatrix=[]
        let featureMatrix=features.filter(item => item !== target);
        //To calculate the distances for each feature in the FeatureMTRIX
        featureMatrix.forEach(index=> {
            //Calculate the distances between each index
            distanceMatrix.push(Math.pow((point1[index]-point2[index]),2))
        });
        //To find the sum of all items in the distanceMatrix
        let sum = distanceMatrix.reduce((a, b) => a + b, 0);
        let actualDistance=Math.sqrt(sum)
        return actualDistance;
    }
    manhattanDistance(point1,point2,features,target)
    {
        let distanceMatrix=[]
        let featureMatrix=features.filter(item => item !== target);
        //To calculate the distances for each feature in the FeatureMTRIX
        featureMatrix.forEach(index=> {
            //Calculate the distances between each index
            distanceMatrix.push(Math.abs(point1[index]-point2[index]))
        });
        //To find the sum of all items in the distanceMatrix
        let sum = distanceMatrix.reduce((a, b) => a + b, 0);
        return sum;
    }
    chebyshevDistance(point1,point2,features,target)
    {
        let distanceMatrix=[]
        let featureMatrix=features.filter(item => item !== target);
        //To calculate the distances for each feature in the FeatureMTRIX
        featureMatrix.forEach(index=> {
            //Calculate the distances between each index
            distanceMatrix.push(Math.abs(point1[index]-point2[index]))
        });
        return Math.max(...distanceMatrix);
    }
    cosineSimilarity(point1,point2,features,target)
    {
        let featureMatrix=features.filter(item => item !== target);
        let dotProduct=0;
        let magnitude1=0;
        let magnitude2=0;
        //To calculate the distances for each feature in the FeatureMTRIX
        featureMatrix.forEach(index=> {
            //Calculate the distances between each index
            dotProduct+=point1[index]*point2[index]
            magnitude1+=Math.pow(point1[index],2)
            magnitude2+=Math.pow(point2[index],2)
        });
        let magnitude=Math.sqrt(magnitude1)*Math.sqrt(magnitude2)
        return dotProduct/magnitude;
    }
}
class KNN extends distanceMetrics
{
    constructor(dataset,K,unknownPoint)
    {
        super();//To inherit the distance metrics
        this.dataset=dataset.objects;//The dataset
        this.features=dataset.features;
        this.target=dataset.target;
        this.K=K;//The number of nearest neighbours
        //an array to store distances between points
        this.distances=[]
        //Array to store its nearest neignbours
        this.nearest_neighbours=[]
        this.unknownPoint=unknownPoint
        this.predictedTarget=null;
        this.KNN()
    }
    KNN()
    {
        //To find the distances between all points
        this.dataset.forEach(point=>
        {
            this.distances.push(
                {
                distance:this.euclideanDistance(point,this.unknownPoint,this.features,this.target),
                point:point
                }
            )
        })
        //To sort out the distances
        this.distances.sort((a,b)=>a.distance-b.distance)
        //To single out the K-nearest neighbours
        this.nearest_neighbours=this.distances.slice(0,this.K)
        //Create a vote for the targets
        let votes=[]
        //To get the available classes/groups available
        let data=this.dataset
        let attributeName = this.target;
        let uniqueValues = [...new Set(data.map(item => item[attributeName]))];
        uniqueValues.forEach(value=>{
            votes[value]=0
        })
        //To carry out the vote
        this.nearest_neighbours.forEach(neighbour=>{
            //vote
            let group=neighbour.point[this.target];
            votes[group]++
        })
        //Get the highest vote
        let category = Object.entries(votes).reduce((a, b) => a[1] > b[1] ? a : b)[0];
        this.predictedTarget=category
    }
}

module.exports={
    KNN
}