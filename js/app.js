// ==========================================
// Tech Learning Tracker - Main Application
// ==========================================

const app = {
    // State management
    state: {
        topics: [],
        news: [],
        lastUpdate: null,
        streak: {
            current: 0,
            lastActivity: null
        }
    },
    
    currentFilter: 'all',
    searchQuery: '',

    // Initialize the app
    init() {
        this.loadState();
        this.updateStreak();
        this.render();
        this.updateStats();
        this.updateLastUpdate();
        
        // Add sample data if first time user
        if (this.state.topics.length === 0 && this.state.news.length === 0) {
            this.addSampleData();
        }
    },

    // Load state from localStorage
    loadState() {
        try {
            const saved = localStorage.getItem('techLearningTracker');
            if (saved) {
                this.state = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error loading state:', error);
        }
    },

    // Save state to localStorage
    saveState() {
        try {
            this.state.lastUpdate = new Date().toISOString();
            localStorage.setItem('techLearningTracker', JSON.stringify(this.state));
            this.updateLastUpdate();
        } catch (error) {
            console.error('Error saving state:', error);
            alert('Error saving data. Your browser storage might be full.');
        }
    },

    // Update streak calculation
    updateStreak() {
        const today = new Date().toDateString();
        const lastActivity = this.state.streak.lastActivity;
        
        if (!lastActivity) {
            this.state.streak.current = 0;
            return;
        }

        const lastDate = new Date(lastActivity).toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (lastDate === today) {
            // Same day, keep streak
            return;
        } else if (lastDate === yesterday) {
            // Continue streak
            return;
        } else {
            // Streak broken
            this.state.streak.current = 0;
        }
    },

    // Record activity for streak
    recordActivity() {
        const today = new Date().toDateString();
        const lastActivity = this.state.streak.lastActivity;
        
        if (!lastActivity || new Date(lastActivity).toDateString() !== today) {
            this.state.streak.current++;
            this.state.streak.lastActivity = new Date().toISOString();
        }
    },

    // Add new learning topic
    addTopic() {
        const title = document.getElementById('topicTitle').value.trim();
        const category = document.getElementById('topicCategory').value;
        const notes = document.getElementById('topicNotes').value.trim();
        const hours = parseFloat(document.getElementById('topicHours').value) || 0;

        if (!title) {
            alert('Please enter a topic title');
            return;
        }

        const topic = {
            id: Date.now(),
            type: 'topic',
            title,
            category,
            notes,
            hours,
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null
        };

        this.state.topics.push(topic);
        this.recordActivity();
        this.saveState();
        this.render();
        this.updateStats();
        this.closeModal('addTopicModal');
        
        // Clear form
        document.getElementById('topicTitle').value = '';
        document.getElementById('topicNotes').value = '';
        document.getElementById('topicHours').value = '1';
    },

    // Add news article
    addNews() {
        const title = document.getElementById('newsTitle').value.trim();
        const url = document.getElementById('newsUrl').value.trim();
        const source = document.getElementById('newsSource').value.trim();
        const tags = document.getElementById('newsTags').value.trim();
        const notes = document.getElementById('newsNotes').value.trim();

        if (!title) {
            alert('Please enter an article title');
            return;
        }

        const article = {
            id: Date.now(),
            type: 'news',
            title,
            url,
            source,
            tags: tags.split(',').map(t => t.trim()).filter(t => t),
            notes,
            read: false,
            createdAt: new Date().toISOString(),
            readAt: null
        };

        this.state.news.push(article);
        this.recordActivity();
        this.saveState();
        this.render();
        this.updateStats();
        this.closeModal('addNewsModal');
        
        // Clear form
        document.getElementById('newsTitle').value = '';
        document.getElementById('newsUrl').value = '';
        document.getElementById('newsSource').value = '';
        document.getElementById('newsTags').value = '';
        document.getElementById('newsNotes').value = '';
    },

    // Toggle topic completion
    toggleTopic(id) {
        const topic = this.state.topics.find(t => t.id === id);
        if (topic) {
            topic.completed = !topic.completed;
            topic.completedAt = topic.completed ? new Date().toISOString() : null;
            if (topic.completed) {
                this.recordActivity();
            }
            this.saveState();
            this.render();
            this.updateStats();
        }
    },

    // Toggle news read status
    toggleNews(id) {
        const article = this.state.news.find(n => n.id === id);
        if (article) {
            article.read = !article.read;
            article.readAt = article.read ? new Date().toISOString() : null;
            if (article.read) {
                this.recordActivity();
            }
            this.saveState();
            this.render();
            this.updateStats();
        }
    },

    // Delete topic
    deleteTopic(id) {
        if (confirm('Are you sure you want to delete this topic?')) {
            this.state.topics = this.state.topics.filter(t => t.id !== id);
            this.saveState();
            this.render();
            this.updateStats();
        }
    },

    // Delete news
    deleteNews(id) {
        if (confirm('Are you sure you want to delete this article?')) {
            this.state.news = this.state.news.filter(n => n.id !== id);
            this.saveState();
            this.render();
            this.updateStats();
        }
    },

    // Filter management
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });
        
        this.render();
    },

    // Search functionality
    handleSearch(query) {
        this.searchQuery = query.toLowerCase();
        this.render();
    },

    // Get filtered and searched items
    getFilteredItems() {
        let topics = [...this.state.topics];
        let news = [...this.state.news];

        // Apply filter
        if (this.currentFilter === 'learning') {
            news = [];
        } else if (this.currentFilter === 'news') {
            topics = [];
        } else if (this.currentFilter === 'completed') {
            topics = topics.filter(t => t.completed);
            news = news.filter(n => n.read);
        }

        // Apply search
        if (this.searchQuery) {
            topics = topics.filter(t => 
                t.title.toLowerCase().includes(this.searchQuery) ||
                t.notes.toLowerCase().includes(this.searchQuery) ||
                t.category.toLowerCase().includes(this.searchQuery)
            );
            news = news.filter(n => 
                n.title.toLowerCase().includes(this.searchQuery) ||
                n.notes.toLowerCase().includes(this.searchQuery) ||
                n.source.toLowerCase().includes(this.searchQuery) ||
                n.tags.some(tag => tag.toLowerCase().includes(this.searchQuery))
            );
        }

        return { topics, news };
    },

    // Render all items
    render() {
        const { topics, news } = this.getFilteredItems();
        this.renderTopics(topics);
        this.renderNews(news);
    },

    // Render learning topics
    renderTopics(topics) {
        const container = document.getElementById('learningTopics');
        
        if (topics.length === 0) {
            container.innerHTML = '<div class="empty-state">No topics found. Add your first learning topic!</div>';
            return;
        }

        container.innerHTML = topics
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(topic => `
                <div class="topic-card ${topic.completed ? 'completed' : ''}">
                    <div class="topic-header">
                        <div class="topic-checkbox">
                            <input 
                                type="checkbox" 
                                ${topic.completed ? 'checked' : ''} 
                                onchange="app.toggleTopic(${topic.id})"
                            >
                        </div>
                        <div class="topic-info">
                            <h3 class="topic-title">${this.escapeHtml(topic.title)}</h3>
                            <div class="topic-meta">
                                <span class="category-badge ${topic.category}">${topic.category}</span>
                                <span class="time-badge">⏱️ ${topic.hours}h</span>
                                <span class="date-badge">${this.formatDate(topic.createdAt)}</span>
                            </div>
                        </div>
                        <button class="delete-btn" onclick="app.deleteTopic(${topic.id})" title="Delete">🗑️</button>
                    </div>
                    ${topic.notes ? `
                        <div class="topic-notes">
                            ${this.escapeHtml(topic.notes)}
                        </div>
                    ` : ''}
                    ${topic.completed ? `
                        <div class="completed-badge">✅ Completed ${this.formatDate(topic.completedAt)}</div>
                    ` : ''}
                </div>
            `).join('');
    },

    // Render news articles
    renderNews(news) {
        const container = document.getElementById('newsArticles');
        
        if (news.length === 0) {
            container.innerHTML = '<div class="empty-state">No articles saved. Add your first news article!</div>';
            return;
        }

        container.innerHTML = news
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(article => `
                <div class="news-card ${article.read ? 'read' : ''}">
                    <div class="news-header">
                        <div class="news-checkbox">
                            <input 
                                type="checkbox" 
                                ${article.read ? 'checked' : ''} 
                                onchange="app.toggleNews(${article.id})"
                                title="Mark as read"
                            >
                        </div>
                        <div class="news-info">
                            <h3 class="news-title">
                                ${article.url ? 
                                    `<a href="${this.escapeHtml(article.url)}" target="_blank" rel="noopener noreferrer">${this.escapeHtml(article.title)} 🔗</a>` :
                                    this.escapeHtml(article.title)
                                }
                            </h3>
                            <div class="news-meta">
                                ${article.source ? `<span class="source-badge">📰 ${this.escapeHtml(article.source)}</span>` : ''}
                                <span class="date-badge">${this.formatDate(article.createdAt)}</span>
                            </div>
                            ${article.tags.length > 0 ? `
                                <div class="tags">
                                    ${article.tags.map(tag => `<span class="tag">#${this.escapeHtml(tag)}</span>`).join('')}
                                </div>
                            ` : ''}
                        </div>
                        <button class="delete-btn" onclick="app.deleteNews(${article.id})" title="Delete">🗑️</button>
                    </div>
                    ${article.notes ? `
                        <div class="news-notes">
                            ${this.escapeHtml(article.notes)}
                        </div>
                    ` : ''}
                </div>
            `).join('');
    },

    // Update statistics
    updateStats() {
        const completedTopics = this.state.topics.filter(t => t.completed).length;
        const totalHours = this.state.topics
            .filter(t => t.completed)
            .reduce((sum, t) => sum + t.hours, 0);
        
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const weeklyTopics = this.state.topics.filter(t => 
            new Date(t.createdAt) > weekAgo
        ).length;
        const weeklyNews = this.state.news.filter(n => 
            new Date(n.createdAt) > weekAgo
        ).length;

        const totalProgress = this.state.topics.length > 0 
            ? Math.round((completedTopics / this.state.topics.length) * 100) 
            : 0;

        document.getElementById('topicsCompleted').textContent = completedTopics;
        document.getElementById('currentStreak').textContent = `${this.state.streak.current} days`;
        document.getElementById('weeklyTopics').textContent = weeklyTopics;
        document.getElementById('weeklyNews').textContent = weeklyNews;
        document.getElementById('weeklyHours').textContent = `${totalHours}h`;
        document.getElementById('totalProgress').textContent = `${totalProgress}%`;
    },

    // Update last update timestamp
    updateLastUpdate() {
        const lastUpdate = document.getElementById('lastUpdate');
        if (this.state.lastUpdate) {
            lastUpdate.textContent = this.formatDate(this.state.lastUpdate);
        } else {
            lastUpdate.textContent = 'Never';
        }
    },

    // Modal management
    openAddTopicModal() {
        document.getElementById('addTopicModal').classList.add('active');
    },

    openAddNewsModal() {
        document.getElementById('addNewsModal').classList.add('active');
    },

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    },

    // Export data
    exportData() {
        const dataStr = JSON.stringify(this.state, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tech-learning-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },

    // Import data
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const imported = JSON.parse(event.target.result);
                    if (confirm('This will replace all your current data. Continue?')) {
                        this.state = imported;
                        this.saveState();
                        this.render();
                        this.updateStats();
                        alert('Data imported successfully!');
                    }
                } catch (error) {
                    alert('Error importing data. Please check the file format.');
                    console.error(error);
                }
            };
            reader.readAsText(file);
        };
        input.click();
    },

    // Add sample data for new users
    addSampleData() {
        this.state.topics = [
            {
                id: Date.now() - 1000,
                type: 'topic',
                title: 'Learn React Hooks',
                category: 'frontend',
                notes: 'Focus on useState, useEffect, and custom hooks',
                hours: 5,
                completed: false,
                createdAt: new Date().toISOString(),
                completedAt: null
            }
        ];

        this.state.news = [
            {
                id: Date.now() - 2000,
                type: 'news',
                title: 'AI Coding Assistants: The Future of Development',
                url: '',
                source: 'TechCrunch',
                tags: ['ai', 'development', 'tools'],
                notes: 'Interesting article about how AI is changing software development',
                read: false,
                createdAt: new Date().toISOString(),
                readAt: null
            }
        ];

        this.saveState();
    },

    // Utility functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = now - date;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        
        return date.toLocaleDateString();
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

// Close modals when clicking outside
window.onclick = (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
};
