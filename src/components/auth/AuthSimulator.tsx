
import React from 'react';

// Export all simulator components
export { SimulatedSocialButton } from './simulators/SimulatedSocialButton';
export { SimulatedEmailAuth } from './simulators/SimulatedEmailAuth';
export { SimulatedSignUpForm } from './simulators/SimulatedSignUpForm';
export { SimulatedSignOutButton } from './simulators/SimulatedSignOutButton';
export { PreviewModeBanner } from './simulators/PreviewModeBanner';
export { AuthStatus } from './simulators/AuthStatus';
export { withAuthSimulation } from './simulators/ProtectedRoute';

// Main AuthSimulator component for backwards compatibility
const AuthSimulator = () => {
  return (
    <div className="preview-mode-banner">
      This is a preview mode. Real authentication is disabled.
    </div>
  );
};

export default AuthSimulator;
