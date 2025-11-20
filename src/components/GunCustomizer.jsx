import { Box, Button, Drawer } from "@mui/material";
import { useDrop } from "react-dnd";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Attachment from "./Attachment";
import { Rnd } from "react-rnd";

function GunCustomizer() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [customizedAttachments, setCustomizedAttachments] = useState([]);
  const [hoveredOverlayId, setHoveredOverlayId] = useState(null);

  // Handler to add attachment from drawer
  const handleAddAttachment = (attachment) => {
    setCustomizedAttachments((prev) => [
      ...prev,
      {
        ...attachment,
        id: attachment.id + "-" + Date.now(),
        x: 150,
        y: 100,
        width: 80,
        height: 80,
      },
    ]);
  };

  // Handler to update position/size of an overlay
  const handleUpdateOverlay = (id, data) => {
    setCustomizedAttachments((prev) =>
      prev.map((att) => (att.id === id ? { ...att, ...data } : att))
    );
  };
  const gun = location.state?.gun;

  // Drop target setup
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "ATTACHMENT",
    drop: (item, monitor) => {
      setCustomizedAttachments((prev) => [
        ...prev,
        {
          ...item,
          id: item.id + "-" + Date.now(),
          x: 150,
          y: 100,
          width: 80,
          height: 80,
        },
      ]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  const base_image_url = gun?.base_image_url;

  const imagePath =
    typeof base_image_url === "string" && base_image_url.trim() !== ""
      ? base_image_url.startsWith("http")
        ? base_image_url
        : `http://localhost:3000${base_image_url}`
      : "http://localhost:3000/images/guns/placeholder.png";

  // Debug: log gun and imagePath
  console.log("gun:", gun);
  console.log("imagePath:", imagePath);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        border: "none",
      }}
    >
      <Button
        variant="contained"
        onClick={() => setDrawerOpen(true)}
        sx={{ position: "absolute", left: 24, top: 24 }}
      >
        Show Attachments
      </Button>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Attachment onAttachmentClick={handleAddAttachment} />
      </Drawer>
      {gun ? (
        <>
          <Box
            ref={drop}
            sx={{
              position: "relative",
              width: 400,
              height: 300,
              border:
                isOver && canDrop
                  ? "2px solid #1976d2"
                  : "2px solid transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
            }}
          >
            <img
              src={imagePath}
              alt={gun.name || "Gun image"}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
                display: "block",
                margin: "0 auto",
              }}
            />
            {/* Render added attachments as movable/resizable overlays */}
            {customizedAttachments.map((att) => (
              <Rnd
                key={att.id}
                size={{ width: att.width, height: att.height }}
                position={{ x: att.x, y: att.y }}
                bounds="parent"
                onDragStop={(e, d) =>
                  handleUpdateOverlay(att.id, { x: d.x, y: d.y })
                }
                onResizeStop={(e, direction, ref, delta, position) =>
                  handleUpdateOverlay(att.id, {
                    width: parseInt(ref.style.width, 10),
                    height: parseInt(ref.style.height, 10),
                    ...position,
                  })
                }
                style={{ zIndex: 2 }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                  onMouseEnter={() => setHoveredOverlayId(att.id)}
                  onMouseLeave={() => setHoveredOverlayId(null)}
                >
                  <button
                    onClick={() =>
                      setCustomizedAttachments((prev) =>
                        prev.filter((a) => a.id !== att.id)
                      )
                    }
                    style={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      zIndex: 3,
                      background: "rgba(255,255,255,0.8)",
                      border: "none",
                      borderRadius: "50%",
                      width: 24,
                      height: 24,
                      cursor: "pointer",
                      fontWeight: "bold",
                      color: "#d32f2f",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                      padding: 0,
                      lineHeight: 1,
                      opacity: hoveredOverlayId === att.id ? 1 : 0,
                      pointerEvents:
                        hoveredOverlayId === att.id ? "auto" : "none",
                      transition: "opacity 0.2s",
                    }}
                    title="Remove attachment"
                  >
                    ×
                  </button>
                  <img
                    src={att.base_image_url}
                    alt={att.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "block",
                      pointerEvents: "auto",
                      userSelect: "none",
                    }}
                    draggable={false}
                  />
                </div>
              </Rnd>
            ))}
          </Box>
          <div style={{ marginTop: "1em", fontSize: "1.5em" }}>{gun.name}</div>
        </>
      ) : (
        <div>No gun selected.</div>
      )}
    </Box>
  );
}

export default GunCustomizer;
