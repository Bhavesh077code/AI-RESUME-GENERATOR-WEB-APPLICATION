export const professional2 = (data) => {
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
    color: #333333;
  }

  .page {
    width: 210mm;
    min-height: 297mm;
    background: #fff;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 50px rgba(0,0,0,0.15);
    position: relative;
  }

  /* SCREENSHOT INSPIRED HEADER SECTION */
  header {
    display: flex;
    min-height: 160px;
    color: white;
    overflow: hidden;
  }

  .header-left-pane {
    width: 35%;
    background-color: #5B84B1; /* Exact template blue */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .profile-img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 4px solid #fff;
    object-fit: cover;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  }

  .profile-img-placeholder {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: #e5e7eb;
    border: 4px solid #fff;
  }

  .header-right-pane {
    width: 65%;
    background-color: #595959; /* Exact template slate grey */
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .header-right-pane h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 36px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    line-height: 1.1;
  }

  .header-right-pane p {
    font-size: 14px;
    color: #e2e8f0;
    margin-top: 8px;
    letter-spacing: 4px;
    text-transform: uppercase;
    font-weight: 300;
  }

  /* CONTAINER LAYOUT */
  .container {
    display: grid;
    grid-template-columns: 35% 65%;
    flex: 1;
  }

  /* SIDEBAR (LEFT COLUMN) */
  .sidebar {
    background: #F2F2F2; /* Light background as per template */
    padding: 35px 25px;
    border-right: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .side-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 800;
    color: #2c3e50;
    text-transform: uppercase;
    margin-bottom: 15px;
    border-bottom: 1px solid #9ca3af;
    padding-bottom: 4px;
    letter-spacing: 1px;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .contact-info p {
    font-size: 13px;
    color: #4b5563;
    line-height: 1.4;
  }

  .contact-info strong {
    display: block;
    color: #333;
    font-size: 12px;
    text-transform: uppercase;
    margin-bottom: 2px;
  }

  .contact-info a {
    color: #2563eb;
    text-decoration: none;
    word-break: break-all;
  }

  .skills-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .skill-item {
    background: #ffffff;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
    color: #374151;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  }

  .lang-item {
    font-size: 13px;
    color: #4b5563;
    margin-bottom: 6px;
    font-weight: 500;
  }

  /* MAIN CONTENT (RIGHT COLUMN) */
  .main-content {
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 35px;
  }

  .section-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    font-weight: 800;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 1px solid #d1d5db;
    padding-bottom: 4px;
  }

  .summary {
    font-size: 14px;
    line-height: 1.6;
    color: #555555;
    text-align: justify;
  }

  .timeline-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .timeline-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .item-meta {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .duration { 
    color: #6b7280; 
    font-weight: 700; 
    font-size: 12px; 
  }

  .role { 
    font-weight: 700; 
    font-size: 15px; 
    color: #222222; 
  }

  .company { 
    font-weight: 600; 
    color: #5B84B1; 
    font-size: 13px; 
  }

  .desc { 
    font-size: 13.5px; 
    line-height: 1.6; 
    color: #666666; 
    text-align: justify;
    margin-top: 2px;
  }

  @media print {
    body { background: none; padding: 0; }
    .page { margin: 0; box-shadow: none; }
  }
</style>
</head>

<body>

<div class="page">
  <header>
    <div class="header-left-pane">
      ${data.image 
        ? `<img src="${data.image}" class="profile-img" alt="Profile">` 
        : `<div class="profile-img-placeholder"></div>`
      }
    </div>
    <div class="header-right-pane">
      <h1>${data.fullName || 'Your Name'}</h1>
      <p>${data.experience?.[0]?.role || 'Professional Specialist'}</p>
    </div>
  </header>

  <div class="container">
    <div class="sidebar">
      
      ${(data.location || data.phone || data.email || data.links?.portfolio) ? `
      <div>
        <div class="side-title">Contact</div>
        <div class="contact-info">
          ${data.location ? `<p><strong>Address</strong>${data.location}</p>` : ''}
          ${data.phone ? `<p><strong>Phone</strong>${data.phone}</p>` : ''}
          ${data.email ? `<p><strong>Email</strong>${data.email}</p>` : ''}
          ${data.links?.portfolio ? `<p><strong>Web</strong><a href="${data.links.portfolio}" target="_blank">${data.links.portfolio}</a></p>` : ''}
        </div>
      </div>
      ` : ''}

      ${data.skills && data.skills.length > 0 ? `
      <div>
        <div class="side-title">Skills</div>
        <div class="skills-list">
          ${data.skills.map(s => `<div class="skill-item">${s}</div>`).join('')}
        </div>
      </div>
      ` : ''}

      ${data.languages && data.languages.length > 0 ? `
      <div>
        <div class="side-title">Languages</div>
        <div>
          ${data.languages.map(l => `<p class="lang-item">• ${l}</p>`).join('')}
        </div>
      </div>
      ` : ''}
      
    </div>

    <div class="main-content">
      
      ${data.summary ? `
      <div>
        <div class="section-title" style="margin-bottom: 12px;">Profile</div>
        <div class="summary">${data.summary}</div>
      </div>
      ` : ''}

      ${data.experience && data.experience.length > 0 ? `
      <div>
        <div class="section-title" style="margin-between: 16px;">Experience</div>
        <div class="timeline-list">
          ${data.experience.map(exp => `
            <div class="timeline-item">
              <div class="item-meta">
                <span class="role">${exp.role || ''}</span>
                <span class="duration">${exp.startDate || ''} - ${exp.current ? 'Present' : (exp.endDate || '')}</span>
              </div>
              <div class="company">${exp.company || ''}</div>
              ${exp.desc ? `<div class="desc">${exp.desc}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      ${data.education && data.education.length > 0 ? `
      <div>
        <div class="section-title" style="margin-between: 16px;">Education</div>
        <div class="timeline-list">
          ${data.education.map(ed => `
            <div class="timeline-item">
              <div class="item-meta">
                <span class="role">${ed.degree || ed.course || ''}</span>
                <span class="duration">${ed.year || ''}</span>
              </div>
              <div class="company">${ed.school || ed.college || ''}</div>
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