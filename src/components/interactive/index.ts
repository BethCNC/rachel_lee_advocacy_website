import React from 'react';
import { createRoot } from 'react-dom/client';
import { ConditionPathfinder } from './ConditionPathfinder';

// Initialize all Condition Pathfinder instances
document.addEventListener('DOMContentLoaded', () => {
    const pathfinderElements = document.querySelectorAll('.rlee-condition-pathfinder');
    
    pathfinderElements.forEach(element => {
        const title = element.getAttribute('data-title') || '';
        const initialQuestion = element.getAttribute('data-initial-question') || '';
        const mountPoint = element.querySelector('.pathfinder-root');
        
        if (mountPoint) {
            const root = createRoot(mountPoint);
            root.render(
                <React.StrictMode>
                    <ConditionPathfinder
                        title={title}
                        initialQuestion={initialQuestion}
                    />
                </React.StrictMode>
            );
        }
    });
}); 