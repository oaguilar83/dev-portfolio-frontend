# dev-portfolio-frontend

A personal developer portfolio website built with React and Vite.

## Features

- **Home Section** - Profile introduction with bio and social media links
- **About Me Section** - Personal background, professional summary, and skills tags
- **Projects Section** - Showcase of portfolio projects
- **Contact Form** - Email contact form powered by EmailJS
- **Responsive Design** - CSS Modules for component-scoped styling
- **Smooth Navigation** - Scroll-based navigation with active section highlighting and debounced scroll events
- **Accessibility** - Proper alt text and aria-labels for screen reader support

## Tech Stack

- React 19
- Vite 7
- Material UI (MUI) Icons
- EmailJS
- CSS Modules
- Vitest + React Testing Library
- react-hot-toast

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Configuration

Copy the example environment file and fill in your EmailJS credentials:

```bash
cp .env.example .env
```

Required environment variables:

| Variable | Description |
|----------|-------------|
| `VITE_EMAILJS_SERVICE_ID` | Your EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | Your EmailJS email template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | Your EmailJS public key |

Get these values from your [EmailJS dashboard](https://www.emailjs.com/).

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

### Testing

```bash
# Run tests in watch mode
npm run test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

## Deployment

### CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

- **CI**: Runs linting and build on every pull request
- **CD**: Automatically deploys to EC2 when a pull request is merged to main

### Manual Deployment (GitHub Pages)

```bash
# Build for GitHub Pages
npm run gh-pages-build

# Deploy to GitHub Pages
npm run gh-pages-deploy
```

## Project Structure

```
src/
├── components/           # Reusable components
│   ├── RoundImage        # Circular image component
│   └── SocialMediaContainer  # Social media links
├── data/                 # Static data and content
│   └── projects.js       # Project showcase data
├── hooks/                # Custom React hooks
│   ├── useActiveSection  # Scroll-based active section tracking
│   └── useInView         # Intersection Observer hook for animations
├── sections/             # Page sections
│   ├── about/            # About me section
│   ├── contact/          # Contact form section with toast notifications
│   ├── footer/           # Footer component
│   ├── home/             # Home/intro section
│   ├── navbar/           # Navigation bar with scroll tracking
│   └── projects/         # Projects showcase
├── test/                 # Test setup and utilities
├── App.jsx               # Main app component
├── App.module.css        # Global app styles
├── index.css             # Base styles
└── main.jsx              # Entry point
```

## License

MIT
