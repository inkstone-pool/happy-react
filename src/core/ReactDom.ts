import render  from "./wookloop"

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