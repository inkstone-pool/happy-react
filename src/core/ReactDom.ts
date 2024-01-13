import {render}  from "./React"

const ReactDom={
  createRoot(container:Element){
    return {
      render:(app:object)=>{
        render(app,container)
      }
    }
  } 
}
export default ReactDom