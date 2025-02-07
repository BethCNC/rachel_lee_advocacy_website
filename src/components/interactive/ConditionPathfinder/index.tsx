import React, { useState, useEffect } from 'react';
import { usePathfinderState } from './hooks/usePathfinderState';
import { PathfinderQuestion } from './components/PathfinderQuestion';
import { PathfinderResults } from './components/PathfinderResults';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import { ErrorBoundary } from '@components/common/ErrorBoundary';
import type { PathfinderProps, Question } from './types';

import './styles.scss';

export const ConditionPathfinder: React.FC<PathfinderProps> = ({
    title,
    initialQuestion,
}) => {
    const {
        currentQuestion,
        answers,
        isLoading,
        error,
        handleAnswer,
        resetPathfinder,
    } = usePathfinderState(initialQuestion);

    if (error) {
        return (
            <div className="pathfinder-error">
                <h2>Something went wrong</h2>
                <p>{error}</p>
                <button onClick={resetPathfinder}>Start Over</button>
            </div>
        );
    }

    return (
        <ErrorBoundary>
            <div className="condition-pathfinder">
                <h2 className="pathfinder-title">{title}</h2>
                
                {isLoading ? (
                    <LoadingSpinner />
                ) : currentQuestion ? (
                    <PathfinderQuestion
                        question={currentQuestion}
                        onAnswer={handleAnswer}
                    />
                ) : (
                    <PathfinderResults answers={answers} />
                )}
                
                {answers.length > 0 && (
                    <button 
                        className="pathfinder-reset"
                        onClick={resetPathfinder}
                    >
                        Start Over
                    </button>
                )}
            </div>
        </ErrorBoundary>
    );
}; 