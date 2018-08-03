# Geckos Team 0 - Momentum Clone
## Project
Our group will be cloning the [Momentum Extension](https://www.google.com/search?q=momentum+extension&oq=momentum+&aqs=chrome.0.69i59j0l2j69i60j69i57j69i61.1960j0j1&sourceid=chrome&ie=UTF-8). The extension is a home page replacement on the Chrome browser. It can be accessed by opening a new window or tab. 

To see the live demo 👉 https://kiranshuaib.github.io/momentum-clone/

## Features for the MVP
* Time
* Greeting with Name
* Weather
* Todo
* Links for Bookmarking
* Randomized wallpaper 
* Random quoutes

## Team Members
* Jon Maldia
* Nari Roh
* Kiran Shuaib

## Instructions

### Installation
1. To deploy in your local machine, clone or download this repo
2. ```cd``` into the project directory
3. Run ```yarn install``` to add all the dependencies
4. Run ```yarn start``` to run the application

### Deployment to Chrome 
1. Run ```yarn build``` to build the "build" folder
2. In your Chrome browser, navigate to ***chrome://extensions***
3. Make sure the "Developer mode" in the top right corner is turned on. 
4. Click "LOAD UNPACKED" and select the "build" folder

### Setup
1. Clone the repo - ```$ git clone git@github.com:chingu-voyage5/Geckos-Team-0.git```
2. Switch to the development branch - ```$ git checkout development```
3. Switch to your feature/working branch
    * When creating a new branch:
        * ```$ git checkout -b feature-addTime-#12-jon```
        * this will create the branch and immediately switch to that branch
    * When switching back to an existing branch:
        * ```$ git checkout feature-addTime-#12-jon```

### Working with Git and Github
1. Switch to development - ```$ git checkout development```
2. ```$ git pull origin development``` from development before you start coding (all the time)
3. Switch to your feature/working branch
    * Naming your branch (consists of 4 parts):
        1. issue type (feature, bug, style, refactor)
        2. issue name
        3. waffle card #
        4. your name
    * Separate the 4 parts with dashes
    * Use camel case for parts that are more than 2 words
    * Example
        * ```feature-addTime-#12-jon```
4. Merge the new code - ```$ git merge origin development```
5. Make commits often
6. Push to GitHub when you are done with your feature - ```$ git push origin <feature-branch>```


### Pull Requests
1. Go to Github, look for your pushed branch, and issue a Pull Request (PR)
2. Select both team members as the reviewers

### Merging PRs
1. Look for the PR
2. Make sure that the branches selected are the development branch and a feature branch
3. Compare the changes 
4. Fix any conflicts
5. Merge if no conflict exists
# momentum-clone
