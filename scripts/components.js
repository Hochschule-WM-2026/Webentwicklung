async function includeComponents() {
  try {
    const headerResponse = await fetch('./components/header.html');
    const headerContent = await headerResponse.text();
    document.body.insertAdjacentHTML('afterbegin', headerContent);

    const footerResponse = await fetch('./components/footer.html');
    const footerContent = await footerResponse.text();
    document.body.insertAdjacentHTML('beforeend', footerContent);

    const seitenTitel = document.getElementById('seitenTitel');
    if (seitenTitel) {
      const currentPath = window.location.pathname;
      if (currentPath.includes('kader.html')) {
        seitenTitel.textContent = 'WM 2026 - Kader';
      } else if (currentPath.includes('quiz.html')) {
        seitenTitel.textContent = 'WM 2026 - Quiz';
      } else if (currentPath.includes('table.html')) {
        seitenTitel.textContent = 'Tabellen & Spielpläne';
      } else {
        seitenTitel.textContent = 'WM 2026';
      }
    }

    const seitenleisteLinks = document.querySelectorAll('.seitenleisteLink');
    const desktopLinks = document.querySelectorAll('.desktopNavLink');
    
    function setzeAktivenLink(links) {
      links.forEach(link => {
        link.classList.remove('aktiv');
        const href = link.getAttribute('href');
        const currentPath = window.location.pathname;

        const normalizedHref = href.replace(/^\//, '');
        const normalizedPath = currentPath.replace(/^\//, '');

        if ((currentPath === './' || currentPath.endsWith('./index.html') || currentPath === './index.html') && href === '/') {
          link.classList.add('aktiv');
          localStorage.setItem('aktiverTab', href);
        } else if (normalizedPath === normalizedHref || normalizedPath.endsWith('/' + normalizedHref)) {
          link.classList.add('aktiv');
          localStorage.setItem('aktiverTab', href);
        }

        link.addEventListener('click', () => {
          localStorage.setItem('aktiverTab', href);
        });
      });
    }

    setzeAktivenLink(seitenleisteLinks);
    setzeAktivenLink(desktopLinks);

    const gespeicherterAktiverTab = localStorage.getItem('aktiverTab');
    if (gespeicherterAktiverTab) {
      if (!document.querySelector('.seitenleisteLink.aktiv')) {
        seitenleisteLinks.forEach(link => {
          if (link.getAttribute('href') === gespeicherterAktiverTab) {
            link.classList.add('aktiv');
          }
        });
      }
      if (!document.querySelector('.desktopNavLink.aktiv')) {
        desktopLinks.forEach(link => {
          if (link.getAttribute('href') === gespeicherterAktiverTab) {
            link.classList.add('aktiv');
          }
        });
      }
    }

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    if (typeof initDrawer === 'function') {
      initDrawer();
    }
  } catch (error) {
    console.error('Error loading components:', error);
  }
}

document.addEventListener('DOMContentLoaded', includeComponents);
