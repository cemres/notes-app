import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import NoteCard from "../components/NoteCard";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
  Note,
} from "../services/noteService";
import { useAuth } from "../context/AuthContext";

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editNote, setEditNote] = useState<Note | null>(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const { logout, user } = useAuth();

  useEffect(() => {
    fetchNotes().then((data) => setNotes(data));
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCreateNote = () => {
    const newNote = {
      id: "",
      title: noteTitle,
      content: noteContent,
      createdAt: "",
      updatedAt: "",
    };
    createNote(newNote).then((createdNote) => {
      setNotes([...notes, createdNote]);
      setShowCreateModal(false);
      setNoteTitle("");
      setNoteContent("");
    });
  };

  const handleEditNote = () => {
    if (editNote) {
      const updatedNote = {
        ...editNote,
        title: noteTitle,
        content: noteContent,
      };
      updateNote(updatedNote).then(() => {
        setNotes(
          notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
        );
        setEditNote(null);
        setNoteTitle("");
        setNoteContent("");
      });
    }
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(id).then(() => {
      setNotes(notes.filter((note) => note.id !== id));
    });
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ mr: 3 }}>
            {user?.username}'s notes
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              mr: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
              },
            }}
          />
          <Button
            style={{
              backgroundColor: "white",
              color: "gray",
              textTransform: "none",
            }}
            variant="contained"
            color="info"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box mt={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowCreateModal(true)}
        >
          + Add
        </Button>
      </Box>
      {filteredNotes.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 3 }}>
          No notes found.
        </Typography>
      ) : (
        <Grid container spacing={2} mt={2}>
          {filteredNotes.map((note) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={note.id}>
              <NoteCard
                note={note}
                onEdit={() => {
                  setEditNote(note);
                  setNoteTitle(note.title);
                  setNoteContent(note.content);
                }}
                onDelete={() => handleDeleteNote(note.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <Dialog open={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <DialogTitle>Create Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Content"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCreateModal(false)}>Cancel</Button>
          <Button
            onClick={handleCreateNote}
            color="primary"
            disabled={!noteTitle || !noteContent}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={!!editNote} onClose={() => setEditNote(null)}>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Content"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditNote(null)}>Cancel</Button>
          <Button onClick={handleEditNote} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default NotesPage;
