"use client";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export default function Confirmation({ isOpen, onClose, onConfirm }: Props) {
    if (!isOpen) return null;

    return (
        <div className="confirm-overlay">
            <div className="confirm-box">
                <h2>Logout</h2>
                <p>Are you sure you want to logout?</p>

                <div className="confirm-actions">
                    <button className="btn cancel" onClick={onClose}>
                        No
                    </button>
                    <button className="btn confirm" onClick={onConfirm}>
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}