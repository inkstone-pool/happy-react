/// <reference types="vite/client" />
declare namespace JSX {
  interface IntrinsicElements {
    // 这里可以添加你自定义的 HTML 元素的类型声明
    // 例如：
    "div": React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  }
}