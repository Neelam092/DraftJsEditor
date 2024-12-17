import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import EditorComponent from "./components/EditorComponent";

function App() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const savedContent = localStorage.getItem("draftContent");
    if (savedContent) {
      const contentState = convertFromRaw(JSON.parse(savedContent));
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, []);

  const saveContent = () => {
    const content = editorState.getCurrentContent();
    localStorage.setItem("draftContent", JSON.stringify(convertToRaw(content)));
    alert("Content Saved!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Draft.js Custom Editor</h2>
      <button onClick={saveContent}>Save</button>
      <EditorComponent editorState={editorState} setEditorState={setEditorState} />
    </div>
  );
}

export default App;
