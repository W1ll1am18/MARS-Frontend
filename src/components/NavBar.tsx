import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import SettingsIcon from '../assets/settings.svg?react';
import RocketIcon from '../assets/rocket.svg?react';
import BulbIcon from '../assets/bulb.svg?react';
import AnalyseIcon from '../assets/analyse.svg?react';
import AccountIcon from '../assets/account.svg?react';
import DownIcon from '../assets/arrowDown.svg?react'
import BackIcon from '../assets/back.svg?react'
import './NavBar.css'

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='nav-bar'>
        <div className='lists'>
          <div className='show-bar'>
            <svg><BackIcon/></svg>
          </div>
          <div className='nav-top'>
            <h1 className='nav-title'>MARS</h1>
              <Link to="/profile"><NavItem propsIcon={<AccountIcon />} propsName={"Profile"}></NavItem></Link>
              <NavItem propsIcon={<RocketIcon />} propsName={"Discover"} propsDropIcon={<DownIcon />}>
                <DropdownItem propsName="Tickers" propsLink="/tickers" />
              </NavItem>
              <NavItem propsIcon={<AnalyseIcon />} propsName={"Analyse"} propsDropIcon={<DownIcon />}>
                <DropdownItem propsName="Overview" propsLink="/overview" />
              </NavItem>
              <Link to="/recommendation"><NavItem propsIcon={<BulbIcon />} propsName={"Recommendation"}></NavItem></Link>
          </div>

          <div className='nav-bottom'>
            <Link to="/settings"><NavItem propsIcon={<SettingsIcon />} propsName={"Settings"} className="settings-item" /></Link>
            <div onClick={() => navigate(-1)}>
              <NavItem propsIcon={<BackIcon />} propsName={"Back"} className="back-item" />
            </div>
          </div>
      </div>
    </div >
    </>
  )
}

interface NavItemProps {
  propsIcon: ReactNode
  propsName: string
  propsDropIcon?: ReactNode
  children?: ReactNode
  className?: string
}

interface DropdownItemProps {
  propsName: string
  propsLink: string
}

function NavItem({ propsIcon, propsName, propsDropIcon, children, className }: NavItemProps) {
  return (
    <div className={`nav-item ${className || ''}`}>
      <div className='section'>
        <span className='nav-icon'>{propsIcon}</span>
        <span className='nav-label'>{propsName}</span>
        {propsDropIcon && (
          <span className='nav-drop'>{propsDropIcon}</span>
        )}
      </div>
      {children && (<ul className='dropdown-list'>{children}</ul>)}
    </div>
  )
}

function DropdownItem({ propsName, propsLink }: DropdownItemProps) {
  return (
    <li className='dropdown-item'>
      <Link to={propsLink}>{propsName}</Link>
    </li>
  )
}

export default NavigationBar