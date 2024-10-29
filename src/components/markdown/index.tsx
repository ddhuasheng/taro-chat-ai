import MarkDownPreview from "react-markdown";
import ReMarkGFM from "remark-gfm";
import Prismjs from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/themes/prism-okaidia.css'

export default function MarkDown({ children }: { children: string }) {
  Prismjs.highlightAll();

  const code = (props: any) => {
    const { children, inline, className, node, ...rest } = props;
    const match = /language-(\w+)/.exec(className || "");

    if (!inline && match) {
      console.log(node)
      // node.textContent = children;
      // node.className = match[1];
      // if (node?.textContent) {
      //   Prismjs.highlightElement(node);
      // }

      return (
        <pre className={className}>
          <code className={className} {...rest}>
            {children}
          </code>
        </pre>
      );
    }
    return (
      <pre className={className}>
        <code className={className} {...rest}>
          {children}
        </code>
      </pre>
    );
  };

  return (
    <MarkDownPreview
      children={children}
      remarkPlugins={[ReMarkGFM]}
      components={{ code }}
    ></MarkDownPreview>
  );
}
