

export const professional4 = (data) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Lato:wght@300;400;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    background: #f0f2f5;
    font-family: 'Lato', sans-serif;
    color: #2d3436;
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



  /* HEADER SECTION */
  header {
    background: #1a1a1a;
    color: white;
    padding: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 8px solid #d4af37; /* Gold Accent */
  }

  .header-text h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 38px;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  .header-text p {
    font-size: 16px;
    color: #d4af37;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
  }

  .profile-img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 4px solid #fff;
    object-fit: cover;
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  }

  /* MAIN CONTENT */
  .container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    flex: 1;
  }

  /* LEFT COLUMN */
  .sidebar {
    background: #f8f9fa;
    padding: 40px 30px;
    border-right: 1px solid #eee;
  }

  .side-block { margin-bottom: 35px; }

  .side-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 800;
    color: #1a1a1a;
    text-transform: uppercase;
    margin-bottom: 15px;
    border-left: 4px solid #d4af37;
    padding-left: 10px;
  }

  .contact-info p {
    font-size: 13px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    color: #636e72;
  }

  .skill-pill {
    display: inline-block;
    background: #1a1a1a;
    color: #fff;
    padding: 6px 12px;
    border-radius: 2px;
    font-size: 11px;
    margin: 3px;
    font-weight: 700;
  }

  /* RIGHT COLUMN */
  .main-content {
    padding: 40px;
  }

  .section-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: #1a1a1a;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }

  .section-title::after {
    content: '';
    height: 2px;
    background: #d4af37;
    flex: 1;
    margin-left: 15px;
  }

  .summary {
    font-size: 15px;
    line-height: 1.8;
    color: #2d3436;
    margin-bottom: 30px;
    font-style: italic;
  }

  .timeline-item {
    margin-bottom: 25px;
    position: relative;
    padding-left: 20px;
  }

  .item-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  .role { font-weight: 700; font-size: 16px; color: #1a1a1a; }
  .duration { color: #d4af37; font-weight: 700; font-size: 12px; }
  .company { font-weight: 400; color: #636e72; font-size: 14px; margin-bottom: 10px; }
  .desc { font-size: 14px; line-height: 1.6; color: #2d3436; }

  @media print {
    body { background: none; }
    .page { margin: 0; box-shadow: none; }
  }
</style>
</head>

<body>

<div class="page">
  <header>
    <div class="header-text">
      <h1>${data.fullName || 'User Name'}</h1>
      <p>Professional Developer</p>
    </div>
    <img src="${data.image}" class="profile-img" alt="Profile">
  </header>

  <div class="container">
    <!-- SIDEBAR -->
    <div class="sidebar">
      <div class="side-block">
        <div class="side-title">Contact</div>
        <div class="contact-info">
          <p>📍 ${data.location || 'Your City'}</p>
          <p>📞 ${data.phone || 'Phone Number'}</p>
          <p>📧 ${data.email || 'Email Address'}</p>
        </div>
      </div>

      <div class="side-block">
        <div class="side-title">Core Expertise</div>
        <div class="skills">
          ${data.skills?.map(s => `<span class="skill-pill">${s}</span>`).join('') || ''}
        </div>
      </div>

      <div class="side-block">
        <div class="side-title">Languages</div>
        ${data.languages?.map(l => `<p style="font-size:13px; margin-bottom:5px;">• ${l}</p>`).join('') || ''}
      </div>
    </div>

    <!-- MAIN -->
    <div class="main-content">
      <div class="section-title">About Me</div>
      <div class="summary">${data.summary || 'Summary goes here...'}</div>

      <div class="section-title">Experience</div>
      ${data.experience?.map(exp => `
        <div class="timeline-item">
          <div class="item-meta">
            <span class="role">${exp.role}</span>
            <span class="duration">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</span>
          </div>
          <div class="company">${exp.company}</div>
          <div class="desc">${exp.desc || ''}</div>
        </div>
      `).join('') || ''}

      <div class="section-title">Education</div>
      ${data.education?.map(ed => `
        <div class="timeline-item">
          <div class="item-meta">
            <span class="role">${ed.degree}</span>
            <span class="duration">${ed.year || ''}</span>
          </div>
          <div class="company">${ed.school}</div>
        </div>
      `).join('') || ''}
    </div>
  </div>
</div>

</body>
</html>
`;
}; 