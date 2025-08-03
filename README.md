# NewTab Pro - Beautiful Chrome Extension

A modern and beautiful Chrome extension that transforms your new tab page into a productivity hub with stunning design and useful features.

## ✨ Features

### 🎨 Beautiful Design
- **Modern Glassmorphism UI**: Stunning glass-like effects with backdrop blur
- **Gradient Backgrounds**: Beautiful purple-blue gradients
- **Smooth Animations**: Elegant hover effects and transitions
- **Responsive Design**: Works perfectly on all screen sizes
- **Dark/Light Theme Support**: Automatic theme detection

### 🔍 Smart Search
- **Google Search Integration**: Direct search from the new tab page
- **Quick Search Bar**: Prominent search input with beautiful styling
- **Keyboard Shortcuts**: Press Enter to search instantly

### 📚 Bookmark Management
- **Custom Bookmarks**: Add your own bookmarks with custom icons
- **Quick Access**: One-click access to your favorite sites
- **FontAwesome Icons**: Choose from thousands of icons
- **Easy Management**: Add, edit, and delete bookmarks


## 🚀 Installation

### Method 1: Load Unpacked Extension (Development)

1. **Download the Extension**
   ```bash
   git clone https://github.com/yourusername/newtab-pro.git
   cd newtab-pro
   ```

2. **Open Chrome Extensions**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right

3. **Load the Extension**
   - Click "Load unpacked"
   - Select the `newtab-pro` folder
   - The extension will be installed and active

### Method 2: Chrome Web Store (Coming Soon)

1. Visit the Chrome Web Store
2. Search for "NewTab Pro"
3. Click "Add to Chrome"
4. Confirm the installation

## 🎯 Usage

### New Tab Page
- **Search**: Type in the search bar and press Enter or click the search button
- **Bookmarks**: Click on the bookmarks icon to add your favorite sites
- **Settings**: Click on the settings icon to change the extension settings
- **Wallpaper**: Click on the wallpaper icon to change the background image
- **Time**: The time is displayed in the top right corner
- **Language**: The language is displayed in the top right corner
- **Features**: The features are displayed in the top right corner
- **Save Settings**: Click on the save settings button to save the settings

## 🔧 Configuration

### Custom Quick Actions
To add your own quick actions:

1. Open `newtab.html`
2. Find the `actions-grid` section
3. Add new action cards following the existing pattern:
   ```html
   <div class="action-card" data-url="https://your-site.com">
       <i class="fas fa-icon-name"></i>
       <span>Your Site</span>
   </div>
   ```

### Custom Icons
Use any FontAwesome icon by changing the `class` attribute:
- Browse icons at [FontAwesome](https://fontawesome.com/icons)
- Use the format: `fas fa-icon-name` or `fab fa-icon-name`

## 📁 File Structure

```
newtab-pro/
├── manifest.json          # Extension configuration
├── newtab.html           # New tab page
├── popup.html            # Extension popup
├── styles/
│   ├── newtab.css        # New tab page styles
│   └── popup.css         # Popup styles
├── scripts/
│   ├── newtab.js         # New tab page functionality
│   └── popup.js          # Popup functionality
├── icons/
│   └── icon.svg          # Extension icon
└── README.md             # This file
```

## 🎨 Customization

### Colors
The extension uses a beautiful purple-blue gradient. To customize:

1. Open `styles/newtab.css`
2. Find the gradient definitions
3. Modify the colors in the `linear-gradient` functions

### Fonts
The extension uses Inter font. To change:

1. Update the Google Fonts link in HTML files
2. Modify the `font-family` property in CSS files

### Layout
The layout is fully responsive and uses CSS Grid and Flexbox. Modify the grid layouts in the CSS files to adjust spacing and arrangement.

## 🔒 Privacy

- **No Data Collection**: The extension doesn't collect or send any personal data
- **Local Storage**: All data is stored locally using Chrome's sync storage
- **Location Permission**: Weather feature requires location access (optional)
- **No Tracking**: No analytics or tracking scripts

## 🛠️ Development

### Prerequisites
- Chrome browser
- Basic knowledge of HTML, CSS, and JavaScript

### Making Changes
1. Edit the files in your preferred code editor
2. Go to `chrome://extensions/`
3. Click the refresh icon on the NewTab Pro extension
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
- **Email**: support@newtab-pro.com (coming soon)
- **Documentation**: Check this README for common questions

## 🙏 Acknowledgments

- **FontAwesome**: For the beautiful icons
- **Google Fonts**: For the Inter font family
- **Chrome Extensions API**: For the powerful extension capabilities
- **OpenWeatherMap**: For weather data (optional)

## 📈 Roadmap

### Version 1.1
- [ ] Settings page with customization options
- [ ] Multiple themes (dark, light, auto)
- [ ] Custom background images
- [ ] Keyboard shortcuts

### Version 1.2
- [ ] Widget system (clock, calendar, etc.)
- [ ] Drag and drop bookmark organization
- [ ] Search suggestions
- [ ] Multiple search engines

### Version 1.3
- [ ] Productivity widgets (pomodoro timer, etc.)
- [ ] Data sync with cloud services
- [ ] Advanced customization options
- [ ] Mobile companion app

---

**Made with ❤️ for productivity enthusiasts**

*Transform your new tab experience with NewTab Pro - where beauty meets productivity!* 