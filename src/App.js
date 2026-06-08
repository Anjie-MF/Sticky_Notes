import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true,
      },
    ],
    searchText: "",
  };

  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true,
    };
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
  };

  onType = (editMeId, updatedKey, updatedValue) => {
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedKey === "title") {
          return { ...note, title: updatedValue }
        } else {
          return { ...note, description: updatedValue }
        }
      }
    });
    this.setState({ notes: updatedNotes });
  };

  onSearch = (text) => {
    const newSearchText = text.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      if (!newSearchText) {
        return { ...note, doesMatchSearch: true };
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        const hasMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    this.setState({
      searchText: newSearchText,
      notes: updatedNotes,
    });
  };

  removeNote = (noteId) => {
    const notIdMatch = (note) => note.id !== noteId;
    const updatedNotes = this.state.notes.filter(notIdMatch);
    this.setState({ notes: updatedNotes });
  };

  componentDidUpdate() {
    const stringifedNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", stringifedNotes);
  }

  componentDidMount() {
    const stringifedNotes = localStorage.getItem("savedNotes");
    if (stringifedNotes) {
      const savedNotes = JSON.parse(stringifedNotes);
      this.setState({ notes: savedNotes });
    }
  }

  render() {
    return (
      <div>
        <Header
          onSearch={this.onSearch}
          addNote={this.addNote}
          searchText={this.state.searchText}
        />
        <NotesList
          removeNote={this.removeNote}
          onType={this.onType}
          notes={this.state.notes}
        />
      </div>
    );
  }
}

export default App;
