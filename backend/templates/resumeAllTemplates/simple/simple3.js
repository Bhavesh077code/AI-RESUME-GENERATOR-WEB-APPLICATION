export const simple3 = (data) => {
  const resumeContent = data.content || data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #f0f2f5; font-family: 'Plus Jakarta Sans', sans-serif; color: #1e293b; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  
  /* PREMIUM HR-TARGETED SINGLE PAGE EXECUTIVE LAYOUT */
  .page {
    width: 210mm;
    height: 297mm;
    max-height: 297mm;
    background: #fff;
    margin: 20px auto;
    padding: 40px 45px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }

  /* REFINED TOP BANNER WITH SUBTLE ACCENT */
  header { 
    border-bottom: 2px solid #0f172a; 
    padding-bottom: 15px; 
    display: flex; 
    justify-content: space-between; 
    align-items: flex-end;
    flex-shrink: 0;
  }
  .header-left h1 { font-size: 28px; font-weight: 700; color: #0f172a; letter-spacing: -0.5px; line-height: 1.1; }
  .header-left p { font-size: 13px; color: #2563eb; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px; }
  
  .contact-list-right { display: flex; flex-direction: column; gap: 3px; list-style: none; text-align: right; }
  .contact-list-right li { font-size: 11.5px; color: #475569; font-weight: 500; }
  .contact-list-right a { color: #2563eb; text-decoration: none; }

  /* OVERFLOW CONTROLLER FOR HEAVY CONTENT */
  .executive-flow-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
    overflow-y: auto;
    padding-right: 2px;
  }
  .executive-flow-body::-webkit-scrollbar { width: 0px; background: transparent; }
  .executive-flow-body { scrollbar-width: none; }

  /* MODERN ROW STRUCTURE FOR QUICK SCANNABILITY */
  .section-row { display: grid; grid-template-columns: 24% 76%; align-items: start; gap: 15px; }
  .section-sidebar-title { font-size: 12.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #0f172a; position: relative; padding-top: 2px; }
  
  .section-main-content { display: flex; flex-direction: column; gap: 12px; }
  .paragraph-style { font-size: 12.5px; line-height: 1.55; color: #334155; text-align: justify; }

  .data-chunk { display: flex; flex-direction: column; gap: 3px; }
  .chunk-row-split { display: flex; justify-content: space-between; align-items: baseline; }
  .meta-title-bold { font-weight: 700; color: #0f172a; font-size: 13.5px; }
  .date-badge-style { font-weight: 600; color: #64748b; font-size: 11px; text-transform: uppercase; }
  .sub-role-title { font-size: 12px; color: #475569; font-weight: 500; }

  .bullet-points-wrapper { padding-left: 15px; display: flex; flex-direction: column; gap: 3.5px; }
  .bullet-points-wrapper li { font-size: 12.5px; color: #334155; line-height: 1.5; }

  .badges-flex-box { display: flex; flex-wrap: wrap; gap: 6px; }
  .badge-item { font-size: 11px; font-weight: 600; color: #0f172a; background: #f1f5f9; padding: 4px 10px; border-radius: 99px; border: 1px solid #e2e8f0; }

  @media print { 
    body { background: none; padding: 0; } 
    .page { margin: 0; box-shadow: none; height: 297mm; max-height: 297mm; } 
    .executive-flow-body { overflow: hidden; }
  }
</style>
</head>
<body>

<div class="page">
  <!-- EXECUTIVE HEADER -->
  ${resumeContent.fullName ? `
  <header>
    <div class="header-left">
      <h1>${resumeContent.fullName}</h1>
      ${resumeContent.experience?.[0]?.role ? `<p>${resumeContent.experience[0].role}</p>` : ''}
    </div>
    
    <ul class="contact-list-right">
      ${resumeContent.phone ? `<li>${resumeContent.phone} 📞</li>` : ''}
      ${resumeContent.email ? `<li>${resumeContent.email} ✉️</li>` : ''}
      ${resumeContent.location ? `<li>${resumeContent.location} 📍</li>` : ''}
      ${resumeContent.links?.portfolio ? `<li><a href="${resumeContent.links.portfolio}" target="_blank">Portfolio</a> 🌐</li>` : ''}
      ${resumeContent.links?.linkedin ? `<li><a href="${resumeContent.links.linkedin}" target="_blank">LinkedIn</a> 🔗</li>` : ''}
      ${resumeContent.links?.github ? `<li><a href="${resumeContent.links.github}" target="_blank">GitHub</a> 💻</li>` : ''}
    </ul>
  </header>
  ` : ''}

  <!-- CORE FLOW AREA -->
  <div class="executive-flow-body">

    <!-- SUMMARY ROW -->
    ${resumeContent.summary ? `
    <div class="section-row">
      <h2 class="section-sidebar-title">Executive Summary</h2>
      <div class="section-main-content">
        <p class="paragraph-style">${resumeContent.summary}</p>
      </div>
    </div>
    ` : ''}

    <!-- EXPERIENCE ROW -->
    ${resumeContent.experience && resumeContent.experience.length > 0 ? `
    <div class="section-row">
      <h2 class="section-sidebar-title">Experience</h2>
      <div class="section-main-content">
        ${resumeContent.experience.map(exp => exp.company || exp.role ? `
          <div class="data-chunk">
            <div class="chunk-row-split">
              <span class="meta-title-bold">${exp.company || ''}</span>
              ${exp.startDate ? `<span class="date-badge-style">${exp.startDate} — ${exp.current ? 'PRESENT' : (exp.endDate || '')}</span>` : ''}
            </div>
            ${exp.role ? `<div class="sub-role-title">${exp.role}</div>` : ''}
            ${exp.desc ? `
              <ul class="bullet-points-wrapper" style="list-style-type: disc;">
                <li>${exp.desc}</li>
              </ul>
            ` : ''}
          </div>
        ` : '').join('')}
      </div>
    </div>
    ` : ''}

    <!-- PROJECTS ROW -->
    ${resumeContent.project && resumeContent.project.length > 0 ? `
    <div class="section-row">
      <h2 class="section-sidebar-title">Key Projects</h2>
      <div class="section-main-content">
        ${resumeContent.project.map(proj => proj.title ? `
          <div class="data-chunk">
            <div class="chunk-row-split">
              <span class="meta-title-bold">${proj.title}</span>
              ${proj.link ? `<span class="date-badge-style"><a href="${proj.link}" target="_blank" style="color:#2563eb; text-decoration:none;">View Link</a></span>` : ''}
            </div>
            ${proj.desc ? `
              <ul class="bullet-points-wrapper" style="list-style-type: circle;">
                <li>${proj.desc}</li>
              </ul>
            ` : ''}
          </div>
        ` : '').join('')}
      </div>
    </div>
    ` : ''}

    <!-- EDUCATION ROW -->
    ${resumeContent.education && resumeContent.education.length > 0 ? `
    <div class="section-row">
      <h2 class="section-sidebar-title">Education</h2>
      <div class="section-main-content">
        ${resumeContent.education.map(ed => ed.school || ed.degree ? `
          <div class="data-chunk">
            <div class="chunk-row-split">
              <span class="meta-title-bold">${ed.school || ''}</span>
              ${ed.year ? `<span class="date-badge-style">${ed.year}</span>` : ''}
            </div>
            ${ed.degree || ed.field ? `<div class="paragraph-style" style="font-size:12px; color:#475569;">${ed.degree || ''} ${ed.field ? `(${ed.field})` : ''}</div>` : ''}
          </div>
        ` : '').join('')}
      </div>
    </div>
    ` : ''}

    <!-- CERTIFICATIONS ROW -->
    ${resumeContent.certification && resumeContent.certification.length > 0 ? `
    <div class="section-row">
      <h2 class="section-sidebar-title">Certifications</h2>
      <div class="section-main-content">
        <ul class="bullet-points-wrapper" style="list-style-type: square;">
          ${resumeContent.certification.map(cert => cert.name ? `
            <li><strong>${cert.name}</strong> ${cert.issuer ? `— ${cert.issuer}` : ''} ${cert.date ? `(${cert.date})` : ''}</li>
          ` : '').join('')}
        </ul>
      </div>
    </div>
    ` : ''}

    <!-- SKILLS ROW -->
    ${resumeContent.skills && resumeContent.skills.length > 0 ? `
    <div class="section-row">
      <h2 class="section-sidebar-title">Expertise</h2>
      <div class="section-main-content">
        <div class="badges-flex-box">
          ${resumeContent.skills.map(s => s ? `<span class="badge-item">${s}</span>` : '').join('')}
        </div>
      </div>
    </div>
    ` : ''}

    <!-- LANGUAGES ROW -->
    ${resumeContent.languages && resumeContent.languages.length > 0 ? `
    <div class="section-row">
      <h2 class="section-sidebar-title">Languages</h2>
      <div class="section-main-content">
        <div class="badges-flex-box">
          ${resumeContent.languages.map(l => l ? `<span class="badge-item">${l}</span>` : '').join('')}
        </div>
      </div>
    </div>
    ` : ''}

  </div>
</div>

</body>
</html>
  `;
};