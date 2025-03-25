"use client";
import { useRouter } from "next/navigation";
import HeaderNav from "./HeaderNav";
import { signIn, signOut, useSession } from "next-auth/react";

interface HeaderProps {
  fullName: string | null | undefined;
}

export default function Header({ fullName }: HeaderProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleRegisterClick = () => {
    router.push("/register"); // Navigate to the registration page
  };
  
  const userName = session?.user?.name || fullName || null;
  
  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid position-relative d-flex align-items-center">
        <a href="index.html" className="logo d-flex align-items-center">
          <img src="assets/img/logo.png" className="img-fluid" alt="" />
          <h1 className="sitename">for Developers</h1>
        </a>
        <i className="bi bi-list toggle-sidebar-btn"></i>
        <nav id="h-navmenu" className="h-navmenu">
          <ul>
            <li>
              <a href="#hero" className="active">
                Home
              </a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#gallery">Gallery</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li className="dropdown">
              <a href="#">
                <span>Dropdown</span>{" "}
                <i className="bi bi-chevron-down toggle-dropdown"></i>
              </a>
              <ul>
                <li>
                  <a href="#">Dropdown 1</a>
                </li>
                <li className="dropdown">
                  <a href="#">
                    <span>Deep Dropdown</span>{" "}
                    <i className="bi bi-chevron-down toggle-dropdown"></i>
                  </a>
                  <ul>
                    <li>
                      <a href="#">Deep Dropdown 1</a>
                    </li>
                    <li>
                      <a href="#">Deep Dropdown 2</a>
                    </li>
                    <li>
                      <a href="#">Deep Dropdown 3</a>
                    </li>
                    <li>
                      <a href="#">Deep Dropdown 4</a>
                    </li>
                    <li>
                      <a href="#">Deep Dropdown 5</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">Dropdown 2</a>
                </li>
                <li>
                  <a href="#">Dropdown 3</a>
                </li>
                <li>
                  <a href="#">Dropdown 4</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <i className="h-mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>
        {userName ? (
          <HeaderNav fullName={userName} />
        ) : (
          // Render login/register buttons
          <div>
            <a className="btn-login" onClick={() => signIn("identityserver")}>
              Đăng nhập
            </a>
            <a className="btn-getstarted" onClick={handleRegisterClick}>
              Đăng ký
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
