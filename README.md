# AI-Powered Support Ticket Triage & Classification Engine

An enterprise-grade, full-stack MLOps application designed to automatically classify incoming customer support tickets by urgency level using a fine-tuned open-source transformer model.

## 🚀 Key Features

* **Real-Time AI Inference:** Powered by a fine-tuned DistilBERT model hosted and loaded directly from the Hugging Face Hub.
* **Persistent Database Logging:** Automatically records all processed tickets, predictions, confidence scores, and timestamps into a lightweight SQLite database using SQLAlchemy.
* **Interactive Next.js Dashboard:** Features live model performance metrics, a visual ticket distribution chart (via Recharts), a real-time ticket history log, and an interactive prediction playground.
* **High-Performance Backend:** Built with FastAPI, featuring CORS middleware and clean API routing for seamless communication with the frontend.
* **Modern UI/UX:** Styled with Tailwind CSS, Framer Motion animations, and a dark-mode optimized glassmorphism interface.

---

## 🛠️ Tech Stack

### **Frontend**
* **Framework:** Next.js (React)
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Data Visualization:** Recharts

### **Backend & MLOps**
* **API Framework:** FastAPI (Python)
* **Database & ORM:** SQLite & SQLAlchemy
* **Machine Learning:** PyTorch, Hugging Face `transformers`, DistilBERT

---

## 📁 Project Structure

```text
TicketClassifierProject/
│
├── frontend/                 # Next.js frontend application
│   ├── app/                  # App router pages & layouts
│   └── components/           # UI components (Dashboard, Predictor, History)
│
└── ticket-classifier-api/    # FastAPI backend server
    ├── venv/                 # Python virtual environment
    ├── main.py               # API endpoints, DB models, & Hugging Face pipeline
    └── tickets.db            # Local SQLite persistence file
