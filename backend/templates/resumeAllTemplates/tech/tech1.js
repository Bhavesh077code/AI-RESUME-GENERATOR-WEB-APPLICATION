export const tech1 = (data) => {
  // Safe extraction for backend integration
  const resumeContent = data.content || data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Lato:wght@300;400;700&display=swap');

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
    padding: 20px; /* Outer subtle border look */
  } 

  /* TWO COLUMN MAIN GRID */
  .container {
    display: grid;
    grid-template-columns: 32% 68%;
    flex: 1;
    min-height: 100%;
  }

  /* LEFT SIDEBAR */
  .sidebar {
    padding-top: 0px;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    gap: 35px;
  }

  /* IMAGE OVERLAY BOX PATTERN */
  .image-box {
    width: 100%;
    height: 220px;
    position: relative;
    background-color: #D2DEE6; /* Light pastel blue accent square from design */
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding-left: 20px;
    margin-bottom: 10px;
  }

  .profile-img {
    width: 90%;
    height: 100%;
    object-fit: cover;
    display: block;
    box-shadow: 5px 5px 15px rgba(0,0,0,0.1);
  }

  .profile-img-placeholder {
    width: 90%;
    height: 100%;
    background: #e5e7eb;
  }

  /* SIDEBAR SECTIONS */
  .side-section-title {
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: #1a1a1a;
    margin-bottom: 15px;
    border-bottom: 2px solid #1a1a1a;
    padding-bottom: 3px;
  }

  /* CONTACT ARROW BLOCKS */
  .contact-box {
    background-color: #E2EAF0; /* Blue-grey background wrapper */
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-radius: 2px;
  }

  .contact-item {
    font-size: 11px;
    color: #4a4a4a;
    line-height: 1.4;
    word-break: break-all;
  }

  .contact-item strong {
    display: block;
    color: #1a1a1a;
    font-size: 11px;
    text-transform: uppercase;
    margin-bottom: 2px;
    letter-spacing: 1px;
  }

  .contact-item a {
    color: #4a4a4a;
    text-decoration: none;
  }

  /* BULLET LIST ITEMS (EDUCATION, SKILLS, LANGUAGES) */
  .bullet-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
    list-style: none;
  }

  .bullet-list li {
    font-size: 13px;
    color: #4a4a4a;
    position: relative;
    line-height: 1.4;
  }

  .skills-list, .lang-list {
    list-style-type: square;
    padding-left: 15px;
  }

  .skills-list li, .lang-list li {
    font-size: 13px;
    color: #4a4a4a;
    margin-bottom: 6px;
  }

  .edu-title {
    font-weight: 700;
    color: #1a1a1a;
    font-size: 13px;
  }
  .edu-sub {
    font-size: 12px;
    color: #666;
  }
  .edu-duration {
    font-size: 11px;
    color: #888;
    margin-top: 2px;
  }

  /* RIGHT MAIN CONTENT AREA */
  .main-content {
    padding-left: 35px;
    padding-right: 15px;
    display: flex;
    flex-direction: column;
    gap: 35px;
  }

  /* HERO HEADER FROM RICHARD SANCHEZ TEXT */
  .hero-header {
    margin-top: 35px;
    margin-bottom: 10px;
  }

  .hero-header h1 {
    font-family: 'Oswald', sans-serif;
    font-size: 64px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 0.95;
    color: #262626;
    letter-spacing: -1px;
  }

  .hero-header p {
    font-size: 16px;
    color: #666666;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-top: 8px;
    font-weight: 400;
  }

  /* REUSABLE MAIN BLOCK HEADINGS */
  .main-section-title {
    font-size: 15px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: #1a1a1a;
    margin-bottom: 15px;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 4px;
  }

  .summary-text {
    font-size: 13.5px;
    line-height: 1.6;
    color: #4a4a4a;
    text-align: justify;
  }

  /* TIMELINE TIMMERMAN STYLE STRUCTURE */
  .timeline-container {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .timeline-node {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .node-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .node-title {
    font-size: 15px;
    font-weight: 700;
    color: #1a1a1a;
  }

  .node-date {
    font-size: 12px;
    color: #777777;
    font-weight: 400;
  }

  .node-sub {
    font-size: 13.5px;
    font-weight: 600;
    color: #555555;
  }

  .node-desc {
    font-size: 13px;
    line-height: 1.5;
    color: #555555;
    margin-top: 4px;
    text-align: justify;
  }

  /* Internal Project/Cert Bullet style overrides */
  .node-desc ul {
    padding-left: 15px;
    margin-top: 4px;
  }
  
  .node-desc li {
    margin-bottom: 4px;
  }

  @media print {
    body { background: none; padding: 0; }
    .page { margin: 0; box-shadow: none; }
  }
</style>
</head>

<body>

<div class="page" id="resume-page">
  <div class="container">
    
    <div class="sidebar">
      
      <div class="image-box">
        ${
          resumeContent.image
            ? `<img src="${resumeContent.image}" class="profile-img" alt="Profile" onerror="this.style.display='none'; document.getElementById('sidebar-fallback').style.display='block';">`
            : `<div class="profile-img-placeholder"></div>`
        }
        <div id="sidebar-fallback" class="profile-img-placeholder" style="display: none;"></div>
      </div>

      <div>
        <div class="side-section-title">Contact</div>
        <div class="contact-box">
          ${resumeContent.phone ? `<div class="contact-item"><strong>Phone</strong>${resumeContent.phone}</div>` : ""}
          ${resumeContent.email ? `<div class="contact-item"><strong>Email</strong>${resumeContent.email}</div>` : ""}
          ${resumeContent.location ? `<div class="contact-item"><strong>Address</strong>${resumeContent.location}</div>` : ""}
          ${resumeContent.links?.portfolio ? `<div class="contact-item"><strong>Website</strong><a href="${resumeContent.links.portfolio}" target="_blank">${resumeContent.links.portfolio}</a></div>` : ""}
          ${resumeContent.links?.github ? `<div class="contact-item"><strong>GitHub</strong><a href="${resumeContent.links.github}" target="_blank">${resumeContent.links.github}</a></div>` : ""}
        </div>
      </div>

      ${
        resumeContent.education && resumeContent.education.length > 0
          ? `
      <div>
        <div class="side-section-title">Education</div>
        <ul class="bullet-list">
          ${resumeContent.education
            .map(
              (ed) => `
            <li>
              <div class="edu-title">${ed.degree || ""}</div>
              <div class="edu-sub">${ed.school || ""}</div>
              <div class="edu-duration">${ed.year || ""} ${ed.field ? `| ${ed.field}` : ""}</div>
            </li>
          `,
            )
            .join("")}
        </ul>
      </div>
      `
          : ""
      }

      ${
        resumeContent.skills && resumeContent.skills.length > 0
          ? `
      <div>
        <div class="side-section-title">Skills</div>
        <ul class="skills-list">
          ${resumeContent.skills.map((s) => `<li>${s}</li>`).join("")}
        </ul>
      </div>
      `
          : ""
      }

      ${
        resumeContent.certification && resumeContent.certification.length > 0
          ? `
      <div>
        <div class="side-section-title">Certifications</div>
        <ul class="skills-list">
          ${resumeContent.certification
            .map(
              (c) => `
            <li><strong>${c.name || ""}</strong> <br><span style="font-size:11px; color:#666;">${c.issuer || ""}</span></li>
          `,
            )
            .join("")}
        </ul>
      </div>
      `
          : ""
      }

      ${
        resumeContent.languages && resumeContent.languages.length > 0
          ? `
      <div>
        <div class="side-section-title">Language</div>
        <ul class="lang-list">
          ${resumeContent.languages.map((l) => `<li>${l}</li>`).join("")}
        </ul>
      </div>
      `
          : ""
      }

    </div>

    <div class="main-content">
      
      <div class="hero-header">
        <h1>${resumeContent.fullName || "User Name"}</h1>
        <p>${resumeContent.experience?.[0]?.role || "Professional Specialist"}</p>
      </div>

      ${
        resumeContent.summary
          ? `
      <div>
        <div class="main-section-title">Summary</div>
        <p class="summary-text">${resumeContent.summary}</p>
      </div>
      `
          : ""
      }

      ${
        resumeContent.experience && resumeContent.experience.length > 0
          ? `
      <div>
        <div class="main-section-title">Work Experience</div>
        <div class="timeline-container">
          ${resumeContent.experience
            .map(
              (exp) => `
            <div class="timeline-node">
              <div class="node-header">
                <span class="node-title">${exp.role || ""}</span>
                <span class="node-date">${exp.startDate || ""} to ${exp.current ? "Present" : exp.endDate || ""}</span>
              </div>
              <div class="node-sub">${exp.company || ""} ${exp.location ? `| ${exp.location}` : ""}</div>
              ${exp.desc ? `<div class="node-desc">${exp.desc}</div>` : ""}
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
      `
          : ""
      }

      ${
        resumeContent.project && resumeContent.project.length > 0
          ? `
      <div>
        <div class="main-section-title">Projects</div>
        <div class="timeline-container">
          ${resumeContent.project
            .map(
              (proj) => `
            <div class="timeline-node">
              <div class="node-header">
                <span class="node-title">${proj.title || ""}</span>
                ${proj.link ? `<span class="node-date"><a href="${proj.link}" target="_blank" style="color:#2563eb; text-decoration:none;">Project Link</a></span>` : ""}
              </div>
              ${proj.desc ? `<div class="node-desc">${proj.desc}</div>` : ""}
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
      `
          : ""
      }

    </div>
    
  </div>
</div>

</body>
</html>
  `;
};
