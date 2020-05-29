import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo'
import Nav from '../Nav/Nav'

const Header: React.FC = () => (
	<header className="page-header">
    <Link to="/"><Logo /></Link>
    <Nav />
  </header>
)

export default Header
