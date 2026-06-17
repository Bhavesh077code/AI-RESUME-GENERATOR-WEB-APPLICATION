export const simple2 = (data) => {
  const resumeContent = data.content || data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800&family=Lato:wght@300;400;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    background: #f0f2f5;
    font-family: 'Lato', sans-serif;
    color: #2b2b2b;
  }

  .page {
    width: 210mm;
    min-height: 297mm;
    background: #fff;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 50px rgba(0,0,0,0.15);
    padding: 45px;
  }

  /* TOP HEADER ARCHITECTURE */
  .header-grid {
    display: grid;
    grid-template-columns: 65% 35%;
    align-items: center;
    margin-bottom: 40px;
  }

  .name-block h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 42px;
    font-weight: 800;
    text-transform: uppercase;
    color: #111111;
    line-height: 1.1;
  }

  .name-block .title-badge {
    display: inline-block;
    background-color: #111111;
    color: #ffffff;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    padding: 6px 16px;
    margin-top: 10px;
    letter-spacing: 2px;
  }

  .header-img-container {
    display: flex;
    justify-content: flex-end;
  }

  .square-profile-img {
    width: 140px;
    height: 140px;
    object-fit: cover;
    background-color: #e5e7eb;
    border: 1px solid #d1d5db;
  }

  /* TWO COLUMN STRUCTURE */
  .main-layout {
    display: grid;
    grid-template-columns: 32% 68%;
    flex: 1;
    gap: 40px;
  }

  /* LEFT SIDEBAR PANEL */
  .left-panel {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .block-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #111111;
    margin-bottom: 15px;
  }

  .contact-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .contact-row {
    font-size: 12px;
    color: #444444;
    line-height: 1.4;
  }

  .contact-row strong {
    display: block;
    color: #111111;
    text-transform: uppercase;
    font-size: 11px;
    margin-bottom: 2px;
  }

  .contact-row a {
    color: #444444;
    text-decoration: none;
  }

  .sidebar-summary {
    font-size: 12.5px;
    line-height: 1.6;
    color: #555555;
    text-align: justify;
  }

  .simple-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .simple-list li {
    font-size: 13px;
    color: #444444;
  }

  /* LIGHT GREY BACKDROP CARD (AWARDS SECTION) */
  .awards-card {
    background-color: #EDF2F6;
    padding: 20px 15px;
    border-radius: 2px;
    margin-top: 10px;
  }

  .award-node {
    font-size: 12px;
    color: #444444;
    line-height: 1.4;
  }
  .award-node strong {
    color: #111111;
    display: block;
  }

  /* RIGHT PANEL MAIN CONTENT */
  .right-panel {
    display: flex;
    flex-direction: column;
    gap: 35px;
  }

  .right-section-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #111111;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 5px;
    margin-bottom: 20px;
  }

  /* TIMELINE VERTICAL LINK PATTERN */
  .timeline-wrapper {
    position: relative;
    padding-left: 25px;
    border-left: 2px solid #111111;
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-left: 8px;
  }

  .timeline-node {
    position: relative;
  }

  /* TIMELINE CIRCLE DOT */
  .timeline-node::before {
    content: '';
    position: absolute;
    left: -32px;
    top: 4px;
    width: 10px;
    height: 10px;
    background-color: #ffffff;
    border: 2px solid #111111;
    border-radius: 50%;
  }

  .timeline-grid {
    display: grid;
    grid-template-columns: 35% 65%;
    gap: 15px;
  }

  .time-meta {
    font-size: 12px;
    color: #111111;
  }
  .time-meta .role-span {
    font-weight: 700;
    text-transform: uppercase;
    display: block;
    font-size: 13px;
  }
  .time-meta .date-span {
    color: #777777;
    display: block;
    margin-top: 2px;
  }

  .content-meta {
    font-size: 13px;
    color: #555555;
    line-height: 1.5;
  }
  .content-meta strong {
    color: #111111;
    font-size: 14px;
    display: block;
    margin-bottom: 4px;
  }

  /* LIGHT BLUE HIGHLIGHT CARD (EDUCATION BACKGROUND SECTION) */
  .education-wrapper {
    background-color: #EDF2F6;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .edu-row {
    display: grid;
    grid-template-columns: 35% 65%;
    gap: 15px;
  }

  @media print {
    body { background: none; padding: 0; }
    .page { margin: 0; box-shadow: none; }
  }
</style>
</head>

<body>

<div class="page">
  
  <header class="header-grid">
    <div class="name-block">
      <h1>${resumeContent.fullName || 'Name Surname'}</h1>
      <div class="title-badge">${resumeContent.experience?.[0]?.role || 'Position Title Here'}</div>
    </div>
    <div class="header-img-container">
      <img src="${resumeContent.image}" class="square-profile-img" alt="Profile">
    </div>
  </header>

  <div class="main-layout">
    
    <div class="left-panel">
      
      <div>
        <div class="block-title">Contact</div>
        <div class="contact-list">
          ${resumeContent.phone ? `<div class="contact-row"><strong>Phone:</strong>${resumeContent.phone}</div>` : ''}
          ${resumeContent.email ? `<div class="contact-row"><strong>Mail:</strong>${resumeContent.email}</div>` : ''}
          ${resumeContent.links?.portfolio ? `<div class="contact-row"><strong>Github:</strong><a href="${resumeContent.links.portfolio}" target="_blank">${resumeContent.links.portfolio}</a></div>` : ''}
          ${resumeContent.links?.linkedin ? `<div class="contact-row"><strong>Linkedin:</strong><a href="${resumeContent.links.linkedin}" target="_blank">${resumeContent.links.linkedin}</a></div>` : ''}
          ${resumeContent.location ? `<div class="contact-row"><strong>Address:</strong>${resumeContent.location}</div>` : ''}
        </div>
      </div>

      ${resumeContent.summary ? `
      <div>
        <p class="sidebar-summary">${resumeContent.summary}</p>
      </div>
      ` : ''}

      ${resumeContent.skills && resumeContent.skills.length > 0 ? `
      <div>
        <div class="block-title">Skills</div>
        <ul class="simple-list" style="list-style-type: dashed; padding-left: 15px;">
          ${resumeContent.skills.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>
      ` : ''}

      ${resumeContent.languages && resumeContent.languages.length > 0 ? `
      <div>
        <div class="block-title">Languages</div>
        <ul class="simple-list" style="list-style-type: square; padding-left: 15px;">
          ${resumeContent.languages.map(l => `<li>${l}</li>`).join('')}
        </ul>
      </div>
      ` : ''}

      ${resumeContent.certification && resumeContent.certification.length > 0 ? `
      <div>
        <div class="block-title"></div>
        <div class="awards-card">
          ${resumeContent.certification.slice(0, 2).map(c => `
            <div class="award-node" style="margin-bottom: 10px;">
              <strong>${c.name || ''}</strong>
              <span style="font-size: 11px; color:#666;">${c.issuer || ''} ${c.date ? `(${c.date})` : ''}</span>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

    </div>

    <div class="right-panel">
      
      ${resumeContent.experience && resumeContent.experience.length > 0 ? `
      <div>
        <div class="right-section-title">Job & Experience</div>
        <div class="timeline-wrapper">
          ${resumeContent.experience.map(exp => `
            <div class="timeline-node">
              <div class="timeline-grid">
                <div class="time-meta">
                  <span class="role-span">${exp.role || ''}</span>
                  <span class="date-span">${exp.startDate || ''} - ${exp.current ? 'Present' : (exp.endDate || '')}</span>
                </div>
                <div class="content-meta">
                  <strong>${exp.company || ''}</strong>
                  ${exp.desc ? `<p>${exp.desc}</p>` : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      ${resumeContent.project && resumeContent.project.length > 0 ? `
      <div>
        <div class="right-section-title">Key Projects</div>
        <div class="timeline-wrapper" style="border-left: 2px dashed #d1d5db;">
          ${resumeContent.project.map(proj => `
            <div class="timeline-node" style="margin-bottom: 5px;">
              <div class="timeline-grid">
                <div class="time-meta">
                  <span class="role-span" style="color: #111;">${proj.title || ''}</span>
                  ${proj.link ? `<span class="date-span"><a href="${proj.link}" target="_blank" style="color:#2563eb; text-decoration:none;">Link</a></span>` : ''}
                </div>
                <div class="content-meta">
                  ${proj.desc ? `<p>${proj.desc}</p>` : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      ${resumeContent.education && resumeContent.education.length > 0 ? `
      <div>
        <div class="right-section-title">Education Background</div>
        <div class="education-wrapper">
          ${resumeContent.education.map(ed => `
            <div class="edu-row">
              <div class="time-meta">
                <span class="role-span" style="font-size:12px;">${ed.year || ''}</span>
              </div>
              <div class="content-meta">
                <strong>${ed.degree || ''} ${ed.field ? `(${ed.field})` : ''}</strong>
                <p>${ed.school || ''}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

    </div>

  </div>
</div>

</body>
</html>
  `;
};