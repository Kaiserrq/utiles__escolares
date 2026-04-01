export default function Footer(){
  return (
    <footer style={{marginTop:36, padding:'20px 0', borderTop:'1px solid rgba(255,255,255,0.03)', textAlign:'center'}}>
      <div className="app-root" style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
        <div className="muted">© {new Date().getFullYear()} Webcole - Tu lista con click</div>
        <div style={{display:'flex', gap:10}}>
          <a href="#">Términos</a>
          <a href="#">Privacidad</a>
        </div>
      </div>
    </footer>
  )
}
