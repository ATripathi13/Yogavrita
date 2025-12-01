# YOGAVRITA - Your Daily Yoga Practice

A modern web application for daily yoga practice with guided breathing, streak tracking, and structured class sequences for Monday through Saturday.

## Features

- **Daily Class Sequences**: Six unique yoga sequences, one for each practice day (Monday-Saturday)
- **Visual Breathing Indicators**: Animated circles that expand and shrink to guide your breathing
- **Streak Tracking**: Maintain your practice consistency with current and longest streak counters
- **User Profiles**: Create and manage your personal profile with practice scheduling
- **Session Management**: Pause, resume, skip, or exit practice sessions with progress tracking
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Offline Support**: All data stored locally in your browser

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository or extract the project files
2. Navigate to the project directory:
   ```bash
   cd yogavrita
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

Build the app for production:
```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Deployment

### Deploy to Netlify, Vercel, or similar platforms:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service

### Deploy to GitHub Pages:

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```
3. Run: `npm run deploy`

## Usage

### First Time Setup

1. Open the app in your browser
2. Create your profile with name and email
3. Optionally set a daily practice time reminder

### Starting a Practice

1. From the home screen, select a day (Monday-Saturday)
2. Follow the asana sequence with visual breathing guides
3. Use controls to pause, resume, skip, or exit
4. Complete the session to maintain your streak

### Managing Your Profile

- Click the Profile button in the navigation
- View your current streak, longest streak, and total sessions
- Edit your name, email, or scheduled practice time

## Class Sequences

The app includes sample yoga sequences for each day. To customize with your own sequences:

1. Open `src/data/classSequences.ts`
2. Update the asana names, durations, and breathing patterns
3. Rebuild the app

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS Modules** - Component styling
- **LocalStorage API** - Data persistence

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Data Privacy

All user data is stored locally in your browser using LocalStorage. No data is sent to external servers. To clear your data, use the browser's clear site data feature or clear the profile from within the app.

## License

© 2024 YOGAVRITA - All rights reserved

## Support

For issues or questions, please contact the development team.
