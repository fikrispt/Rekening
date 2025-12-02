// Copy-to-clipboard + toast
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn-copy');
  const toast = document.getElementById('toast');

  function showToast(text = 'Disalin!', ms = 1600) {
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), ms);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const toCopy = btn.getAttribute('data-copy') || '';
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(toCopy);
        } else {
          // fallback
          const ta = document.createElement('textarea');
          ta.value = toCopy;
          ta.style.position = 'fixed';
          ta.style.top = '-9999px';
          document.body.appendChild(ta);
          ta.focus(); ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        showToast('Berhasil disalin!');
      } catch (err) {
        showToast('Gagal menyalin');
        console.error('Copy failed', err);
      }
    });
  });

  // Make link clicks behave normally; copy button still copies full link.
  // Accessibility: allow keyboard to trigger copy by focusing button + Enter/Space (native)
});
