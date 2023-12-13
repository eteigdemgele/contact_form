CREATE TABLE "contactuser" (
    User_Surname VARCHAR(50),
    User_Firstname VARCHAR(50),
    User_Email VARCHAR(100),
    User_Message VARCHAR(150),
    User_Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);