export const professional5 = (data) => {
  const resumeContent = data.content || data;

  // Check if any social link exists
  const hasSocialLinks = resumeContent.links?.portfolio || resumeContent.links?.linkedin || resumeContent.links?.github;
  // Check if any contact info exists
  const hasContact = resumeContent.phone || resumeContent.email || resumeContent.location || hasSocialLinks;
  const hasEducation = resumeContent.education?.length > 0;
  const hasExperience = resumeContent.experience?.length > 0;


  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&family=Playfair+Display:ital,wght@1,400;1,700&family=Lato:wght@300;400;700&display=swap');

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

  /* STRICT SINGLE-PAGE A4 BOUNDARY */
  .page {
    width: 210mm;
    height: 297mm;
    max-height: 297mm;
    background: #fff;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 50px rgba(0,0,0,0.15);
    overflow: hidden;
    position: relative;
    padding: 25px; 
  }

  .inner-frame {
    border: 1px solid #111111;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* FIXED HEADER */
  header {
    text-align: center;
    padding: 30px 20px 20px 20px;
    border-bottom: 1px solid #111111;
    position: relative;
    height: 140px;
    flex-shrink: 0;
  }

  .header-bg-watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 90px;
    color: #f1f3f5;
    z-index: 1;
    user-select: none;
    pointer-events: none;
  }

  .header-titles {
    position: relative;
    z-index: 2;
  }

  .header-titles h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 32px;
    font-weight: 400;
    letter-spacing: 6px;
    text-transform: uppercase;
    color: #2c3e50;
  }

  .header-titles p {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    font-weight: 600;
    color: #7f8c8d;
    text-transform: uppercase;
    letter-spacing: 4px;
    margin-top: 5px;
  }

  /* WORKSPACE SYSTEM */
  .grid-workspace {
    display: grid;
    grid-template-columns: 35% 65%;
    width: 100%;
    height: calc(100% - 140px);
    overflow: hidden;
  }

  .left-workspace-bar {
    border-right: 1px solid #111111;
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    gap: 22px;
    height: 100%;
    overflow-y: auto;
  }

  .right-workspace-bar {
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    height: 100%;
    overflow-y: auto;
  }

  .left-workspace-bar::-webkit-scrollbar,
  .right-workspace-bar::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  .left-workspace-bar, .right-workspace-bar {
    scrollbar-width: none;
  }

  .section-heading {
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #111111;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    position: relative;
  }

  .section-heading::before {
    content: attr(data-initial);
    position: absolute;
    left: -4px;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    background-color: #E6EAEF;
    border-radius: 50%;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    color: #7f8c8d;
    font-weight: 700;
  }

  .section-heading span {
    position: relative;
    z-index: 2;
    padding-left: 22px;
  }

  .contact-links-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
  }

  .contact-links-list li {
    font-size: 11.5px;
    color: #4f5d73;
    line-height: 1.4;
    word-break: break-all;
  }

  .contact-links-list a {
    color: #4f5d73;
    text-decoration: none;
  }

  .edu-block-node {
    margin-bottom: 10px;
  }

  .edu-block-node .edu-year {
    font-size: 11px;
    font-weight: 700;
    color: #2c3e50;
  }

  .edu-block-node .edu-inst {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    color: #111111;
  }

  .edu-block-node .edu-deg {
    font-size: 11px;
    color: #555555;
    margin-top: 1px;
  }

  .skills-wrap-container {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    width: 100%;
  }

  .skill-badge {
    font-size: 10.5px;
    font-weight: 600;
    color: #2c3e50;
    background-color: #F0F3F6;
    padding: 4px 8px;
    border-radius: 3px;
    border: 1px solid #dcdde1;
  }

  .bulleted-list {
    padding-left: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .bulleted-list li {
    font-size: 11.5px;
    color: #4f5d73;
    line-height: 1.4;
  }

  .summary-para {
    font-size: 12px;
    line-height: 1.5;
    color: #4f5d73;
    text-align: justify;
  }

  .experience-timeline {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .exp-node-chunk {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .exp-meta-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .exp-meta-header .comp-name {
    font-size: 13px;
    font-weight: 700;
    color: #111111;
  }

  .exp-meta-header .date-range {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    color: #7f8c8d;
  }

  .role-sub-designation {
    font-size: 11.5px;
    color: #555555;
  }

  @media print {
    body { background: none; padding: 0; }
    .page { margin: 0; box-shadow: none; height: 297mm; max-height: 297mm; padding: 25px; }
    .left-workspace-bar, .right-workspace-bar { overflow: hidden; }
  }
</style>
</head>

<body>

<div class="page">
  <div class="inner-frame">
    
    <!-- FIXED HEAD SECTION -->
    <header>
      <div class="header-bg-watermark">
        ${resumeContent.fullName ? resumeContent.fullName.charAt(0) : 'O'}W
      </div>
      <div class="header-titles">
        <h1>${resumeContent.fullName || 'Olivia Wilson'}</h1>
        <p>${resumeContent.experience?.[0]?.role || 'Marketing Manager'}</p>
      </div>
    </header>

    <!-- CONTAINER GRID WORKSPACE -->
    <div class="grid-workspace">
      
      <!-- LEFT SIDEBAR (CONDITIONAL) -->
      <div class="left-workspace-bar">
        
        <!-- Contact Block (Sirf tab dikhega jab data hoga) -->
        ${hasContact ? `
        <div>
          <div class="section-heading" data-initial="C"><span>Contact</span></div>
          <ul class="contact-links-list">
            ${resumeContent.phone ? `<li>📞 ${resumeContent.phone}</li>` : ''}
            ${resumeContent.email ? `<li>✉️ ${resumeContent.email}</li>` : ''}
            ${resumeContent.location ? `<li>📍 ${resumeContent.location}</li>` : ''}
            ${resumeContent.links.linkedin ? `<li>LINKEDIN: <a href="${resumeContent.links.linkedin}" target="_blank">${resumeContent.links.linkedin}</a></li>` : ''}
            ${resumeContent.links.github ? `   <li>GITHUB: <a href="${resumeContent.links.github}" target="_blank">${resumeContent.links.github}</a></li>` : ''}
             ${resumeContent.links.portfolio ? `<li>PORTFOLIO: <a href="${resumeContent.links.portfolio}" target="_blank">${resumeContent.links.portfolio}</a></li>` : ''}
          </ul>
        </div>
        ` : ''}

        <!-- Certificate Section (Purely Conditional) -->
       ${resumeContent.certification && resumeContent.certification.length > 0 ? `
        <div>
          <div class="section-heading" data-initial="A"><span>Certificates</span></div>
          <div>
            ${resumeContent.certification.map(cert => `
              <div class="edu-block-node" style="margin-bottom: 8px;">
                <div class="edu-inst" style="color: #2c3e50; font-size:11px;">🏆 ${cert.name || ''}</div>
                <div class="edu-deg" style="padding-left: 0; font-size:10.5px; color:#7f8c8d;">
                  ${cert.issuer || ''} ${cert.date ? `(${cert.date})` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        <!-- Education Block (Purely Conditional) -->
        ${hasEducation ? `
        <div>
          <div class="section-heading" data-initial="E"><span>Education</span></div>
          <div>
            ${resumeContent.education.map(ed => `
              <div class="edu-block-node">
                <div class="edu-year">${ed.year || ''}</div>
                <div class="edu-inst">${ed.school || ''}</div>
                <div class="edu-deg">• ${ed.degree || ''} ${ed.field ? `(${ed.field})` : ''}</div>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        <!-- Skills System (Purely Conditional) -->
        ${resumeContent.skills && resumeContent.skills.length > 0 ? `
        <div>
          <div class="section-heading" data-initial="S"><span>Skills</span></div>
          <div class="skills-wrap-container">
            ${resumeContent.skills.map(s => `<span class="skill-badge">${s}</span>`).join('')}
          </div>
        </div>
        ` : ''}

        <!-- Languages Block (Purely Conditional) -->
        ${resumeContent.languages && resumeContent.languages.length > 0 ? `
        <div>
          <div class="section-heading" data-initial="L"><span>Languages</span></div>
          <ul class="bulleted-list" style="list-style-type: square;">
            ${resumeContent.languages.map(l => `<li>${l}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

      </div>

      <!-- RIGHT PANEL CONTENT (CONDITIONAL) -->
      <div class="right-workspace-bar">
        
        <!-- Profile Summary (Purely Conditional) -->
        ${resumeContent.summary ? `
        <div>
          <div class="section-heading" data-initial="P"><span>Profile Summary</span></div>
          <p class="summary-para">${resumeContent.summary}</p>
        </div>
        ` : ''}

        <!-- Work Experience (Purely Conditional) -->
        ${hasExperience ? `
        <div>
          <div class="section-heading" data-initial="W"><span>Work Experience</span></div>
          <div class="experience-timeline">
            ${resumeContent.experience.map(exp => `
              <div class="exp-node-chunk">
                <div class="exp-meta-header">
                  <span class="comp-name">${exp.company || ''}</span>
                  <span class="date-range">${exp.startDate || ''} - ${exp.current ? 'PRESENT' : (exp.endDate || '')}</span>
                </div>
                <div class="role-sub-designation">${exp.role || ''} ${exp.location ? `| ${exp.location}` : ''}</div>
                ${exp.desc ? `
                  <ul class="bulleted-list" style="list-style-type: disc; padding-left: 12px; margin-top: 2px;">
                    <li>${exp.desc}</li>
                  </ul>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        <!-- Key Projects Section (Purely Conditional) -->
        ${resumeContent.project && resumeContent.project.length > 0 ? `
        <div>
          <div class="section-heading" data-initial="K"><span>Key Projects</span></div>
          <div class="experience-timeline">
            ${resumeContent.project.map(proj => `
              <div class="exp-node-chunk">
                <div class="exp-meta-header">
                  <span class="comp-name">${proj.title || ''}</span>
                  ${proj.link ? `<span class="date-range"><a href="${proj.link}" target="_blank" style="color:#2563eb; text-decoration:none;">Link</a></span>` : ''}
                </div>
                ${proj.desc ? `
                  <ul class="bulleted-list" style="list-style-type: disc; padding-left: 12px; margin-top: 2px;">
                    <li>${proj.desc}</li>
                  </ul>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

      </div>

    </div>
  </div>
</div>

</body>
</html>
  `;
};