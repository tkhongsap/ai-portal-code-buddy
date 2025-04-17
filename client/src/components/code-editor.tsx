import React, { useState, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow-night-blue.css';

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

  return (
    <div className={cn("relative font-mono rounded-md border", className)}>
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
        className="overflow-auto whitespace-pre-wrap break-words p-3"
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
