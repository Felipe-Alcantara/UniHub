import logoHorizontalWhite from '../../assets/brand/logo-atletiza-horizontal-white.png'
import logoSymbolWhite from '../../assets/brand/logo-atletiza-symbol-white.png'

const logoByVariant = {
  horizontal: logoHorizontalWhite,
  symbol: logoSymbolWhite,
}

const contrastClassBySurface = {
  onDark: 'atletiza-logo--on-dark',
  onLight: 'atletiza-logo--on-light',
  adaptive: 'atletiza-logo--adaptive',
}

function AtletizaLogo({ variant = 'horizontal', surface = 'onDark', className = '', alt = 'Logo Atletiza' }) {
  const source = logoByVariant[variant] ?? logoByVariant.horizontal
  const contrastClass = contrastClassBySurface[surface] ?? contrastClassBySurface.onDark

  return <img src={source} alt={alt} className={`atletiza-logo ${contrastClass} ${className}`.trim()} />
}

export default AtletizaLogo
