# Restaurant Feedback Platform 

##  Brief Description
The **Restaurant Feedback Platform** is a responsive multi-page web application aimed at collecting and managing customer feedback through a smooth and interactive user experience. The app simulates real-world user flows from onboarding to dashboard access, with dynamic UI features and persistent user preferences.

Built entirely on the frontend with modular SASS, Bootstrap, and jQuery, the platform emphasizes design consistency, code reusability, and modern UI practices.

---

##  Features

### Dynamic Functionality

####  Theme Toggle
- Light and dark mode switcher with user preference saved in `localStorage`
- Instantly updates UI across sessions

####  Form Handling
- Sign Up and Login forms with client-side validation
- Show/hide password functionality for better UX

####  Slide-based Onboarding
- Interactive 3-step tutorial on app usage
- Progress indicators and navigation between slides

####  Dashboard Functionality
- Personalized user dashboard with mock stats and actions
- User data and preferences loaded dynamically

###  User Data Persistence
- User credentials and theme saved in `localStorage`
- Cross-page state management with `localStorage` and JS session handling

---

##  Team Members

- **Nduka-aku Oluchi Rejoice** – Frontend structure, Slide navigation and styling
- **Logozaga** – Authentication logic, Theme persistence  

---

## Development Process

###  Planning
- Defined multi-page navigation and user flow
- Outlined key components: onboarding, authentication, dashboard
- Designed reusable SASS partials for styling consistency

###  Implementation
- Developed static pages with semantic HTML5 and Bootstrap
- Created modular SASS files for:
  - Variables and mixins
  - Components and layout
  - Theme switching
- Wrote JavaScript modules for:
  - Theme toggling
  - Slide navigation and progress updates
  - Authentication form logic
- Enabled persistent storage of user data using:
  - `localStorage` for preferences
  - Conditional DOM rendering based on session

###  Testing
- Cross-browser and cross-device UI testing
- Manual testing of form validation and navigation
- Verified state persistence between page reloads

---

## Technical Implementations

###  Frontend Development
- Built multi-page app with:
  - `index.html` (Landing)
  - `onboarding.html` (Slides)
  - `signup.html` (Register)
  - `login.html` (Authenticate)
  - `dashboard.html` (User Area)
- Used Bootstrap for layout and component styling
- Customized and compiled SASS using `npm run sass`

###  JavaScript Functionality
- jQuery for dynamic DOM manipulation and event binding
- Modular JS files for each page to keep code clean and scoped
- Password visibility toggle and validation using native JS

###  Data Management
- Theme and user information stored in `localStorage`
- Simulated login/logout behavior for navigation flow
- Dashboard populated with mock data loaded from JS

---

##  Technologies Used

- **Frontend:** HTML5, SASS, Bootstrap, JavaScript, jQuery  
- **Persistence:** localStorage  
- **Tools:** Git, VS Code  
- **Testing:** Manual testing across Chrome, Edge  
- **Deployment:** Can be served locally using any static file server

---

## How to Run the Project Locally
### Clone the repository:
```bash
git clone https://github.com/Lisky-pixel/Restaurant_Feedback_Platform.git
cd restaurant_feedback_platform
```

## Deployed Webpage
➡ [View Live on GitHub Pages]()

## Key Achievements
 Successfully implemented a fully functional mock backend
 Created seamless frontend-backend integration
 Delivered persistent user experience
 Maintained clean code structure throughout
 Achieved responsive design across devices
