# PlaceMate AI - Complete Project Guide

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Features & Functionality](#features--functionality)
5. [Database Schema](#database-schema)
6. [User Flow](#user-flow)
7. [Implementation Details](#implementation-details)
8. [Security & Authentication](#security--authentication)
9. [AI Integration](#ai-integration)
10. [Performance Optimization](#performance-optimization)
11. [Deployment Guide](#deployment-guide)
12. [Future Enhancements](#future-enhancements)

---

## Project Overview

### Project Name
**PlaceMate AI** - AI-Powered Interview Preparation Platform

### Project Description
PlaceMate AI is a comprehensive web-based platform designed to help job seekers prepare for interviews through AI-powered mock interviews, personalized feedback, and skill assessment. The platform analyzes user CVs to generate tailored interview questions and provides detailed performance feedback.

### Problem Statement
Traditional interview preparation methods lack:
- Personalized feedback based on individual skills
- Real-time practice opportunities
- Objective performance assessment
- Convenient access to mock interviews
- Skill-specific question generation

### Solution
PlaceMate AI addresses these challenges by providing:
- AI-powered personalized interview questions based on CV analysis
- Real-time voice-based interview practice
- Comprehensive performance feedback with scoring
- Progress tracking and achievement system
- Accessible 24/7 from anywhere

### Target Audience
- College students preparing for campus placements
- Job seekers looking to improve interview skills
- Career changers needing practice in new domains
- Professionals preparing for promotions or new roles

### Project Objectives
1. Provide personalized interview preparation experience
2. Reduce interview anxiety through practice
3. Improve candidate success rates in actual interviews
4. Track and measure improvement over time
5. Make quality interview preparation accessible to everyone

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  (Next.js 15 with React 19 - Server & Client Components)   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Middleware Layer                          │
│         (Authentication, Route Protection, Edge)             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                         │
│              (Server Actions, API Routes)                    │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                ↓                       ↓
┌──────────────────────────┐  ┌──────────────────────────┐
│   Firebase Services      │  │   AI Services            │
│   - Authentication       │  │   - Google Gemini AI     │
│   - Firestore Database   │  │   - VAPI Voice AI        │
│   - Storage              │  │   - CV Analysis          │
└──────────────────────────┘  └──────────────────────────┘
```

### Component Architecture

```
app/
├── (auth)/              # Authentication pages
│   ├── sign-in/
│   └── sign-up/
├── (root)/              # Protected application pages
│   ├── interview/       # Interview features
│   ├── profile/         # User profile management
│   └── system-status/   # Profile dashboard
├── (marketing)/         # Public pages
│   └── landing/
└── api/                 # API routes
    ├── test-gemini/
    ├── test-google-ai/
    └── vapi/

components/              # Reusable components
├── ui/                  # Base UI components
├── Agent.tsx            # Interview agent component
├── AuthForm.tsx         # Authentication forms
├── CVUploadForm.tsx     # CV upload functionality
└── InterviewCard.tsx    # Interview display card

lib/                     # Utility libraries
├── actions/             # Server actions
│   ├── auth.action.ts
│   └── general.action.ts
├── firebase/            # Firebase configuration
└── utils.ts             # Helper functions
```

---

## Technology Stack

### Frontend Technologies

#### Core Framework
- **Next.js 15.2.2**
  - App Router for modern routing
  - Server Components for performance
  - Server Actions for data mutations
  - Built-in optimization features

#### UI Framework
- **React 19.0.0**
  - Latest features and improvements
  - Enhanced concurrent rendering
  - Improved server components

#### Styling
- **Tailwind CSS 4.1.11**
  - Utility-first CSS framework
  - Custom design system
  - Responsive design utilities
  - Custom color palette

#### UI Components
- **Radix UI**
  - Accessible component primitives
  - Unstyled, customizable components
  - Label and Slot components

#### Form Management
- **React Hook Form 7.54.2**
  - Performant form validation
  - Easy integration with Zod
  - Minimal re-renders

#### Validation
- **Zod 3.24.2**
  - TypeScript-first schema validation
  - Type inference
  - Runtime validation

### Backend Technologies

#### Database & Authentication
- **Firebase 11.10.0**
  - Firestore for NoSQL database
  - Firebase Authentication
  - Firebase Storage for file uploads
  - Real-time data synchronization

#### Server-Side
- **Firebase Admin 13.4.0**
  - Server-side Firebase operations
  - Secure admin operations
  - Token verification

### AI & Machine Learning

#### AI Services
- **Google Gemini AI**
  - CV analysis and parsing
  - Question generation
  - Feedback generation
  - Natural language processing

#### Voice AI
- **VAPI AI 2.2.4**
  - Real-time voice interviews
  - Speech-to-text conversion
  - Natural conversation flow
  - Voice interaction handling

### Development Tools

#### Language
- **TypeScript 5**
  - Type safety
  - Better IDE support
  - Reduced runtime errors

#### Linting
- **ESLint 9**
  - Code quality enforcement
  - Next.js specific rules
  - Custom configuration

#### Package Manager
- **npm**
  - Dependency management
  - Script execution

### Additional Libraries

#### Utilities
- **clsx & tailwind-merge**
  - Conditional class names
  - Tailwind class merging

- **dayjs 1.11.13**
  - Date formatting and manipulation
  - Lightweight alternative to moment.js

- **lucide-react 0.482.0**
  - Icon library
  - React components for icons

#### UI Enhancements
- **sonner 2.0.1**
  - Toast notifications
  - User feedback

- **next-themes 0.4.6**
  - Theme management
  - Dark mode support

---

## Features & Functionality

### 1. User Authentication

#### Sign Up
- Email and password registration
- User profile creation
- Educational details collection
- Secure password handling
- Email verification

#### Sign In
- Email/password authentication
- Session management
- Persistent login
- Secure token handling

#### Profile Management
- View and edit profile information
- Update educational details
- Manage contact information
- Profile completion tracking

### 2. CV Management

#### CV Upload
- PDF file upload support
- Secure file storage in Firebase
- CV parsing and analysis
- Skill extraction
- Experience analysis
- Education parsing

#### CV Analysis
- Automatic skill identification
- Experience level detection
- Education background extraction
- Project identification
- Keyword extraction

### 3. Interview Types

#### Quick Practice Interview
- Instant start without setup
- General interview questions
- Quick feedback generation
- No CV required
- Ideal for rapid practice

#### Personalized Interview
- CV-based question generation
- Role-specific questions
- Skill-level appropriate difficulty
- Customizable interview parameters
- Detailed performance analysis

### 4. Interview Process

#### Interview Configuration
- Select job role
- Choose difficulty level
- Set interview type
- Specify tech stack
- Define question count

#### Voice Interview
- Real-time voice interaction
- AI interviewer responses
- Natural conversation flow
- Speech recognition
- Transcript generation

#### Interview Recording
- Automatic transcript capture
- Response time tracking
- Conversation history
- Performance metrics collection

### 5. Feedback System

#### Performance Scoring
- Overall score (0-100)
- Category-wise breakdown
- Communication score
- Technical score
- Confidence assessment

#### Detailed Analysis
- Strengths identification
- Areas for improvement
- Specific recommendations
- Performance trends
- Comparative analysis

#### Feedback Categories
- Technical Knowledge
- Communication Skills
- Problem-Solving Ability
- Confidence Level
- Response Quality

### 6. Progress Tracking

#### Statistics Dashboard
- Total interviews completed
- Average performance score
- Skills tracked
- Profile completion percentage
- Recent activity

#### Achievement System
- First Steps (1 interview)
- Getting Better (5 interviews)
- Interview Pro (10 interviews)
- Visual progress indicators
- Unlockable milestones

#### Performance History
- Interview history
- Score trends over time
- Improvement tracking
- Skill-wise performance

### 7. User Dashboard

#### Home Dashboard
- Welcome message
- Quick stats overview
- Recent interviews
- Available practice interviews
- Quick action buttons

#### Profile Dashboard
- Complete user information
- Education details
- Skills overview
- CV status
- Achievement badges
- Progress visualization

---

## Database Schema

### Users Collection

```typescript
interface User {
  id: string;                    // Unique user identifier
  name: string;                  // Full name
  email: string;                 // Email address
  contactNumber?: string;        // Phone number
  collegeName?: string;          // College/University name
  degree?: string;               // Degree program
  branch?: string;               // Branch/Major
  yearOfStudy?: string;          // Current year
  profileURL?: string;           // Profile image URL
  cvURL?: string;                // CV file URL
  skills?: string[];             // Extracted skills
  education?: string;            // Education details
  experience?: string;           // Work experience
  projects?: string;             // Project details
  createdAt?: string;            // Account creation date
  updatedAt?: string;            // Last update date
}
```

### Interviews Collection

```typescript
interface Interview {
  id: string;                    // Unique interview ID
  userId?: string;               // User who created
  role?: string;                 // Job role
  level?: string;                // Difficulty level
  type?: string;                 // Interview type
  techstack?: string[];          // Technologies
  questions: string[] | PersonalizedQuestion[];
  createdAt?: string;            // Creation timestamp
  finalized?: boolean;           // Completion status
}
```

### Feedback Collection

```typescript
interface Feedback {
  id: string;                    // Unique feedback ID
  interviewId: string;           // Associated interview
  userId: string;                // User who received
  totalScore: number;            // Overall score (0-100)
  categoryScores: Array<{
    name: string;                // Category name
    score: number;               // Category score
    comment: string;             // Detailed comment
  }>;
  strengths: string[];           // Identified strengths
  areasForImprovement: string[]; // Improvement areas
  finalAssessment: string;       // Overall assessment
  createdAt: string;             // Feedback timestamp
}
```

### Personalized Questions

```typescript
interface PersonalizedQuestion {
  id: string;                    // Question ID
  question: string;              // Question text
  type: "technical" | "behavioral" | "project" | "hr";
  category: string;              // Question category
  difficulty: "easy" | "medium" | "hard";
  timeLimit: number;             // Time in seconds
  basedOn: string;               // CV section reference
}
```

---

## User Flow

### New User Journey

```
1. Landing Page
   ↓
2. Sign Up
   ↓
3. Profile Setup
   ↓
4. CV Upload (Optional)
   ↓
5. Dashboard
   ↓
6. Choose Interview Type
   ↓
7. Configure Interview
   ↓
8. Take Interview
   ↓
9. Receive Feedback
   ↓
10. View Progress
```

### Returning User Journey

```
1. Sign In
   ↓
2. Dashboard
   ↓
3. View Statistics
   ↓
4. Start New Interview / Review Past Interviews
   ↓
5. Take Interview
   ↓
6. Receive Feedback
   ↓
7. Track Improvement
```

### Interview Flow

```
1. Select Interview Type
   ├── Quick Practice
   │   ↓
   │   Start Immediately
   │
   └── Personalized
       ↓
       Configure Parameters
       ↓
       Generate Questions
   
2. Voice Interview
   ↓
   AI asks questions
   ↓
   User responds
   ↓
   Transcript captured
   
3. Feedback Generation
   ↓
   AI analyzes responses
   ↓
   Generate scores
   ↓
   Identify strengths/weaknesses
   
4. Results Display
   ↓
   View detailed feedback
   ↓
   Review performance
   ↓
   Get recommendations
```

---

## Implementation Details

### Authentication Implementation

#### Middleware Protection
```typescript
// middleware.ts
- Checks session cookies
- Protects routes automatically
- Redirects unauthorized users
- Handles public/private routes
- Edge runtime for performance
```

#### Server Actions
```typescript
// lib/actions/auth.action.ts
- getCurrentUser(): Fetch current user
- signIn(): Handle login
- signUp(): Handle registration
- signOut(): Handle logout
- Session management
```

### CV Upload & Analysis

#### Upload Process
1. User selects PDF file
2. File validated (size, type)
3. Uploaded to Firebase Storage
4. URL stored in user profile
5. CV parsed for analysis

#### Analysis Process
1. Extract text from PDF
2. Identify skills using AI
3. Parse education details
4. Extract experience
5. Identify projects
6. Store structured data

### Interview Generation

#### Quick Practice
```typescript
- Uses predefined question templates
- General interview questions
- No CV analysis required
- Instant generation
- Suitable for all users
```

#### Personalized Interview
```typescript
- Analyzes user CV
- Extracts relevant skills
- Generates role-specific questions
- Adjusts difficulty level
- Creates custom question set
- Based on experience level
```

### Voice Interview System

#### VAPI Integration
```typescript
// components/Agent.tsx
- Initialize VAPI client
- Configure AI assistant
- Handle voice events
- Capture transcripts
- Manage call state
- Process responses
```

#### Event Handling
- call-start: Interview begins
- call-end: Interview completes
- message: Transcript updates
- speech-start: User speaking
- speech-end: User finished
- error: Handle errors

### Feedback Generation

#### Analysis Process
1. Collect interview transcript
2. Analyze response quality
3. Evaluate communication
4. Assess technical knowledge
5. Calculate scores
6. Generate recommendations

#### Scoring Algorithm
```typescript
- Overall Score: Weighted average
- Technical: 40% weight
- Communication: 30% weight
- Confidence: 20% weight
- Response Quality: 10% weight
```

---

## Security & Authentication

### Authentication Security

#### Password Security
- Passwords hashed using Firebase Auth
- Secure password requirements
- No plain text storage
- Encrypted transmission

#### Session Management
- HTTP-only cookies
- Secure session tokens
- Automatic expiration
- Token refresh mechanism

#### Route Protection
- Middleware-based protection
- Server-side validation
- Client-side guards
- Automatic redirects

### Data Security

#### Firebase Security Rules
```javascript
// Firestore Rules
- Users can only read/write own data
- Admin operations restricted
- Validated data structure
- Rate limiting applied
```

#### File Upload Security
- File type validation
- Size restrictions
- Secure URLs
- Access control
- Virus scanning (recommended)

### API Security

#### Server Actions
- Server-side only execution
- Input validation
- Error handling
- Rate limiting
- CSRF protection

#### Environment Variables
- Sensitive data in .env.local
- Not committed to repository
- Server-side only access
- Encrypted in production

---

## AI Integration

### Google Gemini AI

#### Use Cases
1. **CV Analysis**
   - Extract skills from CV text
   - Identify experience level
   - Parse education details
   - Extract project information

2. **Question Generation**
   - Create role-specific questions
   - Adjust difficulty level
   - Generate follow-up questions
   - Ensure relevance to CV

3. **Feedback Generation**
   - Analyze interview responses
   - Generate performance scores
   - Identify strengths/weaknesses
   - Create improvement suggestions

#### Implementation
```typescript
// Using Google Generative AI SDK
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Generate content
const result = await model.generateContent(prompt);
```

### VAPI Voice AI

#### Features
- Real-time voice interaction
- Natural conversation flow
- Speech-to-text conversion
- Text-to-speech synthesis
- Conversation management

#### Configuration
```typescript
// Simple interviewer configuration
{
  model: "gpt-3.5-turbo",
  voice: "professional",
  firstMessage: "Hello, let's begin the interview",
  systemPrompt: "You are a professional interviewer..."
}
```

---

## Performance Optimization

### Implemented Optimizations

#### 1. Middleware-Based Auth
- Edge runtime execution
- Faster route protection
- Reduced server load
- Better user experience

#### 2. Loading States
- Skeleton screens
- Loading indicators
- Smooth transitions
- Better perceived performance

#### 3. Image Optimization
- Next.js Image component
- Automatic optimization
- Lazy loading
- Responsive images

#### 4. Code Splitting
- Automatic by Next.js
- Route-based splitting
- Component lazy loading
- Reduced initial bundle

#### 5. Server Components
- Reduced client JavaScript
- Faster initial load
- Better SEO
- Improved performance

### Performance Metrics

#### Build Output
```
Route                          Size    First Load JS
/ (home)                      184 B   109 kB
/interview                    199 B   202 kB
/interview/personalized       3.84 kB 135 kB
/profile/cv-upload           3.73 kB 135 kB
/system-status               189 B   109 kB
```

#### Optimization Results
- Fast page loads
- Minimal JavaScript
- Efficient routing
- Good Core Web Vitals

---

## Deployment Guide

### Prerequisites
1. Node.js 20+ installed
2. Firebase project created
3. Google AI API key
4. VAPI account (optional)

### Environment Setup

#### Required Environment Variables
```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY=your_private_key

# AI Services
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_token

# Application
NEXT_PUBLIC_BASE_URL=your_deployment_url
```

### Build & Deploy

#### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Access at http://localhost:3000
```

#### Production Build
```bash
# Create production build
npm run build

# Start production server
npm start
```

#### Deployment Platforms

**Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Other Platforms**
- Netlify
- AWS Amplify
- Google Cloud Run
- Docker containers

### Post-Deployment

#### Verification Checklist
- [ ] All pages load correctly
- [ ] Authentication works
- [ ] CV upload functional
- [ ] Interviews can be created
- [ ] Feedback generates properly
- [ ] All environment variables set
- [ ] Firebase rules configured
- [ ] SSL certificate active

---

## Future Enhancements

### Planned Features

#### 1. Advanced Analytics
- Detailed performance graphs
- Skill-wise improvement tracking
- Comparison with peers
- Industry benchmarks
- Predictive success rates

#### 2. Interview Types
- Group interview simulation
- Panel interview practice
- Case study interviews
- Coding interviews
- Behavioral assessments

#### 3. AI Improvements
- More accurate feedback
- Better question generation
- Personality assessment
- Body language analysis (video)
- Emotion detection

#### 4. Social Features
- Share achievements
- Compete with friends
- Leaderboards
- Study groups
- Mentor connections

#### 5. Content Library
- Interview tips database
- Company-specific prep
- Industry insights
- Success stories
- Video tutorials

#### 6. Mobile Application
- Native iOS app
- Native Android app
- Offline practice mode
- Push notifications
- Mobile-optimized UI

#### 7. Premium Features
- Unlimited interviews
- Priority AI processing
- Expert review option
- Custom question banks
- Advanced analytics
- Certificate generation

#### 8. Integration Features
- LinkedIn integration
- Job board connections
- Calendar scheduling
- Email reminders
- Slack notifications

---

## Project Statistics

### Codebase Metrics
- **Total Files**: 50+
- **Lines of Code**: 5000+
- **Components**: 20+
- **Pages**: 15+
- **API Routes**: 5+

### Technology Count
- **Frontend Libraries**: 15+
- **Backend Services**: 3
- **AI Services**: 2
- **Database**: 1 (Firebase)

### Feature Count
- **Major Features**: 7
- **User Flows**: 3
- **Interview Types**: 2
- **Feedback Categories**: 5

---

## Conclusion

PlaceMate AI is a comprehensive, production-ready interview preparation platform that leverages modern web technologies and AI to provide personalized interview practice. The platform successfully addresses the challenges of traditional interview preparation by offering:

1. **Personalization**: CV-based question generation
2. **Accessibility**: 24/7 availability from anywhere
3. **Feedback**: Detailed performance analysis
4. **Progress**: Achievement tracking system
5. **Scalability**: Modern architecture for growth

The project demonstrates proficiency in:
- Full-stack web development
- AI integration
- Database design
- User experience design
- Security implementation
- Performance optimization

This platform has the potential to significantly improve interview success rates for job seekers while providing a scalable, maintainable codebase for future enhancements.

---

## Contact & Support

For questions, issues, or contributions:
- Project Repository: [GitHub Link]
- Documentation: This guide
- Support: [Contact Information]

---

**Document Version**: 1.0
**Last Updated**: November 2025
**Project Status**: Production Ready
