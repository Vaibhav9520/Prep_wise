# 🎯 PlaceMate AI

**AI-Powered Interview Preparation Platform**

PlaceMate AI helps students and job seekers ace their interviews with personalized AI-powered mock interviews, instant feedback, and comprehensive performance analytics.

---

## ✨ Features

- 🤖 **AI-Powered Questions** - Personalized interview questions based on your CV
- 📊 **Instant Feedback** - Detailed analysis with scores and improvement suggestions
- 📈 **Progress Tracking** - Monitor your improvement over time
- ⚡ **Real-Time Practice** - Timed questions simulating real interviews
- 🎯 **Multiple Interview Types** - Technical, Behavioral, and HR interviews
- 📄 **CV Analysis** - Automatic skill extraction and analysis
- 🏆 **Proven Results** - Join thousands of successful candidates

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Firebase account
- Google AI API key (optional)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd placemate-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 🎨 Tech Stack

- **Framework**: Next.js 15.2.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **AI**: Google Gemini AI
- **Voice**: VAPI (optional)

---

## 📁 Project Structure

```
placemate-ai/
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (root)/          # Main application
│   ├── (marketing)/     # Landing pages
│   └── api/             # API routes
├── components/          # React components
├── lib/
│   └── actions/         # Server actions
├── firebase/            # Firebase config
├── types/               # TypeScript types
└── public/              # Static assets
```

---

## 🔐 Environment Variables

Create a `.env.local` file with:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# Google AI (Optional)
GOOGLE_GENERATIVE_AI_API_KEY=

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 📖 Documentation

- [User Guide](USER_GUIDE.md) - Complete guide for students
- [Admin Guide](ADMIN_GUIDE.md) - Setup and maintenance guide
- [Routes Summary](ROUTES_SUMMARY.md) - Application routes overview

---

## 🎯 Key Features

### For Students
- Create account with academic profile
- Upload CV for personalized questions
- Practice with AI-powered interviews
- Receive detailed feedback
- Track progress over time
- Download feedback reports

### For Administrators
- Robust fallback system
- Comprehensive error handling
- System health monitoring
- User analytics
- Easy deployment

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Other Platforms
- Compatible with any Node.js hosting
- Supports serverless deployment
- Static optimization enabled

---

## 🎨 Design System

### Color Theme
- **Primary**: Fresh Green #1A936F
- **Secondary**: Ocean Blue #2D7DD2
- **Accent**: Warm Peach #F4A896
- **Background**: Light Mint #E8FFF7
- **Text**: Midnight #0E1A1A

### Typography
- **Headings**: Bold, clean sans-serif
- **Body**: Modern sans-serif, easy to read
- **Tone**: Empowering, supportive, confidence-building

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Built with Next.js and React
- Powered by Google Gemini AI
- Styled with Tailwind CSS
- Hosted on Vercel

---

## 📞 Support

For questions or support:
- Check the [User Guide](USER_GUIDE.md)
- Review the [Admin Guide](ADMIN_GUIDE.md)
- Visit `/system-status` for health checks

---

**PlaceMate AI** - Helping students land their dream jobs! 🚀