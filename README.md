# resume

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Prerequisites
git client (or web access to github, but you can not push anything back without the client)
C++
nodejs
npm

## Node packages
npm install grunt angular gulp bower -g

## Installing
Use a git client to get the code, these are available for Windows, Mac and Linux. 

If you are installing it for the first time then [configure it too.](https://davidldawes.github.io/playground), at least add your name and email. 

If you do not want too use the client you can download the code as .zip file with the "Clone or Download" button on the top right bit of this page.

I prefer to use SSH keys for github access, I suggest you look that up and add a key from your local system to your github account.

Change to the directory that you want to install the code into and clone the code. 
If you added an SSH key to your github account use the SSH clone string, otherwise 
use the HTTP version,both are availbale via the "Clone or Download" button. 

## Installing Optional Tools
Firebug

####SSH clone
git clone git@github.com:DavidLDawes/resume.git
####HTTPS clone
git clone https://github.com/DavidLDawes/resume.git
## Building
Now that the code is in place and the prerequisites are in place, 
it's time to install and build the app. Change into the resume directory that
the git clone command created and :
npm install
bower install
bower update
grunt
grunt serve


Requires nodejs, usual npm preamble
npm install -g bower grunt
## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.
