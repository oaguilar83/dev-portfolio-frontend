# dev-portfolio-frontend

A personal developer portfolio website built with React and Vite.

## Features

- **Home Section** - Profile introduction with bio and social media links
- **About Me Section** - Personal background and professional summary
- **Contact Form** - Email contact form powered by EmailJS
- **Responsive Design** - CSS Modules for component-scoped styling
- **Smooth Navigation** - Scroll-based navigation between sections

## Tech Stack

- React 19
- Vite 7
- Material UI (MUI) Icons
- EmailJS
- CSS Modules

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

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
├── components/
│   ├── about/        # About me section
│   ├── common/       # Reusable components (RoundImage, SocialMedia)
│   ├── contact/      # Contact form section
│   ├── footer/       # Footer component
│   ├── home/         # Home/intro section
│   └── navbar/       # Navigation bar
├── App.jsx           # Main app component
├── App.module.css    # Global app styles
├── index.css         # Base styles
└── main.jsx          # Entry point
```

## License

MIT
