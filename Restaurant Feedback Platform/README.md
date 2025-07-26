# Restaurant Feedback Platform (Frontend)

A multi-page web application built with HTML, SASS, Bootstrap, and jQuery for dynamic functionality and data management.

## Project Structure

```
public/
├── index.html          # Landing page
├── onboarding.html     # Onboarding slides
├── signup.html         # Sign up form
├── login.html          # Login form
├── dashboard.html      # User dashboard
├── assets/
│   └── main.css        # Compiled SASS
└── js/
    ├── main.js         # Shared functionality (theme, utilities)
    ├── onboarding.js   # Onboarding slide logic
    ├── auth.js         # Authentication forms
    └── dashboard.js    # Dashboard functionality

src/
├── styles/             # SASS source files
│   ├── main.scss
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _base.scss
│   ├── _layout.scss
│   ├── _components.scss
│   └── _themes.scss
└── js/                 # Original JS source (for reference)
```

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Compile SASS to CSS:

   ```bash
   npm run sass
   ```

3. Open `public/index.html` in your browser to start.

## Features

### Pages

- **Landing Page** (`index.html`): Welcome screen with app introduction
- **Onboarding** (`onboarding.html`): 3-step tutorial with navigation
- **Sign Up** (`signup.html`): User registration form
- **Login** (`login.html`): User authentication form
- **Dashboard** (`dashboard.html`): Main user interface

### Technologies Used

- **HTML5**: Semantic markup for each page
- **SASS/SCSS**: Modular styling with variables and mixins
- **Bootstrap**: UI components and responsive grid
- **jQuery**: Dynamic functionality and DOM manipulation
- **LocalStorage**: User data and theme preference storage

### Dynamic Features

- **Theme Toggle**: Dark/light mode with localStorage persistence
- **Password Show/Hide**: Toggle password visibility
- **Form Validation**: Client-side validation for auth forms
- **Slide Navigation**: Onboarding with progress indicators
- **User Data Management**: Store and retrieve user information

### Data Management

- User registration and login (simplified for demo)
- Theme preference storage
- User data persistence between pages
- Mock dashboard data

## Navigation Flow

1. **Landing Page** → Click "Start Rating & Winning!" → **Onboarding**
2. **Onboarding** → Complete slides → **Sign Up**
3. **Sign Up** → Fill form → **Login**
4. **Login** → Fill form → **Dashboard**
5. **Dashboard** → Theme toggle, action buttons, user stats

## Development

- **SASS Compilation**: `npm run sass` to compile styles
- **File Structure**: Each page is a separate HTML file
- **JavaScript**: Modular JS files for different functionalities
- **Styling**: Shared CSS with page-specific styles

## Browser Support

- Modern browsers with ES6+ support
- Responsive design for mobile and desktop
- Progressive enhancement with jQuery fallbacks
