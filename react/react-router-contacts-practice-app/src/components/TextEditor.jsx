import { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { editorAPIkey } from '../../secret'

const TextEditor = ({ text, handleSaveContent }) => {
  const editorRef = useRef(null)

  const handleSave = () => {
    handleSaveContent(editorRef.current.getContent())
  }

  return (
    <>
      <Editor
        textareaName="notes"
        apiKey={editorAPIkey}
        initialValue={text}
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
          ],
          toolbar: 'undo redo | blocks | bold italic forecolor',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />

      <button className="btn btn-success" onClick={handleSave} type="button">
        Save
      </button>
    </>
  )
}

export default TextEditor
