import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import api from "../../services/api";

export default function AllUsers({ embedded = false }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    username: "",
    email: "",
    role: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/admin/users");
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/api/admin/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditFormData({
      username: user.username,
      email: user.email,
      role: user.role || 0,
    });
    setEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/api/admin/users/${selectedUser.id}`, {
        user: editFormData,
      });
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id ? { ...u, ...editFormData } : u
        )
      );
      setEditDialogOpen(false);
      setSelectedUser(null);
    } catch (err) {
      alert("Failed to update user");
    }
  };

  if (loading)
    return (
      <Box sx={{ bgcolor: "var(--darkgray)", minHeight: "100vh", p: 4 }}>
        <Typography sx={{ color: "var(--text)", mt: 4 }}>
          Loading users...
        </Typography>
      </Box>
    );

  if (error)
    return (
      <Box sx={{ bgcolor: "var(--darkgray)", minHeight: "100vh", p: 4 }}>
        <Typography sx={{ color: "var(--red)", mt: 4 }}>{error}</Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        bgcolor: embedded ? "transparent" : "var(--darkgray)",
        minHeight: embedded ? "auto" : "100vh",
        p: 4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 2 }}>
        {!embedded && (
          <Button
            variant="contained"
            sx={{
              bgcolor: "var(--red)",
              color: "#fff",
              fontWeight: 700,
              borderRadius: 2,
              px: 2.5,
              py: 1,
              "&:hover": { bgcolor: "var(--hover)" },
            }}
            onClick={() => navigate("/modifire_web/admin")}
          >
            ← Back to Admin
          </Button>
        )}
        <Typography
          variant="h4"
          sx={{ color: "var(--primary)", fontWeight: 700 }}
        >
          All Users ({users.length})
        </Typography>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ bgcolor: "var(--blackish)", borderRadius: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "var(--primary)", fontWeight: 700 }}>
                ID
              </TableCell>
              <TableCell sx={{ color: "var(--primary)", fontWeight: 700 }}>
                Username
              </TableCell>
              <TableCell sx={{ color: "var(--primary)", fontWeight: 700 }}>
                Email
              </TableCell>
              <TableCell sx={{ color: "var(--primary)", fontWeight: 700 }}>
                Role
              </TableCell>
              <TableCell sx={{ color: "var(--primary)", fontWeight: 700 }}>
                Builds
              </TableCell>
              <TableCell sx={{ color: "var(--primary)", fontWeight: 700 }}>
                Created At
              </TableCell>
              <TableCell sx={{ color: "var(--primary)", fontWeight: 700 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} sx={{ color: "var(--gray)" }}>
                  No users found.
                </TableCell>
              </TableRow>
            )}
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                }}
              >
                <TableCell sx={{ color: "var(--text)" }}>{user.id}</TableCell>
                <TableCell sx={{ color: "var(--text)" }}>
                  {user.username}
                </TableCell>
                <TableCell sx={{ color: "var(--text)" }}>
                  {user.email}
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.role || "user"}
                    size="small"
                    sx={{
                      bgcolor:
                        user.role === "admin" ? "var(--red)" : "var(--gray)",
                      color: "#fff",
                      fontWeight: 700,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: "var(--text)" }}>
                  {user.builds_count || 0}
                </TableCell>
                <TableCell sx={{ color: "var(--text)" }}>
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: "var(--red)",
                        color: "#fff",
                        fontWeight: 700,
                        "&:hover": { bgcolor: "var(--hover)" },
                      }}
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        color: "var(--red)",
                        borderColor: "var(--red)",
                        fontWeight: 700,
                        "&:hover": {
                          bgcolor: "#2a2a2a",
                          borderColor: "var(--hover)",
                        },
                      }}
                      onClick={() => {
                        setSelectedUser(user);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "var(--darkgray)",
            color: "var(--text)",
          },
        }}
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete user "{selectedUser?.username}"?
            This will also delete all their builds.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{ color: "var(--gray)" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(selectedUser?.id)}
            sx={{ color: "var(--red)", fontWeight: 700 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "var(--darkgray)",
            color: "var(--text)",
          },
        }}
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label="Username"
              value={editFormData.username}
              onChange={(e) =>
                setEditFormData({ ...editFormData, username: e.target.value })
              }
              fullWidth
              sx={{
                input: { color: "var(--text)" },
                label: { color: "var(--primary)" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--text)",
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "var(--red)" },
                  "&.Mui-focused fieldset": { borderColor: "var(--red)" },
                },
              }}
            />
            <TextField
              label="Email"
              value={editFormData.email}
              onChange={(e) =>
                setEditFormData({ ...editFormData, email: e.target.value })
              }
              fullWidth
              sx={{
                input: { color: "var(--text)" },
                label: { color: "var(--primary)" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--text)",
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "var(--red)" },
                  "&.Mui-focused fieldset": { borderColor: "var(--red)" },
                },
              }}
            />
            <FormControl fullWidth>
              <InputLabel sx={{ color: "var(--primary)" }}>Role</InputLabel>
              <Select
                value={editFormData.role}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, role: e.target.value })
                }
                label="Role"
                sx={{
                  color: "var(--text)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--text)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--red)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--red)",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "var(--blackish)",
                      color: "var(--text)",
                    },
                  },
                }}
              >
                <MenuItem value={0}>User</MenuItem>
                <MenuItem value={1}>Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEditDialogOpen(false)}
            sx={{ color: "var(--gray)" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            sx={{
              bgcolor: "var(--red)",
              color: "#fff",
              fontWeight: 700,
              "&:hover": { bgcolor: "var(--hover)" },
            }}
            variant="contained"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
