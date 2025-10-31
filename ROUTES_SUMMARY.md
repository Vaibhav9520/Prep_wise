# PrepWise - Routes Summary

## Application Routes

### Authentication Routes (Group: auth)
- **`/sign-in`** - Sign in page
- **`/sign-up`** - Sign up page

### Main Application Routes (Group: root)
- **`/`** - Dashboard/Home page
  - Shows user's past interviews
  - Shows available interviews to take
  - CTA to start new interview

- **`/interview`** - Interview generation page
  - AI-powered interview question generation
  - User can configure interview parameters

- **`/interview/[id]`** - Specific interview page
  - Displays interview details
  - Shows tech stack and role
  - Allows user to take the interview

- **`/interview/[id]/feedback`** - Interview feedback page
  - Shows detailed feedback after interview completion
  - Displays scores, strengths, and areas for improvement
  - Options to retake interview or return to dashboard

### API Routes
- **`/api/vapi/generate`** - API endpoint for VAPI integration
  - Handles interview generation and processing

## Route Structure
```
app/
├── (auth)/                 # Authentication group
│   ├── sign-in/
│   │   └── page.tsx
│   ├── sign-up/
│   │   └── page.tsx
│   └── layout.tsx
├── (root)/                 # Main application group
│   ├── interview/
│   │   ├── [id]/
│   │   │   ├── feedback/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx           # Dashboard
├── api/
│   └── vapi/
│       └── generate/
│           └── route.ts
├── globals.css
├── layout.tsx             # Root layout
└── favicon.ico
```

## Route Groups
- **(auth)** - Contains authentication-related pages with their own layout
- **(root)** - Contains main application pages with their own layout
- **api** - Contains API endpoints

All routes are properly configured and building successfully.