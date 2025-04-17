import React, { useState, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import csharp from 'highlight.js/lib/languages/csharp';
import cpp from 'highlight.js/lib/languages/cpp';
import php from 'highlight.js/lib/languages/php';
import ruby from 'highlight.js/lib/languages/ruby';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import sql from 'highlight.js/lib/languages/sql';
import xml from 'highlight.js/lib/languages/xml'; // for HTML
import css from 'highlight.js/lib/languages/css';

// Register the languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('java', java);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('php', php);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('go', go);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  placeholder?: string;
  minHeight?: string;
  maxHeight?: string;
  className?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'javascript',
  placeholder = 'Type your code here...',
  minHeight = '100px',
  maxHeight = '400px',
  className
}) => {
  const [highlighted, setHighlighted] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (value) {
      try {
        const highlighted = hljs.highlight(value, { language }).value;
        setHighlighted(highlighted);
      } catch (error) {
        console.error('Error highlighting code:', error);
        setHighlighted(value);
      }
    } else {
      setHighlighted('');
    }
  }, [value, language]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textareaRef.current!.selectionStart;
      const end = textareaRef.current!.selectionEnd;
      
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      
      // Set cursor position after the inserted tab
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + 2;
          textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  // Define basic styles for code highlighting
  const codeStyle = `
    .hljs-keyword { color: #569CD6; }
    .hljs-built_in { color: #4EC9B0; }
    .hljs-type { color: #4EC9B0; }
    .hljs-literal { color: #569CD6; }
    .hljs-number { color: #B5CEA8; }
    .hljs-regexp { color: #D16969; }
    .hljs-string { color: #CE9178; }
    .hljs-subst { color: #DCDCDC; }
    .hljs-symbol { color: #D4D4D4; }
    .hljs-class { color: #4EC9B0; }
    .hljs-function { color: #DCDCAA; }
    .hljs-title { color: #DCDCAA; }
    .hljs-params { color: #D4D4D4; }
    .hljs-comment { color: #6A9955; }
    .hljs-doctag { color: #608B4E; }
    .hljs-meta { color: #9B9B9B; }
    .hljs-section { color: #D4D4D4; }
    .hljs-tag { color: #569CD6; }
    .hljs-name { color: #569CD6; }
    .hljs-attr { color: #9CDCFE; }
    .hljs-attribute { color: #9CDCFE; }
    .hljs-variable { color: #9CDCFE; }
    .hljs-template-variable { color: #9CDCFE; }
    .hljs-selector-tag { color: #D7BA7D; }
    .hljs-selector-id { color: #D7BA7D; }
    .hljs-selector-class { color: #D7BA7D; }
    .hljs-selector-attr { color: #D7BA7D; }
    .hljs-selector-pseudo { color: #D7BA7D; }
    .hljs-addition { color: #6A9955; background-color: rgba(155, 185, 85, 0.2); }
    .hljs-deletion { color: #CE9178; background-color: rgba(255, 0, 0, 0.2); }
    .hljs-emphasis { font-style: italic; }
    .hljs-strong { font-weight: bold; }
  `;

  return (
    <div className={cn("relative font-mono rounded-md border", className)}>
      <style dangerouslySetInnerHTML={{ __html: codeStyle }} />
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="absolute inset-0 bg-transparent resize-none font-mono z-10 text-transparent caret-gray-800 dark:caret-white p-3"
        style={{ 
          minHeight, 
          maxHeight,
          caretColor: 'currentColor',
        }}
      />
      <pre 
        className="overflow-auto whitespace-pre-wrap break-words p-3 bg-[#1e1e1e] text-[#d4d4d4] dark:bg-[#1e1e1e] dark:text-[#d4d4d4]"
        style={{ minHeight, maxHeight }}
      >
        {highlighted ? (
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        ) : (
          <code className="text-gray-400">{placeholder}</code>
        )}
      </pre>
    </div>
  );
};

export default CodeEditor;
