let nextUnitOfFiber: any = null
let workInProgress: any = null
//嵌套函数组件的下一个组件
let workInProgressNextSiblingFiber: any = null
let deletions: any[] = []
let workInProgressFuncFiber: any = null
function wookloop(deadline: IdleDeadline) {
  let shouldYeild = false
  while (!shouldYeild && nextUnitOfFiber) {
    nextUnitOfFiber = performanceFiber(nextUnitOfFiber)
    if (workInProgressNextSiblingFiber?.type === nextUnitOfFiber?.type) {
      nextUnitOfFiber = null
    }
    shouldYeild = deadline.timeRemaining() < 1
  }
  if (!nextUnitOfFiber && workInProgress) {
    commitRoot()
  }
  requestIdleCallback(wookloop)
}
function commitRoot() {
  deletions.forEach((fiber) => {
    commitDeletion(fiber)
  })
  deletions = []
  commitWork(workInProgress.child)

  workInProgress = null
}
function commitWork(fiber: any) {
  if (!fiber) return
  let parentDomFiber = findParentDomFiber(fiber)
  if (fiber.dom) {
    if (fiber.effectTag == 'update') {
      updateProps(fiber.dom, fiber.props, fiber.alternat?.props)
    } else if (fiber.effectTag == 'placement') {
      parentDomFiber.dom.append(fiber.dom)
    }
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function findParentDomFiber(fiber: any) {
  let parentFiber = fiber.parent
  while (!parentFiber.dom) {
    parentFiber = parentFiber.parent
  }
  return parentFiber
}
function findNextSiblingFiber(fiber: any) {
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling
    nextFiber = nextFiber.parent
  }
}
function commitDeletion(fiber: any) {
  if (fiber.dom) {
    let parentDomFiber = findParentDomFiber(fiber)

    parentDomFiber.dom.removeChild(fiber.dom)
  } else {
    commitDeletion(fiber.child)
  }
}
function createDom(fiberNode: any) {
  return (fiberNode.dom =
    fiberNode.type == 'TEXT_ELEMENT'
      ? document.createTextNode(fiberNode.props.nodeValue)
      : document.createElement(fiberNode.type))
}
function updateProps(dom: Element, nextProps: any, prevProps: any = {}) {
  Object.entries(prevProps).forEach(([key]) => {
    if (key !== 'children') {
      if (!(key in nextProps)) {
        dom.removeAttribute(key)
      }
    }
  })

  Object.entries((nextProps || {}) as Record<string, any>).forEach(
    ([key, value]) => {
      if (key !== 'children') {
        if (key.startsWith('on')) {
          const enevtType = key.slice(2).toLocaleLowerCase()
          dom.removeEventListener(enevtType, prevProps[key])
          dom.addEventListener(enevtType, value)
        } else {
          //@ts-ignores
          dom[key] = value
        }
      }
    }
  )
}
function reconcileChildren(fiber: any, children: any[]) {
  let newChildren = Array.isArray(children) ? children : []
  let oldFiber = fiber.alternat?.child

  newChildren.reduce((prevChild: any, currentChild: any, index: number) => {
    let newFiber = null
    const isSameType = oldFiber && oldFiber.type == currentChild.type
    if (isSameType) {
      newFiber = {
        type: currentChild.type,
        props: currentChild.props,
        parent: fiber,
        sibling: null,
        child: null,
        effectTag: 'update',
        dom: oldFiber.dom,
        alternat: oldFiber,
      }
    } else {
      if (currentChild) {
        newFiber = {
          type: currentChild.type,
          props: currentChild.props,
          parent: fiber,
          sibling: null,
          child: null,
          dom: null,
          effectTag: 'placement',
        }
      }
      if (oldFiber) {
        deletions.push(oldFiber)
      }
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }
    if (index == 0) {
      fiber.child = newFiber
    } else {
      prevChild.sibling = newFiber
    }
    return newFiber || prevChild
  }, null)
  //循环删除多余的旧兄弟
  while (oldFiber) {
    deletions.push(oldFiber.sibling)
    oldFiber = oldFiber.sibling
  }
}
function updateFunctionComponent(fiber: any) {
  workInProgressFuncFiber = fiber
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
  return findNextSiblingFiber(fiber)
}
function render(vdom: any, container: Element) {
  workInProgress = {
    dom: container,
    props: {
      children: [vdom],
    },
  }
  nextUnitOfFiber = workInProgress
}
export function update() {
  let currentFiber = workInProgressFuncFiber
  return () => {
    workInProgress = {
      ...currentFiber,
      alternat: currentFiber,
    }
    nextUnitOfFiber = workInProgress
    workInProgressNextSiblingFiber = findNextSiblingFiber(workInProgress)
  }
}
requestIdleCallback(wookloop)
export default render
