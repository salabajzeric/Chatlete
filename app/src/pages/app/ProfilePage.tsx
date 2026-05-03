interface ProfilePageProps {
  email: string
}

export default function ProfilePage({ email }: ProfilePageProps) {
  return (
    <section className="placeholder-card">
      <h2 className="placeholder-card__title">Profile</h2>
      <p className="placeholder-card__text">
        Signed in as {email}
      </p>
    </section>
  )
}