## Part 2: Database Integration using TypeORM

### Overview

In this section, you will extend your application to use a PostgreSQL database. You will set up TypeORM within your NestJS project to manage database operations.

### Requirements

- PostgreSQL
- TypeORM

### Setup

1. Install PostgreSQL and ensure it is running on your local machine.
2. Add TypeORM and PostgreSQL driver to your project by running `npm install @nestjs/typeorm typeorm pg`

### Tasks

#### Task 1: Configure TypeORM

Configure TypeORM in your NestJS application.

#### Task 2: Create a Car Entity

Transform your Car interface into a Car entity using TypeORM annotations to map the object properties to your PostgreSQL database columns.

#### Task 3: Update the Cars Service

Refactor your Cars Service to perform CRUD operations using the TypeORM repository instead of managing an in-memory array.

#### Task 4: Create filters

Add filters to the Cars Controller to allow searching for cars by year, make, or model.

#### Task 5: Verify Integration

Test all endpoints to ensure they interact correctly with the database. Make sure each operation (Create, Read, Update, Delete) performs as expected.

### Submission

Update your GitHub repository with the new code incorporating database integration and submit the updated link.

Best of luck!