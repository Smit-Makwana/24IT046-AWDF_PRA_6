import React, { useState, useEffect } from "react";
import { generateAiDescription } from "../api";

function EventForm({
  onSubmit,
  initialData = null,
  onCancel = null,
  isEditing = false,
}) {
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    location: "",
    category: "Technology",
    status: "Upcoming",
  });

  // AI Generation State (Practical 13)
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiNotice, setAiNotice] = useState(null);

  const handleGenerateAiDescription = async () => {
    if (!formData.title.trim()) {
      alert("Please enter an Event Title first so AI has context to generate a description.");
      return;
    }

    setIsAiLoading(true);
    setAiNotice(null);

    try {
      const result = await generateAiDescription(formData.title, formData.category);
      if (result && result.description) {
        setFormData((prev) => ({
          ...prev,
          description: result.description,
        }));

        if (result.fallback) {
          setAiNotice({
            isFallback: true,
            message: "⚠️ AI service offline/fallback: A template suggestion was provided. You can edit it freely.",
          });
        } else {
          setAiNotice({
            isFallback: false,
            message: `✨ AI description generated via ${result.source?.toUpperCase() || "AI"}! Editable suggestion applied.`,
          });
        }
      } else {
        setAiNotice({
          isFallback: true,
          message: result.message || "Could not generate description at this time.",
        });
      }
    } catch (err) {
      // Graceful frontend error degradation: application keeps working
      console.warn("AI generation request failed:", err);
      setAiNotice({
        isFallback: true,
        message: "⚠️ AI service currently unavailable. Please enter your description manually.",
      });
    } finally {
      setIsAiLoading(false);
    }
  };


  // Fill form when editing an event
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        eventDate: initialData.eventDate
          ? initialData.eventDate.split("T")[0]
          : "",
        location: initialData.location || "",
        category: initialData.category || "Technology",
        status: initialData.status || "Upcoming",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        eventDate: "",
        location: "",
        category: "Technology",
        status: "Upcoming",
      });
    }
  }, [initialData]);


  // Update form state
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Event title is required!");
      return;
    }

    onSubmit(formData);
  };


  return (
    <div className="form-card">
      <h3>
        {isEditing ? "✏️ Edit Event" : "➕ Create New Event"}
      </h3>

      <form onSubmit={handleSubmit}>

        {/* Event Title */}
        <div className="form-group">
          <label>Event Title *</label>

          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>


        {/* Description & AI Generator */}
        <div className="form-group">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <label style={{ margin: 0 }}>Description</label>
            <button
              type="button"
              className="btn btn-secondary"
              style={{
                fontSize: "0.82rem",
                padding: "4px 10px",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                cursor: isAiLoading ? "not-allowed" : "pointer",
                borderRadius: "4px"
              }}
              onClick={handleGenerateAiDescription}
              disabled={isAiLoading}
              title="Auto-generate an event description using AI"
            >
              {isAiLoading ? "⏳ Generating..." : "✨ Generate with AI"}
            </button>
          </div>

          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a description or click '✨ Generate with AI' above..."
            rows={4}
          />

          {/* AI Status / Fallback Notice */}
          {aiNotice && (
            <div style={{
              marginTop: "6px",
              padding: "6px 10px",
              fontSize: "0.82rem",
              borderRadius: "4px",
              background: aiNotice.isFallback ? "#fef3c7" : "#ecfdf5",
              color: aiNotice.isFallback ? "#92400e" : "#065f46",
              border: `1px solid ${aiNotice.isFallback ? "#fde68a" : "#a7f3d0"}`
            }}>
              {aiNotice.message}
            </div>
          )}

          {/* AI Responsible Usage Disclaimer (Supplementary Problem) */}
          <small style={{ display: "block", marginTop: "4px", color: "#6b7280", fontSize: "0.76rem" }}>
            ⚠️ <em>AI suggestions are editable drafts. Review and adapt content before saving.</em>
          </small>
        </div>


        <div className="form-row">

          {/* Event Date */}
          <div className="form-group">
            <label>Event Date *</label>

            <input
              type="date"
              name="eventDate"
              className="form-control"
              value={formData.eventDate}
              onChange={handleChange}
              required
            />
          </div>


          {/* Location */}
          <div className="form-group">
            <label>Location *</label>

            <input
              type="text"
              name="location"
              className="form-control"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>


        <div className="form-row">

          {/* Category */}
          <div className="form-group">
            <label>Category *</label>

            <select
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Technology">Technology</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
              <option value="Education">Education</option>
              <option value="Workshop">Workshop</option>
            </select>
          </div>


          {/* Status */}
          <div className="form-group">
            <label>Status</label>

            <select
              name="status"
              className="form-control"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>


        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Update Event" : "Create Event"}
          </button>

          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EventForm;
