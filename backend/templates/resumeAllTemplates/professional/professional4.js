export const professional4 = (data) => {
  const resumeContent = data.content || data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Inter:wght@300;400;500;600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #f0f2f5; font-family: 'Inter', sans-serif; color: #1a1a1a; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  
  /* STRICT SINGLE PAGE A4 BOUNDARY */
  .page {
    width: 210mm;
    height: 297mm;
    max-height: 297mm;
    background: #fff;
    margin: 20px auto;
    padding: 30px 40px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }

  /* HEADER SECTION */
  header { 
    text-align: center; 
    margin-bottom: 10px;
    flex-shrink: 0;
  }
  header h1 { 
    font-family: 'Cinzel', serif;
    font-size: 26px; 
    font-weight: 700; 
    text-transform: uppercase; 
    letter-spacing: 2px; 
    color: #111;
    margin-bottom: 4px;
  }
  
  .contact-inline-bar { 
    display: flex; 
    justify-content: center; 
    align-items: center;
    gap: 14px; 
    flex-wrap: wrap; 
    list-style: none;
    font-size: 11px;
    color: #333;
    font-weight: 500;
  }
  .contact-inline-bar li { display: flex; align-items: center; gap: 4px; }
  .contact-inline-bar a { color: #111; text-decoration: underline; break-all: break-all; }

  /* COMPACT AUTO-SCALING FLOW CONTAINER */
  .content-flow {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-grow: 1;
    overflow-y: auto;
  }
  .content-flow::-webkit-scrollbar { width: 0px; background: transparent; }
  .content-flow { scrollbar-width: none; }

  /* SECTION TITLE WITH RED UNDERLINE (As in Screenshot) */
  .section-block { display: flex; flex-direction: column; width: 100%; }
  
  .section-title {
    font-size: 13.5px;
    font-weight: 700;
    color: #cf2e2e; /* Exact Red Accent Color from Image */
    border-bottom: 1.5px solid #cf2e2e;
    padding-bottom: 1px;
    margin-bottom: 6px;
    width: 100%;
  }

  /* DATA ROW METADATA */
  .node-row-meta { display: flex; justify-content: space-between; align-items: baseline; font-size: 11.5px; margin-bottom: 1px; }
  .node-title-bold { font-weight: 700; color: #111; }
  .node-aside-right { font-weight: 600; color: #222; text-align: right; font-size: 11px; }
  
  .node-subtitle { font-size: 11px; color: #444; font-style: italic; margin-bottom: 3px; }

  /* COMPACT UNIFORM BULLETS */
  .bullet-list { padding-left: 16px; display: flex; flex-direction: column; gap: 2.5px; list-style-type: disc; }
  .bullet-list li { font-size: 11px; color: #222; line-height: 1.35; text-align: justify; }

  /* TECHNICAL SKILLS MATRIX STYLE */
  .skills-matrix { display: flex; flex-direction: column; gap: 3px; font-size: 11px; }
  .skills-row { display: flex; gap: 6px; }
  .skills-label { font-weight: 700; color: #111; min-width: 130px; flex-shrink: 0; }
  .skills-value { color: #333; }

  @media print { 
    body { background: none; padding: 0; } 
    .page { margin: 0; box-shadow: none; height: 297mm; max-height: 297mm; padding: 25px 35px; } 
    .content-flow { overflow: hidden; }
  }
</style>
</head>
<body>

<div class="page">
  
  <!-- HEADER -->
  <header>
    <h1>${resumeContent.fullName || 'SAKSHI LIMAYE'}</h1>
    
    <ul class="contact-inline-bar">
      ${resumeContent.phone ? `<li>📞 ${resumeContent.phone}</li>` : ''}
      ${resumeContent.email ? `<li>✉️ <a href="mailto:${resumeContent.email}">${resumeContent.email}</a></li>` : ''}
      
      ${resumeContent.links?.linkedin ? `
        <li>🔗 <a href="${resumeContent.links.linkedin}" target="_blank">${resumeContent.links.linkedin}</a></li>
      ` : ''}
      
      ${resumeContent.links?.github ? `
        <li>💻 <a href="${resumeContent.links.github}" target="_blank">${resumeContent.links.github}</a></li>
      ` : ''}
      
      ${resumeContent.links?.portfolio ? `
        <li>🌐 <a href="${resumeContent.links.portfolio}" target="_blank">${resumeContent.links.portfolio}</a></li>
      ` : ''}
    </ul>
  </header>

  <!-- MAIN SCROLLABLE CONTENT FLOW -->
  <div class="content-flow">


  
  
<!-- SUMMARY -->
${resumeContent.summary ? `
<div class="section-block">
  <h2 class="section-title">Summary</h2>

  <div style="margin-bottom: 6px;">
    <div class="node-row-meta">
      <span style="font-size: inherit; font-weight: normal; line-height: inherit;">
        ${resumeContent.summary}
      </span>
    </div>
  </div>
</div>
` : ''}



    <!-- EDUCATION -->
    ${resumeContent.education && resumeContent.education.length > 0 ? `
    <div class="section-block">
      <h2 class="section-title">Education</h2>
      ${resumeContent.education.map(ed => `
        <div style="margin-bottom: 4px;">
          <div class="node-row-meta">
            <span class="node-title-bold">${ed.school || ''}</span>
            <span class="node-aside-right">${ed.year || ''}</span>
          </div>
          <div class="node-row-meta">
            <span class="node-subtitle">${ed.degree || ''} ${ed.field ? `in ${ed.field}` : ''}</span>
            ${ed.grade ? `<span class="node-aside-right" style="font-style:italic;">${ed.grade}</span>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- EXPERIENCE -->
    ${resumeContent.experience && resumeContent.experience.length > 0 ? `
    <div class="section-block">
      <h2 class="section-title">Experience</h2>
      ${resumeContent.experience.map(exp => `
        <div style="margin-bottom: 6px;">
          <div class="node-row-meta">
            <span class="node-title-bold">${exp.company || ''} ${exp.projectContext ? `(${exp.projectContext})` : ''}</span>
            <span class="node-aside-right">${exp.startDate || ''} – ${exp.current ? 'Present' : (exp.endDate || '')}</span>
          </div>
          ${exp.role ? `<div class="node-subtitle">${exp.role}</div>` : ''}
          ${exp.desc ? `
            <ul class="bullet-list">
              <li>${exp.desc}</li>
            </ul>
          ` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- PROJECTS -->
    ${resumeContent.project && resumeContent.project.length > 0 ? `
    <div class="section-block">
      <h2 class="section-title">Projects</h2>
      ${resumeContent.project.map(proj => `
        <div style="margin-bottom: 6px;">
          <div class="node-row-meta">
            <span class="node-title-bold">
              ${proj.title} ${proj.subtitle ? `: ${proj.subtitle}` : ''}
            </span>
            ${proj.link ? `<span class="node-aside-right"><a href="${proj.link}" target="_blank" style="color:#cf2e2e; text-decoration:underline;">Link</a></span>` : ''}
          </div>
          ${proj.desc ? `
            <ul class="bullet-list">
              <li>${proj.desc}</li>
            </ul>
          ` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- RESEARCH AND PATENT / EXTRA PUBLICATIONS (Dynamic Optional Block) -->
    ${resumeContent.publications && resumeContent.publications.length > 0 ? `
    <div class="section-block">
      <h2 class="section-title">Research and Patent</h2>
      ${resumeContent.publications.map(pub => `
        <div style="margin-bottom: 5px;">
          <div class="node-row-meta">
            <span class="node-title-bold">${pub.title}</span>
            ${pub.link ? `<span class="node-aside-right"><a href="${pub.link}" target="_blank" style="color:#cf2e2e; text-decoration:underline;">Link</a></span>` : ''}
          </div>
          ${pub.desc ? `
            <ul class="bullet-list">
              <li>${pub.desc}</li>
            </ul>
          ` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- TECHNICAL SKILLS -->
    ${resumeContent.skills && resumeContent.skills.length > 0 ? `
    <div class="section-block">
      <h2 class="section-title">Technical Skills</h2>
      <div class="skills-matrix">
        ${Array.isArray(resumeContent.skills) ? `
          <div class="skills-row">
            <span class="skills-label">Skills & Frameworks:</span>
            <span class="skills-value">${resumeContent.skills.join(', ')}</span>
          </div>
        ` : ''}
      </div>
    </div>
    ` : ''}

    <!-- LANGUAGES -->
    ${resumeContent.languages && resumeContent.languages.length > 0 ? `
    <div class="section-block">
      <h2 class="section-title">Languages</h2>
      <div class="skills-matrix">
        ${Array.isArray(resumeContent.languages) ? `
          <div class="skills-row">
            <span class="skills-label">Languages:</span>
            <span class="skills-value">${resumeContent.languages.join(', ')}</span>
          </div>
        ` : ''}
      </div>
    </div>
    ` : ''}

    <!-- CERTIFICATIONS -->
    ${resumeContent.certification && resumeContent.certification.length > 0 ? `
    <div class="section-block">
      <h2 class="section-title">Certifications</h2>
      <ul class="bullet-list">
        ${resumeContent.certification.map(cert => `
          <li>
            <strong>${cert.name || ''}</strong> 
            ${cert.issuer ? ` - ${cert.issuer}` : ''} 
            ${cert.date ? ` (${cert.date})` : ''}
          </li>
        `).join('')}
      </ul>
    </div>
    ` : ''}

   
  </div>
</div>

</body>
</html>
  `;
};