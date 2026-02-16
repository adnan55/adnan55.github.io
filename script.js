/* ===================================
   AutoArchitect.me - Interactive System v2.0
   =================================== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initMermaid();
    initScrollReveal();
    initSkillBars();
    initTypewriterEffect();
    initSmoothScroll();
    initNavbarScroll();
    initActivityLog();
    initExecutionsCounter();
    initTerminal();
    initPipelineTabs();
    initCodeModal();
    initManualOverride();
});

/* ===================================
   Mermaid.js Initialization
   =================================== */
function initMermaid() {
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'dark',
            themeVariables: {
                primaryColor: '#1a1a25',
                primaryTextColor: '#f0f0f5',
                primaryBorderColor: '#00FF41',
                lineColor: '#00D1FF',
                secondaryColor: '#12121a',
                tertiaryColor: '#0a0a0f',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '14px'
            },
            flowchart: {
                curve: 'basis',
                padding: 20
            }
        });
    }
}

/* ===================================
   Scroll Reveal Animation
   =================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.project-card, .stack-category, .code-window, .pipeline-container');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
                if (entry.target.classList.contains('project-card')) {
                    const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 150;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

/* ===================================
   Skill Bars Animation
   =================================== */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.getPropertyValue('--fill');
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        const targetWidth = bar.style.getPropertyValue('--fill');
        bar.style.setProperty('--fill', targetWidth);
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

/* ===================================
   Typewriter Effect
   =================================== */
function initTypewriterEffect() {
    const prompt = document.querySelector('.hero-prompt');
    if (!prompt) return;

    const text = prompt.textContent.replace('_', '');
    prompt.innerHTML = '<span class="typed-text"></span><span class="cursor">_</span>';

    const typedText = prompt.querySelector('.typed-text');
    let charIndex = 0;

    function typeChar() {
        if (charIndex < text.length) {
            typedText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 50 + Math.random() * 50);
        }
    }

    setTimeout(typeChar, 500);
}

/* ===================================
   Smooth Scrolling
   =================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===================================
   Navbar Scroll Effect
   =================================== */
function initNavbarScroll() {
    const nav = document.querySelector('.nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });
}

/* ===================================
   Activity Log (NEW)
   =================================== */
const activityMessages = [
    { level: 'info', message: 'Scanning LinkedIn profile...', highlight: 'VALID' },
    { level: 'success', message: 'Lead validation complete:', highlight: '99.9% accuracy' },
    { level: 'info', message: 'Gemini CLI clustering archetypes...', highlight: '' },
    { level: 'success', message: 'Lists scraped this batch:', highlight: '54+ complete' },
    { level: 'warn', message: 'Regex detected malformed email:', highlight: 'FLAGGED' },
    { level: 'info', message: 'DOM structure extracted from website #', highlight: '47' },
    { level: 'success', message: 'AI prompts generated:', highlight: '50,000+ unique' },
    { level: 'info', message: 'Running SSIM comparison...', highlight: '' },
    { level: 'success', message: 'Product variants extracted:', highlight: '228,000+' },
    { level: 'info', message: 'Checkpoint saved for 25hr+ extraction...', highlight: '' },
    { level: 'success', message: 'Pipeline execution:', highlight: 'OPTIMAL' },
    { level: 'info', message: 'Mobile API simulation active...', highlight: 'BYPASSED' },
    { level: 'warn', message: 'Dead LinkedIn link detected:', highlight: 'QUEUED' },
    { level: 'success', message: 'Hallucination detection:', highlight: 'Perfect Match' },
    { level: 'info', message: 'Local RAG processing with Ollama...', highlight: '' },
    { level: 'info', message: 'Syncing Gmail via Apps Script...', highlight: 'ACTIVE' },
    { level: 'success', message: 'Financial dashboard deployed:', highlight: 'LIVE' },
    { level: 'info', message: 'Parsing invoice attachment...', highlight: 'OCR' },
    { level: 'warn', message: 'Duplicate transaction detected:', highlight: 'SKIPPED' },
    { level: 'success', message: 'Zero-data leakage privacy check:', highlight: 'PASSED' }
];

let logIndex = 0;

function initActivityLog() {
    const logContainer = document.getElementById('activity-log');
    if (!logContainer) return;

    function addLogEntry() {
        const msg = activityMessages[logIndex % activityMessages.length];
        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });

        const entry = document.createElement('div');
        entry.className = 'log-entry';

        const levelClass = msg.level === 'success' ? 'level-success' :
            msg.level === 'warn' ? 'level-warn' : 'level-info';

        entry.innerHTML = `
            <span class="timestamp">[${timestamp}]</span>
            <span class="${levelClass}">[${msg.level.toUpperCase()}]</span>
            <span class="message">${msg.message}</span>
            ${msg.highlight ? `<span class="highlight">${msg.highlight}</span>` : ''}
        `;

        logContainer.appendChild(entry);

        // Keep only last 8 entries
        while (logContainer.children.length > 8) {
            logContainer.removeChild(logContainer.firstChild);
        }

        // Scroll to bottom
        logContainer.scrollTop = logContainer.scrollHeight;

        logIndex++;
    }

    // Add initial entries
    for (let i = 0; i < 5; i++) {
        setTimeout(() => addLogEntry(), i * 200);
    }

    // Continue adding entries
    setInterval(addLogEntry, 3000);
}

/* ===================================
   Executions Counter (NEW)
   =================================== */
function initExecutionsCounter() {
    const counter = document.getElementById('executions-counter');
    if (!counter) return;

    const targetValue = 54200;
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(easeOutQuart * targetValue);

        counter.textContent = currentValue.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    // Start animation when visible
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            requestAnimationFrame(updateCounter);
            observer.disconnect();
        }
    }, { threshold: 0.5 });

    observer.observe(counter);
}

/* ===================================
   Interactive Terminal (Enhanced v2.5)
   =================================== */

// Global terminal state
const terminalState = {
    commandHistory: [],
    historyIndex: -1,
    blogCache: null,
    currentBlog: null
};

// Enhanced terminal commands
const terminalCommands = {
    help: `
<span class="terminal-success">╔══════════════════════════════════════════╗</span>
<span class="terminal-success">║     AutoArchitect CLI v2.5 - HELP       ║</span>
<span class="terminal-success">╚══════════════════════════════════════════╝</span>

<span class="terminal-command">NAVIGATION:</span>
  help                    - Show this help message
  list-projects           - Display all featured blueprints
  run [project]           - Navigate to project pipeline
                           (archetype | lead | visionqa)
  
<span class="terminal-command">SYSTEM INFO:</span>
  whoami                  - Display developer profile
  contact                 - Show contact information
  status                  - Show system status
  tree                    - Display portfolio structure

<span class="terminal-command">BLOG SYSTEM:</span>
  cat logs/               - List all blog posts
  read log [id]           - Read specific blog post (001-005)
  grep [keyword]          - Search through blogs and projects

<span class="terminal-command">PROJECT SHOWCASE:</span>
  showcase [project]      - Detailed project breakdown
                           (crawler | sentinel | cloner)
  demo [project]          - View project code examples
  
<span class="terminal-command">UTILITIES:</span>
  clear                   - Clear terminal
  history                 - Show command history
  ascii                   - Display ASCII banner

<span class="terminal-info">TIP: Use ↑/↓ arrows for command history</span>
`,

    whoami: `
<span class="terminal-success">IDENTITY: Automation Architect</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I build <span class="terminal-success">invisible engines</span> that solve visible problems.

<span class="terminal-command">Specializations:</span>
  → Scalable web scraping & data extraction
  → B2B data sanitization & validation
  → Computer Vision QA automation
  → LLM-powered workflow design
  → Local RAG systems for data privacy

<span class="terminal-command">Philosophy:</span>
  "If you're doing it manually more than twice,
   it's time to automate."

<span class="terminal-command">Core Metrics:</span>
  • 228,000+ product variants extracted
  • 54+ pipeline deployments
  • 50,000+ AI images validated
  • 99.9% system reliability
`,

    contact: `
<span class="terminal-success">CONTACT INFORMATION</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  📧 Email:    <span class="terminal-command">beingadnan55@gmail.com</span>
  🔗 LinkedIn: <span class="terminal-command">linkedin.com/in/adnan-ansari-ab9038124</span>
  💻 GitHub:   <span class="terminal-command">github.com/adnan55</span>
  🌐 Website:  <span class="terminal-command">adnan55.github.io</span>

<span class="terminal-info">Type 'run discovery_script.sh' for a guided tour.</span>
`,

    status: `
<span class="terminal-success">SYSTEM STATUS</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  System:       <span class="terminal-success">OPERATIONAL</span>
  Uptime:       <span class="terminal-success">99.9%</span>
  Executions:   <span class="terminal-success">54,200+</span>
  Health:       <span class="terminal-success">OPTIMAL</span>
  
  <span class="terminal-command">Active Subsystems:</span>
  ┌──────────────────────┬──────────┐
  │ Resilient Crawler    │ ✓ ONLINE │
  │ Vision Sentinel      │ ✓ ONLINE │
  │ Lead Integrity      │ ✓ ONLINE │
  │ Archetype Cloner    │ ✓ ONLINE │
  │ Local RAG Engine    │ ✓ ONLINE │
  └──────────────────────┴──────────┘

  All subsystems nominal.
`,

    tree: `
<span class="terminal-success">PORTFOLIO STRUCTURE</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

autoarchitect.me/
├── blueprints/
│   ├── resilient_crawler/
│   │   ├── checkpointing.py
│   │   ├── mobile_api.py
│   │   └── 228,000+ variants extracted
│   ├── vision_sentinel/
│   │   ├── ssim_comparison.py
│   │   ├── heatmap_overlay.py
│   │   └── 50,000+ images validated
│   └── archetype_cloner/
│       ├── gemini_clustering.py
│       ├── pattern_recognition.py
│       └── 60+ websites analyzed
├── pipelines/
│   ├── lead_integrity/
│   ├── archetype_engine/
│   └── visionqa/
├── logs/
│   ├── LOG_001_extraction_problem.md
│   ├── LOG_002_cv_vs_fatigue.md
│   ├── LOG_003_mobile_pivot.md
│   ├── LOG_004_local_rag.md
│   └── LOG_005_inbox_to_insights.md
├── projects/
│   ├── financial-automation-Code.gs
│   └── financial-automation-Dashboard.html
└── tech_stack/
    ├── Python (95%)
    ├── Selenium + OpenCV
    ├── Gemini CLI
    └── Ollama (Local RAG)

<span class="terminal-info">Use 'showcase [project]' for detailed breakdown</span>
`,

    ascii: `
<span class="terminal-success">
 █████╗ ██╗   ██╗████████╗ ██████╗  █████╗ ██████╗  ██████╗██╗  ██╗
██╔══██╗██║   ██║╚══██╔══╝██╔═══██╗██╔══██╗██╔══██╗██╔════╝██║  ██║
███████║██║   ██║   ██║   ██║   ██║███████║██████╔╝██║     ███████║
██╔══██║██║   ██║   ██║   ██║   ██║██╔══██║██╔══██╗██║██║  ██║
██║  ██║╚██████╔╝   ██║   ╚██████╔╝██║  ██║██║  ██║╚██████╗██║  ██║
╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
</span>
           <span class="terminal-info">━━━ Building Invisible Engines ━━━</span>
`
};

function initTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    if (!input || !output) return;

    // Command execution on Enter
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim();
            executeCommand(command, output);
            input.value = '';
        }
        // Command history navigation
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (terminalState.historyIndex < terminalState.commandHistory.length - 1) {
                terminalState.historyIndex++;
                input.value = terminalState.commandHistory[terminalState.commandHistory.length - 1 - terminalState.historyIndex] || '';
            }
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (terminalState.historyIndex > 0) {
                terminalState.historyIndex--;
                input.value = terminalState.commandHistory[terminalState.commandHistory.length - 1 - terminalState.historyIndex] || '';
            } else if (terminalState.historyIndex === 0) {
                terminalState.historyIndex = -1;
                input.value = '';
            }
        }
    });
}

function executeCommand(cmd, output) {
    const originalCmd = cmd;
    cmd = cmd.toLowerCase();

    // Add to history
    if (cmd && cmd !== terminalState.commandHistory[terminalState.commandHistory.length - 1]) {
        terminalState.commandHistory.push(originalCmd);
    }
    terminalState.historyIndex = -1;

    // Process the command
    processCommand(cmd, output);
}

async function processCommand(cmd, output) {
    // Add command to output
    addTerminalLine(output, `<span class="terminal-prompt">guest@autoarchitect:~$</span> <span class="terminal-command">${cmd}</span>`);

    // Handle commands
    if (cmd === '') {
        return;
    }
    else if (cmd === 'clear') {
        output.innerHTML = `
            <div class="terminal-line">
                <span class="terminal-welcome">Welcome to AutoArchitect CLI v2.5</span>
            </div>
            <div class="terminal-line">
                <span class="terminal-info">Type 'help' to see available commands.</span>
            </div>
        `;
        return;
    }
    else if (cmd === 'history') {
        addTerminalLine(output, '<span class="terminal-success">COMMAND HISTORY</span>');
        addTerminalLine(output, '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        if (terminalState.commandHistory.length === 0) {
            addTerminalLine(output, '<span class="terminal-info">No commands in history</span>');
        } else {
            terminalState.commandHistory.slice(-20).forEach((histCmd, index) => {
                addTerminalLine(output, `<span class="terminal-info">${index + 1}.</span> ${histCmd}`);
            });
        }
    }
    else if (cmd === 'list-projects') {
        addTerminalLine(output, '<span class="terminal-info">Revealing projects...</span>');
        revealProjects();
        setTimeout(() => {
            addTerminalLine(output, '<span class="terminal-success">✓ 3 projects revealed</span>');
        }, 2000);
    }
    else if (cmd === 'cat logs/' || cmd === 'cat logs') {
        await handleCatLogs(output);
    }
    else if (cmd.startsWith('read log ')) {
        const logId = cmd.replace('read log ', '').trim();
        await handleReadLog(logId, output);
    }
    else if (cmd.startsWith('grep ')) {
        const keyword = cmd.replace('grep ', '').trim();
        handleGrep(keyword, output);
    }
    else if (cmd.startsWith('showcase ')) {
        const project = cmd.replace('showcase ', '').trim();
        handleShowcase(project, output);
    }
    else if (cmd.startsWith('demo ')) {
        const project = cmd.replace('demo ', '').trim();
        handleDemo(project, output);
    }
    else if (cmd.startsWith('run ')) {
        const project = cmd.replace('run ', '').trim();
        handleRunCommand(project, output);
    }
    else if (terminalCommands[cmd]) {
        addTerminalLine(output, `<span class="terminal-output">${terminalCommands[cmd]}</span>`);
    }
    else {
        addTerminalLine(output, `<span class="terminal-error">Command not found: ${cmd}</span>`);
        addTerminalLine(output, '<span class="terminal-info">Type \'help\' for available commands.</span>');
    }

    // Scroll to bottom
    output.scrollTop = output.scrollHeight;
}

function addTerminalLine(output, content) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = content;
    output.appendChild(line);
}

function handleRunCommand(project, output) {
    const projectMap = {
        'archetype': { id: 'pipeline-archetype', tab: 'archetype', name: 'Archetype Engine' },
        'archetype-engine': { id: 'pipeline-archetype', tab: 'archetype', name: 'Archetype Engine' },
        'lead': { id: 'pipeline-lead', tab: 'lead', name: 'Lead Integrity Engine' },
        'lead-integrity': { id: 'pipeline-lead', tab: 'lead', name: 'Lead Integrity Engine' },
        'visionqa': { id: 'pipeline-visionqa', tab: 'visionqa', name: 'VisionQA' },
        'discovery_script.sh': { discovery: true },
        'validate': { validation: true },
        'validate --sample': { validation: true }
    };

    const target = projectMap[project];

    if (target && target.discovery) {
        addTerminalLine(output, '<span class="terminal-success">Running discovery_script.sh...</span>');
        triggerManualOverride();
    } else if (target && target.validation) {
        runValidationSample(output);
    } else if (target) {
        addTerminalLine(output, `<span class="terminal-success">Navigating to ${target.name} pipeline...</span>`);

        // Switch to correct tab
        document.querySelectorAll('.pipeline-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.pipeline === target.tab) {
                tab.classList.add('active');
            }
        });

        // Show correct pipeline
        document.querySelectorAll('.pipeline-flow').forEach(flow => {
            flow.classList.remove('active');
        });
        document.getElementById(target.id)?.classList.add('active');

        // Scroll to pipeline
        setTimeout(() => {
            document.getElementById('pipeline')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
    } else {
        addTerminalLine(output, `<span class="terminal-error">Unknown project: ${project}</span>`);
        addTerminalLine(output, '<span class="terminal-info">Available: archetype | lead | visionqa</span>');
    }
}

function revealProjects() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.classList.add('hidden');
        setTimeout(() => {
            card.classList.remove('hidden');
            card.classList.add('reveal-animation');
        }, index * 500);
    });

    // Scroll to projects
    setTimeout(() => {
        document.getElementById('blueprints')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
}

/* ===================================
   Pipeline Tabs (NEW)
   =================================== */
function initPipelineTabs() {
    const tabs = document.querySelectorAll('.pipeline-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const pipeline = tab.dataset.pipeline;

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Hide all pipelines
            document.querySelectorAll('.pipeline-flow').forEach(flow => {
                flow.classList.remove('active');
            });

            // Show corresponding pipeline
            const targetPipeline = document.getElementById(`pipeline-${pipeline}`);
            if (targetPipeline) {
                targetPipeline.classList.add('active');
            }
        });
    });
}

/* ===================================
   Code Modal (NEW)
   =================================== */
const codeSnippets = {
    'dom-extractor': {
        title: 'dom_extractor.py',
        code: `<span class="comment"># DOM Structure Extraction for Web Clustering</span>
<span class="keyword">from</span> selenium <span class="keyword">import</span> webdriver
<span class="keyword">from</span> bs4 <span class="keyword">import</span> BeautifulSoup
<span class="keyword">import</span> json

<span class="keyword">def</span> <span class="function">extract_dom_structure</span>(url):
    <span class="string">"""Extract semantic DOM structure for analysis."""</span>
    driver = webdriver.Chrome()
    driver.get(url)
    
    soup = BeautifulSoup(driver.page_source, <span class="string">'html.parser'</span>)
    
    <span class="variable">structure</span> = {
        <span class="string">'headers'</span>: [h.name <span class="keyword">for</span> h <span class="keyword">in</span> soup.find_all([<span class="string">'h1'</span>,<span class="string">'h2'</span>,<span class="string">'h3'</span>])],
        <span class="string">'nav_patterns'</span>: len(soup.find_all(<span class="string">'nav'</span>)),
        <span class="string">'form_count'</span>: len(soup.find_all(<span class="string">'form'</span>)),
        <span class="string">'link_density'</span>: len(soup.find_all(<span class="string">'a'</span>)) / len(str(soup))
    }
    
    driver.quit()
    <span class="keyword">return</span> structure`
    },
    'gemini-cluster': {
        title: 'gemini_clustering.py',
        code: `<span class="comment"># Gemini CLI for Archetype Identification</span>
<span class="keyword">import</span> subprocess
<span class="keyword">import</span> json

<span class="keyword">def</span> <span class="function">cluster_with_gemini</span>(dom_data):
    <span class="string">"""Use Gemini CLI to identify site archetypes."""</span>
    
    prompt = <span class="string">f"""
    Analyze these DOM structures and identify common patterns.
    Group similar sites into archetypes based on:
    - Navigation structure
    - Content layout
    - Form patterns
    
    Data: {json.dumps(dom_data)}
    """</span>
    
    <span class="variable">result</span> = subprocess.run(
        [<span class="string">'gemini'</span>, <span class="string">'--prompt'</span>, prompt],
        capture_output=True,
        text=True
    )
    
    <span class="keyword">return</span> json.loads(result.stdout)`
    },
    'pattern-logic': {
        title: 'pattern_recognition.py',
        code: `<span class="comment"># Template Reuse based on Archetype Matching</span>
<span class="keyword">from</span> sklearn.cluster <span class="keyword">import</span> KMeans
<span class="keyword">import</span> numpy <span class="keyword">as</span> np

<span class="keyword">class</span> <span class="function">ArchetypeEngine</span>:
    <span class="keyword">def</span> <span class="function">__init__</span>(self, n_archetypes=5):
        self.kmeans = KMeans(n_clusters=n_archetypes)
        self.templates = {}
    
    <span class="keyword">def</span> <span class="function">fit_archetypes</span>(self, features):
        <span class="string">"""Identify archetypes from DOM features."""</span>
        self.kmeans.fit(features)
        <span class="keyword">return</span> self.kmeans.labels_
    
    <span class="keyword">def</span> <span class="function">get_template</span>(self, site_features):
        <span class="string">"""Get reusable template for site archetype."""</span>
        archetype = self.kmeans.predict([site_features])[0]
        <span class="keyword">return</span> self.templates.get(archetype, <span class="string">'generic'</span>)`
    },
    'regex-validator': {
        title: 'regex_validator.py',
        code: `<span class="comment"># Multi-Point Data Validation with Regex</span>
<span class="keyword">import</span> re

<span class="keyword">class</span> <span class="function">LeadValidator</span>:
    <span class="variable">EMAIL_PATTERN</span> = re.compile(
        <span class="string">r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'</span>
    )
    
    <span class="variable">LINKEDIN_PATTERN</span> = re.compile(
        <span class="string">r'^https?://(www\\.)?linkedin\\.com/in/[\\w-]+/?$'</span>
    )
    
    <span class="keyword">def</span> <span class="function">validate_email</span>(self, email):
        <span class="keyword">return</span> bool(self.EMAIL_PATTERN.match(email))
    
    <span class="keyword">def</span> <span class="function">validate_linkedin</span>(self, url):
        <span class="keyword">if not</span> self.LINKEDIN_PATTERN.match(url):
            <span class="keyword">return</span> {<span class="string">'valid'</span>: False, <span class="string">'error'</span>: <span class="string">'Invalid format'</span>}
        <span class="comment"># Async check for dead links</span>
        <span class="keyword">return</span> self._check_profile_exists(url)`
    },
    'sheets-validation': {
        title: 'Validation Formulas',
        code: `<span class="comment">/* LinkedIn Verification Formula (L7:L = LinkedIn, A7:A = First, B7:B = Last) */</span>
=ARRAYFORMULA(IF(L7:L<>"",
  ARRAYFORMULA(IF(ISNUMBER(
    IF(ISNUMBER(SEARCH(A7:A,L7:L)),
      SEARCH(A7:A,L7:L),
      SEARCH(B7:B,L7:L))
  ),"Correct","Please Check")),
""))

<span class="comment">/* Email Verification Formula (I7:I = Email) */</span>
=ARRAYFORMULA(IF(A7:A<>"",
  ARRAYFORMULA(IF(ISNUMBER(
    IF(ISNUMBER(SEARCH(A7:A,I7:I)),
      SEARCH(A7:A,I7:I),
      SEARCH(B7:B,I7:I))
  ),"Correct","Please Check")),
""))`
    },

    'opencv-load': {
        title: 'image_loader.py',
        code: `<span class="comment"># OpenCV Image Loading for QA Comparison</span>
<span class="keyword">import</span> cv2
<span class="keyword">import</span> numpy <span class="keyword">as</span> np

<span class="keyword">def</span> <span class="function">load_image_pair</span>(path_a, path_b):
    <span class="string">"""Load and preprocess image pair for comparison."""</span>
    
    img_a = cv2.imread(path_a)
    img_b = cv2.imread(path_b)
    
    <span class="comment"># Convert to grayscale for SSIM</span>
    gray_a = cv2.cvtColor(img_a, cv2.COLOR_BGR2GRAY)
    gray_b = cv2.cvtColor(img_b, cv2.COLOR_BGR2GRAY)
    
    <span class="comment"># Ensure same dimensions</span>
    <span class="keyword">if</span> gray_a.shape != gray_b.shape:
        gray_b = cv2.resize(gray_b, gray_a.shape[::-1])
    
    <span class="keyword">return</span> gray_a, gray_b, img_a, img_b`
    },
    'ssim-compare': {
        title: 'ssim_comparison.py',
        code: `<span class="comment"># Structural Similarity Index Comparison</span>
<span class="keyword">from</span> skimage.metrics <span class="keyword">import</span> structural_similarity
<span class="keyword">import</span> cv2

<span class="keyword">def</span> <span class="function">compare_images</span>(img_a, img_b):
    <span class="string">"""Calculate SSIM and generate difference map."""</span>
    
    <span class="variable">score</span>, <span class="variable">diff</span> = structural_similarity(
        img_a, img_b, full=True
    )
    
    <span class="comment"># Convert difference to uint8</span>
    diff = (diff * 255).astype(<span class="string">"uint8"</span>)
    
    <span class="comment"># Threshold for significant differences</span>
    thresh = cv2.threshold(
        diff, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU
    )[1]
    
    <span class="keyword">return</span> {
        <span class="string">'score'</span>: round(score * 100, 2),
        <span class="string">'diff_map'</span>: diff,
        <span class="string">'threshold'</span>: thresh
    }`
    },
    'heatmap-gen': {
        title: 'heatmap_overlay.py',
        code: `<span class="comment"># Heatmap Overlay Generation for Visual QA</span>
<span class="keyword">import</span> cv2
<span class="keyword">import</span> numpy <span class="keyword">as</span> np

<span class="keyword">def</span> <span class="function">generate_heatmap_overlay</span>(original, diff_map):
    <span class="string">"""Create visual heatmap showing intensity of differences."""</span>
    
    <span class="comment"># Apply colormap to difference intensity</span>
    heatmap = cv2.applyColorMap(diff_map, cv2.COLORMAP_JET)
    
    <span class="comment"># Blend with original image</span>
    <span class="variable">overlay</span> = cv2.addWeighted(
        original, 0.6,
        heatmap, 0.4,
        0
    )
    
    <span class="comment"># Add intensity legend</span>
    overlay = add_legend(overlay)
    
    <span class="keyword">return</span> overlay

<span class="keyword">def</span> <span class="function">add_legend</span>(img):
    <span class="string">"""Add color legend to heatmap."""</span>
    cv2.putText(img, <span class="string">'Low'</span>, (10, 30), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1)
    cv2.putText(img, <span class="string">'High'</span>, (10, 50), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 1)
    <span class="keyword">return</span> img`
    }
};

function initCodeModal() {
    const modal = document.getElementById('code-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCode = document.getElementById('modal-code');
    const closeBtn = document.getElementById('modal-close');
    const overlay = modal?.querySelector('.modal-overlay');

    // Node card clicks
    document.querySelectorAll('.node-card').forEach(card => {
        card.addEventListener('click', () => {
            const nodeId = card.dataset.node;
            const snippet = codeSnippets[nodeId];

            if (snippet && modal) {
                modalTitle.textContent = snippet.title;
                modalCode.innerHTML = snippet.code;
                modal.classList.add('active');
            }
        });
    });

    // Close modal
    closeBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    function closeModal() {
        modal?.classList.remove('active');
    }
}

/* ===================================
   Manual Override (NEW)
   =================================== */
function initManualOverride() {
    const btn = document.getElementById('manual-override');
    btn?.addEventListener('click', triggerManualOverride);
}

function triggerManualOverride() {
    const output = document.getElementById('terminal-output');
    const input = document.getElementById('terminal-input');

    // Simulate typing
    const command = 'run discovery_script.sh';
    input.value = '';

    let charIndex = 0;
    function typeCommand() {
        if (charIndex < command.length) {
            input.value += command[charIndex];
            charIndex++;
            setTimeout(typeCommand, 50);
        } else {
            // Execute after typing
            setTimeout(() => {
                addTerminalLine(output, `<span class="terminal-prompt">guest@autoarchitect:~$</span> <span class="terminal-command">${command}</span>`);
                addTerminalLine(output, '<span class="terminal-success">MANUAL OVERRIDE ACTIVATED</span>');
                addTerminalLine(output, '<span class="terminal-info">Initiating discovery sequence...</span>');
                input.value = '';

                // Start discovery sequence
                startDiscoverySequence();
            }, 500);
        }
    }

    typeCommand();
}

function startDiscoverySequence() {
    const output = document.getElementById('terminal-output');
    const sections = [
        { id: 'blueprints', name: 'Featured Blueprints', delay: 1000 },
        { id: 'project-archetype', name: 'Archetype Engine', delay: 3000 },
        { id: 'project-lead', name: 'Lead Integrity Engine', delay: 5000 },
        { id: 'project-visionqa', name: 'VisionQA', delay: 7000 },
        { id: 'pipeline', name: 'Living Pipelines', delay: 9000 },
        { id: 'manifest', name: 'Tech Stack', delay: 11000 },
        { id: 'contact', name: 'Contact', delay: 13000 }
    ];

    sections.forEach((section) => {
        setTimeout(() => {
            addTerminalLine(output, `<span class="terminal-info">→ Highlighting: ${section.name}</span>`);
            output.scrollTop = output.scrollHeight;

            const element = document.getElementById(section.id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Add highlight effect to cards
                if (element.classList.contains('project-card')) {
                    element.classList.add('highlight');
                    setTimeout(() => element.classList.remove('highlight'), 1500);
                }
            }
        }, section.delay);
    });

    // End sequence
    setTimeout(() => {
        addTerminalLine(output, '<span class="terminal-success">✓ Discovery sequence complete!</span>');
        output.scrollTop = output.scrollHeight;
    }, 15000);
}

/* ===================================
   Project Card Hover Effects
   =================================== */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

/* ===================================
   Console Easter Egg
   =================================== */
console.log('%c< AutoArchitect.me />', 'color: #00FF41; font-size: 20px; font-weight: bold;');
console.log('%cSYSTEM: OPERATIONAL', 'color: #00D1FF; font-size: 12px;');
console.log('%cThe invisible engines are running.', 'color: #a0a0b0; font-size: 12px;');

/* ===================================
   Logic Drawer & Validation (Lead Integrity)
   =================================== */
function initLogicDrawer() {
    const trigger = document.getElementById('logic-trigger-lead');
    const drawer = document.getElementById('logic-drawer-lead');

    if (trigger && drawer) {
        trigger.addEventListener('click', () => {
            drawer.classList.toggle('open');
            const isOpen = drawer.classList.contains('open');
            trigger.textContent = isOpen ? '[CLOSE_VALIDATION_LOGIC]' : '[VIEW_VALIDATION_LOGIC]';

            if (isOpen) {
                trigger.style.borderColor = 'var(--industrial-orange)';
                trigger.style.color = 'var(--industrial-orange)';
            } else {
                trigger.style.borderColor = 'var(--matrix-green)';
                trigger.style.color = 'var(--matrix-green)';
            }
        });
    }
}

function runValidationSample(output) {
    const lines = [
        '<span class="terminal-info">Initializing Lead Integrity Engine...</span>',
        '<span class="terminal-success">Loading Identity: [Adnan] [Architect]</span>',
        '<span class="terminal-info">Checking URL: https://www.google.com/search?q=linkedin.com/in/autoarchitect...</span>',
        '<span class="terminal-info">Applying Formula_Match_Logic...</span>',
        '<span class="terminal-success">RESULT: [Correct] - System Integrity Confirmed.</span>',
        '<br>',
        '<span class="terminal-info">Logic Gate Passed. Data committed to CRM.</span>'
    ];

    let delay = 0;
    lines.forEach(line => {
        setTimeout(() => {
            addTerminalLine(output, line);
            output.scrollTop = output.scrollHeight;
        }, delay);
        delay += 600;
    });
}

// Initialize Logic Drawer
document.addEventListener('DOMContentLoaded', initLogicDrawer);

/* ===================================
   Blog System Functions  
   =================================== */

async function loadBlogManifest() {
    if (terminalState.blogCache) {
        return terminalState.blogCache;
    }

    try {
        const response = await fetch('./blogs/manifest.json');
        if (!response.ok) throw new Error('Manifest not found');
        const manifest = await response.json();
        terminalState.blogCache = manifest;
        return manifest;
    } catch (error) {
        console.error('Error loading blog manifest:', error);
        return null;
    }
}

async function handleCatLogs(output) {
    addTerminalLine(output, '<span class="terminal-info">Loading blog index...</span>');

    const manifest = await loadBlogManifest();

    if (!manifest || !manifest.posts) {
        addTerminalLine(output, '<span class="terminal-error">ERROR: Could not load blog manifest</span>');
        return;
    }

    addTerminalLine(output, '<span class="terminal-success">SYSTEM LOGS - DIRECTORY</span>');
    addTerminalLine(output, '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    addTerminalLine(output, '');

    manifest.posts.forEach(post => {
        const statusColor = post.status === 'RESOLVED' ? 'terminal-success' :
            post.status === 'OPERATIONAL' ? 'terminal-info' :
                'terminal-command';

        addTerminalLine(output, `<span class="${statusColor}">[${post.status}]</span> LOG_${post.id} - ${post.title}`);
        addTerminalLine(output, `<span class="terminal-info">          Date: ${post.date} | Tags: ${post.tags.join(', ')}</span>`);
        addTerminalLine(output, `<span class="terminal-muted">          ${post.preview}</span>`);
        addTerminalLine(output, '');
    });

    addTerminalLine(output, '<span class="terminal-info">Use \'read log [id]\' to view full content (e.g., \'read log 001\')</span>');
}

async function handleReadLog(logId, output) {
    addTerminalLine(output, `<span class="terminal-info">Loading LOG_${logId}...</span>`);

    const manifest = await loadBlogManifest();

    if (!manifest || !manifest.posts) {
        addTerminalLine(output, '<span class="terminal-error">ERROR: Could not load blog manifest</span>');
        return;
    }

    const post = manifest.posts.find(p => p.id === logId);

    if (!post) {
        addTerminalLine(output, `<span class="terminal-error">ERROR: Blog post ${logId} not found</span>`);
        addTerminalLine(output, '<span class="terminal-info">Available logs: 001, 002, 003, 004</span>');
        return;
    }

    try {
        const response = await fetch(`./blogs/${post.filename}`);
        if (!response.ok) throw new Error('Blog file not found');

        const markdown = await response.text();

        // Simple markdown to HTML conversion for terminal display
        const html = convertMarkdownForTerminal(markdown);

        addTerminalLine(output, '<div class="blog-content">');
        addTerminalLine(output, html);
        addTerminalLine(output, '</div>');

        addTerminalLine(output, '');
        addTerminalLine(output, '<span class="terminal-success">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>');
        addTerminalLine(output, '<span class="terminal-info">Use \'cat logs/\' to view all logs</span>');

    } catch (error) {
        console.error('Error loading blog:', error);
        addTerminalLine(output, `<span class="terminal-error">ERROR: Could not load blog file</span>`);
    }
}

function convertMarkdownForTerminal(markdown) {
    // Remove front matter
    markdown = markdown.replace(/^---[\s\S]*?---/, '');

    // Convert headers
    markdown = markdown.replace(/^# (.*$)/gm, '<span class="terminal-success" style="font-size: 1.1em; font-weight: bold;">$1</span>');
    markdown = markdown.replace(/^## (.*$)/gm, '<span class="terminal-command" style="font-weight: bold;">$1</span>');
    markdown = markdown.replace(/^### (.*$)/gm, '<span class="terminal-info">$1</span>');

    // Convert code blocks
    markdown = markdown.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre class="terminal-code"><code>${escapeHtml(code)}</code></pre>`;
    });

    // Convert inline code
    markdown = markdown.replace(/`([^`]+)`/g, '<span class="terminal-code-inline">$1</span>');

    // Convert bold
    markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert lists
    markdown = markdown.replace(/^[\-\*] (.*$)/gm, '<span class="terminal-info">  • $1</span>');

    // Convert line breaks
    markdown = markdown.replace(/\n\n/g, '<br><br>');
    markdown = markdown.replace(/\n/g, '<br>');

    return markdown;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/* ===================================
   Grep Search Function
   =================================== */

function handleGrep(keyword, output) {
    if (!keyword) {
        addTerminalLine(output, '<span class="terminal-error">ERROR: Please specify a keyword</span>');
        addTerminalLine(output, '<span class="terminal-info">Usage: grep [keyword]</span>');
        return;
    }

    addTerminalLine(output, `<span class="terminal-info">Searching for "${keyword}"...</span>`);
    addTerminalLine(output, '<span class="terminal-success">SEARCH RESULTS</span>');
    addTerminalLine(output, '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    let foundCount = 0;

    // Search in project descriptions
    const projects = [
        {
            name: 'Resilient Crawler',
            keywords: ['scraping', 'checkpoint', 'extraction', 'selenium', 'mobile api', 'data', 'python', '228000', 'resilient'],
            description: 'High-uptime data engineering with systematic checkpointing'
        },
        {
            name: 'Vision Sentinel',
            keywords: ['opencv', 'computer vision', 'qa', 'ssim', 'automation', 'images', '50000', 'heatmap'],
            description: 'Automated Visual QA with structural similarity detection'
        },
        {
            name: 'Archetype Cloner',
            keywords: ['gemini', 'cli', 'clustering', 'dom', 'archetype', 'template', 'reuse', 'ai'],
            description: 'AI-powered code reuse through DOM pattern recognition'
        },
        {
            name: 'Lead Integrity Engine',
            keywords: ['validation', 'regex', 'linkedin', 'email', 'data quality', 'sheets', 'crm'],
            description: 'Multi-point data validation with 99.9% accuracy'
        }
    ];

    projects.forEach(project => {
        if (project.keywords.some(kw => kw.toLowerCase().includes(keyword.toLowerCase())) ||
            project.name.toLowerCase().includes(keyword.toLowerCase()) ||
            project.description.toLowerCase().includes(keyword.toLowerCase())) {
            addTerminalLine(output, `<span class="terminal-success">▶</span> <strong>${project.name}</strong>`);
            addTerminalLine(output, `  <span class="terminal-info">${project.description}</span>`);
            addTerminalLine(output, '');
            foundCount++;
        }
    });

    // Search in blog posts if manifest is loaded
    if (terminalState.blogCache) {
        terminalState.blogCache.posts.forEach(post => {
            if (post.title.toLowerCase().includes(keyword.toLowerCase()) ||
                post.preview.toLowerCase().includes(keyword.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))) {
                addTerminalLine(output, `<span class="terminal-command">▶</span> <strong>LOG_${post.id}: ${post.title}</strong>`);
                addTerminalLine(output, `  <span class="terminal-info">${post.preview}</span>`);
                addTerminalLine(output, '');
                foundCount++;
            }
        });
    }

    if (foundCount === 0) {
        addTerminalLine(output, '<span class="terminal-info">No results found</span>');
    } else {
        addTerminalLine(output, `<span class="terminal-success">Found ${foundCount} result(s)</span>`);
    }
}

/* ===================================
   Showcase Function
   =================================== */

function handleShowcase(project, output) {
    const showcases = {
        'crawler': {
            name: 'Resilient Crawler',
            output: `
<span class="terminal-success">═══════════════════════════════════════════</span>
<span class="terminal-success">    RESILIENT CRAWLER - DEEP DIVE</span>
<span class="terminal-success">═══════════════════════════════════════════</span>

<span class="terminal-command">MISSION:</span>
Extract 228,000+ product variants from 60+ websites
Runtime: 25+ hours continuous operation

<span class="terminal-command">CORE INNOVATIONS:</span>

<span class="terminal-info">1. SYSTEMATIC CHECKPOINTING</span>
   Problem: Any crash = all work lost
   Solution: Save progress every 100 records
   Result: Zero data loss, resume in <5 seconds

<span class="terminal-info">2. DOWNLOAD-FIRST ARCHITECTURE</span>
   Phase 1: Download all HTML (fast)
   Phase 2: Parse locally (safe)
   Result: 50% reduction in server interaction

<span class="terminal-info">3. MOBILE API SIMULATION</span>
   When desktop blocked → switch to mobile API
   Bypasses: CloudFlare, CAPTCHAs, bot detection
   Result: 100% success rate vs 0% on desktop

<span class="terminal-command">METRICS:</span>
  • 228,000+ variants extracted
  • 25.3 hours total runtime
  • 0 data loss incidents
  • 3 network failures recovered

<span class="terminal-command">TECH STACK:</span>
  Python | Selenium | BeautifulSoup | Requests
  Mobile API reverse engineering | Checkpoint design

<span class="terminal-info">Type 'demo crawler' to see code examples</span>
<span class="terminal-info">Type 'read log 001' for full writeup</span>
`
        },
        'sentinel': {
            name: 'Vision Sentinel',
            output: `
<span class="terminal-success">═══════════════════════════════════════════</span>
<span class="terminal-success">    VISION SENTINEL - DEEP DIVE</span>
<span class="terminal-success">═══════════════════════════════════════════</span>

<span class="terminal-command">MISSION:</span>
Automated QA for 50,000+ AI-generated images
Eliminate human fatigue in visual comparison

<span class="terminal-command">THE PROBLEM:</span>
  Hour 1: 98% accuracy ✓
  Hour 3: 80% accuracy ⚠️
  Hour 5: 65% accuracy ❌

<span class="terminal-command">THE SOLUTION: SSIM (Structural Similarity)</span>

<span class="terminal-info">Mathematical Comparison:</span>
  • Luminance analysis
  • Contrast detection
  • Structure matching
  • Pixel variance mapping

<span class="terminal-info">Heatmap Generation:</span>
  • Visual difference overlay
  • Color-coded intensity
  • Automatic flagging

<span class="terminal-command">RESULTS:</span>
  Before: 416 hours manual review
  After: 1.2 hours automated
  Savings: 99.7%
  
  Before: 35% error rate (fatigue)
  After: 0.3% error rate
  Improvement: 99.1%

<span class="terminal-command">TECH STACK:</span>
  Python | OpenCV | Scikit-Image | NumPy
  SSIM Algorithm | Heatmap Visualization

<span class="terminal-info">Type 'demo sentinel' to see code examples</span>
<span class="terminal-info">Type 'read log 002' for full writeup</span>
`
        },
        'cloner': {
            name: 'Archetype Cloner',
            output: `
<span class="terminal-success">═══════════════════════════════════════════</span>
<span class="terminal-success">    ARCHETYPE CLONER - DEEP DIVE</span>
<span class="terminal-success">═══════════════════════════════════════════</span>

<span class="terminal-command">MISSION:</span>
Analyze 60+ websites and identify code reuse patterns
Reduce development time from weeks to hours

<span class="terminal-command">THE INNOVATION:</span>

<span class="terminal-info">Step 1: DOM Extraction</span>
  • Extract HTML structure
  • Identify semantic patterns
  • Map navigation hierarchies

<span class="terminal-info">Step 2: Gemini CLI Analysis</span>
  • Feed DOM patterns to AI
  • Cluster similar structures
  • Identify "archetypes"

<span class="terminal-info">Step 3: Template Reuse</span>
  • Build 5 base templates
  • Adapt for specific sites
  • 85% code reuse achieved

<span class="terminal-command">RESULTS:</span>
  60 websites analyzed
  5 archetypes identified
  Development time: 30 min/site (vs 2 days)
  
  Project timeline:
  Before: 1 month
  After: 3 days
  Acceleration: 10x

<span class="terminal-command">TECH STACK:</span>
  Python | Selenium | Gemini CLI
  KMeans Clustering | Pattern Recognition

<span class="terminal-info">Type 'demo cloner' to see code examples</span>
`
        }
    };

    if (!showcases[project]) {
        addTerminalLine(output, `<span class="terminal-error">ERROR: Unknown project "${project}"</span>`);
        addTerminalLine(output, '<span class="terminal-info">Available: crawler | sentinel | cloner</span>');
        return;
    }

    addTerminalLine(output, showcases[project].output);
}

/* ===================================
   Demo Function (Code Examples)
   =================================== */

function handleDemo(project, output) {
    const demos = {
        'crawler': {
            name: 'Resilient Crawler - Checkpointing',
            code: `<span class="terminal-command"># Systematic Checkpointing Implementation</span>

<span class="terminal-success">class</span> <span class="terminal-info">CheckpointedCrawler</span>:
    <span class="terminal-keyword">def</span> __init__(self, checkpoint_file=<span class="terminal-string">'checkpoint.json'</span>):
        self.checkpoint_file = checkpoint_file
        self.checkpoint_interval = <span class="terminal-number">100</span>
    
    <span class="terminal-keyword">def</span> <span class="terminal-info">save_checkpoint</span>(self, index):
        <span class="terminal-comment"># Atomic write with temp file</span>
        temp_file = <span class="terminal-string">f"{self.checkpoint_file}.tmp"</span>
        <span class="terminal-keyword">with</span> open(temp_file, <span class="terminal-string">'w'</span>) <span class="terminal-keyword">as</span> f:
            json.dump({<span class="terminal-string">'last_index'</span>: index}, f)
        os.replace(temp_file, self.checkpoint_file)
    
    <span class="terminal-keyword">def</span> <span class="terminal-info">scrape_with_resilience</span>(self, urls):
        checkpoint = self.load_checkpoint()
        start = checkpoint[<span class="terminal-string">'last_index'</span>]
        
        <span class="terminal-keyword">for</span> i, url <span class="terminal-keyword">in</span> enumerate(urls[start:], start):
            <span class="terminal-keyword">try</span>:
                data = self.scrape_product(url)
                self.append_to_csv(data)
                
                <span class="terminal-comment"># Checkpoint every N records</span>
                <span class="terminal-keyword">if</span> (i + <span class="terminal-number">1</span>) % self.checkpoint_interval == <span class="terminal-number">0</span>:
                    self.save_checkpoint(i + <span class="terminal-number">1</span>)
            
            <span class="terminal-keyword">except</span> Exception <span class="terminal-keyword">as</span> e:
                self.save_checkpoint(i)
                <span class="terminal-keyword">continue</span>

<span class="terminal-info">Result: Zero data loss, automatic recovery</span>`
        },
        'sentinel': {
            name: 'Vision Sentinel - SSIM Comparison',
            code: `<span class="terminal-command"># SSIM-based Image Comparison</span>

<span class="terminal-keyword">from</span> skimage.metrics <span class="terminal-keyword">import</span> structural_similarity
<span class="terminal-keyword">import</span> cv2

<span class="terminal-success">class</span> <span class="terminal-info">VisionQA</span>:
    <span class="terminal-keyword">def</span> <span class="terminal-info">compare_images</span>(self, img1_path, img2_path):
        <span class="terminal-comment"># Load and preprocess</span>
        img1 = cv2.imread(img1_path)
        img2 = cv2.imread(img2_path)
        
        gray1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
        gray2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
        
        <span class="terminal-comment"># Compute SSIM</span>
        score, diff = structural_similarity(
            gray1, gray2, full=<span class="terminal-keyword">True</span>
        )
        
        <span class="terminal-comment"># Generate heatmap</span>
        diff = (diff * <span class="terminal-number">255</span>).astype(<span class="terminal-string">"uint8"</span>)
        heatmap = cv2.applyColorMap(diff, cv2.COLORMAP_JET)
        
        <span class="terminal-keyword">return</span> {
            <span class="terminal-string">'score'</span>: score,
            <span class="terminal-string">'category'</span>: self.categorize(score),
            <span class="terminal-string">'heatmap'</span>: heatmap
        }
    
    <span class="terminal-keyword">def</span> <span class="terminal-info">categorize</span>(self, score):
        <span class="terminal-keyword">if</span> score >= <span class="terminal-number">0.95</span>: <span class="terminal-keyword">return</span> <span class="terminal-string">"PERFECT"</span>
        <span class="terminal-keyword">elif</span> score >= <span class="terminal-number">0.85</span>: <span class="terminal-keyword">return</span> <span class="terminal-string">"ACCEPTABLE"</span>
        <span class="terminal-keyword">else</span>: <span class="terminal-keyword">return</span> <span class="terminal-string">"FLAGGED"</span>

<span class="terminal-info">Result: 99.7% accuracy, no human fatigue</span>`
        },
        'cloner': {
            name: 'Archetype Cloner - Pattern Recognition',
            code: `<span class="terminal-command"># DOM Pattern Clustering</span>

<span class="terminal-keyword">from</span> sklearn.cluster <span class="terminal-keyword">import</span> KMeans

<span class="terminal-success">class</span> <span class="terminal-info">ArchetypeEngine</span>:
    <span class="terminal-keyword">def</span> <span class="terminal-info">extract_dom_features</span>(self, url):
        driver = webdriver.Chrome()
        driver.get(url)
        soup = BeautifulSoup(driver.page_source)
        
        features = {
            <span class="terminal-string">'nav_count'</span>: len(soup.find_all(<span class="terminal-string">'nav'</span>)),
            <span class="terminal-string">'form_count'</span>: len(soup.find_all(<span class="terminal-string">'form'</span>)),
            <span class="terminal-string">'link_density'</span>: len(soup.find_all(<span class="terminal-string">'a'</span>)) / len(str(soup))
        }
        <span class="terminal-keyword">return</span> features
    
    <span class="terminal-keyword">def</span> <span class="terminal-info">cluster_websites</span>(self, urls):
        <span class="terminal-comment"># Extract features from all sites</span>
        features = [self.extract_dom_features(url) <span class="terminal-keyword">for</span> url <span class="terminal-keyword">in</span> urls]
        
        <span class="terminal-comment"># Cluster into archetypes</span>
        kmeans = KMeans(n_clusters=<span class="terminal-number">5</span>)
        labels = kmeans.fit_predict(features)
        
        <span class="terminal-comment"># Group sites by archetype</span>
        archetypes = {}
        <span class="terminal-keyword">for</span> url, label <span class="terminal-keyword">in</span> zip(urls, labels):
            <span class="terminal-keyword">if</span> label <span class="terminal-keyword">not in</span> archetypes:
                archetypes[label] = []
            archetypes[label].append(url)
        
        <span class="terminal-keyword">return</span> archetypes

<span class="terminal-info">Result: 5 archetypes, 85% code reuse</span>`
        }
    };

    if (!demos[project]) {
        addTerminalLine(output, `<span class="terminal-error">ERROR: No demo available for "${project}"</span>`);
        addTerminalLine(output, '<span class="terminal-info">Available: crawler | sentinel | cloner</span>');
        return;
    }

    addTerminalLine(output, `<span class="terminal-success">CODE DEMO: ${demos[project].name}</span>`);
    addTerminalLine(output, '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    addTerminalLine(output, '');
    addTerminalLine(output, `<pre class="code-demo">${demos[project].code}</pre>`);
    addTerminalLine(output, '');
    addTerminalLine(output, '<span class="terminal-info">Type \'showcase ' + project + '\' for full project breakdown</span>');
}

/* ===================================
   Blog System Functions  
   =================================== */

async function loadBlogManifest() {
    if (terminalState.blogCache) {
        return terminalState.blogCache;
    }

    try {
        const response = await fetch('./blogs/manifest.json');
        if (!response.ok) throw new Error('Manifest not found');
        const manifest = await response.json();
        terminalState.blogCache = manifest;
        return manifest;
    } catch (error) {
        console.error('Error loading blog manifest:', error);
        return null;
    }
}

async function handleCatLogs(output) {
    addTerminalLine(output, '<span class="terminal-info">Loading blog index...</span>');

    const manifest = await loadBlogManifest();

    if (!manifest || !manifest.posts) {
        addTerminalLine(output, '<span class="terminal-error">ERROR: Could not load blog manifest</span>');
        return;
    }

    addTerminalLine(output, '<span class="terminal-success">SYSTEM LOGS - DIRECTORY</span>');
    addTerminalLine(output, '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    addTerminalLine(output, '');

    manifest.posts.forEach(post => {
        const statusColor = post.status === 'RESOLVED' ? 'terminal-success' :
            post.status === 'OPERATIONAL' ? 'terminal-info' :
                'terminal-command';

        addTerminalLine(output, `<span class="${statusColor}">[${post.status}]</span> LOG_${post.id} - ${post.title}`);
        addTerminalLine(output, `<span class="terminal-info">          Date: ${post.date} | Tags: ${post.tags.join(', ')}</span>`);
        addTerminalLine(output, `<span class="terminal-muted">          ${post.preview}</span>`);
        addTerminalLine(output, '');
    });

    addTerminalLine(output, '<span class="terminal-info">Use \'read log [id]\' to view full content (e.g., \'read log 001\')</span>');
}

async function handleReadLog(logId, output) {
    addTerminalLine(output, `<span class="terminal-info">Loading LOG_${logId}...</span>`);

    const manifest = await loadBlogManifest();

    if (!manifest || !manifest.posts) {
        addTerminalLine(output, '<span class="terminal-error">ERROR: Could not load blog manifest</span>');
        return;
    }

    const post = manifest.posts.find(p => p.id === logId);

    if (!post) {
        addTerminalLine(output, `<span class="terminal-error">ERROR: Blog post ${logId} not found</span>`);
        addTerminalLine(output, '<span class="terminal-info">Available logs: 001, 002, 003, 004</span>');
        return;
    }

    try {
        const response = await fetch(`./blogs/${post.filename}`);
        if (!response.ok) throw new Error('Blog file not found');

        const markdown = await response.text();

        // Simple markdown to HTML conversion for terminal display
        const html = convertMarkdownForTerminal(markdown);

        addTerminalLine(output, '<div class="blog-content">');
        addTerminalLine(output, html);
        addTerminalLine(output, '</div>');

        addTerminalLine(output, '');
        addTerminalLine(output, '<span class="terminal-success">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>');
        addTerminalLine(output, '<span class="terminal-info">Use \'cat logs/\' to view all logs</span>');

    } catch (error) {
        console.error('Error loading blog:', error);
        addTerminalLine(output, `<span class="terminal-error">ERROR: Could not load blog file</span>`);
    }
}

function convertMarkdownForTerminal(markdown) {
    // Remove front matter
    markdown = markdown.replace(/^---[\s\S]*?---/, '');

    // Convert headers
    markdown = markdown.replace(/^# (.*$)/gm, '<span class="terminal-success" style="font-size: 1.1em; font-weight: bold;">$1</span>');
    markdown = markdown.replace(/^## (.*$)/gm, '<span class="terminal-command" style="font-weight: bold;">$1</span>');
    markdown = markdown.replace(/^### (.*$)/gm, '<span class="terminal-info">$1</span>');

    // Convert code blocks
    markdown = markdown.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre class="terminal-code"><code>${escapeHtml(code)}</code></pre>`;
    });

    // Convert inline code
    markdown = markdown.replace(/`([^`]+)`/g, '<span class="terminal-code-inline">$1</span>');

    // Convert bold
    markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert lists
    markdown = markdown.replace(/^[\-\*] (.*$)/gm, '<span class="terminal-info">  • $1</span>');

    // Convert line breaks
    markdown = markdown.replace(/\n\n/g, '<br><br>');
    markdown = markdown.replace(/\n/g, '<br>');

    return markdown;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/* ===================================
   Grep Search Function
   =================================== */

function handleGrep(keyword, output) {
    if (!keyword) {
        addTerminalLine(output, '<span class="terminal-error">ERROR: Please specify a keyword</span>');
        addTerminalLine(output, '<span class="terminal-info">Usage: grep [keyword]</span>');
        return;
    }

    addTerminalLine(output, `<span class="terminal-info">Searching for "${keyword}"...</span>`);
    addTerminalLine(output, '<span class="terminal-success">SEARCH RESULTS</span>');
    addTerminalLine(output, '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    let foundCount = 0;

    // Search in project descriptions
    const projects = [
        {
            name: 'Resilient Crawler',
            keywords: ['scraping', 'checkpoint', 'extraction', 'selenium', 'mobile api', 'data', 'python', '228000', 'resilient'],
            description: 'High-uptime data engineering with systematic checkpointing'
        },
        {
            name: 'Vision Sentinel',
            keywords: ['opencv', 'computer vision', 'qa', 'ssim', 'automation', 'images', '50000', 'heatmap'],
            description: 'Automated Visual QA with structural similarity detection'
        },
        {
            name: 'Archetype Cloner',
            keywords: ['gemini', 'cli', 'clustering', 'dom', 'archetype', 'template', 'reuse', 'ai'],
            description: 'AI-powered code reuse through DOM pattern recognition'
        },
        {
            name: 'Lead Integrity Engine',
            keywords: ['validation', 'regex', 'linkedin', 'email', 'data quality', 'sheets', 'crm'],
            description: 'Multi-point data validation with 99.9% accuracy'
        }
    ];

    projects.forEach(project => {
        if (project.keywords.some(kw => kw.toLowerCase().includes(keyword.toLowerCase())) ||
            project.name.toLowerCase().includes(keyword.toLowerCase()) ||
            project.description.toLowerCase().includes(keyword.toLowerCase())) {
            addTerminalLine(output, `<span class="terminal-success">▶</span> <strong>${project.name}</strong>`);
            addTerminalLine(output, `  <span class="terminal-info">${project.description}</span>`);
            addTerminalLine(output, '');
            foundCount++;
        }
    });

    // Search in blog posts if manifest is loaded
    if (terminalState.blogCache) {
        terminalState.blogCache.posts.forEach(post => {
            if (post.title.toLowerCase().includes(keyword.toLowerCase()) ||
                post.preview.toLowerCase().includes(keyword.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))) {
                addTerminalLine(output, `<span class="terminal-command">▶</span> <strong>LOG_${post.id}: ${post.title}</strong>`);
                addTerminalLine(output, `  <span class="terminal-info">${post.preview}</span>`);
                addTerminalLine(output, '');
                foundCount++;
            }
        });
    }

    if (foundCount === 0) {
        addTerminalLine(output, '<span class="terminal-info">No results found</span>');
    } else {
        addTerminalLine(output, `<span class="terminal-success">Found ${foundCount} result(s)</span>`);
    }
}

/* ===================================
   Showcase Function
   =================================== */

function handleShowcase(project, output) {
    const showcases = {
        'crawler': {
            name: 'Resilient Crawler',
            output: `
<span class="terminal-success">═══════════════════════════════════════════</span>
<span class="terminal-success">    RESILIENT CRAWLER - DEEP DIVE</span>
<span class="terminal-success">═══════════════════════════════════════════</span>

<span class="terminal-command">MISSION:</span>
Extract 228,000+ product variants from 60+ websites
Runtime: 25+ hours continuous operation

<span class="terminal-command">CORE INNOVATIONS:</span>

<span class="terminal-info">1. SYSTEMATIC CHECKPOINTING</span>
   Problem: Any crash = all work lost
   Solution: Save progress every 100 records
   Result: Zero data loss, resume in <5 seconds

<span class="terminal-info">2. DOWNLOAD-FIRST ARCHITECTURE</span>
   Phase 1: Download all HTML (fast)
   Phase 2: Parse locally (safe)
   Result: 50% reduction in server interaction

<span class="terminal-info">3. MOBILE API SIMULATION</span>
   When desktop blocked → switch to mobile API
   Bypasses: CloudFlare, CAPTCHAs, bot detection
   Result: 100% success rate vs 0% on desktop

<span class="terminal-command">METRICS:</span>
  • 228,000+ variants extracted
  • 25.3 hours total runtime
  • 0 data loss incidents
  • 3 network failures recovered

<span class="terminal-command">TECH STACK:</span>
  Python | Selenium | BeautifulSoup | Requests
  Mobile API reverse engineering | Checkpoint design

<span class="terminal-info">Type 'demo crawler' to see code examples</span>
<span class="terminal-info">Type 'read log 001' for full writeup</span>
`
        },
        'sentinel': {
            name: 'Vision Sentinel',
            output: `
<span class="terminal-success">═══════════════════════════════════════════</span>
<span class="terminal-success">    VISION SENTINEL - DEEP DIVE</span>
<span class="terminal-success">═══════════════════════════════════════════</span>

<span class="terminal-command">MISSION:</span>
Automated QA for 50,000+ AI-generated images
Eliminate human fatigue in visual comparison

<span class="terminal-command">THE PROBLEM:</span>
  Hour 1: 98% accuracy ✓
  Hour 3: 80% accuracy ⚠️
  Hour 5: 65% accuracy ❌

<span class="terminal-command">THE SOLUTION: SSIM (Structural Similarity)</span>

<span class="terminal-info">Mathematical Comparison:</span>
  • Luminance analysis
  • Contrast detection
  • Structure matching
  • Pixel variance mapping

<span class="terminal-info">Heatmap Generation:</span>
  • Visual difference overlay
  • Color-coded intensity
  • Automatic flagging

<span class="terminal-command">RESULTS:</span>
  Before: 416 hours manual review
  After: 1.2 hours automated
  Savings: 99.7%
  
  Before: 35% error rate (fatigue)
  After: 0.3% error rate
  Improvement: 99.1%

<span class="terminal-command">TECH STACK:</span>
  Python | OpenCV | Scikit-Image | NumPy
  SSIM Algorithm | Heatmap Visualization

<span class="terminal-info">Type 'demo sentinel' to see code examples</span>
<span class="terminal-info">Type 'read log 002' for full writeup</span>
`
        },
        'cloner': {
            name: 'Archetype Cloner',
            output: `
<span class="terminal-success">═══════════════════════════════════════════</span>
<span class="terminal-success">    ARCHETYPE CLONER - DEEP DIVE</span>
<span class="terminal-success">═══════════════════════════════════════════</span>

<span class="terminal-command">MISSION:</span>
Analyze 60+ websites and identify code reuse patterns
Reduce development time from weeks to hours

<span class="terminal-command">THE INNOVATION:</span>

<span class="terminal-info">Step 1: DOM Extraction</span>
  • Extract HTML structure
  • Identify semantic patterns
  • Map navigation hierarchies

<span class="terminal-info">Step 2: Gemini CLI Analysis</span>
  • Feed DOM patterns to AI
  • Cluster similar structures
  • Identify "archetypes"

<span class="terminal-info">Step 3: Template Reuse</span>
  • Build 5 base templates
  • Adapt for specific sites
  • 85% code reuse achieved

<span class="terminal-command">RESULTS:</span>
  60 websites analyzed
  5 archetypes identified
  Development time: 30 min/site (vs 2 days)
  
  Project timeline:
  Before: 1 month
  After: 3 days
  Acceleration: 10x

<span class="terminal-command">TECH STACK:</span>
  Python | Selenium | Gemini CLI
  KMeans Clustering | Pattern Recognition

<span class="terminal-info">Type 'demo cloner' to see code examples</span>
`
        }
    };

    if (!showcases[project]) {
        addTerminalLine(output, `<span class="terminal-error">ERROR: Unknown project "${project}"</span>`);
        addTerminalLine(output, '<span class="terminal-info">Available: crawler | sentinel | cloner</span>');
        return;
    }

    addTerminalLine(output, showcases[project].output);
}

/* ===================================
   Demo Function (Code Examples)
   =================================== */

function handleDemo(project, output) {
    const demos = {
        'crawler': {
            name: 'Resilient Crawler - Checkpointing',
            code: `<span class="terminal-command"># Systematic Checkpointing Implementation</span>

<span class="terminal-success">class</span> <span class="terminal-info">CheckpointedCrawler</span>:
    <span class="terminal-keyword">def</span> __init__(self, checkpoint_file=<span class="terminal-string">'checkpoint.json'</span>):
        self.checkpoint_file = checkpoint_file
        self.checkpoint_interval = <span class="terminal-number">100</span>
    
    <span class="terminal-keyword">def</span> <span class="terminal-info">save_checkpoint</span>(self, index):
        <span class="terminal-comment"># Atomic write with temp file</span>
        temp_file = <span class="terminal-string">f"{self.checkpoint_file}.tmp"</span>
        <span class="terminal-keyword">with</span> open(temp_file, <span class="terminal-string">'w'</span>) <span class="terminal-keyword">as</span> f:
            json.dump({<span class="terminal-string">'last_index'</span>: index}, f)
        os.replace(temp_file, self.checkpoint_file)
    
    <span class="terminal-keyword">def</span> <span class="terminal-info">scrape_with_resilience</span>(self, urls):
        checkpoint = self.load_checkpoint()
        start = checkpoint[<span class="terminal-string">'last_index'</span>]
        
        <span class="terminal-keyword">for</span> i, url <span class="terminal-keyword">in</span> enumerate(urls[start:], start):
            <span class="terminal-keyword">try</span>:
                data = self.scrape_product(url)
                self.append_to_csv(data)
                
                <span class="terminal-comment"># Checkpoint every N records</span>
                <span class="terminal-keyword">if</span> (i + <span class="terminal-number">1</span>) % self.checkpoint_interval == <span class="terminal-number">0</span>:
                    self.save_checkpoint(i + <span class="terminal-number">1</span>)
            
            <span class="terminal-keyword">except</span> Exception <span class="terminal-keyword">as</span> e:
                self.save_checkpoint(i)
                <span class="terminal-keyword">continue</span>

<span class="terminal-info">Result: Zero data loss, automatic recovery</span>`
        },
        'sentinel': {
            name: 'Vision Sentinel - SSIM Comparison',
            code: `<span class="terminal-command"># SSIM-based Image Comparison</span>

<span class="terminal-keyword">from</span> skimage.metrics <span class="terminal-keyword">import</span> structural_similarity
<span class="terminal-keyword">import</span> cv2

<span class="terminal-success">class</span> <span class="terminal-info">VisionQA</span>:
    <span class="terminal-keyword">def</span> <span class="terminal-info">compare_images</span>(self, img1_path, img2_path):
        <span class="terminal-comment"># Load and preprocess</span>
        img1 = cv2.imread(img1_path)
        img2 = cv2.imread(img2_path)
        
        gray1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
        gray2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
        
        <span class="terminal-comment"># Compute SSIM</span>
        score, diff = structural_similarity(
            gray1, gray2, full=<span class="terminal-keyword">True</span>
        )
        
        <span class="terminal-comment"># Generate heatmap</span>
        diff = (diff * <span class="terminal-number">255</span>).astype(<span class="terminal-string">"uint8"</span>)
        heatmap = cv2.applyColorMap(diff, cv2.COLORMAP_JET)
        
        <span class="terminal-keyword">return</span> {
            <span class="terminal-string">'score'</span>: score,
            <span class="terminal-string">'category'</span>: self.categorize(score),
            <span class="terminal-string">'heatmap'</span>: heatmap
        }
    
    <span class="terminal-keyword">def</span> <span class="terminal-info">categorize</span>(self, score):
        <span class="terminal-keyword">if</span> score >= <span class="terminal-number">0.95</span>: <span class="terminal-keyword">return</span> <span class="terminal-string">"PERFECT"</span>
        <span class="terminal-keyword">elif</span> score >= <span class="terminal-number">0.85</span>: <span class="terminal-keyword">return</span> <span class="terminal-string">"ACCEPTABLE"</span>
        <span class="terminal-keyword">else</span>: <span class="terminal-keyword">return</span> <span class="terminal-string">"FLAGGED"</span>

<span class="terminal-info">Result: 99.7% accuracy, no human fatigue</span>`
        },
        'cloner': {
            name: 'Archetype Cloner - Pattern Recognition',
            code: `<span class="terminal-command"># DOM Pattern Clustering</span>

<span class="terminal-keyword">from</span> sklearn.cluster <span class="terminal-keyword">import</span> KMeans

<span class="terminal-success">class</span> <span class="terminal-info">ArchetypeEngine</span>:
    <span class="terminal-keyword">def</span> <span class="terminal-info">extract_dom_features</span>(self, url):
        driver = webdriver.Chrome()
        driver.get(url)
        soup = BeautifulSoup(driver.page_source)
        
        features = {
            <span class="terminal-string">'nav_count'</span>: len(soup.find_all(<span class="terminal-string">'nav'</span>)),
            <span class="terminal-string">'form_count'</span>: len(soup.find_all(<span class="terminal-string">'form'</span>)),
            <span class="terminal-string">'link_density'</span>: len(soup.find_all(<span class="terminal-string">'a'</span>)) / len(str(soup))
        }
        <span class="terminal-keyword">return</span> features
    
    <span class="terminal-keyword">def</span> <span class="terminal-info">cluster_websites</span>(self, urls):
        <span class="terminal-comment"># Extract features from all sites</span>
        features = [self.extract_dom_features(url) <span class="terminal-keyword">for</span> url <span class="terminal-keyword">in</span> urls]
        
        <span class="terminal-comment"># Cluster into archetypes</span>
        kmeans = KMeans(n_clusters=<span class="terminal-number">5</span>)
        labels = kmeans.fit_predict(features)
        
        <span class="terminal-comment"># Group sites by archetype</span>
        archetypes = {}
        <span class="terminal-keyword">for</span> url, label <span class="terminal-keyword">in</span> zip(urls, labels):
            <span class="terminal-keyword">if</span> label <span class="terminal-keyword">not in</span> archetypes:
                archetypes[label] = []
            archetypes[label].append(url)
        
        <span class="terminal-keyword">return</span> archetypes

<span class="terminal-info">Result: 5 archetypes, 85% code reuse</span>`
        }
    };

    if (!demos[project]) {
        addTerminalLine(output, `<span class="terminal-error">ERROR: No demo available for "${project}"</span>`);
        addTerminalLine(output, '<span class="terminal-info">Available: crawler | sentinel | cloner</span>');
        return;
    }

    addTerminalLine(output, `<span class="terminal-success">CODE DEMO: ${demos[project].name}</span>`);
    addTerminalLine(output, '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    addTerminalLine(output, '');
    addTerminalLine(output, `<pre class="code-demo">${demos[project].code}</pre>`);
    addTerminalLine(output, '');
    addTerminalLine(output, '<span class="terminal-info">Type \'showcase ' + project + '\' for full project breakdown</span>');
}

/* ===================================
   Blog Modal Functionality
   =================================== */

function initBlogModal() {
    const modal = document.getElementById('blog-modal');
    const modalBody = document.getElementById('blog-modal-body');
    const modalTitle = document.getElementById('blog-modal-title');
    const closeBtn = document.getElementById('blog-modal-close');
    const overlay = modal?.querySelector('.blog-modal-overlay');

    // Add click listeners to all log cards
    const logCards = document.querySelectorAll('.clickable-log');
    logCards.forEach(card => {
        card.addEventListener('click', async () => {
            const logId = card.dataset.logId;
            await openBlogModal(logId);
        });
    });

    // Close modal on close button
    closeBtn?.addEventListener('click', closeBlogModal);

    // Close modal on overlay click
    overlay?.addEventListener('click', closeBlogModal);

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeBlogModal();
        }
    });
}

async function openBlogModal(logId) {
    const modal = document.getElementById('blog-modal');
    const modalBody = document.getElementById('blog-modal-body');
    const modalTitle = document.getElementById('blog-modal-title');

    if (!modal || !modalBody || !modalTitle) return;

    // Show modal with loading state
    modal.classList.add('active');
    modalBody.innerHTML = `
        <div class="blog-loading">
            <span class="loading-spinner"></span>
            <span>Loading blog post...</span>
        </div>
    `;

    // Prevent body scrolling
    document.body.style.overflow = 'hidden';

    try {
        // Load manifest to get filename
        const manifestResponse = await fetch('./blogs/manifest.json');
        const manifest = await manifestResponse.json();
        const post = manifest.posts.find(p => p.id === logId);

        if (!post) {
            throw new Error('Blog post not found');
        }

        // Update modal title
        modalTitle.textContent = post.filename;

        // Load blog content
        const blogResponse = await fetch(`./blogs/${post.filename}`);
        if (!blogResponse.ok) throw new Error('Failed to load blog');

        const markdown = await blogResponse.text();

        // Convert markdown to HTML
        const html = convertMarkdownToHTML(markdown);

        // Display content with fade-in animation
        modalBody.innerHTML = html;
        modalBody.style.opacity = '0';
        setTimeout(() => {
            modalBody.style.opacity = '1';
            modalBody.style.transition = 'opacity 0.3s ease';
        }, 50);

    } catch (error) {
        console.error('Error loading blog:', error);
        modalBody.innerHTML = `
            <div class="blog-loading">
                <span style="color: var(--danger-red); font-size: 2rem;">⚠</span>
                <span style="color: var(--danger-red);">Error loading blog post</span>
                <span style="color: var(--text-muted); font-size: 0.85rem;">${error.message}</span>
            </div>
        `;
    }
}

function closeBlogModal() {
    const modal = document.getElementById('blog-modal');
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function convertMarkdownToHTML(markdown) {
    // Remove front matter
    markdown = markdown.replace(/^---[\s\S]*?---/, '');

    // Convert headers
    markdown = markdown.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    markdown = markdown.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    markdown = markdown.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    markdown = markdown.replace(/^#### (.*$)/gm, '<h4>$1</h4>');

    // Convert code blocks (with language support)
    markdown = markdown.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const langLabel = lang ? `<span class="code-lang">${lang}</span>` : '';
        return `<pre>${langLabel}<code>${escapeHtml(code.trim())}</code></pre>`;
    });

    // Convert inline code
    markdown = markdown.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Convert bold
    markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert italic
    markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Convert links
    markdown = markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Convert unordered lists
    markdown = markdown.replace(/^\* (.*$)/gm, '<li>$1</li>');
    markdown = markdown.replace(/^- (.*$)/gm, '<li>$1</li>');
    markdown = markdown.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

    // Convert ordered lists
    markdown = markdown.replace(/^\d+\. (.*$)/gm, '<li>$1</li>');

    // Convert blockquotes
    markdown = markdown.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');

    // Convert horizontal rules
    markdown = markdown.replace(/^---$/gm, '<hr>');

    // Convert paragraphs (double newline = new paragraph)
    const lines = markdown.split('\n');
    let inList = false;
    let inCode = false;
    let result = [];
    let paragraph = '';

    for (let line of lines) {
        const trimmed = line.trim();

        // Check if we're in a special block
        if (trimmed.startsWith('<pre>')) inCode = true;
        if (trimmed.endsWith('</pre>')) {
            inCode = false;
            result.push(line);
            continue;
        }
        if (inCode) {
            result.push(line);
            continue;
        }

        if (trimmed.startsWith('<ul>') || trimmed.startsWith('<ol>')) inList = true;
        if (trimmed.startsWith('</ul>') || trimmed.startsWith('</ol>')) {
            inList = false;
            result.push(line);
            continue;
        }

        // Handle different line types
        if (trimmed === '') {
            if (paragraph) {
                result.push(`<p>${paragraph}</p>`);
                paragraph = '';
            }
        } else if (trimmed.startsWith('<h') || trimmed.startsWith('<pre>') ||
            trimmed.startsWith('<ul>') || trimmed.startsWith('<ol>') ||
            trimmed.startsWith('<blockquote>') || trimmed.startsWith('<hr>') ||
            inList) {
            if (paragraph) {
                result.push(`<p>${paragraph}</p>`);
                paragraph = '';
            }
            result.push(line);
        } else {
            if (paragraph) paragraph += ' ';
            paragraph += trimmed;
        }
    }

    if (paragraph) {
        result.push(`<p>${paragraph}</p>`);
    }

    return result.join('\n');
}

// Initialize blog modal when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogModal);
} else {
    initBlogModal();
}
