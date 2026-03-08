import React from 'react'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { CSSTransition } from 'react-transition-group';
import SettingsIcon from '../assets/settings.svg?react';
import StockIcon from '../assets/stock.svg?react';
import RocketIcon from '../assets/rocket.svg?react';
import BulbIcon from '../assets/bulb.svg?react';
import AnalyseIcon from '../assets/analyse.svg?react';
import AccountIcon from '../assets/account.svg?react';
import DownIcon from '../assets/arrowDown.svg?react'
import BackIcon from '../assets/back.svg?react'
import './NavBar.css'

const NavigationBar = () => {
  return (
    <>
      <div className='nav-bar'>
        <div className='lists'>
          <div className='show-bar'>
            <svg><BackIcon/></svg>
          </div>
          <div className='nav-top'>
            <h1 className='nav-title'>MARS</h1>
              <NavItem propsIcon={<AccountIcon />} propsName={"Profile"}></NavItem>
              <NavItem propsIcon={<RocketIcon />} propsName={"Discover"} propsDropIcon={<DownIcon />}>
                <DropdownItem propsName="Tickers" propsLink="/" />
                <DropdownItem propsName="Overview" propsLink="/overview" />
                <DropdownItem propsName="Ticker Types" propsLink="/types" />
              </NavItem>
              <NavItem propsIcon={<AnalyseIcon />} propsName={"Analyse"} propsDropIcon={<DownIcon />}>
                <DropdownItem propsName="No tickers selected" propsLink="/" />
              </NavItem>
              <NavItem propsIcon={<BulbIcon />} propsName={"Recommendation"}></NavItem>
          </div>

          <div className='nav-bottom'>
            <NavItem propsIcon={<SettingsIcon />} propsName={"Settings"} className="settings-item" />
            <NavItem propsIcon={<BackIcon />} propsName={"Back"} className="back-item" />
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
      <a href={propsLink}>{propsName}</a>
    </li>
  )
}

export default NavigationBar