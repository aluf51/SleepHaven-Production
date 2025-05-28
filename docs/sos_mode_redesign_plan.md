# SOS Mode Screen Redesign Plan

This document outlines the redesign of the SOS Mode screen based on user feedback and the provided reference image (IMG_8777.png).

## Overall Goal

To create an SOS screen that provides immediate, actionable help to parents in distress, guiding them through calming techniques and offering quick solutions for common sleep issues.

## Key Components and Functionality (based on IMG_8777.png)

1.  **Header Bar:**
    *   **Back Button:** (Left arrow icon) Allows the user to navigate away from the SOS mode.
    *   **Title:** "SOS Sleep Help" (Centrally aligned or prominent).

2.  **SOS Session Timer:**
    *   Displays the elapsed time in the current SOS session (e.g., "SOS Session 03:45").
    *   This suggests a session-based approach to the SOS mode.

3.  **Step Indicator:**
    *   Shows the current step in a multi-step process (e.g., "Current Step 1 of 5").
    *   Visual representation of steps (e.g., numbered circles, with the current step highlighted).

4.  **Main Content Area (Step-Specific):**
    *   **Step 1: Take a Deep Breath (Example from image)**
        *   **Instructional Text:** "First, let's help you find your calm. Take a moment to breathe with me before addressing baby's needs."
        *   **Interactive Breathing Guide:**
            *   Visual element (e.g., an animated circle labeled "Breathe with me").
            *   Text instructions for breathing exercise: "Inhale 4 seconds, hold 2 seconds, exhale 6 seconds. Continue for at least 30 seconds before moving on."
        *   **Action Button:** "Start Breathing" (Green button, likely initiates or guides the breathing animation/timer).

5.  **Quick Solutions for Common Issues Section:**
    *   **Section Title:** "Quick Solutions for Common Issues"
    *   **Issue Cards/Tabs:**
        *   **Overtired:** "Try an earlier bedtime tomorrow, even 30min can help"
        *   **Teething:** "Consider approp..." (text cut off, likely suggests teething remedies or comfort measures).
        *   These are likely tappable elements that expand to show more detailed advice or link to relevant resources within the app.

## Design and UX Considerations:

*   **Calm and Reassuring UI:** Use a color palette and typography that promote calmness (e.g., blues, greens, soft tones as seen in the image).
*   **Clear Visual Hierarchy:** Important information and calls to action should be prominent.
*   **Simplicity:** In a stressful SOS situation, the interface must be extremely easy to understand and use.
*   **Guided Experience:** The step-by-step process should feel supportive and not overwhelming.
*   **Interactive Elements:** The breathing guide should be interactive and engaging.
*   **Accessibility:** Ensure text is readable and interactive elements are easy to tap.

## Implementation Notes:

*   The `SOSMode.js` component will need to be significantly refactored.
*   State management will be required for the current step, timer, and potentially the state of the breathing exercise.
*   The breathing animation can be achieved using Framer Motion or CSS animations.
*   Content for each step of the SOS process and for the "Quick Solutions" will need to be defined.

## Next Steps for Prototyping/Planning:

1.  Define the content and flow for all 5 steps of the SOS mode.
2.  Detail the information to be displayed for each "Quick Solution" (Overtired, Teething, and potentially others).
3.  Create mockups or wireframes for the different states of the SOS screen (e.g., breathing exercise in progress, quick solution expanded).
4.  Consider how this integrates with the overall app theme and navigation.

This plan will be used to guide the implementation of the new SOS Mode screen in step `004` of the project plan.
