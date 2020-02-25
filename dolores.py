# https://www.geeksforgeeks.org/python-linear-regression-using-sklearn/
#https://machinelearningmastery.com/how-to-use-correlation-to-understand-the-relationship-between-variables/

# generate related variables
from numpy import mean
from numpy import std
from numpy import cov
from numpy import genfromtxt
from numpy.random import randn
from numpy.random import seed
import matplotlib.pyplot as plt
from scipy.stats import pearsonr
import pandas as pd
import seaborn as sns


df = pd.read_csv("sleep-calories.csv", sep=',', names = ['Date', 'Sleep', 'Calories'])

dates = df.Date
sleep_data = df.Sleep
kcal = df.Calories

# Positive covariance --> The variables change in the same direction. Negative --> The variables change in the opposite direction. covariance = 0 --> Independent variables.
covariance = cov(sleep_data, kcal)
print('covariance', covariance)


scatter = sns.lmplot(x='Calories', y='Sleep', data = df, fit_reg=True)
#plt.grid()
#plt.show()



# The Pearson correlation can be used to summarize the strength of the linear relationshop between two data samples.
# -1 < corr < 1. Values between -0.5 and 0.5 indicates a less notable correlation, where as values smaller than -0.5 and greater than 0.5 indicates a notable correlation



# summarize
print('data1: mean=%.3f stdv=%.3f' % (mean(sleep_data), std(sleep_data)))
print('data2: mean=%.3f stdv=%.3f' % (mean(kcal), std(kcal)))
corr, _ = pearsonr(sleep_data, kcal)
print('Pearsons correlation: %.3f' % corr)
