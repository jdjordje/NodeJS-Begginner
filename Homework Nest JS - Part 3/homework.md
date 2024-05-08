## Part 3: Advanced Features and Security

## Prerequisite: Switch to UUIDs

### Overview

Before starting Part 3, you must update your application to use UUIDs instead of numeric IDs for all entities. UUIDs provide a higher level of uniqueness, which is crucial for larger applications and prevents ID conflicts across different database tables or datasets.

### Steps
***************************************dojdeno e car details da se prikazat. 
1. Update your database schema:

   - Change the datatype of the `id` fields in all your entities (Car, Manufacturer, etc.) to UUID in your database.

2. Update your entities:

   - Modify the `id` field in each entity class to reflect this change. Use TypeORM's `uuid` type, which can be automatically generated.

3. Update your service logic:

   - Ensure that all references to the ID fields in your services and controllers handle UUIDs correctly.

4. Test the changes:
   - Make sure all existing functionalities continue to work with the new UUIDs. Test creating, retrieving, updating, and deleting records to ensure everything functions correctly.

### Example

Here is an example of how to define a UUID field in a TypeORM entity:

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Car {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;
}
```

### Overview

In this section, you will enhance your application by introducing relationships between entities and adding authentication mechanisms. This part aims to simulate more complex real-world scenarios and secure your application.

### Requirements

- Previous parts completed
- Basic understanding of relational database concepts
- Familiarity with JWT for authentication

### Setup

Ensure all dependencies are installed and your previous tasks are complete and functional.

### Tasks

#### Task 1: Create a Manufacturer Entity

Create a `Manufacturer` entity that represents the car manufacturer. Each manufacturer can produce many models of cars, but each car is produced by one manufacturer.

- **Properties**:
  - `id`: string
  - `name`: string
  - `headquarters`: string

Link this entity with the `Car` entity to establish a many-to-one relationship from `Car` to `Manufacturer`.

#### Task 2: Create a Car Insurance Entity

Create a `CarInsurance` entity that stores insurance details for each car. This will be a one-to-one relationship with the `Car` entity.

- **Properties**:
  - `id`: string
  - `policyNumber`: string
  - `provider`: string
  - `coverageDetails`: string

Ensure that each car can have only one insurance policy and vice versa.

#### Task 3: Implement Authentication

Implement basic authentication using JWT tokens to secure your application. Only authenticated users should be able to create, update, or delete car entries.

- **Steps**:
  - Implement a `User` entity and service for handling user data.
  - Use `@nestjs/jwt` to handle JWT token creation and verification.
  - Secure relevant endpoints with authentication guards.

### Bonus

As a bonus, implement refresh tokens to manage the longevity of user sessions securely.

### Submission

Update your GitHub repository with the code for Part 3 and provide instructions on how to set up and test the new features.

### Conclusion

This part of the homework helps you understand relational mappings in databases and secure your applications using modern authentication mechanisms. Good luck!

## Part 4: Implement Many-to-Many Relationship with Car Features

Create a `Feature` entity and establish a many-to-many relationship with the `Car` entity. This setup should allow each car to have multiple features, and each feature may be associated with multiple cars, reflecting typical configurations found in automotive databases.

### Overview

In this task, you will model and implement a many-to-many relationship between cars and their features (e.g., navigation system, power windows, sunroof). This relationship helps demonstrate how different cars can share features and how features can span across various car models.

### Steps

1. **Create a Feature Entity:**

   - Define a `Feature` entity with properties such as `id` (UUID), `name` (string), and `description` (string).
   - Ensure that the `Feature` entity can relate to many `Car` entities and vice versa.

2. **Setup the Many-to-Many Relationship:**

   - Use TypeORM decorators in both the `Car` and `Feature` entities to configure the many-to-many relationship through a join table.

3. **Modify the Car Service:**

   - Update the `Cars Service` to manage the assignment and removal of features to/from cars.

4. **Extend the API Endpoints:**
   - Add endpoints to manage features for cars, such as:
     - `POST /cars/:id/features` to add features to a car.
     - `GET /cars/:id/features` to list all features of a car.
     - `DELETE /cars/:id/features/:featureId` to remove a feature from a car.

### Example Code for Feature Entity

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Car } from "./car.entity";

@Entity()
export class Feature {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Car, (car) => car.features)
  @JoinTable()
  cars: Car[];
}
```
