# K-NN

A k-nearest neighbors algorithm implementation for Javascript/Typescript

# What this will do ?

In a data context this will classify a feature using a dataset of features meaning a prediction

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

# Customization

This algorithm supports some customizating like: 

## DistanceFunction

Will calculate the distance beetween 2 points, by default the implementation for 2d and 3d dimension will use pytagoras theorem. You can create a custom function to do that passing in the constructor or using the set method fot that. 

## GoalFunction

The goal function will return the goal of the calculated distance, represents basically the goal. The default implementation will assume the last position in a feature as the goal.

# License

 MIT License

Copyright (c) 2019 nihasoft

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
