
/**
 * Styles utility for error message harmonization
 */

/**
 * Applies CSS styles for error messages
 */
export const applyErrorStyles = () => {
  // Check if styles already exist
  if (document.getElementById('eatly-error-styles')) return;
  
  // Create style element
  const styleElement = document.createElement('style');
  styleElement.id = 'eatly-error-styles';
  styleElement.textContent = `
    /* Styles for error messages */
    .error-message.visible,
    .form-field-error.visible,
    .validation-message.visible {
      animation: fadeInError 0.3s ease forwards;
    }
    
    /* Visual indication for fields with error */
    input.has-error, 
    select.has-error, 
    textarea.has-error {
      border-color: #D11B19 !important;
      background-color: rgba(209, 27, 25, 0.05) !important;
    }
    
    /* Simple animation for error messages */
    @keyframes fadeInError {
      from { opacity: 0; transform: translateY(-3px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  
  try {
    document.head.appendChild(styleElement);
    console.log("Error styles applied successfully");
  } catch (e) {
    console.error("Error applying styles:", e);
  }
};
