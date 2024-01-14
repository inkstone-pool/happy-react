let nextUnitOffiber: any = null
function wookloop(deadline: IdleDeadline) {
  let shouldYeild = false
  while (!shouldYeild && nextUnitOffiber) {
    if (deadline.timeRemaining() > 1) {
      nextUnitOffiber = performancefiber(nextUnitOffiber)
    } else {
      shouldYeild = true
    }
  }
  requestIdleCallback(wookloop)
}
function performancefiber(fiber: any) {
  if (!fiber.dom) {
    const node = (fiber.dom =
      fiber.type == 'TEXT_ELEMENT'
        ? document.createTextNode(fiber.nodeValue)
        : document.createElement(fiber.type))
    Object.entries(fiber.props || ({} as object)).forEach(([key, value]) => {
      if (key !== 'children') {
        node[key] = value
      }
    })
    fiber.parent.dom.append(node)
  }
  ;(fiber.props.children || []).reduce(
    (preChild: any, currentChild: any, index: number) => {
      const newFiber = {
        type: currentChild.type,
        props: currentChild.props,
        parent: fiber,
        sibling: null,
        child: null,
        dom: null,
      }
      if (index == 0) {
        fiber.child = newFiber
      } else {
        preChild.sibling = newFiber
      }
      preChild = newFiber
    },
    null
  )
  return fiber.child || fiber.subling || fiber.parent?.sibling
}
function render(vdom: any, container: Element) {
  nextUnitOffiber = {
    dom: container,
    props: {
      children: [vdom],
    },
  }
}
requestIdleCallback(wookloop)
export default render
