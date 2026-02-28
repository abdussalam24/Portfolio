import { useState, useEffect } from 'react'
import './App.css'

const GITHUB_USERNAME = 'abdussalam24'

function App() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [displayText, setDisplayText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const roles = ['Full Stack Developer', 'Cloud Architect', 'UI/UX Enthusiast', 'Problem Solver']

  useEffect(() => {
    // Fetch GitHub Repos once
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Filter out unwanted repositories
          const unwanted = ['aashirproject', 'cipher', 'My-Portfolio', 'Portfolio', 'HR-JD-system', 'workshop', 'Auto-Workshop-Website']
          let filtered = data.filter(repo => !unwanted.includes(repo.name))

          // Move HR project to the end if it exists
          const hrProject = filtered.find(p => p.name === 'HR-CV-JD-Match-Assistant')
          if (hrProject) {
            filtered = [...filtered.filter(p => p.name !== 'HR-CV-JD-Match-Assistant'), hrProject]
          }

          setProjects(filtered.slice(0, 6)) // Still show max 6 projects
        }
        setLoading(false)
      })
      .catch(err => {
        console.error("Error fetching projects:", err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const currentRole = roles[roleIndex]

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing characters
        setDisplayText(currentRole.substring(0, displayText.length + 1))

        if (displayText === currentRole) {
          // Pause when word is complete
          setTimeout(() => setIsDeleting(true), 2000)
          return
        }
      } else {
        // Deleting characters
        setDisplayText(currentRole.substring(0, displayText.length - 1))

        if (displayText === '') {
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % roles.length)
          return
        }
      }
    }

    const speed = isDeleting ? 100 : 250
    const timer = setTimeout(handleTyping, speed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, roleIndex])

  return (
    <div className="app">
      <nav className="navbar glass">
        <div className="container">
          <div className="logo text-gradient" style={{ fontSize: '1.8rem' }}>Abdussalam.dev</div>
          <ul className="nav-links">
            <li>
              <a href="#home" className="nav-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                About
              </a>
            </li>
            <li>
              <a href="#projects" className="nav-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                Projects
              </a>
            </li>
            <li>
              <a href="#skills" className="nav-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                Skills
              </a>
            </li>
          </ul>
          <a href="#contact" className="btn-primary" style={{ padding: '0.6rem 1.4rem' }}>Let's Talk</a>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero container">
          <div className="hero-content">
            <span className="hero-greeting">Hi There! 👋</span>
            <h1 className="hero-title" style={{ fontSize: '4.5rem', marginBottom: '1.5rem' }}>
              I'M <span className="text-gradient">ABDUSSALAM</span>
            </h1>
            <h2 style={{ fontSize: '2.5rem', minHeight: '1.2em' }}>
              A <span className="text-gradient typing-cursor">{displayText}</span>
            </h2>
            <p className="hero-description" style={{ fontSize: '1.2rem', marginTop: '2rem', maxWidth: '600px', color: 'var(--text-secondary)' }}>
              I am a passionate Full Stack Developer with 3+ years of experience in building
              high-quality web applications. I love turning complex problems into simple, beautiful, and intuitive designs.
            </p>
            <div className="hero-btns" style={{ marginTop: '3rem' }}>
              <a href="#projects" className="btn-primary">View My Work</a>
              <a href="/resume.pdf" download="Muhammad_Abdussalam_Resume.pdf" className="btn-secondary">Resume</a>
            </div>
          </div>
          <div className="hero-avatar-container">
            <div className="avatar-glow"></div>
            <img src="/avatar.png" alt="Abdussalam" className="hero-avatar" />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section-padding" style={{ borderTop: '1px solid var(--border-color)' }}>
          <div className="container">
            <h2 className="section-title">About <span className="text-gradient">Me</span></h2>

            <div className="about-grid">
              {/* Left — Stats */}
              <div className="about-left">

                <div className="about-stats-grid">
                  {[
                    { label: 'Years Experience', value: '3+' },
                    { label: 'Projects Built', value: '10+' },
                    { label: 'Technologies', value: '12+' },
                    { label: 'Certifications', value: '5+' },
                  ].map(stat => (
                    <div key={stat.label} className="about-stat-card glass">
                      <div className="about-stat-value text-gradient">{stat.value}</div>
                      <div className="about-stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Bio & details */}
              <div className="about-right">
                <div className="about-bio">
                  <h3>
                    Full Stack Developer &amp; <span className="text-gradient">Cloud Enthusiast</span>
                  </h3>
                  <p>
                    Hi! I'm <strong>Muhammad Abdussalam</strong>, a passionate Full Stack Developer with 3+ years of hands-on experience crafting high-quality web applications. I thrive on turning complex problems into simple, beautiful and intuitive digital solutions.
                  </p>
                  <p>
                    My work spans the entire stack — from pixel-perfect frontends in <strong>React</strong> &amp; <strong>HTML/CSS</strong>, through robust <strong>Node.js / PHP / Laravel</strong> backends, all the way to cloud deployments on <strong>AWS</strong>. I'm equally comfortable with data analytics using Python.
                  </p>
                </div>

                {/* Info grid */}
                <div className="about-info-grid">
                  {[
                    { icon: '🎓', label: 'Degree', value: 'B.Sc. Computer Science' },
                    { icon: '📍', label: 'Location', value: 'Pakistan' },
                    { icon: '💌', label: 'Email', value: 'muhammadabdussalam593@gmail.com' },
                    { icon: '🔗', label: 'LinkedIn', value: 'abdus-salam-8180a3238' },
                  ].map(item => (
                    <div key={item.label} className="about-info-card glass">
                      <span className="about-info-icon">{item.icon}</span>
                      <div>
                        <div className="about-info-label">{item.label}</div>
                        <div className="about-info-value">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section-padding" style={{ borderTop: '1px solid var(--border-color)' }}>
          <div className="container">
            <h2 className="section-title">My Recent <span className="text-gradient">Projects</span></h2>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '6rem' }}>Loading repositories...</div>
            ) : (
              <div className="projects-list">
                {projects.map((repo, idx) => {

                  const projectLiveLinks = {
                    'peer-to-peer-learning-': 'https://peer-to-peer-learning-orcin.vercel.app/',
                    'EV-Population-Analytics': 'https://ev-population-analytics.vercel.app/',
                    'HR-CV-JD-Match-Assistant': 'https://your-hr-assistant-link.vercel.app',
                    'Auto-Workshop': 'https://auto-workshop-r3iw.vercel.app/',
                    'kitchen': 'https://kitchen-two-iota.vercel.app/'
                  }

                  const projectImages = {
                    'peer-to-peer-learning-': '/image1.png',
                    'EV-Population-Analytics': '/image.png',
                    'HR-CV-JD-Match-Assistant': '/projects/hr_assistant.png',
                    'Auto-Workshop': '/projects/auto_workshop.png',
                    'kitchen': '/projects/1235345.png'
                  }

                  const projectDescriptions = {
                    'Auto-Workshop': "A full-stack project built with HTML, CSS, JS, SQL, and PHP. Designed for seamless appointment booking and effectively addressing customer queries via email and phone.",
                    'kitchen': "A web app built with the MERN stack that delivers fast performance and seamless user experience. An AI chatbot provides instant support, answers queries, and improves customer engagement 24/7.",
                    'EV-Population-Analytics': "A data-driven application that visualizes and analyzes electric vehicle population distributions using Python, Pandas, and modern web visualization libraries.",
                    'HR-CV-JD-Match-Assistant': "An AI-powered tool that parses resumes (CVs) and Job Descriptions (JDs) to provide a matching percentage and detailed analysis, helping HR teams streamline the recruitment process."
                  }

                  const projectTechStacks = {
                    'Auto-Workshop': ['PHP', 'HTML', 'CSS', 'JavaScript', 'SQL'],
                    'peer-to-peer-learning-': ['React', 'Node.js', 'Express', 'MongoDB'],
                    'EV-Population-Analytics': ['Python', 'Pandas', 'React', 'Data Viz'],
                    'HR-CV-JD-Match-Assistant': ['React', 'Node.js', 'AI Integration'],
                    'kitchen': ['React', 'Node.js', 'Express', 'MongoDB']
                  }

                  const liveUrl = projectLiveLinks[repo.name] || '#'
                  const imageUrl = projectImages[repo.name] || '/projects/default.png'
                  const techStack = projectTechStacks[repo.name] || (repo.language ? [repo.language, 'React', 'Node.js'] : ['React', 'Node.js', 'Database'])

                  const features = [
                    "Responsive and Modern UI design",
                    "Optimized Performance & SEO",
                    "Secure API Integration",
                    "Clean & Scalable Codebase"
                  ]

                  return (
                    <div key={repo.id} className="project-row">
                      <div className="project-visual">
                        <img src={imageUrl} alt={repo.name} />
                      </div>
                      <div className="project-info">
                        <span className="project-num">0{idx + 1}</span>
                        <h3 className="project-name">{repo.name.split('-').join(' ').split('_').join(' ')}</h3>
                        <p className="project-description">
                          {projectDescriptions[repo.name] || repo.description || "A high-performance application built with modern engineering practices, focusing on user experience and scalability."}
                        </p>

                        <div className="project-features">
                          {features.map(f => (
                            <div key={f} className="feature-item">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                              {f}
                            </div>
                          ))}
                        </div>

                        <div className="project-tech-stack">
                          {techStack.map(tech => (
                            <span key={tech} className="tech-pill">{tech}</span>
                          ))}
                        </div>

                        <div className="project-actions">
                          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.8rem 1.8rem', fontSize: '0.9rem' }}>
                            Github Repo
                          </a>
                          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.8rem 1.8rem', fontSize: '0.9rem' }}>
                            Live Demo
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section-padding" style={{ background: 'rgba(255,255,255,0.01)' }}>
          <div className="container">
            <h2 className="section-title">Technical <span className="text-gradient">Proficiency</span></h2>
            <div className="grid skills-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
              {[
                { name: 'HTML5', icon: '🌐' },
                { name: 'CSS3', icon: '🎨' },
                { name: 'JavaScript', icon: '🟨' },
                { name: 'React', icon: '⚛️' },
                { name: 'Node.js', icon: '🟢' },
                { name: 'PHP', icon: '🐘' },
                { name: 'Laravel', icon: '🏗️' },
                { name: 'Python', icon: '🐍' },
                { name: 'C++', icon: '💻' },
                { name: 'MySQL', icon: '🐬' },
                { name: 'SQL', icon: '💾' },
                { name: 'AWS', icon: '☁️' }
              ].map((skill) => (
                <div key={skill.name} className="skill-card glass" style={{ padding: '2rem 1rem', textAlign: 'center' }}>
                  <span className="skill-icon" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}>{skill.icon}</span>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>{skill.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-padding">
          <div className="container">
            <div className="contact-card glass" style={{ padding: '5rem', borderRadius: '30px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Let's Work <span className="text-gradient">Together</span></h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                I'm currently available for freelance work and full-time opportunities.
                If you have a project that needs some creative injection, I'm your guy.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <a href="mailto:hello@abdussalam.dev" className="btn-primary" style={{ padding: '1.2rem 3rem' }}>Get In Touch</a>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <a href={`https://www.linkedin.com/in/abdus-salam-8180a3238/`} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '1.2rem 2rem' }}>LinkedIn</a>
                  <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '1.2rem 2rem' }}>Github</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)', textAlign: 'center', background: 'var(--surface-color)' }}>
        <div className="container">
          <div className="logo text-gradient" style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>Abdussalam.dev</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', opacity: 0.8 }}>
            Designed & Built with 💜 by Abdussalam.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '1rem', opacity: 0.5 }}>
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
