const KNN = require('../src/KNN');
const fs = require('fs');

class Main {
    constructor() {
        const knn = new KNN(3);
        const outputs = this.initialize();
        console.log('Initilizing the training...')
        let [accuracy, k] = knn.training(outputs, 100, outputs.length, 20, true);
        console.log(accuracy, k);
        console.log('traning is done.');
        // let lk = knn.predict(outputs, point, iteraction, indexPointToEval, indexPointToCompare);
        // console.log(lk);
    }
    initialize() {
        try {
            let data = ('' + fs.readFileSync('./test/assets/test.csv')).split('\n');
            let header = data.splice(0, 1);
            let features = [];
            for (let line of data) {
                let rowFeature = line.split(';');
                let feature = [];
                for (let row of rowFeature) {
                    let value = parseFloat(row);
                    if (!isNaN(value)) {
                        feature.push(value);
                    } else {
                        console.log(line);
                    }
                }
                features.push(feature);
            }
            return features;
        } catch (ex) {
            console.error(ex);
        }
    }
}

new Main();