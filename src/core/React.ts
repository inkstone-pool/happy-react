
function createElement(
  type: string,
  props: Record<string, any>,
  ...children: any[]
) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child == 'string' ? ceateTextNode(child) : child
      }),
    },
  }
}
function ceateTextNode(text: string) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
    },
    children: [],
  }
}
export {  createElement, ceateTextNode }
