import React from 'react'
import styles from  '../public/Css/profileCss.module.css'
function profile() {
  return (<div className={styles.s}>
    <div className={styles.company_profile_tag}>
        <h1>Company Profile</h1>
    </div>
    <div className={styles.major_div1}>
        <div className={styles.comapany_detail_div}>
            <div className={styles.company_details_header}>
                <h2>Company Details </h2>
                <h2 className={styles.h2_edit_button}><button>Edit</button></h2>
            </div>
            <div className={styles.logo_div}>
                <img className={styles.company_logo} src="https://spindle.club/spindle_admin/images/logo.png" alt="Company Logo" />
            </div>
            <div className={styles.comapany_text_details}>
            <br></br>Company Name: Your Company Name
            <br></br>Industry: Industry
            <br></br>Registration Number: Reg. No
            <br></br>GST: Id
            <br></br>Founded Year: Year
            <br></br>Company Description:
            <br></br>Description Text</div>
        </div>

        <div className={styles.company_banner_div}>
          <div className={styles.banner_heading}>
          <h2>Company Banner</h2>
          </div>
          <div className={styles.company_banner}>
          <img className={styles.company_logo} src="https://spindle.club/spindle_admin/images/banner.png" alt="Company Logo" />
          </div>
        </div>        
    </div>
</div>

  )
}

export default profile