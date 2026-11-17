import { useState } from "react";
import { Check } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "./ui";
export function Reflection({ activity, saved, onClose, onSave }) {
  const [text, setText] = useState(saved);
  const [error, setError] = useState("");
  return (
    <Modal title={activity.title} onClose={onClose}>
      <span className="eyebrow">{activity.time} · A MOMENT FOR YOURSELF</span>
      <p>{activity.prompt}</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (text.trim().length < 20) {
            setError(
              "Write at least 20 characters to capture a useful reflection.",
            );
            return;
          }
          onSave(text.trim());
        }}
      >
        <label className="field">
          My reflection
          <textarea
            rows={6}
            maxLength={2000}
            value={text}
            placeholder="Here’s what I noticed…"
            onChange={(event) => setText(event.target.value)}
          />
        </label>
        <div className="reflection-count">{text.length} / 2000</div>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" variant="coral wide">
          Save my reflection
          <Check size={18} />
        </Button>
      </form>
      <p className="fine-print">
        This reflection stays in this browser. You can edit it anytime.
      </p>
    </Modal>
  );
}
