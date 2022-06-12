# Pets Excel API

#### API that takes an excel file as input, parses it and stores the data in the database.
#### Hosted at: [www.fastjobsapi.herokuapp.com](https://fastjobsapi.herokuapp.com/)

## Tech Stack and libraries needed:
1. npm
2. Node JS
3. Nodemon
4. Express
5. MongoDB Atlas
6. Mongoose
7. PostMan
8. convert-excel-to-json library

## Documentation to run code on local host:
1. Clone this repository: ```git clone https://github.com/aditirao7/excelapi.git```
2. Install Node JS and npm.
3. Navigate to the git directory and run ```npm install```
4. Then run ```npm run start```
5. The app will now be up and running on localhost:8080.

## Interacting with the API using PostMan
1. The excel file can be uploaded either directly through PostMan or through the form on the homepage:

![Postman upload](/docs/postman-upload.png)
![Form upload](/docs/form-upload.png)

2. The sample excel file [here](/pets.xlsx) had 3 data records.

3. POST route “/api/pet” can be used to upload in PostMan:

![Post](/docs/post.png)

4. GET route “/api/pet” to get all the pets in the database:

![GetAll](/docs/getall.png)

5. GET route “/api/pet/:petId” to get a specific pet:
 
![GetOne](/docs/getone.png)
  
6. PATCH route “/api/pet/:petId” to update the details of a specific pet: (make sure the type of the raw data sent is selected as JSON)
  
![patch](/docs/patch.png)
![patchoutput](/docs/patch-output.png)
  
7. DELETE route “/api/pet/:petId” to delete a specific pet:
  
![delete](/docs/delete.png)
![deleteoutput](/docs/delete-output.png)
 
- Similarly API can be interacted with on the herokuapp through PostMan as well, initial URL changes from localhost:8080 to https://fastjobsapi.herokuapp.com and the routes remain the same. (If it is not a POST or PATCH request make sure to select none in request body in PostMan otherwise it tends to give a 503 status error)
