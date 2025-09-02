# webOS Portfolio

> **A Modern WebOS-Inspired Portfolio Showcase**

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 Overview

webOS Portfolio is an innovative personal portfolio project that recreates the classic webOS interface in a modern web application. It serves as a comprehensive showcase of various web development projects, games, and applications, all accessible through an intuitive desktop-like environment.

## ✨ Features

### 🎨 **Modern UI/UX**
- **Smooth Animations**: Powered by Framer Motion for fluid transitions
- **Dark Theme**: Consistent dark aesthetic with customizable brightness, SOON GONNA BE LIGHT/DARK/CUSTOMISABLE

### 🖥️ **Desktop Environment**
- **Window Management**: Full window controls (minimize, maximize, close)
- **Draggable Windows**: Intuitive drag-and-drop functionality
- **Z-Index Management**: Proper layering of multiple open applications
- **Taskbar Integration**: Real-time app switching and management

### 🔧 **System Features**
- **Login Screen**: Authentication with time/date display
- **Quick Settings**: Volume and brightness controls
- **System Tray**: Time, date, and notification area
- **Start Menu**: Logout functionality

### 📱 **Integrated Applications**

| Application | Description | Technology |
|-------------|-------------|------------|
| **Terminal** | Interactive command-line interface with basic commands |
| **Google Search** | Embedded Google search in a resizable window | iframe Integration |
| **Flappy Bird** | Classic Flappy Bird game with modern styling | iframe Integration |
| **Chess Bird** | Innovative chess-themed game | Ciframe Integration |
| **CFR Portfolio** | First website built in 2023 | iframe Integration |
| **Meow Feeder** | Virtual pet feeding simulator | Riframe Integration |
| **Geo Explorer** | Interactive geography learning tool | iframe Integration |
| **Vending Machine** | Virtual vending machine experience | iframe Integration |


## 🏗️ Project Structure

```
webOS-portofolio/
├── frontend/
│   ├── public/
│   │   ├── index.html          # Main HTML template
│   │   ├── manifest.json       # PWA configuration
│   │   └── assets/             # Static images
│   ├── src/
│   │   ├── components/
│   │   │   ├── Apps/           # Individual application components
│   │   │   │   ├── TerminalApp.js
│   │   │   │   ├── GoogleApp.js
│   │   │   │   └── ...         # Other app components
│   │   │   ├── Taskbar.js      # Bottom taskbar
│   │   │   ├── WinBar.js       # Start menu
│   │   │   └── QuickSettings.js # System settings panel
│   │   ├── pages/
│   │   │   ├── Login.js        # Authentication screen
│   │   │   └── Main.js         # Desktop environment
│   │   ├── hooks/
│   │   │   └── useWindowSize.js # Window dimensions hook
│   │   ├── context/            # React context 
│   │   ├── utils/              # Utility functions
│   │   ├── App.js              # Main application component
│   │   └── index.js            # Application entry point
│   ├── package.json            # Dependencies and scripts
│   └── tailwind.config.js      # Tailwind CSS configuration
├── LICENSE                     # MIT License
└── README.md                   # Project documentation
```

## 🛠️ Technologies Used

### Core Framework
- **[React 18](https://reactjs.org/)** - Modern JavaScript library for building user interfaces
- **[React Router DOM](https://reactrouter.com/)** - Declarative routing for React

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library for React
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### Functionality
- **[React Draggable](https://www.npmjs.com/package/react-draggable)** - Drag and drop functionality
- **[React DOM](https://reactjs.org/docs/react-dom.html)** - React rendering library

## 🎯 Development

## 🔮 Roadmap

### Phase 1: Core Enhancement (SHIP 1) ✅
- [x] Implement basic window management
- [x] Add responsive design
- [x] Integrate multiple portfolio projects
- [x] Create login/authentication system

### Phase 2: Advanced Features (SHIP 2)
- [ ] **File System Integration**
  - Add local file explorer
  - Create file management system, saving in local host

- [ ] **Enhanced Terminal**
  - Add more Linux commands
  - Create custom shell scripts

- [ ] **System Customization**
  - Multiple desktop wallpapers
  - Customizable themes
  - User profile management

- [ ] **Additional Applications**
  - Code Editor (VS Code-like)
  - Image Gallery
  - Music Player
  - Calculator

- [ ] **More complex login system**
  - actual user and password

  +lots more

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.