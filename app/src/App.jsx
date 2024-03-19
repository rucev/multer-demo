import { useState } from "react"
import FileUpload from "./components/FileUpload"
import ImageList from "./components/ImageLists"

const App = () => {
  const [forceRefresh, setForceRefresh] = useState(false);


  return (
    <>
      <FileUpload setForceRefresh={setForceRefresh} />
      <ImageList forceRefresh={forceRefresh} setForceRefresh={setForceRefresh} />
    </>
  )
}

export default App

