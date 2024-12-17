import React, { useRef } from "react";
import { Editor, EditorState, RichUtils, Modifier } from "draft-js";

function EditorComponent({ editorState, setEditorState }) {
  const editor = useRef(null);

  const focusEditor = () => {
    editor.current.focus();
  };

  const handleBeforeInput = (chars, editorState) => {
    const selection = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();
    const block = currentContent.getBlockForKey(selection.getStartKey());
    const text = block.getText();
  
    if (chars === " " && text.startsWith("***")) {
      const newContent = Modifier.replaceText(
        currentContent,
        selection.merge({ anchorOffset: 0, focusOffset: 3 }),
        ""
      );
      const newState = EditorState.push(editorState, newContent, "remove-range");
      setEditorState(RichUtils.toggleInlineStyle(newState, "UNDERLINE"));
      return "handled";
    } else if (chars === " " && text.startsWith("**")) {
      const newContent = Modifier.replaceText(
        currentContent,
        selection.merge({ anchorOffset: 0, focusOffset: 2 }),
        ""
      );
      const newState = EditorState.push(editorState, newContent, "remove-range");
      setEditorState(RichUtils.toggleInlineStyle(newState, "REDLINE"));
      return "handled";
    } else if (chars === " " && text.startsWith("*")) {
      const newContent = Modifier.replaceText(
        currentContent,
        selection.merge({ anchorOffset: 0, focusOffset: 1 }),
        ""
      );
      const newState = EditorState.push(editorState, newContent, "remove-range");
      setEditorState(RichUtils.toggleInlineStyle(newState, "BOLD"));
      return "handled";
    } else if (chars === " " && text.startsWith("#")) {
      const newContent = Modifier.replaceText(
        currentContent,
        selection.merge({ anchorOffset: 0, focusOffset: 1 }),
        ""
      );
      const newState = EditorState.push(editorState, newContent, "remove-range");
      setEditorState(RichUtils.toggleBlockType(newState, "header-one"));
      return "handled";
    }
  
    return "not-handled";
  };
  

  const styleMap = {
    REDLINE: { color: "red" },
  };

  return (
    <div
      onClick={focusEditor}
      style={{ border: "1px solid #ddd", minHeight: "200px", padding: "10px", borderRadius: "5px" }}
    >
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={setEditorState}
        handleBeforeInput={handleBeforeInput}
        customStyleMap={styleMap}
        placeholder="Type #, *, **, *** followed by space..."
      />
    </div>
  );
}

export default EditorComponent;
