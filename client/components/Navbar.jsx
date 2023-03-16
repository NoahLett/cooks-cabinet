import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {

  const [click, setClick] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const handleHover = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  return (
    <div />
  );
}
