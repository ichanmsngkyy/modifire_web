import { Box, List } from "@mui/material";
import { useEffect, useState } from "react";
import { getAttachments } from "../services/attachmentService";
import DraggableGunCard from "./DraggableGunCard";

export default function Attachment({ onAttachmentClick }) {
  const [attachment, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getAttachments()
      .then((data) => {
        setAttachments(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load attachments.");
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ width: 350, p: 2 }}>
      {loading && <div>Loading attachments...</div>}
      {error && <div>{error}</div>}
      <List>
        {attachment.map((att) => (
          <div
            key={att.id || att.name}
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (typeof onAttachmentClick === "function")
                onAttachmentClick(att);
            }}
          >
            <DraggableGunCard attachment={att} />
          </div>
        ))}
      </List>
    </Box>
  );
}
