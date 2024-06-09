import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface NoteCardProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{note.title}</Typography>
        <Typography variant="body1">{note.content}</Typography>
        <div style={{ marginTop: "25px" }}>
          <Typography variant="body2">
            Created at: {new Date(note.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="body2">
            Updated at: {new Date(note.updatedAt).toLocaleDateString()}
          </Typography>
        </div>
        <div>
          <IconButton onClick={onEdit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
