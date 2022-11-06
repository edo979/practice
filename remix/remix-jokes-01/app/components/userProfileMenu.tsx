type UserProfileMenuProps = {
  id: string
  username: string
}

export default function UserProfileMenu({
  id,
  username,
}: UserProfileMenuProps) {
  return (
    <div className="hstack">
      <p>{username}</p>
      <p>{id}</p>
    </div>
  )
}
