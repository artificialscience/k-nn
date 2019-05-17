# K-NN

A k-nearest neighbors algorithm implementation for Javascript/Typescript

# What this will do ?

In a data context this will classify a feature using a dataset of features, that is a prediction.

## How it works ?

By default the algorithm will use K as 1, the last index of the feature array as the goal besides that you should give the dimension as parameter in the constructor. Remember the features is array of array and if the dimension is more than 3 you need to give a custom implementation of distance calculator.

### The predict method will:

    1 - Will calculate all the distances between the points of the features and the prediction feature;
    2 - Will create an array with the calculated distances and your respective goals (point);
    3 - Will sort the array created in step 2 in crescent mode then will slice using the K (if you not train, the K is equal to 1);
    4 - For the most frequency, return the goal;

    Remember in this predict method the feature to predict, should not have the goal. Because the goal is the objective to predict.

### The traning method will:

    1 - Will normalize the array with min and max if normalize equals a true;
    2 - Will create an array shuffling the features then will split the data into traning set and test set, using for that the parameters testSize shuffleTimes and the features to train;
    3 - For k times (a parameter of this method) and for every test set will predict and compare the actual goal with the prediction goal to calculte the accuracy;
    4 - Return the best accuracy found and your respective K;

# Installing

`npm install @artificialscience/k-nn`

## Using

For ESM 6

    import * as KNN from '@artificialscience/k-nn';
Or

    const KNN = require('@artificialscience/k-nn');

## An Example for 3 Dimension

    /*
    * Note: by default, the algorithm will consider the last index and will use
    * the dimension passed in KNN constructor as the size of variables to use on the distance
    * calculator that is the first 3(for this example: new KNN(3) variables in every row on 
    * the features.
    */
    const features = [
        [10, 0.5068958512233102, 16, 1],
        [12, 0.5105356367730379, 16, 7],
        [12, 0.5323562633463617, 16, 7],
        [40, 0.517546804614676, 16, 2],
        [48, 0.5158030616769878, 16, 2],
        [83, 0.5262942735596369, 16, 6],
        [80, 0.5362942735596369, 16, 6],
        [97, 0.5281527464327415, 16, 5],
        [98, 0.5148717143151224, 16, 5],
        [99, 0.5248717143151224, 16, 5],
        [100, 0.5148717143151224, 16, 5],
        [98, 0.5448717143151224, 16, 5],
        [98, 0.5648717143151224, 16, 5],
        [94, 0.5148717143151224, 16, 5],
        [98, 0.52148717143151224, 16, 5]
    ];
    const knn = new KNN(3);
    let [accuracy, k] = knn.training(features, 4, features.length, 2, true);
    let goal = knn.predict(features, [100, 0.53, 16]);
    console.log('Accuracy about: ' + accuracy + ', was predicted the goal as: ' + goal);

# Examples

You can see some examples in ./test/main.js

# Customization

This algorithm supports some customizating like: 

## DistanceFunction

Will calculate the distance beetween 2 points, by default the implementation for 2d and 3d dimension will use pytagoras theorem. You can create a custom function to do that passing in the constructor or using the set method fot that. 

## GoalFunction

The goal function will return the goal of the calculated distance, represents basically the goal. The default implementation will assume the last position in a feature as the goal.

# License

 MIT License

Copyright (c) 2019 artificialscience

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
