// UI UPDATE: Shows users where they are without changing the registration flow.
function PROGRESSSTEPS({ currentStep }) {
    const steps = ['Consent', 'Registration', 'Confirmation'];

    return (
        <nav className="registration-progress" aria-label="Registration progress">
            {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = currentStep === stepNumber;
                const isComplete = currentStep > stepNumber;

                return (
                    <div
                        className={`progress-step ${isActive ? 'is-active' : ''} ${isComplete ? 'is-complete' : ''}`}
                        aria-current={isActive ? 'step' : undefined}
                        key={step}
                    >
                        <span className="progress-step-number" aria-hidden="true">
                            {isComplete ? '✓' : stepNumber}
                        </span>
                        <span className="progress-step-label">{step}</span>
                    </div>
                );
            })}
        </nav>
    );
}

export default PROGRESSSTEPS;
