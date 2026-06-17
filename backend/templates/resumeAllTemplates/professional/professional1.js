/*export const bhavesh = (data) => {
  // Logic to make your best tech stack stand out
  const boldTech = (text) => {
    if (!text) return '';
    const tech = ['Flutter', 'React', 'Node.js', 'Firebase', 'MongoDB', 'JavaScript', 'TypeScript', 'Redux', 'AWS', 'Docker'];
    let updatedText = text;
    tech.forEach(t => {
      const r = new RegExp(`\\b${t}\\b`, 'gi');
      updatedText = updatedText.replace(r, `<b class="text-slate-900 font-bold">${t}</b>`);
    });
    return updatedText;
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; color: #334155; }
        .a4-container {
            width: 210mm;
            min-height: 297mm;
            margin: 20px auto;
            background: white;
            padding: 50px;
            box-shadow: 0 0 20px rgba(0,0,0,0.05);
        }
        .section-line { height: 2px; background: #e2e8f0; margin-top: 8px; flex-grow: 1; }
        @media print {
            body { background: white; }
            .a4-container { margin: 0; box-shadow: none; padding: 30px; }
        }
    </style>
</head>
<body class="bg-slate-100">

<div class="a4-container">
    <!-- Header: Clean & Centered -->
    <header class="text-center mb-10">
        <h1 class="text-4xl font-extrabold text-slate-800 tracking-tight mb-2">${data.fullName || 'YOUR NAME'}</h1>
        <div class="flex justify-center gap-4 text-sm font-medium text-slate-500">
            <span>${data.location}</span> • <span>${data.phone}</span> • <span>${data.email}</span>
        </div>
        <div class="mt-4 flex justify-center gap-3">
            ${data.links?.portfolio ? `<span class="px-3 py-1 bg-slate-800 text-white text-xs rounded-full">Portfolio</span>` : ''}
            ${data.links?.github ? `<span class="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full border border-slate-200">GitHub</span>` : ''}
        </div>
    </header>

    <div class="grid grid-cols-12 gap-8">
        <!-- Sidebar: Skills & Education -->
        <aside class="col-span-4 space-y-8">
            <section>
                <h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Expertise</h3>
                <div class="flex flex-wrap gap-2">
                    ${data.skills?.map(s => `<span class="text-xs font-semibold px-2 py-1 bg-slate-50 text-slate-700 border border-slate-200 rounded">${s}</span>`).join('') || ''}
                </div>
            </section>

            <section>
                <h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Education</h3>
                ${data.education?.map(ed => `
                    <div class="mb-4">
                        <p class="text-sm font-bold text-slate-800">${ed.degree}</p>
                        <p class="text-xs text-slate-500">${ed.school}</p>
                        <p class="text-[10px] font-bold text-slate-400 mt-1">${ed.year}</p>
                    </div>
                `).join('') || ''}
            </section>

            <section>
                <h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Languages</h3>
                <p class="text-sm text-slate-600 font-medium">${data.languages?.join(', ') || ''}</p>
            </section>
        </aside>

        <!-- Main Content -->
        <main class="col-span-8 space-y-10">
            <!-- Professional Summary -->
            <section>
                <div class="flex items-center gap-3 mb-3">
                    <h2 class="text-lg font-bold text-slate-800 whitespace-nowrap">Professional Summary</h2>
                    <div class="section-line"></div>
                </div>
                <p class="text-slate-600 text-sm leading-relaxed">
                    ${boldTech(data.summary)}
                </p>
            </section>

            <!-- Experience -->
            <section>
                <div class="flex items-center gap-3 mb-5">
                    <h2 class="text-lg font-bold text-slate-800 whitespace-nowrap">Experience</h2>
                    <div class="section-line"></div>
                </div>
                <div class="space-y-6">
                    ${data.experience?.map(exp => `
                        <div>
                            <div class="flex justify-between items-start">
                                <h4 class="font-bold text-slate-800">${exp.role}</h4>
                                <span class="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</span>
                            </div>
                            <p class="text-xs font-medium text-slate-400 mb-2 uppercase tracking-tighter">${exp.company}</p>
                            <div class="text-sm text-slate-600 border-l-2 border-slate-100 pl-4">
                                ${boldTech(exp.desc)}
                            </div>
                        </div>
                    `).join('') || ''}
                </div>
            </section>

            <!-- Top Projects -->
            <section>
                <div class="flex items-center gap-3 mb-5">
                    <h2 class="text-lg font-bold text-slate-800 whitespace-nowrap">Selected Projects</h2>
                    <div class="section-line"></div>
                </div>
                <div class="grid grid-cols-1 gap-4">
                    ${data.project?.map(p => `
                        <div class="p-3 bg-slate-50/50 border border-slate-100 rounded-lg">
                            <h4 class="text-sm font-bold text-slate-800 mb-1">${p.title}</h4>
                            <p class="text-xs text-slate-500 italic">${boldTech(p.desc)}</p>
                        </div>
                    `).join('') || ''}
                </div>
            </section>
        </main>
    </div>
</div>

</body>
</html>
`;
};

*/

export const professional1 = (data) => {
  const boldTech = (text) => {
    if (!text) return '';
    const tech = ['Flutter', 'React', 'Node.js', 'Firebase', 'MongoDB', 'JavaScript', 'TypeScript', 'Redux', 'Express', 'SQL', 'NoSQL'];
    let updatedText = text;
    tech.forEach(t => {
      const r = new RegExp(`\\b${t}\\b`, 'gi');
      // Tailwind classes ki jagah inline standard style use ki hai
      updatedText = updatedText.replace(r, `<b style="color: #0f172a; font-weight: 600;">${t}</b>`);
    });
    return updatedText;
  };

  // Safe Fallbacks for Object Types to prevent runtime application errors
  const safeLinks = data.links && data.links.length > 0 ? data.links[0] : (data.links || {});

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Inter', sans-serif; 
            color: #334155; 
            background: #ffffff;
            -webkit-font-smoothing: antialiased;
        }

        /* 🚀 EXACT A4 CONTAINER CONVERSION (TAILWIND REPLACEMENT) */
        .a4-wrapper {
            width: 100%;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background: white;
        }

        /* Header Layout Styling */
        .resume-header {
            padding: 24px;
            background-color: #f8fafc;
            border-bottom: 1px solid #f1f5f9;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
        }
        @media (min-width: 640px) {
            .resume-header {
                flex-direction: row;
                align-items: center;
            }
        }
        @media (min-width: 768px) {
            .resume-header {
                padding: 32px;
            }
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .avatar-container {
            position: relative;
            flex-shrink: 0;
        }
        .profile-img {
            width: 80px;
            height: 80px;
            border-radius: 16px;
            object-fit: cover;
            border: 4px solid #ffffff;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        @media (min-width: 768px) {
            .profile-img {
                width: 96px;
                height: 96px;
            }
        }
        .status-dot {
            position: absolute;
            bottom: -2px;
            right: -2px;
            width: 16px;
            height: 16px;
            background-color: #10b981;
            border: 2px solid #ffffff;
            border-radius: 50%;
        }

        .title-block h1 {
            font-size: 24px;
            font-weight: 800;
            color: #1e293b;
            letter-spacing: -0.025em;
            line-height: 1;
        }
        @media (min-width: 768px) {
            .title-block h1 {
                font-size: 30px;
            }
        }
        .title-block p {
            color: #2563eb;
            font-weight: 600;
            margin-top: 6px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        @media (min-width: 768px) {
            .title-block p {
                font-size: 14px;
            }
        }

        .meta-badges {
            display: flex;
            flex-wrap: wrap;
            column-gap: 16px;
            row-gap: 4px;
            margin-top: 12px;
            font-size: 10px;
            font-weight: 700;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.025em;
        }
        @media (min-width: 768px) {
            .meta-badges {
                font-size: 11px;
            }
        }

        .phone-container {
            width: 100%;
        }
        @media (min-width: 640px) {
            .phone-container {
                width: auto;
                text-align: right;
            }
        }
        .phone-badge {
            display: inline-block;
            padding: 6px 16px;
            background-color: #1e293b;
            color: #ffffff;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 700;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }

        /* Main Structural Body Grid */
        .main-layout {
            display: flex;
            flex-direction: column;
            flex: 1;
        }
        @media (min-width: 768px) {
            .main-layout {
                display: grid;
                grid-template-columns: repeat(12, minmax(0, 1fr));
            }
        }

        /* Left Sidebar Layout */
        .sidebar { 
            background: #ffffff; 
            border-right: none;
            border-bottom: 1px solid #f1f5f9;
            padding: 20px;
        }
        @media (min-width: 768px) {
            .sidebar {
                grid-span: 4; /* md:col-span-4 */
                grid-column: span 4 / span 4;
                border-right: 1px solid #f1f5f9; 
                border-bottom: none;
                padding: 24px;
            }
        }
        
        /* Spacing system for layout rows */
        .sidebar-section {
            margin-bottom: 24px;
        }
        @media (min-width: 768px) {
            .sidebar-section {
                margin-bottom: 32px;
            }
        }
        .sidebar-section:last-child {
            margin-bottom: 0;
        }

        .section-label {
            font-size: 10px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            color: #94a3b8;
            margin-bottom: 12px;
        }

        /* Chips & Timelines inside Left Sidebar */
        .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }
        .skill-chip {
            padding: 2px 8px;
            background-color: #f8fafc;
            color: #334155;
            font-size: 10px;
            font-weight: 700;
            border-radius: 4px;
            border: 1px solid #e2e8f0;
            text-transform: uppercase;
            letter-spacing: 0.025em;
        }
        .fallback-text {
            font-size: 12px;
            color: #94a3b8;
            font-style: italic;
        }

        .edu-stack {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .edu-node {
            border-left: 2px solid #f1f5f9;
            padding-left: 12px;
        }
        .edu-degree {
            font-size: 12px;
            font-weight: 700;
            color: #1e293b;
            line-height: 1.25;
        }
        .edu-school {
            font-size: 10px;
            color: #64748b;
            margin-top: 2px;
        }
        .edu-year {
            font-size: 9px;
            font-weight: 700;
            color: #2563eb;
            margin-top: 2px;
        }

        .links-stack {
            display: flex;
            flex-direction: column;
            gap: 6px;
            font-size: 12px;
            font-weight: 500;
            color: #475569;
        }
        .link-row {
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .link-url {
            text-decoration: underline;
            text-decoration-color: #e2e8f0;
        }

        /* Right Column Layout */
        .content-panel {
            padding: 24px;
        }
        @media (min-width: 768px) {
            .content-panel {
                grid-span: 8; /* md:col-span-8 */
                grid-column: span 8 / span 8;
                padding: 32px;
            }
        }
        
        .content-section {
            margin-bottom: 24px;
        }
        @media (min-width: 768px) {
            .content-section {
                margin-bottom: 32px;
            }
        }
        .content-section:last-child {
            margin-bottom: 0;
        }

        .summary-body {
            color: #475569;
            font-size: 12px;
            line-height: 1.625;
            letter-spacing: 0.025em;
        }

        /* Experience Vertical Timeline */
        .exp-stack {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        .exp-node {
            position: relative;
            border-left: 2px solid #f1f5f9;
            padding-left: 16px;
            padding-bottom: 4px;
        }
        .exp-bullet {
            position: absolute;
            left: -5px;
            top: 6px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #3b82f6;
        }
        .exp-meta-header {
            display: flex;
            flex-direction: column;
            margin-bottom: 4px;
            gap: 2px;
        }
        @media (min-width: 640px) {
            .exp-meta-header {
                flex-direction: row;
                justify-content: space-between;
                align-items: flex-start;
                gap: 0px;
            }
        }
        .exp-role {
            font-weight: 700;
            color: #1e293b;
            font-size: 12px;
        }
        @media (min-width: 768px) {
            .exp-role {
                font-size: 14px;
            }
        }
        .exp-duration {
            font-size: 9px;
            font-weight: 700;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .exp-company {
            font-size: 10px;
            font-weight: 700;
            color: #2563eb;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        .exp-description {
            font-size: 12px;
            color: #475569;
            line-height: 1.625;
            font-weight: 400;
        }

        /* Project Cards */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            gap: 12px;
        }
        .project-card {
            padding: 12px;
            border: 1px solid #f1f5f9;
            border-radius: 12px;
            background-color: rgba(248, 250, 252, 0.5);
            transition: background-color 0.2s;
        }
        .project-card:hover {
            background-color: #f8fafc;
        }
        .project-heading {
            font-size: 12px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 4px;
            text-transform: uppercase;
            letter-spacing: -0.025em;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .project-anchor {
            font-size: 9px;
            font-weight: 400;
            color: #3b82f6;
            text-transform: lowercase;
            text-decoration: underline;
        }
        .project-detail {
            font-size: 11px;
            color: #64748b;
            line-height: 1.5;
        }

        /* Clean Custom Scrollbars if content exceeds boundary dynamically */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }

        @media print {
            body { background: white; }
            .a4-wrapper { width: 210mm; height: 297mm; overflow: hidden; }
        }
    </style>
</head>
<body>

<div class="a4-wrapper">
    <div class="resume-header">
        <div class="header-left">
            <div class="avatar-container">
                <img src="${data.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'}" 
                     alt="Profile" 
                     class="profile-img">
                <div class="status-dot"></div>
            </div>
            <div class="title-block">
                <h1>${data.fullName || 'YOUR NAME'}</h1>
                <p>Full Stack Developer</p>
                <div class="meta-badges">
                    ${data.location ? `<span>📍 ${data.location}</span>` : ''}
                    ${data.email ? `<span>📧 ${data.email}</span>` : ''}
                </div>
            </div>
        </div>
        <div class="phone-container">
             ${data.phone ? `<div class="phone-badge">${data.phone}</div>` : ''}
        </div>
    </div>

    <div class="main-layout">
        
        <div class="sidebar">
            
            <div class="sidebar-section">
                <h3 class="section-label">Core Expertise</h3>
                <div class="skills-grid">
                    ${data.skills && data.skills.length > 0 && data.skills[0] !== ""
                      ? data.skills.map(s => s ? `<span class="skill-chip">${s}</span>` : '').join('')
                      : '<span class="fallback-text">No skills added yet</span>'
                    }
                </div>
            </div>

            <div class="sidebar-section">
                <h3 class="section-label">Education</h3>
                <div class="edu-stack">
                    ${data.education && data.education.length > 0 && data.education[0].degree
                      ? data.education.map(ed => `
                        <div class="edu-node">
                            <p class="edu-degree">${ed.degree}</p>
                            <p class="edu-school">${ed.school}</p>
                            <p class="edu-year">${ed.year}</p>
                        </div>
                      `).join('') 
                      : '<span class="fallback-text">Add academic timeline</span>'
                    }
                </div>
            </div>

            <div class="sidebar-section">
                <h3 class="section-label">Online Handles</h3>
                <div class="links-stack">
                    ${safeLinks.github ? `<p class="link-row"><span style="color: #94a3b8;">🔗</span> <span class="link-url">${safeLinks.github}</span></p>` : ''}
                    ${safeLinks.portfolio ? `<p class="link-row"><span style="color: #94a3b8;">🔗</span> <span class="link-url">${safeLinks.portfolio}</span></p>` : ''}
                    {!safeLinks.github && !safeLinks.portfolio ? '<span class="fallback-text">No links linked</span>' : ''}
                </div>
            </div>
        </div>

        <div class="content-panel">
            
            <div class="content-section">
                <h2 class="section-label">Profile Summary</h2>
                <p class="summary-body">
                    ${data.summary ? boldTech(data.summary) : '<span class="fallback-text">Start entering your summary setup to dynamically preview parameters here...</span>'}
                </p>
            </div>

            <div class="content-section">
                <h2 class="section-label">Work Experience</h2>
                <div class="exp-stack">
                    ${data.experience && data.experience.length > 0 && data.experience[0].role
                      ? data.experience.map(exp => `
                        <div class="exp-node">
                            <div class="exp-bullet"></div>
                            <div class="exp-meta-header">
                                <h4 class="exp-role">${exp.role}</h4>
                                <span class="exp-duration">${exp.startDate || 'Start'} - ${exp.endDate || 'Present'}</span>
                            </div>
                            <p class="exp-company">${exp.company}</p>
                            <div class="exp-description">
                                ${boldTech(exp.desc)}
                            </div>
                        </div>
                      `).join('') 
                      : '<span class="fallback-text">Your workplace timeline will auto-render here.</span>'
                    }
                </div>
            </div>

            <div class="content-section">
                <h2 class="section-label">Featured Projects</h2>
                <div class="projects-grid">
                    ${data.project && data.project.length > 0 && data.project[0].title
                      ? data.project.map(p => `
                        <div class="project-card">
                            <h4 class="project-heading">
                                <span>${p.title}</span>
                                ${p.link ? `<span class="project-anchor">${p.link}</span>` : ''}
                            </h4>
                            <p class="project-detail">${boldTech(p.desc)}</p>
                        </div>
                      `).join('') 
                      : '<span class="fallback-text">No production modules loaded.</span>'
                    }
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>
`;
};