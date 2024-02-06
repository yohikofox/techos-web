import Avatar from "./parts/Avatar"
import ProfileMenu from "./parts/ProfileMenu"
import Toggle from "./parts/Toggle"
import Wrapper from "./parts/Wrapper"
import styles from "./styles.module.scss"

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
