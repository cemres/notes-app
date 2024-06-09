import api from "./api";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchNotes = async (): Promise<Note[]> => {
  try {
    const response = await api.get<Note[]>("/notes/");
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const createNote = async (note: Partial<Note>): Promise<Note> => {
  try {
    const response = await api.post<Note>("/notes/", note);
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

export const updateNote = async (note: Note): Promise<void> => {
  try {
    await api.put(`/notes/${note.id}`, note);
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};

export const deleteNote = async (id: string): Promise<void> => {
  try {
    await api.delete(`/notes/${id}`);
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};
