# Overview

Cloudnix Shop Onboarding Wizard is a responsive three-step web application designed to guide users through setting up an e-commerce shop. The wizard features theme selection, product category configuration, and detailed product setup with pricing. Built with HTML5, CSS3, jQuery, and Bootstrap, it uses orange, turquoise, and blue as primary colors with extensive whitespace and no clutter for optimal user experience across desktop, tablet, and mobile devices.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Single Page Application (SPA)**: Built with vanilla HTML, CSS, and JavaScript using jQuery for DOM manipulation
- **Progressive Wizard Pattern**: Multi-step form interface with visual progress tracking and step validation
- **Component-Based UI**: Modular step components with consistent styling and interaction patterns
- **Responsive Design**: Bootstrap 5 framework for mobile-first responsive layout

## Styling and Design System
- **CSS Custom Properties**: Centralized design tokens for colors, spacing, and typography optimized for performance
- **Typography Stack**: Inter and Roboto fonts from Google Fonts for professional appearance
- **Icon System**: Font Awesome 6.4.0 for consistent iconography and interactive elements
- **Color Scheme**: Orange primary (#FF6B35), turquoise (#17A2B8), blue (#007BFF) with high contrast ratios
- **Responsive Design**: Mobile-first approach with breakpoints for large desktops, desktops, tablets, and mobile devices
- **Visual Elements**: Browser mockups for theme previews, flow diagrams, scrollable forms with custom scrollbars

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

## Recent Changes (August 2025)
- **Complete redesign** based on provided design mockups for professional onboarding experience
- **Step 1**: Enhanced theme selection with browser-style mockups showing Bags, Flex, and Chic themes
- **Step 2**: Improved category setup with interactive flow diagram and clean form layout
- **Step 3**: Redesigned product form with scrollable container and live preview card
- **Responsive optimization** for all screen sizes with proper spacing and typography scaling
- **Performance optimization** ready for Google PageSpeed testing with optimized CSS and smooth animations

Note: The current implementation is a frontend-only prototype optimized for user experience and performance. No backend services, databases, or server-side processing are currently integrated.