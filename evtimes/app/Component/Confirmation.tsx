"use client";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function Confirmation({ isOpen, onClose, onConfirm }: Props) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#fff",
          padding: "26px 24px",
          borderRadius: "18px",
          textAlign: "center",
          boxShadow: "0 25px 70px rgba(0,0,0,0.25)",
          animation: "popupFade 0.25s ease",
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 600,
            color: "#111827",
            marginBottom: "6px",
          }}
        >
          Logout
        </h2>

        {/* Text */}
        <p
          style={{
            fontSize: "14px",
            color: "#6b7280",
            marginBottom: "22px",
          }}
        >
          Are you sure you want to logout?
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              background: "#f3f4f6",
              color: "#374151",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              background: "linear-gradient(135deg,#ef4444,#dc2626)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 10px 20px rgba(239,68,68,0.25)",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes popupFade {
            from {
              opacity: 0;
              transform: translateY(10px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </div>
  );
}