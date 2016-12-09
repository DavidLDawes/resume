# [resume](https://davidldawes.github.io/playground)
[Hosted on github.io here](https://davidldawes.github.io/playground)
This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Prerequisites
git client (or web access to github, but you can not push anything back without the client)
C++
nodejs
npm

## Node packages
Currently I get some older stuff when I install, so I do the npm install then an npm update:
    npm install grunt angular gulp bower -g
    npm update

When I do the npm update on Windows I have to run the Node.js command prompt as administrator.

## Installing Optional Tools
Firefox and Firebug are very useful if you're developing.

## Installing
Use a git client to get the code, these are available for Windows, Mac and Linux. 

If you are installing and using the git client for the first time then configure it too, 
at least add your name and email. 

If you do not want too use the git client you can download the code as .zip file with the 
"Clone or Download" button on the top right bit of this page.

I prefer to use SSH keys for github access, I suggest 
you look that up and add a key from your local system to your github account.

Change to the directory that you want to install the code into and clone the code. 
If you added an SSH key to your github account use the SSH clone string, otherwise 
use the HTTP version, both are availbale via the "Clone or Download" button. 

####SSH clone
git clone git@github.com:DavidLDawes/resume.git
####HTTPS clone
git clone https://github.com/DavidLDawes/resume.git
## Building
Now that the code is in place and the prerequisites are in place, 
it's time to install and build the app. Change into the resume directory that
the git clone command created and

    npm install
    bower install
    npm update
    bower update

At this point things are ready for the grunt system to do the various build, 
test and serve tasks.

The next section of npm install commands up to Installing are optional

####[node warnings](https://github.com/DavidLDawes/resume/issues/2)
If you see the usual litany of problems reported in npm install warnings then
you can attempt to fix them by updating to newer versions of node modules.
[An issue was opened for this.](https://github.com/DavidLDawes/resume/issues/2)
The next steps attempt to correct some of this.
The versions do get updated, but not quite every copy of every version.
Since the source code I've checked in does not specify the versions to use, I 
assume installing other components got us to our current (somewhat out of date)  set.

My jshint was out of date too:
    
    npm install jshint@latest -g

#####Steps taken on a Windows PC based on [issue #2:](https://github.com/DavidLDawes/resume/issues/2)
Update minimatch to avoid RegExp denial of service:
    
    npm install minimatch@latest

Update graceful-fs to avoid failing on certain node versions
    
    npm install graceful-fs@latest -g

There is a WARN about node-uuid beibng deprecated. I couldn't seem to find it to remove it, but
I installed uuid anyway:
    npm install uuid@latest
    
On different systems I had slightly different problems with older versions, so as I say I assume
it is affected by what you have already loaded.

## Build: grunt
We use grunt to build, test and serve. 

    grunt
    grunt test
    grunt serve
    grunt clean test serve

The serve version brings up the browser and auto-rebuilds & re-loads when you change
 source files.
 