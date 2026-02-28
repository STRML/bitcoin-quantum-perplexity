/* app.js — Routing, rendering, navigation, search for Bitcoin Quantum Corpus */

(function () {
  'use strict';

  // ============================================
  // NAVIGATION STRUCTURE
  // ============================================
  const NAV_STRUCTURE = [
    {
      type: 'standalone',
      label: 'Index',
      icon: 'home',
      route: '00-INDEX'
    },
    {
      type: 'group',
      label: '01 Threat Model',
      items: [
        { route: '01-threat-model/shor-vs-ecdsa', label: "Shor's Algorithm vs ECDSA" },
        { route: '01-threat-model/grover-vs-sha256', label: "Grover's Algorithm vs SHA-256" },
        { route: '01-threat-model/vulnerable-vs-safe-utxos', label: 'Vulnerable vs Safe UTXOs' },
        { route: '01-threat-model/quantum-hardware-status', label: 'Quantum Hardware Status' }
      ]
    },
    {
      type: 'group',
      label: '02 Academic Research',
      items: [
        { route: '02-academic-research/paper-summaries', label: 'Paper Summaries' },
        { route: '02-academic-research/key-findings-synthesis', label: 'Key Findings Synthesis' }
      ]
    },
    {
      type: 'group',
      label: '03 Proposals & BIPs',
      items: [
        { route: '03-proposals-and-bips/bip-catalog', label: 'BIP Catalog' },
        { route: '03-proposals-and-bips/mailing-list-discussions', label: 'Mailing List Discussions' },
        { route: '03-proposals-and-bips/soft-fork-vs-hard-fork', label: 'Soft Fork vs Hard Fork' }
      ]
    },
    {
      type: 'group',
      label: '04 Signature Schemes',
      items: [
        { route: '04-signature-schemes/comparison-matrix', label: 'Comparison Matrix' },
        { route: '04-signature-schemes/sphincs-plus', label: 'SPHINCS+ / SLH-DSA' },
        { route: '04-signature-schemes/crystals-dilithium', label: 'CRYSTALS-Dilithium / ML-DSA' },
        { route: '04-signature-schemes/falcon', label: 'FALCON / FN-DSA' },
        { route: '04-signature-schemes/lamport-and-hash-based', label: 'Lamport & Hash-Based' },
        { route: '04-signature-schemes/other-candidates', label: 'Other Candidates' }
      ]
    },
    {
      type: 'group',
      label: '05 Code & Implementations',
      items: [
        { route: '05-code-and-implementations/active-repos', label: 'Active Repositories' },
        { route: '05-code-and-implementations/proof-of-concepts', label: 'Proof of Concepts' },
        { route: '05-code-and-implementations/integration-challenges', label: 'Integration Challenges' }
      ]
    },
    {
      type: 'group',
      label: '06 People & Organizations',
      items: [
        { route: '06-people-and-orgs/key-researchers', label: 'Key Researchers' },
        { route: '06-people-and-orgs/organizations', label: 'Organizations' },
        { route: '06-people-and-orgs/debate-map', label: 'Debate Map' }
      ]
    },
    {
      type: 'group',
      label: '07 Timeline & Risk',
      items: [
        { route: '07-timeline-and-risk/quantum-progress-timeline', label: 'Quantum Progress Timeline' },
        { route: '07-timeline-and-risk/bitcoin-migration-timeline', label: 'Bitcoin Migration Timeline' },
        { route: '07-timeline-and-risk/gap-analysis', label: 'Gap Analysis' }
      ]
    },
    {
      type: 'group',
      label: '08 Community Sentiment',
      items: [
        { route: '08-community-sentiment/notable-threads-and-posts', label: 'Notable Threads & Posts' },
        { route: '08-community-sentiment/conference-talks', label: 'Conference Talks' }
      ]
    },
    {
      type: 'group',
      label: '09 Open Questions',
      items: [
        { route: '09-open-questions/open-questions', label: 'Open Questions' }
      ]
    },
    {
      type: 'group',
      label: '10 Synthesis & Reference',
      items: [
        { route: '10-synthesis/EXECUTIVE-BRIEF', label: 'Executive Brief' },
        { route: '10-synthesis/SYNTHESIS', label: 'Comprehensive Synthesis' },
        { route: '10-synthesis/canonical-numbers', label: 'Canonical Numbers' },
        { route: '10-synthesis/positions-matrix', label: 'Positions Matrix' }
      ]
    }
  ];

  // ============================================
  // DOM REFERENCES
  // ============================================
  const contentEl = document.getElementById('content');
  const navTree = document.getElementById('nav-tree');
  const breadcrumb = document.getElementById('breadcrumb');
  const searchInput = document.getElementById('search-input');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const hamburger = document.getElementById('hamburger');
  const scrollTopBtn = document.getElementById('scroll-top');
  const progressBar = document.getElementById('reading-progress-bar');
  const mainEl = document.getElementById('main');

  // ============================================
  // THEME TOGGLE
  // ============================================
  (function initTheme() {
    const toggle = document.querySelector('[data-theme-toggle]');
    const root = document.documentElement;
    let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.setAttribute('data-theme', theme);
    updateThemeIcon(toggle, theme);

    toggle.addEventListener('click', function () {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
      updateThemeIcon(toggle, theme);
    });
  })();

  function updateThemeIcon(btn, theme) {
    btn.innerHTML = theme === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  // ============================================
  // BUILD NAVIGATION
  // ============================================
  function buildNav() {
    var html = '';

    NAV_STRUCTURE.forEach(function (section, idx) {
      if (section.type === 'standalone') {
        html += '<a class="nav-standalone" href="#/' + section.route + '" data-route="' + section.route + '">' + section.label + '</a>';
      } else {
        html += '<div class="nav-group" data-group="' + idx + '">';
        html += '<button class="nav-group-header" data-group-toggle="' + idx + '" aria-expanded="true">';
        html += '<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';
        html += '<span>' + section.label + '</span>';
        html += '</button>';
        html += '<div class="nav-group-items" data-group-items="' + idx + '">';
        section.items.forEach(function (item) {
          html += '<a class="nav-link" href="#/' + item.route + '" data-route="' + item.route + '">' + item.label + '</a>';
        });
        html += '</div></div>';
      }
    });

    navTree.innerHTML = html;

    // Collapse/expand handlers
    navTree.querySelectorAll('.nav-group-header').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = btn.getAttribute('data-group-toggle');
        var items = navTree.querySelector('[data-group-items="' + idx + '"]');
        var isCollapsed = btn.classList.contains('collapsed');
        if (isCollapsed) {
          btn.classList.remove('collapsed');
          btn.setAttribute('aria-expanded', 'true');
          items.classList.remove('collapsed');
          items.style.maxHeight = items.scrollHeight + 'px';
        } else {
          btn.classList.add('collapsed');
          btn.setAttribute('aria-expanded', 'false');
          items.style.maxHeight = items.scrollHeight + 'px';
          // Force reflow then collapse
          items.offsetHeight;
          items.classList.add('collapsed');
          items.style.maxHeight = '0px';
        }
      });
    });

    // Set initial max-heights
    navTree.querySelectorAll('.nav-group-items').forEach(function (el) {
      el.style.maxHeight = el.scrollHeight + 'px';
    });
  }

  // ============================================
  // MARKDOWN RENDERING
  // ============================================
  function initMarked() {
    if (typeof marked === 'undefined') return;

    marked.setOptions({
      gfm: true,
      breaks: false
    });

    // Custom renderer for tables (wrap in scrollable div)
    var renderer = new marked.Renderer();
    renderer.table = function (header, body) {
      return '<div class="table-wrapper"><table><thead>' + header + '</thead><tbody>' + body + '</tbody></table></div>';
    };

    // Keep heading IDs for anchor links
    renderer.heading = function (text, level) {
      var id = text.toLowerCase().replace(/<[^>]*>/g, '').replace(/[^\w]+/g, '-').replace(/^-|-$/g, '');
      return '<h' + level + ' id="' + id + '">' + text + '</h' + level + '>\n';
    };

    marked.use({ renderer: renderer });
  }

  function renderMarkdown(md) {
    if (typeof marked === 'undefined') return '<p>Loading renderer...</p>';
    return marked.parse(md);
  }

  // ============================================
  // CROSS-REFERENCE LINK REWRITING
  // ============================================
  function rewriteLinks(html, currentRoute) {
    var container = document.createElement('div');
    container.innerHTML = html;

    var links = container.querySelectorAll('a');
    links.forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href) return;

      // External links: open in new tab
      if (href.match(/^https?:\/\//)) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
        return;
      }

      // Anchor-only links (e.g., #some-heading) — keep as is
      if (href.startsWith('#') && !href.startsWith('#/')) {
        return;
      }

      // Relative .md links — convert to hash routes
      if (href.endsWith('.md') || href.includes('.md#')) {
        var resolved = resolveRelativeLink(href, currentRoute);
        a.setAttribute('href', resolved);
        // Add click handler for smooth nav
        a.setAttribute('data-internal', 'true');
        return;
      }
    });

    return container.innerHTML;
  }

  function resolveRelativeLink(href, currentRoute) {
    // Split off anchor
    var parts = href.split('#');
    var path = parts[0];
    var anchor = parts[1] || '';

    // Remove .md extension
    path = path.replace(/\.md$/, '');

    // Determine the current directory
    var currentDir = '';
    if (currentRoute.indexOf('/') !== -1) {
      currentDir = currentRoute.substring(0, currentRoute.lastIndexOf('/'));
    }

    // Resolve relative paths
    if (path.startsWith('./')) {
      path = path.substring(2);
    }

    // Handle ../ paths
    while (path.startsWith('../')) {
      path = path.substring(3);
      var lastSlash = currentDir.lastIndexOf('/');
      if (lastSlash !== -1) {
        currentDir = currentDir.substring(0, lastSlash);
      } else {
        currentDir = '';
      }
    }

    // Build full route
    var fullRoute;
    if (path.indexOf('/') !== -1) {
      // Already has directory component
      fullRoute = path;
    } else if (currentDir) {
      fullRoute = currentDir + '/' + path;
    } else {
      fullRoute = path;
    }

    var result = '#/' + fullRoute;
    if (anchor) result += '#' + anchor;
    return result;
  }

  // ============================================
  // ROUTING
  // ============================================
  function getRouteFromHash() {
    var hash = window.location.hash;
    if (!hash || hash === '#' || hash === '#/') {
      return '00-INDEX';
    }
    // Remove leading #/
    var route = hash.replace(/^#\//, '');
    // Handle anchor within a document
    if (route.includes('#')) {
      route = route.split('#')[0];
    }
    return route;
  }

  function getAnchorFromHash() {
    var hash = window.location.hash;
    // Find the second # (the anchor within the document)
    var firstSlash = hash.indexOf('/');
    var rest = hash.substring(firstSlash + 1);
    var anchorIdx = rest.indexOf('#');
    if (anchorIdx !== -1) {
      return rest.substring(anchorIdx + 1);
    }
    return null;
  }

  function navigate(route) {
    if (!route || !CORPUS[route]) {
      // Try to find a matching route
      var keys = Object.keys(CORPUS);
      var match = keys.find(function (k) {
        return k.toLowerCase() === route.toLowerCase();
      });
      if (match) {
        route = match;
      } else {
        route = '00-INDEX';
      }
    }

    // Render content
    var md = CORPUS[route];
    var html = renderMarkdown(md);
    html = rewriteLinks(html, route);
    contentEl.innerHTML = html;

    // Handle internal link clicks
    contentEl.querySelectorAll('a[data-internal]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.hash = a.getAttribute('href');
      });
    });

    // Update active nav state
    updateActiveNav(route);

    // Update breadcrumb
    updateBreadcrumb(route);

    // Update page title
    updateTitle(route);

    // Scroll to anchor or top
    var anchor = getAnchorFromHash();
    if (anchor) {
      requestAnimationFrame(function () {
        var el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    } else {
      mainEl.scrollTo({ top: 0 });
      window.scrollTo({ top: 0 });
    }

    // Close mobile sidebar
    closeSidebar();
  }

  function updateActiveNav(route) {
    navTree.querySelectorAll('.nav-link, .nav-standalone').forEach(function (el) {
      var elRoute = el.getAttribute('data-route');
      if (elRoute === route) {
        el.classList.add('active');
        // Ensure parent group is expanded
        var group = el.closest('.nav-group');
        if (group) {
          var idx = group.getAttribute('data-group');
          var header = group.querySelector('.nav-group-header');
          var items = group.querySelector('.nav-group-items');
          if (header.classList.contains('collapsed')) {
            header.classList.remove('collapsed');
            header.setAttribute('aria-expanded', 'true');
            items.classList.remove('collapsed');
            items.style.maxHeight = items.scrollHeight + 'px';
          }
        }
        // Scroll nav link into view within sidebar
        requestAnimationFrame(function () {
          el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        });
      } else {
        el.classList.remove('active');
      }
    });
  }

  function updateBreadcrumb(route) {
    var parts = [];
    parts.push('Corpus');

    if (route === '00-INDEX') {
      parts.push('Index');
    } else if (route === '09-open-questions') {
      parts.push('Open Questions');
    } else {
      // Find in nav structure
      NAV_STRUCTURE.forEach(function (section) {
        if (section.type === 'group' && section.items) {
          section.items.forEach(function (item) {
            if (item.route === route) {
              parts.push(section.label);
              parts.push(item.label);
            }
          });
        }
      });
    }

    var html = '';
    parts.forEach(function (part, i) {
      if (i > 0) {
        html += '<span class="breadcrumb-sep" aria-hidden="true">/</span>';
      }
      html += '<span class="breadcrumb-item">' + part + '</span>';
    });
    breadcrumb.innerHTML = html;
  }

  function updateTitle(route) {
    var title = 'Bitcoin Quantum Threat Research Corpus';
    // Find label
    NAV_STRUCTURE.forEach(function (section) {
      if (section.type === 'standalone' && section.route === route) {
        title = section.label + ' — ' + title;
      } else if (section.type === 'group' && section.items) {
        section.items.forEach(function (item) {
          if (item.route === route) {
            title = item.label + ' — ' + title;
          }
        });
      }
    });
    document.title = title;
  }

  // ============================================
  // MOBILE SIDEBAR
  // ============================================
  function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('open');
    requestAnimationFrame(function () {
      sidebarOverlay.classList.add('visible');
    });
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('visible');
    setTimeout(function () {
      sidebarOverlay.classList.remove('open');
    }, 300);
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', function () {
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  sidebarOverlay.addEventListener('click', closeSidebar);

  // ============================================
  // SEARCH
  // ============================================
  searchInput.addEventListener('input', function () {
    var query = searchInput.value.trim().toLowerCase();

    if (!query) {
      // Show all
      navTree.querySelectorAll('.nav-link, .nav-standalone, .nav-group').forEach(function (el) {
        el.classList.remove('search-hidden');
      });
      return;
    }

    // Filter nav items
    NAV_STRUCTURE.forEach(function (section, idx) {
      if (section.type === 'standalone') {
        var el = navTree.querySelector('[data-route="' + section.route + '"]');
        if (el) {
          var match = section.label.toLowerCase().includes(query);
          el.classList.toggle('search-hidden', !match);
        }
      } else {
        var groupEl = navTree.querySelector('[data-group="' + idx + '"]');
        var anyVisible = false;

        section.items.forEach(function (item) {
          var linkEl = navTree.querySelector('[data-route="' + item.route + '"]');
          if (linkEl) {
            var match = item.label.toLowerCase().includes(query) || section.label.toLowerCase().includes(query);
            linkEl.classList.toggle('search-hidden', !match);
            if (match) anyVisible = true;
          }
        });

        if (groupEl) {
          groupEl.classList.toggle('search-hidden', !anyVisible);
          // Expand matching groups
          if (anyVisible) {
            var header = groupEl.querySelector('.nav-group-header');
            var items = groupEl.querySelector('.nav-group-items');
            if (header.classList.contains('collapsed')) {
              header.classList.remove('collapsed');
              items.classList.remove('collapsed');
              items.style.maxHeight = items.scrollHeight + 'px';
            }
          }
        }
      }
    });
  });

  // Clear search on Escape
  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input'));
      searchInput.blur();
    }
  });

  // ============================================
  // SCROLL PROGRESS + SCROLL-TO-TOP
  // ============================================
  window.addEventListener('scroll', function () {
    // Reading progress
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = Math.min(progress, 100) + '%';

    // Scroll-to-top button
    if (scrollTop > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============================================
  // KEYBOARD NAVIGATION
  // ============================================
  document.addEventListener('keydown', function (e) {
    // Cmd/Ctrl + K to focus search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // ============================================
  // INIT
  // ============================================
  function init() {
    initMarked();
    buildNav();

    // Listen for hash changes
    window.addEventListener('hashchange', function () {
      var route = getRouteFromHash();
      navigate(route);
    });

    // Initial navigation
    var route = getRouteFromHash();
    navigate(route);
  }

  // Scripts are loaded synchronously at end of body, so everything should be available
  init();

})();
