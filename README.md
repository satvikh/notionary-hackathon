# Notionary

**Notionary** is a powerful AI-powered quiz and study companion that seamlessly integrates with Notion. It converts your notes into interactive quizzes and offers verbal quizzing options to supercharge your learning process. With upcoming features like personalized performance reports, Notionary takes your learning experience to the next level.

## 🎯 **Features**

### 1. Instant Quiz Generation
- Automatically transforms any Notion page into a quiz.
- Saves hours of manual effort by creating questions from your notes.

### 2. Verbal Quizzing
- Answer questions verbally and get real-time feedback.
- Perfect for on-the-go learning or practicing key concepts out loud.

### 3. Personalized Performance Reports (Coming Soon)
- Receive tailored reports via email or SMS.
- Insights include strengths, areas for improvement, and study patterns.

### 4. Seamless Notion Integration
- Syncs directly with your Notion workspace.
- Keeps quizzes updated as your notes evolve.

## 📚 **Use Cases**

- **Students:** Turn class notes into quizzes for exam preparation.
- **Professionals:** Reinforce knowledge from meetings or research.
- **Lifelong Learners:** Stay sharp by reviewing key concepts.

## 🚀 **Getting Started**

### Prerequisites
- Node.js v18+ and npm installed
- Notion API token with appropriate permissions

### Installation

1. **Clone the Repository:**
```bash
git clone https://github.com/yourusername/notionary.git
cd notionary
```

2. **Install Dependencies:**
```bash
npm install
```

3. **Set Up Environment Variables:**
Create a `.env.local` file in the project root and add the following:
```
NOTION_API_KEY=your-notion-api-key
DATABASE_ID=your-notion-database-id
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. **Run the Application:**
```bash
npm run dev
```

5. **Open Your Browser:**
Navigate to `http://localhost:3000` to access the app.

## ⚙️ **Configuration**

### API Integration
- Ensure your Notion API key has read and write permissions.
- Configure the database with a structure compatible with Notionary’s requirements.

### Verbal Quizzing Setup
- Enable microphone access for the browser.
- Configure speech-to-text settings for real-time feedback.

## 📩 **Upcoming Features**
- **Personalized Reports:** Get performance insights directly via email or SMS.
- **Custom Quiz Templates:** Define your quiz structure for different types of content.
- **Multi-User Collaboration:** Share quizzes and collaborate with others.

## 🤝 **Contributing**
We welcome contributions! Please submit pull requests and help improve Notionary.

## 📄 **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Happy Learning! 🎉

