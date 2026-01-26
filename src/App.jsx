import { useState, useEffect, useMemo } from 'react';
import { useMembers, useWorkouts, useStats } from './hooks/useGym';
import { Modal } from './components/ui/Modal';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { members, loading: membersLoading, addMember, updateMember, deleteMember } = useMembers();
  const { workouts, loading: workoutsLoading, addWorkout, updateWorkout, deleteWorkout } = useWorkouts();
  const { stats, loading: statsLoading } = useStats();

  // Filtered members
  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      const matchesSearch =
        m.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [members, searchTerm, statusFilter]);

  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmitMember = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      phone: form.phone.value,
      membershipType: form.membershipType.value,
      status: form.status?.value || 'active',
      expiryDate: form.expiryDate.value,
      notes: form.notes.value
    };

    try {
      if (editingItem) {
        await updateMember(editingItem.id, data);
      } else {
        await addMember(data);
      }
      handleCloseModal();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmitWorkout = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      description: form.description.value,
      type: form.type.value,
      duration: parseInt(form.duration.value),
      capacity: parseInt(form.capacity.value),
      instructor: form.instructor.value,
      dayOfWeek: form.dayOfWeek.value,
      startTime: form.startTime.value,
      endTime: form.endTime.value
    };

    try {
      if (editingItem) {
        await updateWorkout(editingItem.id, data);
      } else {
        await addWorkout(data);
      }
      handleCloseModal();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteMember = async (id) => {
    if (confirm('Are you sure you want to delete this member?')) {
      await deleteMember(id);
    }
  };

  const handleDeleteWorkout = async (id) => {
    if (confirm('Are you sure you want to delete this workout?')) {
      await deleteWorkout(id);
    }
  };

  const getCapacityPercentage = () => {
    if (!stats) return 0;
    return Math.round((stats.currentOccupancy / stats.maxCapacity) * 100);
  };

  const getCapacityClass = () => {
    const pct = getCapacityPercentage();
    if (pct < 50) return 'low';
    if (pct < 80) return 'medium';
    return 'high';
  };

  const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-brand">
            <div className="header-logo">🏋️</div>
            <div>
              <h1 className="app-title">GymFlow</h1>
              <p className="app-subtitle">Gym Management System</p>
            </div>
          </div>

          <nav className="nav-tabs">
            <button
              className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button
              className={`nav-tab ${activeTab === 'members' ? 'active' : ''}`}
              onClick={() => setActiveTab('members')}
            >
              👥 Members
            </button>
            <button
              className={`nav-tab ${activeTab === 'workouts' ? 'active' : ''}`}
              onClick={() => setActiveTab('workouts')}
            >
              🏃 Workouts
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {activeTab === 'dashboard' && (
          <>
            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card blue">
                <div className="stat-icon">👥</div>
                <div className="stat-value">{stats?.totalMembers || 0}</div>
                <div className="stat-label">Total Members</div>
              </div>

              <div className="stat-card green">
                <div className="stat-icon">✅</div>
                <div className="stat-value">{stats?.activeMembers || 0}</div>
                <div className="stat-label">Active Members</div>
              </div>

              <div className="stat-card purple">
                <div className="stat-icon">📅</div>
                <div className="stat-value">{stats?.todayCheckIns || 0}</div>
                <div className="stat-label">Today's Check-ins</div>
              </div>

              <div className="stat-card orange">
                <div className="stat-icon">🏢</div>
                <div className="stat-value">{stats?.currentOccupancy || 0}</div>
                <div className="stat-label">Current Occupancy</div>
                <div className="capacity-bar">
                  <div className="capacity-bar-bg">
                    <div
                      className={`capacity-bar-fill ${getCapacityClass()}`}
                      style={{ width: `${getCapacityPercentage()}%` }}
                    />
                  </div>
                  <div className="capacity-text">
                    {getCapacityPercentage()}% of {stats?.maxCapacity || 0} capacity
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Schedule */}
            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>📅 Today's Schedule</h2>
            <div className="schedule-grid">
              {workouts.slice(0, 4).map(workout => (
                <div key={workout.id} className="workout-card">
                  <div className="workout-header">
                    <div>
                      <div className="workout-name">{workout.name}</div>
                      <div className="workout-day">{workout.dayOfWeek}</div>
                    </div>
                    <span className={`badge ${workout.type}`}>{workout.type}</span>
                  </div>
                  <div className="workout-time">
                    🕐 {workout.startTime} - {workout.endTime}
                  </div>
                  <div className="workout-instructor">
                    👤 {workout.instructor}
                  </div>
                  <div className="workout-footer">
                    <span className="workout-capacity">
                      {workout._count?.members || 0}/{workout.capacity} spots
                    </span>
                    <button className="btn btn-primary btn-sm">Book</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'members' && (
          <>
            {/* Toolbar */}
            <div className="toolbar">
              <div className="toolbar-left">
                <div className="search-box">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="filter-buttons">
                  <button
                    className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('all')}
                  >
                    All
                  </button>
                  <button
                    className={`filter-btn ${statusFilter === 'active' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('active')}
                  >
                    Active
                  </button>
                  <button
                    className={`filter-btn ${statusFilter === 'inactive' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('inactive')}
                  >
                    Inactive
                  </button>
                </div>
              </div>
              <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                ➕ Add Member
              </button>
            </div>

            {/* Members Table */}
            {membersLoading ? (
              <div className="loading">Loading members...</div>
            ) : filteredMembers.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👥</div>
                <div className="empty-title">No members found</div>
                <div className="empty-description">Add your first member to get started</div>
              </div>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Member</th>
                      <th>Membership</th>
                      <th>Status</th>
                      <th>Join Date</th>
                      <th>Visits</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map(member => (
                      <tr key={member.id}>
                        <td>
                          <div className="member-info">
                            <div className="member-avatar">
                              {member.firstName[0]}{member.lastName[0]}
                            </div>
                            <div>
                              <div className="member-name">{member.firstName} {member.lastName}</div>
                              <div className="member-email">{member.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${member.membershipType}`}>
                            {member.membershipType}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${member.status}`}>
                            {member.status}
                          </span>
                        </td>
                        <td>{new Date(member.joinDate).toLocaleDateString()}</td>
                        <td>{member._count?.attendance || 0}</td>
                        <td>
                          <div className="actions">
                            <button
                              className="btn-icon"
                              onClick={() => handleOpenModal(member)}
                              title="Edit"
                            >
                              ✏️
                            </button>
                            <button
                              className="btn-icon delete"
                              onClick={() => handleDeleteMember(member.id)}
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {activeTab === 'workouts' && (
          <>
            {/* Toolbar */}
            <div className="toolbar">
              <h2>🏃 Workout Schedule</h2>
              <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                ➕ Add Workout
              </button>
            </div>

            {/* Workouts Grid */}
            {workoutsLoading ? (
              <div className="loading">Loading workouts...</div>
            ) : workouts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🏃</div>
                <div className="empty-title">No workouts scheduled</div>
                <div className="empty-description">Create your first workout class</div>
              </div>
            ) : (
              <div className="schedule-grid">
                {workouts.map(workout => (
                  <div key={workout.id} className="workout-card">
                    <div className="workout-header">
                      <div>
                        <div className="workout-name">{workout.name}</div>
                        <div className="workout-day">{workout.dayOfWeek}</div>
                      </div>
                      <span className={`badge ${workout.type}`}>{workout.type}</span>
                    </div>
                    <div className="workout-time">
                      🕐 {workout.startTime} - {workout.endTime} ({workout.duration} min)
                    </div>
                    <div className="workout-instructor">
                      👤 {workout.instructor}
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                      {workout.description}
                    </p>
                    <div className="workout-footer">
                      <span className="workout-capacity">
                        Capacity: {workout.capacity}
                      </span>
                      <div className="workout-actions">
                        <button
                          className="btn-icon"
                          onClick={() => handleOpenModal(workout)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-icon delete"
                          onClick={() => handleDeleteWorkout(workout.id)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Member Modal */}
      <Modal
        isOpen={isModalOpen && activeTab === 'members'}
        title={editingItem ? '✏️ Edit Member' : '➕ Add Member'}
        onClose={handleCloseModal}
      >
        <form className="form" onSubmit={handleSubmitMember}>
          <div className="form-row">
            <div className="input-group">
              <label className="input-label">First Name *</label>
              <input
                className="input-field"
                name="firstName"
                defaultValue={editingItem?.firstName}
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">Last Name *</label>
              <input
                className="input-field"
                name="lastName"
                defaultValue={editingItem?.lastName}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Email *</label>
            <input
              className="input-field"
              type="email"
              name="email"
              defaultValue={editingItem?.email}
              required
            />
          </div>

          <div className="form-row">
            <div className="input-group">
              <label className="input-label">Phone</label>
              <input
                className="input-field"
                name="phone"
                defaultValue={editingItem?.phone}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Membership</label>
              <select
                className="select-field"
                name="membershipType"
                defaultValue={editingItem?.membershipType || 'basic'}
              >
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="vip">VIP</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label className="input-label">Status</label>
              <select
                className="select-field"
                name="status"
                defaultValue={editingItem?.status || 'active'}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Expiry Date</label>
              <input
                className="input-field"
                type="date"
                name="expiryDate"
                defaultValue={editingItem?.expiryDate?.split('T')[0]}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Notes</label>
            <textarea
              className="textarea-field"
              name="notes"
              defaultValue={editingItem?.notes}
              placeholder="Additional notes..."
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingItem ? 'Save Changes' : 'Add Member'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Workout Modal */}
      <Modal
        isOpen={isModalOpen && activeTab === 'workouts'}
        title={editingItem ? '✏️ Edit Workout' : '➕ Add Workout'}
        onClose={handleCloseModal}
      >
        <form className="form" onSubmit={handleSubmitWorkout}>
          <div className="input-group">
            <label className="input-label">Workout Name *</label>
            <input
              className="input-field"
              name="name"
              defaultValue={editingItem?.name}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Description</label>
            <textarea
              className="textarea-field"
              name="description"
              defaultValue={editingItem?.description}
              placeholder="Describe the workout..."
            />
          </div>

          <div className="form-row">
            <div className="input-group">
              <label className="input-label">Type</label>
              <select
                className="select-field"
                name="type"
                defaultValue={editingItem?.type || 'strength'}
              >
                <option value="strength">Strength</option>
                <option value="cardio">Cardio</option>
                <option value="flexibility">Flexibility</option>
                <option value="combat">Combat</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Day</label>
              <select
                className="select-field"
                name="dayOfWeek"
                defaultValue={editingItem?.dayOfWeek || 'monday'}
              >
                {DAYS.map(day => (
                  <option key={day} value={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label className="input-label">Start Time</label>
              <input
                className="input-field"
                type="time"
                name="startTime"
                defaultValue={editingItem?.startTime || '09:00'}
              />
            </div>
            <div className="input-group">
              <label className="input-label">End Time</label>
              <input
                className="input-field"
                type="time"
                name="endTime"
                defaultValue={editingItem?.endTime || '10:00'}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label className="input-label">Duration (min)</label>
              <input
                className="input-field"
                type="number"
                name="duration"
                defaultValue={editingItem?.duration || 60}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Capacity</label>
              <input
                className="input-field"
                type="number"
                name="capacity"
                defaultValue={editingItem?.capacity || 20}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Instructor</label>
            <input
              className="input-field"
              name="instructor"
              defaultValue={editingItem?.instructor}
              placeholder="Instructor name"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingItem ? 'Save Changes' : 'Add Workout'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2026 GymFlow | Professional Gym Management</p>
      </footer>
    </div>
  );
}

export default App;
