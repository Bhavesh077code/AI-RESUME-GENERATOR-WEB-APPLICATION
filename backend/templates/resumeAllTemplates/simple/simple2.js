export const simple2 = (data) => {
  const resumeContent = data.content || data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #f0f2f5; font-family: 'Outfit', sans-serif; color: #2d3748; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  
  /* ABSOLUTE HEIGHT BOUNDARY FOR MAX CONTENT MANAGEMENT */
  .page {
    width: 210mm;
    height: 297mm;
    max-height: 297mm;
    background: #fff;
    margin: 20px auto;
    padding: 35px 40px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }

  header { border-left: 4px solid #1a202c; padding-left: 15px; flex-shrink: 0; }
  header h1 { font-size: 30px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #1a202c; }
  header p { font-size: 13px; color: #4a5568; font-weight: 500; text-transform: uppercase; letter-spacing: 2px; margin-top: 1px; }
  
  .contact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 12px; list-style: none; }
  .contact-grid li { font-size: 12px; color: #4a5568; }
  .contact-grid a { color: #4a5568; text-decoration: none; }

  /* OVERFLOW CONTAINMENT MODULE */
  .inner-scroll-body {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-top: 15px;
    overflow-y: auto;
    padding-right: 2px;
  }
  .inner-scroll-body::-webkit-scrollbar { width: 0px; background: transparent; }
  .inner-scroll-body { scrollbar-width: none; }

  .section-wrapper { display: flex; flex-direction: column; gap: 8px; }
  .section-head-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #1a202c; border-bottom: 2px solid #e2e8f0; padding-bottom: 3px; }
  
  .paragraph-style { font-size: 12.5px; line-height: 1.5; color: #4a5568; text-align: justify; }

  .data-node { display: flex; flex-direction: column; gap: 2px; margin-bottom: 4px; }
  .data-node-split { display: flex; justify-content: space-between; align-items: baseline; font-size: 12.5px; }
  .bold-title { font-weight: 700; color: #1a202c; font-size: 13.5px; }
  .date-style { font-weight: 500; color: #718096; font-size: 11.5px; }

  .pill-container { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 2px; }
  .pill-skill { font-size: 11px; font-weight: 600; color: #1a202c; background: #edf2f7; padding: 3px 8px; border-radius: 4px; }

  .bullet-structure { padding-left: 15px; display: flex; flex-direction: column; gap: 3px; }
  .bullet-structure li { font-size: 12.5px; color: #4a5568; }

  @media print { 
    body { background: none; padding: 0; } 
    .page { margin: 0; box-shadow: none; height: 297mm; max-height: 297mm; } 
    .inner-scroll-body { overflow: hidden; }
  }
</style>
</head>
<body>

<div class="page">
  <!-- DYNAMIC HEADER -->
  ${resumeContent.fullName ? `
  <header>
    <h1>${resumeContent.fullName}</h1>
    ${resumeContent.experience?.[0]?.role ? `<p>${resumeContent.experience[0].role}</p>` : ''}
    
    <ul class="contact-grid">
      ${resumeContent.phone ? `<li>📞 ${resumeContent.phone}</li>` : ''}
      ${resumeContent.email ? `<li>✉️ ${resumeContent.email}</li>` : ''}
      ${resumeContent.location ? `<li>📍 ${resumeContent.location}</li>` : ''}
      ${resumeContent.links?.portfolio ? `<li>🌐 <a href="${resumeContent.links.portfolio}" target="_blank">Portfolio</a></li>` : ''}
      ${resumeContent.links?.linkedin ? `<li>🔗 <a href="${resumeContent.links.linkedin}" target="_blank">LinkedIn</a></li>` : ''}
      ${resumeContent.links?.github ? `<li>💻 <a href="${resumeContent.links.github}" target="_blank">GitHub</a></li>` : ''}
    </ul>
  </header>
  ` : ''}

  <!-- CORE FLOW DATA BAR -->
  <div class="inner-scroll-body">

    <!-- ABOUT -->
    ${resumeContent.summary ? `
    <div class="section-wrapper">
      <h2 class="section-head-title">Profile Summary</h2>
      <p class="paragraph-style">${resumeContent.summary}</p>
    </div>
    ` : ''}

    <!-- EXPERIENCE -->
    ${resumeContent.experience && resumeContent.experience.length > 0 ? `
    <div class="section-wrapper">
      <h2 class="section-head-title">Professional Experience</h2>
      ${resumeContent.experience.map(exp => exp.company || exp.role ? `
        <div class="data-node">
          <div class="data-node-split">
            <span class="bold-title">${exp.company || ''}</span>
            ${exp.startDate ? `<span class="date-style">${exp.startDate} - ${exp.current ? 'PRESENT' : (exp.endDate || '')}</span>` : ''}
          </div>
          ${exp.role ? `<div class="paragraph-style" style="font-weight:500; font-style: italic;">${exp.role}</div>` : ''}
          ${exp.desc ? `<p class="paragraph-style">${exp.desc}</p>` : ''}
        </div>
      ` : '').join('')}
    </div>
    ` : ''}

    <!-- PROJECTS -->
    ${resumeContent.project && resumeContent.project.length > 0 ? `
    <div class="section-wrapper">
      <h2 class="section-head-title">Key Projects</h2>
      ${resumeContent.project.map(proj => proj.title ? `
        <div class="data-node">
          <div class="data-node-split">
            <span class="bold-title">${proj.title}</span>
            ${proj.link ? `<span class="date-style"><a href="${proj.link}" target="_blank" style="color:#2b6cb0; text-decoration:none;">View Project</a></span>` : ''}
          </div>
          ${proj.desc ? `<p class="paragraph-style">${proj.desc}</p>` : ''}
        </div>
      ` : '').join('')}
    </div>
    ` : ''}

    <!-- EDUCATION -->
    ${resumeContent.education && resumeContent.education.length > 0 ? `
    <div class="section-wrapper">
      <h2 class="section-head-title">Education</h2>
      ${resumeContent.education.map(ed => ed.school || ed.degree ? `
        <div class="data-node">
          <div class="data-node-split">
            <span class="bold-title">${ed.school || ''}</span>
            ${ed.year ? `<span class="date-style">${ed.year}</span>` : ''}
          </div>
          ${ed.degree || ed.field ? `<div class="paragraph-style">${ed.degree || ''} ${ed.field ? `(${ed.field})` : ''}</div>` : ''}
        </div>
      ` : '').join('')}
    </div>
    ` : ''}

    <!-- CERTIFICATIONS -->
    ${resumeContent.certification && resumeContent.certification.length > 0 ? `
    <div class="section-wrapper">
      <h2 class="section-head-title">Certifications</h2>
      <ul class="bullet-structure" style="list-style-type: circle;">
        ${resumeContent.certification.map(cert => cert.name ? `
          <li><strong>${cert.name}</strong> ${cert.issuer ? `| ${cert.issuer}` : ''} ${cert.date ? `(${cert.date})` : ''}</li>
        ` : '').join('')}
      </ul>
    </div>
    ` : ''}

    <!-- SKILLS -->
    ${resumeContent.skills && resumeContent.skills.length > 0 ? `
    <div class="section-wrapper">
      <h2 class="section-head-title">Core Competencies</h2>
      <div class="pill-container">
        ${resumeContent.skills.map(s => s ? `<span class="pill-skill">${s}</span>` : '').join('')}
      </div>
    </div>
    ` : ''}

    <!--languages-->
    ${resumeContent.languages && resumeContent.languages.length > 0 ? `
    <div class="section-wrapper">
      <h2 class="section-head-title">Languages</h2>
      <div class="pill-container">
        ${resumeContent.languages.map(l => l ? `<span class="pill-skill">${l}</span>` : '').join('')}
      </div>
    </div>
    ` : ''}

  </div>
</div>

</body>
</html>
  `;
};