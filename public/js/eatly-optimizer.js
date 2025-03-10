
// EATLY APP OPTIMIZER
// This script handles non-invasive improvements for scrolling, visibility and performance
// without modifying the app's visual appearance or functionality

(function() {
  console.log('[EATLY-OPTIMIZER] Initializing optimization script...');
  
  // =======================================================
  // PART 1: APPLE BUTTON VISIBILITY FIX
  // =======================================================
  function fixAppleButtonVisibility() {
    console.log('[EATLY-FIX] Initializing Apple button visibility fix...');
    
    // Check if we're on a relevant page
    const isRelevantPage = window.location.pathname.includes('/signup') || 
                          window.location.pathname.includes('/signin') || 
                          window.location.pathname.includes('/login') ||
                          window.location.pathname === '/';
    
    if (!isRelevantPage) return;
    
    // Function to locate and fix Apple button visibility
    function findAndFixAppleButton() {
      // Look for Apple authentication buttons
      const appleButtons = Array.from(document.querySelectorAll('button, a')).filter(el => {
        return el.textContent.includes('Apple') || 
               el.innerHTML.includes('apple') || 
               el.className.includes('apple') || 
               el.id.includes('apple');
      });
      
      // If Apple button is found
      if (appleButtons.length > 0) {
        const appleButton = appleButtons[0];
        const buttonContainer = appleButton.parentElement;
        
        // Check if container is out of view
        if (buttonContainer) {
          // Ensure container is visible in the view
          const containerRect = buttonContainer.getBoundingClientRect();
          
          // If container is out of view (above)
          if (containerRect.top < 0) {
            // Find main authentication section
            const authSection = buttonContainer.closest('section') || 
                                buttonContainer.closest('div[class*="auth"]') || 
                                buttonContainer.closest('div[class*="login"]') || 
                                buttonContainer.closest('div[class*="sign"]');
            
            if (authSection) {
              // Make section scrollable without changing appearance
              authSection.style.overflow = 'auto';
              authSection.style.maxHeight = '100vh';
              
              // Add style to ensure visibility without changing layout
              const styleElement = document.createElement('style');
              styleElement.id = 'eatly-apple-button-fix-style';
              styleElement.textContent = `
                body, html {
                  height: 100%;
                  overflow: auto !important;
                }
                
                /* Ensure all parent containers are scrollable */
                body > div, 
                body > main, 
                body > section, 
                [class*="container"], 
                [class*="wrapper"],
                [class*="auth"], 
                [class*="login"], 
                [class*="signup"] {
                  overflow: auto !important;
                  max-height: 100vh !important;
                  height: auto !important;
                }
                
                /* Style for scroll indicator */
                .scroll-indicator-top {
                  position: fixed;
                  top: 0;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 50px;
                  height: 4px;
                  background-color: rgba(209, 27, 25, 0.5);
                  border-radius: 0 0 4px 4px;
                  z-index: 1000;
                  opacity: 0;
                  transition: opacity 0.3s ease;
                }
                
                .scroll-indicator-top.visible {
                  opacity: 1;
                }
              `;
              
              document.head.appendChild(styleElement);
              
              // Add subtle scroll indicator
              const scrollIndicator = document.createElement('div');
              scrollIndicator.className = 'scroll-indicator-top';
              document.body.appendChild(scrollIndicator);
              
              // Only show indicator if there's content above
              window.addEventListener('scroll', function() {
                if (window.scrollY > 0) {
                  scrollIndicator.classList.remove('visible');
                } else {
                  const elementsAbove = document.elementsFromPoint(
                    window.innerWidth / 2, 
                    10
                  );
                  
                  // Check if interactive elements are above
                  const hasInteractiveElementsAbove = elementsAbove.some(el => 
                    el.tagName === 'BUTTON' || 
                    el.tagName === 'A' || 
                    el.tagName === 'INPUT' ||
                    el.getAttribute('role') === 'button'
                  );
                  
                  if (hasInteractiveElementsAbove) {
                    scrollIndicator.classList.add('visible');
                  } else {
                    scrollIndicator.classList.remove('visible');
                  }
                }
              });
              
              // Scroll to top once to show content
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
              
              console.log('[EATLY-FIX] Apple button container made visible through scrolling');
            }
          } else {
            console.log('[EATLY-FIX] Apple button already visible in view');
          }
        }
      } else {
        console.warn('[EATLY-FIX] Apple button not found');
      }
    }
    
    // Run after a short delay to ensure DOM is loaded
    setTimeout(findAndFixAppleButton, 500);
    
    // Try again after a longer delay (for async loading)
    setTimeout(findAndFixAppleButton, 2000);
    
    console.log('[EATLY-FIX] Apple button visibility fix initialized');
  }
  
  // =======================================================
  // PART 2: SCROLLING ENHANCEMENT
  // =======================================================
  function enhanceScrolling() {
    console.log('[EATLY-SCROLL] Initializing scrolling enhancements...');
    
    // Function to improve global scrolling
    function improveGlobalScrolling() {
      // Add styles to improve scrolling without changing appearance
      const scrollStyle = document.createElement('style');
      scrollStyle.id = 'eatly-scroll-enhancement';
      scrollStyle.textContent = `
        /* Global scrolling improvements */
        html, body {
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }
        
        /* Ensure main containers are scrollable */
        body > div, 
        main, 
        section, 
        [class*="container"], 
        [class*="wrapper"], 
        [class*="content"],
        [class*="page"] {
          overflow: auto;
          -webkit-overflow-scrolling: touch;
          max-height: 100vh;
        }
        
        /* Enhance specific scroll areas */
        [class*="scroll"], 
        [style*="overflow: auto"], 
        [style*="overflow: scroll"], 
        [style*="overflow-y: auto"], 
        [style*="overflow-y: scroll"] {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: rgba(209, 27, 25, 0.5) transparent;
        }
        
        /* Scrollbar styling for better visibility */
        ::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background-color: rgba(209, 27, 25, 0.5);
          border-radius: 3px;
        }
        
        /* Scrollbar styling for specific areas */
        [class*="scroll"]::-webkit-scrollbar,
        [style*="overflow"]::-webkit-scrollbar {
          width: 3px;
          height: 3px;
        }
        
        /* Scrolling performance optimization */
        .is-scrolling {
          pointer-events: none;
        }
        
        /* iOS scrolling fix */
        @supports (-webkit-touch-callout: none) {
          body {
            -webkit-overflow-scrolling: touch;
          }
        }
      `;
      
      document.head.appendChild(scrollStyle);
      
      // Optimize scrolling by adding temporary class during scroll
      let isScrolling = false;
      let scrollTimeout;
      
      window.addEventListener('scroll', function() {
        if (!isScrolling) {
          document.body.classList.add('is-scrolling');
          isScrolling = true;
        }
        
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(function() {
          document.body.classList.remove('is-scrolling');
          isScrolling = false;
        }, 100);
      }, { passive: true });
      
      console.log('[EATLY-SCROLL] Global scrolling improvements applied');
    }
    
    // Function to identify and optimize scrollable containers
    function optimizeScrollableContainers() {
      // Find potentially scrollable elements
      const potentialScrollables = document.querySelectorAll(
        '[style*="overflow"], [style*="height"], [class*="scroll"], [class*="container"], [class*="content"]'
      );
      
      potentialScrollables.forEach(element => {
        const style = window.getComputedStyle(element);
        
        // Check if element is a container with fixed/max height that might need scrolling
        if (style.height !== 'auto' && style.height !== '' && style.overflow === 'hidden') {
          // These elements could benefit from scrolling
          element.style.overflowY = 'auto';
          element.style.webkitOverflowScrolling = 'touch';
        }
        
        // Optimize already scrollable containers
        if (style.overflowY === 'auto' || style.overflowY === 'scroll' || 
            style.overflow === 'auto' || style.overflow === 'scroll') {
          element.style.webkitOverflowScrolling = 'touch';
          element.style.scrollBehavior = 'smooth';
        }
      });
      
      console.log('[EATLY-SCROLL] Specific scrollable containers optimized');
    }
    
    // Execute enhancements after a short delay
    setTimeout(() => {
      improveGlobalScrolling();
      optimizeScrollableContainers();
    }, 500);
    
    // Observe DOM changes to optimize new containers
    const observer = new MutationObserver(() => {
      optimizeScrollableContainers();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    console.log('[EATLY-SCROLL] Scrolling enhancements initialized');
  }
  
  // =======================================================
  // PART 3: RESOURCE AND PERFORMANCE OPTIMIZATION
  // =======================================================
  function optimizeResources() {
    console.log('[EATLY-OPTIMIZE] Initializing resource optimization...');
    
    // List of essential resources that should not be disabled
    const essentialPatterns = [
      'main', 'app', 'vendor', 'core', 'bundle', 'chunk', 'runtime',
      'eatly', 'auth', 'login', 'sign', 'fonts', 'polyfill'
    ];
    
    // Function to optimize scripts
    function optimizeScripts() {
      // Find potentially non-essential scripts
      const scripts = Array.from(document.scripts).filter(script => {
        if (!script.src) return false; // Ignore inline scripts
        
        // Check if it's an essential script
        const isEssential = essentialPatterns.some(pattern => 
          script.src.toLowerCase().includes(pattern)
        );
        
        return !isEssential;
      });
      
      scripts.forEach(script => {
        // Don't disable, but optimize loading
        script.setAttribute('defer', 'true');
        
        // For really heavy scripts, use async attribute
        if (script.src.includes('analytics') || 
            script.src.includes('tracking') || 
            script.src.includes('metrics')) {
          script.setAttribute('async', 'true');
        }
      });
      
      console.log('[EATLY-OPTIMIZE] Scripts optimized:', scripts.length);
    }
    
    // Function to optimize stylesheets
    function optimizeStyles() {
      // Find potentially non-essential stylesheets
      const styleSheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).filter(link => {
        if (!link.href) return false;
        
        // Check if it's an essential stylesheet
        const isEssential = essentialPatterns.some(pattern => 
          link.href.toLowerCase().includes(pattern)
        );
        
        return !isEssential;
      });
      
      styleSheets.forEach(stylesheet => {
        // Load in a non-blocking way
        stylesheet.media = 'print';
        stylesheet.onload = function() {
          this.media = 'all';
        };
      });
      
      console.log('[EATLY-OPTIMIZE] Stylesheets optimized:', styleSheets.length);
    }
    
    // Function to optimize images
    function optimizeImages() {
      // Add lazy loading to images
      const images = document.querySelectorAll('img:not([loading])');
      
      images.forEach(img => {
        img.setAttribute('loading', 'lazy');
        
        // Add explicit dimensions to avoid layout shifts
        if (!img.hasAttribute('width') && !img.hasAttribute('height') && img.complete) {
          img.setAttribute('width', img.naturalWidth || '');
          img.setAttribute('height', img.naturalHeight || '');
        }
      });
      
      console.log('[EATLY-OPTIMIZE] Images optimized:', images.length);
    }
    
    // Function to optimize frequent events
    function optimizeEvents() {
      // Throttle function to limit execution frequency
      function throttle(func, delay) {
        let lastCall = 0;
        return function(...args) {
          const now = Date.now();
          if (now - lastCall >= delay) {
            lastCall = now;
            return func.apply(this, args);
          }
        };
      }
      
      // List of events to throttle
      const eventsToThrottle = {
        'scroll': 100,    // 10 times per second
        'mousemove': 50,  // 20 times per second
        'resize': 200,    // 5 times per second
        'input': 100      // 10 times per second
      };
      
      // Store the original method
      const originalAddEventListener = EventTarget.prototype.addEventListener;
      
      // Replace the method to optimize certain events
      EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (eventsToThrottle[type] && typeof listener === 'function') {
          const throttledListener = throttle(listener, eventsToThrottle[type]);
          return originalAddEventListener.call(this, type, throttledListener, options);
        }
        
        return originalAddEventListener.call(this, type, listener, options);
      };
      
      console.log('[EATLY-OPTIMIZE] Frequent events optimized');
    }
    
    // Execute optimizations after page load
    if (document.readyState === 'complete') {
      optimizeScripts();
      optimizeStyles();
      optimizeImages();
      optimizeEvents();
    } else {
      window.addEventListener('load', () => {
        // Wait a brief moment to not disrupt initial loading
        setTimeout(() => {
          optimizeScripts();
          optimizeStyles();
          optimizeImages();
          optimizeEvents();
        }, 1000);
      });
    }
    
    console.log('[EATLY-OPTIMIZE] Resource optimization initialized');
  }
  
  // =======================================================
  // MAIN INITIALIZATION
  // =======================================================
  function initializeOptimizations() {
    console.log('[EATLY-MAIN] Initializing all optimizations...');
    
    // 1. Fix Apple button visibility
    fixAppleButtonVisibility();
    
    // 2. Enhance scrolling after a short delay
    setTimeout(enhanceScrolling, 500);
    
    // 3. Optimize resources after page load
    if (document.readyState === 'complete') {
      setTimeout(optimizeResources, 1000);
    } else {
      window.addEventListener('load', () => {
        setTimeout(optimizeResources, 1000);
      });
    }
    
    console.log('[EATLY-MAIN] All optimizations initialized');
  }
  
  // Start optimizations
  initializeOptimizations();
})();
