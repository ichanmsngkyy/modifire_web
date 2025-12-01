import {
  Box,
  Button,
  Drawer,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useDrop } from "react-dnd";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAttachments } from "../services/attachmentService";
import { Rnd } from "react-rnd";

function GunCustomizer() {
  const location = useLocation();
  const navigate = useNavigate();
  const gun = location.state?.gun;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [customizedAttachments, setCustomizedAttachments] = useState([]);
  const [hoveredOverlayId, setHoveredOverlayId] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [saving, setSaving] = useState(false);
  // Fetch all attachments for drawer
  useEffect(() => {
    getAttachments()
      .then(setAttachments)
      .catch(() => setAttachments([]));
  }, []);

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
        background: "var(--darkgray)",
        border: "none",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: 24,
          top: 24,
          display: "flex",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/modifire_web/gunlist")}
          sx={{
            bgcolor: "var(--red)",
            color: "#fff",
            fontWeight: 700,
            borderRadius: 2,
            px: 2.5,
            py: 1,
            boxShadow: "0 2px 8px #0006",
            "&:hover": { bgcolor: "var(--hover)" },
          }}
        >
          ← Back to Gun List
        </Button>
        <Button
          variant="contained"
          onClick={() => setDrawerOpen(true)}
          sx={{
            bgcolor: "var(--red)",
            color: "#fff",
            fontWeight: 700,
            borderRadius: 2,
            px: 2.5,
            py: 1,
            boxShadow: "0 2px 8px #0006",
            "&:hover": { bgcolor: "var(--hover)" },
          }}
        >
          Show Attachments
        </Button>
      </Box>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "var(--blackish)",
            color: "var(--text)",
            width: 340,
            p: 2,
            height: "100vh",
            maxHeight: "100vh",
            top: 0,
          },
        }}
      >
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search attachments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mb: 2, bgcolor: "var(--darkgray)", borderRadius: 1 }}
            InputProps={{
              style: { color: "var(--text)" },
              startAdornment: (
                <InputAdornment position="start">
                  <span role="img" aria-label="search">
                    🔍
                  </span>
                </InputAdornment>
              ),
            }}
          />
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "var(--text)" }}>
              Filter by Type
            </InputLabel>
            <Select
              value={filter}
              label="Filter by Type"
              onChange={(e) => setFilter(e.target.value)}
              sx={{ bgcolor: "var(--darkgray)", color: "var(--text)" }}
              MenuProps={{
                PaperProps: {
                  sx: { bgcolor: "var(--blackish)", color: "var(--text)" },
                },
              }}
            >
              <MenuItem value="">All</MenuItem>
              {[...new Set(attachments.map((a) => a.attachment_type))]
                .filter(Boolean)
                .map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ overflowY: "auto", maxHeight: "calc(100vh - 120px)" }}>
          {attachments
            .filter(
              (a) =>
                (!filter || a.attachment_type === filter) &&
                a.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((att) => (
              <Box
                key={att.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                  p: 1,
                  borderRadius: 1,
                  bgcolor: "var(--darkgray)",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  "&:hover": { bgcolor: "var(--hover)" },
                }}
                onClick={() => handleAddAttachment(att)}
              >
                <img
                  src={att.base_image_url}
                  alt={att.name}
                  style={{
                    width: 48,
                    height: 48,
                    objectFit: "contain",
                    borderRadius: 4,
                  }}
                />
                <Box>
                  <div style={{ fontWeight: 700 }}>{att.name}</div>
                  <div style={{ fontSize: 12, color: "var(--gray)" }}>
                    {att.attachment_type
                      ? att.attachment_type.charAt(0).toUpperCase() +
                        att.attachment_type.slice(1)
                      : ""}
                  </div>
                </Box>
              </Box>
            ))}
        </Box>
      </Drawer>
      {gun ? (
        <>
          <Box
            ref={drop}
            sx={{
              position: "relative",
              width: 650,
              height: 480,
              border:
                isOver && canDrop
                  ? "2px solid var(--red)"
                  : "2px solid transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#222325",
              boxShadow: "0 2px 16px #0008",
              borderRadius: 3,
            }}
          >
            <img
              src={imagePath}
              alt={gun.name || "Gun image"}
              style={{
                maxWidth: "90%",
                maxHeight: "90%",
                width: "auto",
                height: "auto",
                display: "block",
                margin: "0 auto",
                borderRadius: 3,
                // boxShadow removed for cleaner look
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
                      borderRadius: 2,
                      // boxShadow removed for cleaner overlay
                    }}
                    draggable={false}
                  />
                </div>
              </Rnd>
            ))}
            {/* Save Build Button - fixed to lower right of screen */}
            <Button
              variant="contained"
              sx={{
                position: "fixed",
                bottom: 32,
                right: 48,
                bgcolor: "var(--red)",
                color: "#fff",
                fontWeight: 700,
                borderRadius: 2,
                px: 3,
                py: 1.2,
                boxShadow: "0 2px 8px #0006",
                zIndex: 1301, // above drawer
                "&:hover": { bgcolor: "var(--hover)" },
              }}
              disabled={saving}
              onClick={async () => {
                setSaving(true);
                try {
                  // Compose build data in the format expected by backend
                  const build = {
                    build: {
                      name: gun.name ? `${gun.name} Build` : "My Build",
                      user_id: 1, // TODO: Replace with actual user id from auth context
                      gun_id: gun.id,
                      attachment_ids: customizedAttachments.map((a) =>
                        parseInt(a.base_id || a.id)
                      ),
                    },
                  };
                  await fetch("/api/builds", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(build),
                  });
                  alert("Build saved!");
                } catch (e) {
                  alert("Failed to save build");
                } finally {
                  setSaving(false);
                }
              }}
            >
              {saving ? "Saving..." : "Save Build"}
            </Button>
          </Box>
          <div
            style={{
              marginTop: "1em",
              fontSize: "1.5em",
              color: "var(--primary)",
              fontWeight: 700,
            }}
          >
            {gun.name}
          </div>
        </>
      ) : (
        <div>No gun selected.</div>
      )}
    </Box>
  );
}

export default GunCustomizer;
