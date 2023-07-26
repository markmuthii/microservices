# Notes, TODOs and Questions that arise during the project

- In the index file of auth, the commented code shows some ways in which an object can be destructured to only include some keys and not others in a new object.
- The same also features in the users controller, which was my initial implementation to only have the id and email being returned in the response, before the use of toJSON in the User Schema, provided by mongoose.
