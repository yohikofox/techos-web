import styles from "./styles.module.scss"
import Avatar from "./parts/Avatar"
import ProfileMenu from "./parts/ProfileMenu"
import Wrapper from "./parts/Wrapper"
import Toggle from "./parts/Toggle"

function Component() {
  return (
    <>
      <section className={styles.container} >
        <div className={styles.avatar}>
          <Avatar className={styles.avatar__image} />
          <Toggle />
        </div>
        <ProfileMenu />
      </section>
    </>
  )
}

export default function WrappedComponent() {
  return (
    <Wrapper>
      <Component />
    </Wrapper>
  )
}
