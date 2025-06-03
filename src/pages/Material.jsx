function Material() {
  return (
    <div className="page-content" style={{
      background: 'var(--section-bg)',
      borderRadius: '12px',
      boxShadow: '0 1px 6px 0 rgba(35,69,103,0.04)',
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '2rem',
      color: 'var(--text-main)',
      textAlign: 'center',
    }}>
      <h2 style={{ color: 'var(--primary)', marginBottom: '1.2rem' }}>Material de Décimo/11mo</h2>
      <p style={{ color: 'var(--text-muted)' }}>Aquí encontrarás el material de estudio para el grupo.</p>
    </div>
  )
}

export default Material;
