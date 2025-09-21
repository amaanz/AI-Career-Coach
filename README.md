# Resume Scoring Website

## Overview

This project is a web application that allows users to upload their resumes and receive AI-powered feedback. The system evaluates resumes against specific role types and generates a score along with tailored improvement suggestions.

## Features

- Upload resumes in PDF, DOC, or TXT format.  
- Select a target role type (e.g., Software Engineer, Data Scientist, Product Manager).  
- AI-powered scoring and feedback using Gemini AI.  
- Results dashboard with:
  - Resume score (0–100).  
  - Skills matched vs missing.  
  - Top improvement suggestions.  

## Tech Stack

- **Frontend:** React (TypeScript), Vite, Tailwind CSS, shadcn-ui  
- **Backend:** Node.js/Express or Python FastAPI (for AI integration)  
- **AI:** Gemini AI API  
- **Deployment:** Compatible with Vercel, Netlify, Render, or similar hosting platforms  

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) and npm installed (recommended via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))  

### Installation
```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate into the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server
npm run dev
