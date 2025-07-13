# Recipes App

A full-stack Recipe Recommendation application with a Node.js/Express backend and a React Native (Expo) mobile frontend. Users can sign up, log in, add recipes, favorite them, and view recommendations.

---

## 📱 App Interface Screenshots

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/5de898dc-cba2-4b61-bcd6-958b0c9ea302" width="200"/><br/><sub>Sign Up Screen</sub></td>
    <td><img src="https://github.com/user-attachments/assets/7a14483d-3b68-43f1-a8fe-46b02584eeb4" width="200"/><br/><sub>Login Screen</sub></td>
    <td><img src="https://github.com/user-attachments/assets/301579fa-8d88-4ebd-8b61-f3db543fa5da" width="200"/><br/><sub>Profile Screen</sub></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/a2877f77-0daf-4a9d-903c-812f524658c6" width="200"/><br/><sub>Profile Screen(With Recomended Books)</sub></td>
    <td><img src="https://github.com/user-attachments/assets/1121aba1-89a0-4357-b371-a4581e674a46" width="200"/><br/><sub>Create Book</sub></td>
    <td><img src="https://github.com/user-attachments/assets/444e5674-dee5-4126-bbf8-b0898e84a367" width="200"/><br/><sub>Home Page</sub></td>
  </tr>
</table>


---

## Features

- User authentication (signup, login, logout)
- Add, view, and favorite recipes
- Recipe images and descriptions
- User profile management
- Recipe ratings (if implemented)
- Modern mobile UI with Expo

## Tech Stack

- **Backend:** Node.js, Express, (your DB, e.g., PostgreSQL/SQLite/Drizzle)
- **Frontend:** React Native (Expo)
- **Authentication:** Clerk

## Project Structure

```
FODIFY/
├── backend/
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── config/
│       ├── db/
│       └── ...
└── mobile/
    ├── app.json
    ├── package.json
    ├── app/
    ├── assets/
    ├── components/
    ├── constants/
    ├── hooks/
    ├── services/
    └── ...
```

## Getting Started

### Backend

1. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
2. Set up a `.env` file with your DB URI and Clerk credentials.
3. Start the server:
   ```sh
   npm start
   ```

### Mobile App

1. Install dependencies:
   ```sh
   cd mobile
   npm install
   ```
2. Start the Expo development server:
   ```sh
   npx expo start
   ```
3. Use the Expo Go app or an emulator to run the app on your device.

## API Endpoints (Backend)

- `POST /api/auth/signup` — Register a new user
- `POST /api/auth/login` — User login
- `POST /api/recipes` — Add a new recipe (auth required)
- `GET /api/recipes` — List all recipes
- `GET /api/recipes/:id` — Get recipe details
- `PUT /api/recipes/:id` — Update a recipe (auth required)
- `DELETE /api/recipes/:id` — Delete a recipe (auth required)

## Recipe Model Example

```js
{
  title: String, // required, unique
  description: String, // required
  image: String, // required (URL)
  rating: Number, // optional, min: 1, max: 5
  user: ObjectId, // reference to User
}
```

## License

This project is for educational purposes.
