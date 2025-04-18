import React from 'react';
import { Button } from '@/components/ui/button';
import { BookmarkIcon, ClipboardIcon, ThumbsUp } from 'lucide-react';
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

interface CodeDisplayProps {
  code: string;
  language?: string;
  explanation?: string;
  onBookmark?: () => void;
  onCopy?: () => void;
  onLike?: () => void;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({
  code,
  language = 'javascript',
  explanation,
  onBookmark,
  onCopy,
  onLike
}) => {
  const highlightedCode = React.useMemo(() => {
    try {
      return hljs.highlight(code, { language }).value;
    } catch (error) {
      console.error('Error highlighting code:', error);
      return code;
    }
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    onCopy?.();
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
    <div className="w-full">
      <style dangerouslySetInnerHTML={{ __html: codeStyle }} />
      {explanation && (
        <p className="text-sm mb-3">{explanation}</p>
      )}
      <div className="code-font text-sm p-3 rounded-md overflow-auto mb-3" style={{ backgroundColor: 'var(--cb-surface-200)', color: 'var(--cb-text-high)' }}>
        <pre>
          <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </pre>
      </div>
      
      <div className="mt-3 flex space-x-2">
        {onBookmark && (
          <Button variant="outline" size="sm" className="text-xs flex items-center gap-1" onClick={onBookmark}>
            <BookmarkIcon size={14} /> Bookmark
          </Button>
        )}
        <Button variant="outline" size="sm" className="text-xs flex items-center gap-1" onClick={handleCopy}>
          <ClipboardIcon size={14} /> Copy code
        </Button>
        {onLike && (
          <Button variant="outline" size="sm" className="text-xs flex items-center gap-1" onClick={onLike}>
            <ThumbsUp size={14} /> Helpful
          </Button>
        )}
      </div>
    </div>
  );
};

export default CodeDisplay;
