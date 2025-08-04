# TabPortal - Aviation Intelligence Dashboard Hub

A modern, Federal Aviation Administration-styled web platform for displaying aviation business intelligence dashboards with robust search, filtering, and categorization capabilities.

## Current Project Status (August 2025)

TabPortal is an actively developed prototype dashboard portal designed specifically for aviation professionals and organizations. The platform provides intuitive access to business intelligence and analytics dashboards with a focus on user experience and visual consistency.

### Recent Development Highlights

- **NEW: Personnel / HR Subcategory Page**: Implemented dedicated Personnel page with 16 HR-specific subcategories
- **Enhanced Category Navigation**: Special handling for Personnel / HR card clicks to navigate to dedicated subcategory page
- **Expanded HR Analytics**: Added comprehensive Personnel subcategories including Hiring, Attrition, Telework, Diversity, and more
- **Updated Category System**: Implemented new aviation-specific categories to better align with FAA organizational structure
- **Enhanced Organization Mapping**: Updated organization dropdown with official FAA abbreviations
- **Improved Category Icons**: Added appropriate FontAwesome icons for new category types including Weather, IT, and Geospatial
- **Unified Layout System**: Maintained consistent white card, blue-bordered card, and gray content card layout across all pages
- **Data Governance Center Integration**: Styled to match DGC design standards with appropriate colors, typography, and component styling

## Overview

TabPortal serves as a centralized hub for aviation intelligence dashboards, featuring:

- **Dashboard Discovery**: Browse and filter available dashboards with advanced search capabilities
- **Category Organization**: Visual category browsing with color-coded cards
- **Personnel/HR Analytics**: Dedicated subcategory page with 16 specialized HR categories
- **Detailed Dashboard Views**: Comprehensive metadata and access information
- **Featured Content**: Highlighted "Intelligence Visualization of the Month"
- **Administrative Interface**: Dashboard management and content administration
- **Responsive Design**: Optimized for all device types and screen sizes

## Category System

### Main Categories
The platform uses the following FAA-aligned categories:

- **Aviation Safety**: Safety metrics, incident reporting, and compliance dashboards
- **Personnel / HR**: Human resources and personnel management analytics (with dedicated subcategory page)
- **Finance**: Financial performance, budgeting, and cost analysis dashboards
- **Aviation Operations**: Operational efficiency and performance metrics
- **IT**: Information technology systems and infrastructure monitoring
- **Oversight / Compliance & Enforcement**: Regulatory compliance and enforcement tracking
- **Air Traffic**: Air traffic management and flow analytics
- **Airports**: Airport operations and infrastructure dashboards
- **Weather**: Weather-related data and forecasting dashboards
- **Geospatial / Maps / Charts**: Geographic information systems and mapping analytics

### Personnel / HR Subcategories
The Personnel / HR category includes a dedicated page with 16 specialized subcategories:

- **Hiring**: Recruitment and hiring process analytics
- **Attrition**: Employee turnover and retention metrics
- **Telework**: Remote work and flexible work arrangement tracking
- **Diversity**: Diversity, equity, and inclusion metrics
- **Workforce Composition**: Employee demographic and structural analysis
- **Employee Engagement**: Engagement surveys and satisfaction metrics
- **Performance Management**: Performance review and evaluation dashboards
- **Training & Development**: Learning and professional development tracking
- **Workforce Planning**: Strategic workforce planning and forecasting
- **Succession Planning**: Leadership pipeline and succession planning
- **Leave & Attendance**: Time-off and attendance management
- **Competence & Benefits**: Compensation and benefits analysis
- **Onboarding**: New employee integration and onboarding metrics
- **Employee Relations**: HR case management and employee relations
- **Workforce Mobility**: Internal mobility and career progression
- **Workforce Safety**: Workplace safety and occupational health metrics

### Organization Codes
The platform uses official FAA organization abbreviations:

- **AVS**: Aviation Safety
- **ATO**: Air Traffic Organization  
- **ARP**: Airports
- **AST**: Office of Commercial Space Transportation
- **AFN**: NextGen
- **AGC**: Office of General Counsel
- **ANG**: Office of Government and Industry Affairs
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
- **Context API** - State management for dashboard data
- **React Router** - Client-side routing and navigation
- **Local Storage** - Session persistence and user preferences

### Design System
- **Data Governance Center Theme** - Consistent with FAA/DGC design standards
- **Responsive Grid Layout** - Adaptive design for all screen sizes
- **Accessibility Compliant** - WCAG guidelines and semantic markup

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

The current version uses password-based access control:
- **Access Password**: `aviation2025`
- Authentication persists across browser sessions
- Admin functionality requires separate access

## Key Features

### Dashboard Management
- **Gallery View**: Grid-based dashboard browsing with thumbnails
- **Search & Filter**: Advanced filtering by category, organization, and keywords
- **Metadata Display**: Comprehensive dashboard information and access links
- **Featured Dashboards**: Highlighted content with enhanced visibility

### User Experience
- **Intuitive Navigation**: Clear page structure and consistent layout
- **Visual Consistency**: Unified design language across all components
- **Performance Optimized**: Fast loading and responsive interactions
- **Mobile Ready**: Touch-friendly interface for mobile devices

### Administrative Tools
- **Dashboard Administration**: Add, edit, and manage dashboard entries
- **Content Management**: Update featured dashboards and metadata
- **User Access Control**: Password-based authentication system

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components (Header, Footer, SearchBar)
│   └── dashboard/       # Dashboard-specific components
├── pages/               # Main page components
│   ├── HomePage.js      # Main landing page
│   ├── CategoriesPage.js # Category browsing page
│   ├── PersonnelPage.js # Personnel/HR subcategory page (NEW)
│   └── ...              # Other page components
├── styles/              # CSS styling files
├── context/             # React Context for state management
└── data/                # Static data and configuration
```

## Recent Changes (August 4, 2025)

### Personnel / HR Subcategory Implementation
- **New PersonnelPage Component**: Created dedicated page for Personnel/HR subcategories
- **16 HR Subcategories**: Implemented comprehensive HR analytics categories with relevant icons
- **Special Navigation Logic**: Updated HomePage and CategoriesPage to handle Personnel/HR card clicks
- **Personnel Page Routing**: Added `/personnel` route to App.js with proper navigation handling
- **Visual Consistency**: Applied same DGC styling and layout structure as other pages

### Navigation Updates
- **NavigationHeader Enhancement**: Added Personnel page title support
- **Category Click Handling**: Implemented special logic for Personnel/HR navigation vs. regular category filtering
- **URL Routing**: Added new `/personnel` route with proper authentication flow

### Styling Enhancements
- **PersonnelPage.css**: Created comprehensive styling for 16 Personnel subcategories
- **Color-coded Categories**: Unique gradient backgrounds for each Personnel subcategory
- **Icon Integration**: Added relevant FontAwesome icons for each HR subcategory
- **Responsive Design**: Maintained mobile-friendly layout across all new components

## Development Roadmap

### Completed ✅
- [x] Core UI implementation and responsive design
- [x] Dashboard browsing, search, and filtering functionality
- [x] Data Governance Center visual integration
- [x] Category-based navigation system
- [x] Authentication and session management
- [x] Administrative interface for content management
- [x] Updated category and organization taxonomies
- [x] Enhanced icon mapping for new categories
- [x] Personnel / HR subcategory page implementation

### In Development 🚧
- [ ] Backend API integration and data persistence
- [ ] Enhanced user role management
- [ ] Dashboard analytics and usage tracking
- [ ] Advanced search capabilities with faceted filtering
- [ ] Migration tools for existing dashboard data
- [ ] Personnel subcategory dashboard integration

### Future Considerations 🔮
- [ ] Additional subcategory pages for other main categories
- [ ] Single Sign-On (SSO) integration
- [ ] Real-time dashboard status monitoring
- [ ] Personalized dashboard recommendations
- [ ] Export and sharing capabilities
- [ ] Integration with FAA enterprise systems

## Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## Migration Notes

For existing installations, the following updates are recommended:

1. **Route Updates**: Ensure `/personnel` route is properly configured
2. **Navigation Logic**: Update category click handlers to support Personnel page navigation
3. **CSS Integration**: Include PersonnelPage.css styling
4. **Testing**: Verify Personnel page navigation from both Home and Categories pages

## License

This project is for demonstration and development purposes. All rights reserved.

---

**Note**: This is a prototype application designed to showcase modern web development practices and Data Governance Center design integration. The current implementation uses simulated data and authentication for demonstration purposes.

## Changelog

### August 4, 2025
- **Personnel / HR Subcategory Page**: Implemented dedicated Personnel page with 16 HR-specific subcategories
- **Enhanced Navigation Logic**: Added special handling for Personnel/HR card clicks
- **Visual Integration**: Applied consistent DGC styling and layout to Personnel page
- **Icon Library Expansion**: Added relevant FontAwesome icons for all Personnel subcategories
- **Routing Enhancement**: Added new `/personnel` route with proper authentication flow

### August 3, 2025
- **Category System Overhaul**: Implemented new FAA-aligned category taxonomy
- **Organization Code Update**: Replaced organization names with official FAA abbreviations
- **Enhanced Icon Mapping**: Added category-specific FontAwesome icons
- **UI Consistency**: Maintained DGC styling standards across updated components
- **Backward Compatibility**: Preserved legacy category support for existing data