export const professional3 = (data) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #f8fafc; }
        
        /* STRICT A4 ONE PAGE HEIGHT BOX */
        .a4-page {
            width: 210mm;
            height: 297mm;
            max-height: 297mm;
            padding: 35px 40px;
            margin: 20px auto;
            background: white;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        /* INNER FLOW CONTAINER TO ABSORB HEAVY DATA */
        .scrollable-body {
            display: grid;
            grid-template-columns: repeat(12, minmax(0, 1fr));
            gap: 24px;
            flex-grow: 1;
            overflow-y: auto;
            padding-right: 4px;
        }
        /* HIDE SCROLLBAR */
        .scrollable-body::-webkit-scrollbar { width: 0px; background: transparent; }
        .scrollable-body { scrollbar-width: none; }

        @media print {
            body { background: white; padding: 0; }
            .a4-page { margin: 0; box-shadow: none; height: 297mm; max-height: 297mm; }
            .scrollable-body { overflow: hidden; }
        }
    </style>
</head>
<body>

<div class="a4-page">
    <!-- Header Section (Dynamic & Compact) -->
    <header class="flex justify-between items-center border-b-2 border-slate-200 pb-5 mb-5 flex-shrink-0">
        <div class="flex items-center gap-5">
            ${data.image ? `<img src="${data.image}" class="w-20 h-20 rounded-full object-cover border-4 border-slate-100 shadow-sm">` : ''}
            <div>
                <h1 class="text-3xl font-bold text-slate-800 tracking-tight">${data.fullName || 'YOUR NAME'}</h1>
                ${data.experience?.[0]?.role ? `<p class="text-emerald-600 font-semibold text-sm mt-0.5 tracking-wide uppercase italic">${data.experience[0].role}</p>` : '<p class="text-emerald-600 font-semibold text-sm mt-0.5 tracking-wide uppercase italic">Software Engineer</p>'}
            </div>
        </div>
        <div class="text-right text-xs text-slate-500 space-y-1 flex-shrink-0">
            ${data.email ? `<p class="flex items-center justify-end gap-2"><span>${data.email}</span> 📧</p>` : ''}
            ${data.phone ? `<p class="flex items-center justify-end gap-2"><span>${data.phone}</span> 📞</p>` : ''}
            ${data.location ? `<p class="flex items-center justify-end gap-2"><span>${data.location}</span> 📍</p>` : ''}
        </div>
    </header>

    <!-- Scrollable Flow Engine -->
    <div class="scrollable-body">
        
        <!-- Left Column (Main Content) -->
        <div class="col-span-8 space-y-5">
            
            <!-- Summary -->
            ${data.summary ? `
            <section>
                <h2 class="text-base font-bold text-slate-800 flex items-center gap-3 mb-2.5">
                    <span class="w-6 h-1 bg-emerald-500"></span> Professional Summary
                </h2>
                <p class="text-slate-600 leading-relaxed text-xs text-justify">
                    ${data.summary}
                </p>
            </section>
            ` : ''}

            <!-- Experience -->
            ${data.experience && data.experience.length > 0 ? `
            <section>
                <h2 class="text-base font-bold text-slate-800 flex items-center gap-3 mb-3">
                    <span class="w-6 h-1 bg-emerald-500"></span> Experience
                </h2>
                <div class="space-y-4">
                    ${data.experience.map(exp => `
                        <div class="relative pl-4 border-l-2 border-slate-100">
                            <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-emerald-400"></div>
                            <div class="flex justify-between items-start">
                                <h3 class="font-bold text-slate-800 text-xs">${exp.role}</h3>
                                <span class="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded whitespace-nowrap">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</span>
                            </div>
                            <p class="text-[11px] text-slate-500 font-medium mb-1">${exp.company}</p>
                            ${exp.desc ? `<p class="text-xs text-slate-600 leading-relaxed text-justify">${exp.desc}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Projects -->
            ${data.project && data.project.length > 0 ? `
            <section>
                <h2 class="text-base font-bold text-slate-800 flex items-center gap-3 mb-3">
                    <span class="w-6 h-1 bg-emerald-500"></span> Key Projects
                </h2>
                <div class="grid grid-cols-1 gap-3">
                    ${data.project.map(p => `
                        <div class="p-3 rounded-lg bg-slate-50 border border-slate-100">
                            <h3 class="font-bold text-slate-800 text-xs mb-0.5">${p.title}</h3>
                            <p class="text-[11px] text-slate-500 font-medium mb-1">${p.link}</p>
                            ${p.desc ? `<p class="text-xs text-slate-600 leading-normal text-justify">${p.desc}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}
        </div>

        <!-- Right Column (Sidebar) -->
        <div class="col-span-4 space-y-5">
            
            <!-- Skills -->
            ${data.skills && data.skills.length > 0 ? `
            <section>
                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">Expertise</h3>
                <div class="flex flex-wrap gap-1.5">
                    ${data.skills.map(s => `
                        <span class="px-2 py-0.5 bg-slate-800 text-white text-[10px] font-semibold rounded tracking-tight">
                            ${s.toUpperCase()}
                        </span>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Education -->
            ${data.education && data.education.length > 0 ? `
            <section>
                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">Education</h3>
                <div class="space-y-2.5">
                    ${data.education.map(ed => `
                        <div class="leading-tight">
                            <p class="text-xs font-bold text-slate-800">${ed.degree}</p>
                            <p class="text-[11px] text-slate-500">${ed.school}</p>
                            <p class="text-[10px] text-emerald-600 font-bold mt-0.5">${ed.year}</p>
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Certifications (NEW SECTION) -->
            ${data.certification && data.certification.length > 0 ? `
            <section>
                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">Certifications</h3>
                <div class="space-y-2">
                    ${data.certification.map(cert => `
                        <div class="leading-tight">
                            <p class="text-xs font-bold text-slate-700">${cert.name}</p>
                            <p class="text-[10px] text-slate-400">${cert.issuer || ''} ${cert.date ? `(${cert.date})` : ''}</p>
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Languages -->
            ${data.languages && data.languages.length > 0 ? `
            <section>
                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Languages</h3>
                <div class="space-y-0.5">
                    ${data.languages.map(l => `<p class="text-xs text-slate-700 font-medium">• ${l}</p>`).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Links (Improved to Real Functional Anchors) -->
            ${data.links && (data.links.linkedin || data.links.portfolio || data.links.github) ? `
            <section class="pt-3 border-t border-slate-100">
                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Online</h3>
                <div class="space-y-1.5 text-xs font-semibold text-emerald-600 flex flex-col">
                    ${data.links.linkedin ? `<a href="${data.links.linkedin}" target="_blank" class="hover:underline inline-flex items-center gap-1">LinkedIn ↗</a>` : ''}
                    ${data.links.portfolio ? `<a href="${data.links.portfolio}" target="_blank" class="hover:underline inline-flex items-center gap-1">Portfolio ↗</a>` : ''}
                    ${data.links.github ? `<a href="${data.links.github}" target="_blank" class="hover:underline inline-flex items-center gap-1">GitHub ↗</a>` : ''}
                </div>
            </section>
            ` : ''}

        </div>
    </div>
</div>

</body>
</html>
  `;
};