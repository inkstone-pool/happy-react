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
        const isTextNode = typeof child == 'string' || typeof child == 'number'
        return isTextNode ? ceateTextNode(child as string) : child
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
export { createElement, ceateTextNode }
