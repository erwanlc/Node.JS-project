## Introduction

The **WebService** project is a school project in the scope of the client-server class. The aim is to develop some services for IOT management in NodeJS using MongoDB for the database.
On the webpage, you can create an account, add some devices representing the connected object, create some groups specific to a user to add devices into it.
Devices and groups can aso be activated or desactivated.

## The code

### Ressources

This directory contains all the ressources for the webpage like the images, the fonts, the style sheet (css) and the scripts (in JavaScript).

In the directory scripts, there is all the scripts for the interaction with the webpage

account.js is for all the scripts linked to the account management.
login-register.js is for all the scripts linked to the login, logout and registration of a user.
groups.js is for all the scripts linked to the groups.
devices.js is for all the scripts linked to the devices management.


### Server

This directory is for all the files linked to the server part.

#### Controller

This directory is for the controller part.
The *_router.js are for the GET.
The *_services.js are for the POST.

	* common contains all the server scripts which are common to the project, like the login, register or the error 404 redirection.
	* user contains contains all the server scripts specific to a user, like the account delete.
	* group contains all the server scripts specific to the groups, like the group creation or modification.
	* device contains all the server scipts specific to the devices, like the device creation or modification.

#### Model

This directory is for all the files relatives to the model. 

	* db_interface.js make the interface between the controller and the model files.
	* db_schema.js describe the structure of the document which are going to be write in MongoDB.
	* user.js is for all the interaction with the database linked to the user like the creation of the document user.
	* groups.js is for all the interaction with the database linked to the groups like the creation of the document group or its update.
	* devices.js is for all the interaction with the database linked to the devices like the creation of the document device or its update.


## Tests

The test have been run using **mocha**.

