import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from "react-icons/ai";
import { Dropdown } from "../../node_modules/react-bootstrap/dist/react-bootstrap"
import { Link, Router, useHistory, withRouter } from 'react-router-dom';
import './Navbar.css';
import { IconContext } from 'react-icons';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import * as IoIcons from 'react-icons/io';
import { IoLogOut } from 'react-icons/io5';


function Navbar() {

  const SidebarItem = [
    {
      title: 'Dashboard',
      path: '/adminDashboard',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text'
    },
    {
      title: 'Invoice',
      path: '/invoice',
      icon: <IoIcons.IoIosPaper />,
      cName: 'nav-text'
    },
    {
      title: 'PatientUser',
      path: '/patient',
      icon: <IoIcons.IoMdPeople />,
      cName: 'nav-text'
    },
    {
      title: 'Order',
      path: '/order',
      icon: <FaIcons.FaCartPlus />,
      cName: 'nav-text'
    }
  ];

  const SidebarItem3 = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text'
    },
    {
      title: 'Invoice',
      path: '/invoice',
      icon: <IoIcons.IoIosPaper />,
      cName: 'nav-text'
    },
    {
      title: 'PatientUser',
      path: '/patient',
      icon: <IoIcons.IoMdPeople />,
      cName: 'nav-text'
    },
    {
      title: 'Order',
      path: '/order',
      icon: <FaIcons.FaCartPlus />,
      cName: 'nav-text'
    }
  ];

  const SidebarItem2 = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text'
    },
    {
      title: 'Order',
      path: '/order',
      icon: <FaIcons.FaCartPlus />,
      cName: 'nav-text'
    }
  ];

  const [sidebar, setSidebar] = useState(true);
  const [user, setuser] = useState([]);
  const [sideIteam, setSideIteam] = useState([]);
  const history = useHistory();
  const [designation, setDesignation] = useState('');

  const hideSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    let LogInInfo = localStorage.getItem('LogInInfo');
    const d = JSON.parse(LogInInfo)
    axios.post("http://localhost:5000/api/patientUser/searchPatient", d)
      .then(res => {
        //console.log(res.data);
        setuser(res.data);
        setDesignation(res.data.userType[0].designation);

        if (res.data.userType[0].name === 'Patient User') {
          setSideIteam(SidebarItem2);
        }
        else if(res.data.userType[0].name === 'Employee') {
          setSideIteam(SidebarItem3);
        }

        else if (res.data.userType[0].name === 'Super User') {
          setSideIteam(SidebarItem);
        }

        let d2 = JSON.stringify(res.data);
        localStorage.setItem('userInfo', d2);


      })
      .catch(err => {
        console.log(err)
      });


  }, []);



  const LogOut = () => {
    localStorage.clear()
    history.push('/')
  }


  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          {/* <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={hideSidebar} />
          </Link> */}
          <div style={{ position: "relative", right: "5rem" }}>
            <Dropdown >
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {user.patientName}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Change password</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Change phone</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Change profile pic</Dropdown.Item>
                <Dropdown.Item href="#/action-4"> <button className='btn btn-danger' onClick={() => LogOut()} >Log Out<AiIcons.AiOutlineLogout color="white" fontSize='2rem' /></button> </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items'>
            <li className='navbar-toggle'>
              {/* <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link> */}
            </li>
            <li >
              <Link to="#" className="userIcon">
                <FaIcons.FaUserCircle fontSize="5rem" />
              </Link>
            </li>
            <span>
              <p style={{ color: 'white' }}>{user.patientName}</p>
              <p style={{ color: 'white' }}>{designation}</p>
            </span>
            {sideIteam.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path} >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default withRouter(Navbar);