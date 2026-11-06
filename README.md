README.md

# 🍽️ Christoffel's Menu Manager

A mobile application built with React Native to help restaurant owner Christoffel manage his menu digitally, replacing his paper-based system. The app features full CRUD functionality, advanced search and filtering, dynamic statistics, and a user-friendly experience.

---

## 📱 About The App

Christoffel's Menu Manager is a comprehensive mobile application that allows a chef/restaurant owner to:
- **Add** new dishes to the menu
- **View** all menu items in an organized list
- **View detailed information** and **Statistics** about the menu
- **Edit/Update** existing dishes
- **Delete** dishes from the menu
- **Search and filter** to find dishes instantly

The app was designed with a busy kitchen environment in mind—large touch targets, readable text, clear error validation, and simple navigation.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **React Native & Expo** | Mobile app framework and development platform |
| **React Navigation** | Screen navigation and routing |
| **AsyncStorage** | Persistent local data storage |
| **React Native Picker** | Dropdown selection for courses |
| **Animated API** | Emoji slideshow animation on launch |

---

## ✨ Key Features Implemented

### 1. User Experience & Interface
- **Animated Splash Screen:** Features a dynamic slideshow of food and drink emojis while the app loads.
- **Consistent Layout:** Global styles and centralized color themes ensure a unified look across all screens.
- **Reusable Components:** Created modular components (`CustomButton`, `CustomInput`, `SearchBar`, `FilterChips`, `StatsBanner`, `MenuCard`) to reduce code duplication.
- **Reusable Functions:** Centralized validation logic (`validateDishForm`) and formatters (`formatPrice`, `formatDate`) for clean code organization.

### 2. Manage Menu Items (CRUD)
- **Create:** Add dishes with Name, Description, Course, Price, and an "Available" toggle.
- **Read:** View all items in a clean, scannable list, or tap to view full details.
- **Update:** Edit any existing dish with pre-filled forms and update it instantly.
- **Delete:** Safely remove items with an "Are you sure?" confirmation prompt.

### 3. Search & Filter
- **Search by Name:** Real-time search bar with a "Clear" button.
- **Filter by Course:** Quick-filter chips (Starters, Mains, Desserts, Beverages).
- **Combined Filtering:** Search and course filters can be used simultaneously.
- **Clear All:** A single button to reset the search and filters back to the full menu.

### 4. Menu Statistics
- **Live Stats Banner:** Always displays the total number of items and average price on the main screen.
- **Dedicated Stats Screen:** Accessible via the header icon, showing:
  - Total menu value.
  - Number of unavailable items.
  - Visual progress bars showing the quantity of items available in each course.

---

## 📂 Project Structure

```text
ChristoffelsMenu/
├── App.js                    # Entry point of the app
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── CustomButton.js
│   │   ├── CustomInput.js
│   │   ├── EmptyState.js
│   │   ├── FilterChips.js
│   │   ├── Header.js
│   │   ├── MenuCard.js
│   │   ├── SearchBar.js
│   │   ├── Slideshow.js
│   │   └── StatsBanner.js
│   ├── screens/              # App screens
│   │   ├── SplashScreen.js
│   │   ├── MenuListScreen.js
│   │   ├── AddDishScreen.js
│   │   ├── EditDishScreen.js
│   │   ├── DishDetailsScreen.js
│   │   └── StatsScreen.js
│   ├── navigation/           # Navigation setup
│   │   └── AppNavigator.js
│   └── utils/                # Utilities and helpers
│       ├── colors.js         # Theme colors and constants
│       ├── styles.js         # Global styles
│       ├── storage.js        # AsyncStorage & statistics logic
│       └── validators.js     # Reusable validation & format functions

📱 Screens Overview

Screen & Description
Splash Screen - App loading screen with restaurant branding 
Menu List Screen - Home screen displaying all menu items 
Add Dish Screen - Form to add a new dish (name, description, course, price) 
Dish Details Screen - View full information about a dish 


🚀 How to Run the App

Prerequisites

-Node.js (v16 or higher)
-npm or yarn
-Expo Go app on your phone (from Google Play Store or App Store)
-Android Studio (for Android emulator) OR **Xcode** (for iOS simulator)

Step 1: Clone the Repository

```bash
git clone https/Wenkosii05/ChristoffelsMenu
cd ChristoffelsMenu
```

Step 2: Install Dependencies

```bash
npm install
```

Step 3: Start the Development Server

```bash
npx expo start
```

Step 4: Run on Device

· Android: Press a
· iOS: Press i
· Scan QR Code: Use the Expo Go app on your phone


📱 App Features

1 Add a New Dish

· Enter Dish Name (required)
· Enter Description (required)
· Select a Course (Starters, Mains, Desserts, Beverages) (required)
· Enter Price in Rands (required, must be greater than 0)
· Validation errors appear for empty or invalid fields
· Success message confirms when a dish is added

2 View All Menu Items

· All dishes are displayed in a scrollable list
· Each item shows: Name, Course, Price
· Tapping a dish opens the details screen

3 View Dish Details

· Full dish name, course, and price
· Complete description
· Date the dish was added

4 Delete a Dish

· Tap the "Delete Dish" button on the details screen
· Confirmation modal prevents accidental deletion
· Dish is permanently removed

5 Persistent Storage

· All dishes are saved using AsyncStorage
· Data persists even after closing the app

6 Edit a dish
- Can now edit a dish to add other ingredients and update price
- can now set a dish to be available or not, depending on the cuurent state of the kitchen.

7 View analytics 
- Can view all the dishes in one dashboad
- can view the avarage price and total price of the whole menu

8 Search and filter 
- Can now search and filter the dishes and see only the category needed. 


🎨 Design Decisions

Colour Scheme

· Primary: #C62828 (Red) - Represents the restaurant's warm, inviting atmosphere
· Background: #FFF8F0 (Warm Cream) - Easy on the eyes, feels natural
· Success: #2E7D32 (Green) - Positive confirmation feedback

User Experience

· Large touch targets (≥44px) for kitchen use with wet hands
· Clear typography for quick reading in bright kitchen lights
· Simple navigation with no more than 3 taps to complete any action

🔧 Troubleshooting

Common Issues

Issue Solution
App won't start Run npx expo start -c to clear cache
Cannot connect to Metro Check USB debugging is enabled on Android
Dependencies not installing Delete node_modules and run npm install


👨‍🍳 Original Requirements

"A local restaurant owner, Christoffel, wants a simple mobile application to help manage the restaurant's menu. At the moment, the chef keeps menu information on paper, making it difficult to update dishes, organise the menu, and quickly find information when needed."

The app successfully addresses all these pain points by providing:

· ✅ Digital storage with instant access
· ✅ Easy updates without rewriting paper
· ✅ Organized menu by course
· ✅ Persistent data storage

---

📝 Reflection

This application demonstrates the application of key mobile development principles:

1. User-Centered Design - Every decision was made with the chef's needs in mind
2. React Native Best Practices - Proper component structure, state management, and navigation
3. Data Persistence - AsyncStorage provides reliable offline storage
4. Error Handling - Validation and error messages prevent data corruption



🧑‍🎓 Student Information

Detail Information
Student Name- Musawenkosi Victor Mnanzana
Student Number ST10500929
Module- Mobile App Scripting
Project Part 3 - Christoffel's Menu Manager
Date November 2026


© 2026 - Christoffel's Menu Manager

```

