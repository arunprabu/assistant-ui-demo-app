// import { MarkdownText } from '@/components/ui/assistant-ui/markdown-text';
import { Thread } from '@assistant-ui/react';
import React from 'react'
import { MyRuntimeProviderRsc } from '../MyRuntimeProviderRsc';


const RscPage = () => {
  return (
    <div>
      <h1>RSC</h1>
      <MyRuntimeProviderRsc>
        <Thread />
      </MyRuntimeProviderRsc>
    </div>
  );
}

export default RscPage;