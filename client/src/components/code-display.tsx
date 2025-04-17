import React from 'react';
import { Button } from '@/components/ui/button';
import { BookmarkIcon, ClipboardIcon, ThumbsUp } from 'lucide-react';
import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow-night-blue.css';

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

  return (
    <div className="w-full">
      {explanation && (
        <p className="text-sm mb-3">{explanation}</p>
      )}
      <div className="code-font text-sm bg-[#F7F7F7] dark:bg-[#2A2A2A] p-3 rounded-md overflow-auto mb-3">
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
