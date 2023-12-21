import React, { ReactElement, useState } from 'react'

export function multiStepFormAI(stepsAI: ReactElement[]) {
    
  const [currentStepIndexAI, setCurrentStepIndexAI] = useState(0);

  function nextAI()
  {
    setCurrentStepIndexAI(i => {
      if(i >= stepsAI.length - 1) return i
      return i+1;
    })
  }

  function backAI()
  {
    setCurrentStepIndexAI(i => {
      if(i <= 0) return i
      return i-1;
    })
  }

  function goToAI(index: number)
  {
    setCurrentStepIndexAI(index)
  }

  return {
    currentStepIndexAI,
    stepAI: stepsAI[currentStepIndexAI],
    stepsAI,
    isLastStepAI: currentStepIndexAI === 0,
    goToAI,
    nextAI,
    backAI,
  }
}
