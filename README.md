# Minimal New Tab - Beautiful Chrome Extension

A modern and minimal Chrome extension that transforms your new tab page into a productivity hub with a beautiful analog clock, smart search, and bookmark management.

## ✨ Features

### 🎨 Beautiful Design
- **Modern Glassmorphism UI**: Stunning glass-like effects with backdrop blur
- **Analog Clock**: Beautiful animated analog clock with hour, minute, and second hands
- **Dynamic Color Matching**: Search elements automatically match your selected wallpaper color
- **Smooth Animations**: Elegant hover effects and transitions
- **Responsive Design**: Works perfectly on all screen sizes
- **High Contrast Support**: Enhanced accessibility for better visibility

### 🔍 Smart Search
- **Multiple Search Engines**: Choose from Google, Ecosia, or Brave Search
- **Quick Search Bar**: Prominent search input with beautiful styling
- **Keyboard Shortcuts**: Press Enter to search instantly
- **Dynamic Colors**: Search button and icon match your wallpaper theme

### 📚 Bookmark Management
- **Browser Bookmarks Integration**: Automatically displays your Chrome bookmarks
- **Folder Support**: View and access bookmarks organized in folders
- **Folder Popup**: Click folders to see all bookmarks in a beautiful popup
- **Favicon Support**: Shows website favicons for easy recognition
- **One-Click Access**: Direct access to your favorite sites

### 🎨 Customization
- **6 Built-in Wallpapers**: Choose from flat color themes (Blue, Purple, Green, Orange, Red, Gray)
- **Custom Wallpaper Upload**: Upload your own images (JPEG, PNG, GIF, WebP, SVG)
- **URL Wallpaper**: Load wallpapers directly from image URLs
- **Image Compression**: Automatic image optimization for better performance
- **Wallpaper Preview**: See your custom wallpaper before applying

### 🌍 Internationalization
- **Multi-language Support**: English, Spanish, and Catalan
- **Dynamic Language Switching**: Change language without reloading
- **Localized Interface**: All UI elements are properly translated

### ⚙️ Settings & Preferences
- **Comprehensive Settings Panel**: Easy access to all customization options
- **Persistent Storage**: All settings are saved and synced across devices
- **Feature Toggle**: Enable/disable bookmarks section
- **Search Engine Selection**: Choose your preferred search engine
- **Language Selection**: Switch between supported languages

## 🚀 Installation

### Method 1: Load Unpacked Extension (Development)

1. **Download the Extension**
   ```bash
   git clone https://github.com/yourusername/minimal-newtab.git
   cd minimal-newtab
   ```

2. **Open Chrome Extensions**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right

3. **Load the Extension**
   - Click "Load unpacked"
   - Select the `minimal-newtab` folder
   - The extension will be installed and active

## 🎯 Usage

### New Tab Page
- **Search**: Type in the search bar and press Enter or click the search button
- **Bookmarks**: Your Chrome bookmarks are automatically displayed
- **Folders**: Click on folder icons to view bookmarks in a popup
- **Settings**: Click the gear icon to access all customization options
- **Clock**: Enjoy the beautiful animated analog clock

### Settings Panel
- **Wallpaper**: Choose from built-in themes or upload custom images
- **Search Engine**: Select your preferred search engine
- **Language**: Switch between English, Spanish, and Catalan
- **Features**: Toggle bookmark visibility on/off

## 🔧 Configuration

### Custom Wallpapers
1. Open the settings panel (gear icon)
2. Go to "Appearance" section
3. Choose "Upload Image" or "URL Image"
4. Select your image or enter an image URL
5. Click "Save Settings"

### Search Engine
1. Open settings panel
2. Go to "Search" section
3. Select your preferred search engine
4. Click "Save Settings"

### Language
1. Open settings panel
2. Go to "Language" section
3. Select your preferred language
4. Click "Save Settings"

## 📁 File Structure

```
minimal-newtab/
├── manifest.json          # Extension configuration
├── newtab.html           # New tab page
├── test.html             # Development test page
├── styles/
│   ├── newtab.css        # Main styles with glassmorphism effects
│   └── clock.css         # Analog clock animations
├── scripts/
│   └── newtab.js         # Main functionality and settings
├── icons/
│   ├── icon16.png        # 16x16 extension icon
│   ├── icon32.png        # 32x32 extension icon
│   ├── icon48.png        # 48x48 extension icon
│   ├── icon128.png       # 128x128 extension icon
│   └── icon.svg          # Vector extension icon
└── README.md             # This file
```

## 🎨 Customization

### Colors
The extension uses dynamic color matching. Search elements automatically match your selected wallpaper:
- **Flat Blue**: `#3498db`
- **Flat Purple**: `#9b59b6`
- **Flat Green**: `#2ecc71`
- **Flat Orange**: `#e67e22`
- **Flat Red**: `#e74c3c`
- **Flat Gray**: `#34495e`
- **Custom Images**: Falls back to flat gray

### Fonts
The extension uses Inter font family for a modern, clean look.

### Layout
The layout is fully responsive and uses CSS Grid and Flexbox for optimal organization.

## 🔒 Privacy

- **No Data Collection**: The extension doesn't collect or send any personal data
- **Local Storage**: All settings are stored locally using Chrome's sync storage
- **No Tracking**: No analytics or tracking scripts
- **Bookmark Access**: Only reads your bookmarks for display purposes

## 🛠️ Development

### Prerequisites
- Chrome browser
- Basic knowledge of HTML, CSS, and JavaScript

### Making Changes
1. Edit the files in your preferred code editor
2. Go to `chrome://extensions/`
3. Click the refresh icon on the Minimal New Tab extension
4. Open a new tab to see your changes

### Debugging
- Open Chrome DevTools on the new tab page
- Check the Console for any errors
- Use the Elements panel to inspect the UI

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Bug Reports

If you find a bug, please:
1. Check if the issue has already been reported
2. Create a new issue with a clear description
3. Include steps to reproduce the bug
4. Add screenshots if applicable

## 💡 Feature Requests

We welcome feature requests! Please:
1. Check if the feature has already been requested
2. Create a new issue with the "enhancement" label
3. Describe the feature and its benefits
4. Provide mockups if possible

## 📞 Support

- **GitHub Issues**: For bugs and feature requests
- **Documentation**: Check this README for common questions

## 🙏 Acknowledgments

- **FontAwesome**: For the beautiful icons
- **Google Fonts**: For the Inter font family
- **Chrome Extensions API**: For the powerful extension capabilities

---

**Made with ❤️ for productivity enthusiasts**

*Transform your new tab experience with Minimal New Tab - where simplicity meets functionality!*