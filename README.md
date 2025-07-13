# Recipes App

A full-stack Recipe Recommendation application with a Node.js/Express backend and a React Native (Expo) mobile frontend. Users can sign up, log in, add recipes, favorite them, and view recommendations.

---

## 📱 App Interface Screenshots

<table>
  <tr>
    <td><img src="![WhatsApp Image 2025-07-13 at 11 40 32_bd376ae7](https://github.com/user-attachments/assets/8b3bdb78-d2c6-4514-9600-92545b1a7a2f)" width="200"/><br/><sub>Sign In Screen</sub></td>
    <td><img src="![WhatsApp Image 2025-07-13 at 01 41 00_bcb82c6b](https://github.com/user-attachments/assets/9e2949ec-28e9-4857-b027-cb28678d662b)" width="200"/><br/><sub>Sign Up Screen</sub></td>
    <td><img src="![WhatsApp Image 2025-07-13 at 01 41 01_225db3f1](https://github.com/user-attachments/assets/8984370c-2465-47cd-bf20-306cb4ffbfdf)" width="200"/><br/><sub>Verify Email Screen</sub></td>
  </tr>
  <tr>
    <td><img src="![WhatsApp Image 2025-07-13 at 01 41 01_7fff3aef](https://github.com/user-attachments/assets/bc8c8cef-1044-4432-9b92-d94df6ebe1f1)" width="200"/><br/><sub>Recipes Home Screen</sub></td>
    <td><img src="![WhatsApp Image 2025-07-13 at 01 41 00_e1081c71](https://github.com/user-attachments/assets/7278557d-219e-486b-b780-ac98245c02cd)" width="200"/><br/><sub>Recipes Search Screen</sub></td>
    <td><img src="![WhatsApp Image 2025-07-13 at 01 41 00_4730e692](https://github.com/user-attachments/assets/fdbb9776-c2e0-49c8-b968-1d70e35fc3d2)" width="200"/><br/><sub>Favorite Recipes Screen</sub></td>
  </tr>
  <tr>
    <td><img src="![WhatsApp Image 2025-07-13 at 18 51 06_16882426](https://github.com/user-attachments/assets/71a466fe-13d3-4551-b2be-28f93315ec0c)" width="200"/><br/><sub>Recipes Procedure</sub></td>
    <td><img src="![WhatsApp Image 2025-07-13 at 18 51 06_77c8eecd](https://github.com/user-attachments/assets/c4c618ea-1af5-4cbb-b72a-043770d16e6b)" width="200"/><br/><sub>Recipes Steps</sub></td>
    <td><img src="![WhatsApp Image 2025-07-13 at 18 57 51_5b830174](https://github.com/user-attachments/assets/060201da-b669-4ec3-b111-92bfa2aeda0b)" width="200"/><br/><sub>Forgot Passward Screen</sub></td>
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
