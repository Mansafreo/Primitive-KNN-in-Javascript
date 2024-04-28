# K-Nearest Neighbour Algorithm in Javascript

## Introduction
KNN is a machine learning algorithm that uses instance-based learning to classify items/data into groups. By instance-based learning, it means that the algorithm does not produce a model per se but uses stored 
data/examples(instances) to classify the data it is given. As such , having labelled data is important.
The algorithm works by calculating the distances between data and selecting a given number K (the hyperparameter) of neighbours(closest points) and classifying the new point as the majority class near it.

## Steps
### Preparing the Data
The training data has to be labelled and with the appropriate classes. The number of attributes that will be used to classify the data( the feature matrix) gives the dimensionality of the data. For example, if we
used this algorithm to classify fruits e.g. apples and oranges, we might use features such as the diameter, weight, colour , acidity and texture. This gives us a dimensionality of 5. The fruits have other attributes 
like smell, taste and number of seeds but we have picked only those 5 of interest.

This gives us a sample feature matrix
`[ diameter, weight, colour , acidity, texture]` <br>
However, note that the features are usually represented as numerical data. If the attributes are text, data encoding is done to convert the text into meaningful numeric data that can be used in the algorithm
The data is usually split into the training data and the test data
