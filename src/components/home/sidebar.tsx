"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function SideBar() {
  const router = useRouter()
  const handleNavigation = (event: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định
    router.push(url); // Điều hướng Next.js
  };

  return (
    <aside id="sidebar" className="sidebar light-background d-flex flex-column">
          <i className="sidebar-toggle d-xl-none bi bi-list"></i>
      
          <div className="profile-img">
            <img src="assets/img/my-profile-img.jpg" alt="" className="img-fluid rounded-circle"/>
          </div>
      
          <a href="index.html" className="logo d-flex align-items-center justify-content-center">
            <h1 className="sitename">Alex Smith</h1>
          </a>
      
          <div className="social-links text-center">
            <a href="#" className="twitter"><i className="bi bi-twitter-x"></i></a>
            <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
            <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
            <a href="#" className="google-plus"><i className="bi bi-skype"></i></a>
            <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
          </div>
      
          <nav id="navmenu" className="navmenu">
            <ul className="list-menus">
              <li><a href="#hero" className="active"><i className="bi bi-house navicon"></i>Home</a></li>
              <li> <Link href="/signature">
          <i className="bi bi-person navicon"></i> Ký số
        </Link></li>
              <li><Link href="/document">
          <i className="bi bi-file-earmark-text navicon"></i> Tài liệu
        </Link></li>
              <li><a href="#portfolio"><i className="bi bi-images navicon"></i> Portfolio</a></li>
              <li><a href="#services"><i className="bi bi-hdd-stack navicon"></i> Services</a></li>
              <li className="dropdown"><a href="#"><i className="bi bi-menu-button navicon"></i> <span>Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                <ul className="dropdown-active">
                  <li><a href="#">Dropdown 1</a></li>
                  <li className="dropdown"><a href="#"><span>Deep Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                    <ul>
                      <li><a href="#">Deep Dropdown 1</a></li>
                      <li><a href="#">Deep Dropdown 2</a></li>
                      <li><a href="#">Deep Dropdown 3</a></li>
                      <li><a href="#">Deep Dropdown 4</a></li>
                      <li><a href="#">Deep Dropdown 5</a></li>
                    </ul>
                  </li>
                  <li><a href="#">Dropdown 2</a></li>
                  <li><a href="#">Dropdown 3</a></li>
                  <li><a href="#">Dropdown 4</a></li>
                </ul>
              </li>
              <li><a href="#contact"><i className="bi bi-envelope navicon"></i> Contact</a></li>
            </ul>
          </nav>
      
        </aside>
  );
}
