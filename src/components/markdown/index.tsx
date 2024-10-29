import MarkDownPreview from "react-markdown";
import ReMarkGFM from "remark-gfm";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("java", java);

export default function MarkDown({ children }: { children: string }) {
  const code = (props: any) => {
    const { children, className, node, ...rest } = props;
    const match = /language-(\w+)/.exec(className || "");

    return match ? (
      <SyntaxHighlighter
        {...rest}
        children={children}
        language={match[1]}
        style={vscDarkPlus}
      />
    ) : (
      <code {...rest} className={className}>
        {children}
      </code>
    );
  };

  return (
    <MarkDownPreview
      children={children}
      remarkPlugins={[ReMarkGFM]}
      // components={{ code }}
    ></MarkDownPreview>
  );
}
