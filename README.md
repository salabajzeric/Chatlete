# Chatlete

Chatlete is a social sports messaging app MVP focused on chat, community feed, and sport event creation.

## Overview

Chatlete combines:
- a chat-focused messenger,
- a social media wall for athlete posts,
- and an events area where users can create and join sport activities.

This repository currently keeps the main application inside the `app/` folder.

## Features

- Easy sign up and login flow
- Social wall with posts, reactions, sharing, and mentions
- Direct chat and group chat
- Sport events creation and participation
- Profile management
- Admin panel for user management
- Supabase-ready structure for backend, auth, and storage
- Web-first MVP structure with future mobile support

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- GitHub

## Project structure

```text
Chatlete/
├── README.md
└── app/
    ├── src/
    ├── public/
    ├── package.json
    └── ...
```

## Local setup

1. Open the `app` folder:
   ```bash
   cd app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Environment variables

Create a `.env` or `.env.local` file inside the `app/` folder and add your project variables, for example:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Status

This project is currently in MVP stage and is being prepared for web and mobile app development.

## Notes

- Main application source code is inside the `app/` directory.
- Repository root contains general documentation for GitHub display.
- Future improvements may include mobile packaging, external auth providers, and production deployment.

## Author

Created by Vladimir / Chatlete project.# Chatlete
