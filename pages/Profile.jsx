import React from 'react'
import styles from '../styles/ExtraPages.module.css'


const styles2 = {
marginTop: "5 rem", width: "35%", height: "35%"
}

export default function About() {
  return (
    <>
        <img style={{...styles.img, ...styles2}} src="../src/images/profile.svg"></img>
    </>
  )
}
