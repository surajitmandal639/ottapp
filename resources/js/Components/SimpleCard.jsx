import React, { useState } from "react";
import Switch from "react-switch";

export const SimpleCard = ({
    title,
    onEdit,
    onRemove,
    onToggle,
    loading,
    isChecked,
    onSwitchChange,
    editIconClass = "fa fa-edit",
    removeIconClass = "fa fa-remove",
    switchColors = { onColor: "#4CAF50", offColor: "#ccc" },
}) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null; // Don't render the card if it's hidden

    return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-6">
            <div className="card m-b-20 p-3 lng_item_grid">
                {/* Close button */}
                <button
                    type="button"
                    className="close"
                    onClick={() => setIsVisible(false)} // Hide the card when clicked
                    aria-label="Close"
                    style={{ position: "absolute", top: "10px", right: "10px", zIndex: 10 }}
                >
                    <span aria-hidden="true">&times;</span>
                </button>

                <div className="card-body p-0">
                    <div className="item_latter">{title}</div>

                    <span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit();
                            }}
                            className="btn waves-effect waves-light btn-success m-r-5"
                            data-toggle="tooltip"
                            title="Edit"
                        >
                            <i className={editIconClass}></i>
                        </button>
                    </span>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove();
                        }}
                        disabled={loading}
                        className="btn waves-effect waves-light btn-danger"
                        data-toggle="tooltip"
                        title="Remove"
                    >
                        <i className={removeIconClass}></i>
                    </button>

                    <label className="switch-toggle ml-2 fl-right mt-1">
                        <Switch
                            onChange={(e) => {
                                e.stopPropagation();
                                onSwitchChange(e);
                            }}
                            checked={isChecked}
                            onColor={switchColors.onColor}
                            offColor={switchColors.offColor}
                            uncheckedIcon={false}
                            checkedIcon={false}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};
