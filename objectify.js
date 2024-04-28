const path = require('path');
const fs = require('fs');

class Objectify {
    constructor(fileName, separator = ",") {
        this.fileName = fileName;
        this.separator = separator;
        this.labels = null;
        this.data = null;
        this.objects = null;
        this.features=null;
        this.objectifyData();
    }

    getData() {
        let filePath = path.resolve(__dirname, this.fileName);
        let data = fs.readFileSync(filePath, 'utf8');
        data = data.split('\n');
        return data;
    }

    getLabels() {
        let labels = this.data[0].replace(/\r/g, "");
        labels = labels.split(this.separator);
        this.labels = labels;
    }

    objectifyData() {
        this.data = this.getData();
        this.getLabels();
        if (this.labels.length !== this.data[0].split(this.separator).length) {
            console.log("The number of labels does not match the data given");
            console.log(`Labels: ${this.labels.length} Data Columns: ${this.data[0].split(this.separator).length}`);
        } else {
            let objects = [];
            this.data = this.data.slice(1, this.data.length);
            for (let j = 0; j < this.data.length; j++) {
                let dataPoint = this.data[j].replace(/\r/g, "");
                dataPoint = dataPoint.split(this.separator);
                let obj = {};
                for (let i = 0; i < this.labels.length; i++) {
                    obj[this.labels[i]] = dataPoint[i];
                }
                objects.push(obj);
            }
            this.objects = objects;
        }
    }
    //Function to allow one to choose the features in the feature matrix
    setFeatures(features="__",types="__")
    {
        //Features is an array of the names of features we may need
        if(features=="__" && types=="__")
        {
            this.features=this.objects
        }
        else{
            // Check if features is an array
            if (!Array.isArray(features)) {
                console.log("Error: Features must be an array");
                return;
            }
            //Make sure the features exist as a subset of the labels
            let labels = this.labels;
            let featuresExist = features.every(feature => labels.includes(feature));
            if (!featuresExist) {
                console.log("Error: Features must be a subset of the labels");
                return;
            }
            if(features.length<1)
            {
                console.log("Error: Features array must not be empty");
                return
            }
            if(types=="__")
            {
                console.log("Error: You must specify the types of the features")
                return
            }
            //Make sure the types are an array and are the same length as the features
            if (!Array.isArray(types)) {
                console.log("Error: Types must be an array");
                return;
            }
            if(types.length<1)
            {
                console.log("Error: Types array must not be empty");
                return
            }
            //An array to store the indexes of the features we need
            let interMid=[]
            for(let i=0;i<this.objects.length;i++)
            {
                //To load each object by its features
                let newObj={}
                for(let j=0;j<features.length;j++)
                {
                    newObj[features[j]]=this.parseData(types[j],this.objects[i][features[j]])
                }
                interMid.push(newObj)
            }
            this.objects=interMid;
        }
        this.features=features
    }
    parseData(type,data) {
        //To return the parsed data in the form it is needed
        if (type === "float") {
            return parseFloat(data);
        }
        if (type === "int") {
            return parseInt(data);
        }
        if (type === "string") {
            return data;
        }
        if (type === "boolean") {
            return Boolean(data);
        }
    }
}

// //Test the class
// let testData=new Objectify('points.csv')
// testData.setFeatures(['X','Y'],['float','float'])
// console.log(testData.objects);

//export the class
module.exports={
    Objectify
}
