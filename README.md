# Paymint Pro - Full-Stack Financial Management Platform

![Paymint Pro](https://placehold.co/1200x630.png?text=Paymint+Pro+Dashboard)

Paymint Pro is a comprehensive, full-stack financial management application designed to provide a seamless and modern experience for both end-users and administrators. It features a secure, feature-rich admin dashboard for managing finances and a polished, public-facing marketing website to attract and inform new customers.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Core Features](#core-features)
  - [Admin Dashboard](#admin-dashboard)
  - [Marketing Website](#marketing-website)
- [System Architecture & Workflow](#system-architecture--workflow)
  - [Authentication](#authentication)
  - [Data Model](#data-model)
  - [AI Integration](#ai-integration)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Firebase Setup](#firebase-setup)
  - [Installation & Running](#installation--running)
- [Future Scope](#future-scope)
- [License](#license)

---

## Project Overview

The goal of Paymint Pro is to offer a robust suite of financial tools in a single, intuitive platform. Users can manage everything from bank accounts and transactions to invoicing and trading, all while benefiting from AI-powered insights. The project is split into two main parts: a private, authenticated user dashboard and a public-facing marketing site.

## Core Features

### Admin Dashboard

The password-protected admin area (`/dashboard`) is the core of the application, providing users with a wide range of financial management tools.

-   **Dashboard**: A centralized overview of key financial stats, revenue charts, recent transactions, and AI-driven daily insights.
-   **Transactions**: A searchable and filterable data table of all user transactions with options to view, edit, and delete.
-   **Accounts & Cards**: Manage connected bank accounts and virtual/physical cards.
-   **Payments & Budgets**: Schedule upcoming payments and create/manage spending budgets for various categories.
-   **Invoicing**: A full invoicing system to create, send, and manage invoices with status tracking (Draft, Sent, Paid, Overdue).
-   **Trading**: A simulated trading interface to buy/sell stocks, view portfolio performance, and follow market news.
-   **AI Financial Advisor**: An interactive chat interface where users can ask financial questions and receive personalized advice based on their actual transaction data.
-   **Support Center**: A complete ticketing system where users can create support tickets and chat with agents. The chat is enhanced with AI to suggest replies for users and to help agents draft responses.
-   **Global Search**: A command palette (`⌘+K` or `Ctrl+K`) for quickly searching across all user data, including transactions, invoices, tickets, and more.
-   **User Settings**: Comprehensive settings for profile management, notifications, security (2FA), and billing/subscription management.

### Marketing Website

The public-facing site (`/`) is designed to convert visitors into users. It includes several detailed, professionally designed pages:

-   **Homepage**: A beautiful landing page showcasing the app's value proposition.
-   **Features & Pricing**: Detailed breakdown of features and subscription plans.
-   **Business & Cards**: Pages tailored to business users and card-specific features.
-   **Company Pages**: About, Blog, Careers, Reviews, and Contact pages.
-   **Legal**: Terms of Service, Privacy Policy, and Cookie Policy.

## System Architecture & Workflow

### Authentication

User authentication is handled by **Firebase Authentication**, supporting both email/password and Google social login. The application uses a client-side `AuthProvider` to manage user sessions and protect routes. Upon registration, new user profiles are created in Firestore.

### Data Model

All user data is securely stored in **Cloud Firestore**. Each user has a unique document in the `users` collection, keyed by their Firebase UID. All other data (transactions, accounts, invoices, etc.) is stored in subcollections within that user's document, ensuring strong data isolation and security.

On first-time registration, a `seedDatabase` function is triggered to populate the new user's account with realistic sample data, providing an immediate and engaging user experience.

### AI Integration

The application leverages **Google's Genkit** framework to integrate powerful AI capabilities:

-   **`daily-insight`**: Generates a short, actionable financial tip based on the user's recent transactions.
-   **`financial-advice`**: Powers the AI Advisor, using tools to fetch the user's transaction data to provide personalized, context-aware financial advice.
-   **`suggest-replies` & `enhance-reply`**: Work together in the support chat to provide smart reply suggestions and improve the clarity of user-drafted messages.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **UI**: [React](https://react.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Component Library**: [Shadcn/UI](https://ui.shadcn.com/)
-   **Backend & Database**: [Firebase](https://firebase.google.com/) (Auth, Firestore)
-   **Generative AI**: [Google's Genkit](https://firebase.google.com/docs/genkit)

## Project Structure

The codebase is organized logically to separate concerns:

```
/src
├── app/                  # Next.js App Router: routing, pages, and layouts
│   ├── (auth)/           # Auth-related pages (login, register)
│   ├── (legal)/          # Legal pages (terms, privacy)
│   ├── (main)/           # The core authenticated application dashboard
│   └── (marketing)/      # The public-facing marketing website
├── components/           # Reusable React components (UI, dialogs, etc.)
├── lib/                  # Core libraries and utilities (Firebase, data fetching)
├── ai/                   # Genkit flows and AI logic
├── hooks/                # Custom React hooks
└── __tests__/            # Jest test files
```

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/en) (v18 or later recommended)
-   `npm`, `yarn`, or `pnpm`

### Firebase Setup

1.  Create a new project in the [Firebase Console](https://console.firebase.google.com/).
2.  Enable **Authentication** (with Email/Password and Google providers) and **Firestore**.
3.  Go to Project Settings > General, and under "Your apps", create a new Web App.
4.  Copy the `firebaseConfig` object values.
5.  Create a `.env` file in the root of the project by copying it from this repository (it will be named `env.example` or similar) or creating it from scratch.
6.  Populate `.env` with your Firebase credentials:

    ```bash
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    GOOGLE_API_KEY=your_google_ai_studio_api_key
    ```
7. To get a `GOOGLE_API_KEY`, create one from [Google AI Studio](https://aistudio.google.com/app/apikey).


### Installation & Running

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Run the development server**:
    The application runs on two processes.
    - Run the Next.js frontend:
      ```bash
      npm run dev
      ```
    - In a separate terminal, run the Genkit AI development server:
      ```bash
      npm run genkit:dev
      ```
3.  Open [http://localhost:3000](http://localhost:3000) to view the application.
4.  The Genkit Inspector will be available at [http://localhost:4000](http://localhost:4000) to monitor AI flows.

## Future Scope

-   **Enhanced AI Tools**: Integrate more advanced AI tools for fraud detection, budget forecasting, and investment analysis.
-   **Team Collaboration**: Introduce features for business accounts, allowing multiple team members to collaborate.
-   **Deeper Integrations**: Connect with more third-party services like Plaid for real-time bank account syncing.
-   **Native Mobile Apps**: Develop native iOS and Android applications for an even better mobile experience.

## License

This project is licensed under the MIT License.
