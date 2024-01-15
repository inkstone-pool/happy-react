let nextUnitOffiber: any = null
let root: any = null
function wookloop(deadline: IdleDeadline) {
  let shouldYeild = false
  while (!shouldYeild && nextUnitOffiber) {
    nextUnitOffiber = performanceFiber(nextUnitOffiber)

    shouldYeild = deadline.timeRemaining() < 1
  }
  if (!nextUnitOffiber && root) {
    commitRoot()
  }
  requestIdleCallback(wookloop)
}
function commitRoot() {
  commitWork(root.child)
  root = null
}
function commitWork(fiber: any) {
  if (!fiber) return
  let parentFiber = fiber.parent
  while (!parentFiber.dom) {
    parentFiber = parentFiber.parent
  }
  if (fiber.dom) {
    parentFiber.dom.append(fiber.dom)
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}
function createDom(fiberNode: any) {
  return (fiberNode.dom =
    fiberNode.type == 'TEXT_ELEMENT'
      ? document.createTextNode(fiberNode.props.nodeValue)
      : document.createElement(fiberNode.type))
}
function updateProps(dom: Element, props: any) {
  Object.entries((props || {}) as Record<string, string>).forEach(
    ([key, value]) => {
      if (key !== 'children') {
        //@ts-ignores
        dom[key] = value
      }
    }
  )
}
function reconcileChildren(workInProgress: any, children: any[]) {
  let newChildren = Array.isArray(children) ? children : []
  let preChild: any = null
  newChildren.forEach((currentChild: any, index: number) => {
    const newFiber = {
      type: currentChild.type,
      props: currentChild.props,
      parent: workInProgress,
      sibling: null,
      child: null,
      dom: null,
    }
    if (index == 0) {
      workInProgress.child = newFiber
    } else {
      preChild.sibling = newFiber
    }
    preChild = newFiber
  })
}
function updateFunctionComponent(fiber: any) {
  const newChildren = [fiber.type(fiber.props)]
  reconcileChildren(fiber, newChildren)
}
function updateHostComponent(fiber: any) {
  const newChildren = fiber.props.children
  if (!fiber.dom) {
    const dom = createDom(fiber)
    updateProps(dom, fiber.props)
  }
  reconcileChildren(fiber, newChildren)
}
function performanceFiber(fiber: any) {
  let isFuncitonCompoent = typeof fiber.type == 'function'
  if (isFuncitonCompoent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }
  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling
    nextFiber = nextFiber.parent
  }
}
function render(vdom: any, container: Element) {
  root = nextUnitOffiber = {
    dom: container,
    props: {
      children: [vdom],
    },
    child: null,
  }
}
requestIdleCallback(wookloop)
export default render
