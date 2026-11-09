import Styles from "../styles/header.module.css"

export default function Header(){
    return(
        <header>
            <div className={Styles.nanikore}>
                <h1>AI口コミサイト</h1>
            </div>
        </header>
    )
}