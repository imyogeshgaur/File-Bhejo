# PDF Bhejo

PDF Bhejo is an application in which we can share the PDFs with the other users securely and easily. 
In this application I have included **Passsword Less Authentication** and this application is built on 
Nodejs and react js and uses typescript as a wrapper and MySQL as database with prisma as ORM (Object Relation Mapping)to make it type safe and secure. 
This application help the user to share the password protected files to other user directly over their email address.

In future I also try to implement SMS service as well for users not having smartphones.

## Folder Structure

![Folder-Structure](https://github.com/imyogeshgaur/File-Bhejo/blob/master/Screenshot%20(96).png)

## Working of Project

Step 1 : Create an uploads Folder inside the backend folder 

Step 2 : Create a .env file inside backend folder of the Project having following credentials 

```
  
  DATABASE_URL = MYSQL_DATABASE_URL
  CORS_URL = FRONTEND_URL
  POST_PDF_URL = http://BACKEND_URL/static/pdf/
  BASE_URL = fRONTEND_URL
  JWT_SECRET = YOUR_JWT_SECRET
  USER_PDF_STORAGE = ../../protected-files/backend/src/uploads
  MAIL_ID = OUTLOOK_MAIL_ID
  MAIL_PASSWORD = OUTLOOK_MAIL_pASSWORD
```

Step 3 : Run the following command to add packages inside both backend and frontend folder

```
  npm i
```

Step 4 : Run the following command to Run application packages inside both backend and frontend folder

```
  npm start
```
