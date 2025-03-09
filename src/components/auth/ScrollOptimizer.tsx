
import { useEffect } from 'react';

/**
 * ScrollOptimizer component enhances scrolling performance
 * and touch interactions on all devices, particularly mobile.
 */
const ScrollOptimizer = () => {
  useEffect(() => {
    console.log('[EATLY-SCROLL] Initializing scroll optimizations...');
    
    // 1. Fix iOS and Android scrolling issues
    const enhanceSmoothScrolling = () => {
      // Add the styles for smooth scrolling
      const scrollStyles = document.createElement('style');
      scrollStyles.id = 'eatly-enhanced-scroll-styles';
      scrollStyles.textContent = `
        /* Global scroll optimizations */
        html, body {
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: none;
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
        }
        
        /* Optimize scrollable containers */
        .scroll-container, 
        div[style*="overflow"], 
        div[style*="overflow-y"],
        div[class*="overflow"] {
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
        }
        
        /* Apply GPU acceleration to scrollable content */
        .scroll-content,
        div[style*="overflow"] > *,
        div[style*="overflow-y"] > *,
        div[class*="overflow"] > * {
          transform: translateZ(0);
          will-change: transform;
          backface-visibility: hidden;
        }
        
        /* Fix for iOS momentum scrolling */
        @supports (-webkit-touch-callout: none) {
          html, body {
            height: -webkit-fill-available;
          }
        }
        
        /* Fix 100vh issue on mobile browsers */
        @media (max-width: 768px) {
          .full-height {
            height: 100%;
            height: -webkit-fill-available;
          }
        }
      `;
      
      document.head.appendChild(scrollStyles);
      console.log('[EATLY-SCROLL] Scroll styles applied');
      
      return () => {
        // Clean up scroll styles
        const styles = document.getElementById('eatly-enhanced-scroll-styles');
        if (styles && styles.parentNode) {
          styles.parentNode.removeChild(styles);
        }
      };
    };
    
    // 2. Fix touch interactions for mobile devices
    const enhanceTouchInteractions = () => {
      // Add styles for better touch targets
      const touchStyles = document.createElement('style');
      touchStyles.id = 'eatly-touch-styles';
      touchStyles.textContent = `
        /* Improve touch targets */
        @media (max-width: 768px) {
          a, button, input[type="button"], input[type="submit"], [role="button"], .clickable {
            min-height: 44px;
            min-width: 44px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer !important;
            position: relative;
            z-index: 1;
          }
          
          /* Fix hover states on mobile */
          @media (hover: none) {
            a:hover, button:hover, input[type="button"]:hover, input[type="submit"]:hover {
              opacity: 1 !important;
              transform: none !important;
            }
          }
        }
      `;
      
      document.head.appendChild(touchStyles);
      console.log('[EATLY-SCROLL] Touch interactions enhanced');
      
      return () => {
        // Clean up touch styles
        const styles = document.getElementById('eatly-touch-styles');
        if (styles && styles.parentNode) {
          styles.parentNode.removeChild(styles);
        }
      };
    };
    
    // Apply all optimizations
    const scrollCleanup = enhanceSmoothScrolling();
    const touchCleanup = enhanceTouchInteractions();
    
    // Make the onboarding content scrollable if needed
    const makeScrollable = () => {
      const onboardingContainers = document.querySelectorAll('.min-h-screen, [style*="min-height: 100vh"]');
      
      onboardingContainers.forEach(container => {
        // Ensure containers can scroll properly
        if (container instanceof HTMLElement) {
          container.style.overflowY = 'auto';
          container.style.WebkitOverflowScrolling = 'touch';
          container.classList.add('scroll-container');
        }
      });
      
      console.log('[EATLY-SCROLL] Containers made scrollable');
    };
    
    // Run makeScrollable initially and on resize
    makeScrollable();
    window.addEventListener('resize', makeScrollable);
    
    // Cleanup function
    return () => {
      scrollCleanup();
      touchCleanup();
      window.removeEventListener('resize', makeScrollable);
      console.log('[EATLY-SCROLL] Scroll optimizations cleaned up');
    };
  }, []);
  
  return null;
};

export default ScrollOptimizer;
