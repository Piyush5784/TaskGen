# 🗂️ TaskGen

**TaskGen** is a modern web-based task and project management platform designed for individuals and teams. It allows users to track progress, define goals, manage todos, and collaborate effectively — inspired by platforms like Trello and Jira.

---

## 🚀 Vision

To empower teams and individuals with a transparent, efficient, and collaborative way to manage projects from inception to execution.

---

## ✨ Features

### ✅ Core Features (MVP)
- 🔐 Email/Password Authentication via NextAuth
- 🧠 Role-based Access Control (Admin, Member, Viewer, Guest)
- 🗃️ Multi-Organization & Multi-Project Support
- 🎯 Goals, Todos, Issues, and Pending Tasks per Project
- 🌐 Public/Private Project Visibility
- 📥 Real-time Project-Based Notifications *(upcoming)*
- 🧩 Dashboard with Filtering, Grouping & Project Switching
- 👥 Invite and Manage Team Members

---

## 📊 Dashboard Overview

The TaskGen dashboard offers:
- Clean project overviews with milestones and task breakdown
- Visual filters (status, priority, due dates)
- Organization management & user role assignment
- Context-aware UI with reminders and flash indicators
- Command menu for faster task navigation *(via CMDK)*

---

## 🔧 Tech Stack

### ⚙️ Core Stack
- **Frontend**: Next.js 14, Tailwind CSS
- **State Management**: Redux Toolkit
- **Auth**: NextAuth.js with Prisma Adapter
- **ORM**: Prisma
- **Database**: MongoDB

### 📦 Notable Libraries & Tools
- 🧱 UI: Radix UI, Shadcn, Lucide, CMDK
- 🧑‍🎨 Animations: Framer Motion
- 🧩 Drag & Drop: DnD Kit
- 🧹 Styling: Tailwind CSS, clsx, class-variance-authority
- 📊 Charts: Recharts
- 📅 Date Utils: date-fns
- 🧾 Forms: React Hook Form, Zod, @hookform/resolvers
- 🌙 Theme Support: next-themes

---

## 🧑‍🤝‍🧑 Role-Based Access (Upcoming)

| Role   | Access Level                          |
|--------|----------------------------------------|
| Admin  | Full access to org and all projects    |
| Member | Can manage tasks and projects          |
| Viewer | Read-only access to org/project data   |
| Guest  | Temporary/project-specific access only |

---

## 🔔 Notifications (Planned)

Users will receive alerts for:
- 🚀 New project creation
- ✏️ Task updates
- 🧑‍💼 New member added to org/project
- ⏰ Task deadline approaching

---

## 🛠️ Getting Started

Clone the repo and run the app locally:

```bash
# Clone the repository
git clone https://github.com/your-username/taskgen.git
cd taskgen

# Install dependencies
pnpm install

# Start the development server
pnpm dev
