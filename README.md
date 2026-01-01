# Tech Learning Tracker 📚

> A free, local-first web application to track your tech learning progress and save interesting news articles - all stored in your browser!

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Status](https://img.shields.io/badge/Status-Active-success.svg)
![Privacy](https://img.shields.io/badge/Privacy-100%25_Local-green.svg)

---

## 🌟 Features

### 📚 Learning Topics Tracker
- **Add & Manage Topics**: Track what you're learning with customizable categories
- **Progress Tracking**: Mark topics as completed and track your progress
- **Time Estimation**: Set estimated learning hours for each topic
- **Notes & Resources**: Add your own notes, links, and resources
- **Categories**: Organize by Frontend, Backend, DevOps, AI/ML, Security, and more

### 📰 News & Articles Manager
- **Save Articles**: Bookmark interesting tech articles and news
- **URL Support**: Save links to articles with one click
- **Tags & Sources**: Organize with tags and track sources
- **Read Status**: Mark articles as read and track what you've consumed
- **Quick Notes**: Add summaries and key takeaways

### 📊 Weekly Progress Dashboard
- **Statistics**: View topics learned, articles saved, and time invested
- **Streak Tracking**: Keep your learning momentum with daily streaks
- **Weekly Summary**: See your progress over the past week
- **Overall Progress**: Track completion percentage

### 🔒 Privacy First
- **100% Local Storage**: All data stays in your browser
- **No Server Required**: Works completely offline
- **No Tracking**: Zero analytics or data collection
- **Export/Import**: Backup and restore your data anytime

---

## 🚀 Getting Started

### Quick Start
1. **Download or Clone** this repository
2. **Open** `index.html` in your web browser
3. **Start Tracking** your learning journey!

That's it! No installation, no dependencies, no configuration needed.

### Usage
```
Simply open index.html in any modern web browser:
- Chrome, Firefox, Safari, Edge - all supported!
- Works on desktop and mobile devices
- No internet connection required after first load
```

---

## 💡 How to Use

### Adding a Learning Topic
1. Click **"Add Learning Topic"** button
2. Fill in:
   - Topic title (e.g., "Learn React Hooks")
   - Category (Frontend, Backend, etc.)
   - Notes and resources
   - Estimated learning hours
3. Click **"Add Topic"** to save

### Adding News Articles
1. Click **"Add News Article"** button
2. Fill in:
   - Article title
   - URL (optional)
   - Source (e.g., "Dev.to", "Medium")
   - Tags for organization
   - Summary or key takeaways
3. Click **"Add Article"** to save

### Filtering & Searching
- Use **filter tabs** to view: All Items, Learning Topics, News, or Completed items
- Use the **search bar** to find topics by title, notes, tags, or category
- **Check boxes** to mark topics as completed or articles as read

### Data Management
- **Export**: Download your data as JSON for backup
- **Import**: Restore from a previous backup file
- Data automatically saves to your browser's localStorage

---

## 🛠️ Technical Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | Pure HTML5, CSS3, Vanilla JavaScript |
| **Styling** | Custom CSS with CSS Variables |
| **Storage** | Browser localStorage API |
| **Icons** | Unicode Emoji (no external dependencies) |
| **Design** | Responsive, mobile-first approach |

### Why No Frameworks?
This project intentionally uses **vanilla web technologies** to:
- ✅ Zero dependencies = no vulnerabilities
- ✅ Instant load times
- ✅ Works forever (no framework updates needed)
- ✅ Easy to understand and customize
- ✅ Tiny file size

---

## 📁 Project Structure

```
tech-learning-tracker/
│
├── index.html          # Main HTML file
├── css/
│   └── style.css      # All styles
├── js/
│   └── app.js         # Application logic
└── README.md          # This file
```

---

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
    --primary: #6366f1;      /* Main theme color */
    --secondary: #06b6d4;    /* Secondary color */
    --bg-primary: #0f172a;   /* Background color */
    /* ... customize to your liking! */
}
```

### Adding Categories
Edit the category options in `index.html`:
```html
<select id="topicCategory">
    <option value="your-category">Your Category</option>
</select>
```

And add corresponding styles in `css/style.css`.

---

## 💾 Data Storage

All data is stored in your browser's **localStorage** under the key `techLearningTracker`.

### Data Format
```json
{
  "topics": [...],
  "news": [...],
  "lastUpdate": "2026-01-01T12:00:00.000Z",
  "streak": {
    "current": 5,
    "lastActivity": "2026-01-01T12:00:00.000Z"
  }
}
```

### Backup Recommendations
- Export your data regularly
- Keep backups in multiple locations
- Use the built-in Export feature (creates JSON file)

---

## 🌐 Browser Compatibility

Works on all modern browsers:
- ✅ Chrome / Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

**Note**: Requires localStorage support (available in all modern browsers).

---

## 🤝 Contributing

Want to improve this project? Feel free to:
1. Fork the repository
2. Make your changes
3. Submit a pull request

Ideas for contributions:
- Add more export formats (CSV, Markdown)
- Implement theme switcher (dark/light mode)
- Add data visualization charts
- Create browser extension version
- Add keyboard shortcuts

---

## 📝 License

This project is licensed under the **MIT License** - feel free to use, modify, and distribute as you wish!

---

## 🙏 Acknowledgments

Inspired by the need for a simple, privacy-focused learning tracker that doesn't require sign-ups, subscriptions, or complex setups.

Built for developers, by developers. Keep learning! 🚀

---

## 📮 Questions or Feedback?

Open an issue on GitHub or fork and customize for your needs!

**Happy Learning!** 📚✨
