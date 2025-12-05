// Fungsi Fetch yang Dioptimalkan untuk Kecepatan
async function loadComponent(id, file) {
    const el = document.getElementById(id);
    if (!el) return;

    try {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const html = await res.text();
        el.innerHTML = html;
        
        // Re-eksekusi script di dalam komponen (penting untuk logika form WA)
        el.querySelectorAll('script').forEach(oldScript => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });

    } catch (err) {
        console.error(`Error loading ${file}:`, err);
        // Fallback jika gagal load
        el.innerHTML = `<div class="py-10 text-center text-red-500">Gagal memuat konten. Periksa koneksi internet Anda.</div>`;
    }
}

// Jalankan Paralel (Async) agar loading super cepat
document.addEventListener("DOMContentLoaded", () => {
    const components = [
        { id: 'hero-section', path: 'components/hero.html' },
        { id: 'strategies-section', path: 'components/strategies.html' },
        { id: 'audience-section', path: 'components/audience.html' },
        { id: 'speakers-section', path: 'components/speakers.html' },
        { id: 'faq-section', path: 'components/faq.html' },
        { id: 'footer-section', path: 'components/footer.html' }
    ];

    // Menggunakan Promise.all untuk memuat semua sekaligus
    Promise.all(components.map(c => loadComponent(c.id, c.path)));
});