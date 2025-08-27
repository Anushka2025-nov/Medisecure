# MediSecure - Healthcare Data Management System

## Overview

MediSecure is a comprehensive healthcare data management system designed for secure handling of electronic health records (EHRs), patient management, and compliance with healthcare regulations including HIPAA and DISHA Act. The system provides role-based access control for healthcare professionals including doctors, nurses, administrators, and lab technicians, with comprehensive audit trails and backup management capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development tooling
- **UI Library**: Shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom medical theme colors and CSS variables
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom aliases and path resolution

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured error handling and logging middleware
- **Authentication**: Session-based authentication with role-based access control
- **Request Logging**: Custom middleware for API request/response logging
- **Development**: Hot module replacement with Vite integration

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Design**: Structured tables for users, patients, medical records, audit logs, and backup logs
- **Connection**: Neon Database serverless PostgreSQL integration
- **Migrations**: Drizzle Kit for database schema migrations
- **Storage Interface**: Abstracted storage layer with in-memory fallback for development

### Authentication and Authorization
- **User Roles**: Multi-role system (doctor, nurse, admin, lab_technician)
- **Session Management**: Server-side session handling with PostgreSQL session store
- **Password Security**: Plain text storage (development only - requires hashing implementation)
- **Access Control**: Role-based permissions with audit logging for all authentication events
- **Client State**: Local storage persistence with automatic session restoration

### Security and Compliance
- **Audit Trail**: Comprehensive logging of all system activities including user actions, resource access, and status tracking
- **Data Encryption**: Placeholder for AES-256 encryption implementation
- **Compliance Monitoring**: HIPAA and DISHA Act compliance status tracking
- **Backup Management**: Automated backup scheduling with cloud storage integration
- **IP Tracking**: User agent and IP address logging for security monitoring

### Database Schema Design
- **Users Table**: User management with role-based access and activity status
- **Patients Table**: Patient demographics with unique patient IDs and status tracking
- **Medical Records Table**: EHR storage with structured data for consultations, lab results, and prescriptions
- **Audit Logs Table**: Complete activity tracking with timestamps and status indicators
- **Backup Logs Table**: Backup operation tracking with success/failure monitoring

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database hosting
- **Connect PG Simple**: PostgreSQL session store for Express sessions

### UI and Styling
- **Radix UI**: Accessible component primitives for form controls, modals, and interactive elements
- **Tailwind CSS**: Utility-first CSS framework with medical theme customization
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Fast build tool with React plugin and TypeScript support
- **ESBuild**: JavaScript bundler for production builds
- **TSX**: TypeScript execution for development server

### Form and Validation
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation library with TypeScript integration
- **Drizzle Zod**: Database schema to Zod validation conversion

### Date and Time
- **Date-fns**: Modern date utility library for formatting and manipulation

### Build and Deployment
- **Replit Integration**: Vite plugins for Replit development environment
- **Runtime Error Handling**: Development error overlay and debugging tools

### Fonts and Assets
- **Google Fonts**: Inter and Source Sans Pro font families for professional typography
- **Custom CSS Variables**: Medical theme colors and design system tokens