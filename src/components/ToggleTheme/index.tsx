import { useCustomTheme } from '../../hooks/useCustomTheme';
import { Container } from './styled';

export function ToggleTheme() {
  const { isActive, toggleTheme } = useCustomTheme();

  return (
    <>
      <>
        <Container>
          <span>🌞</span>
          <span>🌛</span>
          <div className={isActive ? 'active' : ''} onClick={toggleTheme}></div>
        </Container>
      </>
    </>
  );
}
