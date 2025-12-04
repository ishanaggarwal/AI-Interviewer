# Edith - AI Interview Coach 🤖

> An intelligent AI-powered interview agent with real-time voice interaction, animated avatar, and OpenAI GPT-4 integration

![Status](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green)

---

## 🎯 What is Edith?

**Edith** is a personal AI interview coach that helps you practice technical interviews through natural voice conversations. With a cosmic-themed animated avatar and intelligent feedback, she conducts four types of interviews: Technical, Behavioral, Coding, and System Design.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              EDITH - AI INTERVIEWER                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │   Browser   │───▶│   Web UI    │───▶│    State    │◀──▶│   Config    │  │
│  │   (User)    │    │  (index.html│    │   Manager   │    │  (config.js)│  │
│  └─────────────┘    │   style.css)│    │  (state.js) │    └─────────────┘  │
│         │           └─────────────┘    └──────┬──────┘                      │
│         │                  │                  │                             │
│         ▼                  ▼                  ▼                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        APP CONTROLLER (app.js)                       │   │
│  │         Orchestrates all modules • Event handling • Init            │   │
│  └───────────┬─────────────┬─────────────┬─────────────┬───────────────┘   │
│              │             │             │             │                    │
│              ▼             ▼             ▼             ▼                    │
│  ┌───────────────┐ ┌─────────────┐ ┌───────────┐ ┌─────────────┐           │
│  │    AVATAR     │ │   SPEECH    │ │ INTERVIEW │ │    CODE     │           │
│  │   (avatar.js) │ │ (speech.js) │ │(interview │ │   EDITOR    │           │
│  ├───────────────┤ ├─────────────┤ │    .js)   │ │(codeEditor  │           │
│  │• Canvas 2D    │ │• Voice In   │ ├───────────┤ │    .js)     │           │
│  │• Animations   │ │• TTS Out    │ │• 4 Types  │ ├─────────────┤           │
│  │• Expressions  │ │• Audio Cache│ │• Q&A Flow │ │• 8 Languages│           │
│  │• Eye Tracking │ │             │ │• Prompts  │ │• Execution  │           │
│  └───────────────┘ └──────┬──────┘ └─────┬─────┘ └─────────────┘           │
│                           │              │                                  │
│                           ▼              ▼                                  │
│              ┌────────────────────────────────────────┐                    │
│              │       CONVERSATION (conversation.js)   │                    │
│              │    Context management • AI responses   │                    │
│              └───────────────────┬────────────────────┘                    │
│                                  │                                          │
└──────────────────────────────────┼──────────────────────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │      EXTERNAL APIS       │
                    ├──────────────────────────┤
                    │ • OpenAI GPT-4 (Chat)    │
                    │ • OpenAI TTS-1 (Voice)   │
                    │ • Web Speech API (STT)   │
                    └──────────────────────────┘
```

---

## 🔄 Interview Flow

```
┌──────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  START   │───▶│ Select Type  │───▶│    Begin     │───▶│   Question   │
│          │    │  Technical   │    │  Interview   │    │   Presented  │
│          │    │  Behavioral  │    │              │    │              │
│          │    │  Coding      │    │              │    │              │
│          │    │  System      │    │              │    │              │
└──────────┘    └──────────────┘    └──────────────┘    └──────┬───────┘
                                                               │
     ┌─────────────────────────────────────────────────────────┘
     │
     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│    User      │───▶│    AI        │───▶│   Follow-up  │───▶│   Next Q or  │
│   Answer     │    │   Feedback   │    │   Questions  │    │   Complete   │
│ (Voice/Text) │    │   + Speak    │    │              │    │              │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

---

## 📂 Module Structure

```
AI-Interviewer/
├── index.html                 # Main HTML entry point
├── style.css                  # UI styling & animations
└── js/
    ├── app.js                 # 🎛️  Main controller - init & event handling
    ├── state.js               # 📊 Centralized state management
    ├── config.js              # ⚙️  API keys & settings
    ├── avatar.js              # 🎭 Canvas avatar rendering & animations
    ├── speech.js              # 🎤 Voice recognition & TTS
    ├── conversation.js        # 💬 OpenAI API communication
    ├── interview.js           # 📋 Interview flow management
    ├── interview-prompts.js   # 📝 Interview type prompts
    ├── leetcode-questions.js  # 💻 Coding problems database
    ├── codeEditor.js          # ⌨️  Code editor & execution
    ├── ui.js                  # 🖥️  UI updates & chat history
    └── utils.js               # 🔧 Helper functions
```

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🎭 **Animated Avatar** | Cosmic AI face with lip-sync, eye tracking, and expressions |
| 🎤 **Voice Interaction** | Real-time speech recognition & natural TTS responses |
| 📋 **4 Interview Types** | Technical, Behavioral, Coding (LeetCode), System Design |
| 💻 **Code Editor** | 8 languages with live JS/Python execution |
| 🔄 **Audio Caching** | Instant replay of previously spoken responses |
| 🌙 **Dark/Light Mode** | Theme toggle with saved preference |

---

## 🚀 Quick Start

### Prerequisites
- Modern browser (Chrome recommended)
- [OpenAI API key](https://platform.openai.com/api-keys)

### Setup

```bash
# 1. Clone
git clone https://github.com/ishanaggarwal/AI-Interviewer.git
cd AI-Interviewer

# 2. Configure API keys in:
#    - js/config.js (line 8)
#    - js/speech.js (line 3)

# 3. Start server
python3 -m http.server 8000

# 4. Open http://localhost:8000
```

---

## 📖 Usage

1. **Click Edith** → Hear introduction
2. **Select interview type** → Technical / Behavioral / Coding / System Design
3. **Begin Interview** → Edith asks questions
4. **Answer** → Voice or text input
5. **Get Feedback** → AI evaluates and continues

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Vanilla JS (ES6+), HTML5, CSS3 |
| **AI** | OpenAI GPT-4, OpenAI TTS-1 |
| **Voice** | Web Speech API |
| **Graphics** | HTML5 Canvas 2D |

---

## 📄 License

MIT License - [Ishan Aggarwal](https://github.com/ishanaggarwal)

---

<p align="center">Built with ❤️ for aspiring engineers</p>