import React, { ReactElement, useState } from 'react'

export function multiStepTitle(titles:String[]) {
    
  const [curStepIndex, setCurStepIndex] = useState(0);

  function nextTitle()
  {
    setCurStepIndex(i => {
      if(i >= titles.length - 1) return i
      return i+1;
    })
  }

  function backTitle()
  {
    setCurStepIndex(i => {
      if(i <= 0) return i
      return i-1;
    })
  }

  function goToTitle(index: number)
  {
    setCurStepIndex(index)
  }

  return {
    curStepIndex,
    title: titles[curStepIndex],
    titles,
    isFirstTitle: curStepIndex === 0,
    isLastTitle: curStepIndex === 1,
    goToTitle,
    nextTitle,
    backTitle
  }
}
