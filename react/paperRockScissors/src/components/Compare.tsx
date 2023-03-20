import Button, { ButtonT } from './Button'

type ComparePropsT = {
  userPick: ButtonT
  housePick?: ButtonT
}

export default function Compare({ userPick, housePick }: ComparePropsT) {
  return (
    <div className="relative w-72 mx-auto mt-8">
      <div className="absolute left-0 top-0">
        <Button buttonType={userPick} />
      </div>

      {housePick && (
        <div className="absolute right-0 top-0">
          <Button buttonType={housePick} />
        </div>
      )}
    </div>
  )
}
