# https://www.geeksforgeeks.org/python-linear-regression-using-sklearn/
#https://machinelearningmastery.com/how-to-use-correlation-to-understand-the-relationship-between-variables/

# generate related variables
from numpy import mean
from numpy import std
from numpy import cov
from numpy import genfromtxt
from numpy.random import randn
from numpy.random import seed
from matplotlib import pyplot
from scipy.stats import pearsonr
import pandas as pd
import seaborn as sns


# seed random number generator
seed(1)
# prepare data
data1 = 20 * randn(1000) + 100
data2 = data1 + (10 * randn(1000) + 50)

# sleep_data = pd.read_csv('sleep.csv', sep=',', names=['StartTime', 'EndTime', 'MinutesAsleep', 'MinutesAwake', 'NumberofAwakenings', 'TimeinBed', 'MinutesREMSleep', 'MinutesLightSleep', 'MinutesDeepSleep'])
# activity_data = pd.read_csv('activity.csv', sep=',', names=['Date', 'CaloriesBurned', 'Steps', 'Distance', 'Floors', 'Minutes Sedentary', 'Minutes Lightly Active', 'Minutes Fairly Active', 'Minutes Very Active', 'Activity Calories'])

minutes_asleep = pd.read_csv("sleep.csv", sep=',', usecols = ['MinutesAsleep'])
calories_burned = pd.read_csv("activity.csv", sep=",", usecols = ['CaloriesBurned'])

print(minutes_asleep)




# Positive covariance --> The variables change in the same direction. Negative --> The variables change in the opposite direction. covariance = 0 --> Independent variables.
covariance = cov(data1, data2)
# The Pearson correlation can be used to summarize the strength of the linear relationshop between two data samples.
# -1 < corr < 1. Values between -0.5 and 0.5 indicates a less notable correlation, where as values smaller than -0.5 and greater than 0.5 indicates a notable correlation
corr, _ = pearsonr(data1, data2)


# summarize
# print('data1: mean=%.3f stdv=%.3f' % (mean(data1), std(data1)))
# print('data2: mean=%.3f stdv=%.3f' % (mean(data2), std(data2)))
# print('Pearsons correlation: %.3f' % corr)
# print(covariance)

# plot
pyplot.scatter(minutes_asleep, calories_burned)

pyplot.grid()
pyplot.show()
