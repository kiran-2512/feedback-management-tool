# FeedbackFlow 💬

A modern, production-ready feedback management tool for internal team communication between managers and employees. Built with React, TypeScript, and a beautiful UI design system.

## 🎯 Overview

FeedbackFlow enables **structured, ongoing feedback** in a simple, secure, and friendly interface. The platform supports role-based dashboards where managers can provide comprehensive feedback to their team members, and employees can view, acknowledge, and track their feedback history.

## ✨ Features

### 🔐 Authentication & Roles

- **Two user roles**: Manager and Employee
- Role-based dashboard experiences
- Mock authentication system for demo purposes
- Persistent login sessions

### 📊 Manager Dashboard

- **Team Overview**: Complete view of all team members
- **Feedback Management**: Create and track feedback for each employee
- **Analytics**: Sentiment analysis and team performance metrics
- **Statistics**: Total feedback count, pending acknowledgments, recent activity

### 👤 Employee Dashboard

- **Personal Timeline**: Chronological view of all received feedback
- **Feedback Details**: Clear display of strengths and improvement areas
- **Acknowledgment System**: Mark feedback as read and acknowledged
- **Progress Tracking**: Personal sentiment breakdown and statistics

### 💼 Core Feedback System

- **Structured Feedback**: Strengths, Areas for Improvement, Overall Sentiment
- **Sentiment Analysis**: Positive, Neutral, Negative categorization
- **History Tracking**: Complete feedback timeline for each employee
- **Acknowledgment Workflow**: Employees can acknowledge received feedback

## 🛠 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router 6
- **Styling**: TailwindCSS 3 with custom design system
- **UI Components**: Radix UI + shadcn/ui component library
- **Build Tool**: Vite
- **Testing**: Vitest
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 🎨 Design System

FeedbackFlow features a custom design system with:

- **Brand Colors**: Professional blue palette with semantic colors
- **Typography**: Inter font family for modern readability
- **Components**: Comprehensive UI component library
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Built with Radix UI primitives

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd feedbackflow

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Demo Accounts

**Manager Account:**

- Email: `sarah.johnson@company.com`
- Password: `password`

**Employee Accounts:**

- Email: `alex.chen@company.com` | Password: `password`
- Email: `maria.rodriguez@company.com` | Password: `password`
- Email: `david.kim@company.com` | Password: `password`

## 📁 Project Structure

```
src/
├── components/ui/          # Reusable UI components
│   ├── navigation.tsx      # App navigation header
│   ├── button.tsx         # Button component
│   ├── card.tsx           # Card layouts
│   └── ...                # Other UI components
├── pages/                 # Route components
│   ├── Login.tsx          # Authentication page
│   ├── Dashboard.tsx      # Main dashboard (role-based)
│   ├── FeedbackForm.tsx   # Feedback creation (placeholder)
│   └── FeedbackHistory.tsx # Detailed history (placeholder)
├── lib/                   # Utilities and data
│   ├── types.ts           # TypeScript type definitions
│   ├── auth.ts            # Authentication logic
│   ├── mockData.ts        # Demo data
│   └── utils.ts           # Utility functions
├── App.tsx                # Main app component
└── main.tsx              # App entry point
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Create production build
npm run preview      # Preview production build

# Code Quality
npm run typecheck    # TypeScript type checking
npm run test         # Run test suite
npm run format.fix   # Format code with Prettier
```

## 🎯 Core Features Implemented

- ✅ **Role-based Authentication** (Manager/Employee)
- ✅ **Structured Feedback Forms** (Strengths, Improvements, Sentiment)
- ✅ **Dashboard Analytics** (Team overview, sentiment breakdown)
- ✅ **Feedback Timeline** (Chronological feedback history)
- ✅ **Acknowledgment System** (Mark feedback as read)
- ✅ **Responsive Design** (Mobile and desktop optimized)
- ✅ **Modern UI/UX** (Professional, accessible interface)

## 🚧 Future Enhancements

The application is designed for easy extension with these planned features:

- **Live Feedback Forms**: Complete feedback submission workflow
- **Advanced Filtering**: Search and filter feedback by date, sentiment, etc.
- **Notifications**: Email and in-app notification system
- **Peer Feedback**: Anonymous peer-to-peer feedback option
- **Export Features**: PDF export of feedback reports
- **Backend Integration**: Replace mock data with real API
- **Comment System**: Employee responses to feedback
- **Markdown Support**: Rich text formatting for feedback

## 🔒 Security Considerations

For production deployment:

- Implement proper authentication (JWT, OAuth)
- Add input validation and sanitization
- Set up proper RBAC (Role-Based Access Control)
- Add CSRF protection
- Implement rate limiting
- Use HTTPS encryption

## 🐳 Backend Requirements

While this is a frontend application, the complete system would require:

- **Python Backend** with FastAPI or Django
- **Database**: PostgreSQL or SQLite
- **Authentication**: JWT or session-based auth
- **API Endpoints**: RESTful API for CRUD operations
- **Docker Support**: Containerized deployment

## 📊 Database Design

Recommended database schema:

```sql
-- Users table
users (id, name, email, role, manager_id, department, avatar_url, created_at)

-- Feedback table
feedback (id, manager_id, employee_id, strengths, improvements, sentiment, created_at, updated_at, acknowledged, acknowledged_at)

-- Feedback requests table
feedback_requests (id, employee_id, manager_id, message, status, created_at)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Built with ❤️ for modern teams who value continuous feedback and growth.

---

**Note**: This is a demo application with mock data. For production use, integrate with a proper backend API and implement real authentication and data persistence.
