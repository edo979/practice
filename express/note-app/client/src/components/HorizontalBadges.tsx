import { Tag } from '../routes/Home'

type HorizontalBadgesProps = {
  items: Tag[]
  align?: string
  gap?: string
}

export default function HorizontalBadges({
  items,
  align = 'center',
  gap = '1',
}: HorizontalBadgesProps) {
  return (
    <div className={`hstack justify-content-${align} gap-${gap} flex-wrap`}>
      {items.map((item) => (
        <i key={item._id} className="badge text-bg-primary">
          {item.label}
        </i>
      ))}
    </div>
  )
}
