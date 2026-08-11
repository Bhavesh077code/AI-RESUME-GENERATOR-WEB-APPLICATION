export const simple1 = (data) => {
  const resumeContent = data.content || data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #f0f2f5; font-family: 'Inter', sans-serif; color: #2c3e50; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  
  /* STRICT SINGLE-PAGE BOUNDARY */
  .page {
    width: 210mm;
    height: 297mm;
    max-height: 297mm;
    background: #fff;
    margin: 20px auto;
    padding: 30px 45px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }

  header { text-align: center; margin-bottom: 5px; flex-shrink: 0; }
  header h1 { font-size: 28px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #111; margin-bottom: 3px; }
  header p { font-size: 13px; color: #555; font-weight: 500; letter-spacing: 1px; margin-bottom: 12px; }
  
  .contact-bar { display: flex; justify-content: center; gap: 18px; flex-wrap: wrap; list-style: none; padding-bottom: 12px; border-bottom: 2px solid #111; }
  .contact-bar li { font-size: 11.5px; color: #333; display: flex; align-items: center; gap: 4px; }
  .contact-bar a { color: #333; text-decoration: none; }

  /* MAIN CONTENT AREA WITH SCROLL CONTROL IF DATA OVERFLOWS */
  .main-content-flow {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex-get: 1;
    overflow-y: auto;
    margin-top: 10px;
    padding-right: 2px;
  }
  
  /* HIDE SCROLLBARS */
  .main-content-flow::-webkit-scrollbar { width: 0px; background: transparent; }
  .main-content-flow { scrollbar-width: none; }

  .section-container { display: flex; flex-direction: column; gap: 8px; }
  .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #111; padding-bottom: 2px; }
  
  .section-divider { border: none; border-top: 1px solid #ddd; margin-top: 8px; flex-shrink: 0; }

  .content-text { font-size: 12px; line-height: 1.5; color: #444; text-align: justify; }

  .node-block { display: flex; flex-direction: column; gap: 3px; margin-bottom: 6px; }
  .node-header { display: flex; justify-content: space-between; align-items: baseline; font-size: 12px; color: #555; }
  .node-meta-bold { font-weight: 700; color: #111; font-size: 12.5px; }
  .node-date { font-weight: 500; color: #666; font-size: 11.5px; }
  
  .bullet-list { padding-left: 15px; display: flex; flex-direction: column; gap: 4px; }
  .bullet-list li { font-size: 12px; color: #444; line-height: 1.4; }

  .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; padding-left: 5px; list-style: none; }
  .skills-grid li { font-size: 12px; color: #444; }

  @media print { 
    body { background: none; padding: 0; } 
    .page { margin: 0; box-shadow: none; height: 297mm; max-height: 297mm; } 
    .main-content-flow { overflow: hidden; }
  }
</style>
</head>
<body>

<div class="page">
  <!-- HEADER -->
  ${resumeContent.fullName ? `
  <header>
    <h1>${resumeContent.fullName}</h1>
    ${resumeContent.experience?.[0]?.role ? `<p>${resumeContent.experience[0].role}</p>` : ''}
    
    <ul class="contact-bar">
      ${resumeContent.phone ? `<li>📞 ${resumeContent.phone}</li>` : ''}
      ${resumeContent.email ? `<li>✉️ ${resumeContent.email}</li>` : ''}
      ${resumeContent.location ? `<li>📍 ${resumeContent.location}</li>` : ''}
      ${resumeContent.links?.portfolio ? `<li>🌐 <a href="${resumeContent.links.portfolio}" target="_blank">Portfolio</a></li>` : ''}
      ${resumeContent.links?.linkedin ? `<li>🔗 <a href="${resumeContent.links.linkedin}" target="_blank">LinkedIn</a></li>` : ''}
      ${resumeContent.links?.github ? `<li>💻 <a href="${resumeContent.links.github}" target="_blank">GitHub</a></li>` : ''}
    </ul>
  </header>
  ` : ''}

  <!-- MAIN SCROLLABLE WRAPPER -->
  <div class="main-content-flow">

    <!-- ABOUT ME -->
    ${resumeContent.summary ? `
    <div class="section-container">
      <h2 class="section-title">About Me</h2>
      <p class="content-text">${resumeContent.summary}</p>
    </div>
    <hr class="section-divider">
    ` : ''}

    <!-- EDUCATION -->
    ${resumeContent.education && resumeContent.education.length > 0 ? `
    <div class="section-container">
      <h2 class="section-title">Education</h2>
      ${resumeContent.education.map(ed => ed.school || ed.degree ? `
        <div class="node-block">
          <div class="node-header">
            <span class="node-meta-bold">${ed.school || ''}</span>
            ${ed.year ? `<span class="node-date">${ed.year}</span>` : ''}
          </div>
          ${ed.degree || ed.field ? `<div class="content-text" style="font-weight:600;">${ed.degree || ''} ${ed.field ? `| ${ed.field}` : ''}</div>` : ''}
        </div>
      ` : '').join('')}
    </div>
    <hr class="section-divider">
    ` : ''}

    <!-- WORK EXPERIENCE -->
    ${resumeContent.experience && resumeContent.experience.length > 0 ? `
    <div class="section-container">
      <h2 class="section-title">Work Experience</h2>
      ${resumeContent.experience.map(exp => exp.company || exp.role ? `
        <div class="node-block">
          <div class="node-header">
            <span class="node-meta-bold">${exp.company || ''}</span>
            ${exp.startDate ? `<span class="node-date">${exp.startDate} - ${exp.current ? 'PRESENT' : (exp.endDate || '')}</span>` : ''}
          </div>
          ${exp.role ? `<div class="content-text" style="font-weight:600; margin-bottom: 2px;">${exp.role}</div>` : ''}
          ${exp.desc ? `<p class="content-text">${exp.desc}</p>` : ''}
        </div>
      ` : '').join('')}
    </div>
    <hr class="section-divider">
    ` : ''}

    <!-- KEY PROJECTS -->
    ${resumeContent.project && resumeContent.project.length > 0 ? `
    <div class="section-container">
      <h2 class="section-title">Key Projects</h2>
      ${resumeContent.project.map(proj => proj.title ? `
        <div class="node-block">
          <div class="node-header">
            <span class="node-meta-bold">${proj.title}</span>
            ${proj.link ? `<span class="node-date"><a href="${proj.link}" target="_blank" style="color:#111; text-decoration:underline;">Link</a></span>` : ''}
          </div>
          ${proj.desc ? `<p class="content-text">${proj.desc}</p>` : ''}
        </div>
      ` : '').join('')}
    </div>
    <hr class="section-divider">
    ` : ''}

    <!-- CERTIFICATES -->
    ${resumeContent.certification && resumeContent.certification.length > 0 ? `
    <div class="section-container">
      <h2 class="section-title">Certificates</h2>
      <ul class="bullet-list" style="list-style-type: square;">
        ${resumeContent.certification.map(cert => cert.name ? `
          <li><strong>${cert.name}</strong> ${cert.issuer ? `— ${cert.issuer}` : ''} ${cert.date ? `(${cert.date})` : ''}</li>
        ` : '').join('')}
      </ul>
    </div>
    <hr class="section-divider">
    ` : ''}

    <!-- SKILLS -->
    ${resumeContent.skills && resumeContent.skills.length > 0 ? `
    <div class="section-container">
      <h2 class="section-title">Skills</h2>
      <ul class="skills-grid">
        ${resumeContent.skills.map(s => s ? `<li>• ${s}</li>` : '').join('')}
      </ul>
    </div>
    ` : ''}

    <!--Languages-->
    ${resumeContent.languages && resumeContent.languages.length > 0 ? `
    <div class="section-container">
      <h2 class="section-title">Languages</h2>
      <ul class="skills-grid">
        ${resumeContent.languages.map(s => s ? `<li>• ${s}</li>` : '').join('')}
      </ul>
    </div>
    ` : ''}

  </div>
</div>

</body>
</html>
  `;
};