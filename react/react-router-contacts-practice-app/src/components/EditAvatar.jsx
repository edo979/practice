import { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

export const EditAvatar = ({ img }) => {
  const [scale, setScale] = useState(1)
  const editor = useRef(null)

  const onClickSave = async () => {}

  return (
    <>
      <AvatarEditor
        ref={editor}
        image={img}
        width={200}
        height={200}
        border={50}
        color={[255, 255, 255, 0.6]} // RGBA
        scale={scale}
        rotate={0}
      />

      <div>
        <label htmlFor="customRange1" className="form-label">
          Edit image
        </label>
        <input
          type="range"
          className="form-range"
          id="customRange1"
          min="1"
          max="2"
          step="0.05"
          onChange={(e) => setScale(parseFloat(e.target.value))}
          value={scale}
        />
      </div>
    </>
  )
}
