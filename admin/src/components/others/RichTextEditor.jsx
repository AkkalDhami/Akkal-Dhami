import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../App.css";


const RichTextEditor = ({ value, onChange, placeholder }) => {
  const [content, setContent] = useState(value || "");
  const editorRef = useRef(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState("16px");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [alignment, setAlignment] = useState("left");

  useEffect(() => {
    setContent(value || "");
  }, [value]);

  const handleInput = (e) => {
    const newContent = e.target.innerHTML;
    setContent(newContent);
    if (onChange) {
      onChange(newContent);
    }
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    updateButtonStates();
  };

  const updateButtonStates = () => {
    setIsBold(document.queryCommandState("bold"));
    setIsItalic(document.queryCommandState("italic"));
    setIsUnderline(document.queryCommandState("underline"));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement("img");
      img.src = event.target.result;
      img.style.maxWidth = "100%";
      execCommand("insertHTML", img.outerHTML);
    };
    reader.readAsDataURL(file);
    e.target.value = ""; // Reset file input
  };

  const handleLink = () => {
    const url = prompt("Enter URL:", "https://");
    if (url) {
      execCommand("createLink", url);
    }
  };

  const clearFormatting = () => {
    execCommand("removeFormat");
    execCommand("unlink");
  };

  return (
    <div className="rich-text-editor">
      <div className="toolbar">
        <div className="toolbar-group">
          <select
            value={fontFamily}
            onChange={(e) => {
              setFontFamily(e.target.value);
              execCommand("fontName", e.target.value);
            }}
            className="toolbar-item">
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Verdana">Verdana</option>
          </select>

          <select
            value={fontSize}
            onChange={(e) => {
              setFontSize(e.target.value);
              execCommand("fontSize", e.target.value);
            }}
            className="toolbar-item">
            <option value="1">Small</option>
            <option value="3">Normal</option>
            <option value="5">Large</option>
            <option value="7">Huge</option>
          </select>
        </div>

        <div className="toolbar-group">
          <button
            className={`toolbar-item ${isBold ? "active" : ""}`}
            onClick={() => execCommand("bold")}
            title="Bold">
            <strong>B</strong>
          </button>

          <button
            className={`toolbar-item ${isItalic ? "active" : ""}`}
            onClick={() => execCommand("italic")}
            title="Italic">
            <em>I</em>
          </button>

          <button
            className={`toolbar-item ${isUnderline ? "active" : ""}`}
            onClick={() => execCommand("underline")}
            title="Underline">
            <u>U</u>
          </button>
        </div>

        <div className="toolbar-group">
          <button
            className="toolbar-item"
            onClick={() => execCommand("insertUnorderedList")}
            title="Bullet List">
            • List
          </button>

          <button
            className="toolbar-item"
            onClick={() => execCommand("insertOrderedList")}
            title="Numbered List">
            1. List
          </button>
        </div>

        <div className="toolbar-group">
          <button
            className={`toolbar-item ${alignment === "left" ? "active" : ""}`}
            onClick={() => {
              setAlignment("left");
              execCommand("justifyLeft");
            }}
            title="Align Left">
            ←
          </button>

          <button
            className={`toolbar-item ${alignment === "center" ? "active" : ""}`}
            onClick={() => {
              setAlignment("center");
              execCommand("justifyCenter");
            }}
            title="Align Center">
            ↔
          </button>

          <button
            className={`toolbar-item ${alignment === "right" ? "active" : ""}`}
            onClick={() => {
              setAlignment("right");
              execCommand("justifyRight");
            }}
            title="Align Right">
            →
          </button>
        </div>

        <div className="toolbar-group">
          <input
            type="color"
            value={textColor}
            onChange={(e) => {
              setTextColor(e.target.value);
              execCommand("foreColor", e.target.value);
            }}
            className="toolbar-item color-picker"
            title="Text Color"
          />

          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => {
              setBackgroundColor(e.target.value);
              execCommand("hiliteColor", e.target.value);
            }}
            className="toolbar-item color-picker"
            title="Background Color"
          />
        </div>

        <div className="toolbar-group">
          <button
            className="toolbar-item"
            onClick={handleLink}
            title="Insert Link">
            🔗
          </button>

          <label className="toolbar-item" title="Insert Image">
            📷
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </label>

          <button
            className="toolbar-item"
            onClick={clearFormatting}
            title="Clear Formatting">
            🧹
          </button>
        </div>
      </div>

      <div
        ref={editorRef}
        className="editor-content"
        contentEditable
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: content }}
        placeholder={placeholder || "Write something amazing..."}
      />
    </div>
  );
};

export default RichTextEditor;
