export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="muted">© {new Date().getFullYear()} Webcole - Tu lista con click</div>
        <div style={{display:'flex', gap:10}}>
          <a href="#">Términos</a>
          <a href="#">Privacidad</a>
        </div>
      </div>
    </footer>
  )
}
