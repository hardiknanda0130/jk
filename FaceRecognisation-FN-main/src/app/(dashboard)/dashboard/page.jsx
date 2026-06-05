
import "@/styles/dashboard.css";

export default function Dashboard() {
  return (
    <div className="flex">
  

      <div className="flex-1">
     

        <div className="dashboard">
          <h2 className="dashboard-title">
            The Dashboard 
          </h2>

        <div className="dashboard-cards">
 <div className="dashboard-card pastel-1">
  <div className="card-header">
    <span className="card-title">Registered Users</span>
  </div>

  <div className="card-value">647</div>

  <div className="card-footer">
    <span className="card-more">
      More info →
    </span>
  </div>
</div>


  <div className="dashboard-card pastel-2">
    <div className="card-title">Active Users</div>
    <div className="card-value">541</div>
    <div className="card-subtext">Biometric entries</div>
  </div>

<div className="dashboard-card pastel-3">
  <div className="card-title">Recognitions Today</div>

  <div className="card-split">
    <div className="card-split-item">
      <span className="split-label">Present Today</span>
      <span className="split-value">64</span>
    </div>

    <div className="card-divider-vertical"></div>

    <div className="card-split-item">
      <span className="split-label">Out Today</span>
      <span className="split-value">0</span>
    </div>
  </div>

  <div className="card-footer">
    <span className="card-more">More info →</span>
  </div>
</div>a


  <div className="dashboard-card pastel-4">
  <div className="card-title">Total Registered Devices</div>

  <div className="card-value">133</div>

  <div className="card-device-split">
    <div className="device-item">
      <span className="device-label">Tablet</span>
      <span className="device-value">13</span>
    </div>

    <div className="card-divider-vertical"></div>

    <div className="device-item">
      <span className="device-label">Desktop</span>
      <span className="device-value">30</span>
    </div>
  </div>
</div>

</div>

{/* dashboard cards end */}

{/* ================= Attendance + Realtime Wrapper ================= */}
<div className="dashboard-graphs-row">

  {/* ===== LEFT : Attendance Statistics ===== */}
  <div className="graph-card">
    <div className="section-header">
      <h3>Attendance Statistics</h3>
    </div>

    <div className="attendance-top">
      {/* Area Graph */}
      <div className="area-graph">
        <svg viewBox="0 0 600 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <path
            d="M 40 160 L 120 60 L 200 65 L 280 45 L 360 55 L 440 110 L 520 160 L 520 180 L 40 180 Z"
            fill="url(#areaFill)"
          />

          <path
            d="M 40 160 L 120 60 L 200 65 L 280 45 L 360 55 L 440 110 L 520 160"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
          />
        </svg>

        <div className="graph-labels">
          <span>26 Jan</span>
          <span>27 Jan</span>
          <span>28 Jan</span>
          <span>29 Jan</span>
          <span>30 Jan</span>
          <span>31 Jan</span>
        </div>
      </div>

      {/* Side Stats */}
      <div className="attendance-side">
        <div className="progress-item">
          <span>Verified Users</span>
          <strong className="text-black">179/647</strong>
          <div className="progress-bar"><div style={{ width: "28%" }} /></div>
        </div>

        <div className="progress-item orange">
          <span>Biometric Terminals</span>
          <strong className="text-black">133 / 134</strong>
          <div className="progress-bar"><div style={{ width: "99%" }} /></div>
        </div>

        <div className="progress-item gray">
          <span>Desktop Device</span>
          <strong className="text-black">0 / 0</strong>
          <div className="progress-bar"><div style={{ width: "0%" }} /></div>
        </div>
      </div>
    </div>

    {/* Bottom Stats */}
    <div className="attendance-bottom">
      <div>
        <h2 className="text-emerald-600">0.50 <small>sec</small></h2>
        <p>Avg Response Time</p>
      </div>
      <div>
        <h2 className="blue">09:25</h2>
        <p>Avg In-Time</p>
      </div>
      <div>
        <h2 className="purple">21:08</h2>
        <p>Avg Out-Time</p>
      </div>
    </div>
  </div>

  {/* ===== RIGHT : Real Time Attendance ===== */}
  <div className="graph-card">
    <div className="section-header">
      <h3>Real Time Attendance Activity</h3>
    </div>

    <div className="realtime-card-inner">
      <svg viewBox="0 0 600 120" preserveAspectRatio="none">
        <path
          d="M 20 60 L 100 60 L 180 60 L 260 60 L 340 60 L 420 60 L 500 60"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="3"
          strokeDasharray="5 6"
        />
      </svg>

      <div className="realtime-inforealtime-info text-blue-900 font-medium tracking-wide">
        <span className="live-dot"></span>
        User Present in Office — <strong>64</strong>
      </div>

      <div className="realtime-time">15:10</div>
    </div>
  </div>



</div>



        </div>
      </div>
    </div>
  );
}
