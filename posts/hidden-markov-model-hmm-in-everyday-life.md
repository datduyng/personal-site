---
title: 'Hidden Markov Model(HMM) in everyday life'
date: 'March 10th, 2019'
excerpt: 'Building your own weather station with Arduino family micro controller'
cover_image: 'https://github.com/datduyng/datduyng.github.io/blob/2170af7581dc2fe4fd411549f84ae1785671faaa/assets/img/post/2019-03-10-hmm-graphical.png?raw=true'
---


**Section**<br> 
**I. Introduction**<br> 
&nbsp; 1. Baysian Network<br> 
&nbsp; 2. HMM<br> 
&nbsp; 3. Sumary of HMM Applications<br> 
**II. Tools set for HMM**<br> 
**III. HMM Applications in details**<br> 
&nbsp; 1. Speech tagging<br> 
&nbsp; 2. Producitivities tracker<br> 
**III. Conclusion**<br> 
**IV. References**<br> 


## I. Introduction

Sequential predictive model are seen in most technology now aday. Many successful sequential predictive model like RNN or LSTM are builded up by one of the most influential predictive model, Hidden Markov Model(HMM). It is important to learn about HMM as it is a foundation for many other machine learning model. For me, Learning HMM is like learning to write machine code or C-code as there are no magic behind any derivation once I understand it. This article will give an introduction to HMM and quick information on some HMM applicaiton in everyday life. With that being said, Let's jump right in.
### 1. Baysian Network
Welcome, I assume you familiar with term like state machine and markov properties. one often hear these word in many of my computer science course. They often ring a bell and remind me of the word "Bayesian".  So let's shift gear for a paragraph to get an intutition behind baysian network. 

In one sentence, Bayesian network is a type of datastructure that describe the dependency of a **directed acyclic graph** via probabilistic edges. Baysian network aim to model conditional dependency by representing its as edges in the graph. There are three type of dependency in Baysian network as shown below: <br> 
<center><img src="https://user-images.githubusercontent.com/35666615/53527326-46e96e80-3aac-11e9-9dd9-14195f10f099.PNG" height="330" width="650"> </center>
<center> Type of dependency in baysian network <br> (adapted from cs228 notes)</center>

### 2. Hidden Markov Model (HMM)
Hidden Markov Model(HMM) is a special type of bayesian network. **First order hidden markov** is a combination of case a and b.  A graphical model of HMM is shown below. <br> 

<center><img src="https://user-images.githubusercontent.com/35666615/53526922-1e14a980-3aab-11e9-8eb9-15da1997c1c6.PNG" height="330" width="650"></center> 
<center> Graphical model of HMM</center>

Each edge is represent as an inference from one node to other node. For example, edge from Node `S1` to `S2` describe inference from `S1` to `S2`. In the Bayesian world, this is denoted as P(S2\|S1) or probaility of S2 given the state at S1. To wrap the Bayesian business up, we can compute the inference using Bayesian rule as follow

$$
P(A|B) = \frac{P(B|A) P(A)}{P(B)}
$$

where 

- $$P(A\mid B)$$: probability of state A given probability of B. 
- $$P(B\mid A)$$: probability of state B given probability of A. 
- $$P(B)$$: Probaility of A being true( the given probability)
- $$P(A)$$: Probability of B being true (the given probability)

These [notes](https://ermongroup.github.io/cs228-notes/representation/directed/) from cs228 course explain more in-depth on Baysian network.

When dealing with HMM, each observable state will depend on one or multiple hidden state. 
- here, hidden state refer to state that are unseen or **hidden**. As an example, hidden state of a human being can be happy or sad. 
- observable state refering to state that can be seen or **observable**. For example, Crying or smiling

### 3. Sumary of HMM Applications

enough for the theory, let's now go over an sumarry of HMM in everyday actions. 
- Weather prediction
- Speech recognition
- Part of speech tagging
- Music generation
- Google search
- Word type correction
- Digital writing correction
- Facial expression identification using in video
- Human action recognition from Time Sequential Images
- Biological Sequence Analysis.[link](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2766791/)
- Creadit card fraud detection. [Link](https://thesai.org/Downloads/Volume7No2/Paper_5-Hidden_Markov_Models_HMMs_and_Security_Applications.pdf)
- Filtering Sensor values.(Kalman filter)

## II. Tools set for HMM
When working with HMM, we will need some knowledge about the problem domain. As shown in Bayse's rule, to compute the **posterior**, $$P(A|B)$$ we need a **prior**, $$P(A)$$,  knowledge about the problem domain as well as the likelihood of the state in the sequence. 
In HMM we will need Transition matrix(A), Emission matrix(B), and initial state matrix($\pi$). 
- Transition matrix($A$): represent the probability of transitioning from a hidden state to other hidden state. 
- Emission matrix($B$): indicate the probability of an **emitted** being at a hidden state. 
 - Initial state matrix($$\pi$$): indicate the starting hidden state. As when we start a sequence, there are no previous state to look at. 
 
The three matrix weight can be represent on graphical HMM model as below
<center><img src="https://user-images.githubusercontent.com/35666615/53783262-7ea24d00-3ed6-11e9-8a93-92c5e400cf5c.png" height="330" width="650"></center> 
<center> Graphical model of HMM</center>


To generalize, what we just discussed. 
- $$A_{i,j}$$ indicate the transition state from one hidden state,i to next hidden state, j.
- $$B_{i}(O_t)$$indicate the emission probability of emitting an observable state $$O_t$$ from hidden state at step t, denotes as i.
- $$\pi_i$$ indicate the initial probability of a hidden state, i. 



## III. HMM Aplications (HMM in actions) 
There are far more and beyond application utilizing HMM technique. Let's discuss a couple to gain a more innovative look at HMM. 

- Weather prediction
	- Weather data source are gigantic as we can collect everyday. Well, I would argu that HMM cannot be a fully weather forecast predictor, but It can augment with other technique create by brillian minds meteorologist.

- Speech recognition
	- Our language often follow a pattern. For example, a verb are more likely to come up after a noun or a noun often come after the word 'the'. Our speech often are represented as wave form signal. After sampling, we can retrieve discrete point which we can apply the HMM technique that we discuss above to analyze.
- Part of speech tagging
	- From young age, we often start learning our language by breaking and analyzing part of speech. As part of the process we assigning if a sub-sequence is a verb or a noun, we often find pattern on what part of speech usually come after another. This task can be also accomplish with HMM. In Divya' [article](https://medium.freecodecamp.org/an-introduction-to-part-of-speech-tagging-and-the-hidden-markov-model-953d45338f24), she discussed over part of speech using HMM amazingly well. 
- Music generation
- Google search
	- Of course, Our everyday favorite tool is base on a HMM model. Imagine searching for needles(our queries) in the world biggest haystack(the world wide web). The search would become exhaustive search. Luckily, Google came up with a way of assigning probability to link using [random surfer trick](http://pr.efactory.de/e-pagerank-algorithm.shtml). The first chapter of John Maccormick's book, 9 algorithm that change the future also walk in-depth over the PageRank algorithm. 
- Word type correction
	- Similar to speech recognition, on each word that user type, HMM model can also help predict the word that are likely to appear next, thus, this will help display option for user correct their writing. 
- Digital writing correction
- Facial expression identification using in video
- Human action recognition from Time Sequential Images
- Biological Sequence Analysis.[link](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2766791/)
- Creadit card fraud detection. [Link](https://thesai.org/Downloads/Volume7No2/Paper_5-Hidden_Markov_Models_HMMs_and_Security_Applications.pdf)
- Filtering Sensor values.(Kalman filter)
	- One of my favorite application of HMM is the kalman filter. In discrete time, we have HMM. In the continuous world, we have the kalman filter. Kalman filter is mostly use to verify and extract sensory data. Kalman filter assign probability to a sensor value thus, help us tell how much to trust a sensor values. 

## IV. References

https://ermongroup.github.io/cs228-notes/representation/directed/
http://www.davidsbatista.net/blog/2017/11/11/HHM_and_Naive_Bayes/
http://www.cs.umd.edu/~djacobs/CMSC828/ApplicationsHMMs.pdf
https://medium.com/@postsanjay/hidden-markov-models-simplified-c3f58728caab