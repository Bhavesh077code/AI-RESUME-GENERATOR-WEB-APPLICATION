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
        .a4-page {
            width: 210mm;
            min-height: 297mm;
            padding: 40px;
            margin: 20px auto;
            background: white;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        @media print {
            body { background: white; }
            .a4-page { margin: 0; box-shadow: none; }
        }
    </style>
</head>
<body>

<div class="a4-page">
    <!-- Header Section -->
    <header class="flex justify-between items-center border-b-2 border-black-500 pb-8 mb-8">
        <div class="flex items-center gap-6">
            ${data.image ? `<img src="${data.image}" class="w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow-sm">` : ''}
            <div>
                <h1 class="text-10xl font-bold text-slate-800 tracking-tight">${data.fullName || 'YOUR NAME'}</h1>
                <p class="text-emerald-600 font-semibold text-lg mt-1 tracking-wide uppercase italic">Software Engineer</p>
            </div>
        </div>
        <div class="text-right text-sm text-slate-500 space-y-1">
            <p class="flex items-center justify-end gap-5"><span>${data.email}</span> 📧</p>
            <p class="flex items-center justify-end gap-5"><span>${data.phone}</span> 📞</p>
            <p class="flex items-center justify-end gap-5"><span>${data.location}</span> 📍</p>
        </div>
    </header>

    <div class="grid grid-cols-12 gap-10">
        <!-- Left Column (Main Content) -->
        <div class="col-span-8 space-y-8">
            
            <!-- Summary -->
            <section>
                <h2 class="text-xl font-bold text-slate-800 flex items-center gap-5 mb-8">
                    <span class="w-8 h-1 bg-emerald-500"></span> Professional Summary
                </h2>
                <p class="text-slate-600 leading-relaxed text-base italic">
                    ${data.summary || 'A passionate developer focused on building scalable web applications...'}
                </p>
            </section>

            <!-- Experience -->
            <section>
                <h2 class="text-xl font-bold text-slate-800 flex items-center gap-2 mb-100">
                    <span class="w-8 h-1 bg-emerald-500"></span> Experience
                </h2>
                <div class="space-y-6">
                    ${data.experience?.map(exp => `
                        <div class="relative pl-4 border-l-2 border-slate-100">
                            <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-emerald-400"></div>
                            <div class="flex justify-between items-start">
                                <h3 class="font-bold text-slate-800">${exp.role}</h3>
                                <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</span>
                            </div>
                            <p class="text-sm text-slate-500 font-medium mb-2">${exp.company}</p>
                            <p class="text-sm text-slate-600 leading-relaxed">${exp.desc || ''}</p>
                        </div>
                    `).join('') || ''}
                </div>
            </section>

            <!-- Projects -->
            <section>
                <h2 class="text-xl font-bold text-slate-800 flex items-center gap-2 mb-200">
                    <span class="w-8 h-1 bg-emerald-500"></span> Key Projects
                </h2>
                <div class="grid grid-cols-1 gap-4">
                    ${data.project?.map(p => `
                        <div class="p-4 rounded-lg bg-slate-50 border border-slate-100">
                            <h3 class="font-bold text-slate-800 text-sm mb-1">${p.title}</h3>
                            <p class="text-xs text-slate-600 leading-snug">${p.desc || ''}</p>
                        </div>
                    `).join('') || ''}
                </div>
            </section>
        </div>

        <!-- Right Column (Sidebar) -->
        <div class="col-span-4 space-y-8">
            
            <!-- Skills -->
            <section>
                <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Expertise</h3>
                <div class="flex flex-wrap gap-2">
                    ${data.skills?.map(s => `
                        <span class="px-3 py-1 bg-slate-800 text-white text-[11px] font-bold rounded-md tracking-tighter">
                            ${s.toUpperCase()}
                        </span>
                    `).join('') || ''}
                </div>
            </section>

            <!-- Education -->
            <section>
                <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Education</h3>
                ${data.education?.map(ed => `
                    <div class="mb-3">
                        <p class="text-sm font-bold text-slate-800 leading-tight">${ed.degree}</p>
                        <p class="text-xs text-slate-500">${ed.school}</p>
                        <p class="text-[10px] text-emerald-600 font-bold">${ed.year}</p>
                    </div>
                `).join('') || ''}
            </section>

            <!-- Languages -->
            <section>
                <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Languages</h3>
                <div class="space-y-1">
                    ${data.languages?.map(l => `<p class="text-sm text-slate-700 font-medium tracking-tight">• ${l}</p>`).join('') || ''}
                </div>
            </section>

            <!-- Links -->
            <section class="pt-4 border-t border-slate-100">
                <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Online</h3>
                <div class="space-y-2 text-sm font-semibold text-emerald-600">
                    ${data.links?.github ? `<p class="hover:underline cursor-pointer">GitHub ↗</p>` : ''}
                    ${data.links?.linkedin ? `<p class="hover:underline cursor-pointer">LinkedIn ↗</p>` : ''}
                    ${data.links?.portfolio ? `<p class="hover:underline cursor-pointer">Portfolio ↗</p>` : ''}
                </div>
            </section>

        </div>
    </div>
</div>

</body>
</html>
`;
};