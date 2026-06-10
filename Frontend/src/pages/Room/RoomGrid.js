import { Bed, Pencil, Trash2, Users, CheckCircle, XCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

// ── Single Room Card ──────────────────────────────────────────
const RoomCard = ({ room, onEdit, onDelete }) => {
  const { id, roomNo, capacity, status } = room;
  const isAvailable = status?.toLowerCase() === "available";
  const { theme } = useTheme();

  const navigate = useNavigate();
  const handleNavigation = ()=>{
    try {
      navigate(`/room-profile/${id}`);
    } catch (error) {
      console.error("Error: ", error);
    }
  }
  return (
    <div className="room-card">
      {/* Status badge */}
      <span
        className={`status-badge ${isAvailable ? "badge-available" : "badge-occupied"}`}
        onClick={handleNavigation}
      >
        {isAvailable ? (
          <>
            <CheckCircle size={11} /> Available
          </>
        ) : (
          <>
            <XCircle size={11} /> Occupied
          </>
        )}
      </span>

      {/* Room icon + number */}
      <div className="room-icon-wrap" onClick={handleNavigation}>
        <Bed size={32} strokeWidth={1.4} />
      </div>
      <div className="room-number" onClick={handleNavigation}>Room {roomNo}</div>

      {/* Info row */}
      <div className="room-info" onClick={handleNavigation}>
        <div className="info-chip">
          <Users size={13} />
          <span>Capacity: {capacity}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="room-actions">
        <button
          className="action-btn btn-edit"
           onClick={() => onEdit(room)}
          title="Edit"
        >
          <Pencil size={14} />
          <span>Edit</span>
        </button>
        {/* <button
          className="action-btn btn-delete"
          onClick={() => onDelete?.(room)}
          title="Delete"
        >
          <Trash2 size={14} />
          <span>Delete</span>
        </button> */}
      </div>

      <style>{`
        .room-card {
          font-family: 'DM Sans', sans-serif;
          position: relative;
          background: ${theme.cardBg};
          border: 1.5px solid ${theme.border};
          border-radius: 16px;
          padding: 24px 20px 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          text-align: center;
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
          box-shadow: ${theme.cardShadow};
        }
        .room-card:hover {
          transform: translateY(-3px);
          border-color: ${theme.inputFocus};
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }

        /* Status badge */
        .status-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 500;
          padding: 3px 9px;
          border-radius: 20px;
          letter-spacing: 0.01em;
        }
        .badge-available {
          background: ${theme.badgeSuccess}20;
          color: ${theme.success};
        }
        .badge-occupied {
          background: ${theme.badgeDanger}20;
          color: ${theme.danger};
        }

        /* Icon */
        .room-icon-wrap {
          width: 64px;
          height: 64px;
          background: ${theme.bgLight};
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${theme.btnPrimary};
          margin-bottom: 2px;
        }

        /* Room number */
        .room-number {
          font-size: 16px;
          font-weight: 600;
          color: ${theme.textPrimary};
          letter-spacing: -0.01em;
        }

        /* Info */
        .room-info {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .info-chip {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12.5px;
          color: ${theme.textSecondary};
          background: ${theme.bgLight};
          border-radius: 8px;
          padding: 4px 10px;
        }

        /* Actions */
        .room-actions {
          display: flex;
          gap: 8px;
          width: 100%;
          margin-top: 4px;
        }
        .action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 7px 0;
          border-radius: 9px;
          border: 1.5px solid;
          cursor: pointer;
          transition: background 0.15s, color 0.15s, transform 0.12s;
        }
        .action-btn:active { transform: scale(0.97); }

        .btn-edit {
          background: ${theme.cardBg};
          border-color: ${theme.btnPrimary};
          color: ${theme.btnPrimary};
        }
        .btn-edit:hover {
          background: ${theme.bgLight};
          border-color: ${theme.btnPrimaryHover};
        }

        .btn-delete {
          background: ${theme.cardBg};
          border-color: ${theme.btnDanger};
          color: ${theme.btnDanger};
        }
        .btn-delete:hover {
          background: ${theme.bgLight};
          border-color: ${theme.btnDangerHover};
        }
      `}</style>
    </div>
  );
};

// ── Room Grid ─────────────────────────────────────────
const RoomGrid = ({ rooms, onEdit, onDelete }) => (
  <div className="room-grid-root">
    <div className="room-grid">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>

    <style>{`
      .room-grid-root {
        padding: 24px;
      }
      .room-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 16px;
      }
    `}</style>
  </div>
);

export { RoomCard, RoomGrid };
export default RoomGrid;