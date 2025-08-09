# Overview

Cloudnix Shop Setup Wizard is a multi-step web application that guides users through setting up an e-commerce shop. The wizard walks users through three main steps: theme selection, category configuration, and product setup. The application is designed as a client-side wizard with a clean, modern interface that collects shop configuration data through an intuitive step-by-step process.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Single Page Application (SPA)**: Built with vanilla HTML, CSS, and JavaScript using jQuery for DOM manipulation
- **Progressive Wizard Pattern**: Multi-step form interface with visual progress tracking and step validation
- **Component-Based UI**: Modular step components with consistent styling and interaction patterns
- **Responsive Design**: Bootstrap 5 framework for mobile-first responsive layout

## Styling and Design System
- **CSS Custom Properties**: Centralized design tokens for colors, spacing, and typography
- **Typography Stack**: Primary fonts using Inter and Roboto from Google Fonts
- **Icon System**: Font Awesome 6.4.0 for consistent iconography
- **Color Scheme**: Orange primary (#FF6B35), turquoise secondary (#17A2B8), with accessible contrast ratios

## State Management
- **Local JavaScript State**: Wizard data stored in JavaScript object with properties for theme, category, product details, pricing, and inventory
- **Step Navigation**: Controlled navigation with validation gates preventing users from skipping required steps
- **Progress Tracking**: Visual progress bar synchronized with current step state

## User Experience Patterns
- **Validation Strategy**: Client-side validation at each step before allowing progression
- **Navigation Controls**: Back/next buttons with conditional enabling based on validation state
- **Visual Feedback**: Active states, hover effects, and transitions for user guidance

# External Dependencies

## Frontend Libraries
- **Bootstrap 5.3.0**: CSS framework for responsive grid system and component styling
- **jQuery**: JavaScript library for DOM manipulation and event handling
- **Google Fonts**: Web font service providing Inter and Roboto font families
- **Font Awesome 6.4.0**: Icon library for user interface icons

## CDN Services
- **jsDelivr**: Content delivery network for Bootstrap CSS
- **Google Fonts CDN**: Font delivery service for web typography
- **Cloudflare CDNs**: Font Awesome icon library hosting

Note: The current implementation appears to be a frontend-only prototype. No backend services, databases, or server-side processing are currently integrated.