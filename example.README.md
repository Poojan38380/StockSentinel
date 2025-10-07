# 🎵 AudioFlow Studio

[![GitHub stars](https://img.shields.io/github/stars/Poojan38380/AudioFlow-Studio?style=social)](https://github.com/Poojan38380/AudioFlow-Studio)
[![GitHub forks](https://img.shields.io/github/forks/Poojan38380/AudioFlow-Studio?style=social)](https://github.com/Poojan38380/AudioFlow-Studio)
[![GitHub issues](https://img.shields.io/github/issues/Poojan38380/AudioFlow-Studio)](https://github.com/Poojan38380/AudioFlow-Studio/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/Poojan38380/AudioFlow-Studio)](https://github.com/Poojan38380/AudioFlow-Studio/pulls)
[![License](https://img.shields.io/github/license/Poojan38380/AudioFlow-Studio)](https://github.com/Poojan38380/AudioFlow-Studio/blob/main/LICENSE)
[![Last commit](https://img.shields.io/github/last-commit/Poojan38380/AudioFlow-Studio)](https://github.com/Poojan38380/AudioFlow-Studio)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel)](https://audio-flow-studio.vercel.app/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://reactjs.org/)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio%20API-Supported-FF6B6B)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

> **A Visual Audio Synthesizer Built with React Flow and Web Audio API**
 
I created this project because I wanted to build an intuitive, visual way to experiment with audio synthesis and effects. As someone passionate about both music production and web development, I envisioned a tool that would make complex audio concepts accessible through a drag-and-drop interface.

## ✨ What I Built

AudioFlow Studio is a **visual audio synthesizer** that lets you create, connect, and manipulate audio nodes in real-time. Think of it as a digital audio workstation (DAW) simplified into a node-based interface - perfect for learning audio concepts, prototyping sounds, or just having fun with audio synthesis.

### 🎯 Key Features I Implemented

- **🎛️ Visual Node-Based Interface**: Drag and drop audio components to build your sound
- **🔊 Real-Time Audio Processing**: Powered by Web Audio API for low-latency audio
- **🎨 Multiple Audio Sources**: Oscillators and various noise generators
- **🎚️ Rich Effects Library**: Flanger, Chorus, Phaser, and Amplifier effects
- **📊 Visual Analysis**: Real-time waveform visualization
- **🌙 Dark/Light Theme**: Seamless theme switching with system preference detection
- **⌨️ Keyboard Shortcuts**: Full keyboard support for power users
- **↩️ Undo/Redo**: Complete history management for your audio experiments
- **📱 Responsive Design**: Works beautifully on desktop and tablet devices

## 🚀 Live Demo

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Play_Now-4F46E5?style=for-the-badge&logo=vercel)](https://audio-flow-studio.vercel.app/)

*Experience the full power of visual audio synthesis in your browser*

## 📸 Screenshots

<div align="center">
  <img src="demo-images/Screenshot 2025-09-13 013439.png" alt="AudioFlow Studio - Main Interface" width="800"/>
  <p><em>Main interface with oscillator and amplifier nodes connected</em></p>
</div>

<div align="center">
  <img src="demo-images/Screenshot 2025-09-13 013453.png" alt="AudioFlow Studio - Effects Panel" width="800"/>
  <p><em>Rich effects library including Flanger, Chorus, and Phaser</em></p>
</div>

<div align="center">
  <img src="demo-images/Screenshot 2025-09-13 013508.png" alt="AudioFlow Studio - Waveform Visualization" width="800"/>
  <p><em>Real-time waveform visualization and audio analysis</em></p>
</div>

<div align="center">
  <img src="demo-images/Screenshot 2025-09-13 013520.png" alt="AudioFlow Studio - Dark Theme" width="800"/>
  <p><em>Beautiful dark theme with smooth animations</em></p>
</div>

## 🛠️ Technical Stack I Used

### Frontend Architecture
- **React 19** - Latest React with concurrent features for smooth UI updates
- **@xyflow/react** - Professional node-based interface (formerly React Flow)
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS with custom design system

### State Management & Performance
- **Zustand** - Lightweight state management with shallow equality checks
- **React.memo** - Optimized re-rendering for complex audio nodes
- **Custom Hooks** - Reusable audio logic and theme management

### Audio Engine
- **Web Audio API** - Native browser audio processing
- **Custom Audio Nodes** - Hand-crafted effects and generators
- **Real-time Parameter Updates** - Smooth audio parameter changes

### Development Tools
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing and optimization
- **TypeScript Support** - Type safety for complex audio operations

## 🎵 Audio Components I Created

### Audio Sources
- **Oscillator**: Sine, triangle, sawtooth, and square waves
- **Noise Generator**: White, pink, and brown noise with real-time switching

### Effects Processing
- **Amplifier**: Gain control and volume management
- **Flanger**: Classic flanging effect with LFO modulation
- **Chorus**: Stereo chorus with phase offset and width control
- **Phaser**: Multi-stage allpass filter phasing effect

### Analysis & Output
- **Waveform Visualizer**: Real-time audio waveform display
- **Output Node**: Final audio destination with proper routing

## 🎨 Design Philosophy

I designed this application with **clarity and accessibility** in mind:

- **Color-Coded Nodes**: Each component type has its own visual identity
- **Intuitive Controls**: Sliders and dropdowns that feel natural
- **Smooth Animations**: 60fps transitions and hover effects
- **Responsive Layout**: Adapts to different screen sizes
- **Keyboard Navigation**: Full accessibility support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Poojan38380/AudioFlow-Studio.git
cd AudioFlow-Studio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🎮 How to Use

1. **Add Nodes**: Click the "+" button to add audio components
2. **Connect Audio**: Drag from output handles to input handles
3. **Adjust Parameters**: Use sliders and dropdowns to modify sound
4. **Visualize**: Add waveform nodes to see your audio in real-time
5. **Experiment**: Try different combinations and effects!

### Keyboard Shortcuts
- `A` - Add new node
- `T` - Toggle theme
- `Cmd/Ctrl + Z` - Undo
- `Cmd/Ctrl + Shift + Z` - Redo

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (Button, Card, etc.)
│   └── BottomMenu.jsx  # Main control panel
├── nodes/              # Audio node components
│   ├── Osc.jsx         # Oscillator node
│   ├── Amp.jsx         # Amplifier node
│   ├── Flanger.jsx     # Flanger effect
│   ├── Chorus.jsx      # Chorus effect
│   ├── Phaser.jsx      # Phaser effect
│   ├── Noise.jsx       # Noise generator
│   ├── Waveform.jsx    # Waveform visualizer
│   └── Out.jsx         # Output node
├── services/           # Core business logic
│   ├── audio/          # Web Audio API wrapper
│   └── store/          # State management
├── theme/              # Theme system
├── hooks/              # Custom React hooks
└── audio.js            # Audio engine implementation
```

## 🔧 Advanced Configuration

### Custom Audio Nodes
I designed the audio system to be easily extensible. To add a new audio node:

1. Create a new component in `src/nodes/`
2. Add the node type to `src/audio.js`
3. Register it in the store configuration
4. Add it to the bottom menu

### Theme Customization
The theme system supports both light and dark modes with CSS custom properties. Modify `src/index.css` to customize colors and styling.

## 🤝 Contributing

I welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Ideas for Contributions
- New audio effects (Reverb, Delay, Distortion)
- MIDI input support
- Audio file import/export
- Preset management system
- Mobile touch optimizations
- Additional visualization modes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Flow Team** - For the amazing node-based interface library
- **Web Audio API Community** - For the powerful audio processing capabilities
- **Tailwind CSS** - For the beautiful design system
- **Vite Team** - For the lightning-fast development experience

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/Poojan38380/AudioFlow-Studio?style=social)
![GitHub forks](https://img.shields.io/github/forks/Poojan38380/AudioFlow-Studio?style=social)
![GitHub issues](https://img.shields.io/github/issues/Poojan38380/AudioFlow-Studio)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Poojan38380/AudioFlow-Studio)

## 🎯 Roadmap

- [ ] **MIDI Support** - Connect hardware controllers
- [ ] **Audio Recording** - Export your creations
- [ ] **Preset System** - Save and share configurations
- [ ] **Mobile App** - React Native version
- [ ] **Collaborative Mode** - Real-time collaboration
- [ ] **Plugin System** - Custom audio node development

---

**Built with ❤️ by [Poojan Goyani](https://github.com/Poojan38380)**

*If you find this project helpful, please give it a ⭐ and share it with others!*