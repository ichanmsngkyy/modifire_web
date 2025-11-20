import { useDrag } from "react-dnd";
import GunCard from "./GunCard";

export default function DraggableGunCard({ attachment }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ATTACHMENT",
    item: { id: attachment.id, ...attachment },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: "grab" }}>
      <GunCard
        name={attachment.name}
        base_image_url={attachment.base_image_url}
        category={attachment.attachment_type}
        description={attachment.description}
      />
    </div>
  );
}
