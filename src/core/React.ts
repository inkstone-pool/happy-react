function render(el: any, container: Element) {
  console.log(el)
  const node =
    el.type == 'TEXT_ELEMENT'
      ? document.createTextNode(el.nodeValue)
      : document.createElement(el.type)
  Object.entries(el.props || ({} as object)).forEach(([key, value]) => {
    if (key !== 'children') {
      node[key] = value
    }
  })
  if (el.props.children) {
    el.props.children.forEach((child: any) => {
      render(child, node)
    })
  }
  container.append(node)
}
function creatElement(
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
export { render, creatElement, ceateTextNode }
