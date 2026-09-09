README.md

```
🍽️ Christoffel's Menu Manager

A mobile application built with React Native to help restaurant owner Christoffel manage his menu digitally, replacing his paper-based system.


📱 About The App

Christoffel's Menu Manager is a simple, user-friendly mobile application that allows a chef/restaurant owner to:
Add new dishes to the menu
View all menu items in an organized list
View detailed information about each dish
Delete dishes from the menu

The app was designed with a busy kitchen environment in mind—large touch targets, readable text, and simple navigation.


🛠️ Technologies Used

Technology & Purpose 
React Native - Mobile app framework
Expo - Development platform 
React Navigation - Screen navigation 
AsyncStorage - Persistent data storage 
React Native Picker - Dropdown selection for courses


📂 Project Structure

```

ChristoffelsMenu/
├── App.js                    # Entry point of the app
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── CustomButton.js
│   │   ├── CustomInput.js
│   │   ├── EmptyState.js
│   │   ├── Header.js
│   │   └── MenuCard.js
│   ├── screens/              # App screens
│   │   ├── SplashScreen.js
│   │   ├── MenuListScreen.js
│   │   ├── AddDishScreen.js
│   │   └── DishDetailsScreen.js
│   ├── navigation/           # Navigation setup
│   │   └── AppNavigator.js
│   └── utils/                # Utilities and helpers
│       ├── colors.js         # Theme colors
│       ├── styles.js         # Global styles
│       └── storage.js        # AsyncStorage operations
└── package.json              # Dependencies

```


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

1️⃣ Add a New Dish

· Enter Dish Name (required)
· Enter Description (required)
· Select a Course (Starters, Mains, Desserts, Beverages) (required)
· Enter Price in Rands (required, must be greater than 0)
· Validation errors appear for empty or invalid fields
· Success message confirms when a dish is added

2️⃣ View All Menu Items

· All dishes are displayed in a scrollable list
· Each item shows: Name, Course, Price
· Tapping a dish opens the details screen

3️⃣ View Dish Details

· Full dish name, course, and price
· Complete description
· Date the dish was added

4️⃣ Delete a Dish

· Tap the "Delete Dish" button on the details screen
· Confirmation modal prevents accidental deletion
· Dish is permanently removed

5️⃣ Persistent Storage

· All dishes are saved using AsyncStorage
· Data persists even after closing the app


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

The development process reinforced the importance of thorough planning (Part 1) before implementation (Part 2), and the value of user experience improvements (Part 3).

🧑‍🎓 Student Information

Detail Information
Student Name- Musawenkosi Victor Mnanzana
Student Number ST10500929
Module- Mobile App Scripting
Project Part 2 - Christoffel's Menu Manager
Date September 2026


© 2026 - Christoffel's Menu Manager

```

