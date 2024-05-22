Sure, here's a detailed `README.md` file for your project:

---

# User Management App

This project is a user management application built with Angular. It performs CRUD operations on user data, fetched from a backend API (`user-mgmt-api`).

## Table of Contents

1. [Setup](#setup)
  - [Install Dependencies](#install-dependencies)
  - [Start the Server](#start-the-server)
2. [Running Tests](#running-tests)
3. [Application Overview](#application-overview)
  - [Frontend Functionality](#frontend-functionality)
  - [Backend API](#backend-api)

## Setup

### Install Dependencies

To set up the project, you need to have `pnpm` installed globally. If you don't have `pnpm` installed, you can install it using the following command:

```sh
npm install -g pnpm
```

Once you have `pnpm` installed, navigate to the project directory and run:

```sh
pnpm install
```

This command will install all the necessary dependencies for the project.

### Start the Server

To start the development server, run the following command:

```sh
pnpm start
```

This will start the Angular development server, and you can access the application at `http://localhost:4200`.

## Running Tests

To run the tests for the project, use the following command:

```sh
pnpm ng test
```

This command will start the Karma test runner and execute all the tests defined in the project. You can view the test results in the console and in the browser.

## Application Overview

### Frontend Functionality

The frontend of this application is built with Angular. It provides a user interface for managing user data, including the following features:

- **List Users**: Fetch and display a list of users in a table.
- **Create User**: Form to add a new user.
- **Update User**: Form to update an existing user.
- **Delete User**: Button to delete a user from the list.

#### Components

- **UserListComponent**: Displays the list of users with options to delete and update each user.
- **CreateUserComponent**: Form to create a new user.
- **UpdateUserComponent**: Form to update an existing user.

### Backend API

The frontend interacts with a backend API (`user-mgmt-api`) to perform CRUD operations. The backend API provides endpoints to:

- **Get Users**: Retrieve a list of all users.
- **Get User by ID**: Retrieve details of a single user by their ID.
- **Create User**: Add a new user.
- **Update User**: Update an existing user.
- **Delete User**: Remove a user by their ID.

The frontend uses Angular's `HttpClientModule` to make HTTP requests to these endpoints.

---

This `README.md` file provides a comprehensive overview of the project, including setup instructions, testing commands, and a description of the frontend functionality and backend interactions.
