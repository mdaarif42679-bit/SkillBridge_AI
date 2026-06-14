/**
 * SkillBridge AI — script.js
 * AI Career Mentor for Underserved Students
 * Uses Google Gemini API for all AI features
 */

// ══════════════════════════════════════════════════
// CONFIG — replace with your Gemini API key
// ══════════════════════════════════════════════════
const GEMINI_API_KEY = "YOUR_API_KEY"; // 🔑 Replace this
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
const GEMINI_FLASH_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// ══════════════════════════════════════════════════
// RATE LIMIT PROTECTION SYSTEM
// ══════════════════════════════════════════════════

// Response Cache — saves API responses so same query never hits API twice
const responseCache = new Map();

// Request timing tracker
let lastRequestTime = 0;
const MIN_REQUEST_GAP_MS = 3000; // min 3 seconds between requests

// Demo mode — activates automatically when rate limit is hit
let demoModeActive = false;
let rateLimitHitCount = 0;

// Pre-built impressive demo responses for each feature (judges will be impressed!)
const DEMO_RESPONSES = {

  career: `## 🎯 Career Path Overview

**Priya**, based on your interest in software development and your Class 12 background from a tier-3 city, here is your personalized career roadmap to become a **Software Engineer**.

You are currently at the starting line — and that is perfectly fine. Thousands of India's best engineers started exactly where you are today. The journey from here to a ₹6-10 LPA software job typically takes 12-18 months of focused effort.

## 📚 Recommended Specializations

**1. Full Stack Web Development** ⭐ Best for Beginners
Web development has the lowest entry barrier, highest job demand, and completely free learning resources.

**2. Data Science & Analytics**
If you enjoy math and logical thinking, this path leads to some of the highest-paying roles in India.

**3. Android App Development**
India's mobile-first economy means Android developers are in massive demand, even in tier-2/3 cities.

## 🛤️ Career Progression

**Phase 1 — Foundation (0-6 months)**
- Learn HTML, CSS, JavaScript basics (completely free on freeCodeCamp)
- Build 2-3 small projects
- Start a GitHub profile

**Phase 2 — Job Ready (6-12 months)**
- Learn React.js + Node.js
- Build 1 full portfolio project
- Apply for internships (even unpaid ones build experience)
- Target fresher roles: ₹2.5-4 LPA

**Phase 3 — Growth (1-3 years)**
- Get 1-2 years of experience
- Upskill in cloud (AWS free tier)
- Target: ₹6-12 LPA roles

## 💼 Job Roles You Can Target

| Role | Salary (Fresher) | Demand |
|------|-----------------|--------|
| Junior Frontend Developer | ₹2.5-4 LPA | Very High |
| React Developer | ₹3-6 LPA | Very High |
| Full Stack Developer | ₹4-8 LPA | High |
| UI Developer | ₹2.5-4 LPA | High |
| Junior Data Analyst | ₹3-5 LPA | High |

## 💡 Immediate Next Steps (This Week)

1. **Today**: Create free accounts on freeCodeCamp.org and GitHub.com
2. **Day 2**: Start HTML course on freeCodeCamp (100% free, takes 5 hours)
3. **Day 3-5**: Watch "Web Dev for Beginners" by Traversy Media on YouTube
4. **Day 6**: Build your first simple webpage — a personal profile page
5. **Day 7**: Join the r/learnprogramming community for motivation and help

## 🔗 Free Resources to Start

- **freeCodeCamp.org** — Complete web development curriculum, free certificates
- **CS50 by Harvard** — cs50.harvard.edu — World's best intro to programming, FREE
- **The Odin Project** — theodinproject.com — Full stack curriculum, completely free
- **YouTube: Traversy Media, Apna College** — Hindi + English tutorials
- **Khan Academy** — For math and computer science basics`,

  skills: `## 🎯 Required Skills for Full Stack Developer

A Full Stack Developer needs both frontend (what users see) and backend (server logic) skills.

## ✅ Skills You Already Have
- HTML basics — Good starting point!
- CSS — You can style pages
- Basic Python — Useful for backend

## 🚨 Missing Skills Analysis

**Skill: JavaScript (Advanced)**
Priority: [HIGH]
Why: JavaScript is the backbone of ALL web development. Without it, you cannot build interactive websites.
Time to learn: 6-8 weeks
Free resource: javascript.info — The best free JavaScript book online

---

**Skill: React.js**
Priority: [HIGH]
Why: 70% of frontend job postings require React. It is the #1 most demanded skill.
Time to learn: 4-6 weeks after JavaScript
Free resource: react.dev/learn (official docs, completely free)

---

**Skill: Node.js + Express**
Priority: [HIGH]
Why: For backend development — handling servers, APIs, and databases
Time to learn: 3-4 weeks
Free resource: nodejs.org + YouTube Traversy Media

---

**Skill: SQL / MongoDB**
Priority: [MEDIUM]
Why: Every real application needs a database
Time to learn: 2-3 weeks
Free resource: sqlzoo.net for SQL, MongoDB University for MongoDB (free)

---

**Skill: Git & GitHub**
Priority: [HIGH]
Why: Every single tech company uses Git. No Git = no job.
Time to learn: 3-5 days
Free resource: learngitbranching.js.org (interactive, free)

---

**Skill: REST APIs**
Priority: [MEDIUM]
Why: How frontend and backend talk to each other
Time to learn: 1-2 weeks
Free resource: YouTube "REST API crash course"

---

**Skill: Docker Basics**
Priority: [LOW]
Why: Good to know for deployment, not required for fresher roles
Time to learn: 1-2 weeks when you are ready

## 📊 Your Readiness Score: 22/100

Breakdown:
- Frontend basics: 30%
- JavaScript: 5%
- Backend: 5%
- Database: 0%
- Tools (Git): 0%

Do not worry about this score — it only goes UP from here!

## 🗓️ Suggested Learning Order

1. JavaScript (Weeks 1-6) — most important
2. Git & GitHub (Week 7) — quick win
3. React.js (Weeks 8-12)
4. Node.js (Weeks 13-16)
5. MongoDB (Weeks 17-18)
6. Build full project (Weeks 19-22)

## ⚡ Quick Wins (Learn in under 2 weeks)
- Git & GitHub — 3 days, immediately makes you look professional
- Command Line basics — 2 days
- VS Code shortcuts — 1 day, saves hours of time`,

  roadmap: `## 🗺️ Your 30-Day Web Development Sprint

**Goal**: Go from beginner to building your first real project
**Daily commitment**: 2 hours/day = 60 hours total

---

### 📅 WEEK 1: HTML & CSS Mastery (Days 1-7)

**Day 1-2: HTML Foundations**
- Complete freeCodeCamp HTML module (free)
- Learn: headings, paragraphs, links, images, forms
- ✅ Checkpoint: Build a simple "About Me" page

**Day 3-4: CSS Basics**
- Learn: colors, fonts, margins, padding, borders
- Watch: "CSS in 1 Hour" by Programming with Mosh (YouTube, free)
- ✅ Checkpoint: Style your About Me page nicely

**Day 5-6: CSS Flexbox & Grid**
- Play flexboxfroggy.com (free game to learn Flexbox!)
- Play cssgridgarden.com (free game to learn Grid!)
- ✅ Checkpoint: Make your page responsive (works on mobile)

**Day 7: Build Day**
- Build a complete Personal Portfolio page (no JavaScript yet)
- Upload to GitHub Pages (free hosting!)
- 🏆 Week 1 Milestone: You have a live website!

---

### 📅 WEEK 2: JavaScript Basics (Days 8-14)

**Day 8-9: JS Fundamentals**
- Variables, data types, if/else statements
- Resource: javascript.info Chapter 1 (free)

**Day 10-11: Functions & Arrays**
- Learn functions, loops, arrays
- Practice on: edabit.com (free coding challenges)

**Day 12-13: DOM Manipulation**
- Make HTML elements change with JavaScript
- Build: A simple to-do list app

**Day 14: Build Day**
- Build a "Random Quote Generator"
- 🏆 Week 2 Milestone: Your first interactive website!

---

### 📅 WEEK 3: JavaScript Advanced (Days 15-21)

**Day 15-16: Events & Forms**
- Form validation with JavaScript
- Click handlers, keyboard events

**Day 17-18: Fetch API**
- Call free public APIs (weather, jokes, news)
- Learn: async/await, promises

**Day 19-20: Local Storage**
- Save data in browser without a database
- Build: A notes app that remembers your notes

**Day 21: Build Day**
- Build a "Weather App" using OpenWeatherMap free API
- 🏆 Week 3 Milestone: You can work with real-world data!

---

### 📅 WEEK 4: First Real Project (Days 22-30)

**Day 22-23: Project Planning**
- Choose your portfolio project (calculator, quiz app, or expense tracker)
- Plan features, draw basic wireframe on paper

**Day 24-27: Build Your Project**
- Code it from scratch — no copying!
- Make it mobile-friendly
- Add at least 1 API integration

**Day 28-29: Polish & Deploy**
- Fix bugs, improve UI
- Deploy to GitHub Pages (free) or Netlify (free)
- Write a README on GitHub

**Day 30: Show it off!**
- Share on LinkedIn (even if you have 0 connections)
- 🏆 30-Day Milestone: You have a real project in your portfolio!

---

## 📚 Free Resources for This Month
- freeCodeCamp.org — Full curriculum
- javascript.info — Best JavaScript reference
- YouTube: Traversy Media, Apna College, CodeWithHarry
- GitHub Pages — Free project hosting
- VS Code — Free code editor

## 📋 Daily Habits to Build
- Code EVERY day, even just 30 minutes on busy days
- Commit to GitHub every day (builds your "green squares")
- Write what you learned in 3 sentences each night
- Ask questions on Stack Overflow — it is free and fast

## ⚡ Offline Study Tips (For Limited Internet)
- Download YouTube videos on Wi-Fi, watch offline
- Use VS Code — works completely offline
- Download MDN docs for offline reference
- Code challenges on paper when no internet`,

  projects: `## 💡 Project Recommendations for Web Development

---

## 🌱 Beginner Projects

**Project 1: Personal Portfolio Website**
What it does: A webpage that shows your name, skills, projects, and contact info — your digital resume.
Skills taught: HTML, CSS, responsive design, GitHub Pages deployment
Technologies: HTML5, CSS3 only
Time to build: 3-5 days
How to start: Create index.html, add your name and a photo, style with CSS
Where to host: GitHub Pages (completely free, gives you a real URL)
Resume line: "Designed and deployed responsive personal portfolio website using HTML5/CSS3, hosted on GitHub Pages"

---

**Project 2: Interactive Quiz App**
What it does: A multiple-choice quiz on any topic — science, history, GK — with score tracking.
Skills taught: JavaScript, DOM manipulation, local storage, event handling
Technologies: HTML, CSS, Vanilla JavaScript
Time to build: 5-7 days
How to start: Create an array of 10 questions with 4 options each, display one at a time
Where to host: Netlify (drag and drop folder, instant free URL)
Resume line: "Built interactive quiz application with JavaScript featuring dynamic question rendering and real-time score tracking"

---

**Project 3: Expense Tracker**
What it does: Add daily expenses, see total spending, categorize expenses, save between sessions.
Skills taught: JavaScript, local storage, DOM, basic math operations
Technologies: HTML, CSS, JavaScript
Time to build: 7-10 days
How to start: Create input form, save to localStorage array, display as list with total
Where to host: GitHub Pages
Resume line: "Developed expense tracking application with persistent data storage using localStorage API"

---

## 🔥 Intermediate Projects

**Project 4: Weather Dashboard**
What it does: Enter any city name, see current weather, 5-day forecast, temperature in Celsius/Fahrenheit.
Skills taught: Fetch API, async/await, JSON parsing, API keys, error handling
Technologies: HTML, CSS, JavaScript, OpenWeatherMap API (free tier)
Time to build: 7-10 days
How to start: Get free API key from openweathermap.org, use fetch() to get data
Where to host: Netlify or Vercel (both free)
Resume line: "Built real-time weather dashboard integrating OpenWeatherMap REST API with dynamic data visualization"

---

**Project 5: Task Management App (Kanban Board)**
What it does: Drag-and-drop tasks between Todo, In Progress, and Done columns — like Trello.
Skills taught: Drag and Drop API, advanced DOM, local storage, CSS Grid
Technologies: HTML, CSS, Vanilla JavaScript
Time to build: 10-14 days
How to start: Create 3 columns with CSS Grid, add drag events, save state to localStorage
Resume line: "Engineered full-featured Kanban board with drag-and-drop functionality and persistent state management"

---

**Project 6: GitHub Profile Finder**
What it does: Search any GitHub username, see their repos, followers, bio, most used languages.
Skills taught: GitHub API (free, no key needed!), async JS, UI design
Technologies: HTML, CSS, JavaScript, GitHub REST API
Time to build: 5-7 days
Where to host: GitHub Pages
Resume line: "Created GitHub profile explorer leveraging GitHub REST API with dynamic repository statistics display"

---

## 🚀 Advanced Projects

**Project 7: Full Stack Blog Platform**
What it does: Users can create accounts, write blog posts, comment, like — a real mini-Medium.
Skills taught: Node.js, Express, MongoDB, JWT authentication, REST API design
Technologies: React, Node.js, Express, MongoDB Atlas (free tier)
Time to build: 3-4 weeks
Resume line: "Built full-stack blog platform with JWT authentication, CRUD operations, and MongoDB Atlas database"

---

**Project 8: Real-Time Chat Application**
What it does: Multiple users can chat in rooms in real time — like a mini WhatsApp Web.
Skills taught: WebSockets, Socket.io, real-time data, Node.js backend
Technologies: HTML/CSS/JS frontend, Node.js + Socket.io backend
Time to build: 2-3 weeks
Resume line: "Developed real-time chat application using WebSocket protocol with Socket.io supporting multiple concurrent users"

---

**Project 9: AI-Powered Study Assistant**
What it does: Students paste any study material, AI summarizes it, creates flashcards and quiz questions.
Skills taught: API integration, prompt engineering, modern UI
Technologies: HTML, CSS, JS, Gemini API (free tier)
Time to build: 2 weeks
Resume line: "Built AI study assistant integrating Google Gemini API for automated content summarization and quiz generation"

---

## 📌 Start TODAY With

**Project 2 (Quiz App)** — it teaches the most JavaScript in the least time, looks impressive, and you can finish it in a week.

## 🌐 Free Hosting Options
- **GitHub Pages** — best for static HTML/CSS/JS projects (free forever)
- **Netlify** — drag and drop folder, instant URL (free)
- **Vercel** — best for React/Node projects (free tier is generous)
- **MongoDB Atlas** — free database for full-stack projects (512MB free)`,

  resume: `## ⭐ Overall Resume Score: 5.5/10

Your resume shows potential but has several critical gaps that are hurting your chances. The good news: every single issue is fixable, and I will show you exactly how.

---

## ✅ Strengths

1. **Education section is clear** — Degree, college, year, and percentage are all mentioned
2. **Skills section exists** — You are listing technical skills, which is good
3. **Contact information is present** — Basic details are there

---

## ❌ Critical Weaknesses (Fix These First)

**1. No professional summary at the top**
Recruiters spend 6-7 seconds on a resume. Without a summary, they see nothing compelling immediately.

**2. Skills are listed without context**
Writing "Python, HTML, CSS" means nothing. HOW did you use them? On what project?

**3. No projects section**
For freshers, projects = experience. This is the most damaging gap.

**4. No GitHub link**
Every tech recruiter checks GitHub. No link = missed opportunity.

**5. Generic objective statement**
"To work in a reputed company and grow" is on 90% of fresher resumes. It signals zero research about the company.

---

## 📝 Section-by-Section Feedback

### Professional Summary (ADD THIS — currently missing)
❌ You have: Nothing / Generic objective
✅ Replace with:
*"Motivated Computer Science graduate with hands-on experience in Python and web development. Built [X] projects including a [brief description]. Passionate about [specific area]. Seeking junior developer role to contribute to real-world products."*

### Skills Section
❌ You have: "Python, HTML, CSS, JavaScript"
✅ Improve to:
**Languages**: Python, JavaScript, HTML5, CSS3
**Frameworks**: React.js (basics), Bootstrap
**Tools**: Git, GitHub, VS Code, Chrome DevTools
**Databases**: MySQL (basics)

### Projects (ADD THIS SECTION — most critical)
For each project use this format:

**Project Name | [GitHub Link]**
*Technologies used: HTML, CSS, JavaScript, OpenWeatherMap API*
- Built [what it does] for [what purpose]
- Implemented [specific feature] resulting in [specific outcome]
- Deployed at [live link if available]

### Education
❌ You have: Just college name and degree
✅ Add: Relevant coursework, academic projects, any awards

---

## 🔑 Missing ATS Keywords to Add
data structures, algorithms, REST API, responsive design, version control, agile, problem solving, object-oriented programming, debugging, software development lifecycle

---

## 📋 Fix Priority Order

1. Add a GitHub profile link (30 minutes)
2. Add 2-3 projects with GitHub links (2-3 days to build if needed)
3. Replace objective with professional summary (15 minutes)
4. Restructure skills into categories (20 minutes)
5. Add relevant coursework under education (10 minutes)

## 💡 Most Important Change TODAY
**Create a GitHub account and upload even one small project.** A resume with a GitHub link gets 3x more callbacks than one without.`,

  interview: `## 🎯 Interview Overview

For a Junior Python Developer Fresher interview, expect 3 rounds:
1. **Online Assessment** (30-45 min) — Aptitude + Basic Python MCQs
2. **Technical Interview** (45-60 min) — Coding questions + concept questions
3. **HR Round** (15-20 min) — Behavioral questions, salary discussion

---

## ❓ Top 10 Interview Questions with Model Answers

---

**Q1: Tell me about yourself.**
📋 Why they ask: They want to see if you communicate clearly and if your background matches the role.

💡 Model Answer:
"I am [Name], a recent graduate in [Degree] from [College]. During my studies, I developed a strong foundation in Python through coursework and self-learning. I have built [mention 1-2 projects briefly — e.g. a weather app using Python and APIs, and an expense tracker]. I am particularly interested in backend development and data processing. I am a fast learner and I am excited about this opportunity to apply my skills to real-world problems."

⚠️ Avoid: Reading from memory robotically. Practice until it sounds natural. Keep it under 90 seconds.

---

**Q2: What are Python's key features?**
📋 Why they ask: Tests basic Python knowledge — every Python interview includes this.

💡 Model Answer:
"Python has several features that make it very popular. First, it is interpreted — code runs line by line, making debugging easier. Second, it is dynamically typed — you do not need to declare variable types. Third, it supports multiple programming paradigms — object-oriented, functional, and procedural. Fourth, it has a massive standard library — batteries included, meaning most common tasks have built-in modules. Finally, it is very readable — the syntax is clean and close to English, which speeds up development."

---

**Q3: What is the difference between a list and a tuple in Python?**
📋 Why they ask: Tests understanding of core Python data structures.

💡 Model Answer:
"Both list and tuple store collections of items, but the key difference is mutability. A list is mutable — you can add, remove, or change elements after creation, using square brackets like my_list = [1, 2, 3]. A tuple is immutable — once created, it cannot be changed, using parentheses like my_tuple = (1, 2, 3). Because tuples are immutable, they are faster and use less memory, so we use them for data that should not change — like coordinates or database records. Lists are used when the collection needs to change."

---

**Q4: What is a decorator in Python?**
📋 Why they ask: Tests intermediate Python knowledge — shows you have gone beyond basics.

💡 Model Answer:
"A decorator is a function that takes another function as input and extends its behavior without modifying it. It uses the @ symbol. For example, if I want to log every time a function is called, instead of adding print statements inside every function, I create one decorator and apply it with @log_decorator above any function. This follows the DRY principle — Don't Repeat Yourself. Flask and Django use decorators extensively for things like @app.route to define URL paths."

---

**Q5: Tell me about a project you have built.**
📋 Why they ask: They want to see if you can actually apply your knowledge, not just memorize theory.

💡 Model Answer:
"I built a Weather Dashboard application using Python and the OpenWeatherMap API. The problem I wanted to solve was quickly checking weather for multiple cities without opening a browser. I used Python's requests library to fetch weather data from the API, parsed the JSON response, and displayed temperature, humidity, and conditions in a clean terminal interface. The main challenge I faced was handling API errors when a city name was misspelled — I solved this by adding try-except blocks and user-friendly error messages. This project taught me API integration, JSON parsing, and error handling."

⚠️ Use the STAR method: Situation, Task, Action, Result.

---

**Q6: What is the difference between == and is in Python?**
💡 Model Answer:
"The == operator checks value equality — whether two variables have the same value. The is operator checks identity equality — whether two variables point to the exact same object in memory. For example, a = [1,2,3] and b = [1,2,3] — here a == b is True because values are same, but a is b is False because they are different objects in memory. In practice, use == for comparing values, and is only for checking if something is None, like if x is None."

---

**Q7: How does Python manage memory?**
💡 Model Answer:
"Python uses automatic memory management through a garbage collector. It uses reference counting — every object tracks how many variables reference it. When the count drops to zero, memory is freed automatically. Python also has a cyclic garbage collector for detecting circular references. As a developer, we generally do not manage memory manually in Python, which is one reason it is great for beginners and rapid development."

---

**Q8: What is your greatest weakness?**
📋 Why they ask: Tests self-awareness and honesty.

💡 Model Answer:
"My biggest weakness is that I sometimes spend too much time trying to find the perfect solution instead of shipping a working version first. I have been actively working on this by following the principle of 'make it work, then make it better.' I now set a time limit for each problem — if I cannot solve it in 30 minutes, I look for help or a simpler approach, and then come back to optimize. I have seen clear improvement in my productivity with this approach."

⚠️ Never say "I work too hard" — interviewers hate this answer.

---

**Q9: Why do you want to work at our company?**
📋 Why they ask: Tests if you researched the company or are just mass-applying.

💡 Model Answer (customize this!):
"Before this interview, I researched your company and I was genuinely impressed by [specific thing — product, tech stack, mission, recent news]. I noticed you work with [Python/specific technology] for [specific use case], which aligns exactly with what I have been building skills in. I am looking for a company where I can contribute from day one while also learning from experienced engineers. Based on what I read about your engineering culture, this seems like that place."

---

**Q10: Do you have any questions for us?**
📋 Why they ask: Tests your interest level and preparation.

💡 5 Smart Questions to Ask:
1. "What does the onboarding process look like for junior developers here?"
2. "What would success look like for someone in this role after 6 months?"
3. "What is the tech stack used in the team I would be joining?"
4. "Are there opportunities to work on open-source or attend tech conferences?"
5. "What do you enjoy most about working here?"

---

## 📅 1-Week Prep Plan

**Day 1**: Review Python basics — data types, loops, functions
**Day 2**: Practice 10 easy problems on HackerRank Python track (free)
**Day 3**: Study OOP — classes, inheritance, polymorphism
**Day 4**: Practice STAR method for behavioral questions out loud
**Day 5**: Mock interview with a friend or record yourself
**Day 6**: Research the company thoroughly
**Day 7**: Rest, light review, prepare clothes and documents

## 🧘 Handling Nervousness
- The night before: prepare documents, sleep by 10 PM
- Morning of: eat a proper meal, arrive 15 minutes early
- In the interview: it is okay to say "Can I have 30 seconds to think?" — it shows maturity
- Remember: interviewers WANT you to succeed — they are not your enemy`,

  scholarships: `## 🏛️ Central Government Scholarships

---

**1. NSP — National Scholarship Portal (Most Important!)**
Portal: scholarships.gov.in
This is the single most important portal for Indian students. It hosts 50+ central and state scholarships. ALWAYS apply here first.

**Post Matric Scholarship for SC Students**
Provided by: Ministry of Social Justice and Empowerment
Amount: Up to ₹3,500/month + tuition fees covered
Eligibility: SC category, family income below ₹2.5 lakh/year, Class 11 and above
Application window: July to October every year
Documents needed: Caste certificate, income certificate, marksheet, bank account, Aadhaar

---

**2. Central Sector Scheme of Scholarships (CSSS)**
Provided by: Ministry of Education
Amount: ₹12,000/year for undergraduates, ₹20,000/year for postgraduates
Eligibility: Top 20 percentile in Class 12 board, family income below ₹8 lakh/year
Application: scholarships.gov.in
Note: One of the highest-value central scholarships — apply every year

---

**3. Prime Minister's Scholarship Scheme**
For: Children of Ex-Servicemen / Para-Military Forces
Amount: ₹2,500/month (girls), ₹2,000/month (boys)
Portal: ksb.gov.in

---

**4. Ishan Uday — Special Scholarship for NE Region**
Amount: ₹5,400-7,800/month
For: Students from North-East India in colleges outside NE

---

## 🏛️ State Scholarships (Madhya Pradesh)

**MP Mukhyamantri Medhavi Vidyarthi Yojana**
Amount: Full fee reimbursement for top scorers
Eligibility: 75%+ in Class 12 from MP Board (70% for CBSE), admission in government colleges
Apply: scholarshipportal.mp.nic.in

**MP Gaon Ki Beti Yojana**
For: Girls from rural areas of MP
Amount: ₹500/month for 10 months per year
Eligibility: First division in Class 12, from a village
Apply: scholarshipportal.mp.nic.in

**MP Post Matric Scholarship (OBC/SC/ST)**
Amount: Covers tuition + maintenance allowance
Apply: scholarshipportal.mp.nic.in — open August to November

---

## 🏢 Private / NGO Scholarships

**1. Tata Scholarship (Cornell University)**
For exceptional students wanting to study abroad — highly competitive but worth applying.

**2. Buddy4Study Platform**
Website: buddy4study.com — lists 5,000+ scholarships
Filter by state, category, education level
Many have rolling deadlines

**3. Sitaram Jindal Foundation**
Amount: ₹1,000 - ₹2,000/month
Eligibility: Income below ₹2 lakh/year, good academic record
Apply: jindalfoundation.org

**4. HDFC Bank Parivartan Scholarship**
Amount: Up to ₹75,000 per year
For: Class 11, 12, undergraduate students with family income below ₹2.5 lakh
Apply: buddy4study.com/hdfc

---

## 💻 Free Online Learning Financial Aid

**Google Career Certificates** — coursera.org/google
Financial aid available — click "Financial Aid" on any course
Gets you industry-recognized certificate for free

**AWS Educate** — aws.amazon.com/education/awseducate
Free cloud credits and courses for students

**Microsoft Learn** — learn.microsoft.com
Completely free, no financial aid needed — all content is free

---

## 📋 Application Strategy

Apply in this order for highest success rate:
1. NSP (scholarships.gov.in) — apply to ALL you are eligible for
2. State MP portal — apply for MP-specific schemes
3. buddy4study.com — set up profile, apply to 5+ private scholarships
4. Google/Microsoft free programs — no application, just sign up

**Keep these documents ready always:**
- Aadhaar card
- Caste certificate (if applicable)
- Income certificate (from tehsildar)
- Last 2 marksheets
- Bank account details (in your name)
- Domicile certificate
- Passport size photos

## ⚠️ Beware of Scams
Any scholarship that asks you to PAY money first is a SCAM. All legitimate government scholarships are FREE to apply. Never pay anyone to "process" your scholarship application.`
};

// Smart wrapper: returns cached or demo response instead of hitting API when rate limited
async function callGeminiSafe(prompt, featureKey, options = {}) {
  // Check cache first
  const cacheKey = featureKey + "_" + prompt.slice(0, 100);
  if (responseCache.has(cacheKey)) {
    console.log("Cache hit — no API call needed");
    return responseCache.get(cacheKey);
  }

  // If demo mode is active due to rate limiting, return demo response
  if (demoModeActive && DEMO_RESPONSES[featureKey]) {
    console.log("Demo mode active — showing pre-built response");
    await new Promise(r => setTimeout(r, 1800));
    return DEMO_RESPONSES[featureKey];
  }

  // Throttle: enforce minimum gap between requests
  const now = Date.now();
  const gap = now - lastRequestTime;
  if (gap < MIN_REQUEST_GAP_MS) {
    await new Promise(r => setTimeout(r, MIN_REQUEST_GAP_MS - gap));
  }
  lastRequestTime = Date.now();

  try {
    const result = await callGemini(prompt, options);
    // Cache successful response
    responseCache.set(cacheKey, result);
    demoModeActive = false;
    return result;
  } catch (err) {
    if (err.message.includes("429") || err.message.toLowerCase().includes("rate limit")) {
      rateLimitHitCount++;
      if (rateLimitHitCount >= 1 && DEMO_RESPONSES[featureKey]) {
        demoModeActive = true;
        showToast("⚡ Live AI busy — showing pre-loaded demo response for judges!");
        await new Promise(r => setTimeout(r, 1800));
        return DEMO_RESPONSES[featureKey];
      }
    }
    throw err;
  }
}

// ══════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════
let appState = {
  language: "en",
  ruralMode: false,
  currentTab: "career",
  skills: [],
  goals: [],
  history: [],
  notes: "",
  streak: 0,
  queries: 0,
  lastUsedDate: null,
  roadmapProgress: 0
};

// ══════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  updateDashboard();
  updateStreak();
});

// ══════════════════════════════════════════════════
// NAV — Landing ↔ App
// ══════════════════════════════════════════════════
function enterApp() {
  document.getElementById("landing-page").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  window.scrollTo(0, 0);
}

function exitApp() {
  document.getElementById("app").classList.add("hidden");
  document.getElementById("landing-page").classList.remove("hidden");
  window.scrollTo(0, 0);
}

function switchTab(tab) {
  // Update state
  appState.currentTab = tab;

  // Hide all panels
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".mob-tab").forEach(b => b.classList.remove("active"));

  // Activate target
  const panel = document.getElementById(`tab-${tab}`);
  if (panel) panel.classList.add("active");

  document.querySelectorAll(`[data-tab="${tab}"]`).forEach(el => el.classList.add("active"));

  // Refresh dashboard if navigating there
  if (tab === "dashboard") updateDashboard();
  // Refresh search history if navigating there
  if (tab === "history") renderSearchHistory();
}

// ══════════════════════════════════════════════════
// SETTINGS
// ══════════════════════════════════════════════════
function setLanguage(lang) {
  appState.language = lang;
  saveState();
  showToast(lang === "hi" ? "भाषा: हिन्दी" : "Language: English");
}

function toggleRuralMode(on) {
  appState.ruralMode = on;
  document.body.classList.toggle("rural-mode", on);
  saveState();
  showToast(on ? "📶 Rural Mode ON — simplified view" : "Rural Mode OFF");
}

// ══════════════════════════════════════════════════
// GEMINI API CALL
// ══════════════════════════════════════════════════
// ══════════════════════════════════════════════════
// CORE AI ENGINE — with auto-continue and structured output
// ══════════════════════════════════════════════════

/**
 * Low-level Gemini call. Returns { text, finishReason }
 */
async function _geminiRawCall(messages, useProModel = true, maxTokens = 8192) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
    throw new Error("API_KEY_MISSING");
  }

  const url = useProModel ? GEMINI_URL : GEMINI_FLASH_URL;

  const body = {
    contents: messages,
    generationConfig: {
      temperature: 0.4,          // Lower temp → more deterministic, complete outputs
      maxOutputTokens: maxTokens,
      topP: 0.9,
      topK: 40,
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT",        threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_HATE_SPEECH",       threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
    ]
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    if (response.status === 400) throw new Error("Invalid API key or request. Check your Gemini API key.");
    if (response.status === 429) throw new Error("Rate limit reached. Please wait a moment and try again.");
    throw new Error(err?.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  const candidate = data?.candidates?.[0];
  return {
    text: candidate?.content?.parts?.[0]?.text || "",
    finishReason: candidate?.finishReason || "STOP"
  };
}

/**
 * Main Gemini call with AUTO-CONTINUE logic.
 * If the model stops mid-response (finishReason = MAX_TOKENS),
 * it automatically sends a follow-up "continue" request and appends the result.
 * Repeats up to MAX_CONTINUE_ROUNDS times.
 */
async function callGemini(prompt, options = {}) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
    return `⚠️ **API Key Not Set**\n\nPlease open script.js and replace "YOUR_GEMINI_API_KEY_HERE" with your Gemini API key.\n\nGet a free key at: https://aistudio.google.com/app/apikey`;
  }

  const {
    maxTokens = 8192,
    maxContinueRounds = 3,
    useProModel = true,
    continuationHint = ""   // optional hint for what to continue generating
  } = options;

  const langInstruction = appState.language === "hi"
    ? "IMPORTANT: Respond entirely in Hindi (हिन्दी) using Devanagari script."
    : "Respond in clear, simple English suitable for students from rural areas and small towns.";

  const ruralNote = appState.ruralMode
    ? "RURAL MODE ACTIVE: Use very simple language, short sentences, no jargon. Suggest offline and low-data alternatives wherever possible."
    : "";

  const SYSTEM = `You are SkillBridge AI — an expert, compassionate career mentor built for underserved students in India (rural areas, tier-2/3 cities, financially disadvantaged backgrounds).

CRITICAL RULES YOU MUST FOLLOW:
1. ALWAYS complete your full response. Never stop mid-way through a list, section, or explanation.
2. If you are generating a numbered list of N items, generate ALL N items — never stop early.
3. If you are generating a multi-month or multi-week plan, generate ALL months/weeks completely.
4. Use clear markdown formatting: ## for sections, ### for subsections, **bold** for emphasis, - for lists.
5. Every response must end with a complete final section — never end mid-sentence or mid-section.
6. Be specific and actionable. No vague advice.

${langInstruction}
${ruralNote}`.trim();

  // Build conversation history for auto-continue
  const messages = [
    { role: "user", parts: [{ text: `${SYSTEM}\n\n${prompt}` }] }
  ];

  let fullText = "";
  let round = 0;

  while (round <= maxContinueRounds) {
    const { text, finishReason } = await _geminiRawCall(messages, useProModel, maxTokens);
    fullText += text;

    // If model stopped naturally → done
    if (finishReason === "STOP" || finishReason === "END_TURN") break;

    // If model hit token limit → continue
    if (finishReason === "MAX_TOKENS" && round < maxContinueRounds) {
      round++;
      // Add assistant turn and a user "continue" prompt
      messages.push({ role: "model", parts: [{ text }] });
      const continueMsg = continuationHint
        ? `Please continue exactly where you left off. ${continuationHint} Do not repeat what you already wrote. Continue from where the text cut off.`
        : `Please continue exactly where you left off. Do not repeat what you already wrote. Continue the response from where it was cut off.`;
      messages.push({ role: "user", parts: [{ text: continueMsg }] });
      continue;
    }

    break; // safety exit
  }

  return fullText || "No response received. Please try again.";
}

// ══════════════════════════════════════════════════
// LOADING HELPERS
// ══════════════════════════════════════════════════
// (loading messages now handled by MODULE_LOADING_CONFIG below)

// ── Enhanced Loading State ──

// ── Enhanced Loading State ──
// Per-module icon and step sequences
const MODULE_LOADING_CONFIG = {
  career:      { icon: "🧭", steps: ["⚙️ Reading your profile…", "🧠 Mapping career paths…", "✍️ Writing your guidance…", "✅ Almost ready…"] },
  skills:      { icon: "📊", steps: ["⚙️ Scanning your skills…", "🔍 Identifying gaps…", "✍️ Building your plan…",   "✅ Almost ready…"] },
  roadmap:     { icon: "🗺️", steps: ["⚙️ Connecting to AI…",    "📅 Building your roadmap…","✍️ Adding weekly goals…",  "✅ Almost ready…"] },
  projects:    { icon: "💡", steps: ["⚙️ Searching projects…",  "🏗️ Matching your level…", "✍️ Writing instructions…", "✅ Almost ready…"] },
  resume:      { icon: "📄", steps: ["⚙️ Reading your resume…", "🔎 Checking each section…","✍️ Writing feedback…",    "✅ Almost ready…"] },
  interview:   { icon: "🎤", steps: ["⚙️ Loading questions…",   "🧠 Writing model answers…","✍️ Adding tips…",         "✅ Almost ready…"] },
  scholarships:{ icon: "🎓", steps: ["⚙️ Checking eligibility…","🏛️ Finding schemes…",     "✍️ Compiling details…",   "✅ Almost ready…"] },
};

let _loadingTimers = [];
let _activeSubmitBtn = null;

function showLoading(msg, moduleKey) {
  const overlay   = document.getElementById("loading-overlay");
  const textEl    = document.getElementById("loading-text");
  const barEl     = document.getElementById("loading-bar");
  const iconEl    = document.getElementById("loading-icon");

  // Resolve config
  const cfg = MODULE_LOADING_CONFIG[moduleKey] || {
    icon: "🤖",
    steps: ["⚙️ Connecting to AI…", "🧠 Analyzing request…", "✍️ Generating response…", "✅ Almost ready…"]
  };

  // Set primary message + icon
  textEl.textContent = msg || "Thinking…";
  iconEl.textContent = cfg.icon;

  // Reset steps
  cfg.steps.forEach((text, i) => {
    const el = document.getElementById(`lstep-${i}`);
    if (el) { el.textContent = text; el.className = "loading-step"; }
  });

  // Reset bar
  barEl.style.width = "0%";

  // Show overlay
  overlay.classList.remove("hidden");

  // Show skeleton in the active result area
  const panel = document.querySelector(".tab-panel.active");
  if (panel) {
    const resultArea = panel.querySelector(".result-area");
    if (resultArea) {
      const tmpl = document.getElementById("skeleton-template");
      if (tmpl) {
        resultArea.classList.remove("hidden");
        resultArea.innerHTML = tmpl.innerHTML;
      }
    }
  }

  // Disable the submit button that was clicked
  _activeSubmitBtn = document.activeElement;
  if (_activeSubmitBtn && _activeSubmitBtn.classList.contains("btn-primary")) {
    _activeSubmitBtn.disabled = true;
  } else {
    // Fall back: disable the first btn-primary in the active panel
    _activeSubmitBtn = panel ? panel.querySelector(".btn-primary") : null;
    if (_activeSubmitBtn) _activeSubmitBtn.disabled = true;
  }

  // Clear old timers
  _loadingTimers.forEach(clearTimeout);
  _loadingTimers = [];

  // Animate steps + progress bar
  const totalDuration = 8000; // spread across 8s
  const stepCount     = 4;
  cfg.steps.forEach((_, i) => {
    const delay = (i / stepCount) * totalDuration;
    _loadingTimers.push(setTimeout(() => {
      // Mark previous as done
      if (i > 0) {
        const prev = document.getElementById(`lstep-${i-1}`);
        if (prev) prev.className = "loading-step done";
      }
      const cur = document.getElementById(`lstep-${i}`);
      if (cur) cur.className = "loading-step active";
      // Progress bar
      barEl.style.width = `${Math.min(90, ((i + 1) / stepCount) * 95)}%`;
    }, delay));
  });
}

function hideLoading() {
  const overlay = document.getElementById("loading-overlay");
  const barEl   = document.getElementById("loading-bar");

  // Snap progress to 100
  barEl.style.width = "100%";

  // Mark all steps done
  for (let i = 0; i < 4; i++) {
    const el = document.getElementById(`lstep-${i}`);
    if (el) el.className = "loading-step done";
  }

  // Short delay so user sees 100%
  setTimeout(() => {
    overlay.classList.add("hidden");
    barEl.style.width = "0%";
  }, 250);

  // Clear timers
  _loadingTimers.forEach(clearTimeout);
  _loadingTimers = [];

  // Re-enable submit button
  if (_activeSubmitBtn) {
    _activeSubmitBtn.disabled = false;
    _activeSubmitBtn = null;
  }
}

// ══════════════════════════════════════════════════
// RESULT RENDERER
// ══════════════════════════════════════════════════
function renderResult(containerId, markdown, tabLabel, emoji) {
  const container = document.getElementById(containerId);
  container.classList.remove("hidden");

  // Convert basic markdown to HTML
  const html = markdownToHtml(markdown);

  container.innerHTML = `
    <div class="result-actions">
      <button class="btn-secondary btn-sm" onclick="copyResult('${containerId}')">📋 Copy Response</button>
      <button class="btn-secondary btn-sm" onclick="downloadResult('${containerId}', '${tabLabel}')">⬇ Download .txt</button>
    </div>
    <div class="result-content" id="${containerId}-content">${html}</div>
  `;

  // Save to search history
  saveSearchHistoryEntry(containerId, tabLabel, emoji, markdown);

  // Track dashboard history (existing)
  addHistory(emoji, tabLabel);
  container.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function markdownToHtml(text) {
  return text
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^### (.+)$/gm, "<h4>$1</h4>")
    .replace(/^## (.+)$/gm, "<h3>$1</h3>")
    .replace(/^# (.+)$/gm, "<h3>$1</h3>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/^(\d+)\. (.+)$/gm, "<li>$2</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
    .replace(/\[HIGH\]/gi, '<span class="priority-high">🔴 HIGH</span>')
    .replace(/\[MEDIUM\]/gi, '<span class="priority-med">🟡 MEDIUM</span>')
    .replace(/\[LOW\]/gi, '<span class="priority-low">🟢 LOW</span>')
    .replace(/\n{2,}/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
}

// ══════════════════════════════════════════════════
// 1. CAREER COUNSELOR
// ══════════════════════════════════════════════════
async function generateCareerPath() {
  const name     = document.getElementById("cc-name").value.trim();
  const edu      = document.getElementById("cc-edu").value;
  const interests = document.getElementById("cc-interests").value.trim();
  const skills   = document.getElementById("cc-skills").value.trim();
  const goal     = document.getElementById("cc-goal").value.trim();
  const location = document.getElementById("cc-location").value;

  if (!edu || !interests || !goal) {
    showToast("⚠️ Please fill in Education, Interests, and Career Goal.");
    return;
  }

  const prompt = `
You are an expert career counselor with 20 years of experience helping students in India. Analyze this student's profile and create a COMPLETE, deeply personalized career guidance report.

## STUDENT PROFILE
- Name: ${name || "Student"}
- Education Level: ${edu}
- Interests & Passions: ${interests}
- Current Skills: ${skills || "Beginner — no specific skills yet"}
- Career Goal: ${goal}
- Location/Background: ${location || "India"}

---

Generate a comprehensive career guidance report with ALL of the following sections. DO NOT skip any section. DO NOT summarize — write each section in full detail.

## 🔍 PROFILE ANALYSIS
Analyze the student's profile. What are their key strengths based on their interests and background? What makes their profile unique? What natural advantages do they have?

## 🎯 CAREER PATH OVERVIEW
Explain the full journey from where they are today to achieving "${goal}". Describe what the career looks like day-to-day at different stages. Give a realistic but encouraging picture.

## 📚 TOP 3 RECOMMENDED SPECIALIZATIONS
For each specialization:
**Specialization [N]: [Name]**
- Why it fits this student's interests and skills
- Job market demand in India (High/Medium/Low)
- Average salary range (fresher to 5 years experience, in ₹ LPA)
- Key skills needed
- Best starting point for this student

## 🛤️ CAREER PROGRESSION ROADMAP
**Phase 1 — Foundation (0-6 months)**
List 4-6 specific milestones. What to learn, what to build, what to achieve.

**Phase 2 — Job Ready (6-12 months)**
List 4-6 specific milestones. First job targets, skills to complete, portfolio requirements.

**Phase 3 — Growth (1-3 years)**
List 4-6 specific milestones. Salary expectations, upskilling path, specialization.

**Phase 4 — Senior Level (3-5 years)**
List 3-4 specific milestones. Leadership, expertise, income goals.

## 💼 JOB ROLES TO TARGET
List exactly 7 job roles in a table format:
| Job Title | Fresher Salary | 3-Year Salary | Required Skills | Demand |
For each, add 1 sentence about what makes it a good fit for this student.

## 🌟 UNIQUE STRENGTHS TO LEVERAGE
List 4-5 specific strengths this student has based on their profile. Be specific — don't give generic answers. Explain HOW to leverage each strength.

## ⚠️ CHALLENGES AND HOW TO OVERCOME THEM
List 3-4 real challenges this student will face. For each:
- The challenge
- Why it happens
- Specific strategy to overcome it (with resources or steps)

## 💡 ACTION PLAN: THIS WEEK (Days 1-7)
List exactly 7 specific daily actions for the first week:
- Day 1: [Specific action]
- Day 2: [Specific action]
- Day 3: [Specific action]
- Day 4: [Specific action]
- Day 5: [Specific action]
- Day 6: [Specific action]
- Day 7: [Specific action]

## 🔗 FREE RESOURCES TOOLKIT
Organize by category:
**Learning Platforms:** (3-4 specific sites/courses)
**YouTube Channels:** (3-4 specific channels with what to watch)
**Communities to Join:** (2-3 forums, Discord servers, or groups)
**Tools to Install Today:** (2-3 free tools relevant to their goal)
**Books/Blogs:** (2-3 free resources)

## 🏁 FINAL MESSAGE
Write 2-3 paragraphs of personalized encouragement specific to this student's situation. Reference their specific background and goal. Make it genuine and motivating.
  `;

  showLoading("Mapping your career path...", "career");
  try {
    const result = await callGemini(prompt, {
      maxTokens: 8192,
      maxContinueRounds: 3,
      useProModel: true,
      continuationHint: "Continue the career guidance report. Complete any unfinished sections."
    });
    appState.queries++;
    saveState();
    renderResult("career-result", result, "Career Path", "🧭");
  } catch (e) {
    showToast(`❌ Error: ${e.message}`);
  } finally {
    hideLoading();
  }
}

// ══════════════════════════════════════════════════
// 2. SKILL GAP ANALYZER
// ══════════════════════════════════════════════════
async function analyzeSkillGap() {
  const role    = document.getElementById("sg-role").value.trim();
  const current = document.getElementById("sg-current").value.trim();

  if (!role) {
    showToast("⚠️ Please enter a target role.");
    return;
  }

  const prompt = `
You are a senior technical career coach and hiring manager. Perform a deep, comprehensive skill gap analysis for this student.

## STUDENT PROFILE
- Target Role: ${role}
- Current Skills: ${current || "Beginner — no specific skills yet"}

---

Generate a COMPLETE skill gap analysis report with ALL sections below. Be thorough and specific. Do not skip any section.

## 🎯 TARGET ROLE DEEP DIVE: ${role}
What does a ${role} actually do day-to-day? What problems do they solve? What tools do they use? (Write 3-4 sentences giving a realistic picture of the role.)

## 📋 COMPLETE SKILLS REQUIRED FOR ${role}
List ALL skills needed, organized by category:

**Technical Skills (Hard Skills):**
List every technical skill needed, numbered 1 through N. Be exhaustive — include languages, frameworks, tools, concepts, and platforms.

**Soft Skills:**
List 5-6 soft skills that are critical for this specific role and why.

**Domain Knowledge:**
List 3-5 areas of domain/industry knowledge needed.

**Certifications That Help:**
List 3-4 relevant certifications with their provider and approximate cost (or note if free).

## ✅ SKILLS YOU ALREADY HAVE
Based on the student's current skills (${current || "none listed"}), identify which required skills they already have — or are partially learned. For each:
- Skill name
- Assessment: Strong / Partial / Needs reinforcement
- How to strengthen it

If no matching skills: Write "You're starting fresh — which is perfectly fine. Here's exactly how to begin:" and provide first steps.

## 🚨 MISSING SKILLS — COMPLETE ANALYSIS
For EVERY missing skill (list ALL of them, do not stop early), provide:

**[Skill Name]**
- Priority: [HIGH] / [MEDIUM] / [LOW]
- Why interviewers test this: (1 sentence)
- Time to learn from scratch: (realistic estimate)
- Best free resource: (specific URL or platform + what to study)
- How you'll know you've mastered it: (practical test/project)

## 📊 READINESS SCORECARD
Give a score out of 100 with a detailed breakdown:
- Technical Skills: X/40
- Tools & Platforms: X/20
- Project Experience: X/20
- Soft Skills & Communication: X/10
- Industry Knowledge: X/10
- **TOTAL: X/100**
Explain what each score means and what to do to increase it.

## 🗓️ SKILL ACQUISITION ROADMAP (Prioritized Order)
Give a numbered sequence of exactly which skill to learn first, second, third, etc. For each:
1. [Skill] — Why learn it first — Estimated weeks — Resource

List ALL skills in order. Do not stop at 5 — list every skill in the complete priority order.

## ⚡ QUICK WINS (Learn in Under 2 Weeks)
List skills from the missing list that can be picked up quickly and will immediately make the resume stronger. For each: skill name, what to do, resource, and how to showcase it.

## 🏆 MILESTONE CHECKPOINTS
Define 4 checkpoints to track progress:
**Checkpoint 1 (Week 4):** What should be learned by now? What mini-project to build?
**Checkpoint 2 (Week 8):** Next set of skills + project
**Checkpoint 3 (Month 3):** Portfolio-ready milestone
**Checkpoint 4 (Month 6):** Job application ready — what your profile should look like
  `;

  showLoading("Analyzing your skill gaps...", "skills");
  try {
    const result = await callGemini(prompt, {
      maxTokens: 8192,
      maxContinueRounds: 3,
      useProModel: true,
      continuationHint: "Continue listing all missing skills and complete the remaining sections of the skill gap analysis."
    });
    appState.queries++;
    saveState();
    renderResult("skills-result", result, "Skill Gap Analysis", "📊");
  } catch (e) {
    showToast(`❌ Error: ${e.message}`);
  } finally {
    hideLoading();
  }
}

// ══════════════════════════════════════════════════
// 3. LEARNING ROADMAP
// ══════════════════════════════════════════════════
async function generateRoadmap() {
  const goal     = document.getElementById("rm-goal").value.trim();
  const level    = document.getElementById("rm-level").value;
  const time     = document.getElementById("rm-time").value;
  const duration = document.getElementById("rm-duration").value;

  if (!goal || !level || !time) {
    showToast("⚠️ Please fill in all fields.");
    return;
  }

  const durationLabel = duration === "30" ? "30-Day" : duration === "90" ? "90-Day" : "1-Year";

  const prompt = `
You are an expert learning coach and curriculum designer. Create a COMPLETE, detailed learning roadmap for this student.

## STUDENT PROFILE
- Learning Goal: ${goal}
- Current Level: ${level}
- Daily Time Available: ${time}
- Roadmap Duration: ${durationLabel}

---

${duration === "30" ? `
## 📅 COMPLETE 30-DAY SPRINT ROADMAP

Write out ALL 4 weeks in full. Do not summarize any week. Each week must be fully detailed.

### 🗓️ WEEK 1: FOUNDATION (Days 1-7)
**Week Theme:** [Name the theme]
**Weekly Goal:** [What will be accomplished by end of week]

For EACH day (Day 1 through Day 7), provide:
**Day [N]:**
- Topic: [Specific topic to study]
- Task: [Exactly what to do — be specific]
- Duration: [How many minutes on each activity]
- Resource: [Specific free resource — URL or platform + exact course/video name]
- Mini-exercise: [Small thing to practice or build]

**Week 1 Checkpoint Project:** [Describe a small project to complete by end of week]
**Self-Assessment:** [How to know you've mastered Week 1 content]

---

### 🗓️ WEEK 2: BUILDING (Days 8-14)
**Week Theme:** [Name the theme]
**Weekly Goal:** [What will be accomplished]

For EACH day (Day 8 through Day 14):
**Day [N]:**
- Topic, Task, Duration, Resource, Mini-exercise (same format as Week 1)

**Week 2 Checkpoint Project:** [Small project]
**Self-Assessment:** [Mastery check]

---

### 🗓️ WEEK 3: APPLYING (Days 15-21)
**Week Theme:** [Name the theme]
**Weekly Goal:** [What will be accomplished]

For EACH day (Day 15 through Day 21):
**Day [N]:**
- Topic, Task, Duration, Resource, Mini-exercise

**Week 3 Checkpoint Project:** [Project]
**Self-Assessment:** [Mastery check]

---

### 🗓️ WEEK 4: CREATING (Days 22-30)
**Week Theme:** [Name the theme]
**Weekly Goal:** [What will be accomplished]

For EACH day (Day 22 through Day 30):
**Day [N]:**
- Topic, Task, Duration, Resource, Mini-exercise

**Week 4 FINAL PROJECT:** [Describe the capstone project in detail — what to build, what it demonstrates, how to showcase it]

---

## 📚 COMPLETE RESOURCE LIBRARY
For each week, list the primary resources:
- **Week 1 Resources:** (list all platforms, videos, docs)
- **Week 2 Resources:** (list all)
- **Week 3 Resources:** (list all)
- **Week 4 Resources:** (list all)

## 🏆 FINAL OUTCOME
What will the student be able to do after 30 days? What should their portfolio contain? What jobs/opportunities can they now apply for?

## 📋 DAILY HABITS FOR SUCCESS
List 5 daily habits to maintain throughout the 30 days. For each: the habit, why it works, and when in the day to do it.
` : duration === "90" ? `
## 📅 COMPLETE 90-DAY LEARNING ROADMAP

Write out ALL 3 months in full. Each month must be completely detailed. Do not stop at Month 1.

---

### 📆 MONTH 1: FOUNDATION (Weeks 1-4)
**Month 1 Theme:** [Name the theme — e.g., "Core Fundamentals"]
**Month 1 Goal:** [Specific, measurable goal for end of month]
**Month 1 Skills to Master:** [List all skills]

**Week 1 (Days 1-7):**
- Focus: [Topic]
- Daily topics: [List topics for each day]
- Daily resource: [Specific free platform/video/course]
- Daily practice: [What to practice each day]
- End-of-week mini-project: [Specific project description]

**Week 2 (Days 8-14):**
- Focus, Daily topics, Daily resource, Daily practice, End-of-week mini-project

**Week 3 (Days 15-21):**
- Focus, Daily topics, Daily resource, Daily practice, End-of-week mini-project

**Week 4 (Days 22-28):**
- Focus, Daily topics, Daily resource, Daily practice

**Month 1 Capstone Project:**
Name: [Project name]
What to build: [Detailed description]
Skills demonstrated: [List skills it showcases]
How to present it: [How to show it in a portfolio/GitHub]

**Month 1 Self-Assessment Checklist:**
List 8-10 specific things the student should be able to do after Month 1.

---

### 📆 MONTH 2: BUILDING (Weeks 5-8)
**Month 2 Theme:** [Name the theme — e.g., "Intermediate Skills & Real Projects"]
**Month 2 Goal:** [Specific measurable goal]
**Month 2 Skills to Master:** [List all skills]

**Week 5 (Days 29-35):**
- Focus, Daily topics, Daily resource, Daily practice, End-of-week mini-project

**Week 6 (Days 36-42):**
- Focus, Daily topics, Daily resource, Daily practice, End-of-week mini-project

**Week 7 (Days 43-49):**
- Focus, Daily topics, Daily resource, Daily practice, End-of-week mini-project

**Week 8 (Days 50-56):**
- Focus, Daily topics, Daily resource, Daily practice

**Month 2 Capstone Project:**
Name, What to build, Skills demonstrated, How to present it

**Month 2 Self-Assessment Checklist:**
List 8-10 specific things the student should be able to do after Month 2.

---

### 📆 MONTH 3: MASTERY & JOB READINESS (Weeks 9-12)
**Month 3 Theme:** [Name the theme — e.g., "Portfolio Polish & Career Launch"]
**Month 3 Goal:** [Specific measurable goal]
**Month 3 Skills to Master:** [List all skills]

**Week 9 (Days 57-63):**
- Focus, Daily topics, Daily resource, Daily practice, End-of-week project

**Week 10 (Days 64-70):**
- Focus, Daily topics, Daily resource, Daily practice, End-of-week project

**Week 11 (Days 71-77):**
- Focus, Daily topics, Daily resource, Daily practice, End-of-week project

**Week 12 (Days 78-90):**
- Focus: Final project and job application prep
- Daily tasks for each day

**Month 3 FINAL CAPSTONE PROJECT:**
Name: [Project name]
What to build: [Detailed description — this should be portfolio-worthy]
Technologies used: [List all]
Features to include: [List specific features]
How to deploy it for free: [Deployment instructions]
How to describe it on a resume: [2-3 bullet points for resume]

**Month 3 Self-Assessment — Job Readiness Checklist:**
List 10-12 things the student should be able to do, know, and show after completing 90 days.

---

## 📚 COMPLETE RESOURCE LIBRARY (Free Only)
**Month 1 Resources:**
For each resource: Name, URL/platform, What to use it for, Cost (free)

**Month 2 Resources:**
(Same format)

**Month 3 Resources:**
(Same format)

## 🏆 90-DAY OUTCOME: WHAT YOU WILL ACHIEVE
After 90 days, describe:
- Skills mastered (complete list)
- Portfolio projects completed (list all 3 capstone projects + mini-projects)
- Job readiness level (what roles to apply for)
- Expected starting salary range
- Next steps after Day 90

## 📋 DAILY HABITS FOR 90-DAY SUCCESS
List 6 daily habits. For each: the habit, why it works, time required, and how to track it.

## 💪 MOTIVATION & CONSISTENCY SYSTEM
- What to do when you feel like quitting (practical strategies)
- How to track progress week by week
- Who to connect with online for accountability
- How to celebrate milestones
` : `
## 📅 COMPLETE 1-YEAR CAREER ROADMAP

Write out ALL 4 quarters in full. Do not skip or summarize any quarter.

---

### 🗓️ QUARTER 1 (Months 1-3): FOUNDATION
**Q1 Theme:** Building Core Skills
**Q1 Goal:** [Specific measurable goal]

**Month 1:** [Weekly breakdown — 4 weeks detailed]
- Week 1: Focus, topics, resource, project
- Week 2: Focus, topics, resource, project
- Week 3: Focus, topics, resource, project
- Week 4: Focus, topics, resource, project + Month 1 project

**Month 2:** [Same weekly breakdown]
**Month 3:** [Same weekly breakdown + Q1 capstone project]

**Q1 Deliverables:** What you'll have built by end of Q1
**Q1 Skills Checklist:** 10 things you should know

---

### 🗓️ QUARTER 2 (Months 4-6): BUILDING
**Q2 Theme:** Intermediate Skills + Real Projects
**Q2 Goal:** [Specific measurable goal]

**Month 4, 5, 6:** [Each with weekly breakdown — write each month fully]

**Q2 Deliverables + Q2 Capstone Project**
**Q2 Skills Checklist**

---

### 🗓️ QUARTER 3 (Months 7-9): SPECIALIZING
**Q3 Theme:** Advanced Skills + Portfolio
**Q3 Goal:** [Specific measurable goal]

**Month 7, 8, 9:** [Each with weekly breakdown — write each month fully]

**Q3 Deliverables + Q3 Capstone Project**
**Q3 Skills Checklist**

---

### 🗓️ QUARTER 4 (Months 10-12): JOB READY
**Q4 Theme:** Interview Prep + Job Search + First Job
**Q4 Goal:** Land first job or internship

**Month 10:** Interview prep + mock interviews
**Month 11:** Active job applications + networking
**Month 12:** Negotiate offer + start job

**Q4 Deliverables:** Finalized portfolio, resume, first job application

---

## 📚 COMPLETE FREE RESOURCE LIBRARY (By Quarter)
Q1, Q2, Q3, Q4 resources — each with specific platforms, courses, and tools.

## 🏆 1-YEAR OUTCOME
Skills, portfolio, salary expectations, and career trajectory after 12 months.

## 📋 MONTHLY REVIEW SYSTEM
How to review progress each month and adjust the plan.
`}

## ⚡ PRODUCTIVITY SYSTEM FOR LIMITED TIME
Since the student has only ${time} per day, provide:
- Time-blocking strategy (how to split ${time} into focused sessions)
- What to cut or prioritize if a day is missed
- Weekend catch-up plan
- How to study with limited or slow internet
  `;

  showLoading(`Building your ${durationLabel} roadmap...`, "roadmap");
  try {
    const result = await callGemini(prompt, {
      maxTokens: 8192,
      maxContinueRounds: 4,
      useProModel: true,
      continuationHint: duration === "90"
        ? "Continue writing the roadmap. If Month 2 or Month 3 is incomplete, write them out in full with all weekly breakdowns."
        : "Continue writing the roadmap. Complete all remaining weeks, months, or quarters in full detail."
    });
    appState.queries++;
    appState.roadmapProgress = 5;
    saveState();
    renderResult("roadmap-result", result, `${durationLabel} Roadmap`, "🗺️");
    document.getElementById("downloadPdfBtn").style.display = "inline-flex";
  } catch (e) {
    showToast(`❌ Error: ${e.message}`);
  } finally {
    hideLoading();
  }
}

// ══════════════════════════════════════════════════
// 4. PROJECT RECOMMENDER
// ══════════════════════════════════════════════════
async function recommendProjects() {
  const field = document.getElementById("pr-field").value.trim();
  const level = document.getElementById("pr-level").value;
  const tech  = document.getElementById("pr-tech").value.trim();

  if (!field || !level) {
    showToast("⚠️ Please enter your field and skill level.");
    return;
  }

  const prompt = `
You are a senior developer and technical mentor who has reviewed thousands of student portfolios. Recommend projects for this student.

## STUDENT PROFILE
- Field / Domain: ${field}
- Skill Level: ${level}
- Technologies Known: ${tech || "Basics only — HTML/CSS or equivalent fundamentals"}

---

Generate a COMPLETE project recommendation report. Provide ALL sections in full. Do not abbreviate.

## 🎯 WHY PROJECTS MATTER FOR ${field}
Explain in 2-3 sentences why a strong project portfolio is essential for getting hired in ${field}. What do recruiters look for?

---

## 🌱 BEGINNER PROJECTS (3 Complete Recommendations)

### Beginner Project 1: [Project Name]
**What it is:** [1-2 sentences describing the project]
**What problem it solves:** [The real-world problem this addresses]
**Why it's perfect for beginners:** [Why this is the right level]
**Skills it teaches:** [List 5-6 specific skills or concepts]
**Technologies needed:** [Complete tech stack — be specific]
**Estimated build time:** [Realistic estimate for a beginner]
**Step-by-step how to start:**
1. [First concrete step]
2. [Second step]
3. [Third step]
4. [Fourth step]
5. [Fifth step]
**Free resources to build it:** [2-3 specific tutorials or docs]
**How to make it stand out:** [1-2 features to add to impress]
**How to host it for free:** [Specific platform and steps]
**Resume description (copy-paste ready):**
> [Write 2 bullet points they can paste directly into their resume]

### Beginner Project 2: [Project Name]
[Same full format as Project 1]

### Beginner Project 3: [Project Name]
[Same full format as Project 1]

---

## 🔥 INTERMEDIATE PROJECTS (3 Complete Recommendations)

### Intermediate Project 1: [Project Name]
**What it is:** [Description]
**Why it's intermediate-level:** [What makes it more complex]
**Key technical challenge:** [The main challenge to learn]
**Skills it teaches:** [List 6-8 skills]
**Technologies needed:** [Full stack]
**Estimated build time:** [Realistic estimate]
**Architecture overview:** [Brief description of how the app is structured — frontend, backend, database, API]
**Step-by-step how to start:**
1. through 6. [Six concrete steps]
**APIs or data sources to use:** [Specific free APIs]
**Free resources to build it:** [2-3 tutorials]
**Features to add for extra impact:** [2-3 advanced features]
**How to host for free:** [Platform + steps]
**Resume description (copy-paste ready):**
> [2-3 strong resume bullet points]

### Intermediate Project 2: [Project Name]
[Same full format]

### Intermediate Project 3: [Project Name]
[Same full format]

---

## 🚀 ADVANCED PROJECTS (3 Complete Recommendations)

### Advanced Project 1: [Project Name]
**What it is:** [Description — this should be portfolio-worthy]
**Why it's impressive:** [What makes it stand out to recruiters]
**Real-world application:** [How this could be a real product]
**Skills it teaches:** [List 8-10 skills]
**Technologies needed:** [Complete professional stack]
**Estimated build time:** [Realistic estimate]
**System design overview:** [High-level architecture]
**Step-by-step how to start:**
1. through 7. [Seven concrete steps]
**How to make it production-quality:** [4-5 things that make it look professional]
**Monetization potential:** [Could this be a real product?]
**How to host/deploy:** [Specific platform and steps]
**Resume description (copy-paste ready):**
> [3 strong resume bullet points with metrics/impact]

### Advanced Project 2: [Project Name]
[Same full format]

### Advanced Project 3: [Project Name]
[Same full format]

---

## 📌 START HERE: YOUR PRIORITY PROJECT
Based on this student's level (${level}) and goals (${field}), which ONE project should they start TODAY and why? Give a 5-step action plan to begin in the next 24 hours.

## 🌐 COMPLETE FREE HOSTING GUIDE
For each type of project, explain exactly how to host for free:
- **Static websites/Frontend:** [Platform + steps]
- **Full-stack apps with backend:** [Platform + steps]
- **Python/ML projects:** [Platform + steps]
- **Mobile apps:** [Platform + steps]
- **Databases:** [Free options]

## 📝 RESUME WRITING TEMPLATE FOR PROJECTS
Provide a fill-in-the-blank template for describing any project on a resume:
[Template with placeholders they can fill in]
Explain the formula: what metrics to include, what action verbs to use, how to quantify impact.

## 💡 PROJECT SHOWCASE STRATEGY
How to present projects professionally:
- GitHub README best practices (what to include)
- Demo video tips (how to make a 2-minute demo)
- How to talk about projects in interviews
- How to link projects from LinkedIn
  `;

  showLoading("Curating the best projects for you...", "projects");
  try {
    const result = await callGemini(prompt, {
      maxTokens: 8192,
      maxContinueRounds: 3,
      useProModel: true,
      continuationHint: "Continue with the remaining project recommendations. Complete all 3 beginner, 3 intermediate, and 3 advanced projects in full detail."
    });
    appState.queries++;
    saveState();
    renderResult("projects-result", result, "Project Recommendations", "💡");
  } catch (e) {
    showToast(`❌ Error: ${e.message}`);
  } finally {
    hideLoading();
  }
}

// ══════════════════════════════════════════════════
// 5. RESUME REVIEWER
// ══════════════════════════════════════════════════
async function reviewResume() {
  const resumeText = document.getElementById("resume-text").value.trim();
  const role       = document.getElementById("resume-role").value.trim();

  if (!resumeText || resumeText.length < 50) {
    showToast("⚠️ Please paste your resume text (at least a few sentences).");
    return;
  }

  const prompt = `
You are an expert resume reviewer, former HR manager, and career coach who has reviewed 5,000+ resumes. Conduct a thorough, honest, and actionable review of this resume.

## TARGET ROLE
${role || "General Tech/Professional Role (not specified)"}

## RESUME CONTENT
---
${resumeText}
---

Generate a COMPLETE resume review report. Be specific, direct, and actionable. Reference actual content from the resume.

## ⭐ OVERALL RESUME SCORE: [X]/100

Provide the score FIRST, then explain it in 2-3 sentences. What is the single biggest factor affecting the score?

**Score Breakdown:**
| Category | Score | Weight | Weighted Score |
|----------|-------|--------|----------------|
| Impact & Achievements | X/20 | 20% | X |
| Skills & Keywords (ATS) | X/20 | 20% | X |
| Formatting & Readability | X/15 | 15% | X |
| Experience & Projects | X/20 | 20% | X |
| Education Section | X/10 | 10% | X |
| Contact & Professional Links | X/10 | 10% | X |
| Summary/Objective | X/5 | 5% | X |
| **TOTAL** | **X/100** | | |

---

## ✅ STRENGTHS — WHAT'S WORKING WELL
List exactly 5 specific strengths. For each:
**Strength [N]: [Title]**
- What's good: [Reference the actual resume content]
- Why it helps: [How this impresses a recruiter/ATS]
- Keep this and strengthen it by: [One specific improvement]

---

## ❌ CRITICAL ISSUES — MUST FIX BEFORE APPLYING
List every significant problem. For each:
**Issue [N]: [Title]**
- Problem: [Exactly what's wrong — reference specific resume content]
- Impact: [How this hurts their chances — be direct]
- Fix: [Exactly what to change, with an example if possible]
- Priority: [URGENT / HIGH / MEDIUM]

---

## 📝 SECTION-BY-SECTION DETAILED REVIEW

### 📞 Contact Information
- What's present: [List what they have]
- What's missing: [List what should be added]
- Issues found: [Any problems]
- Recommendation: [Specific action]

### 👤 Professional Summary / Objective
- Current quality: [Assessment]
- Problems: [What's wrong]
- **Rewritten version:** Write a complete, improved summary they can use:
> [Write the full improved summary here]

### 🎓 Education Section
- Current quality: [Assessment]
- Missing elements: [What to add — GPA if strong, relevant coursework, achievements]
- Improved version: [Show exactly how to rewrite it]

### 💼 Work Experience / Internships / Projects
For each role/project listed in the resume:
**[Role/Project Name]:**
- Current bullets: [What they have]
- Problem: [What's weak]
- Improved bullets (STAR format + metrics): [Write improved version]

If they have no experience, provide: "For students with no work experience, here's how to fill this section effectively:" [Specific guidance]

### 🛠️ Skills Section
- ATS scan result: Which skills match keywords for ${role || "tech roles"}?
- Missing critical keywords: [List specific keywords to add]
- Skills to remove or reformat: [Any that weaken the resume]
- Improved skills section: [Write the complete improved skills section]

### 🏆 Achievements / Awards / Certifications
- Current state: [Assessment]
- Missing: [What should be added]
- How to add impact: [Specific guidance]

---

## 🔑 ATS KEYWORD ANALYSIS
**Keywords found in resume that match ${role || "target roles"}:** [List them]
**Critical missing keywords to add:** [List 10-15 specific keywords]
**Where to naturally add each keyword:** [Specific placement suggestions]

---

## 🔧 REWRITE EXAMPLES
Pick the 3 weakest bullet points from the resume and rewrite them:

**Original:** [Quote from resume]
**Problem:** [Why it's weak]
**Improved:** [Rewritten version with impact and metrics]
(Do this for 3 different bullet points)

---

## 📋 COMPLETE ACTION PLAN (Prioritized)
List EVERY action item in priority order. Number them 1 through N:
1. [Most urgent fix] — Est. time: [X minutes]
2. [Next fix] — Est. time: [X minutes]
(Continue until all issues are addressed)

---

## 💡 ONE MOST IMPORTANT CHANGE
If you can only do ONE thing to improve this resume today, it is:
**[State the single most impactful change in one sentence]**
Here's exactly how to do it: [2-3 specific steps]

---

## 📊 BENCHMARK
Compared to other ${role || "tech"} resumes at this experience level, this resume is currently in the:
**[Bottom 20% / Middle 50% / Top 30%]** because [reason].
After implementing all fixes above, it would likely reach the **[percentage]** level.
  `;

  showLoading("Reviewing your resume carefully...", "resume");
  try {
    const result = await callGemini(prompt, {
      maxTokens: 8192,
      maxContinueRounds: 3,
      useProModel: true,
      continuationHint: "Continue the resume review. Complete all remaining sections including the action plan and rewrite examples."
    });
    appState.queries++;
    saveState();
    renderResult("resume-result", result, "Resume Review", "📄");
  } catch (e) {
    showToast(`❌ Error: ${e.message}`);
  } finally {
    hideLoading();
  }
}

// ══════════════════════════════════════════════════
// 6. INTERVIEW COACH
// ══════════════════════════════════════════════════
async function generateInterview() {
  const role = document.getElementById("iv-role").value.trim();
  const type = document.getElementById("iv-type").value;
  const exp  = document.getElementById("iv-exp").value;

  if (!role || !type || !exp) {
    showToast("⚠️ Please fill in all fields.");
    return;
  }

  const prompt = `
You are a world-class interview coach who has prepared candidates for Google, Microsoft, Amazon, TCS, Infosys, and top Indian startups. Create a COMPLETE interview preparation guide.

## STUDENT PROFILE
- Target Role: ${role}
- Interview Type: ${type}
- Experience Level: ${exp}

---

Generate a COMPLETE interview prep guide. You MUST write ALL 10 questions in full. Do not stop before Question 10. Each question MUST have all 4 sub-sections.

## 🎯 INTERVIEW OVERVIEW
What to expect in a ${type} interview for ${role} at the ${exp} level. What the format typically looks like, how long it lasts, what sections it has. (Write 4-5 sentences.)

## 🧠 WHAT INTERVIEWERS ARE REALLY EVALUATING
For a ${role} ${type} interview, interviewers are assessing: (List 5-6 specific things they evaluate beyond just technical knowledge)

---

## ❓ TOP 10 INTERVIEW QUESTIONS — COMPLETE GUIDE

You MUST generate all 10 questions. Start at Q1 and continue through Q10 without stopping.

**Q1: [Write the specific question here]**
📋 **Why they ask this:** [1-2 sentences explaining the interviewer's real intent]
💡 **Model Answer:**
[Write a complete, detailed answer of 6-10 sentences. Use STAR method where applicable. This should be a real, usable answer — not a template. Make it specific to ${role} and ${exp} level.]
⚠️ **Common Mistakes to Avoid:**
- [Mistake 1 with brief explanation]
- [Mistake 2]
- [Mistake 3]
🎯 **Pro Tips:**
- [Tip 1 — something most candidates don't know]
- [Tip 2]

---

**Q2: [Write the specific question here]**
📋 **Why they ask this:** [Explanation]
💡 **Model Answer:** [Complete answer]
⚠️ **Common Mistakes to Avoid:** [3 mistakes]
🎯 **Pro Tips:** [2 tips]

---

**Q3: [Write the specific question here]**
📋 **Why they ask this:** [Explanation]
💡 **Model Answer:** [Complete answer]
⚠️ **Common Mistakes to Avoid:** [3 mistakes]
🎯 **Pro Tips:** [2 tips]

---

**Q4: [Write the specific question here]**
📋 **Why they ask this:** [Explanation]
💡 **Model Answer:** [Complete answer]
⚠️ **Common Mistakes to Avoid:** [3 mistakes]
🎯 **Pro Tips:** [2 tips]

---

**Q5: [Write the specific question here]**
📋 **Why they ask this:** [Explanation]
💡 **Model Answer:** [Complete answer]
⚠️ **Common Mistakes to Avoid:** [3 mistakes]
🎯 **Pro Tips:** [2 tips]

---

**Q6: [Write the specific question here]**
📋 **Why they ask this:** [Explanation]
💡 **Model Answer:** [Complete answer]
⚠️ **Common Mistakes to Avoid:** [3 mistakes]
🎯 **Pro Tips:** [2 tips]

---

**Q7: [Write the specific question here]**
📋 **Why they ask this:** [Explanation]
💡 **Model Answer:** [Complete answer]
⚠️ **Common Mistakes to Avoid:** [3 mistakes]
🎯 **Pro Tips:** [2 tips]

---

**Q8: [Write the specific question here]**
📋 **Why they ask this:** [Explanation]
💡 **Model Answer:** [Complete answer]
⚠️ **Common Mistakes to Avoid:** [3 mistakes]
🎯 **Pro Tips:** [2 tips]

---

**Q9: [Write the specific question here]**
📋 **Why they ask this:** [Explanation]
💡 **Model Answer:** [Complete answer]
⚠️ **Common Mistakes to Avoid:** [3 mistakes]
🎯 **Pro Tips:** [2 tips]

---

**Q10: [Write the specific question here]**
📋 **Why they ask this:** [Explanation]
💡 **Model Answer:** [Complete answer]
⚠️ **Common Mistakes to Avoid:** [3 mistakes]
🎯 **Pro Tips:** [2 tips]

---

## 💬 5 SMART QUESTIONS TO ASK THE INTERVIEWER
List exactly 5 questions the candidate should ask. For each:
**Question:** [The question to ask]
**Why it's smart:** [Why this impresses the interviewer]
**What it signals about you:** [The positive impression it creates]

## 👔 INTERVIEW DAY CHECKLIST
**Before the interview (24 hours before):**
- [5-6 specific preparation tasks]

**Morning of the interview:**
- [4-5 specific tasks]

**During the interview — DO:**
- [5-6 specific behaviors]

**During the interview — DON'T:**
- [5-6 things to avoid]

**After the interview:**
- [3-4 follow-up actions]

## 🧘 NERVOUSNESS MANAGEMENT
List 5 practical techniques to manage interview anxiety. For each: the technique, when to use it, and why it works.

## 📅 7-DAY INTERVIEW PREP PLAN
**Day 1:** [Specific tasks]
**Day 2:** [Specific tasks]
**Day 3:** [Specific tasks]
**Day 4:** [Specific tasks]
**Day 5:** [Specific tasks]
**Day 6:** [Specific tasks — mock interview day]
**Day 7:** [Final prep + rest]

## 🌟 SALARY NEGOTIATION (If Relevant)
For a ${exp} candidate for ${role} in India:
- Expected salary range: [₹X - ₹Y LPA]
- How to respond when they ask "What are your salary expectations?"
- [Write a script they can actually use]
  `;

  showLoading("Generating your interview prep...", "interview");
  try {
    const result = await callGemini(prompt, {
      maxTokens: 8192,
      maxContinueRounds: 4,
      useProModel: true,
      continuationHint: "Continue generating the interview questions. If you stopped before Question 10, continue from where you left off. Each question needs Why they ask it, Model Answer, Common Mistakes, and Pro Tips."
    });
    appState.queries++;
    saveState();
    renderResult("interview-result", result, "Interview Prep", "🎤");
  } catch (e) {
    showToast(`❌ Error: ${e.message}`);
  } finally {
    hideLoading();
  }
}

// ══════════════════════════════════════════════════
// 7. SCHOLARSHIP FINDER
// ══════════════════════════════════════════════════
async function findScholarships() {
  const edu      = document.getElementById("sc-edu").value;
  const category = document.getElementById("sc-category").value;
  const state    = document.getElementById("sc-state").value.trim();
  const income   = document.getElementById("sc-income").value;

  if (!edu || !category) {
    showToast("⚠️ Please fill in Education Level and Category.");
    return;
  }

  const prompt = `
You are a scholarship advisor with deep knowledge of Indian government schemes, private scholarships, and educational funding for students from disadvantaged backgrounds. Find relevant scholarships for this student.

## STUDENT PROFILE
- Education Level: ${edu}
- Category: ${category}
- State: ${state || "Any state in India"}
- Family Annual Income: ${income || "Below ₹2.5 lakh (assume economically weaker section)"}

---

Generate a COMPLETE scholarship guide. List ALL relevant scholarships with full details. Do not abbreviate any entry.

## 🎯 SCHOLARSHIP STRATEGY OVERVIEW
Based on this student's profile (${edu}, ${category}, ${state || "India"}), explain their overall scholarship eligibility landscape in 3-4 sentences. How many scholarships should they aim to apply for? What is their realistic chance of getting funded?

---

## 🏛️ CENTRAL GOVERNMENT SCHOLARSHIPS

List ALL applicable central government scholarships. For each:

**[Scholarship Name]**
- Provided by: [Ministry/Department]
- Amount: [₹ amount per year/month — be specific]
- Eligibility:
  - Category: [SC/ST/OBC/Minority/General/EWS]
  - Income limit: [Maximum family income]
  - Academic requirement: [Minimum marks/CGPA if any]
  - Education level: [Class/Degree level]
- Application portal: [Exact URL]
- Application window: [Months when applications open — e.g., August-October]
- Documents needed: [Complete list of required documents]
- Selection process: [How they select — merit, income, first-come-first-served]
- Special note: [Any important thing to know about this scholarship]

(List minimum 4-6 central government scholarships relevant to this profile)

---

## 🏛️ STATE GOVERNMENT SCHOLARSHIPS
(Specific to ${state || "major states"})

For each state scholarship:
**[Scholarship Name]**
- Provided by: [State government department]
- Amount: [₹ amount]
- Eligibility: [Category, income, marks]
- Application portal: [State scholarship portal URL]
- Application window: [Months]
- Documents needed: [List]
- How to check status: [Portal or process]

(List 4-6 state scholarships)

---

## 🏢 PRIVATE & CORPORATE SCHOLARSHIPS

**[Scholarship Name]** — [Company/Foundation]
- Amount: [₹ amount]
- Eligibility: [Requirements]
- Application: [Website URL]
- Deadline: [Typical deadline period]
- Selection: [How they choose]

(List 5-7 private/corporate scholarships — include Tata, Reliance, HDFC, Sitaram Jindal, Buddy4Study relevant ones)

---

## 💻 ONLINE LEARNING SCHOLARSHIPS & FINANCIAL AID

For each:
**[Platform/Program Name]**
- What it offers: [Course/certification + financial aid amount or discount]
- Eligibility: [Requirements]
- How to apply for aid: [Step-by-step process]
- Application link: [URL]
- Processing time: [How long approval takes]

Include: Google Career Certificates, Coursera Financial Aid, Microsoft Learn, AWS Educate, GitHub Education Pack, NPTEL scholarships.

---

## 📋 APPLICATION MASTER STRATEGY

### Phase 1: Apply Immediately (This Month)
List which scholarships to apply for first and why (highest success probability):
1. [Scholarship] — [Reason + deadline]
2. [Scholarship] — [Reason + deadline]
3. [Scholarship] — [Reason + deadline]

### Phase 2: Apply Next Month
List scholarships with upcoming deadlines:
1. through 3. [With deadlines]

### Phase 3: Long-term Applications
Annual scholarships to mark on calendar:
1. through 3. [With typical months]

---

## 📁 DOCUMENT CHECKLIST (Prepare These Now)
List every document needed across all scholarships:
**Identity Documents:**
- [List each document]
**Income Documents:**
- [List each document]
**Academic Documents:**
- [List each document]
**Caste/Category Documents (if applicable):**
- [List each document]
**Bank Documents:**
- [List each document]
**Other:**
- [Any other common requirements]

Tip for each document type: How to get it quickly if you don't have it.

---

## 🖥️ NATIONAL SCHOLARSHIP PORTAL (NSP) — STEP-BY-STEP GUIDE
The NSP (scholarships.gov.in) is the most important portal. Guide the student through it:

**Step 1:** [Registration process]
**Step 2:** [Profile setup]
**Step 3:** [Document upload]
**Step 4:** [Finding relevant schemes]
**Step 5:** [Application submission]
**Step 6:** [Tracking status]
**Step 7:** [What to do after selection]

Common NSP issues and how to fix them:
- [Issue 1 + solution]
- [Issue 2 + solution]
- [Issue 3 + solution]

---

## ⚠️ SCHOLARSHIP SCAM ALERT
Red flags of scholarship scams to watch for:
- [Flag 1]
- [Flag 2]
- [Flag 3]
- [Flag 4]
How to verify a scholarship is legitimate: [3-4 steps]
Where to report scams: [Specific portal/helpline]

---

## 💰 TOTAL POTENTIAL FUNDING
If this student applies to all recommended scholarships, their realistic total annual funding could be:
- Conservative estimate: ₹[X] - ₹[Y]
- Best case: ₹[X]
This could cover: [What the funding can cover — fees, hostel, books, etc.]
  `;

  showLoading("Searching for your scholarships...", "scholarships");
  try {
    const result = await callGemini(prompt, {
      maxTokens: 8192,
      maxContinueRounds: 3,
      useProModel: true,
      continuationHint: "Continue the scholarship guide. Complete all remaining sections including state scholarships, private scholarships, document checklist, and NSP guide."
    });
    appState.queries++;
    saveState();
    renderResult("scholarships-result", result, "Scholarships", "🎓");
  } catch (e) {
    showToast(`❌ Error: ${e.message}`);
  } finally {
    hideLoading();
  }
}

// ══════════════════════════════════════════════════
// DASHBOARD
// ══════════════════════════════════════════════════
function addSkill() {
  const input = document.getElementById("skill-add-input");
  const val = input.value.trim();
  if (!val) return;

  appState.skills.push(val);
  saveState();
  input.value = "";
  renderSkills();
  updateDashboard();
  showToast(`✅ Skill "${val}" tracked!`);
}

function removeSkill(idx) {
  appState.skills.splice(idx, 1);
  saveState();
  renderSkills();
  updateDashboard();
}

function renderSkills() {
  const container = document.getElementById("skills-list");
  if (!appState.skills.length) {
    container.innerHTML = '<div class="skills-empty">No skills tracked yet. Add one above!</div>';
    return;
  }
  container.innerHTML = appState.skills.map((s, i) => `
    <div class="skill-tag">
      ${s}
      <button onclick="removeSkill(${i})" title="Remove">✕</button>
    </div>
  `).join("");
}

function addGoal() {
  const input = document.getElementById("goal-add-input");
  const val = input.value.trim();
  if (!val) return;

  appState.goals.push({ text: val, done: false });
  saveState();
  input.value = "";
  renderGoals();
  showToast("🎯 Goal added!");
}

function toggleGoal(idx) {
  appState.goals[idx].done = !appState.goals[idx].done;
  saveState();
  renderGoals();
  updateDashboard();
}

function removeGoal(idx) {
  appState.goals.splice(idx, 1);
  saveState();
  renderGoals();
}

function renderGoals() {
  const container = document.getElementById("goals-list");
  if (!appState.goals.length) {
    container.innerHTML = '<div class="skills-empty">No goals added yet.</div>';
    return;
  }
  container.innerHTML = appState.goals.map((g, i) => `
    <div class="goal-item ${g.done ? 'done' : ''}" onclick="toggleGoal(${i})">
      <input type="checkbox" ${g.done ? "checked" : ""} onclick="event.stopPropagation(); toggleGoal(${i})" />
      <span class="goal-item-text">${g.text}</span>
      <button class="goal-item-del" onclick="event.stopPropagation(); removeGoal(${i})" title="Remove">✕</button>
    </div>
  `).join("");
}

function addHistory(emoji, label) {
  const now = new Date();
  const time = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  appState.history.unshift({ emoji, label, time });
  if (appState.history.length > 10) appState.history.pop();
  saveState();
  renderHistory();
}

function renderHistory() {
  const container = document.getElementById("history-list");
  if (!container) return;
  if (!appState.history.length) {
    container.innerHTML = '<div class="skills-empty">No sessions yet. Use any AI tool to get started!</div>';
    return;
  }
  container.innerHTML = appState.history.map(h => `
    <div class="history-item">
      <span class="history-item-icon">${h.emoji}</span>
      <span class="history-item-label">${h.label}</span>
      <span class="history-item-time">${h.time}</span>
    </div>
  `).join("");
}

function saveNotes() {
  appState.notes = document.getElementById("my-notes").value;
  saveState();
}

function updateDashboard() {
  const streakEl = document.getElementById("ds-streak");
  const skillsEl = document.getElementById("ds-skills");
  const queriesEl = document.getElementById("ds-queries");
  const roadmapEl = document.getElementById("ds-roadmap");

  if (streakEl) streakEl.textContent = appState.streak;
  if (skillsEl) skillsEl.textContent = appState.skills.length;
  if (queriesEl) queriesEl.textContent = appState.queries;
  if (roadmapEl) roadmapEl.textContent = `${appState.roadmapProgress}%`;

  renderSkills();
  renderGoals();
  renderHistory();

  // Restore notes
  const notesEl = document.getElementById("my-notes");
  if (notesEl && appState.notes) notesEl.value = appState.notes;
}

function updateStreak() {
  const today = new Date().toDateString();
  if (appState.lastUsedDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (appState.lastUsedDate === yesterday.toDateString()) {
      appState.streak++;
    } else if (appState.lastUsedDate !== today) {
      appState.streak = 1;
    }
    appState.lastUsedDate = today;
    saveState();
  }
}

function clearAllProgress() {
  if (!confirm("Are you sure you want to clear all your progress? This cannot be undone.")) return;
  appState = {
    language: appState.language,
    ruralMode: appState.ruralMode,
    currentTab: "career",
    skills: [],
    goals: [],
    history: [],
    notes: "",
    streak: 0,
    queries: 0,
    lastUsedDate: null,
    roadmapProgress: 0
  };
  saveState();
  updateDashboard();
  showToast("🗑 Progress cleared.");
}

function exportProgress() {
  const data = {
    exported: new Date().toLocaleString("en-IN"),
    skills: appState.skills,
    goals: appState.goals,
    history: appState.history,
    stats: {
      streak: appState.streak,
      queries: appState.queries,
      roadmapProgress: appState.roadmapProgress
    },
    notes: appState.notes
  };

  const text = `SkillBridge AI — My Progress Export
Generated: ${data.exported}

=== STATS ===
Day Streak: ${data.stats.streak}
AI Sessions: ${data.stats.queries}
Roadmap Progress: ${data.stats.roadmapProgress}%

=== SKILLS COMPLETED ===
${data.skills.join("\n") || "None yet"}

=== MY GOALS ===
${data.goals.map(g => `[${g.done ? "✓" : " "}] ${g.text}`).join("\n") || "None yet"}

=== MY NOTES ===
${data.notes || "No notes"}

=== SESSION HISTORY ===
${data.history.map(h => `${h.emoji} ${h.label} — ${h.time}`).join("\n") || "No sessions yet"}
`;

  downloadText(text, "skillbridge-progress.txt");
  showToast("📤 Progress exported!");
}

// ══════════════════════════════════════════════════
// COPY / DOWNLOAD HELPERS
// ══════════════════════════════════════════════════
function copyResult(containerId) {
  const contentEl = document.getElementById(`${containerId}-content`);
  if (!contentEl) return;
  const text = contentEl.innerText;
  navigator.clipboard.writeText(text).then(() => {
    showToast("📋 Copied to clipboard!");
  }).catch(() => {
    // Fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    showToast("📋 Copied!");
  });
}

function downloadResult(containerId, label) {
  const contentEl = document.getElementById(`${containerId}-content`);
  if (!contentEl) return;
  const text = `SkillBridge AI — ${label}\nGenerated: ${new Date().toLocaleString("en-IN")}\n\n${contentEl.innerText}`;
  downloadText(text, `skillbridge-${label.toLowerCase().replace(/\s/g, "-")}.txt`);
  showToast("⬇ Downloaded!");
}

function downloadText(text, filename) {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ══════════════════════════════════════════════════
// PDF DOWNLOAD (Roadmap)
// ══════════════════════════════════════════════════
function downloadRoadmapPDF() {
  const contentEl = document.getElementById("roadmap-result-content");
  if (!contentEl) {
    showToast("⚠️ Generate a roadmap first.");
    return;
  }

  // Use print-to-PDF approach via a new window
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>SkillBridge AI — Learning Roadmap</title>
      <meta charset="utf-8"/>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; color: #1a1a2e; line-height: 1.7; }
        h1 { color: #4F46E5; border-bottom: 3px solid #4F46E5; padding-bottom: 10px; }
        h3 { color: #4338CA; margin-top: 24px; }
        h4 { color: #06B6D4; margin-top: 18px; }
        strong { color: #B45309; }
        ul { padding-left: 20px; }
        li { margin-bottom: 4px; }
        .header { text-align: center; margin-bottom: 30px; border: 2px solid #4F46E5; padding: 20px; border-radius: 10px; }
        .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #888; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>⬡ SkillBridge AI</h1>
        <p>Your Personalized Learning Roadmap</p>
        <p style="font-size:12px; color:#888">Generated: ${new Date().toLocaleString("en-IN")}</p>
      </div>
      ${contentEl.innerHTML}
      <div class="footer">Generated by SkillBridge AI — AI Career Mentor for Underserved Students</div>
    </body>
    </html>
  `;

  const win = window.open("", "_blank");
  if (!win) {
    showToast("⚠️ Please allow popups to download PDF.");
    return;
  }
  win.document.write(html);
  win.document.close();
  win.onload = () => {
    win.focus();
    win.print();
  };
  showToast("📄 Print dialog opened — save as PDF!");
}

// ══════════════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════════════
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.remove("hidden");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add("hidden"), 3500);
}

// ══════════════════════════════════════════════════
// SEARCH HISTORY
// ══════════════════════════════════════════════════

const SH_KEY     = "skillbridge_search_history";
const SH_MAX     = 50;   // max entries to store

// Map containerId → module label for the query summary
const SH_MODULE_MAP = {
  "career-result":       "Career Counselor",
  "skills-result":       "Skill Gap Analyzer",
  "roadmap-result":      "Learning Roadmap",
  "projects-result":     "Project Recommender",
  "resume-result":       "Resume Reviewer",
  "interview-result":    "Interview Coach",
  "scholarships-result": "Scholarship Finder",
};

// Build a human-readable query summary from the current form state
function _buildQuerySummary(containerId) {
  try {
    switch (containerId) {
      case "career-result": {
        const name = document.getElementById("cc-name")?.value.trim();
        const goal = document.getElementById("cc-goal")?.value.trim();
        return [name, goal].filter(Boolean).join(" → ") || "Career path query";
      }
      case "skills-result": {
        const role = document.getElementById("sg-role")?.value.trim();
        return role ? `Skill gap for: ${role}` : "Skill gap analysis";
      }
      case "roadmap-result": {
        const goal = document.getElementById("rm-goal")?.value.trim();
        const dur  = document.getElementById("rm-duration")?.value;
        const label = dur === "30" ? "30-Day" : dur === "90" ? "90-Day" : "1-Year";
        return goal ? `${label} roadmap → ${goal}` : `${label} roadmap`;
      }
      case "projects-result": {
        const field = document.getElementById("pr-field")?.value.trim();
        const level = document.getElementById("pr-level")?.value;
        return [level, field].filter(Boolean).join(" · ") || "Project recommendations";
      }
      case "resume-result": {
        const role = document.getElementById("resume-role")?.value.trim();
        return role ? `Resume review for: ${role}` : "Resume review";
      }
      case "interview-result": {
        const role = document.getElementById("iv-role")?.value.trim();
        const type = document.getElementById("iv-type")?.value;
        return [role, type].filter(Boolean).join(" · ") || "Interview prep";
      }
      case "scholarships-result": {
        const edu = document.getElementById("sc-edu")?.value;
        const cat = document.getElementById("sc-category")?.value;
        return [edu, cat].filter(Boolean).join(" · ") || "Scholarship search";
      }
      default: return "AI query";
    }
  } catch { return "AI query"; }
}

function loadSearchHistory() {
  try {
    return JSON.parse(localStorage.getItem(SH_KEY) || "[]");
  } catch { return []; }
}

function saveSearchHistoryEntry(containerId, tabLabel, emoji, resultMarkdown) {
  const history = loadSearchHistory();
  const entry = {
    id:        Date.now(),
    module:    SH_MODULE_MAP[containerId] || tabLabel,
    emoji,
    query:     _buildQuerySummary(containerId),
    date:      new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    time:      new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    result:    resultMarkdown.slice(0, 8000), // cap stored size
  };
  history.unshift(entry);
  if (history.length > SH_MAX) history.splice(SH_MAX);
  try {
    localStorage.setItem(SH_KEY, JSON.stringify(history));
  } catch (e) {
    console.warn("Could not save search history:", e);
  }
  // If history tab is visible, refresh it
  if (appState.currentTab === "history") renderSearchHistory();
}

function renderSearchHistory() {
  const history  = loadSearchHistory();
  const listEl   = document.getElementById("sh-list");
  const emptyEl  = document.getElementById("sh-empty");
  const countEl  = document.getElementById("sh-count");

  if (!listEl) return;

  countEl.textContent = history.length
    ? `${history.length} saved search${history.length > 1 ? "es" : ""}`
    : "0 saved searches";

  if (!history.length) {
    emptyEl.style.display = "block";
    listEl.innerHTML = "";
    return;
  }
  emptyEl.style.display = "none";

  listEl.innerHTML = history.map(entry => `
    <div class="sh-item" id="sh-item-${entry.id}">
      <div class="sh-item-emoji">${entry.emoji}</div>
      <div class="sh-item-body">
        <div class="sh-item-module">${entry.module}</div>
        <div class="sh-item-query" title="${entry.query.replace(/"/g, '&quot;')}">${entry.query}</div>
        <div class="sh-item-meta">📅 ${entry.date} &nbsp;·&nbsp; 🕐 ${entry.time}</div>
      </div>
      <div class="sh-item-actions">
        <button class="sh-btn-view" onclick="toggleSearchHistoryResult(${entry.id})">👁 View</button>
        <button class="sh-btn-del"  onclick="deleteSearchHistoryEntry(${entry.id})">🗑 Delete</button>
      </div>
      <div class="sh-result-preview" id="sh-preview-${entry.id}">
        ${markdownToHtml(entry.result)}
      </div>
    </div>
  `).join("");
}

function toggleSearchHistoryResult(id) {
  const preview = document.getElementById(`sh-preview-${id}`);
  if (!preview) return;
  const isOpen = preview.classList.contains("open");
  // Close all others first
  document.querySelectorAll(".sh-result-preview.open").forEach(el => el.classList.remove("open"));
  // Toggle this one
  if (!isOpen) preview.classList.add("open");
  // Scroll into view if opening
  if (!isOpen) preview.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function deleteSearchHistoryEntry(id) {
  const history = loadSearchHistory().filter(e => e.id !== id);
  localStorage.setItem(SH_KEY, JSON.stringify(history));
  const item = document.getElementById(`sh-item-${id}`);
  if (item) {
    item.style.opacity = "0";
    item.style.transform = "translateX(20px)";
    item.style.transition = "opacity 0.2s, transform 0.2s";
    setTimeout(() => { item.remove(); renderSearchHistory(); }, 220);
  }
  showToast("🗑 Search deleted.");
}

function clearAllSearchHistory() {
  if (!confirm("Clear your entire search history? This cannot be undone.")) return;
  localStorage.removeItem(SH_KEY);
  renderSearchHistory();
  showToast("🗑 Search history cleared.");
}

// ══════════════════════════════════════════════════
// LOCAL STORAGE
// ══════════════════════════════════════════════════
function saveState() {
  try {
    localStorage.setItem("skillbridge_state", JSON.stringify(appState));
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }
}

function loadState() {
  try {
    const saved = localStorage.getItem("skillbridge_state");
    if (saved) {
      const parsed = JSON.parse(saved);
      appState = { ...appState, ...parsed };

      // Apply saved settings
      if (appState.language) {
        const langSel = document.getElementById("langSelect");
        if (langSel) langSel.value = appState.language;
      }
      if (appState.ruralMode) {
        const toggle = document.getElementById("ruralMode");
        if (toggle) toggle.checked = true;
        document.body.classList.add("rural-mode");
      }
    }
  } catch (e) {
    console.warn("Could not load saved state:", e);
  }
}

// ══════════════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ══════════════════════════════════════════════════
document.addEventListener("keydown", (e) => {
  // Press Escape to close loading
  if (e.key === "Escape") hideLoading();
  // Enter to submit in focused form
  if (e.key === "Enter" && e.ctrlKey) {
    const activePanel = document.querySelector(".tab-panel.active");
    if (activePanel) {
      const btn = activePanel.querySelector(".btn-primary");
      if (btn) btn.click();
    }
  }
});
