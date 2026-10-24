import { defineConfig } from 'astro/config';

// Emit the same markup as Hugo's Chroma highlighter (noClasses = true)
const chromaMarkup = {
  pre(node) {
    node.properties = {
      tabindex: '0',
      style: 'color:#586e75;background-color:#eee8d5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;'
    };
    return { type: 'element', tagName: 'div', properties: { className: ['highlight'] }, children: [node] };
  },
  code(node) {
    const lang = this.options.lang === 'plaintext' ? 'fallback' : this.options.lang;
    node.properties = { className: [`language-${lang}`], 'data-lang': lang };
    node.children = node.children.filter((child) => child.type !== 'text');
  },
  line(node) {
    // Chroma leaves untagged code as plain text inside each line
    const tokens = this.options.lang === 'plaintext'
      ? node.children.flatMap((token) => token.children)
      : node.children;
    node.properties = { style: 'display:flex;' };
    node.children = [{ type: 'element', tagName: 'span', properties: {}, children: [...tokens, { type: 'text', value: '\n' }] }];
  }
};

export default defineConfig({
  site: 'https://example.com',
  markdown: {
    shikiConfig: { theme: 'solarized-light', transformers: [chromaMarkup] }
  }
});
