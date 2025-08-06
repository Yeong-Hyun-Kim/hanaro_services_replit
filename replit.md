# 함께가게 (Together Store) - AI Business Consultation Platform

## Overview

함께가게 is a Korean AI-powered business consultation platform designed specifically for small business owners. The application provides AI-driven business analysis, improvement suggestions, and policy recommendations to help small businesses grow and succeed. The platform features a mobile-optimized interface that allows business owners to describe their business and receive personalized AI-generated recommendations for improvement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single Page Application**: Built with vanilla HTML, CSS, and JavaScript for simplicity and fast loading
- **Mobile-First Design**: Responsive design optimized for mobile devices with a maximum container width of 420px
- **Korean Localization**: Complete Korean language support with Noto Sans KR font family
- **Component-Based CSS**: Uses CSS custom properties (variables) for consistent theming and easy maintenance
- **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with dynamic features

### Backend Architecture
- **Node.js Express Server**: Lightweight REST API server handling business logic and AI integration
- **Stateless Design**: No persistent sessions or user authentication, focusing on immediate value delivery
- **API-First Approach**: Clean separation between frontend and backend through RESTful endpoints
- **Error Handling**: Comprehensive error handling for API requests and AI service failures

### AI Integration Pattern
- **Google Gemini Integration**: Uses Google's Generative AI (Gemini 2.5 Flash model) for business consultation
- **Prompt Engineering**: Structured prompts designed to generate practical, actionable business improvement ideas
- **Response Processing**: Server-side parsing and formatting of AI responses into structured data
- **Fallback Mechanisms**: Error handling for API failures and malformed responses

### Data Flow Architecture
- **Request-Response Pattern**: Simple HTTP request/response cycle without persistent storage
- **JSON Communication**: All API communication uses JSON format for data exchange
- **Client-Side Rendering**: Dynamic content updates handled through DOM manipulation
- **Real-time Processing**: Immediate AI response generation without queuing or background processing

## External Dependencies

### AI Services
- **Google Generative AI (@google/generative-ai)**: Primary AI service for generating business improvement recommendations
- **Google GenAI (@google/genai)**: Additional Google AI capabilities and authentication

### Web Framework
- **Express.js**: Lightweight web server framework for handling HTTP requests and serving static content

### Frontend Libraries
- **Google Fonts**: Noto Sans KR font family for Korean typography
- **Font Awesome**: Icon library for UI enhancement

### Environment Dependencies
- **Node.js Runtime**: Requires Node.js 18.0.0+ for Google AI SDK compatibility
- **Environment Variables**: GEMINI_API_KEY for AI service authentication
- **Port Configuration**: Configurable port (default 5000) for deployment flexibility

### Development Tools
- **NPM Package Management**: Standard Node.js package management for dependencies
- **Static File Serving**: Express static middleware for serving frontend assets