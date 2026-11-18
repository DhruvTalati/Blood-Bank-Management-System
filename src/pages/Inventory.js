import React, { useEffect, useState } from "react";
import API from "../api/api";
import { IconSearch } from "../components/BrandIcons";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const LOW_STOCK_LIMIT = 50;

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("bloodBankUser") || "{}");
  } catch (error) {
    return {};
  }
}

function Inventory() {
  const isAdmin = getCurrentUser().role === "Administrator";

  const [inventory, setInventory] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [amount, setAmount] = useState("");
  const [action, setAction] = useState("add");
  const [modalMessage, setModalMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    loadInventory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadInventory = async () => {
    try {
      setLoading(true);
      setPageError("");

      let response = await API.get("/inventory");

      let list = response.data.inventory || [];

      if (list.length === 0 && isAdmin) {
        response = await API.post("/inventory/initialize");
        list = response.data.inventory || [];
      }

      const map = {};

      list.forEach((item) => {
        map[item.bloodGroup] = item.units;
      });

      setInventory(map);
    } catch (error) {
      setPageError(
        error.response?.data?.message || "Unable to load inventory.",
      );
    } finally {
      setLoading(false);
    }
  };

  const openStockAction = (group, selectedAction) => {
    setSelectedGroup(group);
    setAction(selectedAction);
    setAmount("");
    setModalMessage("");
  };

  const handleStockUpdate = async (e) => {
    e.preventDefault();

    const quantity = Number(amount);

    if (!quantity || quantity <= 0) {
      setModalMessage("Please enter a valid quantity.");
      return;
    }

    const currentStock = inventory[selectedGroup] || 0;

    if (action === "remove" && quantity > currentStock) {
      setModalMessage(`Only ${currentStock} units are currently available.`);
      return;
    }

    const newUnits =
      action === "add" ? currentStock + quantity : currentStock - quantity;

    try {
      setSaving(true);

      const response = await API.put(`/inventory/${selectedGroup}`, {
        units: newUnits,
      });

      if (response.data.success) {
        setInventory((prev) => ({
          ...prev,
          [selectedGroup]: response.data.inventory.units,
        }));

        setModalMessage(
          action === "add"
            ? `${quantity} units added successfully.`
            : `${quantity} units removed successfully.`,
        );

        setTimeout(() => {
          setSelectedGroup(null);
          setModalMessage("");
        }, 1000);
      }
    } catch (error) {
      setModalMessage(
        error.response?.data?.message || "Unable to update inventory.",
      );
    } finally {
      setSaving(false);
    }
  };

  const filteredGroups = BLOOD_GROUPS.filter((group) =>
    group.toLowerCase().includes(search.toLowerCase()),
  );

  const totalUnits = BLOOD_GROUPS.reduce(
    (total, group) => total + Number(inventory[group] || 0),
    0,
  );

  const lowStockGroups = BLOOD_GROUPS.filter(
    (group) => Number(inventory[group] || 0) <= LOW_STOCK_LIMIT,
  );

  const highestStockGroup = BLOOD_GROUPS.reduce(
    (highest, group) =>
      Number(inventory[group] || 0) > Number(inventory[highest] || 0)
        ? group
        : highest,
    BLOOD_GROUPS[0],
  );

  return (
    <div className="inventory-page">
      {/* HEADER */}

      <div className="page-header">
        <div>
          <p className="page-kicker">Stock control</p>
          <h1>Blood inventory</h1>
          <p>Monitor available units and restock groups that need attention.</p>
        </div>
      </div>

      {pageError && <div className="request-message error">{pageError}</div>}

      {!isAdmin && (
        <div className="request-message">
          You're viewing inventory as Staff. Only an Administrator can add or
          remove stock.
        </div>
      )}

      {/* STATISTICS */}

      <div className="dashboard-cards inventory-stats">
        <div className="dashboard-card">
          <div className="card-icon card-icon-blood">U+</div>

          <div>
            <span>Total Blood Units</span>
            <h3>{totalUnits}</h3>
            <small>Currently available</small>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon card-icon-donors">08</div>

          <div>
            <span>Blood Groups</span>
            <h3>{BLOOD_GROUPS.length}</h3>
            <small>All groups tracked</small>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon card-icon-alert">LS</div>

          <div>
            <span>Low Stock</span>
            <h3>{lowStockGroups.length}</h3>
            <small>Need attention</small>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon card-icon-ok">HI</div>

          <div>
            <span>Highest Stock</span>
            <h3>{highestStockGroup}</h3>
            <small>{inventory[highestStockGroup] || 0} units</small>
          </div>
        </div>
      </div>

      {/* SEARCH */}

      <div className="donor-toolbar">
        <div className="search-box">
          <IconSearch />
          <input
            type="text"
            placeholder="Search blood group..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* INVENTORY CARDS */}

      {loading ? (
        <div className="dashboard-empty">
          <p>Loading inventory...</p>
        </div>
      ) : (
        <div className="inventory-grid">
          {filteredGroups.map((group) => {
            const units = Number(inventory[group] || 0);

            const isLowStock = units <= LOW_STOCK_LIMIT;

            const percentage = Math.min((units / 400) * 100, 100);

            return (
              <div
                className={`inventory-card ${isLowStock ? "low-stock-card" : ""}`}
                key={group}
              >
                <div className="inventory-card-header">
                  <div className="large-blood-group">{group}</div>

                  {isLowStock && (
                    <span className="low-stock-badge">Low Stock</span>
                  )}
                </div>

                <div className="inventory-units">
                  <strong>{units}</strong>
                  <span>units</span>
                </div>

                <div className="inventory-progress">
                  <div
                    className="inventory-progress-fill"
                    style={{
                      width: `${percentage}%`,
                    }}
                  ></div>
                </div>

                <div className="inventory-limit">
                  <span>Stock Level</span>
                  <span>Minimum: {LOW_STOCK_LIMIT}</span>
                </div>

                {isAdmin && (
                  <div className="inventory-actions">
                    <button
                      className="stock-add-btn"
                      onClick={() => openStockAction(group, "add")}
                    >
                      + Add Stock
                    </button>

                    <button
                      className="stock-remove-btn"
                      onClick={() => openStockAction(group, "remove")}
                    >
                      − Remove
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* LOW STOCK WARNING */}

      {lowStockGroups.length > 0 && (
        <div className="inventory-warning">
          <div className="warning-icon">!</div>

          <div>
            <strong>Low Stock Alert</strong>

            <p>
              The following blood groups have reached or fallen below the
              minimum stock level: {lowStockGroups.join(", ")}
            </p>
          </div>
        </div>
      )}

      {/* STOCK MODAL */}

      {selectedGroup && (
        <div className="modal-overlay">
          <div className="donor-modal stock-modal">
            <div className="modal-header">
              <h3>
                {action === "add" ? "Add Blood Stock" : "Remove Blood Stock"}
              </h3>

              <button
                className="modal-close"
                onClick={() => setSelectedGroup(null)}
              >
                ×
              </button>
            </div>

            <div className="stock-modal-group">
              <div className="large-blood-group">{selectedGroup}</div>

              <div>
                <strong>{inventory[selectedGroup] || 0} units</strong>

                <small>Current available stock</small>
              </div>
            </div>

            <form onSubmit={handleStockUpdate}>
              <div className="form-group">
                <label>Number of Units</label>

                <input
                  type="number"
                  min="1"
                  className="form-control"
                  placeholder="Enter quantity"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  autoFocus
                />
              </div>

              {modalMessage && (
                <div
                  className={
                    modalMessage.includes("successfully")
                      ? "stock-success"
                      : "stock-error"
                  }
                >
                  {modalMessage}
                </div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setSelectedGroup(null)}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-btn" disabled={saving}>
                  {saving
                    ? "Saving..."
                    : action === "add"
                      ? "Add Units"
                      : "Remove Units"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
