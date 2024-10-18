# AST Tree Rule Engine Web Application

This is a web-based application for creating, combining, and evaluating rules represented as Abstract Syntax Trees (AST). Users can create rules, combine existing rules, and evaluate them with JSON data input. The rules and their AST representations are stored in a database, and the system can process and manipulate these rules efficiently.

## Features
- **Create rules** and convert them into AST format, stored in the database.
- **Combine multiple rules** into one using their AST representation, stored in the database.
- **Evaluate rules** against input JSON data.
- **Copy ASTs** to the clipboard for further use.
- **Reset or delete all rules** from the database.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Frontend**: EJS Template Engine (Embedded JavaScript), with an API setup for Client Side Rendering frameworks like React.js
- **Database**: MongoDB

## Dependencies
To run this application, the following dependencies are required:
```json
"dependencies": {
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "ejs": "^3.1.10",
  "express": "^4.19.2",
  "mongoose": "^8.5.1"
},
"devDependencies": {
  "nodemon": "^3.1.4"
}
```

## Steps To Step Up

1.Clone the repository using
```sh
git clone https://github.com/NightFury300/assignment_ast.git
```
2.Use Command to change directory to assignment_ast folder which contains the src folder
```sh
cd assignment_ast
```

3.Use command to install all the dependencies
```sh 
npm install
```

4.Modify ```.env ``` file and ```constants.js``` if you want to use your own **database** using your database uri and **Port** of your choosing

5.Use Command
```sh 
npm run dev
```

6.Go to to use the application
```sh 
http://localhost:3000/api/v1/users/
```

## Usage

- **Create Rule**

Enter a rule string.
Submit to create a rule, which is stored in the database with its AST representation.

- **Combine Rules**

Select multiple rules using checkboxes.
Combine them into a new rule with a merged AST.

- **Evaluate Rule**

Enter JSON data and the corresponding rule ID.  
Submit the form to evaluate the rule against the data.  

```(WARNING- When Entering JSON Data, please surround key value pairs with double quotes only for proper parsing. Ex- {"age":"30","Salary":"30000"})```

- **Reset/ Delete Rules**

Reset the entire rule database by pressing the Delete All Rules button.

- **Copy AST Tree to Clipboard**

Copy the AST Tree JSON object to your clipboard for testing purposes

## Acknowledgments
Thank you for checking out the AST Tree Rule Engine Web Application! For any inquiries or feedback, feel free to reach out to me at [shubhsaxena447@gmail.com](mailto:shubhsaxena447@gmail.com).
