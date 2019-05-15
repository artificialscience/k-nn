class KNN {
    constructor(dimension, goalIndex, customDistanceFunction, customGoalFunction) {
        if (!dimension) {
            throw new Error('You should give the dimension of the array.');
        }

        this.k = 1;
        this.dimension = dimension;
        this.goalIndex = goalIndex;
        this.customDistanceFunction = customDistanceFunction;
        this.customGoalFunction = customGoalFunction;
    }
    calculateGoal(feature) {
        if (this.customGoalFunction) {
            return this.customGoalFunction(feature);
        } else {
            return (this.goalIndex) ? feature[this.goalIndex] : feature[feature.length - 1];
        }
    }
    calculateDistance(feature, prediction) { 

        this.validateFeatureAndPredictionDimension(feature, prediction);

        if (this.customDistanceFunction) {
            return this.customDistanceFunction(feature, prediction, this.dimension);
        } else if (this.dimension == 1) {
            return this.distance(feature[0], prediction[0]);
        } else if (this.dimension < 4) {
            return this.distanceNDimension(feature, prediction);
        } else {
            throw new Error('You should implement a custom distance calculator to this dimension: ' + 4);
        }
    }
    distance(pointA, pointB) {
        return Math.abs(pointA - pointB);
    }
    distanceNDimension(feature, prediction) {
        let point = 0;
        for (let i = 0; i < feature.length; i++) {
            point += (feature[i] - prediction[i]) ** 2;
        }
        return point ** 0.5;
    }
    buildTrainingEnvironment(outputs, testSize, shuffleTimes, normalize) {
        if (normalize) {
            this.featuresTrained = this.normalizeWithMinMax(outputs);
        } else {
            this.featuresTrained = outputs;
            this.normalizeMap = [];
        }
        let shuffled = [...this.featuresTrained];
        let dataSize = shuffled.length;
        for (let i = 0; i < shuffleTimes; i++) {
            let from = Math.floor(Math.random() * dataSize);
            let amount = Math.floor(Math.random() * (dataSize - from));
            let toShuffle = shuffled.splice(from, amount)
            let actualDataSize = shuffled.length;
            let into = Math.floor(Math.random() * actualDataSize);
            let endedData = shuffled.splice(into, actualDataSize);
            shuffled = [...shuffled, ...toShuffle, ...endedData];
        }

        if (outputs.length != shuffled.length) {
            throw new Error('Error on Shuffle the features...');
        }
        return [shuffled.slice(0, testSize), shuffled.slice(testSize)];
    }
    calculateDimensionsMinMax(outputs) {
        this.normalizeMap = [];
        for (let i = 0; i < this.dimension; i++) {
            this.normalizeMap[i] = [outputs[0][i], outputs[0][i]];
        }

        for (let i = 0; i < this.dimension; i++) {
            for (let output of outputs) {
                let dimensionMap = this.normalizeMap[i];
                dimensionMap[0] = Math.min(dimensionMap[0], output[i]);
                dimensionMap[1] = Math.max(dimensionMap[1], output[i]);
            }
        }
    }
    normalizeWithMinMax(outputs) {
        let toNormalize = [...outputs];

        this.calculateDimensionsMinMax(outputs);
        
        for (let i = 0; i < this.dimension; i++) {
            let dimensionMinMax = this.normalizeMap[i];
            for (let normalize of toNormalize) {
                if (dimensionMinMax[0] == dimensionMinMax[1]) {
                    normalize[i] = 1;    
                } else {
                    normalize[i] = (normalize[i] - dimensionMinMax[0])/(dimensionMinMax[1] - dimensionMinMax[0]);
                }
            }
        }
        return toNormalize;
    }
    predict(features, prediction) {
        let actualPoints = [];
        let frequency = -1;
        let frequencies = {};

        for (let feature of features) {
            let distance = this.calculateDistance(feature.slice(0, this.dimension), prediction);
            let goal = this.calculateGoal(feature);
            if (!isNaN(distance) &&  !isNaN(goal)) {
                actualPoints.push([distance, goal]);
            } else {
                throw new Error('Format diferent of number: ' + distance + ', ' + goal);
            }
        }
        actualPoints = actualPoints.sort((a, b) => {
            if (a[0] > b[0]) {
                return 1;
            } else  if (a[0] < b[0]) {
                return -1;
            } else {
                return 0;
            }
        }).slice(0, this.k);

        for (let actualPoint of actualPoints) {
            frequencies[actualPoint[1]] = (frequencies[actualPoint[1]]) ? (frequencies[actualPoint[1]]) + 1 : 1;
            if(!frequencies[frequency] || frequencies[actualPoint[1]] > frequencies[frequency]) {
                frequency = actualPoint[1];
            }
        }
        return frequency;
    }
    traning(outputs, testSize, shuffleTimes, ktimes, normalize) {

        const [testSet, trainingSet] = this.buildTrainingEnvironment(outputs, testSize, shuffleTimes, normalize);
        let bestAccuracy = -100;
        let bestK = 0;
        for (let k = 1; k <= ktimes; k++) {
            this.setK(k);
            let accuracy = (testSet.filter((test) => {
                return this.predict(trainingSet, test.slice(0, test.length - 1)) === test[3];
            }).length / testSize) * 100;
            if (accuracy > bestAccuracy) {
                bestAccuracy = accuracy;
                bestK = k;
            }
        }
        this.setK(bestK);
        return [bestAccuracy, bestK];
    }
    setK(k) {
        this.k = k;
    }
    setCustomDistanceFunction(custom) {
        this.customDistanceFunction = custom;
    }
    setCustomGoalFunction(custom) {
        this.customGoalFunction = custom;
    }
    setgoalIndex(index) {
        this.goalIndex = index;
    }
    validateFeatureAndPredictionDimension(feature, prediction) {
        if (feature.length != this.dimension || prediction.length != this.dimension) {
            throw new Error('The feature dimension or prediction dimensior are not compatible with the actual dimension: ' + this.dimension);
        }
        return;
    }
}

module.exports = KNN;