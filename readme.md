# TabPortal - Aviation Intelligence Dashboard Hub

A modern, Federal Aviation Administration-styled web platform for displaying aviation business intelligence dashboards with robust search, filtering, and categorization capabilities.

## 📹 Project Demo

[![TabPortal Demo Video](https://img.youtube.com/vi/G1DBL7rEcBg/maxresdefault.jpg)](https://youtu.be/G1DBL7rEcBg)

*Click the thumbnail above to watch a complete walkthrough of TabPortal's features and functionality*

## Current Project Status (August 2025)

TabPortal is an actively developed prototype dashboard portal designed specifically for aviation professionals and organizations. The platform provides intuitive access to business intelligence and analytics dashboards with a focus on user experience and visual consistency.

### Recent Development Highlights

- **Layout & Design Fixes (August 11, 2025)**: Major fixes to homepage layout, navigation, and featured dashboard styling
- **Navigation Header Optimization**: Removed extraneous "Dashboards" text and improved tab spacing
- **SearchBar Integration**: Fixed spacing issues and removed gaps between components
- **Featured Dashboard Enhancement**: Restored blue border and proper EIM banner styling
- **Category System Overhaul**: Implemented new FAA-aligned information domain categories
- **Organization Code Updates**: Corrected NextGen and Government Affairs abbreviations, added Finance and Management
- **Enhanced Search & Filtering**: Fixed organization abbreviation search and improved category filtering
- **Security Enhancements**: Implemented two-tier password protection
- **People Analytics**: Comprehensive HR subcategory system with 16 specialized categories
- **Data Governance Center Integration**: Complete visual alignment with FAA/DGC design standards

## Recent Changes (August 11, 2025)

### Major Layout and Styling Fixes
- **NavigationHeader Component**: Removed the bolded "Dashboards" text that was incorrectly displayed
- **Featured Dashboard**: Restored prominent blue border and proper EIM banner positioning
- **SearchBar Layout**: Fixed spacing issues and removed large gaps between SearchBar and FeaturedDashboard
- **Homepage EIM Banner**: Ensured proper display of the Enterprise Information Management header section
- **Navigation Tabs**: Improved tab indicator positioning and spacing without title interference

### CSS Improvements
- **HomePage.css**: Fixed content card layout and proper spacing between sections
- **FeaturedDashboard.css**: Enhanced blue border prominence and EIM banner styling
- **SearchBar.css**: Removed gaps and unnecessary background elements on homepage
- **NavigationHeader.css**: Cleaned up layout for title-less navigation structure

### Component Updates
- **HomePage.js**: Improved section organization and proper EIM header display
- **NavigationHeader.js**: Removed extraneous "Dashboards" title text
- **SearchBar Integration**: Better integration with homepage layout without extra spacing

## Overview

TabPortal serves as a centralized hub for aviation intelligence dashboards, featuring:

- **Dashboard Discovery**: Browse and filter available dashboards with advanced search capabilities
- **Smart Search**: Multi-field search across titles, descriptions, organizations, data sources, and tags
- **Information Domain Organization**: Visual category browsing with color-coded cards across 13 specialized domains
- **People Analytics**: Specialized page with 16 HR analytics subcategories
- **Detailed Dashboard Views**: Comprehensive metadata and access information
- **Featured Content**: Highlighted "Intelligence Visualization of the Month" with prominent blue styling
- **Administrative Interface**: Password-protected dashboard management and content administration
- **Responsive Design**: Optimized for all device types and screen sizes

## Key Features

### Dashboard Management
- **Gallery View**: Grid-based dashboard browsing with thumbnails and metadata
- **Advanced Search**: Multi-field text search with organization abbreviation support (ATO, AVS, etc.)
- **Category Filtering**: 13 information domain categories with color-coded navigation
- **Featured Dashboard**: Monthly highlighted dashboard with prominent blue border and EIM branding
- **Responsive Grid**: Adaptive layout that works seamlessly across all device sizes

### Search & Discovery
- **Intelligent Search**: Real-time search across multiple fields with instant results
- **Organization Codes**: Support for official FAA abbreviations (ATO, AVS, ARP, etc.)
- **Tag-Based Filtering**: Dynamic tag system for precise content discovery
- **Visual Categories**: Color-coded category cards for intuitive browsing
- **Search History**: Session-based search persistence and URL parameter support

### User Experience
- **Modern Interface**: Clean, professional design aligned with FAA/DGC standards
- **Accessibility**: WCAG 2.1 AA compliant with full keyboard navigation
- **Performance**: Optimized loading and smooth interactions
- **Mobile-First**: Responsive design that works perfectly on all devices
- **Visual Consistency**: Cohesive design language throughout the application

## Organization Codes
The platform uses official FAA organization abbreviations:

- **AVS**: Aviation Safety
- **ATO**: Air Traffic Organization  
- **ARP**: Airports
- **AST**: Office of Commercial Space Transportation
- **ANG**: NextGen
- **AGC**: Office of General Counsel
- **AGI**: Office of Government and Industry Affairs
- **AFN**: Office of Finance and Management
- **APL**: Office of Policy, International Affairs and Environment
- **AIT**: Office of Information and Technology
- **ASH**: Office of Security and Hazardous Materials Safety

## Technology Stack

### Frontend
- **React.js** - Modern component-based UI framework
- **JavaScript (ES6+)** - Application logic and interactivity
- **CSS3** - Custom styling with CSS Grid and Flexbox
- **Font Awesome** - Icon library for consistent iconography
- **Open Sans** - Google Fonts integration matching DGC standards

### Architecture
- **Component-based Design** - Modular, reusable UI components
- **Context API** - State management for dashboard data and search functionality
- **React Router** - Client-side routing and navigation with URL parameter support
- **Local Storage** - Session persistence and user preferences

### Design System
- **Data Governance Center Theme** - Consistent with FAA/DGC design standards
- **Responsive Grid Layout** - Adaptive design for all screen sizes
- **Accessibility Compliant** - WCAG guidelines and semantic markup
- **Modern UI Patterns** - Material Design influences with professional styling

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Access the application at `http://localhost:3000`

### Authentication

The current version uses two-tier password-based access control:
- **App Access Password**: `aviation2025` (for general application access)
- **Admin Access Password**: `admin2025` (for administrative console access)
- Authentication persists across browser sessions
- Admin access requires additional password entry when clicking the admin (+) icon

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components (Header, Footer, SearchBar, NavigationHeader)
│   ├── admin/           # Administrative interface components
│   └── dashboard/       # Dashboard-specific components
├── pages/               # Main page components
│   ├── HomePage.js      # Main landing page with featured content
│   ├── CategoriesPage.js # Information domain browsing page
│   ├── PersonnelPage.js # People analytics subcategory page
│   ├── AllDashboardsPage.js # Dashboard search and filtering page
│   ├── AdminPage.js     # Administrative console
│   ├── ComingSoonPage.js # Placeholder for future features
│   └── DetailPage.js    # Individual dashboard detail views
├── styles/              # CSS styling files
├── context/             # React Context for state management
└── data/                # Static data and configuration
```

## Recent Changes (August 11, 2025)

### Information Domain Category Overhaul
- **New Category Structure**: Implemented 13 FAA-aligned information domain categories
- **Category Migration**: Updated all components to use new category structure
- **People Category**: Replaced "Personnel / HR" with "People" while maintaining navigation to /personnel page
- **Enhanced Icons**: Updated FontAwesome icons to match new category themes
- **Admin Integration**: Updated AddDashboardForm with new category dropdown and tagging system

### Organization Code Corrections
- **Added**: Office of Finance and Management (AFN) to organization dropdown
- **Fixed**: NextGen abbreviation changed from AFN to ANG
- **Fixed**: Government and Industry Affairs abbreviation changed from ANG to AGI
- **Updated**: All affected components (SearchBar, AddDashboardForm, README documentation)

### UI/UX Improvements
- **Featured Dashboard**: Empty tags and metadata fields are automatically hidden for cleaner display
- **Detail Page Layout**: Fixed sidebar positioning for Dashboard Information, Data Sources, and Contact Information cards
- **Code Quality**: Resolved ESLint warnings and cleaned up unused imports
- **Category Cards**: Enhanced styling and hover effects for improved user experience

### Data Management
- **Real Data Support**: Enhanced data source switching between sample and production data
- **Git Security**: Real data files excluded from version control while maintaining deployment flexibility
- **Schema Validation**: Consistent data structure across sample and production environments

## Deployment & Data Management

### Development Workflow
```bash
# For GitHub deployment (sample data)
git add .
git commit -m "Update description"
git push github main

# For FAA server deployment (real data)
# 1. Set USE_REAL_DATA = true in DashboardContext.js
# 2. Uncomment real data imports
git add .
git commit -m "Deploy with real data"
git push origin main
```

### Data Source Configuration
- **Sample Data**: Used for development and public GitHub repository
- **Real Data**: Used for production deployment on FAA servers
- **Automatic Switching**: Simple configuration flags for easy data source management
- **Security**: Real data never exposed in public repositories

## Browser Support

- **Chrome** 90+ (Recommended)
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile Safari** iOS 14+
- **Chrome Mobile** Android 90+

## Performance

- **Lighthouse Score**: 95+ Performance, 100 Accessibility
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: Optimized for fast loading

## Security Features

- **Password Protection**: Multi-tier access control
- **Session Management**: Secure browser session handling
- **Data Isolation**: Real data excluded from public repositories
- **Input Validation**: Form validation and sanitization
- **XSS Protection**: React built-in protections

## Accessibility

- **WCAG 2.1 AA Compliant**: Meets accessibility guidelines
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: Meets minimum contrast requirements
- **Focus Management**: Clear focus indicators and logical tab order

## Future Roadmap

### Planned Features
- **Dashboard Analytics**: Usage tracking and popularity metrics
- **Advanced Filtering**: Date ranges, dashboard types, and custom filters
- **User Preferences**: Personalized dashboard recommendations
- **Export Functionality**: Dashboard metadata export capabilities
- **API Integration**: Real-time data source connectivity
- **Collaboration Tools**: Dashboard sharing and commenting features

### Technical Enhancements
- **Performance Optimization**: Further bundle size reduction
- **Offline Support**: Service worker implementation
- **Mobile App**: React Native mobile application
- **Advanced Search**: Elasticsearch integration
- **Real-time Updates**: WebSocket connections for live data

## Contributing

This is a Federal Aviation Administration internal project. For questions, suggestions, or technical support, please contact the development team through official FAA channels.

## License

This project is property of the Federal Aviation Administration. All rights reserved.

---

**Note**: This is a prototype application designed to showcase modern web development practices and Data Governance Center design integration. The current implementation uses simulated data and authentication for demonstration purposes.