# 🗂️ TaskGen

**TaskGen** is a web platform that helps individuals and teams track and share their project progress in real-time. It enables users to create projects, define milestones, get notified of updates, and manage tasks through a clean dashboard — similar to Trello or Jira.

---

## 🚀 Vision

To provide a simple, collaborative, and transparent platform for tracking the lifecycle of any project, from idea to execution.

---

## ✨ Features

### ✅ MVP Features
- User Authentication (Email & Password)
- Create and manage Projects
- Add Goals, Todos, Issues, and Pending tasks
- Multi-organization support
- Toggle project visibility (Public/Private)
- Project-based real-time notifications
- Dashboard with filters and task grouping
- Role-based access for team members

---

## 📊 Dashboard

TaskGen provides a simple yet effective dashboard that allows users to:
- Create projects with detailed descriptions
- Organize project milestones, goals, and todos
- Add team members to organizations and assign project roles
- Filter tasks by status, priority, or due dates
- Track activity and set reminders

---

## 🔧 Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **State Management**: Redux Toolkit
- **Backend**: Node.js / Express *(planned)*
- **Auth**: Email/Password Login
- **Database**: PostgreSQL / MongoDB *(planned)*
- **Notifications**: Email & In-App *(planned)*

---

## 🔐 Role-Based Access (Upcoming)

- **Admin**: Full access to the org and all its projects
- **Member**: Manage projects and tasks within the org
- **Viewer**: Read-only access to view progress
- **Guest**: Temporary/project-based access

---

## 🔔 Notifications (Upcoming)

- Notifications when:
  - A new project is started
  - A task is updated
  - A user is added to a project/org
  - A task is nearing its due date

---

## 📝 Pending Tasks

- [ ] Add Role-Based Access System
- [ ] Implement Notification APIs
- [ ] Auto-complete search functionality
- [ ] Email & Password login (WIP)
- [ ] Flash issue when switching between projects/tasks
- [ ] Project creation form doesn't auto-close
- [ ] UI/UX enhancements
- [ ] Set active project/organization selector
- [ ] Reminder system for pending tasks
- [ ] Organization and team access control

---

## 🛠️ Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/taskgen.git
cd taskgen

# Install dependencies
npm install

# Run the dev server
npm run dev
