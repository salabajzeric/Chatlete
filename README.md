# Chatlete

**Chatlete** is a chat-first social sports platform designed to help people connect around training, communities, and real-world sport events.

It combines messaging, a social activity wall, and event coordination into one mobile-first product experience. The goal is to make it easier for athletes, teams, coaches, and sport communities to communicate, share progress, and organize activities without switching across multiple apps.

---

## Vision

Sport communities are often fragmented across WhatsApp groups, Instagram posts, spreadsheets, and event tools. Chatlete brings these core interactions into one focused platform built around community, coordination, and engagement.

The product vision is to create a simple but scalable digital space where users can:

- chat one-to-one or in groups,
- post updates and engage with community content,
- create and join sport events,
- and manage community roles through admin controls.

---

## MVP Scope

The current Chatlete repository represents an MVP-stage application focused on validating the core product experience.

### Core MVP features
- User signup and login
- Profile creation and sport identity
- Social wall / feed
- Post creation with reactions and sharing
- Direct chat and group chat
- Event creation and participation
- Admin management features
- Supabase-ready backend structure

### Planned next steps
- External authentication providers
- Production-ready Supabase integration
- Push notifications
- Better media support
- Mobile packaging and deployment
- Advanced moderation and analytics

---

## Product Positioning

Chatlete sits at the intersection of:

- **messaging** for sport communities,
- **social interaction** for motivation and visibility,
- and **event coordination** for offline participation.

Rather than being a general social network, Chatlete is intended to be a focused vertical product for active communities in sport and fitness.

---

## Why it matters

People do not just want to track sport — they want to belong to communities around it.

Chatlete is built around a simple belief:  
**communication, identity, and participation should live in the same product.**

This creates a stronger user loop:
1. users connect through chat,
2. they stay active through feed engagement,
3. and they convert into real participation through events.

---

## Repository Structure

This repository keeps the application inside the `app/` folder.

```text
Chatlete/
├── README.md
└── app/
    ├── src/
    ├── public/
    ├── package.json
    ├── vite.config.ts
    └── ...
```

### Structure note
- `README.md` in the repository root is used for the GitHub homepage
- the main application code currently lives inside `app/`

---

## Tech Stack

Current stack includes:

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- GitHub

The architecture is intended to support both **web MVP delivery** and future **mobile app packaging**.

---

## Local Development

### 1. Open the project folder
```bash
cd app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

---

## Environment Variables

Create a `.env` or `.env.local` file inside the `app/` folder.

Example:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Current Status

Chatlete is currently in **MVP / prototype development stage**.

This repository is being used to:
- structure the product for ongoing development,
- prepare Supabase integration,
- support future mobile app deployment,
- and evolve the concept into a production-ready platform.


Working prototype features: 23.04.2026
- Sign up flow
- Sign in flow
- Forgot/reset password flow
- Supabase authentication setup
- Basic app shell

---

## Founder Notes

This project is being developed as a focused MVP for a sport-centered communication and community platform.

At this stage, the priority is:
- speed of iteration,
- clear product structure,
- simple UX,
- and a foundation that can scale technically after validation.

---

## Contributing

At the moment, this repository is primarily intended for product building and internal development. Contribution guidelines can be added later as the project matures.

---

## Author

Created for the **Chatlete** product vision by Vladimir.