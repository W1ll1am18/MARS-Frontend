import { useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import SettingsIcon from '../assets/settings.svg?react';
import RocketIcon from '../assets/rocket.svg?react';
import BulbIcon from '../assets/bulb.svg?react';
import AnalyseIcon from '../assets/analyse.svg?react';
import AccountIcon from '../assets/account.svg?react';
import DownIcon from '../assets/arrowDown.svg?react'
import BackIcon from '../assets/back.svg?react'
import ModelIcon from '../assets/model.svg?react'
import GlossaryIcon from '../assets/glossary.svg?react'
import DevIcon from '../assets/dev.svg?react'

import './NavBar.css'
import { tickerLRUCache } from '../App';

const NavigationBar = () => {
  const navigate = useNavigate();
  const tickers: string[] = tickerLRUCache.getList()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const openMenu = (key: string) => {
    setOpenMenus(prev => (prev[key] ? prev : { ...prev, [key]: true }))
  }

  const toggleMenu = (key: string) => {
    setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <>
      <div className='nav-bar'>
        <div className='lists'>
          <div className='show-bar'>
            <svg><BackIcon /></svg>
          </div>
          <div className='nav-top'>
            <Link to="/" className="nav-title-link">
              <h1 className='nav-title'>MARS</h1>
            </Link>
            {/* <Link to="/profile"><NavItem propsIcon={<AccountIcon />} propsName={"Profile"}></NavItem></Link> */}
            <NavItem
              propsIcon={<RocketIcon />}
              propsName={"Discover"}
              propsDropIcon={<DownIcon />}
              isOpen={!!openMenus['discover']}
              onOpen={() => openMenu('discover')}
              onToggle={() => toggleMenu('discover')}
            >
              <DropdownItem propsName="Tickers" propsLink="/tickers" />
            </NavItem>
            <NavItem
              propsIcon={<AnalyseIcon />}
              propsName={"Analyse"}
              propsDropIcon={<DownIcon />}
              isOpen={!!openMenus['analyse']}
              onOpen={() => openMenu('analyse')}
              onToggle={() => toggleMenu('analyse')}
            >
              {tickers && tickers.length > 0 ? (
                tickers.map((ticker) => (
                  <DropdownItem propsName={ticker} propsLink={`/overview/${ticker}`}/>
                ))
              ) : (
                <li className="dropdown-empty">
                  <p>No recently visited tickers</p>
                  <p>Please choose some in the discovery tab</p>
                </li>
              )}
            </NavItem>
            <Link to="/recommendation"><NavItem propsIcon={<BulbIcon />} propsName={"Recommendation"}></NavItem></Link>

          </div>

          <div className='nav-bottom'>
            <Link to="/model"><NavItem propsIcon={<ModelIcon/>} propsName={"Model"} /></Link>
            <Link to="/glossary"><NavItem propsIcon={<GlossaryIcon />} propsName={"Glossary"} /></Link>
            <Link to="/dev"><NavItem propsIcon={<DevIcon />} propsName={"Developer Notes"} /></Link>
            {/* <Link to="/settings"><NavItem propsIcon={<SettingsIcon />} propsName={"Settings"} className="settings-item" /></Link> */}
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
  isOpen?: boolean
  onOpen?: () => void
  onToggle?: () => void
}

interface DropdownItemProps {
  propsName: string
  propsLink: string
}

function NavItem({ propsIcon, propsName, propsDropIcon, children, className, isOpen, onOpen, onToggle }: NavItemProps) {
  return (
    <div
      className={`nav-item ${isOpen ? 'open' : ''} ${className || ''}`}
      onMouseEnter={onOpen}
    >
      <div className='section' onClick={onToggle}>
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