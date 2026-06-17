export const creative1 = (data) => {
  const resumeContent = data.content || data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700;800&family=Lato:wght@300;400;700&display=swap');

  /* STRICT BOX BUDGETING TO PREVENT OVERFLOW */
  * { 
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
  }
  
  body {
    background: #f0f2f5;
    font-family: 'Lato', sans-serif;
    color: #333333;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* EXACT A4 BOUNDARIES - NO MORE, NO LESS */
  .page {
    width: 210mm;
    height: 297mm; /* Fixed height so it never grows bigger than paper */
    max-height: 297mm;
    background: #fff;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 50px rgba(0,0,0,0.15);
    overflow: hidden; /* Prevents text from pushing page boundary */
    position: relative;
  }

  /* ABSTRACT KORINA STYLE HEADER */
  header {
    display: grid;
    grid-template-columns: 35% 65%;
    height: 175px; /* Fixed header allocation */
    width: 100%;
    overflow: hidden;
  }

  /* Left Header Diagonal Blue Shape */
  .header-left {
    background: linear-gradient(135deg, #5B84B1 70%, #595959 30%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    position: relative;
  }

  .circle-profile-container {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid #ffffff;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    background: #e5e7eb;
  }

  .circle-profile-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Right Header Dark Slate Gray */
  .header-right {
    background-color: #595959;
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #ffffff;
  }

  .header-right h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 44px;
    font-weight: 300;
    letter-spacing: 2px;
    line-height: 1.1;
    text-transform: uppercase;
  }

  .header-right h1 strong {
    font-weight: 800;
    display: block;
  }

  .header-right p {
    font-size: 14px;
    color: #e2e8f0;
    margin-top: 5px;
    letter-spacing: 4px;
    text-transform: uppercase;
    font-weight: 400;
  }

  /* TWO COLUMN WORKSPACE FILLING EXACTLY 100% WIDTH */
  .container {
    display: grid;
    grid-template-columns: 35% 65%;
    width: 100%;
    height: calc(297mm - 175px); /* Remaining paper space allocated perfectly */
  }

  /* LEFT SIDEBAR PANEL */
  .sidebar {
    background-color: #F4F6F8; /* Light gray tone from design */
    padding: 30px 25px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    height: 100%;
  }

  .section-title-side {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 800;
    color: #1a1a1a;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border-bottom: 2px solid #1a1a1a;
    padding-bottom: 4px;
    margin-bottom: 12px;
  }

  .contact-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .contact-row {
    font-size: 12px;
    color: #4b5563;
    line-height: 1.4;
  }

  .contact-row strong {
    display: block;
    color: #111111;
    font-size: 11px;
    text-transform: uppercase;
    margin-bottom: 2px;
  }

  /* SKILL PROGRESS BARS (As shown in Korina Villanueva template) */
  .skill-progress-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .skill-bar-node {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #333;
    font-weight: 600;
  }

  .skill-percentage {
    color: #555;
    font-size: 11px;
  }

  /* RIGHT PANEL MAIN WORKSPACE */
  .main-content {
    background-color: #ffffff;
    padding: 30px 40px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    height: 100%;
    overflow: hidden;
  }

  .section-title-main {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 800;
    color: #1a1a1a;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 4px;
    margin-bottom: 12px;
  }

  .summary-text {
    font-size: 13px;
    line-height: 1.5;
    color: #4a4a4a;
    text-align: justify;
  }

  /* EXPERIENCE TIMELINE GRID */
  .timeline-list {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .timeline-item {
    display: grid;
    grid-template-columns: 28% 72%;
    gap: 10px;
  }

  .time-period {
    font-size: 12px;
    font-weight: 700;
    color: #555555;
  }

  .job-details .role-title {
    font-size: 14px;
    font-weight: 700;
    color: #1a1a1a;
  }

  .job-details .company-location {
    font-size: 12px;
    color: #777777;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .job-details .description {
    font-size: 12.5px;
    line-height: 1.5;
    color: #555555;
    text-align: justify;
  }

  @media print {
    body { background: none; padding: 0; }
    .page { margin: 0; box-shadow: none; height: 297mm; max-height: 297mm; }
  }
</style>
</head>

<body>

<div class="page">
  
  <header>
    <div class="header-left">
      <div class="circle-profile-container">
        <img src="${resumeContent.image || 'https://via.placeholder.com/120'}" class="circle-profile-img" alt="Avatar">
      </div>
    </div>
    <div class="header-right">
      <h1>
        ${resumeContent.fullName ? `<strong>${resumeContent.fullName.split(' ')[0] || ''}</strong> ${resumeContent.fullName.split(' ').slice(1).join(' ') || ''}` : '<strong>First</strong> Last'}
      </h1>
      <p>${resumeContent.experience?.[0]?.role || 'Professional Designation'}</p>
    </div>
  </header>

  <div class="container">
    
    <div class="sidebar">
      
      <div>
        <div class="section-title-side">Contact</div>
        <div class="contact-group">
          ${resumeContent.location ? `<div class="contact-row"><strong>Address</strong>${resumeContent.location}</div>` : ''}
          ${resumeContent.phone ? `<div class="contact-row"><strong>Phone</strong>${resumeContent.phone}</div>` : ''}
          ${resumeContent.email ? `<div class="contact-row"><strong>Email</strong>${resumeContent.email}</div>` : ''}
          ${resumeContent.links?.portfolio ? `<div class="contact-row"><strong>Web</strong><a href="${resumeContent.links.portfolio}" target="_blank">${resumeContent.links.portfolio}</a></div>` : ''}
        </div>
      </div>

      ${resumeContent.education && resumeContent.education.length > 0 ? `
      <div>
        <div class="section-title-side">Education</div>
        <div class="contact-group" style="gap: 10px;">
          ${resumeContent.education.map(ed => `
            <div class="contact-row">
              <strong>${ed.year || ''}</strong>
              <span style="font-weight:700; color:#222;">${ed.degree || ''}</span><br>
              <span style="font-size:11px;">${ed.school || ''}</span>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      ${resumeContent.skills && resumeContent.skills.length > 0 ? `
      <div>
        <div class="section-title-side">Skills</div>
        <div class="skill-progress-wrapper">
          ${resumeContent.skills.map(s => `
            <div class="skill-bar-node">
              <span>${s}</span>
              <span class="skill-percentage">90%</span>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      ${resumeContent.languages && resumeContent.languages.length > 0 ? `
      <div>
        <div class="section-title-side">Languages</div>
        <div class="contact-group" style="gap: 4px;">
          ${resumeContent.languages.map(l => `<div class="contact-row" style="font-weight:600;">• ${l}</div>`).join('')}
        </div>
      </div>
      ` : ''}

    </div>

    <div class="main-content">
      
      ${resumeContent.summary ? `
      <div>
        <div class="section-title-main">Profile</div>
        <p class="summary-text">${resumeContent.summary}</p>
      </div>
      ` : ''}

      ${resumeContent.experience && resumeContent.experience.length > 0 ? `
      <div>
        <div class="section-title-main">Experience</div>
        <div class="timeline-list">
          ${resumeContent.experience.map(exp => `
            <div class="timeline-item">
              <div class="time-period">${exp.startDate || ''} - ${exp.current ? 'Present' : (exp.endDate || '')}</div>
              <div class="job-details">
                <div class="role-title">${exp.role || ''}</div>
                <div class="company-location">${exp.company || ''}</div>
                ${exp.desc ? `<div class="description">${exp.desc}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      ${resumeContent.project && resumeContent.project.length > 0 ? `
      <div>
        <div class="section-title-main">Projects</div>
        <div class="timeline-list">
          ${resumeContent.project.map(p => `
            <div class="timeline-item">
              <div class="time-period">Project</div>
              <div class="job-details">
                <div class="role-title">${p.title || ''}</div>
                ${p.desc ? `<div class="description" style="margin-top: 2px;">${p.desc}</div>` : ''}
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