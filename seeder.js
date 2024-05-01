const fs = require('fs');
function generateRandomData(numRecords) {
    let csvContent = 'Pregnancies,Glucose,BloodPressure,SkinThickness,Insulin,BMI,DiabetesPedigreeFunction,Age\n';
    for (let i = 0; i < numRecords; i++) {
        let pregnancies = Math.floor(Math.random() * 18);
        let glucose = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
        let bloodPressure = Math.floor(Math.random() * (130 - 50 + 1)) + 50;
        let skinThickness = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
        let insulin = Math.floor(Math.random() * 300);
        let bmi = Math.random() * (50 - 15) + 15;
        let diabetesPedigreeFunction = Math.random() * (1.5 - 0.1) + 0.1;
        let age = Math.floor(Math.random() * (80 - 20 + 1)) + 20;
        let outcome = Math.round(Math.random());

        csvContent += `${pregnancies},${glucose},${bloodPressure},${skinThickness},${insulin},${bmi},${diabetesPedigreeFunction},${age}\n`;
    }

    return csvContent;
}

function generateRandomDataCSV(numRecords, filename) {
    const csvData = generateRandomData(numRecords);

    fs.writeFileSync(filename, csvData);
    console.log(`CSV file '${filename}' with ${numRecords} records generated successfully.`);
}

generateRandomDataCSV(5, 'random_data.csv');
