import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Main documentation sidebar - manually ordered
  docsSidebar: [
    'intro',
    'intro-ko',
    {
      type: 'category',
      label: 'Tutorials',
      link: {
        type: 'doc',
        id: 'tutorials/intro',
      },
      items: [{type: 'autogenerated', dirName: 'tutorials'}],
    },
    {
      type: 'category',
      label: 'How-to Guides',
      link: {
        type: 'doc',
        id: 'how-to/intro',
      },
      items: [{type: 'autogenerated', dirName: 'how-to'}],
    },
    {
      type: 'category',
      label: 'Reference',
      link: {
        type: 'doc',
        id: 'reference/intro',
      },
      items: [{type: 'autogenerated', dirName: 'reference'}],
    },
    {
      type: 'category',
      label: 'Explanation',
      link: {
        type: 'doc',
        id: 'explanation/intro',
      },
      items: [{type: 'autogenerated', dirName: 'explanation'}],
    },
  ],
};

export default sidebars;
