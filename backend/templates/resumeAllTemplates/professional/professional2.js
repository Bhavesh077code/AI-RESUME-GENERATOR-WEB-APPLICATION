export const professional2 = (data) => {
  const resumeContent = data.content || data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Times+New+Roman&family=Inter:wght@300;400;500;600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #f0f2f5; font-family: 'Inter', sans-serif; color: #111111; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  
  /* PERFECT HYBRID FRAME LOCK FOR MAXIMUM A4 MANAGEMENT */
  .page {
    width: 210mm;
    height: 297mm;
    max-height: 297mm;
    background: #fff;
    margin: 20px auto;
    padding: 35px 45px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }

  /* HARVARD-STYLE CENTERED HEADER */
  header { 
    text-align: center; 
    margin-bottom: 12px;
    flex-shrink: 0;
  }
  header h1 { 
    font-size: 26px; 
    font-weight: 500; 
    text-transform: uppercase; 
    letter-spacing: 1px; 
    color: #000;
    margin-bottom: 4px;
  }
  header .sub-address {
    font-size: 11px;
    color: #333;
    margin-bottom: 6px;
  }
  
  .contact-inline-bar { 
    display: flex; 
    justify-content: center; 
    align-items: center;
    gap: 12px; 
    flex-wrap: wrap; 
    list-style: none;
    font-size: 11px;
    color: #222;
  }
  .contact-inline-bar li { display: flex; align-items: center; gap: 4px; }
  .contact-inline-bar a { color: #002b66; text-decoration: underline; break-all: break-all; }
  .divider-dot { color: #888; font-weight: bold; }

  /* ATS ENGINE BODY CONTAINER */
  .ats-content-flow {
    display: flex;
    flex-direction: column;
    gap: 14px;
    flex-grow: 1;
    overflow-y: auto;
    margin-top: 5px;
  }
  .ats-content-flow::-webkit-scrollbar { width: 0px; background: transparent; }
  .ats-content-flow { scrollbar-width: none; }

  /* CLASSIC CENTRIC SECTION H2 */
  .section-block { display: flex; flex-direction: column; width: 100%; }
  
  .section-title-bar {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #002b66; /* Deep Corporate Navy blue tint from original template style */
    text-align: center;
    border-bottom: 1px solid #111;
    padding-bottom: 2px;
    margin-bottom: 8px;
    width: 100%;
  }

  /* DYNAMIC NODE BLOCK WITH LEFT-RIGHT METADATA */
  .node-row-meta { display: flex; justify-content: space-between; align-items: baseline; font-size: 12px; margin-bottom: 2px; }
  .node-title-bold { font-weight: 700; color: #000; }
  .node-aside-right { font-weight: 600; color: #222; text-align: right; font-size: 11.5px; }
  
  .node-subtitle { font-size: 12px; color: #333; font-style: italic; margin-bottom: 4px; }

  /* COMPACT UNIFORM BULLETS */
  .ats-bullets { padding-left: 18px; display: flex; flex-direction: column; gap: 3.5px; list-style-type: disc; }
  .ats-bullets li { font-size: 11.5px; color: #222; line-height: 1.45; text-align: justify; }

  /* SKILLS TABLE-STYLE MATRIX KEY VALUE */
  .skills-matrix-stack { display: flex; flex-direction: column; gap: 4px; }
  .matrix-line { font-size: 11.5px; line-height: 1.4; color: #222; }
  .matrix-label { font-weight: 700; color: #111; display: inline-block; min-width: 110px; }

  @media print { 
    body { background: none; padding: 0; } 
    .page { margin: 0; box-shadow: none; height: 297mm; max-height: 297mm; padding: 35px 45px; } 
    .ats-content-flow { overflow: hidden; }
  }
</style>
</head>
<body>

<div class="page">
  
  <!-- CENTERED HEADER COMPONENT (As seen in 1782115048165.jpg) -->
  <header>
    <h1>${resumeContent.fullName || 'CHIRANJIVI KUMAR'}</h1>
    ${resumeContent.location ? `<div class="sub-address">${resumeContent.location}</div>` : ''}
    
    <ul class="contact-inline-bar">
      ${resumeContent.phone ? `<li>📞 ${resumeContent.phone}</li>` : ''}
      
      ${resumeContent.email ? `
        <span class="divider-dot">•</span>
        <li>✉️ <a href="mailto:${resumeContent.email}">${resumeContent.email}</a></li>
      ` : ''}
      
      ${resumeContent.links?.linkedin ? `
        <span class="divider-dot">•</span>
        <li>🔗 <a href="${resumeContent.links.linkedin}" target="_blank">${resumeContent.links.linkedin}</a></li>
      ` : ''}
      
      ${resumeContent.links?.github ? `
        <span class="divider-dot">•</span>
        <li>💻 <a href="${resumeContent.links.github}" target="_blank">${resumeContent.links.github}</a></li>
      ` : ''}
      
      ${resumeContent.links?.portfolio ? `
        <span class="divider-dot">•</span>
        <li>🌐 <a href="${resumeContent.links.portfolio}" target="_blank">${resumeContent.links.portfolio}</a></li>
      ` : ''}
    </ul>
  </header>

  <!-- ATS SCROLL FLOW ENGINE -->
  <div class="ats-content-flow">

    <!-- PROFILE SUMMARY (Conditional Rendering) -->
    ${resumeContent.summary ? `
    <div class="section-block">
      <h2 class="section-title-bar">Professional Summary</h2>
      <p style="font-size: 11.5px; line-height: 1.5; color: #222; text-align: justify;">${resumeContent.summary}</p>
    </div>
    ` : ''}

    <!-- EDUCATION SECTION (Top placement like 1782115048165.jpg) -->
    ${resumeContent.education && resumeContent.education.length > 0 ? `
    <div class="section-block">
      <h2 class="section-title-bar">Education</h2>
      ${resumeContent.education.map(ed => ed.school || ed.degree ? `
        <div style="margin-bottom: 6px;">
          <div class="node-row-meta">
            <span class="node-title-bold">${ed.school || ''}</span>
            <span class="node-aside-right">${ed.location || ''}</span>
          </div>
          <div class="node-row-meta" style="margin-top: 1px;">
            <span class="node-subtitle">${ed.degree || ''} ${ed.field ? `in ${ed.field}` : ''}</span>
            <span class="node-aside-right" style="font-weight: 400; color: #444;">${ed.year || ''}</span>
          </div>
        </div>
      ` : '').join('')}
    </div>
    ` : ''}

    <!-- SKILLS SUMMARY SECTION -->
    ${resumeContent.skills && resumeContent.skills.length > 0 ? `
    <div class="section-block">
      <h2 class="section-title-bar">Skills Summary</h2>
      <div class="skills-matrix-stack">
        <div class="matrix-line">
          <span class="matrix-label">• Core Expertise:</span> 
          <span>${resumeContent.skills.join(', ')}</span>
        </div>
      </div>
    </div>
    ` : ''}

    <!-- WORK EXPERIENCE SECTION -->
    ${resumeContent.experience && resumeContent.experience.length > 0 ? `
    <div class="section-block">
      <h2 class="section-title-bar">Work Experience</h2>
      ${resumeContent.experience.map(exp => exp.company || exp.role ? `
        <div style="margin-bottom: 8px;">
          <div class="node-row-meta">
            <span class="node-title-bold">${exp.role || ''} | ${exp.company || ''}</span>
            <span class="node-aside-right">${exp.startDate || ''} – ${exp.current ? 'Present' : (exp.endDate || '')}</span>
          </div>
          ${exp.desc ? `
            <ul class="ats-bullets">
              <li>${exp.desc}</li>
            </ul>
          ` : ''}
        </div>
      ` : '').join('')}
    </div>
    ` : ''}

    <!-- PROJECTS SECTION -->
    ${resumeContent.project && resumeContent.project.length > 0 ? `
    <div class="section-block">
      <h2 class="section-title-bar">Projects</h2>
      ${resumeContent.project.map(proj => proj.title ? `
        <div style="margin-bottom: 8px;">
          <div class="node-row-meta">
            <span class="node-title-bold">
              ${proj.title} 
              ${proj.link ? `| <a href="${proj.link}" target="_blank" style="color:#002b66; text-decoration:underline; font-weight:normal; font-size:11px;">LINK</a>` : ''}
            </span>
            <span class="node-aside-right" style="font-weight:400; color:#444;">${proj.date || ''}</span>
          </div>
          ${proj.desc ? `
            <ul class="ats-bullets">
              <li>${proj.desc}</li>
            </ul>
          ` : ''}
        </div>
      ` : '').join('')}
    </div>
    ` : ''}

    <!-- CERTIFICATES SECTION -->
    ${resumeContent.certification && resumeContent.certification.length > 0 ? `
    <div class="section-block">
      <h2 class="section-title-bar">Certificates</h2>
      ${resumeContent.certification.map(cert => cert.name ? `
        <div style="margin-bottom: 6px;">
          <div class="node-row-meta">
            <span class="node-title-bold">${cert.name} ${cert.issuer ? `(${cert.issuer})` : ''}</span>
            <span class="node-aside-right" style="font-weight:400; color:#444;">${cert.date || ''}</span>
          </div>
        </div>
      ` : '').join('')}
    </div>
    ` : ''}

    <!-- LANGUAGES SECTION -->
    ${resumeContent.languages && resumeContent.languages.length > 0 ? `
    <div class="section-block">
      <h2 class="section-title-bar">Languages</h2>
      <p style="font-size: 11.5px; color: #222; padding-left: 2px;">
        <strong>Languages Known:</strong> ${resumeContent.languages.join(', ')}
      </p>
    </div>
    ` : ''}

  </div>
</div>

</body>
</html>
  `;
};