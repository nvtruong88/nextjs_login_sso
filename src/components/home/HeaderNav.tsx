import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
    fullName: string | null | undefined;
  }

export default function HeaderNav({ fullName }: HeaderProps) {

  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isMessageOpen, setMessageOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    signOut({
      callbackUrl: `https://rmidp.vnptit.vn/connect/endsession?post_logout_redirect_uri=${encodeURIComponent("http://localhost:44348")}`
    });
  };
  
  return (
    <nav className="header-nav ms-auto">
    <ul className="d-flex align-items-center">
      {/* Notifications */}
      <li className="nav-item dropdown">
        <button
          className="nav-link nav-icon"
          onClick={() => setNotificationOpen(!isNotificationOpen)}
        >
          <i className="bi bi-bell"></i>
          <span className="badge bg-primary badge-number">4</span>
        </button>
        {isNotificationOpen && (
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
            <li className="dropdown-header">
              You have 4 new notifications
              <a href="#" className="badge rounded-pill bg-primary p-2 ms-2">View all</a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            {/* Notification Items */}
            <li className="notification-item">
              <i className="bi bi-exclamation-circle text-warning"></i>
              <div>
                <h4>Lorem Ipsum</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>30 min. ago</p>
              </div>
            </li>
          </ul>
        )}
      </li>

      {/* Messages */}
      <li className="nav-item dropdown">
        <button
          className="nav-link nav-icon"
          onClick={() => setMessageOpen(!isMessageOpen)}
        >
          <i className="bi bi-chat-left-text"></i>
          <span className="badge bg-success badge-number">3</span>
        </button>
        {isMessageOpen && (
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
            <li className="dropdown-header">
              You have 3 new messages
              <a href="#" className="badge rounded-pill bg-primary p-2 ms-2">View all</a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            {/* Message Items */}
            <li className="message-item">
              <a href="#">
                <img src="/assets/img/messages-1.jpg" alt="" className="rounded-circle" />
                <div>
                  <h4>Maria Hudson</h4>
                  <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                  <p>4 hrs. ago</p>
                </div>
              </a>
            </li>
          </ul>
        )}
      </li>

      {/* Profile */}
      <li className="nav-item dropdown">
        <button
          className="nav-link nav-profile d-flex align-items-center pe-0"
          onClick={() => setProfileOpen(!isProfileOpen)}
        >
          <img src="assets/img/my-profile-img.jpg" alt="Profile" className="rounded-circle" />
          <span className="d-none d-md-block dropdown-toggle ps-2">{fullName}</span>
        </button>
        {isProfileOpen && (
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile show" style={{position: "absolute", inset: "0px 0px auto auto", margin: "0px", transform: "translate3d(-16px, 38.4px, 0px)"}}>
            <li className="dropdown-header">
              <h6>{fullName}</h6>
              <span>Web Designer</span>
            </li>
            <li>
              <a className="dropdown-item d-flex align-items-center" href="/users-profile">
                <i className="bi bi-person"></i>
                <span>My Profile</span>
              </a>
            </li>
            <li>
              <a className="dropdown-item d-flex align-items-center" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right"></i>
                <span>Sign Out</span>
              </a>
            </li>
          </ul>
        )}
      </li>
    </ul>
  </nav>
  );
}
