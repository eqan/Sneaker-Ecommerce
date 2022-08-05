import React from 'react'
import styles from '../styles/ExtraPages.module.css'


const styles2 = {
marginTop: "10 rem", width: "50%", height: "75%"
}

export default function About() {
  return (
    <>
        <div className={styles.container}>
          <img style={styles2} src="../src/images/profile.svg"></img>
        </div>
    </>
  )
}
