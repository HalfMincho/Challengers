import Box from '..';
import './style.scss';

export default function ParticiPateBox({ title, children }) {
  return (
    <div className="ParticiPateBox">
      <Box color="gray" title fullWidth>
        {title}
      </Box>
      <Box content fullWidth>
        {children}
      </Box>
    </div>
  );
}
